// 担当: 1人目 松永（全体設計・メインUI）
import { useState } from "react";
import Layout from "./Layout";
import Home from "./Home";
import type { AreaData } from "./congestion";

export default function App() {
  // アスキーアートに合わせた初期データ
  const [updatedAt] = useState("12:00:01");
  const [areas] = useState<AreaData[]>([
    { id: "window", name: "窓側エリア", rate: 60 },
    { id: "center", name: "中央エリア", rate: 80 },
    { id: "entrance", name: "入口エリア", rate: 20 },
  ]);

  return (
    <Layout updatedAt={updatedAt}>
      <Home areas={areas} />
    </Layout>
  );
}
