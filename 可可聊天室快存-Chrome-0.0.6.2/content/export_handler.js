/* content/export-handler.js - 在content script中處理導出邏輯 */
(function() {
  "use strict";
  
  console.log("export-handler.js：導出處理模組載入");

  /**
   * 在content script中執行導出
   * @param {Array} conversationData - 對話資料陣列
   * @param {Object} settings - 設定物件
   */
  async function handleExport(conversationData, settings) {
    console.log("export-handler.js：開始在content script中處理導出...");
    
    var storedFormat = settings.storedFormat;
    var storedUserName = settings.storedUserName;
    var storedCharacterName = settings.storedCharacterName;
    var storedImageWidth = settings.storedImageWidth;
    var storedFontSize = settings.storedFontSize;
    var storedFontColor = settings.storedFontColor;
    var storedBackgroundColor = settings.storedBackgroundColor;
    var storedFontFamily = settings.storedFontFamily;
    var storedUserAvatar = settings.storedUserAvatar;
    var storedAssistantAvatar = settings.storedAssistantAvatar;
    var storedScreenshotStyle = settings.storedScreenshotStyle;
    var storedUserMsgBgColor = settings.storedUserMsgBgColor;
    var storedAssistantMsgBgColor = settings.storedAssistantMsgBgColor;
    var fileNameBase = settings.fileNameBase;

    var selectedMessages = conversationData.filter(function(m) { return m.selected; });
    if (!selectedMessages.length) {
      console.error("export-handler.js：沒有任何已勾選的訊息！");
      return { ok: false, msg: "沒有選中的訊息" };
    }
    
    var fileName = fileNameBase.replace(/[\/\\?%*:|"<>]/g, "_") || "export";

    try {
      switch(storedFormat) {
        case "image": {
          var dataURL;
          if (storedScreenshotStyle === "bubble") {
            dataURL = await window.imageModule.generateChatImageBubble(selectedMessages, {
              splitMode: settings.splitMode,
              maxHeight: settings.maxHeight,
              useMarkdown: true,
              userMsgBgColor: storedUserMsgBgColor,
              assistantMsgBgColor: storedAssistantMsgBgColor,
              userAvatar: storedUserAvatar,
              assistantAvatar: storedAssistantAvatar,
              imageWidth: storedImageWidth,
              fontSize: storedFontSize,
              fontColor: storedFontColor,
              backgroundColor: storedBackgroundColor,
              fontFamily: storedFontFamily
            });
          } else {
            dataURL = await window.imageModule.generateChatImageLeft(selectedMessages, {
              splitMode: settings.splitMode,
              maxHeight: settings.maxHeight,
              useMarkdown: true,
              userMsgBgColor: storedUserMsgBgColor,
              assistantMsgBgColor: storedAssistantMsgBgColor,
              userAvatar: storedUserAvatar,
              assistantAvatar: storedAssistantAvatar,
              imageWidth: storedImageWidth,
              fontSize: storedFontSize,
              fontColor: storedFontColor,
              backgroundColor: storedBackgroundColor,
              fontFamily: storedFontFamily
            });
          }
          
          if (Array.isArray(dataURL)) {
            // 多張圖片，打包成ZIP
            if (typeof JSZip !== 'undefined') {
              const zip = new JSZip();
              let idx = 1;
              for (const url of dataURL) {
                const blob = window.utils.imageDataURLToBlob(url);
                zip.file(fileName + "-" + (idx++) + ".png", blob);
              }
              const zipBlob = await zip.generateAsync({ type: "blob" });
              await downloadFileViaBackground(zipBlob, fileName + ".zip", "application/zip");
            } else {
              console.error("JSZip 未載入，無法打包多張截圖！");
              return { ok: false, msg: "JSZip未載入" };
            }
          } else {
            // 單張圖片
            const blob = window.utils.imageDataURLToBlob(dataURL);
            await downloadFileViaBackground(blob, fileName + ".png", "image/png");
          }
          break;
        }
        
        case "markdown": {
          var mdContent = window.markdownModule.convertToMD(selectedMessages, storedUserName, storedCharacterName);
          const blob = new Blob([mdContent], { type: "text/markdown" });
          await downloadFileViaBackground(blob, fileName + ".md", "text/markdown");
          break;
        }
        
        case "silly": {
          var sillyContent = window.sillyModule.convertToSillyTavernJSONL(selectedMessages, storedUserName, storedCharacterName);
          const blob = new Blob([sillyContent], { type: "application/json" });
          await downloadFileViaBackground(blob, fileName + ".jsonl", "application/json");
          break;
        }
        
        case "text":
        default: {
          var txtContent = window.utils.convertToTXT(selectedMessages, storedUserName, storedCharacterName);
          const blob = new Blob([txtContent], { type: "text/plain" });
          await downloadFileViaBackground(blob, fileName + ".txt", "text/plain");
          break;
        }
      }
      
      console.log("export-handler.js：導出完成！");
      return { ok: true, msg: "導出處理完成" };
      
    } catch (err) {
      console.error("export-handler.js：導出過程發生錯誤：", err);
      return { ok: false, msg: "導出處理失敗", error: err.message };
    }
  }

  /**
   * 透過background script下載文件
   */
  async function downloadFileViaBackground(blob, filename, contentType) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        type: "DOWNLOAD_FILE",
        payload: { blob, filename, contentType }
      }, (response) => {
        if (response && response.ok) {
          resolve();
        } else {
          reject(new Error("下載失敗"));
        }
      });
    });
  }

  // 監聽來自background的消息
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "HANDLE_EXPORT") {
      const { conversationData, settings } = message.payload;
      handleExport(conversationData, settings)
        .then(result => sendResponse(result))
        .catch(err => sendResponse({ ok: false, msg: "處理失敗", error: err.message }));
      return true; // 異步響應
    }
  });

  // 暴露到全局，讓其他模組可以調用
  window.exportHandler = {
    handleExport: handleExport
  };
})();