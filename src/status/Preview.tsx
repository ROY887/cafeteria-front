// 担当: 4人目 増田（補助UI・レスポンシブ対応）
// 動作確認用: http://localhost:5173/?preview=status
//
// 部品ができたら import して、すべての状態を並べて確認する。例:
//
//   import ConnectionStatus from './ConnectionStatus'
//   import ErrorMessage from './ErrorMessage'
//   import Loading from './Loading'
//   import UpdateTime from './UpdateTime'
//
//   <Loading />
//   <ErrorMessage />
//   <ConnectionStatus connection="connecting" />
//   <ConnectionStatus connection="open" />
//   <ConnectionStatus connection="closed" />
//   <ConnectionStatus connection="error" />
//   <UpdateTime updatedAt={new Date()} />
//   <UpdateTime updatedAt={null} />
//
// スマホ幅の確認は、ブラウザの開発者ツールで画面幅を変えるか、
// npm run dev で表示される Network の URL を同じ Wi-Fi のスマホで開く。

export default function Preview() {
  return <p className="p-4 text-sm text-slate-500">status の Preview（まだ部品を置いていません）</p>
}
