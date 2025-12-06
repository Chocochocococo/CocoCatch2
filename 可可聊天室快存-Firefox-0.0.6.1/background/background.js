/* background/background.js */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['pdfModule', 'imageModule', 'markdownModule', 'sillyModule', 'utils'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./pdf.js'), require('./image.js'), require('./markdown.js'), require('./silly.js'), require('./utils.js'));
  } else {
    root.backgroundModule = factory(root.pdfModule, root.imageModule, root.markdownModule, root.sillyModule, root.utils);
  }
}(this, function (pdfModule, imageModule, markdownModule, sillyModule, utils) {
  "use strict";
  console.log("background.js：背景統籌模組啟動，開始統一調度各模組！");

  /**
   * 根據設定匯出對話內容
   * @param {Array} conversationData - 對話資料陣列
   * @param {Object} settings - 設定物件
   */
  async function doExport(conversationData, settings) {
    console.log("background.js：收到匯出請求，開始幹活...");
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
      console.error("background.js：Fuck，沒有任何已勾選的訊息！");
      return;
    }
    var fileName = fileNameBase.replace(/[\/\\?%*:|"<>]/g, "_") || "export";

    switch(storedFormat) {
      case "image": {
        var dataURL;
        if (storedScreenshotStyle === "bubble") {
          dataURL = await imageModule.generateChatImageBubble(selectedMessages, {
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
          dataURL = await imageModule.generateChatImageLeft(selectedMessages, {
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
          if (typeof JSZip === 'undefined') {
            console.error("JSZip 未載入，無法打包多張截圖！");
          } else {
            const zip = new JSZip();
            let idx = 1;
            for (const url of dataURL) {
              const blob = imageModule.imageDataURLToBlob(url);
              zip.file(fileName + "-" + (idx++) + ".png", blob);
            }
            const zipBlob = await zip.generateAsync({ type: "blob" });
            utils.downloadFile(zipBlob, fileName + ".zip", "application/zip");
          }
          break;
        }
        var blob = imageModule.imageDataURLToBlob(dataURL);
        utils.downloadFile(blob, fileName + ".png", "image/png");
        break;
      }
      case "pdf-lib": {
        const pdfBytes = await pdfModule.convertToPDF_Text(selectedMessages, storedUserName, storedCharacterName);
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const dl = browser?.downloads ?? chrome?.downloads;
        if (!dl?.download) throw new Error("downloads API 不可用");
        const downloadId = await dl.download({ url, filename: fileName + ".pdf", saveAs: true });
        dl.onChanged.addListener(function listener(delta) {
          if (delta.id === downloadId && delta.state?.current === "complete") {
            URL.revokeObjectURL(url);
            dl.onChanged.removeListener(listener);
          }
        });
        break;
      }
      case "pdf-html2":{
        const pdfArr = await pdfModule.convertToPDF_HTML2(selectedMessages, storedUserName, storedCharacterName);
        const blob = new Blob([pdfArr], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const dl = browser?.downloads ?? chrome?.downloads;
        if (!dl?.download) throw new Error("downloads API 不可用");
        const downloadId = await dl.download({ url, filename: fileName + ".pdf", saveAs: true });
        dl.onChanged.addListener(function listener(delta) {
          if (delta.id === downloadId && delta.state?.current === "complete") {
            URL.revokeObjectURL(url);
            dl.onChanged.removeListener(listener);
          }
        });
        break;
      }
      case "markdown": {
        var mdContent = markdownModule.convertToMD(selectedMessages, storedUserName, storedCharacterName);
        utils.downloadFile(mdContent, fileName + ".md", "text/markdown");
        break;
      }
      case "silly": {
        var sillyContent = sillyModule.convertToSillyTavernJSONL(selectedMessages, storedUserName, storedCharacterName);
        utils.downloadFile(sillyContent, fileName + ".jsonl", "application/json");
        break;
      }
      case "text":
      default: {
        var txtContent = utils.convertToTXT(selectedMessages, storedUserName, storedCharacterName);
        utils.downloadFile(txtContent, fileName + ".txt", "text/plain");
        break;
      }
    }
    console.log("background.js：匯出完畢，幹得漂亮！");
  }

  // 使用 browser.runtime.onMessage 接收 Content Script 傳來的訊息
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "DO_EXPORT") {
      const { conversationData, settings } = message.payload;
      doExport(conversationData, settings)
        .then(() => {
          sendResponse({ ok: true, msg: "背景已執行匯出處理" });
        })
        .catch(err => {
          console.error("背景匯出發生錯誤：", err);
          sendResponse({ ok: false, msg: "匯出處理失敗", error: err });
        });
        return false; // 非同步回應
    }
  });
  
  return {
    doExport: doExport
  };
}));
