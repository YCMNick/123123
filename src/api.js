// ---------------------------------------------------------------------------
// 資料存取層
//
// 如果 config 裡有設定 ENDPOINT_URL，就透過 Google Apps Script 收送資料；
// 否則退回「本機 Demo 模式」（localStorage），方便沒接後端時先測試流程。
// ---------------------------------------------------------------------------
import { ENDPOINT_URL } from './config.js'

const DEMO_KEY = 'repair-app.requests'

export const isDemoMode = !ENDPOINT_URL

// ---- Demo（localStorage）模式 --------------------------------------------

function demoLoad() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_KEY)) || []
  } catch {
    return []
  }
}

function demoSave(list) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(list))
}

// ---- 對外 API -------------------------------------------------------------

/** 房客送出一筆報修。request 為純物件，photos 為 base64 字串陣列。 */
export async function submitRequest(request) {
  if (isDemoMode) {
    const list = demoLoad()
    const saved = {
      ...request,
      id: crypto.randomUUID(),
      status: '待處理',
      createdAt: new Date().toISOString(),
    }
    demoSave([saved, ...list])
    return saved
  }

  const res = await fetch(ENDPOINT_URL, {
    method: 'POST',
    // 用 text/plain 可避免瀏覽器對 Apps Script 發出 CORS preflight
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'create', request }),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || '送出失敗')
  return data.request
}

/** 房東後台：取得所有報修單。 */
export async function fetchRequests() {
  if (isDemoMode) return demoLoad()

  const res = await fetch(`${ENDPOINT_URL}?action=list`)
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || '讀取失敗')
  return data.requests
}

/** 房東後台：更新某筆報修的狀態。 */
export async function updateStatus(id, status) {
  if (isDemoMode) {
    const list = demoLoad().map((r) => (r.id === id ? { ...r, status } : r))
    demoSave(list)
    return
  }

  const res = await fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'updateStatus', id, status }),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(data.error || '更新失敗')
}

/** 把 File 物件讀成 { name, type, dataUrl } 以便上傳。 */
export function fileToData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () =>
      resolve({ name: file.name, type: file.type, dataUrl: reader.result })
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
