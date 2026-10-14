# cafeteria-front

食堂混雑可視化システムのフロントエンド（Vite + React + TypeScript + Tailwind CSS）。

## 開発

```bash
npm install
npm run dev
```

http://localhost:5173 で「食堂混雑状況」が表示される。

`/ws` と `/api` へのリクエストはバックエンド（既定 `http://localhost:8000`）へプロキシされる。
別ホストのバックエンドを使う場合:

```bash
BACKEND_ORIGIN=http://192.168.0.10:8000 npm run dev
```

## 担当とファイル構成

各ファイルの先頭に担当者を書いている。**自分の担当外のファイルは基本的に編集しない**（変更が必要なら担当者に相談する）。

| 担当 | 名前 | ファイル |
|---|---|---|
| 1人目 全体設計・メインUI | 松永 | `src/App.tsx` `src/pages/Home.tsx` `src/components/Header.tsx` |
| 2人目 リアルタイム通信・API連携 | 神田 | `src/api/websocket.ts` `src/hooks/useOccupancy.ts` |
| 3人目 混雑表示UI・食堂マップ | 川田 | `src/components/AreaCard.tsx` `OccupancyBar.tsx` `StatusLabel.tsx` `CafeteriaMap.tsx` |
| 4人目 補助UI・レスポンシブ対応 | 増田 | `src/components/Loading.tsx` `ErrorMessage.tsx` `ConnectionStatus.tsx` `UpdateTime.tsx` |

```
src/
├── App.tsx                  ← 松永
├── pages/
│   └── Home.tsx             ← 松永
├── api/
│   └── websocket.ts         ← 神田
├── hooks/
│   └── useOccupancy.ts      ← 神田
└── components/
    ├── Header.tsx           ← 松永
    ├── AreaCard.tsx         ← 川田
    ├── OccupancyBar.tsx     ← 川田
    ├── StatusLabel.tsx      ← 川田
    ├── CafeteriaMap.tsx     ← 川田
    ├── Loading.tsx          ← 増田
    ├── ErrorMessage.tsx     ← 増田
    ├── ConnectionStatus.tsx ← 増田
    └── UpdateTime.tsx       ← 増田
```

### 担当間の受け渡し（型）

- 受信データの型 `AreaOccupancy` / `OccupancyMessage` は `src/api/websocket.ts` に定義している。
- 画面側は `useOccupancy()` から `{ areas, updatedAt, connection }` を受け取る。
- 型や props を変えるときは、使っている側の担当者に先に連絡する。

## Git の使い方（変更をみんなに反映する手順）

`main` には直接 push せず、**自分のブランチ → Pull Request → main にマージ** の流れで反映する。

### 最初の1回だけ

```bash
git clone git@github.com:ROY887/cafeteria-front.git
cd cafeteria-front
npm install
```

### 作業を始めるとき

`main` を最新にしてから、自分のブランチを作る。ブランチ名は `feature/名前-内容` にする。

```bash
git switch main
git pull
git switch -c feature/kanda-websocket
```

ブランチ名の例:

| 担当 | ブランチ名の例 |
|---|---|
| 松永 | `feature/matsunaga-layout` |
| 神田 | `feature/kanda-websocket` |
| 川田 | `feature/kawata-area-card` |
| 増田 | `feature/masuda-status-ui` |

### 作業を保存する（こまめに）

```bash
git status                # 変更したファイルを確認
git add src/hooks/useOccupancy.ts
git commit -m "useOccupancy: 自動再接続を追加"
```

### GitHub に上げて Pull Request を作る

```bash
npm run build             # エラーが出ないことを確認してから上げる
git push -u origin feature/kanda-websocket
```

push したら GitHub のリポジトリページに出る「Compare & pull request」ボタンから PR を作る
（`gh` コマンドが使える人は `gh pr create --fill` でもよい）。
誰か1人に確認してもらってから「Merge pull request」で `main` に取り込む。

### 他の人の変更を自分のブランチに取り込む

他の人の PR が `main` にマージされたら、自分のブランチにも取り込んでおく。

```bash
git switch main
git pull
git switch feature/kanda-websocket
git merge main
```

### コンフリクト（衝突）が起きたら

ファイル内の `<<<<<<<` `=======` `>>>>>>>` の部分を、正しい内容に直して印を消す。

```bash
git add <直したファイル>
git commit
```

自分の担当外のファイルで衝突した場合は、そのファイルの担当者と相談して直す。

### やってはいけないこと

- `git push --force`（他の人の変更を消してしまう）
- `main` ブランチでの直接作業・直接 push
- `node_modules/` や `dist/` をコミットすること（`.gitignore` で除外済み）
