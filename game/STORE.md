# 差一度：解鎖與定價（App 版）

遊戲不需要帳號。進度存在裝置上；iOS 版之後可用 iCloud 鍵值儲存同步，一樣不用登入。

## 設定檔

`game/store.config.json`（照 `store.config.example.json`，git 忽略；沒有這個檔就是網頁版：全部開放）：

| 欄位 | 意義 | 網頁版 | App 版 |
|---|---|---|---|
| `freeAll` | 全部開放 | `true` | `false` |
| `freeWorlds` | 免費的大關數 | 1 | 1 |
| `adHours` | 看廣告後該大關開放幾小時 | 24 | 24 |
| `price` | 畫面上顯示的價格 | — | `USD 4.99` |

## 規則

- 免費：第 1 大關 10 關 ＋ 每個大關的第 1 小關。
- 獎勵式廣告：看完 30 秒影片 → 該大關開放 24 小時。不放插頁式廣告。
- 完整版一次買斷：100 關全開、去廣告。定價 USD 4.99（約 NT$150），上架首月 2.99。
- 數位內容必須走 Apple 內購（抽成 30%，小型開發者計畫 15%）。實際價格以 App Store Connect 的價格階層為準。

## iOS 殼要提供的兩個橋接

遊戲在上鎖的關卡會呼叫：
- `window.Store.buy()` → `Promise<boolean>`：發起內購，成功回 `true`。
- `window.Ads.rewarded()` → `Promise<boolean>`：播放獎勵式廣告，看完回 `true`。

購買成功後遊戲把 `full: true` 存進本機；恢復購買時殼層再呼叫一次 `buy()` 回 `true` 即可。

## 上架前要核對的 App Store 規則（請以最新版審核指南為準）

- 解鎖關卡屬數位內容，必須用 Apple 內購（3.1.1）。
- 不要求帳號，所以 4.8（Sign in with Apple）與 5.1.1 的刪帳號規定都不適用。
- 要有隱私權政策網址；若接廣告 SDK，App 隱私要如實填寫廣告相關的資料收集。
