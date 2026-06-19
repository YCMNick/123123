import { useEffect, useMemo, useState } from 'react'
import { ADMIN_PASSCODE, STATUSES, URGENCIES } from '../config.js'
import { fetchRequests, updateStatus } from '../api.js'

const urgencyClass = {
  normal: 'u-normal',
  soon: 'u-soon',
  urgent: 'u-urgent',
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('zh-Hant', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function AdminDashboard() {
  const needsPass = Boolean(ADMIN_PASSCODE)
  const [unlocked, setUnlocked] = useState(!needsPass)
  const [passInput, setPassInput] = useState('')

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('全部')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setRequests(await fetchRequests())
    } catch (err) {
      setError(err.message || '讀取失敗')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (unlocked) load()
  }, [unlocked])

  const visible = useMemo(
    () => (filter === '全部' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter],
  )

  const changeStatus = async (id, status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    try {
      await updateStatus(id, status)
    } catch (err) {
      setError(err.message || '更新失敗')
      load() // 失敗則重新同步
    }
  }

  if (!unlocked) {
    return (
      <main className="page">
        <header className="page-header">
          <h1>房東後台</h1>
        </header>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            if (passInput === ADMIN_PASSCODE) setUnlocked(true)
            else setError('通行碼錯誤')
          }}
        >
          <label className="field">
            <span className="label">請輸入通行碼</span>
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn primary" type="submit">
            進入
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="page-header row">
        <h1>報修管理</h1>
        <button className="btn ghost" onClick={load} disabled={loading}>
          {loading ? '更新中…' : '↻ 重新整理'}
        </button>
      </header>

      <div className="filters">
        {['全部', ...STATUSES].map((s) => (
          <button
            key={s}
            className={`filter-btn${filter === s ? ' active' : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      {!loading && visible.length === 0 && <p className="empty">目前沒有報修單 🎉</p>}

      <ul className="request-list">
        {visible.map((r) => (
          <li key={r.id} className="request-card">
            <div className="request-top">
              <span className="who">
                {r.tenantName} {r.unit && <em>· {r.unit}</em>}
              </span>
              <span className={`urgency ${urgencyClass[r.urgency] || ''}`}>
                {r.urgencyLabel || r.urgency}
              </span>
            </div>

            <div className="request-meta">
              <span className="cat">{r.category}</span>
              <span className="time">{formatDate(r.createdAt)}</span>
            </div>

            <p className="desc">{r.description}</p>

            {r.preferredTime && (
              <p className="pref">🕐 方便時段：{r.preferredTime}</p>
            )}
            {r.phone && <p className="pref">📞 {r.phone}</p>}

            {r.photos?.length > 0 && (
              <div className="photo-grid view">
                {r.photos.map((p, i) => {
                  const src = typeof p === 'string' ? p : p.dataUrl || p.url
                  return (
                    <a key={i} href={src} target="_blank" rel="noreferrer">
                      <img src={src} alt={`照片 ${i + 1}`} />
                    </a>
                  )
                })}
              </div>
            )}

            <div className="status-row">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  className={`status-btn${r.status === s ? ' active' : ''}`}
                  onClick={() => changeStatus(r.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
