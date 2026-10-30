import { useEffect, useRef, useState } from 'react'
import { connectOccupancy, type AreaOccupancy, type ConnectionState, type OccupancyConnection } from './websocket'

export type { AreaOccupancy, ConnectionState }

export type UseOccupancyResult = {
  areas: AreaOccupancy[]
  updatedAt: Date | null // AI解析結果が最後に更新された時刻。まだ受信していなければ null
  connection: ConnectionState
  reconnect: () => void // connection が 'error' のときの「再接続」ボタン用
}

// 画面側からは const { areas, updatedAt, connection, reconnect } = useOccupancy() で利用する。
// 呼ぶたびに WebSocket を1本張るので、App で1回だけ呼び、子には props で渡す。
export function useOccupancy(): UseOccupancyResult {
  const [areas, setAreas] = useState<AreaOccupancy[]>([])
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [connection, setConnection] = useState<ConnectionState>('connecting')
  const connectionRef = useRef<OccupancyConnection | null>(null)

  useEffect(() => {
    const conn = connectOccupancy({
      onMessage: (message) => {
        setAreas(message.areas)
        setUpdatedAt(new Date(message.updated_at))
      },
      onStateChange: setConnection,
    })
    connectionRef.current = conn
    return () => conn.close()
  }, [])

  return { areas, updatedAt, connection, reconnect: () => connectionRef.current?.reconnect() }
}
