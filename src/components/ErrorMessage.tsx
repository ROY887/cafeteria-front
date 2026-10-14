// 担当: 4人目 増田（補助UI・レスポンシブ対応）
// TODO: エラー表示を作る
type ErrorMessageProps = {
  message?: string
}

export default function ErrorMessage({ message = 'サーバーに接続できません' }: ErrorMessageProps) {
  return <p>{message}</p>
}
