// バックエンド仕様: WS /ws/status
// 受信データ例: { "areas": [ { "area_id": "A", "occupancy_rate": 60 } ] }

export type AreaOccupancy = {
  area_id: string
  occupancy_rate: number // 0〜100 (%)
}

export type OccupancyMessage = {
  areas: AreaOccupancy[]
}

//  WebSocket接続・受信・切断時処理・自動再接続を実装する 




