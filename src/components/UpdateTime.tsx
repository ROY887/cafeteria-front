// 担当: 4人目 増田（補助UI・レスポンシブ対応）
// TODO: 「最終更新 12:00:01」の形式で表示する
type UpdateTimeProps = {
  updatedAt: Date | null
}

export default function UpdateTime({ updatedAt }: UpdateTimeProps) {
  return <span>最終更新 {updatedAt?.toLocaleTimeString() ?? '--:--:--'}</span>
}
