// バックエンド仕様: WS /ws/status（本番は Nginx が /api/ を FastAPI へ転送するので /api/ws/status）
// 接続直後に1回、その後は1秒ごとに次の形式で届く:
// { "updated_at": "2026-06-29T12:00:01.234Z",
//   "areas": [ { "area_id": "A", "label": "窓側エリア", "occupancy_rate": 60 } ] }

export type AreaOccupancy = {
  area_id: string
  label: string // 例: 窓側エリア
  occupancy_rate: number // 0〜100 (%)。実際には 0 / 20 / 40 / 60 / 80 / 100 の6値
}

export type OccupancyMessage = {
  updated_at: string // UTC ISO8601。AI解析結果が最後に更新された時刻
  areas: AreaOccupancy[]
}

// connecting: 接続を試みている / open: 受信中 / closed: 切断され再接続待ち / error: 再接続をあきらめた
export type ConnectionState = 'connecting' | 'open' | 'closed' | 'error'

const WS_PATH = '/api/ws/status'
const TIMEOUT_MS = 5000 // 接続・受信がこの時間途絶えたら切断とみなす
const MAX_RETRIES = 3
const RETRY_BASE_MS = 1000 // 1秒 → 2秒 → 4秒

function wsUrl(): string {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${location.host}${WS_PATH}`
}

// 必須フィールドがそろっていなければ null を返す
export function parseOccupancyMessage(text: string): OccupancyMessage | null {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return null
  }
  if (typeof data !== 'object' || data === null) return null
  const { updated_at, areas } = data as Record<string, unknown>
  if (typeof updated_at !== 'string' || Number.isNaN(Date.parse(updated_at))) return null
  if (!Array.isArray(areas)) return null

  const valid = areas.every((a: unknown) => {
    if (typeof a !== 'object' || a === null) return false
    const { area_id, label, occupancy_rate } = a as Record<string, unknown>
    return typeof area_id === 'string' && typeof label === 'string' && typeof occupancy_rate === 'number'
  })
  return valid ? { updated_at, areas: areas as AreaOccupancy[] } : null
}

type Handlers = {
  onMessage: (message: OccupancyMessage) => void
  onStateChange: (state: ConnectionState) => void
}

export type OccupancyConnection = {
  reconnect: () => void // error になった後、手動でやり直す
  close: () => void
}

// WebSocket に接続し、切断されたら指数バックオフで最大3回まで自動で再接続する。
// 正常に受信できた時点でリトライ回数は0に戻る。
export function connectOccupancy({ onMessage, onStateChange }: Handlers): OccupancyConnection {
  let socket: WebSocket | null = null
  let retries = 0
  let timeoutTimer: ReturnType<typeof setTimeout> | undefined
  let retryTimer: ReturnType<typeof setTimeout> | undefined
  let closedByUser = false

  // 接続後や受信のたびに呼び、5秒何も来なければ切断扱いにする
  function resetTimeout() {
    clearTimeout(timeoutTimer)
    timeoutTimer = setTimeout(() => socket?.close(), TIMEOUT_MS)
  }

  function open() {
    clearTimeout(retryTimer)
    onStateChange('connecting')
    const ws = new WebSocket(wsUrl())
    socket = ws
    resetTimeout()

    ws.onmessage = (event) => {
      const message = parseOccupancyMessage(String(event.data))
      if (!message) {
        console.warn('[occupancy] 形式が正しくないメッセージを無視しました', event.data)
        return
      }
      retries = 0
      resetTimeout()
      onStateChange('open')
      onMessage(message)
    }

    // onerror の後には必ず onclose が来るので、再接続は onclose だけで行う
    ws.onclose = () => {
      clearTimeout(timeoutTimer)
      if (closedByUser || socket !== ws) return
      if (retries >= MAX_RETRIES) {
        onStateChange('error')
        return
      }
      onStateChange('closed')
      retryTimer = setTimeout(open, RETRY_BASE_MS * 2 ** retries)
      retries++
    }
  }

  open()

  return {
    reconnect() {
      if (closedByUser) return
      retries = 0
      const old = socket
      socket = null // 古い接続の onclose で再接続しないようにする
      old?.close()
      open()
    },
    close() {
      closedByUser = true
      clearTimeout(timeoutTimer)
      clearTimeout(retryTimer)
      socket?.close()
    },
  }
}
