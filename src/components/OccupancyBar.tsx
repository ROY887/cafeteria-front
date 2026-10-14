// 担当: 3人目 川田（混雑表示UI・食堂マップ）
// TODO: rate に応じた長さ・色のバーを描画する
type OccupancyBarProps = {
  rate: number // 0〜100 (%)
}

export default function OccupancyBar({ rate }: OccupancyBarProps) {
  return <div>{rate}%</div>
}
