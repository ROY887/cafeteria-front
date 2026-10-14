// 担当: 2人目 神田（リアルタイム通信・API連携）
import type { AreaOccupancy } from '../api/websocket'

export type ConnectionState = 'connecting' | 'open' | 'closed' | 'error'

export type UseOccupancyResult = {
  areas: AreaOccupancy[]
  updatedAt: Date | null
  connection: ConnectionState
}

// 画面側からは const { areas, updatedAt, connection } = useOccupancy() で利用する
// TODO: websocket.ts と接続し、最新データを保持する
export function useOccupancy(): UseOccupancyResult {
  return { areas: [], updatedAt: null, connection: 'connecting' }
}
