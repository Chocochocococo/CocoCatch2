/* background/markdown.js */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.markdownModule = factory();
  }
}(this, function () {
  "use strict";
  console.log("markdown.js：Markdown 模組啟動，開始幹 Markdown 匯出！");
  
  function convertToMD(messages, userName, characterName) {
    var mdLines = [];
    messages.forEach(function (msg) {
      console.log(msg.markdown);
      var newText = msg.markdown || msg.text || "";
      if (msg.role === "user") {
        //newText = newText.replace(/你\s?說[\s]*：?/g, "").trim();
        mdLines.push("**" + userName + "：**\n" + newText + "\n");
      } else {
        //newText = newText.replace(/ChatGPT\s?說[\s]*：?/g, "").trim();
        mdLines.push("**" + characterName + "：**\n" + newText + "\n");
      }
    });
    return mdLines.join("\n\n");
  }

  return {
    convertToMD: convertToMD
  };
}));
