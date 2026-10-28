export type CongestionLevel =
  | "empty"       // 0〜20%: 空いてます (緑)
  | "slightly"    // 21〜40%: 少し空き (黄緑)
  | "moderate"    // 41〜60%: やや混雑 (黄)
  | "crowded"     // 61〜80%: 混雑 (オレンジ)
  | "full";       // 81〜100%: 満席 (赤)

export interface AreaData {
  id: string;
  name: string;
  rate: number; // 0〜100
}

export interface CongestionState {
  updatedAt: string;
  areas: AreaData[];
}

export function getCongestionLevel(rate: number): {
  level: CongestionLevel;
  label: string;
  color: string;
  barColor: string;
} {
  if (rate <= 20) {
    return { level: "empty", label: "空いてます", color: "text-emerald-700 bg-emerald-50 border-emerald-200", barColor: "bg-emerald-500" };
  } else if (rate <= 40) {
    return { level: "slightly", label: "少し空き", color: "text-lime-700 bg-lime-50 border-lime-200", barColor: "bg-lime-500" };
  } else if (rate <= 60) {
    return { level: "moderate", label: "やや混雑", color: "text-amber-700 bg-amber-50 border-amber-200", barColor: "bg-amber-400" };
  } else if (rate <= 80) {
    return { level: "crowded", label: "混雑", color: "text-orange-700 bg-orange-50 border-orange-200", barColor: "bg-orange-500" };
  } else {
    return { level: "full", label: "満席", color: "text-rose-700 bg-rose-50 border-rose-200", barColor: "bg-rose-600" };
  }
}
