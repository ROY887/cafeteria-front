# cafeteria-front

食堂混雑可視化システムのフロントエンド（Vite + React + TypeScript + Tailwind CSS）。

## 開発

```bash
npm install
npm run dev
```

http://localhost:5173 で「食堂混雑状況」が表示される。

`/ws` と `/api` へのリクエストはバックエンド（既定 `http://localhost:8000`）へプロキシされる。
別ホストのバックエンドを使う場合:

```bash
BACKEND_ORIGIN=http://192.168.0.10:8000 npm run dev
```

## 担当とファイル構成

担当ごとにフォルダを分けている。**自分のフォルダの中だけを変更する**（新しいファイルも自分のフォルダに作ってよい）。
他の人のフォルダを変えたいときは、その人に相談する。

| 担当 | 名前 | フォルダ |
|---|---|---|
| 1人目 全体設計・メインUI | 松永 | `src/app/` |
| 2人目 リアルタイム通信・API連携 | 神田 | `src/realtime/` |
| 3人目 混雑表示UI・食堂マップ | 川田 | `src/occupancy/` |
| 4人目 補助UI・レスポンシブ対応 | 増田 | `src/status/` |

```
src/
├── main.tsx                 ← 起動処理（共通・基本触らない）
├── index.css                ← 共通
├── app/                     ← 松永
│   ├── App.tsx
│   ├── Home.tsx
│   └── Header.tsx
├── realtime/                ← 神田
│   ├── websocket.ts
│   └── useOccupancy.ts
├── occupancy/               ← 川田
│   ├── AreaCard.tsx
│   ├── OccupancyBar.tsx
│   ├── StatusLabel.tsx
│   └── CafeteriaMap.tsx
└── status/                  ← 増田
    ├── Loading.tsx
    ├── ErrorMessage.tsx
    ├── ConnectionStatus.tsx
    └── UpdateTime.tsx
```

他の人のフォルダのものを使うときは `import` で読み込む。

```ts
// 例: app/Home.tsx から
import { useOccupancy } from '../realtime/useOccupancy'
import AreaCard from '../occupancy/AreaCard'
```

## 動作確認（Preview）

自分の部品を確かめるために **他の人のファイル（Home.tsx など）を書き換えない**。
`npm run sync` はすべての変更を push するので、一時的な書き換えもみんなに反映されてしまう。

代わりに、自分のフォルダに `Preview.tsx` を作る。

```tsx
// 例: src/occupancy/Preview.tsx
import AreaCard from './AreaCard'

export default function Preview() {
  return <AreaCard name="窓側エリア" rate={60} />
}
```

`npm run dev` の後、`http://localhost:5173/?preview=フォルダ名` を開くとその Preview だけが表示される
（例: `?preview=occupancy`）。仮データは Preview.tsx の中に書けばよい。
`main.tsx` を変更する必要はない。本番では `?preview` を付けても通常の画面が出る。

## Git の使い方

覚えるのは **`npm run sync` だけ**。ブランチや Pull Request は使わない。

### 最初の1回だけ

```bash
git clone https://github.com/ROY887/cafeteria-front.git
cd cafeteria-front
npm install
git config --global user.name "自分の名前"
git config --global user.email "GitHubに登録したメールアドレス"
```

### 毎回の作業

```bash
npm run sync                      # 作業を始める前（みんなの最新を取り込む）
```

（作業する）

```bash
npm run sync -- "やったこと"        # 作業が終わったら（自分の変更をみんなに反映する）
```

例: `npm run sync -- "AreaCardに色を付けた"`

`npm run sync` は次のことを自動で行う。

1. 自分の変更を保存（コミット）
2. GitHub からみんなの最新を取り込む
3. ビルドが通るか確認（通らなければ GitHub には上げない）
4. GitHub に上げる（push）
