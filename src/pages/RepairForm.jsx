import { useMemo, useState } from 'react'
import {
  CATEGORIES,
  MAX_PHOTOS,
  TENANTS,
  URGENCIES,
} from '../config.js'
import { fileToData, submitRequest } from '../api.js'

const emptyForm = {
  tenantName: '',
  category: CATEGORIES[0],
  urgency: 'normal',
  description: '',
  preferredTime: '',
}

export default function RepairForm() {
  const [form, setForm] = useState(emptyForm)
  const [photos, setPhotos] = useState([]) // { name, type, dataUrl }
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const selectedTenant = useMemo(
    () => TENANTS.find((t) => t.name === form.tenantName),
    [form.tenantName],
  )

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onPickPhotos = async (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_PHOTOS - photos.length)
    const data = await Promise.all(files.map(fileToData))
    setPhotos((prev) => [...prev, ...data].slice(0, MAX_PHOTOS))
    e.target.value = '' // 允許再次選同一張
  }

  const removePhoto = (i) => setPhotos((prev) => prev.filter((_, idx) => idx !== i))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.tenantName) return setError('請選擇你的名字')
    if (!form.description.trim()) return setError('請簡述問題')

    setSubmitting(true)
    try {
      await submitRequest({
        tenantName: form.tenantName,
        unit: selectedTenant?.unit || '',
        phone: selectedTenant?.phone || '',
        category: form.category,
        urgency: form.urgency,
        urgencyLabel: URGENCIES.find((u) => u.value === form.urgency)?.label,
        description: form.description.trim(),
        preferredTime: form.preferredTime.trim(),
        photos,
      })
      setDone(true)
    } catch (err) {
      setError(err.message || '送出失敗，請稍後再試')
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setForm(emptyForm)
    setPhotos([])
    setDone(false)
  }

  if (done) {
    return (
      <main className="page">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>報修已送出！</h2>
          <p>房東收到後會盡快處理，謝謝你的回報。</p>
          <button className="btn primary" onClick={reset}>
            再報修一筆
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>房屋報修</h1>
        <p className="subtitle">填一下狀況，房東會盡快幫你處理 🛠️</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span className="label">你的名字 *</span>
          <select value={form.tenantName} onChange={set('tenantName')}>
            <option value="">請選擇…</option>
            {TENANTS.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}（{t.unit}）
              </option>
            ))}
          </select>
        </label>

        {selectedTenant && (
          <p className="hint">房號 {selectedTenant.unit}｜聯絡電話 {selectedTenant.phone}</p>
        )}

        <label className="field">
          <span className="label">問題類別</span>
          <select value={form.category} onChange={set('category')}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div className="field">
          <span className="label">緊急程度</span>
          <div className="chips">
            {URGENCIES.map((u) => (
              <button
                type="button"
                key={u.value}
                className={`chip${form.urgency === u.value ? ' active' : ''}`}
                onClick={() => setForm((f) => ({ ...f, urgency: u.value }))}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        <label className="field">
          <span className="label">問題描述 *</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={set('description')}
            placeholder="例如：廚房水龍頭一直滴水，關不緊。"
          />
        </label>

        <label className="field">
          <span className="label">方便維修時段</span>
          <input
            value={form.preferredTime}
            onChange={set('preferredTime')}
            placeholder="例如：平日晚上 7 點後、週末整天"
          />
        </label>

        <div className="field">
          <span className="label">
            照片（選填，最多 {MAX_PHOTOS} 張）
          </span>
          <div className="photo-grid">
            {photos.map((p, i) => (
              <div className="photo-thumb" key={i}>
                <img src={p.dataUrl} alt={`照片 ${i + 1}`} />
                <button
                  type="button"
                  className="photo-remove"
                  onClick={() => removePhoto(i)}
                  aria-label="移除照片"
                >
                  ✕
                </button>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <label className="photo-add">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={onPickPhotos}
                  hidden
                />
                <span>＋ 拍照 / 選圖</span>
              </label>
            )}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn primary submit" type="submit" disabled={submitting}>
          {submitting ? '送出中…' : '送出報修'}
        </button>
      </form>
    </main>
  )
}
