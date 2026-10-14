// 担当: 3人目 川田（混雑表示UI・食堂マップ）
// TODO: rate に応じて「空いています / 少し空き / やや混雑 / 混雑 / 満席」を表示する
type StatusLabelProps = {
  rate: number // 0〜100 (%)
}

export default function StatusLabel({ rate }: StatusLabelProps) {
  return <span>{rate}%</span>
}
