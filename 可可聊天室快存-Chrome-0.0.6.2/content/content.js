/****************************
 * content.js - 統一版本
 * 包含所有平台的處理邏輯
 ****************************/

(async function () {
  console.log('🚀 聊天室匯出工具啟動中...');
  const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAxXpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjabVDbDcMgDPxnio4AtgF7HNKkUjfo+D1iJ0qqnsT5hc6PtH3er/SYoCJJatdmrWVATIwGHM2OsXPJsvMOiRLiWz6dBUKKYdlDbfH/yJdTwM2AVy9C+ozCci9YdCD9EYpGPCciOGsIWQgxeaGEwPC1cjPt1xWWLd+h/tKkfqxhbn9j6bjeWtGHiTYunMHM6gPwfDXxgMNgZpwDnwx+ZdmZYhIc5N+dDqQv625ZL0IJTyYAAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1OlohUHO4gIZqhOdlGRjqWKRbBQ2gqtOphc+gVNGpIUF0fBteDgx2LVwcVZVwdXQRD8AHEXnBRdpMT/JYUWMR4c9+PdvcfdO0BoVplq9sQAVbOMdCIu5vKrYuAVfoxjABFEJWbqycxiFp7j6x4+vt5FeJb3uT/HoFIwGeATiWNMNyziDeK5TUvnvE8cYmVJIT4nnjLogsSPXJddfuNccljgmSEjm54nDhGLpS6Wu5iVDZV4ljisqBrlCzmXFc5bnNVqnbXvyV8YLGgrGa7THEMCS0giBREy6qigCov6qkAjxUSa9uMe/lHHnyKXTK4KGDkWUIMKyfGD/8Hvbs3izLSbFIwDvS+2/TEBBHaBVsO2v49tu3UC+J+BK63jrzWB6CfpjY4WPgKGtoGL644m7wGXO8DIky4ZkiP5aQrFIvB+Rt+UB4Zvgf41t7f2Pk4fgCx1tXwDHBwCkyXKXvd4d193b/+eaff3Ayz0cvFgq+bJAAANdmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDphODY3NDk0YS0xZTNhLTQ1OWUtOWUwZi03ZWE1NWZhMTNlZDAiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZjVlM2M5OWQtMzY0Yy00NTY5LWI5YTgtMjJiNjQ1YjQ4Yzk3IgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjJhYWFhZjktMjYwOC00YTgyLTk0M2UtMWIyN2QwYTY3ZTIwIgogICBkYzpGb3JtYXQ9ImltYWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE3NDM0MjIwOTQyMDAxMzAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4zOCIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgeG1wOkNyZWF0b3JUb29sPSJHSU1QIDIuMTAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjU6MDM6MzFUMTk6NTQ6NTIrMDg6MDAiCiAgIHhtcDpNb2RpZnlEYXRlPSIyMDI1OjAzOjMxVDE5OjU0OjUyKzA4OjAwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZTJiODQ0YzktZWM5Mi00NTI2LThlZGQtNDE4ZDU4YmUyZDNmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDI1LTAzLTMxVDE5OjU0OjU0Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PpTBwPcAAAAGYktHRAD+AP4A/usY1IIAAAAJcEhZcwAAAdgAAAHYAfpcpnIAAAAHdElNRQfpAx8LNjb4tjb+AAAK9ElEQVR42s2beZAV1RXGfzNOEFkVJ2JAo1GIoKhAdOQyGBUj4EIS14hIXVFIdGI0iWhMu0SU3GiVQEQtS8GSW0bURFyCpoJJlaJAD1FiqaAIGaBUUAEBWQIRHfJHf42dl7f1e29mOFVdXfPmbufcc8/yndtVtDCFPugOnAwcC3wb6A0cCHQFOgHVwBZgJ7AGWA00Af8AXjPWfdCS66tqIabrgEuAYUDfHM02A/8GmoGOQAdg3yztVgB/Bp4D5hvrdu+VAgh90AW4ErhCOx3Tu8A84HVgOfCesW5djjEOBg6X0OoAAxyXWOcK4GFgurFu414hgNAHBwLXAQ1S691AI/AYMNtY93GZ4/cEzgEuBYbo563AvcAUY92nbSKA0AfVwDjA6Uz/B/DAZGPd8hY6Wn2BnwGX67hsBH4NzDDWNbeaAEIf9AYeBU4CvgQeAiYZ69bSCiStuBkYD+wjjbvUWNfU4gIIfTAKeBDoDCwCGox1/6QNKPTBQOAB2YstwFXGulktIgCp/BTgWu36JOAOY92XtCGFPqgBbgFukv3pZqzbWlEBhD5oB8wERgHrgIuNdS+xF1HoAwP0MdY9UlENEPPPAGcBq4DhxroV7MUU+mBf4LvAPGPd5/na1hSh9jPF/BJgmLHuoxQLqQL6AUfLt/cFugH7A+0V/KCAaKeCo42KHd4FlgJLSwh+zgNmAU+GPhiVr39NgYGmSO1XlcD8D4DJwJFlbmhT6INfGOvmpOgzV+H0jxRa35j6CMjaz9KZH5JG7UMfjFFMADAfeA1YpmeNApmdsbEKfdBZGtEZ6An00VMH1GucS9NY+NAHRwELpXGjc/WtyuPnF0tFz0hj8BQSvw/sB5xnrHuhzPM8EpgNbAMON9ZtSdH3VODv6jvAWLcqs011jnP/B+3GpBKs/YUKiWeWyzyAVH8mcABwQcq+LwN3aj2Pirf8AlB4W6cg544S1nyW3k9X0LDPzhg7DU3UEawHxuYVgBIbp0CnIW2QI5f5PVn1eRUUwDyNeUbog6+l1IJdStSagd/qiObUgOuU2DxUYnhbB3QBXjLW7awU9xrrZY1dV0L/12WUuwM3ZBWAJNOgrG5SiWuN09WWiBJfypgjLd0CfA40hD7olE0DrpSx8GmzutAH7UMf1APnxj+1gAAWxkFO6IP60AftU2rBGmEUB8jO/V8gdIWSiclFMt0DsMD3gYFAO/1ri1xopWmxxq5TbPF56IPFwBx5nGKCtMnAZcBVwO/3xAHC8BYBobFucAHGa4F7gIsSAlwrS/saMMdY91YLxfjHASOBE/X00L++AJ4Eri2EEIU+aBSOcYKxbnHMwCV6P1ag8z7Ai8AA4GPhArONdW+3RpIjwb6VIZDzgZ8Ao4E+oQ9OKuC9npAARgF7BDBM6j+7wBq+lWD+qDRRWUsKJPTBFOA94DtEoGo+ZOgpYCpwJjChSrj9R0Robd8iNGCJ4vS3gWnSgE1tlPbG0eE1yjrfBfoVwgdDHywHegHda4iKFlXys4Uk/mXog+HAdGnNdODB0AdLgQV6lgErKwVbJxbdDThCKfVgRXbHJDzZXGB8keDoK0QFmpNriCo2yIAVo3bvA8NDHwxKeIFj9VyZWPBnwErgQ2BT4tkJbJdPTlI7ogJJe7mq+DlEjHfNspy1RAUTb6xblEKei+T1jq+RJCAqOqQ5f41AY+iD+Uqe5hIVP3oJA+glezGgAgqwWWM3Af8CTgCGA9enBUFFMWzfq4avqjilYvlxvv6wse5PWVxmD+1kN73bJXZzH71jq/2ZNGNjQmPWGus2ZIx7kQRQL8wiLcWb3bsGqNUC1pUogJxHSAvf0AL2L56rX4n9P1JydFCN8v7tZRQdD9R7XUqjtp+wQoB3jHU7UnSP56ot0X3uDn2wHehcQ1SiLmeXOkqaO4pkfF/hDA3qC7At9MF9wG8KobgJELU50b8U2grUVssFllNy3iBXdEARzNcAzwLXa96/yXhWC7h8RrFGIeqmPmUfr2pJs0MZY3yid48i2o4FRgDvAMcY64YZ60bIny8T4mOLGKdnxtylUGdga7UAw47C8EuhN/Q+pYi2Y+LU21i3OnEmVydiiDFFjBPPVVJNUrx2jAWwVq7poBIF8NcUeN03FQQ15sj3mxNxST46M2PutHSwtH99NVHhACURpVCj3MqI0AdHF2h7HTBOOF0mHaJFbSywe8coBliriK4UimOfFdWKrEi4pLQuZRdwlxY/sUDb2ca6J3Ko5B1F7urtmutOY90XZQpgeXUiqKgrw6A8BHwAXBD64LIUZ/EboQ8uJypejFaafXee9mOJ6n7vKxErlU7Ue0lSAIPKyMt3CGDYBdyvUnUx9DLRpaeh8gyn5blANRi4T3OMKhN1PlWu/5VqY92HygOO19WTUoWwAJgglzo39EExRvEgZYcjgf7GumU5mD9H8UIHYIKxbmEZafUhMrRLjXXr41z6eQUmI8tEaKYR3SDpBMwJfTBVhc98tNNY93w2wxj6oEvog3uI7gl2EOY3rczY57wEfrAHTHhW79EVgKmmEcHjG4CfE5W3f1VkhLcnYgx9cKMM9DXAeqJCa7nMJ3l8PCmA+UoRh4Q+6FMBITwnV7UD+DpRgbI+S9NmPZk0FPid+m4DhmrMclGl+ALmMmPd4j0CUCb4sNpdXYGJfirYaT/gUyDgq8JGkqaK0WzG8XbhA52AV9N4lzw0IcYu4h+qMjC3VYoKe6mSkpbxDsCMhEe4C7jLWLetREHuD9wqu1It13d1kRlj5liH6khtBw6LL2dUJ9R2o9xMe6IrZ2kn6AS8IOabgEHGultKZV5r2mys+yXRhac1RBcjn1ZKnZZu1ebem7xGl1kdnqJQ9Me6hFi00ZIhPVXh6eBiqsuhD24KfTCxSBdriKD4s4HHs112yDNPHdH12nU6dmQVgMpKgbC6B8RYMXQ3cLoWOCxXMJOFRugpRhs+0BxN8jK3ptic+2PMwVi3OacARNOV4NQRlZQLTXB6wlWdnbJadFoO75BLCOuVdW4BbtbOFqLbiFDkhURXbf6Hcl2SOlK5dkeiG2KNOdq1I6rGHAFcaKx7ilag0AfjlX+8CQzMVQwJfXCGkqutarcyGyKUTdJNRCXkKp29XHSZmH++tZgXzSCqQh1PjotTuiY3SzyOz8Z8TgFICLOAQ4lK4blQleuVVExsRebjuOU2/XlDlrX10M7XAndn1isKHoEchuR84MW4EBr6YAjwKvCKse4U2oBCH7xJ9ElNP2PdUv12sMDWfkTl/jH5IP9iXckgorr660JkkEDQ721FT+p9gZg/QpvSD/gLMLZQvaNYASwC/qjzviD0wQiiqjJEV1TaiuK5vxv6YKjW2Us7/8Mc0Ft6AWigixXadtXE/YFPhCe0Fb1DBOsPUXpbq5hkTDHMF20DMs7daAUWXQVMnmOse6ONbEB/nfdaJU7j8xm8ighAEx9OVBKvJyqsziC6V/xhKzHeU0HaOEWtC7XrK9OOVe5nc5cTXarsTnTB8hHgfmPdkhZi/Gil6/Fnc+uISmozSy3uVuLDyS7yxQ18VR9cIAv9dClpdRaffi7Rxw+x4d1E9OHk1MzYvtUFkJEOj1MEme3T2TeULK2W8WzOolHdgcPk2wcoDU7WK5YJzHgwzZdhrSKADGYGymucJQYy59klqGu7/u5IVKzMzD53E303NBd4PIaxKklVrWCwauWm+hPB0b1ltfcX3LVbgtgk+GwFEUz/NvCqMsAWo/8CBpYBE0+tFSYAAAAASUVORK5CYII=";
    // 檢查必要的模組是否載入
  function checkRequiredModules() {
    const required = {
      'marked': typeof marked !== 'undefined',
      'TurndownService': typeof TurndownService !== 'undefined',
      'html2canvas': typeof html2canvas !== 'undefined',
      'JSZip': typeof JSZip !== 'undefined',
      'utils': typeof window.utils !== 'undefined',
      'imageModule': typeof window.imageModule !== 'undefined',
      'markdownModule': typeof window.markdownModule !== 'undefined',
      'sillyModule': typeof window.sillyModule !== 'undefined'
    };

    const missing = Object.entries(required)
      .filter(([name, loaded]) => !loaded)
      .map(([name]) => name);

    if (missing.length > 0) {
      console.error('❌ 缺少必要模組:', missing);
      return false;
    }
    return true;
  }

  // 等待模組載入
  async function waitForModules(maxAttempts = 20) {
    for (let i = 0; i < maxAttempts; i++) {
      if (checkRequiredModules()) {
        console.log('✅ 所有必要模組已載入');
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.error('❌ 模組載入超時');
    return false;
  }

  // 匯出處理邏輯（整合自background.js）
  async function handleExport(conversationData, settings) {
    console.log("開始處理匯出...");
    
    const selectedMessages = conversationData.filter(m => m.selected);
    if (!selectedMessages.length) {
      console.error("沒有任何已勾選的訊息！");
      throw new Error("沒有選中的訊息");
    }
    
    const fileName = (settings.fileNameBase || "export").replace(/[\/\\?%*:|"<>]/g, "_");

    try {
      switch(settings.storedFormat) {
        case "image": {
          let dataURL;
          if (settings.storedScreenshotStyle === "bubble") {
            dataURL = await window.imageModule.generateChatImageBubble(selectedMessages, {
              splitMode: settings.splitMode,
              maxHeight: settings.maxHeight,
              useMarkdown: true,
              userMsgBgColor: settings.storedUserMsgBgColor,
              assistantMsgBgColor: settings.storedAssistantMsgBgColor,
              userAvatar: settings.storedUserAvatar,
              assistantAvatar: settings.storedAssistantAvatar,
              imageWidth: settings.storedImageWidth,
              fontSize: settings.storedFontSize,
              fontColor: settings.storedFontColor,
              backgroundColor: settings.storedBackgroundColor,
              fontFamily: settings.storedFontFamily
            });
          } else {
            dataURL = await window.imageModule.generateChatImageLeft(selectedMessages, {
              splitMode: settings.splitMode,
              maxHeight: settings.maxHeight,
              useMarkdown: true,
              userMsgBgColor: settings.storedUserMsgBgColor,
              assistantMsgBgColor: settings.storedAssistantMsgBgColor,
              userAvatar: settings.storedUserAvatar,
              assistantAvatar: settings.storedAssistantAvatar,
              imageWidth: settings.storedImageWidth,
              fontSize: settings.storedFontSize,
              fontColor: settings.storedFontColor,
              backgroundColor: settings.storedBackgroundColor,
              fontFamily: settings.storedFontFamily
            });
          }
          
          if (Array.isArray(dataURL)) {
            // 多張圖片，打包成ZIP
            const zip = new JSZip();
            let idx = 1;
            for (const url of dataURL) {
              const blob = window.utils.imageDataURLToBlob(url);
              zip.file(fileName + "-" + (idx++) + ".png", blob);
            }
            const zipBlob = await zip.generateAsync({ type: "blob" });
            await downloadFile(zipBlob, fileName + ".zip", "application/zip");
          } else {
            // 單張圖片
            const blob = window.utils.imageDataURLToBlob(dataURL);
            await downloadFile(blob, fileName + ".png", "image/png");
          }
          break;
        }
        
        case "markdown": {
          const mdContent = window.markdownModule.convertToMD(selectedMessages, settings.storedUserName, settings.storedCharacterName);
          const blob = new Blob([mdContent], { type: "text/markdown" });
          await downloadFile(blob, fileName + ".md", "text/markdown");
          break;
        }
        
        case "silly": {
          const sillyContent = window.sillyModule.convertToSillyTavernJSONL(selectedMessages, settings.storedUserName, settings.storedCharacterName);
          const blob = new Blob([sillyContent], { type: "application/x-jsonlines" });
          await downloadFile(blob, fileName + ".jsonl", "application/x-jsonlines");
          break;
        }
        
        case "text":
        default: {
          const txtContent = window.utils.convertToTXT(selectedMessages, settings.storedUserName, settings.storedCharacterName);
          const blob = new Blob([txtContent], { type: "text/plain" });
          await downloadFile(blob, fileName + ".txt", "text/plain");
          break;
        }
      }
      
      console.log("匯出完成！");
      return { ok: true, msg: "匯出處理完成" };
      
    } catch (err) {
      console.error("匯出過程發生錯誤：", err);
      throw err;
    }
  }

  // 下載檔案功能
  async function downloadFile(blob, filename, contentType) {
    try {
      // 方法1: 嘗試使用Chrome Downloads API
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            chrome.runtime.sendMessage({
              type: "DOWNLOAD_FILE",
              payload: { 
                dataUrl: reader.result,
                filename: filename 
              }
            }, (response) => {
              if (response && response.ok) {
                resolve();
              } else {
                // 如果API失敗，fallback到直接下載
                directDownload(blob, filename);
                resolve();
              }
            });
          };
          reader.onerror = () => {
            directDownload(blob, filename);
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } else {
        // 方法2: 直接下載
        directDownload(blob, filename);
      }
    } catch (err) {
      console.warn("API下載失敗，使用直接下載:", err);
      directDownload(blob, filename);
    }
  }

  // 直接下載（fallback方法）
  function directDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // 監聽來自background的消息
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "HANDLE_EXPORT") {
        const { conversationData, settings } = message.payload;
        handleExport(conversationData, settings)
          .then(result => sendResponse(result))
          .catch(err => sendResponse({ ok: false, msg: "處理失敗", error: err.message }));
        return true; // 異步響應
      }
    });
  }
  
  // 平台偵測
  function detectPlatform() {
    const hostname = window.location.hostname;
    
    if (hostname.includes('chatgpt.com')) return 'chatgpt';
    if (hostname.includes('gemini.google.com')) return 'gemini';
    if (hostname.includes('chat.mistral.ai')) return 'mistral';
    if (hostname.includes('claude.ai')) return 'claude';
    if (hostname.includes('grok.com')) return 'grok';
    
    return null;
  }

  // 等待平台載入
  function waitForPlatform(maxAttempts = 30, interval = 500) {
    return new Promise((resolve) => {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        const platform = detectPlatform();
        
        if (platform || attempts >= maxAttempts) {
          clearInterval(checkInterval);
          resolve(platform);
        }
      }, interval);
    });
  }

  // ChatGPT 初始化邏輯
  async function initChatGPT() {
    console.log('🤖 初始化 ChatGPT 匯出工具');
    
    const storedData = await chrome.storage.local.get({
        storedFormat: "text",
        storedUserName: "你",
        storedCharacterName: "ChatGPT",
        storedImageWidth: 800,
        storedFontSize: 16,
        storedFontColor: "#ffffff",
        storedBackgroundColor: "#000000",
        storedFontFamily: "新細明體",
        storedUserAvatar: "",
        storedAssistantAvatar: "",
        storedScreenshotStyle: "left",
        storedUserMsgBgColor: "#313131",
        storedAssistantMsgBgColor: "#202020"
      });
      let storedFormat = storedData.storedFormat;
      let storedUserName = storedData.storedUserName;
      let storedCharacterName = storedData.storedCharacterName;
      let storedImageWidth = storedData.storedImageWidth;
      let storedFontSize = storedData.storedFontSize;
      let storedFontColor = storedData.storedFontColor;
      let storedBackgroundColor = storedData.storedBackgroundColor;
      let storedFontFamily = storedData.storedFontFamily;
      let storedUserAvatar = storedData.storedUserAvatar;
      let storedAssistantAvatar = storedData.storedAssistantAvatar;
      let storedScreenshotStyle = storedData.storedScreenshotStyle;
      let storedUserMsgBgColor = storedData.storedUserMsgBgColor;
      let storedAssistantMsgBgColor = storedData.storedAssistantMsgBgColor;

      let selectionModeEnabled = false;
      let conversationData = [];
      let currentUrl = window.location.pathname;
      const chatGptTurnSelector = "article[data-testid^='conversation-turn'], section[data-testid^='conversation-turn']";

      function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }

      function getChatGptTurns() {
        return Array.from(document.querySelectorAll(chatGptTurnSelector));
      }

      function cleanupChatGptClone(cloned) {
        cloned.querySelectorAll([
          ".chat-export-checkbox",
          ".sr-only",
          "button",
          "input[data-testid='collapsible-user-message-toggle-checkbox']",
          "label[data-testid='collapsible-user-message-toggle']",
          "[role='group'][aria-label]"
        ].join(",")).forEach(el => el.remove());
        return cloned;
      }

      function getChatGptRole(turn, roleContainer) {
        return roleContainer?.getAttribute("data-message-author-role")
          || turn.getAttribute("data-turn")
          || (turn.querySelector(".agent-turn, .markdown") ? "assistant" : "user");
      }

      function getChatGptContentNode(root, role) {
        const roleNode = root.querySelector("[data-message-author-role]");
        if (role === "user") {
          return roleNode?.querySelector('[data-testid="collapsible-user-message-content"]')
            || roleNode?.querySelector(".whitespace-pre-wrap")
            || roleNode
            || root;
        }

        return roleNode?.querySelector(".markdown")
          || root.querySelector(".markdown")
          || roleNode
          || root;
      }

      // <<< MODIFIED >>> 合併了新舊版的邏輯
      // 這個函式現在負責在需要時重置狀態
      function checkIfChatChanged() {
        if (window.location.pathname !== currentUrl) {
          console.log("URL change detected. Resetting conversation data.");
          currentUrl = window.location.pathname;
          conversationData = []; // 強制清空舊資料
          
          // 移除所有舊的勾選框，避免殘留
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
          
          // 移除舊的標記，確保能重新掃描
          const allArticles = getChatGptTurns();
          allArticles.forEach(art => art.removeAttribute("data-exported"));
        }
      }

      // 這個函式負責掃描並與當前 DOM 同步對話
      async function scanConversation() {
        // 每次掃描前都檢查 URL 是否變更，這會處理聊天室切換
        checkIfChatChanged(); 

        // 1. 獲取當前頁面上所有對話 article 元素
        const currentArticles = getChatGptTurns();
        const currentArticleSet = new Set(currentArticles);

        // 2.【關鍵】清理 conversationData：移除所有在當前頁面上已不存在的 DOM 元素對應的資料
        //    這一步會自動處理掉「被重新生成」的舊訊息。
        conversationData = conversationData.filter(msg => currentArticleSet.has(msg.element));

        // 建立一個當前已存資料的 Set，方便快速查找
        const existingElementsInConvData = new Set(conversationData.map(msg => msg.element));

        // 3. 新增新訊息：遍歷當前頁面上的 article，如果它不存在於我們已有的資料中，就新增它
        for (const article of currentArticles) {
          if (!existingElementsInConvData.has(article)) {
            // 這是一個全新的訊息，處理並加入
            const cloned = article.cloneNode(true);
            cleanupChatGptClone(cloned);
            
            const roleContainer = cloned.querySelector("[data-message-author-role]");
            const role = getChatGptRole(article, roleContainer);
            const contentNode = getChatGptContentNode(cloned, role);
            const finalText = (contentNode.innerText || contentNode.textContent || "").trim();

            const newMessageData = {
              id: generateId(),
              role,
              text: finalText,
              markdown: getMarkdownFromMessage(contentNode, role === "user"),
              element: article, // 保留對真實 DOM 的引用
              selected: true
            };
            conversationData.push(newMessageData);
          }
        }

        // 可選：根據 DOM 順序排序，確保資料順序正確
        conversationData.sort((a, b) => {
            const position = a.element.compareDocumentPosition(b.element);
            if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        // 如果處於選擇模式，為新掃描到的訊息加上勾選框
        if (selectionModeEnabled) {
          conversationData.forEach(msg => {
            if (!msg.element.querySelector(".chat-export-checkbox")) {
              addCheckboxToMessage(msg.element, msg.id);
            }
          });
        }
      }

      /***************** 工具：安全轉義 *****************/
      function escapeHTML(str) {
        return str.replace(/[&<>"']/g, (m) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
        );
      }

      /***************** 把訊息轉成 Markdown *****************/
      function getMarkdownFromMessage(el, isUser) {
        // 🤖 GPT 或系統訊息 → 照舊 Turndown
        if (!isUser) return turndownService.turndown(el.innerHTML);

        // 🧍‍♀️ 使用者訊息 → 直接拿純文字、自己插兩空格換行
        const raw = el.textContent || "";
        return raw
          .split("\n")                     // 按真實換行切
          .map(line => line.trimEnd())     // 去掉行尾多餘空白
          .join("  \n");                   // Markdown 的 <br>＝兩空格+LF
      }


      const turndownService = new TurndownService();
      if (typeof turndownPluginGfm !== "undefined" && turndownPluginGfm.gfm) {
        turndownService.use(turndownPluginGfm.gfm);
      }
      turndownService.addRule('strikethrough', {
        filter: ['del', 's', 'strike'],
        replacement: function(content) {
          return '~~' + content + '~~';
        }
      });
      turndownService.addRule('gptMultilineCode', {
        filter: function (node) {
          return (
            node.nodeName === 'CODE' &&
            node.className.includes('whitespace-pre') &&
            node.textContent.includes('\n')
          );
        },
        replacement: function (content, node) {
          const langClass = [...node.classList].find(c => c.startsWith('language-'));
          const lang = langClass ? langClass.replace('language-', '') : '';
          return `\n\n\`\`\`${lang}\n${node.textContent}\n\`\`\`\n\n`;
        }
      });

      /*****************************************
       * 注入控制面板到指定位置 (只負責 UI)
       *****************************************/
      let container = document.getElementById("chatgpt-exporter-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "chatgpt-exporter-container";
        container.style.position = "fixed";
        container.style.right = "100px"; 
        container.style.bottom = "25px"; 
        container.style.zIndex = 9999;
        document.body.appendChild(container);
      }
      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "4px";
      
      // 全域選擇設定
      let storedFilter = "all";

      /********************
       * 第一排：Select row
       ********************/
      const selectRow = document.createElement("div");
      selectRow.style.display = "flex";
      selectRow.style.alignItems = "center";
      selectRow.style.gap = "4px";

      // 「Select」按鈕
      const fixedButtonStyle = {
        width: "80px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 8px",
        cursor: "pointer"
      };

      const selectBtn = document.createElement("button");
        selectBtn.textContent = "Select";
        Object.assign(selectBtn.style, fixedButtonStyle);
        selectBtn.addEventListener("click", async () => {
          selectionModeEnabled = !selectionModeEnabled;
        
          if (selectionModeEnabled) {
            await scanConversation();
            conversationData.forEach(msg => {
              addCheckboxToMessage(msg.element, msg.id);
            });
            globalSelectChk.style.display = "inline-block";
            globalSelectChk.style.position = "absolute";
            globalSelectChk.style.right = "8px";
            globalSelectChk.style.top = "5px";
        
            if (storedFilter === "all") {
              conversationData.forEach(m => (m.selected = true));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                cb.checked = true;
              });
              globalSelectChk.checked = true;
            } else if (storedFilter === "user") {
              conversationData.forEach(m => (m.selected = (m.role === "user")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "user";
              });
              globalSelectChk.checked = false;
            } else if (storedFilter === "assistant") {
              conversationData.forEach(m => (m.selected = (m.role === "assistant")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "assistant";
              });
              globalSelectChk.checked = false;
            }
          } else {
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
            globalSelectChk.style.display = "none";
          }
        });
      selectRow.appendChild(selectBtn);

      const selectDropdownBtn = document.createElement("button");
      selectDropdownBtn.textContent = "▾";
      selectDropdownBtn.style.width = "25px";
      selectDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      selectDropdownBtn.style.color = fixedButtonStyle.color;
      selectDropdownBtn.style.border = fixedButtonStyle.border;
      selectDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      selectDropdownBtn.style.padding = "4px 6px";
      selectDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      selectRow.appendChild(selectDropdownBtn);
      // 全選勾選框 (全局)
      const globalSelectChk = document.createElement("input");
      globalSelectChk.type = "checkbox";
      globalSelectChk.checked = true;
      globalSelectChk.style.display = "none";
      globalSelectChk.addEventListener("change", () => {
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
          cb.checked = globalSelectChk.checked;
          const msgId = cb.getAttribute("data-msg-id");
          const msg = conversationData.find(m => m.id === msgId);
          if (msg) msg.selected = globalSelectChk.checked;
        });
      });
      selectRow.appendChild(globalSelectChk);
      // 下拉選單 (Select)
      const selectDropdownMenu = document.createElement("div");
      selectDropdownMenu.style.position = "absolute";
      selectDropdownMenu.style.backgroundColor = "#555";
      selectDropdownMenu.style.border = "1px solid #777";
      selectDropdownMenu.style.borderRadius = "4px";
      selectDropdownMenu.style.padding = "4px";
      selectDropdownMenu.style.bottom = "35px";
      selectDropdownMenu.style.left = "0";
      selectDropdownMenu.style.display = "none";
      const selectOptions = [
        { value: "all", label: "全選" },
        { value: "user", label: "只選 user" },
        { value: "assistant", label: "只選 GPT" }
      ];
      selectOptions.forEach(opt => {
        const optBtn = document.createElement("div");
        optBtn.textContent = opt.label;
        optBtn.style.padding = "4px";
        optBtn.style.cursor = "pointer";
        if (opt.value === storedFilter) {
          optBtn.style.backgroundColor = "#777";
        }
        optBtn.addEventListener("click", () => {
          storedFilter = opt.value;
          Array.from(selectDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === opt.label ? "#777" : "");
          });
          selectDropdownBtn.textContent = "▾";
          selectDropdownMenu.style.display = "none";
          
          conversationData.forEach(msg => {
            let newState;
            if (storedFilter === "all") {
              newState = true;
            } else if (storedFilter === "user") {
              newState = (msg.role === "user");
            } else if (storedFilter === "assistant") {
              newState = (msg.role === "assistant");
            }
            msg.selected = newState;
            const chk = msg.element.querySelector(`[data-msg-id="${msg.id}"]`);
            if (chk) {
              chk.checked = newState;
            }
          });
          globalSelectChk.checked = (storedFilter === "all");
        });
        selectDropdownMenu.appendChild(optBtn);
      });
      selectDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectDropdownMenu.style.display = selectDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { selectDropdownMenu.style.display = "none"; });
      selectRow.style.position = "relative";
      selectRow.appendChild(selectDropdownMenu);

      /********************
       * 第二排：Export row
       ********************/
      const exportRow = document.createElement("div");
      exportRow.style.display = "flex";
      exportRow.style.alignItems = "center";
      exportRow.style.gap = "4px";

      const exportBtnText = document.createElement("button");
      exportBtnText.textContent = "Export";
      Object.assign(exportBtnText.style, fixedButtonStyle);
      exportBtnText.addEventListener("click", doExport);
      exportRow.appendChild(exportBtnText);

      const exportDropdownBtn = document.createElement("button");
      exportDropdownBtn.textContent = "▾";
      exportDropdownBtn.style.width = "25px";
      exportDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      exportDropdownBtn.style.color = fixedButtonStyle.color;
      exportDropdownBtn.style.border = fixedButtonStyle.border;
      exportDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      exportDropdownBtn.style.padding = "4px 6px";
      exportDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      exportRow.appendChild(exportDropdownBtn);

      const exportDropdownMenu = document.createElement("div");
      exportDropdownMenu.style.position = "absolute";
      exportDropdownMenu.style.backgroundColor = "#555";
      exportDropdownMenu.style.border = "1px solid #777";
      exportDropdownMenu.style.borderRadius = "4px";
      exportDropdownMenu.style.padding = "4px";
      exportDropdownMenu.style.bottom = "35px";
      exportDropdownMenu.style.left = "0";
      exportDropdownMenu.style.display = "none";

      const formats = [
        { val: "image", label: "IMAGE" },
        { val: "text", label: "TEXT" },
        { val: "markdown", label: "MARKDOWN" },
      // { val: "pdf-html2",label: "PDF (圖片)" },
      // { val: "pdf-lib",  label: "PDF (文字)" },
        { val: "silly", label: "SILLY" }
      ];
      formats.forEach(fmt => {
        const fmtBtn = document.createElement("div");
        fmtBtn.textContent = fmt.label;
        fmtBtn.style.padding = "4px";
        fmtBtn.style.cursor = "pointer";
        if (fmt.val === storedFormat) {
          fmtBtn.style.backgroundColor = "#777";
        }
        fmtBtn.addEventListener("click", async () => {
          storedFormat = fmt.val;
          await chrome.storage.local.set({ storedFormat });
          Array.from(exportDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === fmt.label ? "#777" : "");
          });
          exportDropdownBtn.textContent = "▾";
          exportDropdownMenu.style.display = "none";
        });
        exportDropdownMenu.appendChild(fmtBtn);
      });
      exportDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportDropdownMenu.style.display = exportDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { exportDropdownMenu.style.display = "none"; });
      exportRow.style.position = "relative";
      exportRow.appendChild(exportDropdownMenu);

      // 設定按鈕：點擊後顯示設定面板（設定面板也只屬於 UI 部分）
      const settingsBtn = document.createElement("button");
      settingsBtn.textContent = "⚙️";
      settingsBtn.style.width = "35px";
      settingsBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      settingsBtn.style.color = fixedButtonStyle.color;
      settingsBtn.style.border = fixedButtonStyle.border;
      settingsBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      settingsBtn.style.padding = fixedButtonStyle.padding;
      settingsBtn.style.cursor = fixedButtonStyle.cursor;
      settingsBtn.addEventListener("click", showSettingsPanel);
      exportRow.appendChild(settingsBtn);

      container.innerHTML = "";
      container.appendChild(selectRow);
      container.appendChild(exportRow);

      /*****************************************
       * 設定面板：設定使用者名稱、角色名稱、外觀等（僅 UI）
       *****************************************/
      function showSettingsPanel() {
        const style = document.createElement("style");
        style.textContent = `
          .setting-input, .setting-select {
            height: 36px;
            padding: 4px 8px;
            font-size: 14px;
            line-height: 1.2;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            background-color: #fff;
            color: #000;
            width: 100%;
            margin-bottom: 5px;
          }
          .setting-color {
            height: 36px;
            width: 100%;
            padding: 0;
            border: none;
            background: none;
          }
          .setting-avatar-container img {
          display: inline-block;
          }
        `;
        document.head.appendChild(style);
      
        const settingsPanel = document.createElement("div");
        settingsPanel.style.position = "fixed";
        settingsPanel.style.top = "50%";
        settingsPanel.style.left = "50%";
        settingsPanel.style.transform = "translate(-50%, -50%)";
        settingsPanel.style.backgroundColor = "#222";
        settingsPanel.style.padding = "20px";
        settingsPanel.style.borderRadius = "6px";
        settingsPanel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.7)";
        settingsPanel.style.zIndex = "10000";
        settingsPanel.style.width = "600px";
        settingsPanel.style.maxHeight = "80vh";
        settingsPanel.style.overflowY = "auto";
      
        const title = document.createElement("div");
        title.textContent = "設定";
        title.style.marginBottom = "10px";
        title.style.fontSize = "16px";
        title.style.fontWeight = "bold";
        title.style.color = "#fff";
        settingsPanel.appendChild(title);
      
        const settingsContainer = document.createElement("div");
        settingsContainer.style.display = "flex";
        settingsContainer.style.flexWrap = "wrap";
        settingsContainer.style.gap = "10px";
      
        const groups = [
            { label: "基本設定", fields: [
              { label: "使用者名稱", value: storedUserName, key: "storedUserName" },
              { label: "角色名稱", value: storedCharacterName, key: "storedCharacterName" }
            ]},
            { label: "頭像設定", fields: [
              { label: "使用者頭像", value: storedUserAvatar, key: "storedUserAvatar" },
              { label: "角色頭像", value: storedAssistantAvatar, key: "storedAssistantAvatar" }
            ]},
            { label: "外觀設定", fields: [
              { label: "圖片寬度 (px)", value: storedImageWidth, key: "storedImageWidth" },
              { label: "字體大小 (px)", value: storedFontSize, key: "storedFontSize" },
              { label: "字體顏色", value: storedFontColor, key: "storedFontColor" },
              { label: "使用者訊息背景顏色", value: storedUserMsgBgColor || "#313131", key: "storedUserMsgBgColor" },
            ]},
            { label: "外觀設定", fields: [
              { label: "背景顏色", value: storedBackgroundColor, key: "storedBackgroundColor" },
              { label: "字體", value: storedFontFamily, key: "storedFontFamily" },
              { label: "截圖風格", value: storedScreenshotStyle, key: "storedScreenshotStyle", type: "select", options: [
                { value: "left", label: "全部左側" },
                { value: "bubble", label: "聊天泡泡" }
              ]},
              { label: "GPT訊息背景顏色", value: storedAssistantMsgBgColor || "#202020", key: "storedAssistantMsgBgColor" }
            ]}
          ];
      
        groups.forEach(group => {
            const groupContainer = document.createElement("div");
            groupContainer.style.flex = "1";
            groupContainer.style.minWidth = "200px";
            groupContainer.style.boxSizing = "border-box";
      
            const groupTitle = document.createElement("div");
            groupTitle.textContent = group.label;
            groupTitle.style.color = "#fff";
            groupTitle.style.marginTop = "10px";
            groupTitle.style.fontWeight = "bold";
            groupContainer.appendChild(groupTitle);
      
            group.fields.forEach(field => {
              const fieldLabel = document.createElement("div");
              fieldLabel.textContent = field.label;
              fieldLabel.style.color = "#fff";
              fieldLabel.style.marginTop = "5px";
              fieldLabel.style.fontSize = "14px";
              groupContainer.appendChild(fieldLabel);
              
              if (field.key === "storedUserAvatar" || field.key === "storedAssistantAvatar") {
                const avatarContainer = document.createElement("div");
                avatarContainer.className = "setting-avatar-container";
                avatarContainer.style.display = "flex";
                avatarContainer.style.alignItems = "center";
                avatarContainer.style.gap = "10px";
                avatarContainer.style.marginBottom = "5px";

                const previewImg = document.createElement("img");
                previewImg.style.width = "36px";
                previewImg.style.height = "36px";
                previewImg.style.objectFit = "cover";
                previewImg.style.border = "1px solid #ccc";
                previewImg.style.borderRadius = "4px";
                previewImg.src = field.value || "";

                const browseBtn = document.createElement("button");
                browseBtn.textContent = "瀏覽檔案";
                browseBtn.className = "setting-input"; 
                browseBtn.style.height = "36px";
                browseBtn.style.lineHeight = "28px";
                browseBtn.style.width = "calc(50% - 50px)";
                browseBtn.style.display = "inline-block";

                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                browseBtn.addEventListener("click", () => fileInput.click());

                fileInput.addEventListener("change", (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = async function(evt) {
                      const dataURL = evt.target.result;
                      previewImg.src = dataURL;
                      const key = field.key === "storedUserAvatar" ? "storedUserAvatar" : "storedAssistantAvatar";
                      if (key === "storedUserAvatar") storedUserAvatar = dataURL;
                      else storedAssistantAvatar = dataURL;
                      await chrome.storage.local.set({ [key]: dataURL });
                    };
                    reader.readAsDataURL(file);
                  }
                });

                avatarContainer.appendChild(browseBtn);
                avatarContainer.appendChild(previewImg);
                groupContainer.appendChild(fileInput);
                groupContainer.appendChild(avatarContainer);

              } else {
              let input;
              if (field.type === "select") {
                input = document.createElement("select");
                field.options.forEach(opt => {
                  const option = document.createElement("option");
                  option.value = opt.value;
                  option.textContent = opt.label;
                  if (opt.value === field.value) option.selected = true;
                  input.appendChild(option);
                });
                input.className = "setting-select";
              } else {
                input = document.createElement("input");
                input.type = ["storedFontColor", "storedBackgroundColor", "storedUserMsgBgColor", "storedAssistantMsgBgColor"].includes(field.key) ? "color" : "text";
                input.value = field.value;
                input.className = input.type === "color" ? "setting-color" : "setting-input";
              }
      
              input.addEventListener("change", async () => {
                const newValue = input.value.trim();
                switch (field.key) {
                  case "storedUserName": storedUserName = newValue || "你"; break;
                  case "storedCharacterName": storedCharacterName = newValue || "ChatGPT"; break;
                  case "storedImageWidth": storedImageWidth = Number(newValue) || 800; break;
                  case "storedFontSize": storedFontSize = Number(newValue) || 16; break;
                  case "storedFontColor": storedFontColor = newValue || "#ffffff"; break;
                  case "storedBackgroundColor": storedBackgroundColor = newValue || "#000000"; break;
                  case "storedFontFamily": storedFontFamily = newValue || "新細明體"; break;
                  case "storedScreenshotStyle": storedScreenshotStyle = newValue; break;
                  case "storedUserMsgBgColor": storedUserMsgBgColor = newValue || "#313131"; break;
                  case "storedAssistantMsgBgColor": storedAssistantMsgBgColor = newValue || "#202020"; break;
                }
                await chrome.storage.local.set({ [field.key]: newValue });
              });
      
              groupContainer.appendChild(input);
            }
          });
      
          settingsContainer.appendChild(groupContainer);
        });
      
        settingsPanel.appendChild(settingsContainer);
      
        const btnContainer = document.createElement("div");
        btnContainer.style.marginTop = "10px";
        btnContainer.style.textAlign = "center";
      
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "儲存";
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.color = "#fff";
        saveBtn.style.border = "none";
        saveBtn.style.borderRadius = "4px";
        saveBtn.style.padding = "6px 12px";
        saveBtn.style.cursor = "pointer";
        saveBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "取消";
        cancelBtn.style.backgroundColor = "#666";
        cancelBtn.style.color = "#fff";
        cancelBtn.style.border = "none";
        cancelBtn.style.borderRadius = "4px";
        cancelBtn.style.padding = "6px 12px";
        cancelBtn.style.cursor = "pointer";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        btnContainer.appendChild(saveBtn);
        btnContainer.appendChild(cancelBtn);
        settingsPanel.appendChild(btnContainer);
        document.body.appendChild(settingsPanel);
      }  

    //html轉換開始
      /**
     * 用 Fetch 抓取圖片並轉成 Base64 Data URI
     * @param {string} url - 圖片的 URL
     * @returns {Promise<string>} 回傳 Base64 資料 URI
     */
      async function fetchAsBase64(url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("讀取圖片失敗");
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Fetch 失敗：", err);
          throw err;
        }
      }
        /**
       * 替換 container 裡所有 <img> 的 src 屬性為 Base64 Data URI（使用 fetch）
       * @param {HTMLElement} container - 目標容器
       * @returns {Promise<void>}
       */
      async function replaceImagesWithBase64(container) {
        const images = container.querySelectorAll("img");
        await Promise.all([...images].map(async (img) => {
          if (img.src.startsWith("data:")) return;
          try {
            img.crossOrigin = "anonymous";   // 避免 CORS 被幹掉
            const dataURL = await fetchAsBase64(img.src);
            img.src = dataURL;
            console.log("圖片已轉 Base64：", dataURL.slice(0, 40) + "...");
            } catch (err) {
        console.error("轉換圖片失敗：", err);
        }
      }))};
      /**
       * 同一則訊息裡，如果出現相同的圖片，只保留第一張，其餘移除
       * @param {HTMLElement} container - 目標容器
       */
      function removeDuplicateImages(container) {
        const images = container.querySelectorAll("img");
        const srcSet = new Set();
        images.forEach((img) => {
          if (srcSet.has(img.src)) {
            img.remove();
          } else {
            srcSet.add(img.src);
          }
        });
      }
      
      async function triggerImageConversion(options = {}) {
        const { splitMode = false, maxHeight = 4096, containerElem: passedContainer } = options;
        let containerElem = passedContainer;
        if (!containerElem) {
          const firstSelected = conversationData.find(m => m.selected);
          if (firstSelected) containerElem = firstSelected.element.parentElement;
        }
        if (!containerElem) {
          containerElem = document.querySelector(chatGptTurnSelector)?.parentElement;
        }
        if (!containerElem) {
          console.error("找不到對話容器 (triggerImageConversion)");
          return;
        }

        // 先將圖片轉為 Base64 並移除重複圖片
        await replaceImagesWithBase64(containerElem);
        removeDuplicateImages(containerElem);

        // 使用 Turndown 轉 Markdown，並加入 GFM 支援（若已載入 turndown-plugin-gfm）
        conversationData.forEach(msg => {
          const original = msg.element;
          const cloned = original.cloneNode(true);
        
          // 1. 移除 <h5>/<h6> 的 sr-only
          cleanupChatGptClone(cloned);
        
          // 2. 圖片處理：把原始圖片（已轉 base64）塞回 cloned
          const originalImgs = original.querySelectorAll("img");
          const clonedImgs = cloned.querySelectorAll("img");
          clonedImgs.forEach((img, i) => {
            if (originalImgs[i]) img.src = originalImgs[i].src;
          });
        
          // 3. 只取「真正訊息」的容器（class 名太長我他媽也會背）
          const contentDiv = getChatGptContentNode(cloned, msg.role);
        
          // 安全檢查：沒有的話就放空
          msg.html = contentDiv ? contentDiv.innerHTML : "<p>（內容消失惹 QQ）</p>";
        
          // 4. markdown 轉換
          msg.markdown = getMarkdownFromMessage(contentDiv || cloned, msg.role === "user");

        });
        window.__cocoCatchSplitMode = splitMode;
        window.__cocoCatchMaxHeight = maxHeight;
        // 定義截圖設定（可根據需求調整）
        const settings = {
          storedFormat,
            pageTitle: document.title,
            storedImageWidth,
            storedFontSize,
            storedFontColor,
            storedBackgroundColor,
            storedFontFamily,
            storedUserAvatar,
            storedAssistantAvatar,
            storedScreenshotStyle,
            storedUserMsgBgColor,
            storedAssistantMsgBgColor
        };
        }

      /*****************************************
       * 匯出功能：收集對話後，交給 background 層處理
       *****************************************/
      async function doExport() {
        await scanConversation();
        let selectedMessages = conversationData.filter(m => m.selected);
        if (selectedMessages.length === 0) {
          alert("沒有符合篩選條件的訊息！");
          return;
        }
        const isImageExport = (storedFormat === "image");
        const MAX_HEIGHT = 4096;
        let splitMode = false;
      
        if (isImageExport) {
          // 只計算選取區段的高度
          const totalHeight = selectedMessages.reduce((h, m) => h + (m.element?.offsetHeight || 0), 0);
          if (totalHeight > MAX_HEIGHT) {
            const ok = window.confirm(`選取的訊息高度 ${totalHeight}px 已超過 ${MAX_HEIGHT}px，將自動分張並壓縮下載，確定嗎？`);
            if (!ok) return;
            splitMode = true;
          }
        }
        await triggerImageConversion({ splitMode, maxHeight: MAX_HEIGHT });
        // 建立 sanitizedData，不包含 element 屬性
        const sanitizedData = selectedMessages.map(m => {
          return {
            id: m.id,
            role: m.role,
            // 匯出用：前面加使用者自訂名稱
            text: `${m.role === "user" ? storedUserName : storedCharacterName}：${m.markdown}`,
            // 截圖用：保持純原文給 marked 解析
            markdown: m.markdown,
            selected: m.selected,
            //html: m.html
          };
        });
      
        const payload = {
          conversationData: sanitizedData,
          settings: {
            splitMode,
            maxHeight: MAX_HEIGHT,
            storedFormat,
            storedUserName,
            storedCharacterName,
            storedImageWidth,
            storedFontSize,
            storedFontColor,
            storedBackgroundColor,
            storedFontFamily,
            storedUserAvatar,
            storedAssistantAvatar,
            storedScreenshotStyle,
            storedUserMsgBgColor,
            storedAssistantMsgBgColor,
            fileNameBase: document.title
          }
        };
      
        try {
          // 直接在content script中執行匯出邏輯
          const result = await handleExport(sanitizedData, payload.settings);
          console.log("匯出完成:", result);
        } catch (error) {
          console.error("匯出失敗:", error);
        }
      }
      
      // 幫訊息加入勾選框
      function addCheckboxToMessage(article, msgId) {
        if (article.querySelector(`[data-msg-id="${msgId}"]`)) return;
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "chat-export-checkbox";
        chk.setAttribute("data-msg-id", msgId);
        const msg = conversationData.find(m => m.id === msgId);
        chk.checked = !!(msg && msg.selected);
        chk.style.position = "absolute";
        chk.style.right = "100px";
        chk.style.top = "42px";
        chk.style.zIndex = "1000";
        chk.addEventListener("change", () => {
          const changingMsg = conversationData.find(m => m.id === msgId);
          if (changingMsg) changingMsg.selected = chk.checked;
        });
        article.style.position = "relative";
        article.appendChild(chk);
      }

      // <<< REPLACED/NEW >>> 全新的啟動和監聽邏輯

      // 1. MutationObserver 持續監聽 DOM 變化 (新訊息、重新生成)
      const mainObserver = new MutationObserver(async (mutations) => {
        // 偵測到任何子樹變化，都重新掃描一次
        // scanConversation 內部的機制會處理好 URL 變更和新訊息
        const hasRelevantChanges = mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0);
        if (hasRelevantChanges) {
          await scanConversation();
        }
      });

      // 2. 使用 setInterval 確保擴充功能在頁面切換後能正確啟動
      //    這比單純的 waitForElement 更能應對 SPA 的複雜載入
      let startupInterval = setInterval(() => {
        const mainElem = document.querySelector("main");
        const threadElem = document.querySelector(chatGptTurnSelector)
          || document.querySelector("[data-message-author-role]")
          || document.querySelector('div[class*="react-scroll-to-bottom"]'); // ChatGPT 實際對話滾動區

        // 必須等到 <main> 和對話滾動區都出現，才代表頁面載入完成
        if (mainElem && threadElem) {
          console.log("✅ ChatGPT UI is ready. Initializing exporter.");
          
          // 首次執行
          currentUrl = window.location.pathname;
          scanConversation();
          
          // 啟動 MutationObserver
          mainObserver.observe(mainElem, {
            childList: true,
            subtree: true,
          });
          
          // 完成後清除 Interval
          clearInterval(startupInterval);
        }
      }, 500);
    
    console.log('✅ ChatGPT 匯出工具初始化完成');
  }

  // Gemini 初始化邏輯
  async function initGemini() {
    console.log('🔮 初始化 Gemini 匯出工具');
    
    const storedData = await chrome.storage.local.get({
      storedFormat: "text",
      storedUserName: "你",
      storedCharacterName: "Gemini",
      storedImageWidth: 800,
      storedFontSize: 16,
      storedFontColor: "#ffffff",
      storedBackgroundColor: "#000000",
      storedFontFamily: "新細明體",
      storedUserAvatar: "",
      storedAssistantAvatar: "",
      storedScreenshotStyle: "left",
      storedUserMsgBgColor: "#313131",
      storedAssistantMsgBgColor: "#202020"
    });
    
    let storedFormat = storedData.storedFormat;
    let storedUserName = storedData.storedUserName;
    let storedCharacterName = storedData.storedCharacterName;
    let storedImageWidth = storedData.storedImageWidth;
    let storedFontSize = storedData.storedFontSize;
    let storedFontColor = storedData.storedFontColor;
    let storedBackgroundColor = storedData.storedBackgroundColor;
    let storedFontFamily = storedData.storedFontFamily;
    let storedUserAvatar = storedData.storedUserAvatar;
    let storedAssistantAvatar = storedData.storedAssistantAvatar;
    let storedScreenshotStyle = storedData.storedScreenshotStyle;
    let storedUserMsgBgColor = storedData.storedUserMsgBgColor;
    let storedAssistantMsgBgColor = storedData.storedAssistantMsgBgColor;

    let selectionModeEnabled = false;
    let conversationData = [];
    let currentUrl = window.location.pathname;

    function generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }

    // 檢查聊天是否切換
    function checkIfChatChanged() {
      if (window.location.pathname !== currentUrl) {
        console.log("URL change detected. Resetting conversation data.");
        currentUrl = window.location.pathname;
        conversationData = [];
        
        // 移除所有舊的勾選框
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
        
        // 移除舊的標記
        const allUserQueries = document.querySelectorAll("user-query-content");
        const allMessages = document.querySelectorAll("message-content");
        [...allUserQueries, ...allMessages].forEach(elem => elem.removeAttribute("data-exported"));
      }
    }

    // === 核心修改：適配 Gemini 的 DOM 結構 ===
    async function scanConversation() {
      checkIfChatChanged();

      // 1. 獲取 Gemini 的用戶查詢和 AI 回應
      const userQueries = Array.from(document.querySelectorAll("user-query-content"));
      const aiResponses = Array.from(document.querySelectorAll("message-content"));
      
      // 2. 合併所有訊息元素並按 DOM 順序排序
      const allMessageElements = [...userQueries, ...aiResponses];
      allMessageElements.sort((a, b) => {
        const position = a.compareDocumentPosition(b);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      const currentElementSet = new Set(allMessageElements);

      // 3. 清理 conversationData：移除已不存在的元素
      conversationData = conversationData.filter(msg => currentElementSet.has(msg.element));

      const existingElementsInConvData = new Set(conversationData.map(msg => msg.element));

      // 4. 新增新訊息
      for (const element of allMessageElements) {
        if (!existingElementsInConvData.has(element)) {
          const role = element.tagName.toLowerCase() === "user-query-content" ? "user" : "assistant";
          
          // 提取文字內容
          let finalText = "";
          if (role === "user") {
            // 用戶訊息：從 .query-text-line 提取（保持換行）
            const queryTextLines = element.querySelectorAll(".query-text-line");
            if (queryTextLines.length > 0) {
              finalText = Array.from(queryTextLines)
                .map(line => line.textContent.trim())
                .filter(line => line.length > 0) // 過濾空行
                .join("\n");
            } else {
              // 備用方案：從 .query-text 提取
              const queryText = element.querySelector(".query-text");
              if (queryText) {
                const paragraphs = queryText.querySelectorAll("p");
                if (paragraphs.length > 0) {
                  finalText = Array.from(paragraphs)
                    .map(p => p.textContent.trim())
                    .filter(text => text.length > 0)
                    .join("\n");
                } else {
                  finalText = queryText.textContent.trim();
                }
              } else {
                finalText = element.textContent.trim();
              }
            }
          } else {
            // AI 回應：從 .markdown 容器提取
            const markdownContainer = element.querySelector(".markdown");
            finalText = markdownContainer ? markdownContainer.textContent.trim() : element.textContent.trim();
          }

          const newMessageData = {
            id: generateId(),
            role,
            text: finalText,
            markdown: getMarkdownFromMessage(element, role === "user"),
            element: element,
            selected: true
          };
          conversationData.push(newMessageData);
        }
      }

      // 5. 重新排序（按 DOM 順序）
      conversationData.sort((a, b) => {
        const position = a.element.compareDocumentPosition(b.element);
        if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      // 6. 如果處於選擇模式，為新掃描到的訊息加上勾選框
      if (selectionModeEnabled) {
        conversationData.forEach(msg => {
          if (!msg.element.querySelector(".chat-export-checkbox")) {
            addCheckboxToMessage(msg.element, msg.id);
          }
        });
      }
    }

    // 安全轉義
    function escapeHTML(str) {
      return str.replace(/[&<>"']/g, (m) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
      );
    }

    // 把訊息轉成 Markdown（適配 Gemini）
    function getMarkdownFromMessage(el, isUser) {
      if (!isUser) {
        // AI 回應：嘗試從 markdown 容器取得 HTML
        const markdownContainer = el.querySelector(".markdown");
        if (markdownContainer) {
          return turndownService.turndown(markdownContainer.innerHTML);
        }
        return turndownService.turndown(el.innerHTML);
      }

        // 1. 首先嘗試從 .query-text-line 元素提取（每個元素一行）
        const queryTextLines = el.querySelectorAll(".query-text-line");
        if (queryTextLines.length > 0) {
          return Array.from(queryTextLines)
            .map(line => line.textContent.trim())
            .filter(line => line.length > 0) // 過濾空行
            .join("\n");
        }

        // 2. 備用方案：從 .query-text 提取
        const queryText = el.querySelector(".query-text");
        if (queryText) {
          // 檢查是否有多個 <p> 標籤
          const paragraphs = queryText.querySelectorAll("p");
          if (paragraphs.length > 0) {
            return Array.from(paragraphs)
              .map(p => p.textContent.trim())
              .filter(text => text.length > 0)
              .join("\n");
          }
          return queryText.textContent.trim();
        }

        // 3. 最後備用方案：直接從元素文字內容提取
        const raw = el.textContent || "";
        return raw
          .split("\n")
          .map(line => line.trimEnd())
          .filter(line => line.length > 0) // 過濾空行
          .join("\n");
      }

    // 初始化 Turndown 服務
    const turndownService = new TurndownService();
    if (typeof turndownPluginGfm !== "undefined" && turndownPluginGfm.gfm) {
      turndownService.use(turndownPluginGfm.gfm);
    }
    
    turndownService.addRule('strikethrough', {
      filter: ['del', 's', 'strike'],
      replacement: function(content) {
        return '~~' + content + '~~';
      }
    });

    turndownService.addRule('geminiCode', {
      filter: function (node) {
        return (
          node.nodeName === 'CODE' &&
          node.textContent.includes('\n')
        );
      },
      replacement: function (content, node) {
        // Gemini 可能沒有明確的語言標記，使用通用處理
        return `\n\n\`\`\`\n${node.textContent}\n\`\`\`\n\n`;
      }
    });

    /*****************************************
     * 注入控制面板到指定位置 (只負責 UI)
     *****************************************/
    let container = document.getElementById("gemini-exporter-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "gemini-exporter-container";
      container.style.position = "fixed";
      container.style.right = "100px"; 
      container.style.bottom = "25px"; 
      container.style.zIndex = 9999;
      document.body.appendChild(container);
    }
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "4px";
    
    // 全域選擇設定
    let storedFilter = "all";

    /********************
     * 第一排：Select row
     ********************/
    const selectRow = document.createElement("div");
    selectRow.style.display = "flex";
    selectRow.style.alignItems = "center";
    selectRow.style.gap = "4px";

    // 「Select」按鈕
    const fixedButtonStyle = {
      width: "80px",
      backgroundColor: "#444",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "4px 8px",
      cursor: "pointer"
    };

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select";
    Object.assign(selectBtn.style, fixedButtonStyle);
    selectBtn.addEventListener("click", async () => {
      selectionModeEnabled = !selectionModeEnabled;
    
      if (selectionModeEnabled) {
        await scanConversation();
        conversationData.forEach(msg => {
          addCheckboxToMessage(msg.element, msg.id);
        });
        globalSelectChk.style.display = "inline-block";
        globalSelectChk.style.position = "absolute";
        globalSelectChk.style.right = "8px";
        globalSelectChk.style.top = "5px";
    
        if (storedFilter === "all") {
          conversationData.forEach(m => (m.selected = true));
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
            cb.checked = true;
          });
          globalSelectChk.checked = true;
        } else if (storedFilter === "user") {
          conversationData.forEach(m => (m.selected = (m.role === "user")));
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
            const msgId = cb.getAttribute("data-msg-id");
            const msg = conversationData.find(m => m.id === msgId);
            cb.checked = msg && msg.role === "user";
          });
          globalSelectChk.checked = false;
        } else if (storedFilter === "assistant") {
          conversationData.forEach(m => (m.selected = (m.role === "assistant")));
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
            const msgId = cb.getAttribute("data-msg-id");
            const msg = conversationData.find(m => m.id === msgId);
            cb.checked = msg && msg.role === "assistant";
          });
          globalSelectChk.checked = false;
        }
      } else {
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
        globalSelectChk.style.display = "none";
      }
    });
    selectRow.appendChild(selectBtn);

    const selectDropdownBtn = document.createElement("button");
    selectDropdownBtn.textContent = "▾";
    selectDropdownBtn.style.width = "25px";
    selectDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
    selectDropdownBtn.style.color = fixedButtonStyle.color;
    selectDropdownBtn.style.border = fixedButtonStyle.border;
    selectDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
    selectDropdownBtn.style.padding = "4px 6px";
    selectDropdownBtn.style.cursor = fixedButtonStyle.cursor;
    selectRow.appendChild(selectDropdownBtn);

    // 全選勾選框 (全局)
    const globalSelectChk = document.createElement("input");
    globalSelectChk.type = "checkbox";
    globalSelectChk.checked = true;
    globalSelectChk.style.display = "none";
    globalSelectChk.addEventListener("change", () => {
      document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
        cb.checked = globalSelectChk.checked;
        const msgId = cb.getAttribute("data-msg-id");
        const msg = conversationData.find(m => m.id === msgId);
        if (msg) msg.selected = globalSelectChk.checked;
      });
    });
    selectRow.appendChild(globalSelectChk);

    // 下拉選單 (Select)
    const selectDropdownMenu = document.createElement("div");
    selectDropdownMenu.style.position = "absolute";
    selectDropdownMenu.style.backgroundColor = "#555";
    selectDropdownMenu.style.border = "1px solid #777";
    selectDropdownMenu.style.borderRadius = "4px";
    selectDropdownMenu.style.padding = "4px";
    selectDropdownMenu.style.bottom = "35px";
    selectDropdownMenu.style.left = "0";
    selectDropdownMenu.style.display = "none";
    
    const selectOptions = [
      { value: "all", label: "全選" },
      { value: "user", label: "只選 user" },
      { value: "assistant", label: "只選 Gemini" }
    ];
    
    selectOptions.forEach(opt => {
      const optBtn = document.createElement("div");
      optBtn.textContent = opt.label;
      optBtn.style.padding = "4px";
      optBtn.style.cursor = "pointer";
      if (opt.value === storedFilter) {
        optBtn.style.backgroundColor = "#777";
      }
      optBtn.addEventListener("click", () => {
        storedFilter = opt.value;
        Array.from(selectDropdownMenu.children).forEach(child => {
          child.style.backgroundColor = (child.textContent === opt.label ? "#777" : "");
        });
        selectDropdownBtn.textContent = "▾";
        selectDropdownMenu.style.display = "none";
        
        conversationData.forEach(msg => {
          let newState;
          if (storedFilter === "all") {
            newState = true;
          } else if (storedFilter === "user") {
            newState = (msg.role === "user");
          } else if (storedFilter === "assistant") {
            newState = (msg.role === "assistant");
          }
          msg.selected = newState;
          const chk = msg.element.querySelector(`[data-msg-id="${msg.id}"]`);
          if (chk) {
            chk.checked = newState;
          }
        });
        globalSelectChk.checked = (storedFilter === "all");
      });
      selectDropdownMenu.appendChild(optBtn);
    });
    
    selectDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectDropdownMenu.style.display = selectDropdownMenu.style.display === "none" ? "block" : "none";
    });
    document.addEventListener("click", () => { selectDropdownMenu.style.display = "none"; });
    selectRow.style.position = "relative";
    selectRow.appendChild(selectDropdownMenu);

    /********************
     * 第二排：Export row
     ********************/
    const exportRow = document.createElement("div");
    exportRow.style.display = "flex";
    exportRow.style.alignItems = "center";
    exportRow.style.gap = "4px";

    const exportBtnText = document.createElement("button");
    exportBtnText.textContent = "Export";
    Object.assign(exportBtnText.style, fixedButtonStyle);
    exportBtnText.addEventListener("click", doExport);
    exportRow.appendChild(exportBtnText);

    const exportDropdownBtn = document.createElement("button");
    exportDropdownBtn.textContent = "▾";
    exportDropdownBtn.style.width = "25px";
    exportDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
    exportDropdownBtn.style.color = fixedButtonStyle.color;
    exportDropdownBtn.style.border = fixedButtonStyle.border;
    exportDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
    exportDropdownBtn.style.padding = "4px 6px";
    exportDropdownBtn.style.cursor = fixedButtonStyle.cursor;
    exportRow.appendChild(exportDropdownBtn);

    const exportDropdownMenu = document.createElement("div");
    exportDropdownMenu.style.position = "absolute";
    exportDropdownMenu.style.backgroundColor = "#555";
    exportDropdownMenu.style.border = "1px solid #777";
    exportDropdownMenu.style.borderRadius = "4px";
    exportDropdownMenu.style.padding = "4px";
    exportDropdownMenu.style.bottom = "35px";
    exportDropdownMenu.style.left = "0";
    exportDropdownMenu.style.display = "none";

    const formats = [
      { val: "image", label: "IMAGE" },
      { val: "text", label: "TEXT" },
      { val: "markdown", label: "MARKDOWN" },
      { val: "silly", label: "SILLY" }
    ];
    
    formats.forEach(fmt => {
      const fmtBtn = document.createElement("div");
      fmtBtn.textContent = fmt.label;
      fmtBtn.style.padding = "4px";
      fmtBtn.style.cursor = "pointer";
      if (fmt.val === storedFormat) {
        fmtBtn.style.backgroundColor = "#777";
      }
      fmtBtn.addEventListener("click", async () => {
        storedFormat = fmt.val;
        await chrome.storage.local.set({ storedFormat });
        Array.from(exportDropdownMenu.children).forEach(child => {
          child.style.backgroundColor = (child.textContent === fmt.label ? "#777" : "");
        });
        exportDropdownBtn.textContent = "▾";
        exportDropdownMenu.style.display = "none";
      });
      exportDropdownMenu.appendChild(fmtBtn);
    });
    
    exportDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportDropdownMenu.style.display = exportDropdownMenu.style.display === "none" ? "block" : "none";
    });
    document.addEventListener("click", () => { exportDropdownMenu.style.display = "none"; });
    exportRow.style.position = "relative";
    exportRow.appendChild(exportDropdownMenu);

    // 設定按鈕
    const settingsBtn = document.createElement("button");
    settingsBtn.textContent = "⚙️";
    settingsBtn.style.width = "35px";
    settingsBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
    settingsBtn.style.color = fixedButtonStyle.color;
    settingsBtn.style.border = fixedButtonStyle.border;
    settingsBtn.style.borderRadius = fixedButtonStyle.borderRadius;
    settingsBtn.style.padding = fixedButtonStyle.padding;
    settingsBtn.style.cursor = fixedButtonStyle.cursor;
    settingsBtn.addEventListener("click", showSettingsPanel);
    exportRow.appendChild(settingsBtn);

    container.innerHTML = "";
    container.appendChild(selectRow);
    container.appendChild(exportRow);

    // 設定面板 (保持原樣，只修改預設角色名稱)
    function showSettingsPanel() {
      const style = document.createElement("style");
      style.textContent = `
        .setting-input, .setting-select {
          height: 36px;
          padding: 4px 8px;
          font-size: 14px;
          line-height: 1.2;
          border-radius: 4px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          background-color: #fff;
          color: #000;
          width: 100%;
          margin-bottom: 5px;
        }
        .setting-color {
          height: 36px;
          width: 100%;
          padding: 0;
          border: none;
          background: none;
        }
        .setting-avatar-container img {
        display: inline-block;
        }
      `;
      document.head.appendChild(style);
    
      const settingsPanel = document.createElement("div");
      settingsPanel.style.position = "fixed";
      settingsPanel.style.top = "50%";
      settingsPanel.style.left = "50%";
      settingsPanel.style.transform = "translate(-50%, -50%)";
      settingsPanel.style.backgroundColor = "#222";
      settingsPanel.style.padding = "20px";
      settingsPanel.style.borderRadius = "6px";
      settingsPanel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.7)";
      settingsPanel.style.zIndex = "10000";
      settingsPanel.style.width = "600px";
      settingsPanel.style.maxHeight = "80vh";
      settingsPanel.style.overflowY = "auto";
    
      const title = document.createElement("div");
      title.textContent = "設定";
      title.style.marginBottom = "10px";
      title.style.fontSize = "16px";
      title.style.fontWeight = "bold";
      title.style.color = "#fff";
      settingsPanel.appendChild(title);
    
      const settingsContainer = document.createElement("div");
      settingsContainer.style.display = "flex";
      settingsContainer.style.flexWrap = "wrap";
      settingsContainer.style.gap = "10px";
    
      const groups = [
          { label: "基本設定", fields: [
            { label: "使用者名稱", value: storedUserName, key: "storedUserName" },
            { label: "角色名稱", value: storedCharacterName, key: "storedCharacterName" }
          ]},
          { label: "頭像設定", fields: [
            { label: "使用者頭像", value: storedUserAvatar, key: "storedUserAvatar" },
            { label: "角色頭像", value: storedAssistantAvatar, key: "storedAssistantAvatar" }
          ]},
          { label: "外觀設定", fields: [
            { label: "圖片寬度 (px)", value: storedImageWidth, key: "storedImageWidth" },
            { label: "字體大小 (px)", value: storedFontSize, key: "storedFontSize" },
            { label: "字體顏色", value: storedFontColor, key: "storedFontColor" },
            { label: "使用者訊息背景顏色", value: storedUserMsgBgColor || "#313131", key: "storedUserMsgBgColor" },
          ]},
          { label: "外觀設定", fields: [
            { label: "背景顏色", value: storedBackgroundColor, key: "storedBackgroundColor" },
            { label: "字體", value: storedFontFamily, key: "storedFontFamily" },
            { label: "截圖風格", value: storedScreenshotStyle, key: "storedScreenshotStyle", type: "select", options: [
              { value: "left", label: "全部左側" },
              { value: "bubble", label: "聊天泡泡" }
            ]},
            { label: "Gemini訊息背景顏色", value: storedAssistantMsgBgColor || "#202020", key: "storedAssistantMsgBgColor" }
          ]}
        ];
    
      groups.forEach(group => {
          const groupContainer = document.createElement("div");
          groupContainer.style.flex = "1";
          groupContainer.style.minWidth = "200px";
          groupContainer.style.boxSizing = "border-box";
    
          const groupTitle = document.createElement("div");
          groupTitle.textContent = group.label;
          groupTitle.style.color = "#fff";
          groupTitle.style.marginTop = "10px";
          groupTitle.style.fontWeight = "bold";
          groupContainer.appendChild(groupTitle);
    
          group.fields.forEach(field => {
            const fieldLabel = document.createElement("div");
            fieldLabel.textContent = field.label;
            fieldLabel.style.color = "#fff";
            fieldLabel.style.marginTop = "5px";
            fieldLabel.style.fontSize = "14px";
            groupContainer.appendChild(fieldLabel);
            
            if (field.key === "storedUserAvatar" || field.key === "storedAssistantAvatar") {
              const avatarContainer = document.createElement("div");
              avatarContainer.className = "setting-avatar-container";
              avatarContainer.style.display = "flex";
              avatarContainer.style.alignItems = "center";
              avatarContainer.style.gap = "10px";
              avatarContainer.style.marginBottom = "5px";

              const previewImg = document.createElement("img");
              previewImg.style.width = "36px";
              previewImg.style.height = "36px";
              previewImg.style.objectFit = "cover";
              previewImg.style.border = "1px solid #ccc";
              previewImg.style.borderRadius = "4px";
              previewImg.src = field.value || "";

              const browseBtn = document.createElement("button");
              browseBtn.textContent = "瀏覽檔案";
              browseBtn.className = "setting-input"; 
              browseBtn.style.height = "36px";
              browseBtn.style.lineHeight = "28px";
              browseBtn.style.width = "calc(50% - 50px)";
              browseBtn.style.display = "inline-block";

              const fileInput = document.createElement("input");
              fileInput.type = "file";
              fileInput.accept = "image/*";
              fileInput.style.display = "none";
              browseBtn.addEventListener("click", () => fileInput.click());

              fileInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = async function(evt) {
                    const dataURL = evt.target.result;
                    previewImg.src = dataURL;
                    const key = field.key === "storedUserAvatar" ? "storedUserAvatar" : "storedAssistantAvatar";
                    if (key === "storedUserAvatar") storedUserAvatar = dataURL;
                    else storedAssistantAvatar = dataURL;
                    await chrome.storage.local.set({ [key]: dataURL });
                  };
                  reader.readAsDataURL(file);
                }
              });

              avatarContainer.appendChild(browseBtn);
              avatarContainer.appendChild(previewImg);
              groupContainer.appendChild(fileInput);
              groupContainer.appendChild(avatarContainer);

            } else {
            let input;
            if (field.type === "select") {
              input = document.createElement("select");
              field.options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.value;
                option.textContent = opt.label;
                if (opt.value === field.value) option.selected = true;
                input.appendChild(option);
              });
              input.className = "setting-select";
            } else {
              input = document.createElement("input");
              input.type = ["storedFontColor", "storedBackgroundColor", "storedUserMsgBgColor", "storedAssistantMsgBgColor"].includes(field.key) ? "color" : "text";
              input.value = field.value;
              input.className = input.type === "color" ? "setting-color" : "setting-input";
            }
    
            input.addEventListener("change", async () => {
              const newValue = input.value.trim();
              switch (field.key) {
                case "storedUserName": storedUserName = newValue || "你"; break;
                case "storedCharacterName": storedCharacterName = newValue || "Gemini"; break;
                case "storedImageWidth": storedImageWidth = Number(newValue) || 800; break;
                case "storedFontSize": storedFontSize = Number(newValue) || 16; break;
                case "storedFontColor": storedFontColor = newValue || "#ffffff"; break;
                case "storedBackgroundColor": storedBackgroundColor = newValue || "#000000"; break;
                case "storedFontFamily": storedFontFamily = newValue || "新細明體"; break;
                case "storedScreenshotStyle": storedScreenshotStyle = newValue; break;
                case "storedUserMsgBgColor": storedUserMsgBgColor = newValue || "#313131"; break;
                case "storedAssistantMsgBgColor": storedAssistantMsgBgColor = newValue || "#202020"; break;
              }
              await chrome.storage.local.set({ [field.key]: newValue });
            });
    
            groupContainer.appendChild(input);
          }
        });
    
        settingsContainer.appendChild(groupContainer);
      });
    
      settingsPanel.appendChild(settingsContainer);
    
      const btnContainer = document.createElement("div");
      btnContainer.style.marginTop = "10px";
      btnContainer.style.textAlign = "center";
    
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "儲存";
      saveBtn.style.backgroundColor = "#4CAF50";
      saveBtn.style.color = "#fff";
      saveBtn.style.border = "none";
      saveBtn.style.borderRadius = "4px";
      saveBtn.style.padding = "6px 12px";
      saveBtn.style.cursor = "pointer";
      saveBtn.addEventListener("click", () => {
        document.body.removeChild(settingsPanel);
      });
    
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "取消";
      cancelBtn.style.backgroundColor = "#666";
      cancelBtn.style.color = "#fff";
      cancelBtn.style.border = "none";
      cancelBtn.style.borderRadius = "4px";
      cancelBtn.style.padding = "6px 12px";
      cancelBtn.style.cursor = "pointer";
      cancelBtn.style.marginLeft = "10px";
      cancelBtn.addEventListener("click", () => {
        document.body.removeChild(settingsPanel);
      });
    
      btnContainer.appendChild(saveBtn);
      btnContainer.appendChild(cancelBtn);
      settingsPanel.appendChild(btnContainer);
      document.body.appendChild(settingsPanel);
    }  

    // 圖片處理功能 (保持原樣)
    async function fetchAsBase64(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject("讀取圖片失敗");
          reader.readAsDataURL(blob);
        });
      } catch (err) {
        console.error("Fetch 失敗：", err);
        throw err;
      }
    }

    async function replaceImagesWithBase64(container) {
      const images = container.querySelectorAll("img");
      await Promise.all([...images].map(async (img) => {
        if (img.src.startsWith("data:")) return;
        try {
          img.crossOrigin = "anonymous";
          const dataURL = await fetchAsBase64(img.src);
          img.src = dataURL;
          console.log("圖片已轉 Base64：", dataURL.slice(0, 40) + "...");
          } catch (err) {
      console.error("轉換圖片失敗：", err);
      }
    }))};

    function removeDuplicateImages(container) {
      const images = container.querySelectorAll("img");
      const srcSet = new Set();
      images.forEach((img) => {
        if (srcSet.has(img.src)) {
          img.remove();
        } else {
          srcSet.add(img.src);
        }
      });
    }

    // Get Gemini chat title; fallback to document title
    function getGeminiConversationTitle() {
      const titleElem = document.querySelector(".conversation-title.gds-title-m");
      const titleText = titleElem?.textContent?.trim();
      if (titleText) return titleText;
      const docTitle = document.title?.trim();
      return docTitle || "Gemini Chat";
    }
    
    async function triggerImageConversion(options = {}) {
      const { splitMode = false, maxHeight = 4096, containerElem: passedContainer } = options;
      let containerElem = passedContainer;
      
      if (!containerElem) {
        const firstSelected = conversationData.find(m => m.selected);
        if (firstSelected) containerElem = firstSelected.element.parentElement;
      }
      if (!containerElem) {
        // === 修改：尋找 Gemini 的對話容器 ===
        containerElem = document.querySelector('user-query-content, message-content')?.parentElement;
      }
      if (!containerElem) {
        console.error("找不到對話容器 (triggerImageConversion)");
        return;
      }

      await replaceImagesWithBase64(containerElem);
      removeDuplicateImages(containerElem);

      conversationData.forEach(msg => {
        const original = msg.element;
        const cloned = original.cloneNode(true);
      
        // === 修改：適配 Gemini 的結構 ===
        let contentDiv;
        if (msg.role === "user") {
          // 用戶訊息：尋找查詢內容容器
          contentDiv = cloned.querySelector(".query-content, .user-query-container");
        } else {
          // AI 回應：尋找 markdown 內容容器
          contentDiv = cloned.querySelector(".markdown, .model-response-text");
        }
      
        // 圖片處理：把原始圖片（已轉 base64）塞回 cloned
        const originalImgs = original.querySelectorAll("img");
        const clonedImgs = cloned.querySelectorAll("img");
        clonedImgs.forEach((img, i) => {
          if (originalImgs[i]) img.src = originalImgs[i].src;
        });
      
        // 安全檢查：沒有的話就放空
        msg.html = contentDiv ? contentDiv.innerHTML : "<p>（內容消失惹 QQ）</p>";
      
        // markdown 轉換
        msg.markdown = getMarkdownFromMessage(contentDiv || cloned, msg.role === "user");
      });

      window.__cocoCatchSplitMode = splitMode;
      window.__cocoCatchMaxHeight = maxHeight;
    }

    /*****************************************
     * 匯出功能：收集對話後，交給 background 層處理
     *****************************************/
    async function doExport() {
      await scanConversation();
      let selectedMessages = conversationData.filter(m => m.selected);
      if (selectedMessages.length === 0) {
        alert("沒有符合篩選條件的訊息！");
        return;
      }
      
      const isImageExport = (storedFormat === "image");
      const MAX_HEIGHT = 4096;
      let splitMode = false;
    
      if (isImageExport) {
        const totalHeight = selectedMessages.reduce((h, m) => h + (m.element?.offsetHeight || 0), 0);
        if (totalHeight > MAX_HEIGHT) {
          const ok = window.confirm(`選取的訊息高度 ${totalHeight}px 已超過 ${MAX_HEIGHT}px，將自動分張並壓縮下載，確定嗎？`);
          if (!ok) return;
          splitMode = true;
        }
      }
      
      await triggerImageConversion({ splitMode, maxHeight: MAX_HEIGHT });
      
      const sanitizedData = selectedMessages.map(m => {
        return {
          id: m.id,
          role: m.role,
          text: `${m.role === "user" ? storedUserName : storedCharacterName}：${m.markdown}`,
          markdown: m.markdown,
          selected: m.selected,
        };
      });
    
      const payload = {
        conversationData: sanitizedData,
        settings: {
          splitMode,
          maxHeight: MAX_HEIGHT,
          storedFormat,
          storedUserName,
          storedCharacterName,
          storedImageWidth,
          storedFontSize,
          storedFontColor,
          storedBackgroundColor,
          storedFontFamily,
          storedUserAvatar,
          storedAssistantAvatar,
          storedScreenshotStyle,
          storedUserMsgBgColor,
          storedAssistantMsgBgColor,
          fileNameBase: getGeminiConversationTitle()
        }
      };
    
      try {
          // 直接在content script中執行匯出邏輯
          const result = await handleExport(sanitizedData, payload.settings);
          console.log("匯出完成:", result);
          
        } catch (error) {
          console.error("匯出失敗:", error);
        }
      }
    
    // 幫訊息加入勾選框
    function addCheckboxToMessage(element, msgId) {
      if (element.querySelector(`[data-msg-id="${msgId}"]`)) return;
      
      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.className = "chat-export-checkbox";
      chk.setAttribute("data-msg-id", msgId);
      const msg = conversationData.find(m => m.id === msgId);
      chk.checked = !!(msg && msg.selected);
      chk.style.position = "absolute";
      chk.style.right = "-100px";
      chk.style.top = "10px";
      chk.style.zIndex = "1000";
      chk.addEventListener("change", () => {
        const changingMsg = conversationData.find(m => m.id === msgId);
        if (changingMsg) changingMsg.selected = chk.checked;
      });
      
      element.style.position = "relative";
      element.appendChild(chk);
    }

    // === 修改：全新的啟動和監聽邏輯，適配 Gemini ===

    // 1. MutationObserver 持續監聽 DOM 變化
    const mainObserver = new MutationObserver(async (mutations) => {
      const hasRelevantChanges = mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0);
      if (hasRelevantChanges) {
        await scanConversation();
      }
    });

    // 2. 等待 Gemini UI 載入完成
    let startupInterval = setInterval(() => {
      // === 修改：尋找 Gemini 特有的元素 ===
      const mainElem = document.querySelector("main, [role='main']");
      const geminiContainer = document.querySelector("user-query-content, message-content"); // Gemini 對話元素

      if (mainElem && geminiContainer) {
        console.log("✅ Gemini UI is ready. Initializing exporter.");
        
        // 首次執行
        currentUrl = window.location.pathname;
        scanConversation();
        
        // 啟動 MutationObserver
        mainObserver.observe(mainElem, {
          childList: true,
          subtree: true,
        });
        
        // 完成後清除 Interval
        clearInterval(startupInterval);
      }
    }, 500);
    
    console.log('✅ Gemini 匯出工具初始化完成');
  }

  async function initMistralChat() {
    console.log('🤖 初始化 Mistral 匯出工具');
    
    const storedData = await chrome.storage.local.get({
        storedFormat: "text",
        storedUserName: "你",
        storedCharacterName: "Mistral",
        storedImageWidth: 800,
        storedFontSize: 16,
        storedFontColor: "#ffffff",
        storedBackgroundColor: "#000000",
        storedFontFamily: "新細明體",
        storedUserAvatar: "",
        storedAssistantAvatar: "",
        storedScreenshotStyle: "left",
        storedUserMsgBgColor: "#313131",
        storedAssistantMsgBgColor: "#202020"
      });
      let storedFormat = storedData.storedFormat;
      let storedUserName = storedData.storedUserName;
      let storedCharacterName = storedData.storedCharacterName;
      let storedImageWidth = storedData.storedImageWidth;
      let storedFontSize = storedData.storedFontSize;
      let storedFontColor = storedData.storedFontColor;
      let storedBackgroundColor = storedData.storedBackgroundColor;
      let storedFontFamily = storedData.storedFontFamily;
      let storedUserAvatar = storedData.storedUserAvatar;
      let storedAssistantAvatar = storedData.storedAssistantAvatar;
      let storedScreenshotStyle = storedData.storedScreenshotStyle;
      let storedUserMsgBgColor = storedData.storedUserMsgBgColor;
      let storedAssistantMsgBgColor = storedData.storedAssistantMsgBgColor;

      let selectionModeEnabled = false;
      let conversationData = [];
      let currentUrl = window.location.pathname;

      function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }

      // 檢查 URL 變化並重置狀態
      function checkIfChatChanged() {
        if (window.location.pathname !== currentUrl) {
          console.log("URL change detected. Resetting conversation data.");
          currentUrl = window.location.pathname;
          conversationData = [];
          
          // 移除所有舊的勾選框
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
          
          // 移除舊的標記
          const allMessages = document.querySelectorAll("[data-mistral-message]");
          allMessages.forEach(msg => msg.removeAttribute("data-exported"));
        }
      }

      // 掃描 Mistral 對話內容
      async function scanConversation() {
        checkIfChatChanged(); 

        // 1. 分別尋找用戶訊息和 AI 訊息
        // 用戶訊息：使用 data-message-author-role="user" 屬性
        const userMessageContainers = document.querySelectorAll('div[data-message-author-role="user"]');
        // AI 訊息：使用 data-message-part-type="answer" 屬性
        const aiMessages = document.querySelectorAll('div[data-message-part-type="answer"]');
        
        // 從用戶訊息容器中找到實際的訊息內容元素（.select-text）
        const userMessages = [];
        userMessageContainers.forEach(container => {
          const selectTextEl = container.querySelector('.select-text');
          if (selectTextEl) {
            userMessages.push(selectTextEl);
          }
        });
        
        // 合併所有訊息
        const allMessages = [...userMessages, ...aiMessages];
        const currentMessageSet = new Set(allMessages);

        // 2. 清理不存在的元素
        conversationData = conversationData.filter(msg => currentMessageSet.has(msg.element));

        const existingElementsInConvData = new Set(conversationData.map(msg => msg.element));

        // 3. 處理新訊息
        for (const messageEl of allMessages) {
          if (!existingElementsInConvData.has(messageEl)) {
            // 判斷是使用者還是助理訊息
            let role;
            if (userMessages.includes(messageEl)) {
              role = "user";
            } else {
              role = "assistant";
            }

            const cloned = messageEl.cloneNode(true);
            
            // 移除不需要的元素
            cloned.querySelectorAll("button, .copy, .lucide").forEach(el => el.remove());
            
            const finalText = cloned.innerText.trim();

            const newMessageData = {
              id: generateId(),
              role,
              text: finalText,
              markdown: getMarkdownFromMessage(cloned, role === "user"),
              element: messageEl,
              selected: true
            };
            
            // 為元素添加標記以便識別
            messageEl.setAttribute('data-mistral-message', newMessageData.id);
            
            conversationData.push(newMessageData);
          }
        }

        // 按照 DOM 順序排序
        conversationData.sort((a, b) => {
            const position = a.element.compareDocumentPosition(b.element);
            if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
        });

        // 如果處於選擇模式，為新訊息加上勾選框
        if (selectionModeEnabled) {
          conversationData.forEach(msg => {
            if (!msg.element.querySelector(".chat-export-checkbox")) {
              addCheckboxToMessage(msg.element, msg.id);
            }
          });
        }
      }

      /***************** 工具：安全轉義 *****************/
      function escapeHTML(str) {
        return str.replace(/[&<>"']/g, (m) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
        );
      }

      /***************** 把訊息轉成 Markdown *****************/
      function getMarkdownFromMessage(el, isUser) {
        // 使用者訊息 → 處理 HTML 結構，保留換行
        if (isUser) {
          // 先將 <br> 標籤轉換為換行符
          const htmlContent = el.innerHTML
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/span>\s*<span[^>]*>/gi, '\n'); // 處理 span 間的換行
          
          // 創建臨時元素來提取純文字
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const rawText = tempDiv.textContent || tempDiv.innerText || "";
          
          return rawText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0) // 移除空行
            .join('  \n'); // Markdown 的換行格式
        }

        // Mistral 助理訊息 → 使用 Turndown 轉換
        return turndownService.turndown(el.innerHTML);
      }

      const turndownService = new TurndownService();
      if (typeof turndownPluginGfm !== "undefined" && turndownPluginGfm.gfm) {
        turndownService.use(turndownPluginGfm.gfm);
      }
      
      turndownService.addRule('strikethrough', {
        filter: ['del', 's', 'strike'],
        replacement: function(content) {
          return '~~' + content + '~~';
        }
      });
      
      // 針對 Mistral 的程式碼區塊處理
      turndownService.addRule('mistralMultilineCode', {
        filter: function (node) {
          return (
            node.nodeName === 'CODE' &&
            (node.className.includes('language-') || node.textContent.includes('\n'))
          );
        },
        replacement: function (content, node) {
          const langClass = [...node.classList].find(c => c.startsWith('language-'));
          const lang = langClass ? langClass.replace('language-', '') : '';
          return `\n\n\`\`\`${lang}\n${node.textContent}\n\`\`\`\n\n`;
        }
      });

      /*****************************************
       * 注入控制面板到指定位置
       *****************************************/
      let container = document.getElementById("mistral-exporter-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "mistral-exporter-container";
        container.style.position = "fixed";
        container.style.right = "100px"; 
        container.style.bottom = "25px"; 
        container.style.zIndex = 9999;
        document.body.appendChild(container);
      }
      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "4px";
      
      // 全域選擇設定
      let storedFilter = "all";

      /********************
       * 第一排：Select row
       ********************/
      const selectRow = document.createElement("div");
      selectRow.style.display = "flex";
      selectRow.style.alignItems = "center";
      selectRow.style.gap = "4px";

      const fixedButtonStyle = {
        width: "80px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 8px",
        cursor: "pointer"
      };

      const selectBtn = document.createElement("button");
        selectBtn.textContent = "Select";
        Object.assign(selectBtn.style, fixedButtonStyle);
        selectBtn.addEventListener("click", async () => {
          selectionModeEnabled = !selectionModeEnabled;
        
          if (selectionModeEnabled) {
            await scanConversation();
            conversationData.forEach(msg => {
              addCheckboxToMessage(msg.element, msg.id);
            });
            globalSelectChk.style.display = "inline-block";
            globalSelectChk.style.position = "absolute";
            globalSelectChk.style.right = "8px";
            globalSelectChk.style.top = "5px";
        
            if (storedFilter === "all") {
              conversationData.forEach(m => (m.selected = true));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                cb.checked = true;
              });
              globalSelectChk.checked = true;
            } else if (storedFilter === "user") {
              conversationData.forEach(m => (m.selected = (m.role === "user")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "user";
              });
              globalSelectChk.checked = false;
            } else if (storedFilter === "assistant") {
              conversationData.forEach(m => (m.selected = (m.role === "assistant")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "assistant";
              });
              globalSelectChk.checked = false;
            }
          } else {
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
            globalSelectChk.style.display = "none";
          }
        });
      selectRow.appendChild(selectBtn);

      const selectDropdownBtn = document.createElement("button");
      selectDropdownBtn.textContent = "▾";
      selectDropdownBtn.style.width = "25px";
      selectDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      selectDropdownBtn.style.color = fixedButtonStyle.color;
      selectDropdownBtn.style.border = fixedButtonStyle.border;
      selectDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      selectDropdownBtn.style.padding = "4px 6px";
      selectDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      selectRow.appendChild(selectDropdownBtn);
      
      // 全選勾選框
      const globalSelectChk = document.createElement("input");
      globalSelectChk.type = "checkbox";
      globalSelectChk.checked = true;
      globalSelectChk.style.display = "none";
      globalSelectChk.addEventListener("change", () => {
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
          cb.checked = globalSelectChk.checked;
          const msgId = cb.getAttribute("data-msg-id");
          const msg = conversationData.find(m => m.id === msgId);
          if (msg) msg.selected = globalSelectChk.checked;
        });
      });
      selectRow.appendChild(globalSelectChk);
      
      // 下拉選單
      const selectDropdownMenu = document.createElement("div");
      selectDropdownMenu.style.position = "absolute";
      selectDropdownMenu.style.backgroundColor = "#555";
      selectDropdownMenu.style.border = "1px solid #777";
      selectDropdownMenu.style.borderRadius = "4px";
      selectDropdownMenu.style.padding = "4px";
      selectDropdownMenu.style.bottom = "35px";
      selectDropdownMenu.style.left = "0";
      selectDropdownMenu.style.display = "none";
      
      const selectOptions = [
        { value: "all", label: "全選" },
        { value: "user", label: "只選 user" },
        { value: "assistant", label: "只選 Mistral" }
      ];
      
      selectOptions.forEach(opt => {
        const optBtn = document.createElement("div");
        optBtn.textContent = opt.label;
        optBtn.style.padding = "4px";
        optBtn.style.cursor = "pointer";
        if (opt.value === storedFilter) {
          optBtn.style.backgroundColor = "#777";
        }
        optBtn.addEventListener("click", () => {
          storedFilter = opt.value;
          Array.from(selectDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === opt.label ? "#777" : "");
          });
          selectDropdownBtn.textContent = "▾";
          selectDropdownMenu.style.display = "none";
          
          conversationData.forEach(msg => {
            let newState;
            if (storedFilter === "all") {
              newState = true;
            } else if (storedFilter === "user") {
              newState = (msg.role === "user");
            } else if (storedFilter === "assistant") {
              newState = (msg.role === "assistant");
            }
            msg.selected = newState;
            const chk = msg.element.querySelector(`[data-msg-id="${msg.id}"]`);
            if (chk) {
              chk.checked = newState;
            }
          });
          globalSelectChk.checked = (storedFilter === "all");
        });
        selectDropdownMenu.appendChild(optBtn);
      });
      
      selectDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectDropdownMenu.style.display = selectDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { selectDropdownMenu.style.display = "none"; });
      selectRow.style.position = "relative";
      selectRow.appendChild(selectDropdownMenu);

      /********************
       * 第二排：Export row
       ********************/
      const exportRow = document.createElement("div");
      exportRow.style.display = "flex";
      exportRow.style.alignItems = "center";
      exportRow.style.gap = "4px";

      const exportBtnText = document.createElement("button");
      exportBtnText.textContent = "Export";
      Object.assign(exportBtnText.style, fixedButtonStyle);
      exportBtnText.addEventListener("click", doExport);
      exportRow.appendChild(exportBtnText);

      const exportDropdownBtn = document.createElement("button");
      exportDropdownBtn.textContent = "▾";
      exportDropdownBtn.style.width = "25px";
      exportDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      exportDropdownBtn.style.color = fixedButtonStyle.color;
      exportDropdownBtn.style.border = fixedButtonStyle.border;
      exportDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      exportDropdownBtn.style.padding = "4px 6px";
      exportDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      exportRow.appendChild(exportDropdownBtn);

      const exportDropdownMenu = document.createElement("div");
      exportDropdownMenu.style.position = "absolute";
      exportDropdownMenu.style.backgroundColor = "#555";
      exportDropdownMenu.style.border = "1px solid #777";
      exportDropdownMenu.style.borderRadius = "4px";
      exportDropdownMenu.style.padding = "4px";
      exportDropdownMenu.style.bottom = "35px";
      exportDropdownMenu.style.left = "0";
      exportDropdownMenu.style.display = "none";

      const formats = [
        { val: "image", label: "IMAGE" },
        { val: "text", label: "TEXT" },
        { val: "markdown", label: "MARKDOWN" },
        { val: "silly", label: "SILLY" }
      ];
      
      formats.forEach(fmt => {
        const fmtBtn = document.createElement("div");
        fmtBtn.textContent = fmt.label;
        fmtBtn.style.padding = "4px";
        fmtBtn.style.cursor = "pointer";
        if (fmt.val === storedFormat) {
          fmtBtn.style.backgroundColor = "#777";
        }
        fmtBtn.addEventListener("click", async () => {
          storedFormat = fmt.val;
          await chrome.storage.local.set({ storedFormat });
          Array.from(exportDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === fmt.label ? "#777" : "");
          });
          exportDropdownBtn.textContent = "▾";
          exportDropdownMenu.style.display = "none";
        });
        exportDropdownMenu.appendChild(fmtBtn);
      });
      
      exportDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportDropdownMenu.style.display = exportDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { exportDropdownMenu.style.display = "none"; });
      exportRow.style.position = "relative";
      exportRow.appendChild(exportDropdownMenu);

      // 設定按鈕
      const settingsBtn = document.createElement("button");
      settingsBtn.textContent = "⚙️";
      settingsBtn.style.width = "35px";
      settingsBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      settingsBtn.style.color = fixedButtonStyle.color;
      settingsBtn.style.border = fixedButtonStyle.border;
      settingsBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      settingsBtn.style.padding = fixedButtonStyle.padding;
      settingsBtn.style.cursor = fixedButtonStyle.cursor;
      settingsBtn.addEventListener("click", showSettingsPanel);
      exportRow.appendChild(settingsBtn);

      container.appendChild(selectRow);
      container.appendChild(exportRow);

      /*****************************************
       * 設定面板
       *****************************************/
      function showSettingsPanel() {
        const style = document.createElement("style");
        style.textContent = `
          .setting-input, .setting-select {
            height: 36px;
            padding: 4px 8px;
            font-size: 14px;
            line-height: 1.2;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            background-color: #fff;
            color: #000;
            width: 100%;
            margin-bottom: 5px;
          }
          .setting-color {
            height: 36px;
            width: 100%;
            padding: 0;
            border: none;
            background: none;
          }
          .setting-avatar-container img {
            display: inline-block;
          }
        `;
        document.head.appendChild(style);
      
        const settingsPanel = document.createElement("div");
        settingsPanel.style.position = "fixed";
        settingsPanel.style.top = "50%";
        settingsPanel.style.left = "50%";
        settingsPanel.style.transform = "translate(-50%, -50%)";
        settingsPanel.style.backgroundColor = "#222";
        settingsPanel.style.padding = "20px";
        settingsPanel.style.borderRadius = "6px";
        settingsPanel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.7)";
        settingsPanel.style.zIndex = "10000";
        settingsPanel.style.width = "600px";
        settingsPanel.style.maxHeight = "80vh";
        settingsPanel.style.overflowY = "auto";
      
        const title = document.createElement("div");
        title.textContent = "設定";
        title.style.marginBottom = "10px";
        title.style.fontSize = "16px";
        title.style.fontWeight = "bold";
        title.style.color = "#fff";
        settingsPanel.appendChild(title);
      
        const settingsContainer = document.createElement("div");
        settingsContainer.style.display = "flex";
        settingsContainer.style.flexWrap = "wrap";
        settingsContainer.style.gap = "10px";
      
        const groups = [
            { label: "基本設定", fields: [
              { label: "使用者名稱", value: storedUserName, key: "storedUserName" },
              { label: "角色名稱", value: storedCharacterName, key: "storedCharacterName" }
            ]},
            { label: "頭像設定", fields: [
              { label: "使用者頭像", value: storedUserAvatar, key: "storedUserAvatar" },
              { label: "角色頭像", value: storedAssistantAvatar, key: "storedAssistantAvatar" }
            ]},
            { label: "外觀設定", fields: [
              { label: "圖片寬度 (px)", value: storedImageWidth, key: "storedImageWidth" },
              { label: "字體大小 (px)", value: storedFontSize, key: "storedFontSize" },
              { label: "字體顏色", value: storedFontColor, key: "storedFontColor" },
              { label: "使用者訊息背景顏色", value: storedUserMsgBgColor || "#313131", key: "storedUserMsgBgColor" },
            ]},
            { label: "外觀設定", fields: [
              { label: "背景顏色", value: storedBackgroundColor, key: "storedBackgroundColor" },
              { label: "字體", value: storedFontFamily, key: "storedFontFamily" },
              { label: "截圖風格", value: storedScreenshotStyle, key: "storedScreenshotStyle", type: "select", options: [
                { value: "left", label: "全部左側" },
                { value: "bubble", label: "聊天泡泡" }
              ]},
              { label: "Mistral訊息背景顏色", value: storedAssistantMsgBgColor || "#202020", key: "storedAssistantMsgBgColor" }
            ]}
          ];

        groups.forEach(group => {
            const groupContainer = document.createElement("div");
            groupContainer.style.flex = "1";
            groupContainer.style.minWidth = "200px";
            groupContainer.style.boxSizing = "border-box";
      
            const groupTitle = document.createElement("div");
            groupTitle.textContent = group.label;
            groupTitle.style.color = "#fff";
            groupTitle.style.marginTop = "10px";
            groupTitle.style.fontWeight = "bold";
            groupContainer.appendChild(groupTitle);
      
            group.fields.forEach(field => {
              const fieldLabel = document.createElement("div");
              fieldLabel.textContent = field.label;
              fieldLabel.style.color = "#fff";
              fieldLabel.style.marginTop = "5px";
              fieldLabel.style.fontSize = "14px";
              groupContainer.appendChild(fieldLabel);
              
              if (field.key === "storedUserAvatar" || field.key === "storedAssistantAvatar") {
                const avatarContainer = document.createElement("div");
                avatarContainer.className = "setting-avatar-container";
                avatarContainer.style.display = "flex";
                avatarContainer.style.alignItems = "center";
                avatarContainer.style.gap = "10px";
                avatarContainer.style.marginBottom = "5px";

                const previewImg = document.createElement("img");
                previewImg.style.width = "36px";
                previewImg.style.height = "36px";
                previewImg.style.objectFit = "cover";
                previewImg.style.border = "1px solid #ccc";
                previewImg.style.borderRadius = "4px";
                previewImg.src = field.value || "";

                const browseBtn = document.createElement("button");
                browseBtn.textContent = "瀏覽檔案";
                browseBtn.className = "setting-input"; 
                browseBtn.style.height = "36px";
                browseBtn.style.lineHeight = "28px";
                browseBtn.style.width = "calc(50% - 50px)";
                browseBtn.style.display = "inline-block";

                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                browseBtn.addEventListener("click", () => fileInput.click());

                fileInput.addEventListener("change", (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = async function(evt) {
                      const dataURL = evt.target.result;
                      previewImg.src = dataURL;
                      const key = field.key === "storedUserAvatar" ? "storedUserAvatar" : "storedAssistantAvatar";
                      if (key === "storedUserAvatar") storedUserAvatar = dataURL;
                      else storedAssistantAvatar = dataURL;
                      await chrome.storage.local.set({ [key]: dataURL });
                    };
                    reader.readAsDataURL(file);
                  }
                });

                avatarContainer.appendChild(browseBtn);
                avatarContainer.appendChild(previewImg);
                groupContainer.appendChild(fileInput);
                groupContainer.appendChild(avatarContainer);

              } else {
              let input;
              if (field.type === "select") {
                input = document.createElement("select");
                field.options.forEach(opt => {
                  const option = document.createElement("option");
                  option.value = opt.value;
                  option.textContent = opt.label;
                  if (opt.value === field.value) option.selected = true;
                  input.appendChild(option);
                });
                input.className = "setting-select";
              } else {
                input = document.createElement("input");
                input.type = ["storedFontColor", "storedBackgroundColor", "storedUserMsgBgColor", "storedAssistantMsgBgColor"].includes(field.key) ? "color" : "text";
                input.value = field.value;
                input.className = input.type === "color" ? "setting-color" : "setting-input";
              }
      
              input.addEventListener("change", async () => {
                const newValue = input.value.trim();
                switch (field.key) {
                  case "storedUserName": storedUserName = newValue || "你"; break;
                  case "storedCharacterName": storedCharacterName = newValue || "Mistral"; break;
                  case "storedImageWidth": storedImageWidth = Number(newValue) || 800; break;
                  case "storedFontSize": storedFontSize = Number(newValue) || 16; break;
                  case "storedFontColor": storedFontColor = newValue || "#ffffff"; break;
                  case "storedBackgroundColor": storedBackgroundColor = newValue || "#000000"; break;
                  case "storedFontFamily": storedFontFamily = newValue || "新細明體"; break;
                  case "storedScreenshotStyle": storedScreenshotStyle = newValue; break;
                  case "storedUserMsgBgColor": storedUserMsgBgColor = newValue || "#313131"; break;
                  case "storedAssistantMsgBgColor": storedAssistantMsgBgColor = newValue || "#202020"; break;
                }
                await chrome.storage.local.set({ [field.key]: newValue });
              });
      
              groupContainer.appendChild(input);
            }
          });
      
          settingsContainer.appendChild(groupContainer);
        });
      
        settingsPanel.appendChild(settingsContainer);
      
        const btnContainer = document.createElement("div");
        btnContainer.style.marginTop = "10px";
        btnContainer.style.textAlign = "center";
      
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "儲存";
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.color = "#fff";
        saveBtn.style.border = "none";
        saveBtn.style.borderRadius = "4px";
        saveBtn.style.padding = "6px 12px";
        saveBtn.style.cursor = "pointer";
        saveBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "取消";
        cancelBtn.style.backgroundColor = "#666";
        cancelBtn.style.color = "#fff";
        cancelBtn.style.border = "none";
        cancelBtn.style.borderRadius = "4px";
        cancelBtn.style.padding = "6px 12px";
        cancelBtn.style.cursor = "pointer";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        btnContainer.appendChild(saveBtn);
        btnContainer.appendChild(cancelBtn);
        settingsPanel.appendChild(btnContainer);
        document.body.appendChild(settingsPanel);
      }  

    //html轉換開始
      /**
     * 用 Fetch 抓取圖片並轉成 Base64 Data URI
     * @param {string} url - 圖片的 URL
     * @returns {Promise<string>} 回傳 Base64 資料 URI
     */
      async function fetchAsBase64(url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("讀取圖片失敗");
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Fetch 失敗：", err);
          throw err;
        }
      }
        /**
       * 替換 container 裡所有 <img> 的 src 屬性為 Base64 Data URI（使用 fetch）
       * @param {HTMLElement} container - 目標容器
       * @returns {Promise<void>}
       */
      async function replaceImagesWithBase64(container) {
        const images = container.querySelectorAll("img");
        await Promise.all([...images].map(async (img) => {
          if (img.src.startsWith("data:")) return;
          try {
            img.crossOrigin = "anonymous";
            const dataURL = await fetchAsBase64(img.src);
            img.src = dataURL;
            console.log("圖片已轉 Base64：", dataURL.slice(0, 40) + "...");
            } catch (err) {
        console.error("轉換圖片失敗：", err);
        }
      }))};
      /**
       * 同一則訊息裡，如果出現相同的圖片，只保留第一張，其餘移除
       * @param {HTMLElement} container - 目標容器
       */
      function removeDuplicateImages(container) {
        const images = container.querySelectorAll("img");
        const srcSet = new Set();
        images.forEach((img) => {
          if (srcSet.has(img.src)) {
            img.remove();
          } else {
            srcSet.add(img.src);
          }
        });
      }
      
      async function triggerImageConversion(options = {}) {
        const { splitMode = false, maxHeight = 4096, containerElem: passedContainer } = options;
        let containerElem = passedContainer;
        if (!containerElem) {
          const firstSelected = conversationData.find(m => m.selected);
          if (firstSelected) containerElem = firstSelected.element.parentElement;
        }
        if (!containerElem) {
          // 針對 Mistral 尋找對話容器
          containerElem = document.querySelector('div[data-message-author-role="user"], div[data-message-part-type="answer"]')?.parentElement;
        }
        if (!containerElem) {
          console.error("找不到對話容器 (triggerImageConversion)");
          return;
        }

        // 先將圖片轉為 Base64 並移除重複圖片
        await replaceImagesWithBase64(containerElem);
        removeDuplicateImages(containerElem);

        // 處理每個訊息的 HTML 和 Markdown
        conversationData.forEach(msg => {
          const original = msg.element;
          const cloned = original.cloneNode(true);
        
          // 移除不需要的元素（按鈕、複製圖示等）
          cloned.querySelectorAll("button, .copy, .lucide, svg").forEach(el => el.remove());
        
          // 圖片處理：把原始圖片（已轉 base64）塞回 cloned
          const originalImgs = original.querySelectorAll("img");
          const clonedImgs = cloned.querySelectorAll("img");
          clonedImgs.forEach((img, i) => {
            if (originalImgs[i]) img.src = originalImgs[i].src;
          });
        
          // 針對 Mistral 的內容處理
          let contentDiv = cloned;
          if (msg.role === "assistant") {
            // 對於助理訊息，尋找主要內容區域
            const proseDiv = cloned.querySelector('.prose');
            if (proseDiv) contentDiv = proseDiv;
          }
        
          msg.html = contentDiv ? contentDiv.innerHTML : "<p>（內容消失惹 QQ）</p>";
          msg.markdown = getMarkdownFromMessage(contentDiv || cloned, msg.role === "user");
        });
        
        window.__cocoCatchSplitMode = splitMode;
        window.__cocoCatchMaxHeight = maxHeight;
      }

      /*****************************************
       * 匯出功能：收集對話後，交給 background 層處理
       *****************************************/
      async function doExport() {
        await scanConversation();
        let selectedMessages = conversationData.filter(m => m.selected);
        if (selectedMessages.length === 0) {
          alert("沒有符合篩選條件的訊息！");
          return;
        }
        const isImageExport = (storedFormat === "image");
        const MAX_HEIGHT = 4096;
        let splitMode = false;
      
        if (isImageExport) {
          // 只計算選取區段的高度
          const totalHeight = selectedMessages.reduce((h, m) => h + (m.element?.offsetHeight || 0), 0);
          if (totalHeight > MAX_HEIGHT) {
            const ok = window.confirm(`選取的訊息高度 ${totalHeight}px 已超過 ${MAX_HEIGHT}px，將自動分張並壓縮下載，確定嗎？`);
            if (!ok) return;
            splitMode = true;
          }
        }
        await triggerImageConversion({ splitMode, maxHeight: MAX_HEIGHT });
        
        // 建立 sanitizedData，不包含 element 屬性
        const sanitizedData = selectedMessages.map(m => {
          return {
            id: m.id,
            role: m.role,
            // 匯出用：前面加使用者自訂名稱
            text: `${m.role === "user" ? storedUserName : storedCharacterName}：${m.markdown}`,
            // 截圖用：保持純原文給 marked 解析
            markdown: m.markdown,
            selected: m.selected,
          };
        });
      
        const payload = {
          conversationData: sanitizedData,
          settings: {
            splitMode,
            maxHeight: MAX_HEIGHT,
            storedFormat,
            storedUserName,
            storedCharacterName,
            storedImageWidth,
            storedFontSize,
            storedFontColor,
            storedBackgroundColor,
            storedFontFamily,
            storedUserAvatar,
            storedAssistantAvatar,
            storedScreenshotStyle,
            storedUserMsgBgColor,
            storedAssistantMsgBgColor,
            fileNameBase: document.title
          }
        };
      
        try {
          // 直接在content script中執行匯出邏輯
          const result = await handleExport(sanitizedData, payload.settings);
          console.log("匯出完成:", result);
        } catch (error) {
          console.error("匯出失敗:", error);
        }
      }
      
      // 幫訊息加入勾選框
      function addCheckboxToMessage(article, msgId) {
        if (article.querySelector(`[data-msg-id="${msgId}"]`)) return;
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "chat-export-checkbox";
        chk.setAttribute("data-msg-id", msgId);
        const msg = conversationData.find(m => m.id === msgId);
        chk.checked = !!(msg && msg.selected);
        chk.style.position = "absolute";
        chk.style.right = "-100px";
        chk.style.top = "10px";
        chk.style.zIndex = "1000";
        chk.addEventListener("change", () => {
          const changingMsg = conversationData.find(m => m.id === msgId);
          if (changingMsg) changingMsg.selected = chk.checked;
        });
        article.style.position = "relative";
        article.appendChild(chk);
      }

      // 全新的啟動和監聽邏輯，針對 Mistral 調整
      const mainObserver = new MutationObserver(async (mutations) => {
        const hasRelevantChanges = mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0);
        if (hasRelevantChanges) {
          await scanConversation();
        }
      });

      // 使用 setInterval 確保擴充功能在頁面切換後能正確啟動
      let startupInterval = setInterval(() => {
        const mainElem = document.querySelector("main");
        // 針對 Mistral 聊天室的特殊元素檢查
        const chatArea = document.querySelector('div[data-message-author-role="user"], div[data-message-part-type="answer"]');

        if (mainElem && chatArea) {
          console.log("✅ Mistral UI is ready. Initializing exporter.");
          
          // 首次執行
          currentUrl = window.location.pathname;
          scanConversation();
          
          // 啟動 MutationObserver
          mainObserver.observe(mainElem, {
            childList: true,
            subtree: true,
          });
          
          // 完成後清除 Interval
          clearInterval(startupInterval);
        }
      }, 500);
    
    console.log('✅ Mistral 匯出工具初始化完成');
  }
  
  async function initClaude() {
    console.log('🤖 初始化 Claude 匯出工具');
    
    const storedData = await chrome.storage.local.get({
        storedFormat: "text",
        storedUserName: "你",
        storedCharacterName: "Claude",
        storedImageWidth: 800,
        storedFontSize: 16,
        storedFontColor: "#ffffff",
        storedBackgroundColor: "#000000",
        storedFontFamily: "新細明體",
        storedUserAvatar: "",
        storedAssistantAvatar: "",
        storedScreenshotStyle: "left",
        storedUserMsgBgColor: "#313131",
        storedAssistantMsgBgColor: "#202020"
      });
      let storedFormat = storedData.storedFormat;
      let storedUserName = storedData.storedUserName;
      let storedCharacterName = storedData.storedCharacterName;
      let storedImageWidth = storedData.storedImageWidth;
      let storedFontSize = storedData.storedFontSize;
      let storedFontColor = storedData.storedFontColor;
      let storedBackgroundColor = storedData.storedBackgroundColor;
      let storedFontFamily = storedData.storedFontFamily;
      let storedUserAvatar = storedData.storedUserAvatar;
      let storedAssistantAvatar = storedData.storedAssistantAvatar;
      let storedScreenshotStyle = storedData.storedScreenshotStyle;
      let storedUserMsgBgColor = storedData.storedUserMsgBgColor;
      let storedAssistantMsgBgColor = storedData.storedAssistantMsgBgColor;

      let selectionModeEnabled = false;
      let conversationData = [];
      let currentUrl = window.location.pathname;

      function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }

      // 檢查 URL 變化並重置狀態
      function checkIfChatChanged() {
        if (window.location.pathname !== currentUrl) {
          console.log("URL change detected. Resetting conversation data.");
          currentUrl = window.location.pathname;
          conversationData = [];
          
          // 移除所有舊的勾選框
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
          
          // 移除舊的標記
          const allMessages = document.querySelectorAll("[data-mistral-message]");
          allMessages.forEach(msg => msg.removeAttribute("data-exported"));
        }
      }

      // 掃描 Claude 對話內容（只更動 HTML 選擇器）
      async function scanConversation() {
        checkIfChatChanged();

        // 用戶訊息
        const userMessages = Array.from(document.querySelectorAll('[data-testid="user-message"]'));
        // AI 訊息容器
        let aiMessages = Array.from(document.querySelectorAll('.font-claude-response'));

        // 過濾掉包含模型選擇器的AI訊息（檢查是否包含 div.whitespace-nowrap.select-none）
        aiMessages = aiMessages.filter(msg => {
          // 直接檢查訊息的父容器中是否包含模型選擇器標記
          const parent = msg.closest('.group') || msg.closest('[data-is-streaming]') || msg.parentElement;
          if (!parent) return true;

          // 檢查是否有 whitespace-nowrap select-none 的 div（模型選擇器的特徵）
          const hasModelSelector = parent.querySelector('div.whitespace-nowrap.select-none');
          return !hasModelSelector;
        });

        const allMessages = [...userMessages, ...aiMessages];
        const currentMessageSet = new Set(allMessages);

        // 清理不存在的元素
        conversationData = conversationData.filter(msg => currentMessageSet.has(msg.element));
        const existingElementsInConvData = new Set(conversationData.map(msg => msg.element));

        // 新訊息
        for (const messageEl of allMessages) {
          if (!existingElementsInConvData.has(messageEl)) {
            const role = userMessages.includes(messageEl) ? "user" : "assistant";
            const cloned = messageEl.cloneNode(true);
            cloned.querySelectorAll("button, .copy, .lucide, svg").forEach(el => el.remove());
            // Remove model selector chip (e.g., "Haiku 4.5") so it is not exported as a message
            cloned.querySelectorAll("div.whitespace-nowrap.select-none").forEach(el => el.remove());

            const newMessageData = {
              id: generateId(),
              role,
              text: cloned.innerText.trim(),
              markdown: getMarkdownFromMessage(cloned, role === "user"),
              element: messageEl,
              selected: true
            };
            messageEl.setAttribute('data-mistral-message', newMessageData.id);
            conversationData.push(newMessageData);
          }
        }

        // DOM 順序
        conversationData.sort((a, b) => {
          const position = a.element.compareDocumentPosition(b.element);
          if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
          if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
          return 0;
        });

        // 加勾選框
        if (selectionModeEnabled) {
          conversationData.forEach(msg => {
            if (!msg.element.querySelector(".chat-export-checkbox")) {
              addCheckboxToMessage(msg.element, msg.id);
            }
          });
        }
      }

      /***************** 工具：安全轉義 *****************/
      function escapeHTML(str) {
        return str.replace(/[&<>"']/g, (m) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
        );
      }

      /***************** 把訊息轉成 Markdown *****************/
      function getMarkdownFromMessage(el, isUser) {
        if (isUser) {
          // 使用者訊息：保留換行
          const htmlContent = el.innerHTML
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/(p|div)>\s*<((p|div)[^>]*)>/gi, '\n'); // 段落換行
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const rawText = tempDiv.textContent || tempDiv.innerText || "";
          return rawText
            .split('\n').map(line => line.trimEnd()).join('\n')
            .replace(/\n{3,}/g, '\n\n').trim();
        }

        // 助理訊息：把所有 markdown 區塊 + 畫布預覽一起抓
        const zones = Array.from(
          el.querySelectorAll('.standard-markdown, .progressive-markdown, .standard-markdown_, .progressive-markdown_')
        );

        // 畫布 / Artifact 預覽（button[aria-label="Preview contents"] 或 .artifact-block-cell 裡的小字區塊）
        const artifactSnippets = [];
        el.querySelectorAll('[aria-label="Preview contents"], .artifact-block-cell').forEach(block => {
          // 常見的小預覽：等寬、超小字級、text-[0.3rem]、font-mono 等
          const tiny =
            block.querySelector('div[style*="text-[0.3rem]"]') ||
            block.querySelector('.font-mono') ||
            block.querySelector('[class*="font-mono"]') ||
            block.querySelector('pre, code, div[style*="whitespace-pre-wrap"]');
          if (tiny && tiny.textContent && tiny.textContent.trim()) {
            artifactSnippets.push("```markdown\n" + tiny.textContent.trim() + "\n```");
          }
        });

        // 如果沒有 zones，就整塊當作一個
        let mdParts = [];
        if (zones.length) {
          zones.forEach(z => mdParts.push(turndownService.turndown(z.innerHTML)));
        } else {
          mdParts.push(turndownService.turndown(el.innerHTML));
        }

        // 插入畫布預覽內容（放在 zones 後面，保持可讀）
        if (artifactSnippets.length) {
          mdParts = mdParts.concat(artifactSnippets);
        }

        return mdParts.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
      }

      const turndownService = new TurndownService();
      if (typeof turndownPluginGfm !== "undefined" && turndownPluginGfm.gfm) {
        turndownService.use(turndownPluginGfm.gfm);
      }
      turndownService.addRule('strikethrough', {
        filter: ['del', 's', 'strike'],
        replacement: function (content) {
          return '~~' + content + '~~';
        }
      });
      turndownService.addRule('multilineCode', {
        filter: function (node) {
          return (
            node.nodeName === 'CODE' &&
            (node.className?.includes?.('language-') || (node.textContent || '').includes('\n'))
          );
        },
        replacement: function (content, node) {
          const cls = Array.from(node.classList || []);
          const langClass = cls.find(c => c.startsWith('language-'));
          const lang = langClass ? langClass.replace('language-', '') : '';
          return `\n\n\`\`\`${lang}\n${node.textContent}\n\`\`\`\n\n`;
        }
      });

      /*****************************************
       * 注入控制面板到指定位置
       *****************************************/
      let container = document.getElementById("mistral-exporter-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "mistral-exporter-container";
        container.style.position = "fixed";
        container.style.right = "100px"; 
        container.style.bottom = "25px"; 
        container.style.zIndex = 9999;
        document.body.appendChild(container);
      }
      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "4px";
      
      // 全域選擇設定
      let storedFilter = "all";

      /********************
       * 第一排：Select row
       ********************/
      const selectRow = document.createElement("div");
      selectRow.style.display = "flex";
      selectRow.style.alignItems = "center";
      selectRow.style.gap = "4px";

      const fixedButtonStyle = {
        width: "80px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 8px",
        cursor: "pointer"
      };

      const selectBtn = document.createElement("button");
        selectBtn.textContent = "Select";
        Object.assign(selectBtn.style, fixedButtonStyle);
        selectBtn.addEventListener("click", async () => {
          selectionModeEnabled = !selectionModeEnabled;

          if (selectionModeEnabled) {
            await scanConversation();
            conversationData.forEach(msg => {
              addCheckboxToMessage(msg.element, msg.id);
            });
            // 將全選勾選框添加到exportRow，使其位於齒輪按鈕正上方
            globalSelectChk.style.display = "inline-block";
            exportRow.style.position = "relative";
            exportRow.appendChild(globalSelectChk);
        
            if (storedFilter === "all") {
              conversationData.forEach(m => (m.selected = true));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                cb.checked = true;
              });
              globalSelectChk.checked = true;
            } else if (storedFilter === "user") {
              conversationData.forEach(m => (m.selected = (m.role === "user")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "user";
              });
              globalSelectChk.checked = false;
            } else if (storedFilter === "assistant") {
              conversationData.forEach(m => (m.selected = (m.role === "assistant")));
              document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
                const msgId = cb.getAttribute("data-msg-id");
                const msg = conversationData.find(m => m.id === msgId);
                cb.checked = msg && msg.role === "assistant";
              });
              globalSelectChk.checked = false;
            }
          } else {
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
            globalSelectChk.style.display = "none";
          }
        });
      selectRow.appendChild(selectBtn);

      const selectDropdownBtn = document.createElement("button");
      selectDropdownBtn.textContent = "▾";
      selectDropdownBtn.style.width = "25px";
      selectDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      selectDropdownBtn.style.color = fixedButtonStyle.color;
      selectDropdownBtn.style.border = fixedButtonStyle.border;
      selectDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      selectDropdownBtn.style.padding = "4px 6px";
      selectDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      selectRow.appendChild(selectDropdownBtn);

      // 全選勾選框（稍後會被添加到container，位於齒輪按鈕正上方）
      const globalSelectChk = document.createElement("input");
      globalSelectChk.type = "checkbox";
      globalSelectChk.checked = true;
      globalSelectChk.style.display = "none";
      globalSelectChk.style.position = "absolute";
      globalSelectChk.style.right = "2px";
      globalSelectChk.style.top = "-24px";
      globalSelectChk.style.zIndex = "10000";
      globalSelectChk.addEventListener("change", () => {
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
          cb.checked = globalSelectChk.checked;
          const msgId = cb.getAttribute("data-msg-id");
          const msg = conversationData.find(m => m.id === msgId);
          if (msg) msg.selected = globalSelectChk.checked;
        });
      });

      // 下拉選單
      const selectDropdownMenu = document.createElement("div");
      selectDropdownMenu.style.position = "absolute";
      selectDropdownMenu.style.backgroundColor = "#555";
      selectDropdownMenu.style.border = "1px solid #777";
      selectDropdownMenu.style.borderRadius = "4px";
      selectDropdownMenu.style.padding = "4px";
      selectDropdownMenu.style.bottom = "35px";
      selectDropdownMenu.style.left = "0";
      selectDropdownMenu.style.display = "none";

      const selectOptions = [
        { value: "all", label: "全選" },
        { value: "user", label: "只選 user" },
        { value: "assistant", label: "只選 Claude" }
      ];
      
      selectOptions.forEach(opt => {
        const optBtn = document.createElement("div");
        optBtn.textContent = opt.label;
        optBtn.style.padding = "4px";
        optBtn.style.cursor = "pointer";
        if (opt.value === storedFilter) {
          optBtn.style.backgroundColor = "#777";
        }
        optBtn.addEventListener("click", () => {
          storedFilter = opt.value;
          Array.from(selectDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === opt.label ? "#777" : "");
          });
          selectDropdownBtn.textContent = "▾";
          selectDropdownMenu.style.display = "none";
          
          conversationData.forEach(msg => {
            let newState;
            if (storedFilter === "all") {
              newState = true;
            } else if (storedFilter === "user") {
              newState = (msg.role === "user");
            } else if (storedFilter === "assistant") {
              newState = (msg.role === "assistant");
            }
            msg.selected = newState;
            const chk = msg.element.querySelector(`[data-msg-id="${msg.id}"]`);
            if (chk) {
              chk.checked = newState;
            }
          });
          globalSelectChk.checked = (storedFilter === "all");
        });
        selectDropdownMenu.appendChild(optBtn);
      });
      
      selectDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectDropdownMenu.style.display = selectDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { selectDropdownMenu.style.display = "none"; });
      selectRow.style.position = "relative";
      selectRow.appendChild(selectDropdownMenu);

      /********************
       * 第二排：Export row
       ********************/
      const exportRow = document.createElement("div");
      exportRow.style.display = "flex";
      exportRow.style.alignItems = "center";
      exportRow.style.gap = "4px";

      const exportBtnText = document.createElement("button");
      exportBtnText.textContent = "Export";
      Object.assign(exportBtnText.style, fixedButtonStyle);
      exportBtnText.addEventListener("click", doExport);
      exportRow.appendChild(exportBtnText);

      const exportDropdownBtn = document.createElement("button");
      exportDropdownBtn.textContent = "▾";
      exportDropdownBtn.style.width = "25px";
      exportDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      exportDropdownBtn.style.color = fixedButtonStyle.color;
      exportDropdownBtn.style.border = fixedButtonStyle.border;
      exportDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      exportDropdownBtn.style.padding = "4px 6px";
      exportDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      exportRow.appendChild(exportDropdownBtn);

      const exportDropdownMenu = document.createElement("div");
      exportDropdownMenu.style.position = "absolute";
      exportDropdownMenu.style.backgroundColor = "#555";
      exportDropdownMenu.style.border = "1px solid #777";
      exportDropdownMenu.style.borderRadius = "4px";
      exportDropdownMenu.style.padding = "4px";
      exportDropdownMenu.style.bottom = "35px";
      exportDropdownMenu.style.left = "0";
      exportDropdownMenu.style.display = "none";

      const formats = [
        { val: "image", label: "IMAGE" },
        { val: "text", label: "TEXT" },
        { val: "markdown", label: "MARKDOWN" },
        { val: "silly", label: "SILLY" }
      ];
      
      formats.forEach(fmt => {
        const fmtBtn = document.createElement("div");
        fmtBtn.textContent = fmt.label;
        fmtBtn.style.padding = "4px";
        fmtBtn.style.cursor = "pointer";
        if (fmt.val === storedFormat) {
          fmtBtn.style.backgroundColor = "#777";
        }
        fmtBtn.addEventListener("click", async () => {
          storedFormat = fmt.val;
          await chrome.storage.local.set({ storedFormat });
          Array.from(exportDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === fmt.label ? "#777" : "");
          });
          exportDropdownBtn.textContent = "▾";
          exportDropdownMenu.style.display = "none";
        });
        exportDropdownMenu.appendChild(fmtBtn);
      });
      
      exportDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportDropdownMenu.style.display = exportDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { exportDropdownMenu.style.display = "none"; });
      exportRow.style.position = "relative";
      exportRow.appendChild(exportDropdownMenu);

      // 設定按鈕
      const settingsBtn = document.createElement("button");
      settingsBtn.textContent = "⚙️";
      settingsBtn.style.width = "35px";
      settingsBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      settingsBtn.style.color = fixedButtonStyle.color;
      settingsBtn.style.border = fixedButtonStyle.border;
      settingsBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      settingsBtn.style.padding = fixedButtonStyle.padding;
      settingsBtn.style.cursor = fixedButtonStyle.cursor;
      settingsBtn.addEventListener("click", showSettingsPanel);
      exportRow.appendChild(settingsBtn);

      container.appendChild(selectRow);
      container.appendChild(exportRow);

      /*****************************************
       * 設定面板
       *****************************************/
      function showSettingsPanel() {
        const style = document.createElement("style");
        style.textContent = `
          .setting-input, .setting-select {
            height: 36px;
            padding: 4px 8px;
            font-size: 14px;
            line-height: 1.2;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            background-color: #fff;
            color: #000;
            width: 100%;
            margin-bottom: 5px;
          }
          .setting-color {
            height: 36px;
            width: 100%;
            padding: 0;
            border: none;
            background: none;
          }
          .setting-avatar-container img {
            display: inline-block;
          }
        `;
        document.head.appendChild(style);
      
        const settingsPanel = document.createElement("div");
        settingsPanel.style.position = "fixed";
        settingsPanel.style.top = "50%";
        settingsPanel.style.left = "50%";
        settingsPanel.style.transform = "translate(-50%, -50%)";
        settingsPanel.style.backgroundColor = "#222";
        settingsPanel.style.padding = "20px";
        settingsPanel.style.borderRadius = "6px";
        settingsPanel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.7)";
        settingsPanel.style.zIndex = "10000";
        settingsPanel.style.width = "600px";
        settingsPanel.style.maxHeight = "80vh";
        settingsPanel.style.overflowY = "auto";
      
        const title = document.createElement("div");
        title.textContent = "設定";
        title.style.marginBottom = "10px";
        title.style.fontSize = "16px";
        title.style.fontWeight = "bold";
        title.style.color = "#fff";
        settingsPanel.appendChild(title);
      
        const settingsContainer = document.createElement("div");
        settingsContainer.style.display = "flex";
        settingsContainer.style.flexWrap = "wrap";
        settingsContainer.style.gap = "10px";
      
        const groups = [
            { label: "基本設定", fields: [
              { label: "使用者名稱", value: storedUserName, key: "storedUserName" },
              { label: "角色名稱", value: storedCharacterName, key: "storedCharacterName" }
            ]},
            { label: "頭像設定", fields: [
              { label: "使用者頭像", value: storedUserAvatar || defaultAvatar, key: "storedUserAvatar" },
              { label: "角色頭像", value: storedAssistantAvatar || defaultAvatar, key: "storedAssistantAvatar" }
            ]},
            { label: "外觀設定", fields: [
              { label: "圖片寬度 (px)", value: storedImageWidth, key: "storedImageWidth" },
              { label: "字體大小 (px)", value: storedFontSize, key: "storedFontSize" },
              { label: "字體顏色", value: storedFontColor, key: "storedFontColor" },
              { label: "使用者訊息背景顏色", value: storedUserMsgBgColor || "#313131", key: "storedUserMsgBgColor" },
            ]},
            { label: "外觀設定", fields: [
              { label: "背景顏色", value: storedBackgroundColor, key: "storedBackgroundColor" },
              { label: "字體", value: storedFontFamily, key: "storedFontFamily" },
              { label: "截圖風格", value: storedScreenshotStyle, key: "storedScreenshotStyle", type: "select", options: [
                { value: "left", label: "全部左側" },
                { value: "bubble", label: "聊天泡泡" }
              ]},
              { label: "Claude訊息背景顏色", value: storedAssistantMsgBgColor || "#202020", key: "storedAssistantMsgBgColor" }
            ]}
          ];

        groups.forEach(group => {
            const groupContainer = document.createElement("div");
            groupContainer.style.flex = "1";
            groupContainer.style.minWidth = "200px";
            groupContainer.style.boxSizing = "border-box";
      
            const groupTitle = document.createElement("div");
            groupTitle.textContent = group.label;
            groupTitle.style.color = "#fff";
            groupTitle.style.marginTop = "10px";
            groupTitle.style.fontWeight = "bold";
            groupContainer.appendChild(groupTitle);
      
            group.fields.forEach(field => {
              const fieldLabel = document.createElement("div");
              fieldLabel.textContent = field.label;
              fieldLabel.style.color = "#fff";
              fieldLabel.style.marginTop = "5px";
              fieldLabel.style.fontSize = "14px";
              groupContainer.appendChild(fieldLabel);
              
              if (field.key === "storedUserAvatar" || field.key === "storedAssistantAvatar") {
                const avatarContainer = document.createElement("div");
                avatarContainer.className = "setting-avatar-container";
                avatarContainer.style.display = "flex";
                avatarContainer.style.alignItems = "center";
                avatarContainer.style.gap = "10px";
                avatarContainer.style.marginBottom = "5px";

                const previewImg = document.createElement("img");
                previewImg.style.width = "36px";
                previewImg.style.height = "36px";
                previewImg.style.objectFit = "cover";
                previewImg.style.border = "1px solid #ccc";
                previewImg.style.borderRadius = "4px";
                previewImg.src = field.value || "";

                const browseBtn = document.createElement("button");
                browseBtn.textContent = "瀏覽檔案";
                browseBtn.className = "setting-input"; 
                browseBtn.style.height = "36px";
                browseBtn.style.lineHeight = "28px";
                browseBtn.style.width = "calc(50% - 50px)";
                browseBtn.style.display = "inline-block";

                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                browseBtn.addEventListener("click", () => fileInput.click());

                fileInput.addEventListener("change", (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = async function(evt) {
                      const dataURL = evt.target.result;
                      previewImg.src = dataURL;
                      const key = field.key === "storedUserAvatar" ? "storedUserAvatar" : "storedAssistantAvatar";
                      if (key === "storedUserAvatar") storedUserAvatar = dataURL;
                      else storedAssistantAvatar = dataURL;
                      await chrome.storage.local.set({ [key]: dataURL });
                    };
                    reader.readAsDataURL(file);
                  }
                });

                avatarContainer.appendChild(browseBtn);
                avatarContainer.appendChild(previewImg);
                groupContainer.appendChild(fileInput);
                groupContainer.appendChild(avatarContainer);

              } else {
              let input;
              if (field.type === "select") {
                input = document.createElement("select");
                field.options.forEach(opt => {
                  const option = document.createElement("option");
                  option.value = opt.value;
                  option.textContent = opt.label;
                  if (opt.value === field.value) option.selected = true;
                  input.appendChild(option);
                });
                input.className = "setting-select";
              } else {
                input = document.createElement("input");
                input.type = ["storedFontColor", "storedBackgroundColor", "storedUserMsgBgColor", "storedAssistantMsgBgColor"].includes(field.key) ? "color" : "text";
                input.value = field.value;
                input.className = input.type === "color" ? "setting-color" : "setting-input";
              }
      
              input.addEventListener("change", async () => {
                const newValue = input.value.trim();
                switch (field.key) {
                  case "storedUserName": storedUserName = newValue || "你"; break;
                  case "storedCharacterName": storedCharacterName = newValue || "Claude"; break;
                  case "storedImageWidth": storedImageWidth = Number(newValue) || 800; break;
                  case "storedFontSize": storedFontSize = Number(newValue) || 16; break;
                  case "storedFontColor": storedFontColor = newValue || "#ffffff"; break;
                  case "storedBackgroundColor": storedBackgroundColor = newValue || "#000000"; break;
                  case "storedFontFamily": storedFontFamily = newValue || "新細明體"; break;
                  case "storedScreenshotStyle": storedScreenshotStyle = newValue; break;
                  case "storedUserMsgBgColor": storedUserMsgBgColor = newValue || "#313131"; break;
                  case "storedAssistantMsgBgColor": storedAssistantMsgBgColor = newValue || "#202020"; break;
                }
                await chrome.storage.local.set({ [field.key]: newValue });
              });
      
              groupContainer.appendChild(input);
            }
          });
      
          settingsContainer.appendChild(groupContainer);
        });
      
        settingsPanel.appendChild(settingsContainer);
      
        const btnContainer = document.createElement("div");
        btnContainer.style.marginTop = "10px";
        btnContainer.style.textAlign = "center";
      
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "儲存";
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.color = "#fff";
        saveBtn.style.border = "none";
        saveBtn.style.borderRadius = "4px";
        saveBtn.style.padding = "6px 12px";
        saveBtn.style.cursor = "pointer";
        saveBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "取消";
        cancelBtn.style.backgroundColor = "#666";
        cancelBtn.style.color = "#fff";
        cancelBtn.style.border = "none";
        cancelBtn.style.borderRadius = "4px";
        cancelBtn.style.padding = "6px 12px";
        cancelBtn.style.cursor = "pointer";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        btnContainer.appendChild(saveBtn);
        btnContainer.appendChild(cancelBtn);
        settingsPanel.appendChild(btnContainer);
        document.body.appendChild(settingsPanel);
      }  

    //html轉換開始
      /**
     * 用 Fetch 抓取圖片並轉成 Base64 Data URI
     * @param {string} url - 圖片的 URL
     * @returns {Promise<string>} 回傳 Base64 資料 URI
     */
      async function fetchAsBase64(url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("讀取圖片失敗");
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Fetch 失敗：", err);
          throw err;
        }
      }
        /**
       * 替換 container 裡所有 <img> 的 src 屬性為 Base64 Data URI（使用 fetch）
       * @param {HTMLElement} container - 目標容器
       * @returns {Promise<void>}
       */
      async function replaceImagesWithBase64(container) {
        const images = container.querySelectorAll("img");
        await Promise.all([...images].map(async (img) => {
          if (img.src.startsWith("data:")) return;
          try {
            img.crossOrigin = "anonymous";
            const dataURL = await fetchAsBase64(img.src);
            img.src = dataURL;
            console.log("圖片已轉 Base64：", dataURL.slice(0, 40) + "...");
            } catch (err) {
        console.error("轉換圖片失敗：", err);
        }
      }))};
      /**
       * 同一則訊息裡，如果出現相同的圖片，只保留第一張，其餘移除
       * @param {HTMLElement} container - 目標容器
       */
      function removeDuplicateImages(container) {
        const images = container.querySelectorAll("img");
        const srcSet = new Set();
        images.forEach((img) => {
          if (srcSet.has(img.src)) {
            img.remove();
          } else {
            srcSet.add(img.src);
          }
        });
      }
      
      async function triggerImageConversion(options = {}) {
        const { splitMode = false, maxHeight = 4096, containerElem: passedContainer } = options;
        let containerElem = passedContainer;
        if (!containerElem) {
          const firstSelected = conversationData.find(m => m.selected);
          if (firstSelected) containerElem = firstSelected.element.parentElement;
        }
        if (!containerElem) {
          const anyMsg = document.querySelector('[data-testid="user-message"], .font-claude-response');
          if (anyMsg) containerElem = anyMsg.parentElement;
        }
        if (!containerElem) {
          console.error("找不到對話容器 (triggerImageConversion)");
          return;
        }

        await replaceImagesWithBase64(containerElem);
        removeDuplicateImages(containerElem);

        conversationData.forEach(msg => {
          const original = msg.element;
          const cloned = original.cloneNode(true);
          cloned.querySelectorAll("button, .copy, .lucide, svg").forEach(el => el.remove());

          // 還原 base64 圖片
          const originalImgs = original.querySelectorAll("img");
          const clonedImgs = cloned.querySelectorAll("img");
          clonedImgs.forEach((img, i) => { if (originalImgs[i]) img.src = originalImgs[i].src; });

          // 助理訊息：組合多個 markdown 區塊 + 畫布預覽
          let contentDiv = cloned;
          if (msg.role === "assistant") {
            const zones = cloned.querySelectorAll('.standard-markdown, .progressive-markdown, .standard-markdown_, .progressive-markdown_');
            if (zones.length) {
              const tmpWrap = document.createElement('div');
              zones.forEach(z => tmpWrap.appendChild(z.cloneNode(true)));
              contentDiv = tmpWrap;
            }
            // 追加畫布預覽到 HTML（方便之後 marked 解析）
            const artifacts = cloned.querySelectorAll('[aria-label="Preview contents"], .artifact-block-cell');
            artifacts.forEach(art => {
              const tiny =
                art.querySelector('div[style*="text-[0.3rem]"]') ||
                art.querySelector('.font-mono') ||
                art.querySelector('[class*="font-mono"]') ||
                art.querySelector('pre, code, div[style*="whitespace-pre-wrap"]');
              if (tiny && tiny.textContent && tiny.textContent.trim()) {
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.textContent = tiny.textContent.trim();
                pre.appendChild(code);
                contentDiv.appendChild(pre);
              }
            });
          }

          msg.html = contentDiv ? contentDiv.innerHTML : "<p>（內容消失惹 QQ）</p>";
          msg.markdown = getMarkdownFromMessage(contentDiv || cloned, msg.role === "user");
        });

        window.__cocoCatchSplitMode = splitMode;
        window.__cocoCatchMaxHeight = maxHeight;
      }

      /*****************************************
       * 匯出功能：收集對話後，交給 background 層處理
       *****************************************/
      async function doExport() {
        await scanConversation();
        let selectedMessages = conversationData.filter(m => m.selected);

        // 二次過濾：確保不匯出包含模型選擇器的訊息（雙重保險）
        selectedMessages = selectedMessages.filter(m => {
          if (!m.element) return true;
          const parent = m.element.closest('.group') || m.element.closest('[data-is-streaming]') || m.element.parentElement;
          if (!parent) return true;
          // 檢查是否有 whitespace-nowrap select-none 的 div（模型選擇器的特徵）
          const hasModelSelector = parent.querySelector('div.whitespace-nowrap.select-none');
          return !hasModelSelector;
        });

        if (selectedMessages.length === 0) {
          alert("沒有符合篩選條件的訊息！");
          return;
        }
        const isImageExport = (storedFormat === "image");
        const MAX_HEIGHT = 4096;
        let splitMode = false;
      
        if (isImageExport) {
          // 只計算選取區段的高度
          const totalHeight = selectedMessages.reduce((h, m) => h + (m.element?.offsetHeight || 0), 0);
          if (totalHeight > MAX_HEIGHT) {
            const ok = window.confirm(`選取的訊息高度 ${totalHeight}px 已超過 ${MAX_HEIGHT}px，將自動分張並壓縮下載，確定嗎？`);
            if (!ok) return;
            splitMode = true;
          }
        }
        await triggerImageConversion({ splitMode, maxHeight: MAX_HEIGHT });
        
        // 建立 sanitizedData，不包含 element 屬性
        const sanitizedData = selectedMessages.map(m => {
          return {
            id: m.id,
            role: m.role,
            // 匯出用：前面加使用者自訂名稱
            text: `${m.role === "user" ? storedUserName : storedCharacterName}：${m.markdown}`,
            // 截圖用：保持純原文給 marked 解析
            markdown: m.markdown,
            selected: m.selected,
          };
        });
      
        const payload = {
          conversationData: sanitizedData,
          settings: {
            splitMode,
            maxHeight: MAX_HEIGHT,
            storedFormat,
            storedUserName,
            storedCharacterName,
            storedImageWidth,
            storedFontSize,
            storedFontColor,
            storedBackgroundColor,
            storedFontFamily,
            storedUserAvatar,
            storedAssistantAvatar,
            storedScreenshotStyle,
            storedUserMsgBgColor,
            storedAssistantMsgBgColor,
            fileNameBase: document.title
          }
        };
      
        try {
          // 直接在content script中執行匯出邏輯
          const result = await handleExport(sanitizedData, payload.settings);
          console.log("匯出完成:", result);
        } catch (error) {
          console.error("匯出失敗:", error);
        }
      }

      // 幫訊息加入勾選框
      function addCheckboxToMessage(article, msgId) {
        // 確保不重複增加
        const host = article.closest('.group') || article;
        if (host.querySelector(`[data-msg-id="${msgId}"]`)) return;

        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "chat-export-checkbox";
        chk.setAttribute("data-msg-id", msgId);
        const msg = conversationData.find(m => m.id === msgId);
        chk.checked = !!(msg && msg.selected);
        chk.style.cursor = "pointer";
        chk.style.zIndex = "1000";
        chk.addEventListener("change", () => {
          const changingMsg = conversationData.find(m => m.id === msgId);
          if (changingMsg) changingMsg.selected = chk.checked;
        });

        // 判斷是否為用戶訊息（用戶訊息有 data-testid="user-message"）
        const isUserMessage = article.querySelector('[data-testid="user-message"]');

        if (isUserMessage) {
          // 用戶訊息：使用flex布局，插入到.flex.flex-row的第一個子元素之前
          const target = host.querySelector('.flex.flex-row');
          if (target) {
            chk.style.marginRight = "6px";
            chk.style.alignSelf = "flex-start";
            target.insertBefore(chk, target.firstChild);
          } else {
            // 備用：絕對定位
            chk.style.position = "absolute";
            chk.style.left = "-28px";
            chk.style.top = "8px";
            host.style.position = host.style.position || "relative";
            host.appendChild(chk);
          }
        } else {
          // AI訊息：使用絕對定位，放在整個訊息區塊的外側
          chk.style.position = "absolute";
          chk.style.left = "-28px";
          chk.style.top = "8px";
          host.style.position = host.style.position || "relative";
          host.appendChild(chk);
        }
      }

      // 啟動和監聽邏輯（只更動準備條件的 HTML 選擇器）
      const mainObserver = new MutationObserver(async (mutations) => {
        const hasRelevantChanges = mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0);
        if (hasRelevantChanges) {
          await scanConversation();
        }
      });

      // 使用 setInterval 確保擴充功能在頁面切換後能正確啟動
      let startupInterval = setInterval(() => {
        const mainElem = document.querySelector("main");
        // 針對 Claude 聊天室的特殊元素檢查
        const chatArea = document.querySelector('[data-testid="user-message"], .font-claude-response');

        if (mainElem && chatArea) {
          console.log("✅ Claude UI is ready. Initializing exporter.");
          
          // 首次執行
          currentUrl = window.location.pathname;
          scanConversation();
          
          // 啟動 MutationObserver
          mainObserver.observe(mainElem, {
            childList: true,
            subtree: true,
          });
          
          // 完成後清除 Interval
          clearInterval(startupInterval);
        }
      }, 500);
    
    console.log('✅ Claude 匯出工具初始化完成');
  }

  // Grok 匯出
  async function initGrok() {
    console.log('🛰️ 初始化 Grok 匯出工具');
    
    const storedData = await chrome.storage.local.get({
        storedFormat: "text",
        storedUserName: "你",
        storedCharacterName: "Grok",
        storedImageWidth: 800,
        storedFontSize: 16,
        storedFontColor: "#ffffff",
        storedBackgroundColor: "#000000",
        storedFontFamily: "新細明體",
        storedUserAvatar: "",
        storedAssistantAvatar: "",
        storedScreenshotStyle: "left",
        storedUserMsgBgColor: "#313131",
        storedAssistantMsgBgColor: "#202020"
      });
      let storedFormat = storedData.storedFormat;
      let storedUserName = storedData.storedUserName;
      let storedCharacterName = storedData.storedCharacterName;
      let storedImageWidth = storedData.storedImageWidth;
      let storedFontSize = storedData.storedFontSize;
      let storedFontColor = storedData.storedFontColor;
      let storedBackgroundColor = storedData.storedBackgroundColor;
      let storedFontFamily = storedData.storedFontFamily;
      let storedUserAvatar = storedData.storedUserAvatar;
      let storedAssistantAvatar = storedData.storedAssistantAvatar;
      let storedScreenshotStyle = storedData.storedScreenshotStyle;
      let storedUserMsgBgColor = storedData.storedUserMsgBgColor;
      let storedAssistantMsgBgColor = storedData.storedAssistantMsgBgColor;

      let selectionModeEnabled = false;
      let conversationData = [];
      let currentUrl = window.location.pathname;

      function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }

      function detectRole(groupEl) {
        if (groupEl.classList.contains("items-end")) return "user";
        if (groupEl.classList.contains("items-start")) return "assistant";
        const hasRegen = groupEl.querySelector(".action-buttons [aria-label='Regenerate']");
        if (hasRegen) return "assistant";
        return "assistant";
      }

      function checkIfChatChanged() {
        if (window.location.pathname !== currentUrl) {
          console.log("URL change detected. Resetting conversation data.");
          currentUrl = window.location.pathname;
          conversationData = [];
          
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
          
          const allMessages = document.querySelectorAll("[data-grok-message]");
          allMessages.forEach(msg => msg.removeAttribute("data-grok-message"));
        }
      }

      async function scanConversation() {
        checkIfChatChanged();

        const messageGroups = Array.from(document.querySelectorAll("div[id^='response-']"));
        const currentMessageSet = new Set(messageGroups);

        conversationData = conversationData.filter(msg => currentMessageSet.has(msg.element));
        const existingElementsInConvData = new Set(conversationData.map(msg => msg.element));

        for (const messageEl of messageGroups) {
          if (!existingElementsInConvData.has(messageEl)) {
            const role = detectRole(messageEl);
            const bubble = messageEl.querySelector(".message-bubble") || messageEl;
            const cloned = bubble.cloneNode(true);

            cloned.querySelectorAll(".action-buttons, .inline-media-container, .auth-notification").forEach(el => el.remove());
            cloned.querySelectorAll("div.flex.flex-col.gap-1.mt-2.items-start.w-full").forEach(el => el.remove());
            cloned.querySelectorAll("button[aria-label='儲存'], button[aria-label='製作影片']").forEach(el => el.remove());

            const contentNode = cloned.querySelector(".response-content-markdown") || cloned;
            const finalText = contentNode.innerText.trim();

            const newMessageData = {
              id: generateId(),
              role,
              text: finalText,
              markdown: getMarkdownFromMessage(contentNode, role === "user"),
              element: messageEl,
              selected: true
            };
            messageEl.setAttribute('data-grok-message', newMessageData.id);
            conversationData.push(newMessageData);
          }
        }

        conversationData.sort((a, b) => {
          const position = a.element.compareDocumentPosition(b.element);
          if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
          if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
          return 0;
        });

        if (selectionModeEnabled) {
          conversationData.forEach(msg => {
            if (!msg.element.querySelector(".chat-export-checkbox")) {
              addCheckboxToMessage(msg.element, msg.id);
            }
          });
        }
      }

      function escapeHTML(str) {
        return str.replace(/[&<>"']/g, (m) =>
          ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
        );
      }

      function getMarkdownFromMessage(el, isUser) {
        if (isUser) {
          const htmlContent = el.innerHTML
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/(p|div)>\s*<((p|div)[^>]*)>/gi, '\n');
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const rawText = tempDiv.textContent || tempDiv.innerText || "";
          return rawText
            .split('\n').map(line => line.trimEnd()).join('\n')
            .replace(/\n{3,}/g, '\n\n').trim();
        }

        const contentNode = el.querySelector('.response-content-markdown') || el;
        const md = turndownService.turndown(contentNode.innerHTML);
        return md.replace(/\n{3,}/g, "\n\n").trim();
      }

      const turndownService = new TurndownService();
      if (typeof turndownPluginGfm !== "undefined" && turndownPluginGfm.gfm) {
        turndownService.use(turndownPluginGfm.gfm);
      }
      turndownService.addRule('strikethrough', {
        filter: ['del', 's', 'strike'],
        replacement: function (content) {
          return '~~' + content + '~~';
        }
      });
      turndownService.addRule('multilineCode', {
        filter: function (node) {
          return (
            node.nodeName === 'CODE' &&
            (node.className?.includes?.('language-') || (node.textContent || '').includes('\n'))
          );
        },
        replacement: function (content, node) {
          const cls = Array.from(node.classList || []);
          const langClass = cls.find(c => c.startsWith('language-'));
          const lang = langClass ? langClass.replace('language-', '') : '';
          return `\n\n\`\`\`${lang}\n${node.textContent}\n\`\`\`\n\n`;
        }
      });

      /*****************************************
       * 注入控制面板到指定位置
       *****************************************/
      let container = document.getElementById("mistral-exporter-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "mistral-exporter-container";
        container.style.position = "fixed";
        container.style.right = "100px"; 
        container.style.bottom = "25px"; 
        container.style.zIndex = 9999;
        document.body.appendChild(container);
      }
      container.innerHTML = "";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "4px";
      
      // 全域選擇設定
      let storedFilter = "all";

      /********************
       * 第一排：Select row
       ********************/
      const selectRow = document.createElement("div");
      selectRow.style.display = "flex";
      selectRow.style.alignItems = "center";
      selectRow.style.gap = "4px";

      // 「Select」按鈕
      const fixedButtonStyle = {
        width: "80px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "4px 8px",
        cursor: "pointer"
      };

      const selectBtn = document.createElement("button");
      selectBtn.textContent = "Select";
      Object.assign(selectBtn.style, fixedButtonStyle);
      selectBtn.addEventListener("click", async () => {
        selectionModeEnabled = !selectionModeEnabled;
      
        if (selectionModeEnabled) {
          await scanConversation();
          conversationData.forEach(msg => {
            addCheckboxToMessage(msg.element, msg.id);
          });
          globalSelectChk.style.display = "inline-block";
          globalSelectChk.style.position = "absolute";
          globalSelectChk.style.right = "8px";
          globalSelectChk.style.top = "5px";
      
          if (storedFilter === "all") {
            conversationData.forEach(m => (m.selected = true));
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
              cb.checked = true;
            });
            globalSelectChk.checked = true;
          } else if (storedFilter === "user") {
            conversationData.forEach(m => (m.selected = (m.role === "user")));
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
              const msgId = cb.getAttribute("data-msg-id");
              const msg = conversationData.find(m => m.id === msgId);
              cb.checked = msg && msg.role === "user";
            });
            globalSelectChk.checked = false;
          } else if (storedFilter === "assistant") {
            conversationData.forEach(m => (m.selected = (m.role === "assistant")));
            document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
              const msgId = cb.getAttribute("data-msg-id");
              const msg = conversationData.find(m => m.id === msgId);
              cb.checked = msg && msg.role === "assistant";
            });
            globalSelectChk.checked = false;
          }
        } else {
          document.querySelectorAll(".chat-export-checkbox").forEach(cb => cb.remove());
          globalSelectChk.style.display = "none";
        }
      });
      selectRow.appendChild(selectBtn);

      const selectDropdownBtn = document.createElement("button");
      selectDropdownBtn.textContent = "▾";
      selectDropdownBtn.style.width = "25px";
      selectDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      selectDropdownBtn.style.color = fixedButtonStyle.color;
      selectDropdownBtn.style.border = fixedButtonStyle.border;
      selectDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      selectDropdownBtn.style.padding = "4px 6px";
      selectDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      selectRow.appendChild(selectDropdownBtn);

      // 全選勾選框 (全局)
      const globalSelectChk = document.createElement("input");
      globalSelectChk.type = "checkbox";
      globalSelectChk.checked = true;
      globalSelectChk.style.display = "none";
      globalSelectChk.addEventListener("change", () => {
        document.querySelectorAll(".chat-export-checkbox").forEach(cb => {
          cb.checked = globalSelectChk.checked;
          const msgId = cb.getAttribute("data-msg-id");
          const msg = conversationData.find(m => m.id === msgId);
          if (msg) msg.selected = globalSelectChk.checked;
        });
      });
      selectRow.appendChild(globalSelectChk);

      // 下拉選單 (Select)
      const selectDropdownMenu = document.createElement("div");
      selectDropdownMenu.style.position = "absolute";
      selectDropdownMenu.style.backgroundColor = "#555";
      selectDropdownMenu.style.border = "1px solid #777";
      selectDropdownMenu.style.borderRadius = "4px";
      selectDropdownMenu.style.padding = "4px";
      selectDropdownMenu.style.bottom = "35px";
      selectDropdownMenu.style.left = "0";
      selectDropdownMenu.style.display = "none";
      
      const selectOptions = [
        { value: "all", label: "全選" },
        { value: "user", label: "只選 user" },
        { value: "assistant", label: "只選 Grok" }
      ];
      
      selectOptions.forEach(opt => {
        const optBtn = document.createElement("div");
        optBtn.textContent = opt.label;
        optBtn.style.padding = "4px";
        optBtn.style.cursor = "pointer";
        if (opt.value === storedFilter) {
          optBtn.style.backgroundColor = "#777";
        }
        optBtn.addEventListener("click", () => {
          storedFilter = opt.value;
          Array.from(selectDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === opt.label ? "#777" : "");
          });
          selectDropdownBtn.textContent = "▾";
          selectDropdownMenu.style.display = "none";
          
          conversationData.forEach(msg => {
            let newState;
            if (storedFilter === "all") {
              newState = true;
            } else if (storedFilter === "user") {
              newState = (msg.role === "user");
            } else if (storedFilter === "assistant") {
              newState = (msg.role === "assistant");
            }
            msg.selected = newState;
            const chk = msg.element.querySelector(`[data-msg-id="${msg.id}"]`);
            if (chk) {
              chk.checked = newState;
            }
          });
          globalSelectChk.checked = (storedFilter === "all");
        });
        selectDropdownMenu.appendChild(optBtn);
      });
      
      selectDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectDropdownMenu.style.display = selectDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { selectDropdownMenu.style.display = "none"; });
      selectRow.style.position = "relative";
      selectRow.appendChild(selectDropdownMenu);

      /********************
       * 第二排：Export row
       ********************/
      const exportRow = document.createElement("div");
      exportRow.style.display = "flex";
      exportRow.style.alignItems = "center";
      exportRow.style.gap = "4px";

      const exportBtnText = document.createElement("button");
      exportBtnText.textContent = "Export";
      Object.assign(exportBtnText.style, fixedButtonStyle);
      exportBtnText.addEventListener("click", doExport);
      exportRow.appendChild(exportBtnText);

      const exportDropdownBtn = document.createElement("button");
      exportDropdownBtn.textContent = "▾";
      exportDropdownBtn.style.width = "25px";
      exportDropdownBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      exportDropdownBtn.style.color = fixedButtonStyle.color;
      exportDropdownBtn.style.border = fixedButtonStyle.border;
      exportDropdownBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      exportDropdownBtn.style.padding = "4px 6px";
      exportDropdownBtn.style.cursor = fixedButtonStyle.cursor;
      exportRow.appendChild(exportDropdownBtn);

      const exportDropdownMenu = document.createElement("div");
      exportDropdownMenu.style.position = "absolute";
      exportDropdownMenu.style.backgroundColor = "#555";
      exportDropdownMenu.style.border = "1px solid #777";
      exportDropdownMenu.style.borderRadius = "4px";
      exportDropdownMenu.style.padding = "4px";
      exportDropdownMenu.style.bottom = "35px";
      exportDropdownMenu.style.left = "0";
      exportDropdownMenu.style.display = "none";

      const formats = [
        { val: "image", label: "IMAGE" },
        { val: "text", label: "TEXT" },
        { val: "markdown", label: "MARKDOWN" },
        { val: "silly", label: "SILLY" }
      ];
      
      formats.forEach(fmt => {
        const fmtBtn = document.createElement("div");
        fmtBtn.textContent = fmt.label;
        fmtBtn.style.padding = "4px";
        fmtBtn.style.cursor = "pointer";
        if (fmt.val === storedFormat) {
          fmtBtn.style.backgroundColor = "#777";
        }
        fmtBtn.addEventListener("click", async () => {
          storedFormat = fmt.val;
          await chrome.storage.local.set({ storedFormat });
          Array.from(exportDropdownMenu.children).forEach(child => {
            child.style.backgroundColor = (child.textContent === fmt.label ? "#777" : "");
          });
          exportDropdownBtn.textContent = "▾";
          exportDropdownMenu.style.display = "none";
        });
        exportDropdownMenu.appendChild(fmtBtn);
      });
      
      exportDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportDropdownMenu.style.display = exportDropdownMenu.style.display === "none" ? "block" : "none";
      });
      document.addEventListener("click", () => { exportDropdownMenu.style.display = "none"; });
      exportRow.style.position = "relative";
      exportRow.appendChild(exportDropdownMenu);

      // 設定按鈕
      const settingsBtn = document.createElement("button");
      settingsBtn.textContent = "⚙️";
      settingsBtn.style.width = "35px";
      settingsBtn.style.backgroundColor = fixedButtonStyle.backgroundColor;
      settingsBtn.style.color = fixedButtonStyle.color;
      settingsBtn.style.border = fixedButtonStyle.border;
      settingsBtn.style.borderRadius = fixedButtonStyle.borderRadius;
      settingsBtn.style.padding = fixedButtonStyle.padding;
      settingsBtn.style.cursor = fixedButtonStyle.cursor;
      settingsBtn.addEventListener("click", showSettingsPanel);
      exportRow.appendChild(settingsBtn);

      container.innerHTML = "";
      container.appendChild(selectRow);
      container.appendChild(exportRow);

      // 設定面板 (保持原樣，只修改預設角色名稱)
      function showSettingsPanel() {
        const style = document.createElement("style");
        style.textContent = `
          .setting-input, .setting-select {
            height: 36px;
            padding: 4px 8px;
            font-size: 14px;
            line-height: 1.2;
            border-radius: 4px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            background-color: #fff;
            color: #000;
            width: 100%;
            margin-bottom: 5px;
          }
          .setting-color {
            height: 36px;
            width: 100%;
            padding: 0;
            border: none;
            background: none;
          }
          .setting-avatar-container img {
          display: inline-block;
          }
        `;
        document.head.appendChild(style);
      
        const settingsPanel = document.createElement("div");
        settingsPanel.style.position = "fixed";
        settingsPanel.style.top = "50%";
        settingsPanel.style.left = "50%";
        settingsPanel.style.transform = "translate(-50%, -50%)";
        settingsPanel.style.backgroundColor = "#222";
        settingsPanel.style.padding = "20px";
        settingsPanel.style.borderRadius = "6px";
        settingsPanel.style.boxShadow = "0 2px 10px rgba(0,0,0,0.7)";
        settingsPanel.style.zIndex = "10000";
        settingsPanel.style.width = "600px";
        settingsPanel.style.maxHeight = "80vh";
        settingsPanel.style.overflowY = "auto";
      
        const title = document.createElement("div");
        title.textContent = "設定";
        title.style.marginBottom = "10px";
        title.style.fontSize = "16px";
        title.style.fontWeight = "bold";
        title.style.color = "#fff";
        settingsPanel.appendChild(title);
      
        const settingsContainer = document.createElement("div");
        settingsContainer.style.display = "flex";
        settingsContainer.style.flexWrap = "wrap";
        settingsContainer.style.gap = "10px";
      
        const groups = [
            { label: "基本設定", fields: [
              { label: "使用者名稱", value: storedUserName, key: "storedUserName" },
              { label: "角色名稱", value: storedCharacterName, key: "storedCharacterName" }
            ]},
            { label: "頭像設定", fields: [
              { label: "使用者頭像", value: storedUserAvatar || defaultAvatar, key: "storedUserAvatar" },
              { label: "角色頭像", value: storedAssistantAvatar || defaultAvatar, key: "storedAssistantAvatar" }
            ]},
            { label: "外觀設定", fields: [
              { label: "圖片寬度 (px)", value: storedImageWidth, key: "storedImageWidth" },
              { label: "字體大小 (px)", value: storedFontSize, key: "storedFontSize" },
              { label: "字體顏色", value: storedFontColor, key: "storedFontColor" },
              { label: "使用者訊息背景顏色", value: storedUserMsgBgColor || "#313131", key: "storedUserMsgBgColor" },
            ]},
            { label: "外觀設定", fields: [
              { label: "背景顏色", value: storedBackgroundColor, key: "storedBackgroundColor" },
              { label: "字體", value: storedFontFamily, key: "storedFontFamily" },
              { label: "截圖風格", value: storedScreenshotStyle, key: "storedScreenshotStyle", type: "select", options: [
                { value: "left", label: "全部左側" },
                { value: "bubble", label: "聊天泡泡" }
              ]},
              { label: "Gemini訊息背景顏色", value: storedAssistantMsgBgColor || "#202020", key: "storedAssistantMsgBgColor" }
            ]}
          ];
      
        groups.forEach(group => {
            const groupContainer = document.createElement("div");
            groupContainer.style.flex = "1";
            groupContainer.style.minWidth = "200px";
            groupContainer.style.boxSizing = "border-box";
      
            const groupTitle = document.createElement("div");
            groupTitle.textContent = group.label;
            groupTitle.style.color = "#fff";
            groupTitle.style.marginTop = "10px";
            groupTitle.style.fontWeight = "bold";
            groupContainer.appendChild(groupTitle);
      
            group.fields.forEach(field => {
              const fieldLabel = document.createElement("div");
              fieldLabel.textContent = field.label;
              fieldLabel.style.color = "#fff";
              fieldLabel.style.marginTop = "5px";
              fieldLabel.style.fontSize = "14px";
              groupContainer.appendChild(fieldLabel);
              
              if (field.key === "storedUserAvatar" || field.key === "storedAssistantAvatar") {
                const avatarContainer = document.createElement("div");
                avatarContainer.className = "setting-avatar-container";
                avatarContainer.style.display = "flex";
                avatarContainer.style.alignItems = "center";
                avatarContainer.style.gap = "10px";
                avatarContainer.style.marginBottom = "5px";

                const previewImg = document.createElement("img");
                previewImg.style.width = "36px";
                previewImg.style.height = "36px";
                previewImg.style.objectFit = "cover";
                previewImg.style.border = "1px solid #ccc";
                previewImg.style.borderRadius = "4px";
                previewImg.src = field.value || "";

                const browseBtn = document.createElement("button");
                browseBtn.textContent = "瀏覽檔案";
                browseBtn.className = "setting-input"; 
                browseBtn.style.height = "36px";
                browseBtn.style.lineHeight = "28px";
                browseBtn.style.width = "calc(50% - 50px)";
                browseBtn.style.display = "inline-block";

                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.style.display = "none";
                browseBtn.addEventListener("click", () => fileInput.click());

                fileInput.addEventListener("change", (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = async function(evt) {
                      const dataURL = evt.target.result;
                      previewImg.src = dataURL;
                      const key = field.key === "storedUserAvatar" ? "storedUserAvatar" : "storedAssistantAvatar";
                      if (key === "storedUserAvatar") storedUserAvatar = dataURL;
                      else storedAssistantAvatar = dataURL;
                      await chrome.storage.local.set({ [key]: dataURL });
                    };
                    reader.readAsDataURL(file);
                  }
                });

                avatarContainer.appendChild(browseBtn);
                avatarContainer.appendChild(previewImg);
                groupContainer.appendChild(fileInput);
                groupContainer.appendChild(avatarContainer);

              } else {
              let input;
              if (field.type === "select") {
                input = document.createElement("select");
                field.options.forEach(opt => {
                  const option = document.createElement("option");
                  option.value = opt.value;
                  option.textContent = opt.label;
                  if (opt.value === field.value) option.selected = true;
                  input.appendChild(option);
                });
                input.className = "setting-select";
              } else {
                input = document.createElement("input");
                input.type = ["storedFontColor", "storedBackgroundColor", "storedUserMsgBgColor", "storedAssistantMsgBgColor"].includes(field.key) ? "color" : "text";
                input.value = field.value;
                input.className = input.type === "color" ? "setting-color" : "setting-input";
              }
      
              input.addEventListener("change", async () => {
                const newValue = input.value.trim();
                switch (field.key) {
                  case "storedUserName": storedUserName = newValue || "你"; break;
                  case "storedCharacterName": storedCharacterName = newValue || "Gemini"; break;
                  case "storedImageWidth": storedImageWidth = Number(newValue) || 800; break;
                  case "storedFontSize": storedFontSize = Number(newValue) || 16; break;
                  case "storedFontColor": storedFontColor = newValue || "#ffffff"; break;
                  case "storedBackgroundColor": storedBackgroundColor = newValue || "#000000"; break;
                  case "storedFontFamily": storedFontFamily = newValue || "新細明體"; break;
                  case "storedScreenshotStyle": storedScreenshotStyle = newValue; break;
                  case "storedUserMsgBgColor": storedUserMsgBgColor = newValue || "#313131"; break;
                  case "storedAssistantMsgBgColor": storedAssistantMsgBgColor = newValue || "#202020"; break;
                }
                await chrome.storage.local.set({ [field.key]: newValue });
              });
      
              groupContainer.appendChild(input);
            }
          });
      
          settingsContainer.appendChild(groupContainer);
        });
      
        settingsPanel.appendChild(settingsContainer);
      
        const btnContainer = document.createElement("div");
        btnContainer.style.marginTop = "10px";
        btnContainer.style.textAlign = "center";
      
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "儲存";
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.color = "#fff";
        saveBtn.style.border = "none";
        saveBtn.style.borderRadius = "4px";
        saveBtn.style.padding = "6px 12px";
        saveBtn.style.cursor = "pointer";
        saveBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "取消";
        cancelBtn.style.backgroundColor = "#666";
        cancelBtn.style.color = "#fff";
        cancelBtn.style.border = "none";
        cancelBtn.style.borderRadius = "4px";
        cancelBtn.style.padding = "6px 12px";
        cancelBtn.style.cursor = "pointer";
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
          document.body.removeChild(settingsPanel);
        });
      
        btnContainer.appendChild(saveBtn);
        btnContainer.appendChild(cancelBtn);
        settingsPanel.appendChild(btnContainer);
        document.body.appendChild(settingsPanel);
      }  

      async function fetchAsBase64(url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("讀取圖片失敗");
            reader.readAsDataURL(blob);
          });
        } catch (err) {
          console.error("Fetch 失敗:", err);
          throw err;
        }
      }
  
      async function replaceImagesWithBase64(container) {
        const images = container.querySelectorAll("img");
        await Promise.all([...images].map(async (img) => {
          if (img.src.startsWith("data:")) return;
          try {
            img.crossOrigin = "anonymous";
            const dataURL = await fetchAsBase64(img.src);
            img.src = dataURL;
            console.log("圖片已轉 Base64：", dataURL.slice(0, 40) + "...");
          } catch (err) {
            console.error("轉換圖片失敗:", err);
          }
        }));
      }
  
      function removeDuplicateImages(container) {
        const images = container.querySelectorAll("img");
        const srcSet = new Set();
        images.forEach((img) => {
          if (srcSet.has(img.src)) {
            img.remove();
          } else {
            srcSet.add(img.src);
          }
        });
      }

      async function triggerImageConversion(options = {}) {
        const { splitMode = false, maxHeight = 4096, containerElem: passedContainer } = options;
        let containerElem = passedContainer;
        if (!containerElem) {
          const firstSelected = conversationData.find(m => m.selected);
          if (firstSelected) containerElem = firstSelected.element;
        }
        if (!containerElem) {
          console.error("找不到對話容器 (triggerImageConversion)");
          return;
        }

        await replaceImagesWithBase64(containerElem);
        removeDuplicateImages(containerElem);

        conversationData.forEach(msg => {
          const original = msg.element;
          const cloned = original.cloneNode(true);

          cloned.querySelectorAll(".action-buttons, .inline-media-container, .auth-notification").forEach(el => el.remove());
          cloned.querySelectorAll("div.flex.flex-col.gap-1.mt-2.items-start.w-full").forEach(el => el.remove());
          cloned.querySelectorAll("button[aria-label='儲存'], button[aria-label='製作影片']").forEach(el => el.remove());

          const contentDiv = cloned.querySelector(".response-content-markdown") || cloned;

          const originalImgs = original.querySelectorAll("img");
          const clonedImgs = cloned.querySelectorAll("img");
          clonedImgs.forEach((img, i) => {
            if (originalImgs[i]) img.src = originalImgs[i].src;
          });

          msg.html = contentDiv ? contentDiv.innerHTML : "<p>（內容消失惹 QQ）</p>";
          msg.markdown = getMarkdownFromMessage(contentDiv || cloned, msg.role === "user");
        });

        window.__cocoCatchSplitMode = splitMode;
        window.__cocoCatchMaxHeight = maxHeight;
      }

      async function doExport() {
        await scanConversation();
        let selectedMessages = conversationData.filter(m => m.selected);
        if (selectedMessages.length === 0) {
          alert("沒有符合篩選條件的訊息！");
          return;
        }
        
        const isImageExport = (storedFormat === "image");
        const MAX_HEIGHT = 4096;
        let splitMode = false;
      
        if (isImageExport) {
          const totalHeight = selectedMessages.reduce((h, m) => h + (m.element?.offsetHeight || 0), 0);
          if (totalHeight > MAX_HEIGHT) {
            const ok = window.confirm(`選取的訊息高度 ${totalHeight}px 已超過 ${MAX_HEIGHT}px，將自動分張並壓縮下載，確定嗎？`);
            if (!ok) return;
            splitMode = true;
          }
        }
        
        await triggerImageConversion({ splitMode, maxHeight: MAX_HEIGHT });
        // 再次強制將選取訊息內的圖片轉為 Base64，確保 Markdown 也使用 data URL，並移除重複圖
        for (const msg of selectedMessages) {
          try {
            await replaceImagesWithBase64(msg.element);
            removeDuplicateImages(msg.element);
          } catch (err) {
            console.error("Grok 圖片轉 Base64 失敗：", err);
          }
          const contentNode = msg.element.querySelector(".response-content-markdown") || msg.element;
          msg.markdown = getMarkdownFromMessage(contentNode, msg.role === "user");
        }
        
        const sanitizedData = selectedMessages.map(m => {
          return {
            id: m.id,
            role: m.role,
            text: `${m.role === "user" ? storedUserName : storedCharacterName}:${m.markdown}`,
            markdown: m.markdown,
            selected: m.selected,
          };
        });
      
        const payload = {
          conversationData: sanitizedData,
          settings: {
            splitMode,
            maxHeight: MAX_HEIGHT,
            storedFormat,
            storedUserName,
            storedCharacterName,
            storedImageWidth,
            storedFontSize,
            storedFontColor,
            storedBackgroundColor,
            storedFontFamily,
            storedUserAvatar,
            storedAssistantAvatar,
            storedScreenshotStyle,
            storedUserMsgBgColor,
            storedAssistantMsgBgColor,
            fileNameBase: document.title
          }
        };
        try {
          const result = await handleExport(sanitizedData, payload.settings);
          console.log("匯出完成:", result);
        } catch (error) {
          console.error("匯出失敗:", error);
        }
      }

      function addCheckboxToMessage(article, msgId) {
        if (article.querySelector(`[data-msg-id="${msgId}"]`)) return;
        const chk = document.createElement("input");
        chk.type = "checkbox";
        chk.className = "chat-export-checkbox";
        chk.setAttribute("data-msg-id", msgId);
        const msg = conversationData.find(m => m.id === msgId);
        chk.checked = !!(msg && msg.selected);
        chk.style.position = "absolute";
        chk.style.right = "-100px";
        chk.style.top = "10px";
        chk.style.zIndex = "1000";
        chk.addEventListener("change", () => {
          const changingMsg = conversationData.find(m => m.id === msgId);
          if (changingMsg) changingMsg.selected = chk.checked;
        });
        article.style.position = "relative";
        article.appendChild(chk);
      }

      const mainObserver = new MutationObserver(async (mutations) => {
        const hasRelevantChanges = mutations.some(m => m.type === 'childList' && m.addedNodes.length > 0);
        if (hasRelevantChanges) {
          await scanConversation();
        }
      });

      let startupInterval = setInterval(() => {
        const mainElem = document.querySelector("main, body");
        const grokContainer = document.querySelector("div[id^='response-']");

        if (mainElem && grokContainer) {
          console.log("✅ Grok UI is ready. Initializing exporter.");
          
          currentUrl = window.location.pathname;
          scanConversation();
          
          mainObserver.observe(mainElem, {
            childList: true,
            subtree: true,
          });
          
          clearInterval(startupInterval);
        }
      }, 500);
    
    console.log('✅Grok 匯出工具初始化完成');
  }

  // 主執行邏輯
  async function main() {
    try {
      const platform = await waitForPlatform();
      
      if (!platform) {
        console.log('🔍 未偵測到支援的聊天平台');
        return;
      }

      console.log(`🎯 偵測到平台: ${platform}`);

      // 根據平台初始化對應邏輯
      switch (platform) {
        case 'chatgpt':
          await initChatGPT();
          break;
        case 'gemini':
          await initGemini();
          break;
        case 'mistral':
          await initMistralChat();
          break;
        case 'claude':
          await initClaude();
          break;
        case 'grok':
          await initGrok();
          break;
        default:
          console.error('❌ 未知平台:', platform);
      }

    } catch (error) {
      console.error('💥 初始化時發生錯誤:', error);
    }
  }

  // URL 變更監聽
  let lastUrl = window.location.href;
  function handleUrlChange() {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      setTimeout(main, 1000);
    }
  }

  const observer = new MutationObserver(handleUrlChange);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener('popstate', handleUrlChange);

  // 執行主程序
  main();

})();
