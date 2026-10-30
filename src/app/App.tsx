// 担当: 1人目 松永（全体設計・メインUI）
import Layout from "./Layout";
import Home from "./Home";
import type { AreaData } from "./congestion";
import { useOccupancy } from "../realtime/useOccupancy";

export default function App() {
  // WebSocket で受信した混雑状況（神田担当の useOccupancy）を画面用の形に変換する
  const { areas: received, updatedAt } = useOccupancy();
  const areas: AreaData[] = received.map((area) => ({
    id: area.area_id,
    name: area.label,
    rate: area.occupancy_rate,
  }));

  return (
    <Layout updatedAt={updatedAt?.toLocaleTimeString("ja-JP")}>
      <Home areas={areas} />
    </Layout>
  );
}
