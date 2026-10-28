import type { AreaOccupancy } from './websocket'

export type ConnectionState = 'connecting' | 'open' | 'closed' | 'error'

export type UseOccupancyResult = {
  areas: AreaOccupancy[]
  updatedAt: Date | null
  connection: ConnectionState
}

// 画面側からは const { areas, updatedAt, connection } = useOccupancy() で利用する

export function useOccupancy(): UseOccupancyResult {
  return { areas: [], updatedAt: null, connection: 'connecting' }
}
