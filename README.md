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

