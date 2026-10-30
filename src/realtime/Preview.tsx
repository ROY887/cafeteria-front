// 動作確認用: http://localhost:5173/?preview=realtime
import { useOccupancy } from './useOccupancy'

export default function Preview() {
  const { areas, updatedAt, connection, reconnect } = useOccupancy()
  return (
    <div className="space-y-2 p-4">
      <button type="button" onClick={reconnect} className="rounded border px-3 py-1 text-sm">
        再接続
      </button>
      <pre className="text-sm">{JSON.stringify({ connection, updatedAt, areas }, null, 2)}</pre>
    </div>
  )
}
