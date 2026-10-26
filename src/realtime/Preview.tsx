// 動作確認用: http://localhost:5173/?preview=realtime
import { useOccupancy } from './useOccupancy'

export default function Preview() {
  const { areas, updatedAt, connection } = useOccupancy()
  return <pre className="p-4 text-sm">{JSON.stringify({ connection, updatedAt, areas }, null, 2)}</pre>
}
