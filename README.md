# 房屋報修系統 🛠️

給房客使用的手機網頁版報修系統。房客打開網頁 → 選自己的名字 → 拍照 →
選類別與緊急程度 → 簡述問題 → 送出。房東會收到 Email 通知，並能在後台清單
管理每一筆報修的處理狀態。

## 特色

- 📱 **手機優先**，房客免登入、免安裝，打開連結即可填寫
- 👤 從名單選名字，系統自動帶入房號與電話（房客不用重打）
- 📸 支援拍照 / 上傳照片
- 🚦 緊急程度、問題類別、方便維修時段
- 🛠️ 房東後台：依狀態篩選、一鍵切換「待處理 / 處理中 / 已完成」
- ☁️ 後端用 **Google 試算表 + Apps Script**，免自架伺服器
- 🧪 還沒接後端前，自動切換成本機 Demo 模式即可試用

## 快速開始

```bash
npm install
npm run dev      # 開發伺服器（預設 http://localhost:5173）
npm run build    # 打包到 dist/
npm run preview  # 預覽打包結果
```

開發時最上方會顯示黃色「Demo 模式」提示，代表資料只存在本機。

## 設定

1. 打開 `src/config.js`：
   - `TENANTS`：填入你的房客名單（姓名、房號、電話）
   - `CATEGORIES` / `URGENCIES`：可自訂問題類別與緊急程度
   - `ADMIN_PASSCODE`：房東後台通行碼
2. 依 [`google-apps-script/README.md`](google-apps-script/README.md) 部署後端，
   把拿到的網址填進 `src/config.js` 的 `ENDPOINT_URL`，即為正式運作。

## 頁面

- `#/` — 房客報修表單
- `#/admin` — 房東後台（需通行碼）

## 部署前端

`npm run build` 後的 `dist/` 是純靜態檔，可放到任何靜態主機
（GitHub Pages、Netlify、Vercel、Cloudflare Pages 等），再把連結或 QR code
給房客即可。

## AI 助理 agents（Claude Code）

`engineering/` 內有針對本專案調校過的 Claude Code subagent 定義檔
（前端、Apps Script 後端、程式碼審查、QA 測試）。安裝後，在 Claude Code 裡
直接說「activate frontend-developer mode and help me ...」即可切換角色。

```bash
# 安裝全部 agents 到 ~/.claude/agents/（所有專案都可用）
./scripts/install.sh --tool claude-code

# 只裝到本專案 .claude/agents/
./scripts/install.sh --tool claude-code --scope project

# 或手動複製單一分類
cp engineering/*.md ~/.claude/agents/
```

加 `--dry-run` 可先預覽、`--category engineering` 可只裝某一分類。
