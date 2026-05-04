/* background/storage.js */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.storageModule = factory();
  }
}(this, function () {
  "use strict";
  console.log("storage.js：UMD 版本啟動，開始幹 storage 相關的活兒！");

  async function getSettings() {
    // 這裡是 Firefox 擴充的 browser.storage.local API
    // 你可以把預設值寫在這
    const storedData = await browser.storage.local.get({
      storedFormat: "text",
      storedUserName: "你",
      storedCharacterName: "ChatGPT",
      storedImageWidth: 800,
      storedFontSize: 16,
      storedFontColor: "#ffffff",
      storedBackgroundColor: "#000000",
      storedFontFamily: "Arial",
      storedUserAvatar: "",
      storedAssistantAvatar: "",
      storedScreenshotStyle: "left",
      storedUserMsgBgColor: "#313131",
      storedAssistantMsgBgColor: "#202020"
    });
    return storedData;
  }

  async function setSetting(key, value) {
    await browser.storage.local.set({ [key]: value });
  }

  return {
    getSettings: getSettings,
    setSetting: setSetting
  };
}));
