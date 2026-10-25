function initMsgApp() {
  const container = document.getElementById("msgAppContent");
  if (container.innerHTML.trim() !== "") return;

  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%; background:#fff; color:#000;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span style="font-size:17px; font-weight:600;">${t.msg_title}</span>
      </div>
      <div id="msgList" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:12px;">
        <div id="chatItem" onclick="openMsgChat()" style="display:flex; gap:10px; align-items:center; cursor:pointer;">
          <div style="width:50px; height:50px; border-radius:50%; background:#8e8e93; display:flex; align-items:center; justify-content:center; font-size:24px; color:#fff;">👤</div>
          <div style="flex:1; border-bottom:1px solid #eee; padding-bottom:12px; margin-top:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:16px;">${t.msg_boyfriend}</span>
              <span style="font-size:13px; color:#8e8e93;">${t.tw_just_now}</span>
            </div>
            <div id="msgPreview" style="font-size:14px; color:#8e8e93; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.msg_1}</div>
          </div>
        </div>
      </div>
    </div>

    <div id="chatRoom" style="display:none; position:absolute; inset:0; background:#fff; color:#000; flex-direction:column; z-index:100;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span onclick="closeMsgChat()" style="color:#007aff; font-size:16px; cursor:pointer;">‹ ${t.msg_title}</span>
        <span style="font-size:16px; font-weight:600;">${t.msg_boyfriend}</span>
        <span style="width:40px;"></span>
      </div>
      <div id="chatArea" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px;"></div>
      <div id="msgOptions" style="display:none; padding:10px 16px; background:#f2f2f7; border-top:1px solid #ddd; flex-direction:column; gap:6px;"></div>
      <div id="fakeInputBar" onclick="triggerMsgOptions()" style="padding:10px 16px 34px; background:#fff; border-top:1px solid #eee; align-items:center; gap:10px; display:flex; cursor:pointer;">
        <div style="flex:1; background:#f2f2f7; border-radius:20px; padding:10px 15px; color:#c7c7cc; font-size:15px;">${t.imessage}</div>
        <div style="width:30px; height:30px; border-radius:50%; border:1.5px solid #c7c7cc; display:flex; align-items:center; justify-content:center; color:#c7c7cc; font-size:14px;">↑</div>
      </div>
    </div>
  `;

  if (!document.getElementById("lock-msg-banner")) {
    const banner = document.createElement("div");
    banner.id = "lock-msg-banner";
banner.style.cssText = "position:absolute; top:50%; left:16px; right:16px; background:rgba(50,50,50,0.6); backdrop-filter:blur(25px); border-radius:20px; padding:14px 16px; display:flex; gap:12px; transform:scale(0.9); opacity:0; transition:all 0.4s; z-index:9999; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); pointer-events:none;";
    banner.innerHTML = `<div style="width:42px; height:42px; border-radius:8px; background:#8e8e93; display:flex; align-items:center; justify-content:center; font-size:20px; color:#fff;">👤</div><div style="flex:1; text-align:left;"><div style="font-size:14px; font-weight:600; color:#fff; display:flex; justify-content:space-between; align-items:center;"><span>${t.msg_title}</span><span style="font-size:12px; color:#aaa;">${t.tw_just_now}</span></div><div style="font-size:14px; color:#eee; margin-top:4px; line-height:1.3;"><b>${t.msg_boyfriend}</b>：${t.msg_1}</div></div>`;
    document.getElementById("phone").appendChild(banner);
    
    setTimeout(() => { 
      if(document.getElementById("lock").classList.contains("unlocked")) return;
      banner.style.transform = "scale(1)"; banner.style.opacity = "1"; 
      const dot = document.getElementById("app-msg-dot"); if(dot) dot.style.display = "block";
    }, 1000);
  }
}

let chatStep = 0;
let currentOptionStep = 0; 

function openMsgChat() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];
  
  document.getElementById("chatRoom").style.display = "flex";
  document.getElementById("msgPreview").style.color = "#c7c7cc"; 
  const banner = document.getElementById("lock-msg-banner"); if(banner) banner.style.opacity = "0";
  const dot = document.getElementById("app-msg-dot"); if(dot) dot.style.display = "none";

  if (chatStep === 0) {
    chatStep = 1;
    setTimeout(() => {
      addMsgBubble("them", t.msg_1, false);
      setTimeout(() => { 
        addMsgBubble("them", t.msg_2, false);
        currentOptionStep = 1; 
      }, 1000);
    }, 500);
  }
}

function closeMsgChat() { document.getElementById("chatRoom").style.display = "none"; }

function addMsgBubble(from, text, isRead) {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];
  
  const area = document.getElementById("chatArea");
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.justifyContent = from === "them" ? "flex-start" : "flex-end";
  row.style.alignItems = "flex-end";
  row.style.gap = "5px";
  
  if (from === "them") {
    const readStatus = isRead ? t.read : t.unread;
    const readColor = isRead ? "#8e8e93" : "#007aff";
    row.innerHTML = `
      <div style="background:#e5e5ea; color:#000; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>
      <div class="msg-status" style="font-size:11px; color:${readColor}; margin-bottom:4px;">${readStatus}</div>
    `;
  } else {
    row.innerHTML = `
      <div style="font-size:11px; color:#8e8e93; margin-bottom:4px;">${t.read}</div>
      <div style="background:#007aff; color:#fff; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>
    `;
  }
  area.appendChild(row);
  area.scrollTop = area.scrollHeight;
}

function triggerMsgOptions() {
  if (currentOptionStep === 0) return; 
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];

  const opts = document.getElementById("msgOptions");
  opts.style.display = "flex";
  opts.innerHTML = "";
  
  if (currentOptionStep === 1) {
    opts.innerHTML = `
      <button onclick="chooseMsg('${t.msg_opt1}', 2)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; cursor:pointer; text-align:left;">${t.msg_opt1}</button>
      <button onclick="chooseMsg('${t.msg_opt2}', 2)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; cursor:pointer; text-align:left;">${t.msg_opt2}</button>
    `;
  } else if (currentOptionStep === 2) {
    opts.innerHTML = `
      <button onclick="chooseMsg('${t.msg_opt3}', 3)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; cursor:pointer; text-align:left;">${t.msg_opt3}</button>
      <button onclick="chooseMsg('', 3)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; cursor:pointer; text-align:left;">${t.msg_opt4}</button>
    `;
  }
}

function chooseMsg(text, nextStep) {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];

  document.getElementById("msgOptions").style.display = "none"; 
  currentOptionStep = 0; 
  
  document.querySelectorAll(".msg-status").forEach(el => {
    el.textContent = t.read;
    el.style.color = "#8e8e93";
  });

  if (text !== "") addMsgBubble("me", text, true);
  
  if (nextStep === 2) {
    setTimeout(() => {
      addMsgBubble("them", t.msg_3, false);
      setTimeout(() => { currentOptionStep = 2; }, 1200);
    }, 1200);
  } else if (nextStep === 3) {
    setTimeout(() => {
      addMsgBubble("them", t.msg_4, false);
    }, 1200);
  }
}