// 変更の保存・取り込み・アップロードをまとめて行う。
// 使い方: npm run sync -- "やったこと"
//
// 1. 自分の変更をコミット
// 2. GitHub の最新を取り込む（衝突したら元に戻して中断）
// 3. ビルドが通るか確認（通らなければ push しない）
// 4. GitHub へ push
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'

const CONTACT = '神田'
const BRANCH = 'main'
const MAX_PUSH_TRIES = 3

function run(cmd, args, { quiet = false } = {}) {
  const r = spawnSync(cmd, args, {
    encoding: 'utf8',
    stdio: quiet ? 'pipe' : 'inherit',
    shell: process.platform === 'win32',
  })
  return { ok: r.status === 0, out: (r.stdout ?? '').trim(), err: (r.stderr ?? '').trim() }
}

const git = (...args) => run('git', args, { quiet: true })

function stop(message) {
  console.error(`\n✗ ${message}`)
  console.error(`  何も操作せず、この画面を${CONTACT}に送ってください。\n`)
  process.exit(1)
}

function lockHash() {
  return existsSync('package-lock.json')
    ? createHash('sha1').update(readFileSync('package-lock.json')).digest('hex')
    : ''
}

function gitDir() {
  return git('rev-parse', '--git-dir').out
}

function rebaseInProgress() {
  return existsSync(`${gitDir()}/rebase-merge`) || existsSync(`${gitDir()}/rebase-apply`)
}

// 取り込み → ビルド確認。失敗したらその場で終了する
function pullAndBuild() {
  console.log('▶ GitHub の最新を取り込んでいます...')
  const before = lockHash()
  const pull = git('pull', '--rebase', 'origin', BRANCH)
  if (!pull.ok) {
    if (rebaseInProgress()) {
      git('rebase', '--abort')
      stop('他の人の変更と衝突しました。自分の変更は消えていません（取り込む前の状態に戻しました）。')
    }
    stop(`GitHub から取り込めませんでした（ネットワークか認証の問題）。\n${pull.err}`)
  }
  if (lockHash() !== before) {
    console.log('▶ パッケージが更新されたのでインストールしています...')
    if (!run('npm', ['install']).ok) stop('npm install に失敗しました。')
  }

  console.log('▶ ビルドが通るか確認しています...')
  if (!run('npm', ['run', 'build']).ok) {
    console.error('\n✗ ビルドに失敗したので、GitHub には上げていません。')
    console.error('  上のエラーを直してから、もう一度 npm run sync を実行してください。')
    console.error(`  自分で直せない場合は、この画面を${CONTACT}に送ってください。\n`)
    process.exit(1)
  }
}

// ---- 事前チェック ----
if (!git('rev-parse', '--is-inside-work-tree').ok) stop('cafeteria-front フォルダの中で実行してください。')

if (rebaseInProgress() || existsSync(`${gitDir()}/MERGE_HEAD`)) {
  stop('前回の取り込みが途中のままになっています。')
}

const branch = git('branch', '--show-current').out
if (branch !== BRANCH) stop(`今は「${branch}」ブランチにいます（${BRANCH} である必要があります）。`)

if (!git('config', 'user.name').ok || !git('config', 'user.email').ok) {
  console.error('\n✗ Git に名前とメールアドレスが登録されていません。次の2行を実行してから、もう一度試してください。\n')
  console.error('  git config --global user.name "神田明"')
  console.error('  git config --global user.email "GitHubに登録したメールアドレス"\n')
  process.exit(1)
}

// ---- 1. コミット ----
git('add', '-A')
if (!git('diff', '--cached', '--quiet').ok) {
  const message = process.argv.slice(2).join(' ').trim() || '更新'
  if (!git('commit', '-m', message).ok) stop('コミットに失敗しました。')
  console.log(`▶ 変更を保存しました: ${message}`)
} else {
  console.log('▶ 自分の変更はありません。')
}

// ---- 2〜4. 取り込み → ビルド → push ----
for (let i = 1; i <= MAX_PUSH_TRIES; i++) {
  pullAndBuild()

  const ahead = git('rev-list', '--count', `origin/${BRANCH}..HEAD`).out
  if (ahead === '0') {
    console.log('\n✓ 最新の状態です。\n')
    process.exit(0)
  }

  console.log('▶ GitHub に上げています...')
  if (run('git', ['push', 'origin', BRANCH]).ok) {
    console.log('\n✓ 完了しました。みんなの画面にも反映されます。\n')
    process.exit(0)
  }
  // 直前に誰かが push していた場合はもう一度取り込んでやり直す
  if (i < MAX_PUSH_TRIES) console.log('▶ 直前に他の人が更新していたので、もう一度取り込みます...')
}
stop('GitHub への push に失敗しました。')
