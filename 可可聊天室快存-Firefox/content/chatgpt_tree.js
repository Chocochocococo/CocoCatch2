/* content/chatgpt_tree.js
 *
 * ChatGPT 的對話在後端是一棵樹：每次「重新生成」或「編輯訊息」都會在同一個
 * 父節點底下長出一個新的子節點，也就是一個分支。網頁只渲染 current_node 回推
 * 到根的那一條路徑，所以不管是抓 DOM 還是官方匯出包裡的 chat.html，都只拿得到
 * 「當前這條」。
 *
 * 這個模組直接處理那棵樹，把所有分支都攤平成 Markdown。
 *
 * 資料來源有兩個，格式完全一樣，所以轉換邏輯共用：
 *   1. fetchConversation()  → ChatGPT 內部 API /backend-api/conversation/<id>
 *   2. 官方匯出包裡的 conversations.json（是一個 conversation 物件的陣列）
 *      → 直接把單一元素丟給 toMarkdown() 即可
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.chatgptTree = factory();
  }
}(this, function () {
  "use strict";

  /*************** 取得對話 ***************/

  // 網址長這樣：https://chatgpt.com/c/<uuid>
  function getConversationId() {
    const matched = /\/c\/([0-9a-f-]{36})/i.exec(window.location.pathname);
    return matched ? matched[1] : null;
  }

  // Firefox 的 content script 跑在自己的沙箱裡，fetch 沒有可解析相對路徑的 base URL，
  // 丟 "/api/..." 會直接噴 "is not a valid URL"。一律組成絕對網址，兩家瀏覽器都吃。
  function apiUrl(path) {
    return window.location.origin + path;
  }

  async function getAccessToken() {
    const res = await fetch(apiUrl("/api/auth/session"), {
      credentials: "include",
      headers: { "Accept": "application/json" }
    });
    if (!res.ok) throw new Error(`取 session 失敗（HTTP ${res.status}），請確認已登入 ChatGPT`);
    const data = await res.json();
    if (!data.accessToken) throw new Error("session 裡沒有 accessToken，可能是尚未登入");
    return data.accessToken;
  }

  async function fetchConversation(conversationId) {
    const token = await getAccessToken();
    const res = await fetch(apiUrl(`/backend-api/conversation/${conversationId}`), {
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });
    if (!res.ok) throw new Error(`取對話失敗（HTTP ${res.status}）`);
    const conv = await res.json();
    if (!conv || !conv.mapping) throw new Error("回應裡沒有 mapping，格式可能已變更");
    return conv;
  }

  /*************** 解析訊息內容 ***************/

  // content_type 有好幾種，各自的欄位不一樣
  function extractText(message) {
    if (!message || !message.content) return null;
    const content = message.content;

    switch (content.content_type) {
      case "text":
        return (content.parts || []).filter(p => typeof p === "string").join("\n\n");

      case "code":
        return "```\n" + (content.text || "") + "\n```";

      case "multimodal_text":
        return (content.parts || []).map(part => {
          if (typeof part === "string") return part;
          if (part && part.content_type === "image_asset_pointer") {
            return "`[圖片]`"; // 圖片存在 file-service，這裡只留標記
          }
          return "";
        }).filter(Boolean).join("\n\n");

      // 推理模型的思考過程
      case "thoughts":
        return (content.thoughts || [])
          .map(t => [t.summary, t.content].filter(Boolean).join("\n\n"))
          .filter(Boolean)
          .map(block => block.split("\n").map(l => "> " + l).join("\n"))
          .join("\n>\n");

      case "reasoning_recap":
        return content.content ? "> " + content.content : null;

      default:
        // 沒見過的型別就盡量撈：先 text 再 parts
        if (typeof content.text === "string") return content.text;
        if (Array.isArray(content.parts)) {
          return content.parts.filter(p => typeof p === "string").join("\n\n");
        }
        return null;
    }
  }

  function isVisible(message, opts) {
    if (!message) return false;

    const role = message.author && message.author.role;
    if (role === "system") return false;

    // ChatGPT 自己標記為不顯示的（隱藏的系統提示、context 注入等）
    if (message.metadata && message.metadata.is_visually_hidden_from_conversation) return false;

    if (!opts.includeTools) {
      if (role === "tool") return false;
      // recipient 不是 all 代表是講給工具聽的，不是給使用者看的
      if (message.recipient && message.recipient !== "all") return false;
    }

    const text = extractText(message);
    return typeof text === "string" && text.trim() !== "";
  }

  /*************** 樹 → Markdown ***************/

  // current_node 回推到根，這條就是網頁上看得到的那一條
  function collectActivePath(mapping, currentNode) {
    const active = new Set();
    let id = currentNode;
    while (id && mapping[id]) {
      active.add(id);
      id = mapping[id].parent;
    }
    return active;
  }

  function findRootId(mapping) {
    const ids = Object.keys(mapping);
    const rooted = ids.find(id => !mapping[id].parent);
    return rooted || ids[0] || null;
  }

  function formatTime(ts) {
    if (!ts) return "";
    try {
      return new Date(ts * 1000).toLocaleString();
    } catch (e) {
      return "";
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  function normaliseOpts(opts) {
    return Object.assign({
      userName: "使用者",
      assistantName: "ChatGPT",
      includeTools: false,
      includeTimestamps: false,
      renderMarkdown: null   // 沒給就用全域的 marked，再沒有就退回純文字
    }, opts || {});
  }

  function speakerName(message, opts) {
    const role = message.author && message.author.role;
    if (role === "user") return opts.userName;
    if (role === "tool") return (message.author && message.author.name) || "tool";
    return opts.assistantName;
  }

  /**
   * 走訪對話樹，遇到什麼就呼叫對應的 handler。
   * Markdown 和 HTML 兩種輸出共用這一份走訪邏輯，免得兩邊各自長歪。
   *
   * handlers: { onMessage, onBranchStart, onVersionStart, onVersionEnd, onBranchEnd }
   * 分支資訊裡的 activeIndex 是「網頁目前顯示的是第幾個版本」，沒有就是 -1。
   */
  function walkTree(conv, opts, handlers) {
    const mapping = conv.mapping || {};
    const active = collectActivePath(mapping, conv.current_node);
    const stats = { messages: 0, branchPoints: 0, branches: 0 };
    const noop = () => {};
    const h = Object.assign({
      onMessage: noop, onBranchStart: noop, onVersionStart: noop,
      onVersionEnd: noop, onBranchEnd: noop
    }, handlers);

    function walk(startId, branchPath) {
      let id = startId;

      while (id) {
        const node = mapping[id];
        if (!node) return;

        if (isVisible(node.message, opts)) {
          h.onMessage(node.message, {
            nodeId: id,
            depth: branchPath.length,
            onActivePath: active.has(id)
          });
          stats.messages++;
        }

        const children = node.children || [];
        if (children.length === 0) return;
        if (children.length === 1) { id = children[0]; continue; }

        // 分岔點：每個子樹各走一次
        stats.branchPoints++;
        stats.branches += children.length;

        const info = {
          depth: branchPath.length,
          path: branchPath.slice(),
          count: children.length,
          // 在 current_node 回推的路徑上，就是網頁目前顯示的那一條
          activeIndex: children.findIndex(childId => active.has(childId))
        };
        h.onBranchStart(info);

        children.forEach((childId, i) => {
          const ctx = Object.assign({}, info, {
            path: branchPath.concat(i + 1),
            index: i,
            isActive: i === info.activeIndex
          });
          h.onVersionStart(ctx);
          walk(childId, ctx.path);
          h.onVersionEnd(ctx);
        });

        h.onBranchEnd(info);
        return; // 子樹已各自走完
      }
    }

    const rootId = findRootId(mapping);
    if (rootId) walk(rootId, []);
    return stats;
  }

  /*************** 輸出：Markdown ***************/

  /**
   * @param {object} conv  conversation 物件（API 回應或 conversations.json 的元素）
   * @param {object} opts  { userName, assistantName, includeTools, includeTimestamps }
   * @returns {{ markdown: string, stats: object }}
   */
  function toMarkdown(conv, opts) {
    opts = normaliseOpts(opts);
    const lines = [];

    lines.push(`# ${conv.title || "未命名對話"}`);
    lines.push("");
    const meta = [];
    if (conv.create_time) meta.push(`建立於 ${formatTime(conv.create_time)}`);
    if (conv.update_time) meta.push(`最後更新 ${formatTime(conv.update_time)}`);
    if (meta.length) { lines.push(`*${meta.join("　·　")}*`); lines.push(""); }

    // 每深一層分支要跳兩級標題（分支點一級、底下的各版本一級），
    // 否則巢狀的分支點會跟它所屬的版本標題同階，讀起來是平的
    const lead = d => "#".repeat(Math.min(2 + d * 2, 6));
    const child = d => "#".repeat(Math.min(3 + d * 2, 6));
    // 分隔線只在最外層畫，巢狀分支靠標題階層區分就好，不然會糊成一團
    const rule = d => (d === 0 ? ["", "---", ""] : [""]);

    const stats = walkTree(conv, opts, {
      onMessage(message) {
        const suffix = opts.includeTimestamps && message.create_time
          ? `　<sub>${formatTime(message.create_time)}</sub>` : "";
        lines.push("", `**${speakerName(message, opts)}：**${suffix}`, "");
        lines.push(extractText(message).trim());
        lines.push("");
      },
      onBranchStart({ depth, path, count }) {
        lines.push(...rule(depth));
        lines.push(`${lead(depth)} ⑂ 分支點${path.length ? ` ${path.join(".")}` : ""}：以下有 ${count} 個版本`);
      },
      onVersionStart({ depth, path, count, isActive }) {
        lines.push("");
        lines.push(
          `${child(depth)} 版本 ${path.join(".")}／共 ${count} 個` +
          (isActive ? "　★ 網頁目前顯示這條" : "")
        );
      },
      onBranchEnd({ depth }) {
        lines.push(...rule(depth));
      }
    });

    return {
      markdown: lines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n",
      stats
    };
  }

  /*************** 輸出：HTML ***************/

  function renderBody(text, opts) {
    if (opts.renderMarkdown) return opts.renderMarkdown(text);
    if (typeof marked !== "undefined" && typeof marked.parse === "function") {
      return marked.parse(text);
    }
    return "<pre>" + escapeHtml(text) + "</pre>";
  }

  const HTML_STYLE = `
/* --fs 驅動整份文件的 rem，字級開關只要改這一個值，所有尺寸就跟著縮放 */
:root{--fs:17px;
  --bg:#fff;--fg:#1a1a1a;--muted:#666;--line:#e3e3e3;
  --user-bg:#eef2ff;--user-bd:#c7d2fe;--bot-bg:#f6f7f9;--bot-bd:#e3e5e8;
  --accent:#4f46e5;--tab-bg:#f0f0f3;--code-bg:#f2f3f5}
@media(prefers-color-scheme:dark){:root{--bg:#16171a;--fg:#e8e8ea;--muted:#9a9aa2;--line:#2c2e33;
  --user-bg:#232a45;--user-bd:#3a4470;--bot-bg:#1e2024;--bot-bd:#31343a;
  --accent:#8b87ff;--tab-bg:#25272c;--code-bg:#101114}}
*{box-sizing:border-box}
html{font-size:var(--fs);-webkit-text-size-adjust:100%}
body{margin:0;padding:1.4rem 1rem 4rem;background:var(--bg);color:var(--fg);
  font-family:-apple-system,"Segoe UI","Noto Sans TC","Microsoft JhengHei",sans-serif;
  font-size:1rem;line-height:1.75}
.wrap{max-width:52rem;margin:0 auto}
header{border-bottom:2px solid var(--line);padding-bottom:1rem}
h1{font-size:1.5rem;line-height:1.35;margin:0 0 .5rem}
.meta{color:var(--muted);font-size:.8rem;margin:.15rem 0}
.msg{border:1px solid;border-radius:10px;padding:.75rem 1rem;margin:1rem 0}
.msg.user{background:var(--user-bg);border-color:var(--user-bd)}
.msg.assistant,.msg.tool{background:var(--bot-bg);border-color:var(--bot-bd)}
.who{font-weight:700;font-size:.8rem;color:var(--muted);margin-bottom:.35rem}
.who .ts{font-weight:400;margin-left:.5rem;opacity:.8}
/* 長網址、無空白的長字串在窄螢幕上不該把版面撐破 */
.body{overflow-wrap:anywhere}
.body>:first-child{margin-top:0}.body>:last-child{margin-bottom:0}
.body pre{background:var(--code-bg);padding:.75rem;border-radius:8px;overflow-x:auto}
.body pre code{background:none;padding:0;overflow-wrap:normal}
.body code{background:var(--code-bg);padding:.1em .3em;border-radius:4px;font-size:.9em}
.body img{max-width:100%;height:auto}
.body table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse}
.body th,.body td{border:1px solid var(--line);padding:.35rem .6rem}
/* 分支一律「不縮排」。
   連續重新生成會讓分支點一層套一層，只要每層加一點邊框或內距，
   巢狀深了content 就會被擠成一個字寬。深度改用標題上的編號（分支點 2.1.3）表示。 */
.branch{margin:.9rem 0}
.branch-bar{display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;font-size:.8rem;
  color:var(--muted);background:var(--tab-bg);border-left:3px solid var(--accent);
  padding:.4rem .6rem;border-radius:0 6px 6px 0}
.branch-bar .lbl{font-weight:700;color:var(--accent)}
.nav{display:inline-flex;align-items:center;gap:.4rem}
/* 手指點得到：最小 32px 見方 */
.nav-btn{font:inherit;font-size:1rem;line-height:1;min-width:34px;min-height:32px;padding:0;
  border:1px solid var(--line);border-radius:6px;background:var(--bg);
  color:var(--fg);cursor:pointer;touch-action:manipulation}
.nav-btn:hover{border-color:var(--accent);color:var(--accent)}
.counter{min-width:8em;text-align:center;font-variant-numeric:tabular-nums}
.pane{display:none}
.pane.on{display:block}
.expanded .nav{display:none}
.expanded .pane{display:block}
.expanded .pane::before{content:attr(data-label);display:block;font-size:.8rem;
  font-weight:700;color:var(--accent);margin:.6rem 0 .1rem;padding-left:.6rem;
  border-left:3px solid var(--accent)}
.toolbar{position:sticky;top:0;background:var(--bg);padding:.6rem 0;z-index:5;
  border-bottom:1px solid var(--line);display:flex;align-items:center;
  gap:.5rem 1rem;flex-wrap:wrap;font-size:.8rem;color:var(--muted)}
.toolbar label{cursor:pointer;user-select:none;display:inline-flex;
  align-items:center;gap:.35rem}
.fs-group{display:inline-flex;align-items:center;gap:.3rem}
.fs-btn{font:inherit;min-width:38px;min-height:32px;padding:0 .5rem;cursor:pointer;
  border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--fg);
  touch-action:manipulation}
.fs-btn.on{background:var(--accent);color:#fff;border-color:var(--accent)}
@media(max-width:640px){
  body{padding:.8rem .6rem 3rem}
  .msg{padding:.6rem .7rem;border-radius:8px}
  .branch-bar{gap:.4rem;padding:.4rem .5rem}
  .counter{min-width:6.5em}
  header{padding-bottom:.7rem}
}
`;

  // 版本切換。用 :scope > 限定範圍，巢狀分支才不會互相蓋掉。
  const HTML_SCRIPT = `
function panesOf(branch){return branch.querySelectorAll(':scope > .panes > .pane');}
function setVersion(branch,idx){
  var panes=panesOf(branch), n=panes.length;
  if(!n) return;
  idx=((idx%n)+n)%n;
  for(var i=0;i<n;i++) panes[i].classList.toggle('on', i===idx);
  branch.setAttribute('data-cur', idx);
  var c=branch.querySelector(':scope > .branch-bar .counter');
  if(c) c.textContent='版本 '+(idx+1)+' / '+n+
    (panes[idx].getAttribute('data-active')==='1'?'  ★':'');
}
document.addEventListener('click',function(e){
  var b=e.target.closest && e.target.closest('.nav-btn'); if(!b) return;
  var branch=b.closest('.branch');
  var cur=parseInt(branch.getAttribute('data-cur'),10)||0;
  setVersion(branch, cur+parseInt(b.getAttribute('data-d'),10));
});
var ea=document.getElementById('expandAll');
if(ea) ea.addEventListener('change',function(e){
  document.body.classList.toggle('expanded', e.target.checked);
});

// 字級：只改 --fs，其餘尺寸都是 rem，會一起縮放
function setFs(px){
  document.documentElement.style.setProperty('--fs', px+'px');
  var btns=document.querySelectorAll('.fs-btn');
  for(var i=0;i<btns.length;i++)
    btns[i].classList.toggle('on', btns[i].getAttribute('data-fs')===String(px));
  try{ localStorage.setItem('cocoCatchFs', px); }catch(e){}
}
document.addEventListener('click',function(e){
  var b=e.target.closest && e.target.closest('.fs-btn');
  if(b) setFs(parseInt(b.getAttribute('data-fs'),10));
});
// file:// 開啟時 localStorage 可能被擋，擋了就用預設值，不要讓整段腳本掛掉
try{
  var saved=parseInt(localStorage.getItem('cocoCatchFs'),10);
  if(saved) setFs(saved);
}catch(e){}
`;

  /**
   * 產生單一檔案的 HTML：所有分支都在裡面，用分頁切換，可一鍵全展開。
   * 不依賴任何外部資源，離線也能開。
   */
  function toHtml(conv, opts) {
    opts = normaliseOpts(opts);
    const out = [];

    const stats = walkTree(conv, opts, {
      onMessage(message) {
        const role = (message.author && message.author.role) || "assistant";
        const cls = role === "user" ? "user" : (role === "tool" ? "tool" : "assistant");
        const ts = opts.includeTimestamps && message.create_time
          ? `<span class="ts">${escapeHtml(formatTime(message.create_time))}</span>` : "";
        out.push(
          `<div class="msg ${cls}">` +
          `<div class="who">${escapeHtml(speakerName(message, opts))}${ts}</div>` +
          `<div class="body">${renderBody(extractText(message).trim(), opts)}</div>` +
          `</div>`
        );
      },
      onBranchStart({ path, count, activeIndex }) {
        const defaultIdx = activeIndex < 0 ? 0 : activeIndex;
        const where = path.length ? ` ${path.join(".")}` : "";
        // 初始的計數文字直接寫死在 HTML 裡，沒跑 JS 也看得出現在是第幾個版本
        const counter = `版本 ${defaultIdx + 1} / ${count}` +
          (defaultIdx === activeIndex ? "  ★" : "");
        out.push(`<section class="branch" data-cur="${defaultIdx}">`);
        out.push(
          `<div class="branch-bar">` +
            `<span class="lbl">⑂ 分支點${escapeHtml(where)}</span>` +
            `<span class="nav">` +
              `<button class="nav-btn" data-d="-1" title="上一個版本">‹</button>` +
              `<span class="counter">${escapeHtml(counter)}</span>` +
              `<button class="nav-btn" data-d="1" title="下一個版本">›</button>` +
            `</span>` +
          `</div>`
        );
        out.push(`<div class="panes">`);
      },
      onVersionStart({ index, path, count, isActive, activeIndex }) {
        const defaultIdx = activeIndex < 0 ? 0 : activeIndex;
        const label = `版本 ${path.join(".")}／共 ${count} 個` + (isActive ? "　★ 網頁目前顯示這條" : "");
        out.push(
          `<div class="pane${index === defaultIdx ? " on" : ""}" ` +
          `data-active="${isActive ? 1 : 0}" data-label="${escapeHtml(label)}">`
        );
      },
      onVersionEnd() { out.push(`</div>`); },
      onBranchEnd() { out.push(`</div></section>`); }
    });

    const title = escapeHtml(conv.title || "未命名對話");
    const meta = [];
    if (conv.create_time) meta.push(`建立於 ${formatTime(conv.create_time)}`);
    if (conv.update_time) meta.push(`最後更新 ${formatTime(conv.update_time)}`);

    const page =
`<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>${HTML_STYLE}</style>
</head>
<body>
<div class="wrap">
<header>
<h1>${title}</h1>
${meta.length ? `<p class="meta">${escapeHtml(meta.join("　·　"))}</p>` : ""}
<p class="meta">訊息 ${stats.messages} 則　·　分支點 ${stats.branchPoints} 個　·　分支總數 ${stats.branches} 條</p>
</header>
<div class="toolbar">
<span class="fs-group"><span>字級</span>
<button class="fs-btn" data-fs="15" title="小">小</button>
<button class="fs-btn on" data-fs="17" title="中">中</button>
<button class="fs-btn" data-fs="20" title="大">大</button>
</span>
${stats.branchPoints ? `<label><input type="checkbox" id="expandAll"> 展開所有分支版本（不用切換）</label>` : ""}
</div>
<main>
${out.join("\n")}
</main>
</div>
<script>${HTML_SCRIPT}<\/script>
</body>
</html>
`;
    return { html: page, stats };
  }

  /*************** 輸出：SillyTavern JSONL ***************/

  // 跟 background/silly.js 一樣的樣式，例如 "January 1, 2024 1:05PM"
  function formatSillyDate(ts) {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    const d = ts ? new Date(ts * 1000) : new Date();
    let hours = d.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hours}:${minutes}${ampm}`;
  }

  // 沿著子樹往下找第一則看得到的訊息（中間可能夾著隱藏的系統節點）
  function firstVisibleNode(mapping, opts, startId) {
    let id = startId;
    while (id) {
      const node = mapping[id];
      if (!node) return null;
      if (isVisible(node.message, opts)) return node;
      const children = node.children || [];
      if (!children.length) return null;
      id = children[0];
    }
    return null;
  }

  // 從某個節點往下走到下一則可見訊息。
  // 自己又分岔或已經走到底就回傳 null——那代表版本之間開始有結構差異，不能再對齊。
  function nextVisibleNode(mapping, opts, node) {
    const children = node.children || [];
    if (children.length !== 1) return null;
    return firstVisibleNode(mapping, opts, children[0]);
  }

  function countVisibleInSubtree(mapping, opts, rootId) {
    let n = 0;
    const stack = [rootId];
    while (stack.length) {
      const node = mapping[stack.pop()];
      if (!node) continue;
      if (isVisible(node.message, opts)) n++;
      (node.children || []).forEach(c => stack.push(c));
    }
    return n;
  }

  /**
   * SillyTavern 的聊天檔是「線性」的 JSONL，沒有樹的概念，
   * 但它有 swipes：同一則訊息可以存多個版本，在 ST 裡左右滑動切換。
   * ChatGPT 的「重新生成」正好就是這個，所以分支點的各版本會變成 swipes。
   *
   * 被捨棄的分支如果自己還往下聊了好幾則，那段是「另一條對話」，
   * swipe 裝不下，stats.dropped 會告訴你有幾則沒進來。
   * 訊息內容一律維持原文，不會為了說明而在裡面加東西。
   *
   * @returns {{ jsonl: string, stats: object }}
   */
  function toSillyTavern(conv, opts) {
    opts = normaliseOpts(opts);
    const mapping = conv.mapping || {};
    const active = collectActivePath(mapping, conv.current_node);
    const stats = { messages: 0, branchPoints: 0, swipes: 0, dropped: 0 };

    const lines = [JSON.stringify({
      user_name: opts.userName,
      character_name: opts.assistantName,
      create_date: formatSillyDate(conv.create_time),
      chat_metadata: {
        source: "CocoCatch / ChatGPT",
        conversation_id: conv.conversation_id || null,
        title: conv.title || ""
      }
    })];

    function emit(message, swipeInfo) {
      const isUser = (message.author && message.author.role) === "user";
      const entry = {
        name: isUser ? opts.userName : opts.assistantName,
        is_user: isUser,
        is_system: false,
        send_date: formatSillyDate(message.create_time),
        mes: extractText(message).trim(),
        extra: {}
      };
      if (swipeInfo && swipeInfo.swipes.length > 1) {
        entry.swipes = swipeInfo.swipes;
        entry.swipe_id = swipeInfo.swipe_id;
        entry.mes = swipeInfo.swipes[swipeInfo.swipe_id]; // ST 要求 mes 等於當前 swipe
        stats.swipes += swipeInfo.swipes.length;
      }
      lines.push(JSON.stringify(entry));
      stats.messages++;
    }

    let id = findRootId(mapping);
    let alreadyEmitted = false;

    while (id) {
      const node = mapping[id];
      if (!node) break;

      if (!alreadyEmitted && isVisible(node.message, opts)) emit(node.message, null);
      alreadyEmitted = false;

      const children = node.children || [];
      if (children.length === 0) break;
      if (children.length === 1) { id = children[0]; continue; }

      // 分岔點
      stats.branchPoints++;
      let activeIdx = children.findIndex(childId => active.has(childId));
      if (activeIdx < 0) activeIdx = 0;

      // 各版本逐則對齊往下走：
      //   · 這個位置大家內容都一樣 → 只輸出一次，不做 swipes
      //     （ChatGPT 重新生成時會把使用者那則也複製進每個分支，就是這種情況）
      //   · 有不同的內容 → 收成 swipes（去重，同樣的文字不重複列）
      //     然後只有跟「使用中版本」內容相同的分支能繼續往下；
      //     內容不同的那些是另一條對話了，ST 的線性格式接不下去。
      //
      // 這樣「編輯過使用者訊息」和「重新生成回答」都會落在各自正確的位置上，
      // 兩者並存時（改了訊息又在其中一版重生）也能各自成為 swipes。
      let cursors = children.map(childId => firstVisibleNode(mapping, opts, childId));
      const alive = children.map(() => true);
      const represented = children.map(() => 0);
      let lastEmitted = null;

      while (cursors[activeIdx]) {
        const activeText = extractText(cursors[activeIdx].message).trim();

        const distinct = [];
        children.forEach((_, i) => {
          if (!alive[i] || !cursors[i]) return;
          represented[i]++;
          const text = extractText(cursors[i].message).trim();
          if (distinct.indexOf(text) < 0) distinct.push(text);
        });

        lastEmitted = cursors[activeIdx];
        emit(
          lastEmitted.message,
          distinct.length > 1
            ? { swipes: distinct, swipe_id: distinct.indexOf(activeText) }
            : null
        );

        // 內容和使用中版本不同的分支，到此為止
        children.forEach((_, i) => {
          if (!alive[i] || i === activeIdx) return;
          if (!cursors[i] || extractText(cursors[i].message).trim() !== activeText) {
            alive[i] = false;
          }
        });

        const nextActive = nextVisibleNode(mapping, opts, cursors[activeIdx]);
        children.forEach((_, i) => {
          if (alive[i] && cursors[i]) cursors[i] = nextVisibleNode(mapping, opts, cursors[i]);
        });
        if (!nextActive) break;
      }

      // 每個被捨棄版本裡，沒被輸出也沒進 swipes 的部分
      children.forEach((childId, i) => {
        if (i === activeIdx) return;
        stats.dropped += Math.max(
          0, countVisibleInSubtree(mapping, opts, childId) - represented[i]
        );
      });

      if (!lastEmitted) {
        // 使用中的版本裡沒有任何看得到的訊息，交給主迴圈繼續往下走
        id = children[activeIdx];
        continue;
      }
      // 從剛輸出的那則繼續，別重複輸出它（它可能自己又是個分岔點）
      id = lastEmitted.id;
      alreadyEmitted = true;
    }

    return { jsonl: lines.join("\n") + "\n", stats };
  }

  /*************** 下載 ***************/

  function sanitizeFileName(name) {
    return (name || "conversation")
      .replace(/[\\/:*?"<>|]/g, "_")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "conversation";
  }

  function download(text, fileName, mimeType) {
    const blob = new Blob([text], { type: mimeType || "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  return {
    getConversationId,
    fetchConversation,
    toMarkdown,
    toHtml,
    toSillyTavern,
    walkTree,
    sanitizeFileName,
    download,
    // 給測試/除錯用
    _internal: { extractText, isVisible, collectActivePath, findRootId }
  };
}));
