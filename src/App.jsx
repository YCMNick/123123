import { useEffect, useState } from 'react'
import RepairForm from './pages/RepairForm.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import { isDemoMode } from './api.js'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()
  const isAdmin = hash.startsWith('#/admin')

  return (
    <div className="app">
      {isDemoMode && (
        <div className="demo-banner">
          🧪 Demo 模式：資料只存在這台裝置，房東收不到。請在 <code>src/config.js</code>{' '}
          設定 Google Apps Script 網址後即為正式運作。
        </div>
      )}
      {isAdmin ? <AdminDashboard /> : <RepairForm />}

      <nav className="bottom-nav">
        <a href="#/" className={!isAdmin ? 'active' : ''}>
          🏠 我要報修
        </a>
        <a href="#/admin" className={isAdmin ? 'active' : ''}>
          🛠️ 房東後台
        </a>
      </nav>
    </div>
  )
}
