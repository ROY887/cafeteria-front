// 担当: 3人目 川田（混雑表示UI・食堂マップ）
// TODO: 食堂レイアウト上に各エリアの混雑状況を配置する
import type { AreaOccupancy } from '../api/websocket'

type CafeteriaMapProps = {
  areas: AreaOccupancy[]
}

export default function CafeteriaMap({ areas }: CafeteriaMapProps) {
  return <div>{areas.length} エリア</div>
}
