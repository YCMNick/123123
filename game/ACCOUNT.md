# 差一度：帳號、雲端存檔與解鎖設定

遊戲不登入也能完整運作。登入只是加分：進度存到雲端、換手機還在、未來在 App 裡解鎖完整版。

## 1. 建立 Firebase 專案（Nick 操作，約 15 分鐘）

1. https://console.firebase.google.com → 新增專案（例如 `just-one-degree`）。Google Analytics 可關。
2. **Authentication → Sign-in method**，開啟：
   - **Email/Password**
   - **Google**（填支援信箱即可）
   - **Apple**：需要 Apple Developer 帳號。在 Apple Developer 建一個 Services ID、啟用 Sign in with Apple，回 Firebase 填 Services ID、Team ID、Key ID 與私鑰。
3. **Authentication → Settings → Authorized domains**：加上遊戲會放的網域（GitHub Pages 的 `*.github.io`、之後 App 用的網域）。
4. **Firestore Database → 建立資料庫**（production mode），**Rules** 貼上：
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /players/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
   每個人只能讀寫自己的那一份。
5. **專案設定 → 一般 → 你的應用程式 → 新增網頁應用程式**，複製 `firebaseConfig`。
6. 在本專案建立 `game/account.config.json`（照 `game/account.config.example.json` 的格式，貼上 apiKey、authDomain、projectId、appId）。這個檔案已被 git 忽略；Firebase 的網頁 config 不是秘密，但還是分開放。
7. `npm run build:game`。首頁會出現「帳號」區塊。

## 2. 雲端存檔的規則

- 存在 Firestore `players/{uid}`：最佳成績、暱稱、難度、語言、禪模式、音樂、音效、完整版狀態、廣告通行證、更新時間。
- 登入時合併：**最佳成績取高的那一方**，設定以較新的一方為準，合併完再寫回。
- 之後每次存檔（過關、改設定）2.5 秒後自動同步。
- 登出不清除本機進度。
- 「刪除帳號」會刪掉 Firestore 文件和帳號本身（App Store 規定能建帳號就要能刪帳號）。Firebase 要求刪帳號前要是最近登入過，否則畫面會請玩家先登出再登入。

## 3. 解鎖與付費（App 版）

`game/store.config.json`（照 `.example`）：

| 欄位 | 意義 | 網頁版 | App 版 |
|---|---|---|---|
| `freeAll` | 全部開放 | `true` | `false` |
| `freeWorlds` | 免費的大關數 | 1 | 1 |
| `adHours` | 看廣告後該大關開放幾小時 | 24 | 24 |
| `price` | 畫面上顯示的價格 | — | `USD 4.99` |

- 免費：第 1 大關 10 關 ＋ 每個大關的第 1 小關。
- 獎勵式廣告：看完 30 秒影片 → 該大關開放 24 小時。不放插頁式廣告。
- 完整版一次買斷：100 關全開、去廣告、雲端存檔。定價 USD 4.99（約 NT$150），上架首月 2.99。
- 數位內容必須走 Apple 內購（抽成 30%，小型開發者計畫 15%）。實際價格以 App Store Connect 的價格階層為準。

iOS 殼要提供兩個橋接，遊戲會呼叫：
- `window.Store.buy()` → `Promise<boolean>`：發起內購，成功回 `true`。
- `window.Ads.rewarded()` → `Promise<boolean>`：播放獎勵式廣告，看完回 `true`。

購買成功後遊戲把 `full: true` 存進本機與雲端；恢復購買時殼層只要再呼叫一次 `buy()` 回 `true` 即可。

## 4. 上架前要核對的 App Store 規則（請以最新版審核指南為準）

- 有 Google 登入就必須同時提供 Sign in with Apple（4.8）。
- 能建帳號就必須能在 App 內刪帳號（5.1.1）。
- 不得要求使用者先輸入個資才能使用核心功能（5.1.1(v)）：所以第 1 大關免登入。
- 解鎖關卡屬數位內容，必須用 Apple 內購（3.1.1）。
- 要有隱私權政策網址，並在 App Store Connect 填寫 App 隱私（收集 Email／識別碼用於帳號）。
