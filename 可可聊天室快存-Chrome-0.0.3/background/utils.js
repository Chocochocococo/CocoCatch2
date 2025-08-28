/* background/utils.js */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.utils = factory();
  }
}(this, function () {
  "use strict";
  console.log("utils.js：工具模組啟動，幹點常用的小活兒！");
  
  /**
   * 下載檔案
   * @param {Blob|string} content - 若是 string 就用 Blob 包起來
   * @param {string} fileName - 檔案名稱
   * @param {string} mimeType - MIME 類型
   */
  function downloadFile(content, fileName, mimeType) {
    const blob = (typeof content === "string")
               ? new Blob([content], { type: mimeType })
               : content;                             // Blob 才行！
  
    const url  = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    // 延遲再 revoke，避免大檔還沒讀完就砍連結
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  /**
   * 產生隨機 ID
   */
  function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * 將 imageDataURL 轉換成 Blob
   */
  function imageDataURLToBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /**
   * (Optional) 轉 TXT 格式
   */
  function convertToTXT(messages, userName, characterName) {
    var lines = [];
    messages.forEach(function (msg) {
      var newText = msg.markdown || msg.text || "";
      if (msg.role === "user") {
        //newText = newText.replace(/你\s?說[\s]*：?/g, "").trim();
        lines.push(userName + "：\n" + newText);
      } else {
        //newText = newText.replace(/ChatGPT\s?說[\s]*：?/g, "").trim();
        lines.push(characterName + "：\n" + newText);
      }
    });
    return lines.join("\n\n");
  }

  return {
    downloadFile: downloadFile,
    generateId: generateId,
    imageDataURLToBlob: imageDataURLToBlob,
    convertToTXT: convertToTXT
  };
}));
