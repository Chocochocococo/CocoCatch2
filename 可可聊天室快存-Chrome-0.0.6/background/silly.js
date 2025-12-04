/* background/silly.js */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.sillyModule = factory();
  }
}(this, function () {
  "use strict";
  console.log("silly.js：SillyTavern JSONL 模組啟動，開始幹 JSONL 匯出！");
  
  function formatDate(date) {
    var months = ["January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    if (minutes < 10) minutes = "0" + minutes;
    return month + " " + day + ", " + year + " " + hours + ":" + minutes + ampm;
  }

  function convertToSillyTavernJSONL(messages, userName, characterName) {
    var nowFormatted = formatDate(new Date());
    var lines = [];
    messages.forEach(function (msg, index) {
      var entry = {
        name: (msg.role === "user") ? userName : characterName,
        is_user: (msg.role === "user"),
        is_system: false,
        send_date: nowFormatted,
        mes: "",
        extra: {}
      };
      // entry.mes = msg.markdown.replace(/(你|ChatGPT)\s?說[\s]*:?/g, "").trim();
      entry.mes = msg.markdown.trim();
      if (index === 0) {
        lines.push(JSON.stringify(entry));
      }
      lines.push(JSON.stringify(entry));
    });
    return lines.join("\n");
  }

  return {
    convertToSillyTavernJSONL: convertToSillyTavernJSONL
  };
}));
