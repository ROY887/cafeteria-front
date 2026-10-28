// 担当: 1人目 松永（全体設計・メインUI）
// TODO: useOccupancy() でデータを取得し、各担当のコンポーネントを配置する
import type { AreaData } from "./congestion";

// ※ Cさんの実装完了後に以下を差し替えて使用
// import AreaCard from "../occupancy/AreaCard";

interface HomeProps {
  areas: AreaData[];
}

export default function Home({ areas }: HomeProps) {
  return (
    <div className="space-y-6">
      {/* 食堂マップ配置枠（3人目 C担当の配置場所） */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>🗺️</span> 食堂マップ
        </h2>
        <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          C担当（CafeteriaMap）のコンポーネント配置予定地
        </div>
      </section>

      {/* エリア別混雑状況一覧（1人目がレイアウトを担当、中身はC担当のカードが入る） */}
      <section>
        <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>📊</span> エリア別 混雑度
        </h2>

        {/* PC: 3列, タブレット: 2列, スマホ: 1列のレスポンシブ枠 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{area.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {area.rate}%
                  </span>
                </div>
                {/* 混雑度バー（仮表示） */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 my-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${area.rate}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">
                （C: AreaCard 予定枠）
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
