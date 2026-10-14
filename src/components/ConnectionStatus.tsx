// 担当: 4人目 増田（補助UI・レスポンシブ対応）
// TODO: 接続状態（● 接続中 など）を表示する
import type { ConnectionState } from '../hooks/useOccupancy'

type ConnectionStatusProps = {
  connection: ConnectionState
}

export default function ConnectionStatus({ connection }: ConnectionStatusProps) {
  return <span>{connection}</span>
}
