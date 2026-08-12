/* background/image.js */
(function (root, factory) {
  if (typeof marked !== "undefined") {
    marked.setOptions({ mangle:false, headerIds:false, sanitize:false,breaks:true });
  }
  if (typeof define === 'function' && define.amd) {
    define(['./utils'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('./utils'));
  } else {
    root.imageModule = factory(root.utils);
  }
}(this, function (utils) {
  "use strict";
  console.log("image.js：啟動使用 html2canvas 截圖模組");

  // 預設頭像（可根據需要替換成自己的 Base64 資料）
  var defaultUserAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAxXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPxnio4AtgF7HNKkUjfo+D1iJ0qqnsT5hc6PtH3er/SYoCJJatdmrWVATIwGHM2OsXPJsvMOiRLiWz6dBUKKYdlDbfH/yJdTwM2AVy9C+ozCci9YdCD9EYpGPCciOGsIWQgxeaGEwPC1cjPt1xWWLd+h/tKkfqxhbn9j6bjeWtGHiTYunMHM6gPwfDXxgMNgZpwDnwx+ZdmZYhIc5N+dDqQv625ZL0IJTyYAAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlohUHO4gIZqhOdlGRjqWKRbBQ2gqtOphc+gVNGpIUF0fBteDgx2LVwcVZVwdXQRD8AHEXnBRdpMT/JYUWMR4c9+PdvcfdO0BoVplq9sQAVbOMdCIu5vKrYuAVfoxjABFEJWbqycxiFp7j6x4+vt5FeJb3uT/HoFIwGeATiWNMNyziDeK5TUvnvE8cYmVJIT4nnjLogsSPXJddfuNccljgmSEjm54nDhGLpS6Wu5iVDZV4ljisqBrlCzmXFc5bnNVqnbXvyV8YLGgrGa7THEMCS0giBREy6qigCov6qkAjxUSa9uMe/lHHnyKXTK4KGDkWUIMKyfGD/8Hvbs3izLSbFIwDvS+2/TEBBHaBVsO2v49tu3UC+J+BK63jrzWB6CfpjY4WPgKGtoGL644m7wGXO8DIky4ZkiP5aQrFIvB+Rt+UB4Zvgf41t7f2Pk4fgCx1tXwDHBwCkyXKXvd4d193b/+eaff3Ayz0cvFgq+bJAAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDphODY3NDk0YS0xZTNhLTQ1OWUtOWUwZi03ZWE1NWZhMTNlZDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZjVlM2M5OWQtMzY0Yy00NTY5LWI5YTgtMjJiNjQ1YjQ4Yzk3IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjJhYWFhZjktMjYwOC00YTgyLTk0M2UtMWIyN2QwYTY3ZTIwIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDM0MjIwOTQyMDAxMzAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MzFUMTk6NTQ6NTIrMDg6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjMxVDE5OjU0OjUyKzA4OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTJiODQ0YzktZWM5Mi00NTI2LThlZGQtNDE4ZDU4YmUyZDNmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTMxVDE5OjU0OjU0Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PpTBwPcAAAAGYktHRAD+AP4A/usY1IIAAAAJcEhZcwAAAdgAAAHYAfpcpnIAAAAHdElNRQfpAx8LNjb4tjb+AAAK9ElEQVR42s2beZAV1RXGfzNOEFkVJ2JAo1GIoKhAdOQyGBUj4EIS14hIXVFIdGI0iWhMu0SU3GiVQEQtS8GSW0bURFyCpoJJlaJAD1FiqaAIGaBUUAEBWQIRHfJHf42dl7f1e29mOFVdXfPmbufcc8/yndtVtDCFPugOnAwcC3wb6A0cCHQFOgHVwBZgJ7AGWA00Af8AXjPWfdCS66tqIabrgEuAYUDfHM02A/8GmoGOQAdg3yztVgB/Bp4D5hvrdu+VAgh90AW4ErhCOx3Tu8A84HVgOfCesW5djjEOBg6X0OoAAxyXWOcK4GFgurFu414hgNAHBwLXAQ1S691AI/AYMNtY93GZ4/cEzgEuBYbo563AvcAUY92nbSKA0AfVwDjA6Uz/B/DAZGPd8hY6Wn2BnwGX67hsBH4NzDDWNbeaAEIf9AYeBU4CvgQeAiYZ69bS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";
  var defaultAssistantAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAxXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPxnio4AtgF7HNKkUjfo+D1iJ0qqnsT5hc6PtH3er/SYoCJJatdmrWVATIwGHM2OsXPJsvMOiRLiWz6dBUKKYdlDbfH/yJdTwM2AVy9C+ozCci9YdCD9EYpGPCciOGsIWQgxeaGEwPC1cjPt1xWWLd+h/tKkfqxhbn9j6bjeWtGHiTYunMHM6gPwfDXxgMNgZpwDnwx+ZdmZYhIc5N+dDqQv625ZL0IJTyYAAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlohUHO4gIZqhOdlGRjqWKRbBQ2gqtOphc+gVNGpIUF0fBteDgx2LVwcVZVwdXQRD8AHEXnBRdpMT/JYUWMR4c9+PdvcfdO0BoVplq9sQAVbOMdCIu5vKrYuAVfoxjABFEJWbqycxiFp7j6x4+vt5FeJb3uT/HoFIwGeATiWNMNyziDeK5TUvnvE8cYmVJIT4nnjLogsSPXJddfuNccljgmSEjm54nDhGLpS6Wu5iVDZV4ljisqBrlCzmXFc5bnNVqnbXvyV8YLGgrGa7THEMCS0giBREy6qigCov6qkAjxUSa9uMe/lHHnyKXTK4KGDkWUIMKyfGD/8Hvbs3izLSbFIwDvS+2/TEBBHaBVsO2v49tu3UC+J+BK63jrzWB6CfpjY4WPgKGtoGL644m7wGXO8DIky4ZkiP5aQrFIvB+Rt+UB4Zvgf41t7f2Pk4fgCx1tXwDHBwCkyXKXvd4d193b/+eaff3Ayz0cvFgq+bJAAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDphODY3NDk0YS0xZTNhLTQ1OWUtOWUwZi03ZWE1NWZhMTNlZDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZjVlM2M5OWQtMzY0Yy00NTY5LWI5YTgtMjJiNjQ1YjQ4Yzk3IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjJhYWFhZjktMjYwOC00YTgyLTk0M2UtMWIyN2QwYTY3ZTIwIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDM0MjIwOTQyMDAxMzAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MzFUMTk6NTQ6NTIrMDg6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjMxVDE5OjU0OjUyKzA4OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTJiODQ0YzktZWM5Mi00NTI2LThlZGQtNDE4ZDU4YmUyZDNmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTMxVDE5OjU0OjU0Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PpTBwPcAAAAGYktHRAD+AP4A/usY1IIAAAAJcEhZcwAAAdgAAAHYAfpcpnIAAAAHdElNRQfpAx8LNjb4tjb+AAAK9ElEQVR42s2beZAV1RXGfzNOEFkVJ2JAo1GIoKhAdOQyGBUj4EIS14hIXVFIdGI0iWhMu0SU3GiVQEQtS8GSW0bURFyCpoJJlaJAD1FiqaAIGaBUUAEBWQIRHfJHf42dl7f1e29mOFVdXfPmbufcc8/yndtVtDCFPugOnAwcC3wb6A0cCHQFOgHVwBZgJ7AGWA00Af8AXjPWfdCS66tqIabrgEuAYUDfHM02A/8GmoGOQAdg3yztVgB/Bp4D5hvrdu+VAgh90AW4ErhCOx3Tu8A84HVgOfCesW5djjEOBg6X0OoAAxyXWOcK4GFgurFu414hgNAHBwLXAQ1S691AI/AYMNtY93GZ4/cEzgEuBYbo563AvcAUY92nbSKA0AfVwDjA6Uz/B/DAZGPd8hY6Wn2BnwGX67hsBH4NzDDWNbeaAEIf9AYeBU4CvgQeAiYZ69bS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";
  
  // 風格1：全部左側風格
  async function generateChatImageLeft_single(messages, settings) {
    console.log("image.js：生成『全部左側風格』圖片…");
    if (!Array.isArray(messages)) {
      messages = [{ role: "assistant", text: messages }];
    }
  
    var userMsgBgColor = settings.userMsgBgColor || "#313131";
    var assistantMsgBgColor = settings.assistantMsgBgColor || "#202020";
    var userAvatar = settings.userAvatar;
    var assistantAvatar = settings.assistantAvatar;
    var imageWidth = settings.imageWidth || 800;
    var fontSize = settings.fontSize || 16;
    var fontColor = settings.fontColor || "#fff";
    var backgroundColor = settings.backgroundColor || "#000";
    var fontFamily = settings.fontFamily || "Arial";
  
    var outerPadding = 0;
    var lineHeight = fontSize * 1.5;
    var avatarSize = 40;
    var avatarMargin = 20;
    var textPadding = 20;
    var availableTextWidth = imageWidth - (2 * outerPadding + avatarSize + avatarMargin + 2 * textPadding);
  
    var container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = imageWidth + "px";
    container.style.backgroundColor = backgroundColor;
    container.style.margin = "0";
    container.style.padding = "0";
    container.style.fontFamily = fontFamily;
    container.style.fontSize = fontSize + "px";
    container.style.color = fontColor;
    container.style.lineHeight = "1.5";
    container.style.boxSizing = "border-box";
    document.body.appendChild(container);
  
    var style = document.createElement("style");
    style.textContent = `
      body { margin: 0; }
      h1 { font-size: ${fontSize * 2}px; margin: 0 0 10px; }
      h2 { font-size: ${fontSize * 1.75}px; margin: 0 0 10px; }
      h3 { font-size: ${fontSize * 1.5}px; margin: 0 0 10px; }
      h4 { font-size: ${fontSize * 1.25}px; margin: 0 0 10px; }
      hr { border: none; border-top: 1px solid #666; margin: 3px 0; }
      strong { font-weight: bold; }
      em { font-style: italic; }
      del { text-decoration: line-through; }
      code { background: #333; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
      blockquote { border-left: 4px solid #888; padding-left: 10px; margin: 0.5em 0; color: #ccc; }
      img { max-width: 100%; height: auto; }
      ol, ul { margin: 3px 0; padding-left: 20px; }
      li { margin: 0.2em 0; line-height: 1.5; }
      li::marker { font-size: 1em; }
      table { border-collapse: collapse; width: 100%; margin: 1em 0; }
      table, th, td { border: 1px solid #999; padding: 6px; text-align: left; }
    `;
    container.appendChild(style);
    
    const imgs = container.querySelectorAll("img");
      imgs.forEach(img => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
      });

    messages.forEach(function (msg) {
      let finalHTML = marked.parse(msg.markdown) || "<p>（無內容）</p>";
      //finalHTML = finalHTML.replace(/<p><br><\/p>/gi, "");
      //finalHTML = finalHTML.replace(/<p>(&nbsp;|\s)*<\/p>/gi, "");
      //finalHTML = finalHTML.replace(/^<p>\s*<\/p>/i, "");
  
      var msgDiv = document.createElement("div");
      msgDiv.style.width = "100%";
      msgDiv.style.backgroundColor = (msg.role === "user") ? userMsgBgColor : assistantMsgBgColor;
      msgDiv.style.display = "flex";
      msgDiv.style.alignItems = "flex-start";
      msgDiv.style.minHeight = (avatarSize + 2 * textPadding) + "px";
      msgDiv.style.margin = "0";
      msgDiv.style.padding = "0";
      container.appendChild(msgDiv);
  
      var avatarImg = document.createElement("img");
      avatarImg.src = (msg.role === "user") ? (userAvatar || defaultUserAvatar) : (assistantAvatar || defaultAssistantAvatar);
      avatarImg.style.width = avatarSize + "px";
      avatarImg.style.height = avatarSize + "px";
      avatarImg.style.marginTop = (textPadding + 20) + "px";
      avatarImg.style.marginRight = avatarMargin + "px";
      avatarImg.style.marginLeft = (avatarMargin + 5) + "px";
      avatarImg.style.marginBottom = (textPadding + 20) + "px";
      avatarImg.style.flexShrink = "0";
      msgDiv.appendChild(avatarImg);
  
      var textDiv = document.createElement("div");
      textDiv.style.width = availableTextWidth + "px";
      textDiv.style.paddingTop = textPadding + "px";
      textDiv.style.paddingBottom = textPadding + "px";
      textDiv.style.whiteSpace = "normal";
      textDiv.style.wordWrap = "pre-wrap";
      textDiv.style.boxSizing = "break-word";
      textDiv.innerHTML = finalHTML;
      msgDiv.appendChild(textDiv);
    });
  
    await Promise.all(Array.from(container.querySelectorAll("img")).map(img => {
      img.removeAttribute("crossorigin");
      return img.complete ? Promise.resolve() : new Promise(res => {
        img.onload = img.onerror = res;
      });
    }));
  
    var canvas = await html2canvas(container, { allowTaint:true, useCORS:true });
    document.body.removeChild(container);
    return canvas.toDataURL("image/png");
  }
  

  // 風格2：聊天泡泡風格
  async function generateChatImageBubble_single(messages, settings) {
    console.log("image.js：生成『聊天泡泡風格』圖片…");
    if (!Array.isArray(messages)) {
      messages = [{ role: "assistant", text: messages }];
    }
  
    var userMsgBgColor = settings.userMsgBgColor || "#313131";
    var assistantMsgBgColor = settings.assistantMsgBgColor || "#202020";
    var userAvatar = settings.userAvatar || defaultUserAvatar;
    var assistantAvatar = settings.assistantAvatar || defaultAssistantAvatar;
    var imageWidth = settings.imageWidth || 800;
    var fontSize = settings.fontSize || 16;
    var fontColor = settings.fontColor || "#fff";
    var backgroundColor = settings.backgroundColor || "#000";
    var fontFamily = settings.fontFamily || "Arial";
    var padding = 20;
    var bubblePadding = 10;
    var avatarSize = 40;
    var avatarMargin = 10;
    var bubbleRadius = 8;
    var bubbleFixedWidth = imageWidth - padding * 2 - avatarSize - avatarMargin;
  
    var container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-10000px";
    container.style.left = "-10000px";
    container.style.width = imageWidth + "px";
    container.style.backgroundColor = backgroundColor;
    container.style.padding = padding + "px";
    container.style.fontFamily = fontFamily;
    container.style.fontSize = fontSize + "px";
    container.style.color = fontColor;
    container.style.lineHeight = "1.5";
    document.body.appendChild(container);
  
    const style = document.createElement("style");
    style.textContent = `
      body { margin: 0; }
      h1 { font-size: ${fontSize * 2}px; margin: 0 0 10px; }
      h2 { font-size: ${fontSize * 1.75}px; margin: 0 0 10px; }
      h3 { font-size: ${fontSize * 1.5}px; margin: 0 0 10px; }
      h4 { font-size: ${fontSize * 1.25}px; margin: 0 0 10px; }
      hr { border: none; border-top: 1px solid #666; margin: 3px 0; }
      strong { font-weight: bold; }
      em { font-style: italic; }
      del { text-decoration: line-through; }
      code { background: #333; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
      blockquote { border-left: 4px solid #888; padding-left: 10px; margin: 0.5em 0; color: #ccc; }
      img { max-width: 100%; height: auto; }
      ol, ul { margin: 3px 0; padding-left: 20px; }
      li { margin: 0.2em 0; line-height: 1.5; }
      li::marker { font-size: 1em; }
      table { border-collapse: collapse; width: 100%; margin: 1em 0; }
      table, th, td { border: 1px solid #999; padding: 6px; text-align: left; }
    `;
    container.appendChild(style);
  
    messages.forEach(function (msg) {
      let finalHTML = marked.parse(msg.markdown) || "<p>（無內容）</p>";
      finalHTML = finalHTML.replace(/<p><br><\/p>/gi, "");
      finalHTML = finalHTML.replace(/<p>(&nbsp;|\s)*<\/p>/gi, "");
      finalHTML = finalHTML.replace(/^<p>\s*<\/p>/i, "");
      var msgWrapper = document.createElement("div");
      msgWrapper.style.display = "flex";
      msgWrapper.style.marginBottom = "15px";
      msgWrapper.style.justifyContent = (msg.role === "assistant") ? "flex-start" : "flex-end";
  
      var avatar = document.createElement("img");
      avatar.src = (msg.role === "assistant") ? assistantAvatar : userAvatar;
      avatar.style.width = avatarSize + "px";
      avatar.style.height = avatarSize + "px";
      avatar.style.marginRight = (msg.role === "assistant") ? avatarMargin + "px" : "0";
      avatar.style.marginLeft = (msg.role === "user") ? avatarMargin + "px" : "0";
      avatar.style.marginTop = (bubblePadding + 20) + "px";
  
      var bubble = document.createElement("div");
      bubble.style.width = bubbleFixedWidth + "px";
      bubble.style.backgroundColor = (msg.role === "assistant") ? assistantMsgBgColor : userMsgBgColor;
      bubble.style.borderRadius = bubbleRadius + "px";
      bubble.style.padding = bubblePadding + "px";
      bubble.style.whiteSpace = "normal";
      bubble.style.wordWrap = "break-word";
      bubble.innerHTML = finalHTML;
  
      if (msg.role === "assistant") {
        msgWrapper.appendChild(avatar);
        msgWrapper.appendChild(bubble);
      } else {
        msgWrapper.appendChild(bubble);
        msgWrapper.appendChild(avatar);
      }
      container.appendChild(msgWrapper);
    });
  
    await Promise.all(Array.from(container.querySelectorAll("img")).map(img => {
      img.removeAttribute("crossorigin");
      return img.complete ? Promise.resolve() : new Promise(res => {
        img.onload = img.onerror = res;
      });
    }));
  
    var canvas = await html2canvas(container, { allowTaint: true, useCORS: true, imageTimeout: 0 });
    document.body.removeChild(container);
    return canvas.toDataURL("image/png");
  }  

  async function groupMessagesByHeightForRender(messages, settings, maxHeight, renderOne) {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '-99999px';
    container.style.left = '0';
    container.style.width = (settings.imageWidth || 800) + 'px';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    const groups = [];
    let current = [];
    let currentHeight = 0;

    for (const msg of messages) {
        const elem = renderOne(msg, settings);
        container.appendChild(elem);
        await new Promise(r => requestAnimationFrame(r));
        const h = elem.offsetHeight;
        if (currentHeight + h > maxHeight && current.length) {
            groups.push([...current]);
            container.innerHTML = '';
            current = [];
            currentHeight = 0;
            container.appendChild(elem);
            await new Promise(r => requestAnimationFrame(r));
            currentHeight = elem.offsetHeight;
            current.push(msg);
        } else {
            current.push(msg);
            currentHeight += h;
        }
    }
    if (current.length) groups.push(current);
    document.body.removeChild(container);
    return groups;
  }
  // 轉換 dataURL 為 Blob
  function imageDataURLToBlob(dataurl) {
    return utils.imageDataURLToBlob(dataurl);
  }

  function escapeHtml(s) {
    return (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function generateChatImageBubble_getItemRenderer(msg, settings) {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex; margin:8px 0; align-items:flex-start;';
    const bubble = document.createElement('div');
    bubble.style.background = (msg.role === 'assistant') ? (settings.assistantMsgBgColor || '#202020') : (settings.userMsgBgColor || '#313131');
    bubble.style.color = settings.fontColor || '#fff';
    bubble.style.padding = '8px 12px';
    bubble.style.borderRadius = '8px';
    bubble.style.maxWidth = ((settings.imageWidth || 800) - 60) + 'px';
    bubble.innerHTML = (typeof marked !== 'undefined') ? marked.parse(msg.markdown || msg.text || '') : (msg.markdown || msg.text || '').replace(/\n/g, '<br>');
    row.appendChild(bubble);
    return row;
  }

  function generateChatImageLeft_getItemRenderer(msg, settings) {
    const row = document.createElement('div');
    row.style.cssText = 'margin:8px 0; width:100%;';
    const bubble = document.createElement('div');
    bubble.style.background = (msg.role === 'assistant') ? (settings.assistantMsgBgColor || '#202020') : (settings.userMsgBgColor || '#313131');
    bubble.style.color = settings.fontColor || '#fff';
    bubble.style.padding = '8px 12px';
    bubble.style.borderRadius = '8px';
    bubble.style.width = '100%';
    bubble.innerHTML = (typeof marked !== 'undefined') ? marked.parse(msg.markdown || msg.text || '') : (msg.markdown || msg.text || '').replace(/\n/g, '<br>');
    row.appendChild(bubble);
    return row;
  }

  async function generateChatImageBubble(messages, settings) {
    console.log("image.js：生成『聊天泡泡風格』圖片…(splitMode=" + settings.splitMode + ")");
    const splitMode = settings.splitMode || false;
    const maxHeight = settings.maxHeight || 4096;
    if (!splitMode) {
        return await generateChatImageBubble_single(messages, settings);
    }
    const groups = await groupMessagesByHeightForRender(messages, settings, maxHeight, generateChatImageBubble_getItemRenderer);
    const results = [];
    for (const group of groups) {
        const url = await generateChatImageBubble_single(group, settings);
        results.push(url);
    }
    return results;
  }

  async function generateChatImageLeft(messages, settings) {
    console.log("image.js：生成『聊天左側氣泡風格』圖片…(splitMode=" + settings.splitMode + ")");
    const splitMode = settings.splitMode || false;
    const maxHeight = settings.maxHeight || 4096;
    if (!splitMode) {
        return await generateChatImageLeft_single(messages, settings);
    }
    const groups = await groupMessagesByHeightForRender(messages, settings, maxHeight, generateChatImageLeft_getItemRenderer);
    const results = [];
    for (const group of groups) {
        const url = await generateChatImageLeft_single(group, settings);
        results.push(url);
    }
    return results;
  }

  return {
    generateChatImageLeft: generateChatImageLeft,
    generateChatImageBubble: generateChatImageBubble,
    imageDataURLToBlob: imageDataURLToBlob
  };
}));
