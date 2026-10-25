function initMsgApp() {
  const container = document.getElementById("msgAppContent");
  if (container.innerHTML.trim() !== "") return;

  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];

    // 时间锁（增加了超时自动清理）
  let unlockTime = parseInt(localStorage.getItem('kyoongUnlockTime') || '0');
  let isKyoongUnlocked = false;
  
  if (unlockTime > 0) {
    if ((Date.now() - unlockTime < 3600000)) {
      isKyoongUnlocked = true;
    } else {
      localStorage.removeItem('kyoongUnlockTime');
    }
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%; background:#fff; color:#000;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span style="font-size:17px; font-weight:600;">${t.msg_title}</span>
      </div>
      
      <div id="msgList" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:12px;">
        
        <!-- 男朋友 -->
        <div id="chatItem" onclick="openMsgChat()" style="display:flex; gap:10px; align-items:center; cursor:pointer;">
          <div style="width:50px; height:50px; border-radius:50%; background:#8e8e93; display:flex; align-items:center; justify-content:center; font-size:24px; color:#fff;">👤</div>
          <div style="flex:1; border-bottom:1px solid #eee; padding-bottom:12px; margin-top:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:16px;">${t.msg_boyfriend}</span>
              <span style="font-size:13px; color:#8e8e93;">${t.tw_just_now}</span>
            </div>
            <div id="msgPreview" style="font-size:14px; color:#8e8e93; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">宝宝抱歉，临时要开会...</div>
          </div>
        </div>

        <!-- kyoong -->
        <div id="kyoongItem" onclick="openKyoongChat()" style="display:${isKyoongUnlocked ? 'flex' : 'none'}; gap:10px; align-items:center; cursor:pointer;">
          <img src="kyoong.jpg" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
          <div style="flex:1; border-bottom:1px solid #eee; padding-bottom:12px; margin-top:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; font-size:16px;">kyoong</span>
              <span style="font-size:13px; color:#8e8e93;">刚刚</span>
            </div>
            <div id="kyoongPreview" style="font-size:14px; color:#8e8e93; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">姐姐，醒了吗？</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 男朋友聊天室 -->
    <div id="chatRoom" style="display:none; position:absolute; inset:0; background:#fff; color:#000; flex-direction:column; z-index:100;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span onclick="closeMsgChat()" style="color:#007aff; font-size:16px; cursor:pointer;">‹ ${t.msg_title}</span>
        <span style="font-size:16px; font-weight:600;">${t.msg_boyfriend}</span>
        <span style="width:40px;"></span>
      </div>
      <div id="chatArea" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px;"></div>
      <div id="msgOptions" style="display:none; padding:10px 16px; background:#f2f2f7; border-top:1px solid #ddd; flex-direction:column; gap:6px;"></div>
      <div id="fakeInputBar" onclick="triggerMsgOptions()" style="padding:10px 16px 34px; background:#fff; border-top:1px solid #eee; align-items:center; gap:10px; display:flex; cursor:pointer;">
        <div style="flex:1; background:#f2f2f7; border-radius:20px; padding:10px 15px; color:#c7c7cc; font-size:15px;">iMessage</div>
      </div>
    </div>

    <!-- kyoong 聊天室 -->
    <div id="kyoongRoom" style="display:none; position:absolute; inset:0; background:#fff; color:#000; flex-direction:column; z-index:100;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span onclick="closeKyoongChat()" style="color:#007aff; font-size:16px; cursor:pointer;">‹ ${t.msg_title}</span>
        <div style="display:flex; flex-direction:column; align-items:center;">
          <img src="kyoong.jpg" style="width:30px; height:30px; border-radius:50%; object-fit:cover;">
          <span style="font-size:11px;">kyoong</span>
        </div>
        <span style="width:40px;"></span>
      </div>
      <div id="kyoongArea" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:10px;"></div>
      <div id="kyoongOptions" style="display:none; padding:10px 16px; background:#f2f2f7; border-top:1px solid #ddd; flex-direction:column; gap:6px;"></div>
      <div id="kyoongFakeInput" onclick="triggerKyoongOptions()" style="padding:10px 16px 34px; background:#fff; border-top:1px solid #eee; align-items:center; gap:10px; display:flex; cursor:pointer;">
        <div style="flex:1; background:#f2f2f7; border-radius:20px; padding:10px 15px; color:#c7c7cc; font-size:15px;">iMessage</div>
      </div>
    </div>
  `;

  if (!document.getElementById("lock-msg-banner")) {
    const banner = document.createElement("div");
    banner.id = "lock-msg-banner";
    banner.style.cssText = "position:absolute; top:50%; left:16px; right:16px; background:rgba(50,50,50,0.6); backdrop-filter:blur(25px); border-radius:20px; padding:14px 16px; display:flex; gap:12px; transform:scale(0.9); opacity:0; transition:all 0.4s; z-index:9999; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); pointer-events:none;";
    banner.innerHTML = `<div style="width:42px; height:42px; border-radius:8px; background:#8e8e93; display:flex; align-items:center; justify-content:center; font-size:20px; color:#fff;">👤</div><div style="flex:1; text-align:left;"><div style="font-size:14px; font-weight:600; color:#fff; display:flex; justify-content:space-between; align-items:center;"><span>信息</span><span style="font-size:12px; color:#aaa;">现在</span></div><div style="font-size:14px; color:#eee; margin-top:4px; line-height:1.3;"><b>${t.msg_boyfriend}</b>：宝宝抱歉，临时要开会...</div></div>`;
    document.getElementById("phone").appendChild(banner);
    
    setTimeout(() => { 
      if(document.getElementById("lock").classList.contains("unlocked")) return;
      banner.style.transform = "scale(1)"; banner.style.opacity = "1"; 
      const dot = document.getElementById("app-msg-dot"); if(dot) dot.style.display = "block";
    }, 1000);
  }
}

function triggerKyoongSMS() {
  localStorage.setItem('kyoongCleared', 'true');
  localStorage.setItem('kyoongUnlockTime', Date.now()); 
  const item = document.getElementById('kyoongItem'); if (item) item.style.display = 'flex';
  const dot = document.getElementById('app-msg-dot'); if(dot) dot.style.display = 'block';
  if (!document.getElementById("kyoong-banner")) {
    const banner = document.createElement("div");
    banner.id = "kyoong-banner";
    banner.style.cssText = "position:absolute; top:40px; left:16px; right:16px; background:rgba(50,50,50,0.6); backdrop-filter:blur(25px); border-radius:20px; padding:14px 16px; display:flex; gap:12px; transform:translateY(-150%); opacity:0; transition:all 0.4s; z-index:9999; border:1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); pointer-events:none;";
    banner.innerHTML = `<img src="kyoong.jpg" style="width:42px; height:42px; border-radius:8px; object-fit:cover;"><div style="flex:1; text-align:left;"><div style="font-size:14px; font-weight:600; color:#fff; display:flex; justify-content:space-between; align-items:center;"><span>信息</span><span style="font-size:12px; color:#aaa;">现在</span></div><div style="font-size:14px; color:#eee; margin-top:4px; line-height:1.3;"><b>kyoong</b>：姐姐，醒了吗？</div></div>`;
    document.getElementById("phone").appendChild(banner);
    setTimeout(() => { banner.style.transform = "translateY(0)"; banner.style.opacity = "1"; }, 100);
    setTimeout(() => { banner.style.transform = "translateY(-150%)"; banner.style.opacity = "0"; }, 5000);
  }
}

// ================= 男朋友聊天逻辑 =================
let msgStep = 0;

function openMsgChat() {
  document.getElementById("chatRoom").style.display = "flex";
  document.getElementById("msgPreview").style.color = "#c7c7cc";
  const banner = document.getElementById("lock-msg-banner"); if(banner) banner.style.opacity = "0";
  const dot = document.getElementById("app-msg-dot"); if(dot) dot.style.display = "none";

  const chatArea = document.getElementById("chatArea");
  if (chatArea.innerHTML.trim() === "") {
    addMsgBubble("them", "宝宝抱歉，临时要开会，今晚的约会去不了了。");
    msgStep = 1; 
  }
}

function closeMsgChat() { document.getElementById("chatRoom").style.display = "none"; }

// 👇 修复：彻底恢复男朋友聊天的已读/未读状态
function addMsgBubble(from, text) {
  const area = document.getElementById("chatArea");
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.justifyContent = from === "them" ? "flex-start" : "flex-end";
  row.style.alignItems = "flex-end";
  row.style.gap = "5px";
  
  if (from === "them") {
    row.innerHTML = `
      <div style="background:#e5e5ea; color:#000; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>
      <div class="msg-status" style="font-size:11px; color:#007aff; margin-bottom:4px;">未读</div>
    `;
  } else {
    row.innerHTML = `
      <div style="font-size:11px; color:#8e8e93; margin-bottom:4px;">已读</div>
      <div style="background:#007aff; color:#fff; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>
    `;
  }
  area.appendChild(row); 
  area.scrollTop = area.scrollHeight;
}

function triggerMsgOptions() {
  if (msgStep === 0) return; 
  
  // 点选项的瞬间，把之前的“未读”全变成“已读”
  document.querySelectorAll('.msg-status').forEach(el => { el.textContent = "已读"; el.style.color = "#8e8e93"; });
  
  const opts = document.getElementById("msgOptions"); 
  opts.style.display = "flex";
  opts.innerHTML = "";

  if (msgStep === 1) {
    opts.innerHTML = `
      <button onclick="chooseMsg('你每次都这么说，到底有没有把我放心上？', 2)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;">你每次都这么说，到底有没有把我放心上？</button>
      <button onclick="chooseMsg('随便吧。', 2)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;">随便吧。</button>
    `;
  } else if (msgStep === 2) {
    opts.innerHTML = `
      <button onclick="chooseMsg('那你忙吧，不用管我了。', 3)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;">那你忙吧，不用管我了。</button>
      <button onclick="chooseMsg('（已读不回）', 3)" style="padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;">（已读不回）</button>
    `;
  }
}

function chooseMsg(text, nextStep) {
  document.getElementById("msgOptions").style.display = "none";
  msgStep = 0; 
  
  if (text !== '（已读不回）') {
    addMsgBubble("me", text);
  }

  if (nextStep === 2) {
    setTimeout(() => { 
      addMsgBubble("them", "宝宝别闹了，领导在催了，我先去忙了。"); 
      msgStep = 2; 
    }, 1200);
  } else if (nextStep === 3) {
    setTimeout(() => { 
      addMsgBubble("them", "下次我一定补偿你，早点睡。"); 
    }, 1200);
  }
}

// ================= kyoong 逻辑 =================
function markKyoongAsRead() {
  document.querySelectorAll('.kyoong-msg-status').forEach(el => { el.textContent = "已读"; el.style.color = "#8e8e93"; });
  const preview = document.getElementById('kyoongPreview'); if(preview) preview.style.color = "#c7c7cc";
}
let kyoongOptionsState = 0; 

function openKyoongChat() {
  document.getElementById("kyoongRoom").style.display = "flex";
  markKyoongAsRead();
  const banner = document.getElementById("kyoong-banner"); if(banner) banner.style.opacity = "0";

  const area = document.getElementById("kyoongArea");
  if (area.innerHTML.trim() === "") {
    addKyoongBubble("them", "姐姐，醒了吗？");
    setTimeout(() => {
      addKyoongBubble("them", "明明才分开几个小时，可是我好想你哦。");
      setTimeout(() => {
        addKyoongBubble("them", "看样子没醒啊.....T T");
        setTimeout(() => {
          addKyoongBubble("them", "不过我真的好开心，姐姐你居然真的愿意见我。觉得我怎么样呢？没有让姐姐失望吧。");
          setTimeout(() => {
            addKyoongBubble("them", "还有就是......你昨晚一直在求我慢一点的时候，声音真的很好听呢~");
            kyoongOptionsState = 1;
            document.getElementById("kyoongFakeInput").style.display = "flex";
          }, 1500);
        }, 1500);
      }, 10000); 
    }, 1000);
  }
}
function closeKyoongChat() { document.getElementById("kyoongRoom").style.display = "none"; }

function addKyoongBubble(from, text) {
  const area = document.getElementById("kyoongArea");
  const row = document.createElement("div");
  row.style.display = "flex"; row.style.justifyContent = from === "them" ? "flex-start" : "flex-end"; row.style.alignItems = "flex-end"; row.style.gap = "5px";
  if (from === "them") {
    row.innerHTML = `<div style="background:#e5e5ea; color:#000; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div><div class="kyoong-msg-status" style="font-size:11px; color:#007aff; margin-bottom:4px;">未读</div>`;
  } else {
    row.innerHTML = `<div style="font-size:11px; color:#8e8e93; margin-bottom:4px;">已读</div><div style="background:#007aff; color:#fff; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>`;
  }
  area.appendChild(row); area.scrollTop = area.scrollHeight;
}

function triggerKyoongOptions() {
  if (kyoongOptionsState === 0) return;
  markKyoongAsRead();
  const opts = document.getElementById("kyoongOptions"); opts.style.display = "flex"; opts.innerHTML = "";

  if (kyoongOptionsState === 1) {
    kyoongOptionsState = 0;
    const btn = document.createElement("button");
    btn.textContent = "等一下....你怎么会有我的号码？？";
    btn.style.cssText = "padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;";
    btn.onclick = () => {
      opts.style.display = "none"; addKyoongBubble("me", btn.textContent);
      setTimeout(() => {
        addKyoongBubble("them", "姐姐你醒啦！");
        setTimeout(() => {
          addKyoongBubble("them", "我很贴心吧，在姐姐睡着了的时候就帮姐姐存好了我自己的号码。");
          setTimeout(() => {
            addKyoongBubble("them", "这样姐姐想我的时候就可以随时打给我了>_<");
            kyoongOptionsState = 2;
          }, 1500);
        }, 1500);
      }, 1500);
    };
    opts.appendChild(btn);
  } else if (kyoongOptionsState === 2) {
    kyoongOptionsState = 0;
    const btn = document.createElement("button");
    btn.textContent = "而且这个头像和备注又是什么情况？？？";
    btn.style.cssText = "padding:12px; border-radius:12px; border:1px solid #007aff; background:#fff; color:#007aff; font-size:14px; text-align:left;";
    btn.onclick = () => { opts.style.display = "none"; addKyoongBubble("me", btn.textContent); };
    opts.appendChild(btn);
  }
}