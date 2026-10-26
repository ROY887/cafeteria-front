// 担当: 3人目 川田（混雑表示UI・食堂マップ）
// 動作確認用: http://localhost:5173/?preview=occupancy
//
// 部品ができたら import して、仮データで並べて確認する。例:
//
//   import type { AreaOccupancy } from '../realtime/websocket'
//   import AreaCard from './AreaCard'
//   import CafeteriaMap from './CafeteriaMap'
//
//   // 色・ラベルの切り替わりを見るため、0〜100% を幅広く用意する
//   const sampleAreas: AreaOccupancy[] = [
//     { area_id: 'A', occupancy_rate: 0 },
//     { area_id: 'B', occupancy_rate: 30 },
//     { area_id: 'C', occupancy_rate: 60 },
//     { area_id: 'D', occupancy_rate: 85 },
//     { area_id: 'E', occupancy_rate: 100 },
//   ]
//
//   <AreaCard name="窓側エリア" rate={60} />
//   <CafeteriaMap areas={sampleAreas} />

export default function Preview() {
  return <p className="p-4 text-sm text-slate-500">occupancy の Preview（まだ部品を置いていません）</p>
}
