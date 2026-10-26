import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'

// 動作確認用（開発時のみ）: http://localhost:5173/?preview=フォルダ名 を開くと
// src/フォルダ名/Preview.tsx だけを表示する。Preview.tsx を作れば自動で見つかる。
const previews = import.meta.glob<{ default?: ComponentType }>('./*/Preview.tsx')

async function loadPage(): Promise<ComponentType> {
  const name = new URLSearchParams(location.search).get('preview')
  if (!import.meta.env.DEV || name === null) return App

  const load = previews[`./${name}/Preview.tsx`]
  const page = load && (await load()).default
  if (page) return page

  const names = Object.keys(previews).map((path) => path.split('/')[1])
  return () => (
    <p className="p-4">
      src/{name}/Preview.tsx が見つからないか、export default がありません。
      （Preview.tsx があるフォルダ: {names.join(', ') || 'なし'}）
    </p>
  )
}

loadPage().then((Page) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
})
