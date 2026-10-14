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

| 担当 | 名前 | ファイル |
|---|---|---|
| 1人目 全体設計・メインUI | 松永 | `src/App.tsx` `src/pages/Home.tsx` `src/components/Header.tsx` |
| 2人目 リアルタイム通信・API連携 | 神田 | `src/api/websocket.ts` `src/hooks/useOccupancy.ts` |
| 3人目 混雑表示UI・食堂マップ | 川田 | `src/components/AreaCard.tsx` `OccupancyBar.tsx` `StatusLabel.tsx` `CafeteriaMap.tsx` |
| 4人目 補助UI・レスポンシブ対応 | 増田 | `src/components/Loading.tsx` `ErrorMessage.tsx` `ConnectionStatus.tsx` `UpdateTime.tsx` |

```
src/
├── App.tsx                  ← 松永
├── pages/
│   └── Home.tsx             ← 松永
├── api/
│   └── websocket.ts         ← 神田
├── hooks/
│   └── useOccupancy.ts      ← 神田
└── components/
    ├── Header.tsx           ← 松永
    ├── AreaCard.tsx         ← 川田
    ├── OccupancyBar.tsx     ← 川田
    ├── StatusLabel.tsx      ← 川田
    ├── CafeteriaMap.tsx     ← 川田
    ├── Loading.tsx          ← 増田
    ├── ErrorMessage.tsx     ← 増田
    ├── ConnectionStatus.tsx ← 増田
    └── UpdateTime.tsx       ← 増田
```


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
