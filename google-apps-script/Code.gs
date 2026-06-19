/**
 * 房屋報修系統 — Google Apps Script 後端
 *
 * 功能：
 *   - 接收房客送出的報修單，寫進 Google 試算表
 *   - 把照片存到 Google Drive，並把連結放進試算表
 *   - 寄 Email 通知房東
 *   - 提供後台讀取清單、更新狀態
 *
 * 部署步驟見 README.md。
 */

// ====== 設定（請修改這兩個值）======
const SHEET_NAME = '報修單'
const NOTIFY_EMAIL = 'sdlcheng@gmail.com' // 收通知的房東信箱
// =================================

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet
      .appendRow([
        'id',
        '建立時間',
        '狀態',
        '姓名',
        '房號',
        '電話',
        '類別',
        '緊急程度',
        '問題描述',
        '方便時段',
        '照片連結',
      ])
  }
  return sheet
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

// ---- 房客送出 / 房東更新狀態 ----
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)

    if (body.action === 'updateStatus') {
      return json(updateStatus(body.id, body.status))
    }
    return json(createRequest(body.request))
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

// ---- 後台讀取清單 ----
function doGet(e) {
  try {
    if (e.parameter.action === 'list') {
      return json({ ok: true, requests: listRequests() })
    }
    return json({ ok: true, message: '報修系統後端運作中' })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function createRequest(req) {
  const sheet = getSheet()
  const id = Utilities.getUuid()
  const createdAt = new Date().toISOString()

  // 存照片到 Drive
  const photoUrls = (req.photos || []).map((p, i) =>
    savePhoto(p, `${id}_${i}`),
  )

  sheet.appendRow([
    id,
    createdAt,
    '待處理',
    req.tenantName || '',
    req.unit || '',
    req.phone || '',
    req.category || '',
    req.urgencyLabel || req.urgency || '',
    req.description || '',
    req.preferredTime || '',
    photoUrls.join('\n'),
  ])

  sendNotification(req, photoUrls)

  return {
    ok: true,
    request: { ...req, id, createdAt, status: '待處理', photos: photoUrls },
  }
}

function savePhoto(photo, name) {
  try {
    const dataUrl = typeof photo === 'string' ? photo : photo.dataUrl
    const match = dataUrl.match(/^data:(.+);base64,(.*)$/)
    if (!match) return ''
    const blob = Utilities.newBlob(
      Utilities.base64Decode(match[2]),
      match[1],
      name,
    )
    const folder = getPhotoFolder()
    const file = folder.createFile(blob)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    return file.getUrl()
  } catch (err) {
    return ''
  }
}

function getPhotoFolder() {
  const name = '報修照片'
  const folders = DriveApp.getFoldersByName(name)
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name)
}

function sendNotification(req, photoUrls) {
  if (!NOTIFY_EMAIL) return
  const subject = `🛠️ 新報修：${req.tenantName || ''}（${req.unit || ''}）- ${req.category || ''}`
  const lines = [
    `房客：${req.tenantName || ''}`,
    `房號：${req.unit || ''}`,
    `電話：${req.phone || ''}`,
    `類別：${req.category || ''}`,
    `緊急程度：${req.urgencyLabel || req.urgency || ''}`,
    `方便時段：${req.preferredTime || '（未填）'}`,
    '',
    '問題描述：',
    req.description || '',
  ]
  if (photoUrls && photoUrls.length) {
    lines.push('', '照片：', ...photoUrls)
  }
  MailApp.sendEmail(NOTIFY_EMAIL, subject, lines.join('\n'))
}

function listRequests() {
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()
  const rows = values.slice(1) // 去掉標題列
  return rows
    .map((r) => ({
      id: r[0],
      createdAt: r[1],
      status: r[2],
      tenantName: r[3],
      unit: r[4],
      phone: r[5],
      category: r[6],
      urgencyLabel: r[7],
      description: r[8],
      preferredTime: r[9],
      photos: r[10] ? String(r[10]).split('\n').filter(Boolean) : [],
    }))
    .reverse() // 最新在最前
}

function updateStatus(id, status) {
  const sheet = getSheet()
  const values = sheet.getDataRange().getValues()
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === id) {
      sheet.getRange(i + 1, 3).setValue(status) // 第 3 欄 = 狀態
      return { ok: true }
    }
  }
  return { ok: false, error: '找不到該筆報修' }
}
