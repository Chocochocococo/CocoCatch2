/* background/background.js - Chrome Service Worker版本 */
console.log("Service Worker background.js：啟動");

// 處理來自content script的下載請求
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DOWNLOAD_FILE") {
    const { dataUrl, filename } = message.payload;
    
    // 使用Chrome Downloads API下載文件
    chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error("下載失敗:", chrome.runtime.lastError);
        sendResponse({ ok: false, error: chrome.runtime.lastError.message });
      } else {
        console.log("下載開始，ID:", downloadId);
        sendResponse({ ok: true, downloadId });
      }
    });
    
    return true; // 保持消息通道開啟以進行異步回應
  }
});

// 處理擴充圖標點擊（可選）
chrome.action.onClicked.addListener((tab) => {
  // 如果需要，可以發送消息給content script
  chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_UI" }, (response) => {
    if (chrome.runtime.lastError) {
      console.log("無法發送消息到content script:", chrome.runtime.lastError.message);
    }
  });
});