// ---------------------------------------------------------------------------
// 設定檔 — 房東請依自己的情況修改這裡，不需要改動其他程式碼
// ---------------------------------------------------------------------------

// 你的 Google Apps Script 「Web 應用程式」網址。
// 部署方式見 google-apps-script/README.md。
// 留空字串 '' 時，系統會自動切換成「本機 Demo 模式」（資料只存在這台手機，
// 房東收不到），方便先看流程與介面。
export const ENDPOINT_URL = ''

// 房客名單：房客在表單上從這份名單選自己的名字，
// 系統會自動帶入對應的房號與電話（房客不需自己打）。
export const TENANTS = [
  { name: '王小明', unit: '2A', phone: '0912-345-678' },
  { name: '林美麗', unit: '2B', phone: '0922-333-444' },
  { name: '陳大文', unit: '3A', phone: '0933-555-666' },
  { name: '張雅婷', unit: '3B', phone: '0955-777-888' },
  // 在這裡新增你的房客…
]

// 問題類別下拉選單
export const CATEGORIES = ['水電', '家電', '管路 / 給排水', '門窗 / 門鎖', '其他']

// 緊急程度（label 顯示給房客看，value 存進資料）
export const URGENCIES = [
  { value: 'normal', label: '一般' },
  { value: 'soon', label: '較急' },
  { value: 'urgent', label: '非常緊急（漏水、停電等）' },
]

// 報修狀態（房東後台使用）
export const STATUSES = ['待處理', '處理中', '已完成']

// 房東後台的簡易通行碼（只是避免房客誤入，並非真正的安全機制）。
// 留空 '' 表示不需要通行碼。
export const ADMIN_PASSCODE = '1234'

// 一次最多可上傳幾張照片
export const MAX_PHOTOS = 4
