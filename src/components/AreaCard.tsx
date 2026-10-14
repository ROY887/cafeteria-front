// 担当: 3人目 川田（混雑表示UI・食堂マップ）
// TODO: エリア名・OccupancyBar・%・StatusLabel をまとめたカードを作る
type AreaCardProps = {
  name: string // 例: 窓側エリア
  rate: number // 0〜100 (%)
}

export default function AreaCard({ name, rate }: AreaCardProps) {
  return (
    <div>
      {name} {rate}%
    </div>
  )
}
