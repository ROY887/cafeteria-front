// 担当: 1人目 松永（全体設計・メインUI）
// 動作確認用: http://localhost:5173/?preview=app
// ページ全体は ?preview を付けない http://localhost:5173/ で確認できる。
// ここでは Header など、部品を1つずつ確認する。
import Header from './Header'

export default function Preview() {
  return (
    <div className="space-y-4">
      <Header />
      <p className="p-4 text-sm text-slate-500">app の Preview</p>
    </div>
  )
}
