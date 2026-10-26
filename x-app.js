function initXApp() {
  const container = document.getElementById("xAppContent");
  if (container.innerHTML.trim() !== "") return;

  // 👇【新增1】每次打开推特，强制清空旧的点赞和聊天记录
  // 这样才能保证每次测试都是从“没点过赞”开始
  localStorage.removeItem('xLiked');
  localStorage.removeItem('xChatHistory');
  localStorage.removeItem('xChatFinished');
  localStorage.removeItem('kyoongUnlockTime');
  localStorage.removeItem('kyoongCleared');

  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];

  container.innerHTML = `
    <div id="x-tab-home" style="position:absolute; inset:0; background:#000; display:flex; flex-direction:column;">
      <div style="padding-top:44px; height:84px; display:flex; justify-content:center; align-items:center; border-bottom:1px solid #2f3336;">
        <svg viewBox="0 0 24 24" style="width:24px; height:24px; fill:#fff;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </div>
      <div style="flex:1; overflow-y:auto; padding-bottom:60px;">
        
        <!-- 刚刚发布的推文 -->
        <div style="border-bottom:1px solid #2f3336; padding:15px;">
          <div style="display:flex; gap:10px;">
            <img src="avatar.jpg" style="width:40px; height:40px; border-radius:50%; object-fit:cover; cursor:pointer;" onclick="switchXTab('baek')">
            <div style="flex:1;">
              <div style="font-size:15px; display:flex; gap:5px; align-items:center;">
                <span style="font-weight:bold; color:#fff; cursor:pointer;" onclick="switchXTab('baek')">${t.tw_baek}</span>
                <span style="color:#71767b;">@baekhyun · ${t.tw_just_now}</span>
              </div>
              <div style="margin-top:5px; font-size:15px;">${t.tw_tweet_text}</div>
              <div style="margin-top:10px; border-radius:16px; overflow:hidden; border:1px solid #333;">
                <img src="tweet.jpg" style="width:100%; display:block;">
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:12px; color:#71767b; font-size:13px; padding-right:15px;">
                <span style="cursor:pointer;">💬 3.46万</span>
                <span style="cursor:pointer;">🔁 2.35万</span>
                <!-- 手动点赞按钮 -->
                <span id="like-btn-home" style="cursor:pointer; transition: color 0.2s;" onclick="triggerLike(this, '8.65万', true)">🤍 8.65万</span>
                <span style="cursor:pointer;">📊 18.3万</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div id="x-tab-notify" style="display:none; position:absolute; inset:0; background:#000; flex-direction:column;">
      <div style="padding-top:44px; height:84px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; border-bottom:1px solid #2f3336;">${t.tw_notify}</div>
      <div id="notify-content" style="flex:1; overflow-y:auto; padding-bottom:60px;"></div>
    </div>

    <div id="x-tab-msg" style="display:none; position:absolute; inset:0; background:#000; flex-direction:column;">
      <div style="padding-top:44px; height:84px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; border-bottom:1px solid #2f3336;">${t.tw_msg}</div>
      <div id="msg-list-content" style="flex:1; overflow-y:auto; padding-bottom:60px;"></div>
    </div>

    <!-- 边伯贤主页 -->
    <div id="x-tab-baek" style="display:none; position:absolute; inset:0; background:#000; flex-direction:column; overflow-y:auto; padding-bottom:60px;">
      <div style="padding-top:44px; padding:10px 16px; display:flex; align-items:center; gap:20px; position:sticky; top:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:10;">
        <span style="font-size:24px; cursor:pointer; color:#fff;" onclick="switchXTab('home')">←</span>
        <div style="font-weight:bold; font-size:18px; color:#fff;">${t.tw_baek}</div>
      </div>
      
      <div style="position:relative; width:100%; height:150px; flex-shrink:0; background-color:#333;">
        <img src="bg.jpg" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;" onerror="this.style.display='none'">
      </div>
      <div style="padding: 0 15px; position:relative; margin-top:-40px;">
        <img src="avatar.jpg" style="width:80px; height:80px; border-radius:50%; border:4px solid #000; background:#222; object-fit:cover; position:relative; z-index:5;">
        <button onclick="openXChat()" style="position:absolute; right:15px; top:5px; background:#fff; color:#000; border:none; border-radius:20px; padding:8px 16px; font-weight:bold; font-size:14px; cursor:pointer; z-index:6;">${t.tw_msg}</button>
        <div style="margin-top:12px;">
          <div style="font-size:20px; font-weight:bold; color:#fff;">${t.tw_baek}</div>
          <div style="color:#71767b; font-size:15px;">@baekhyun</div>
        </div>
      </div>

      <!-- 刚刚 (Sit down) -->
      <div style="border-bottom:1px solid #2f3336; padding:15px; margin-top:10px;">
        <div style="display:flex; gap:10px;">
          <img src="avatar.jpg" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
          <div style="flex:1;">
            <div style="font-size:15px; color:#fff;"><b>${t.tw_baek}</b> <span style="color:#71767b;">· ${t.tw_just_now}</span></div>
            <div style="margin-top:5px; font-size:15px; color:#fff;">${t.tw_tweet_text}</div>
            <div style="margin-top:10px; border-radius:16px; overflow:hidden; border:1px solid #333;">
              <img src="tweet.jpg" style="width:100%; display:block;">
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:12px; color:#71767b; font-size:13px; padding-right:15px;">
              <span>💬 3.46万</span><span>🔁 2.35万</span>
              <span id="like-btn-baek" style="cursor:pointer;" onclick="triggerLike(this, '8.65万', true)">🤍 8.65万</span>
              <span>📊 18.3万</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 10月10日 (Black Dream) -->
      <div style="border-bottom:1px solid #2f3336; padding:15px;">
        <div style="display:flex; gap:10px;">
          <img src="avatar.jpg" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
          <div style="flex:1;">
            <div style="font-size:15px; color:#fff;"><b>${t.tw_baek}</b> <span style="color:#71767b;">· 10月10日</span></div>
            <div style="margin-top:5px; font-size:15px; color:#fff;">Black Dream🤫</div>
            <div style="margin-top:10px; border-radius:16px; overflow:hidden; border:1px solid #333;">
              <img src="baek_black.jpg" style="width:100%; display:block;" onerror="this.style.display='none'">
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:12px; color:#71767b; font-size:13px; padding-right:15px;">
              <span>💬 2.1万</span><span>🔁 1.68万</span>
              <span style="cursor:pointer;" onclick="triggerLike(this, '6.49万', false)">🤍 6.49万</span>
              <span>📊 14.5万</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 10月18日 (出差✈️) -->
      <div style="border-bottom:1px solid #2f3336; padding:15px;">
        <div style="display:flex; gap:10px;">
          <img src="avatar.jpg" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
          <div style="flex:1;">
            <div style="font-size:15px; color:#fff;"><b>${t.tw_baek}</b> <span style="color:#71767b;">· 10月18日</span></div>
            <div style="margin-top:5px; font-size:15px; color:#fff;">出差✈️</div>
            <div style="margin-top:10px; border-radius:16px; overflow:hidden; border:1px solid #333;">
              <img src="baek_plane.jpg" style="width:100%; display:block;" onerror="this.style.display='none'">
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:12px; color:#71767b; font-size:13px; padding-right:15px;">
              <span>💬 1,204</span><span>🔁 3,186</span>
              <span style="cursor:pointer;" onclick="triggerLike(this, '9,403', false)">🤍 9,403</span>
              <span>📊 16.9万</span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div id="x-tab-profile" style="display:none; position:absolute; inset:0; background:#000; flex-direction:column; overflow-y:auto; padding-bottom:60px;">
      <div style="padding-top:44px; height:84px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:bold; border-bottom:1px solid #2f3336;">${t.tw_profile}</div>
      <div style="height:150px; background:#333; position:relative; cursor:pointer;" onclick="document.getElementById('upload-bg').click()">
        <img id="user-bg-img" style="width:100%; height:100%; object-fit:cover; display:none;">
        <div id="user-bg-placeholder" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #1c1c1e, #3a3a3c); color:#888; font-size:12px;">点击上传背景</div>
        <input type="file" id="upload-bg" accept="image/*" style="display:none;" onchange="uploadUserImg(this, 'user-bg-img', 'user-bg-placeholder')">
      </div>
      <div style="padding: 0 15px; margin-top:-40px; position:relative;">
        <div style="width:80px; height:80px; border-radius:50%; border:4px solid #000; background:#1d9bf0; display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:bold; color:#fff; position:relative; z-index:10; cursor:pointer;" onclick="document.getElementById('upload-avatar').click()">
          <img id="user-avatar-img" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:none;">
          <div id="user-avatar-placeholder">👤</div>
          <input type="file" id="upload-avatar" accept="image/*" style="display:none;" onchange="uploadUserImg(this, 'user-avatar-img', 'user-avatar-placeholder')">
        </div>
        <div style="margin-top:10px;">
          <div style="font-size:20px; font-weight:bold; outline:none; color:#fff;" contenteditable="true">你的名字</div>
          <div style="color:#71767b; font-size:15px; outline:none; margin-top:4px;" contenteditable="true">@my_account</div>
        </div>
        <div style="margin-top:15px; font-size:15px; outline:none; min-height:20px; color:#fff;" contenteditable="true">点击这里编辑你的简介...</div>
      </div>
    </div>

    <div style="position:absolute; bottom:0; left:0; right:0; height:54px; background:#000; border-top:1px solid #2f3336; display:flex; justify-content:space-around; align-items:center; padding-bottom:6px; z-index:100;">
      <svg id="nav-home" class="active" onclick="switchXTab('home')" viewBox="0 0 24 24" style="width:26px; height:26px; fill:#fff; cursor:pointer;"><path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/></svg>
      <svg id="nav-search" viewBox="0 0 24 24" style="width:26px; height:26px; fill:#71767b; cursor:pointer;"><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"/></svg>
      <div style="position:relative; display:flex; align-items:center; justify-content:center;">
        <svg id="nav-notify" onclick="switchXTab('notify')" viewBox="0 0 24 24" style="width:26px; height:26px; fill:#71767b; cursor:pointer;"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        <div id="notify-dot" style="position:absolute; top:-2px; right:-4px; width:8px; height:8px; background:#f91880; border-radius:50%; display:none;"></div>
      </div>
      <div style="position:relative; display:flex; align-items:center; justify-content:center;">
        <svg id="nav-msg" onclick="switchXTab('msg')" viewBox="0 0 24 24" style="width:26px; height:26px; fill:#71767b; cursor:pointer;"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/></svg>
        <div id="msg-dot" style="position:absolute; top:-2px; right:-4px; width:8px; height:8px; background:#f91880; border-radius:50%; display:none;"></div>
      </div>
      <svg id="nav-profile" onclick="switchXTab('profile')" viewBox="0 0 24 24" style="width:26px; height:26px; fill:#71767b; cursor:pointer;"><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"/></svg>
    </div>

    <div id="x-chatroom" style="position:absolute; inset:0; background:#000; z-index:1000; display:none; flex-direction:column;">
      <div style="padding: 48px 16px 10px; display:flex; align-items:center; gap:15px; border-bottom:1px solid #2f3336;">
        <span style="font-size:20px; cursor:pointer; color:#fff;" onclick="closeXChat()">←</span><img src="avatar.jpg" style="width:32px; height:32px; border-radius:50%; object-fit:cover;"><div style="font-weight:bold; font-size:16px;">${t.tw_baek}</div>
      </div>
      <div id="xChatArea" style="flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:12px;"></div>
      <div id="xInputFake" style="padding:10px 16px 30px; background:#000; border-top:1px solid #2f3336;">
        <div id="xInputText" style="background:#202327; color:#71767b; border-radius:20px; padding:10px 16px; font-size:15px; cursor:default; opacity:0.5;">${t.tw_msg}...</div>
      </div>
      <div id="xChoices" style="display:none; flex-direction:column; gap:6px; padding:10px 16px 30px; background:#000;"></div>
    </div>
  `;
}

function switchXTab(tabId) {
  document.getElementById('x-tab-home').style.display = 'none';
  document.getElementById('x-tab-notify').style.display = 'none';
  document.getElementById('x-tab-msg').style.display = 'none';
  document.getElementById('x-tab-baek').style.display = 'none';
  document.getElementById('x-tab-profile').style.display = 'none';
  
  const target = document.getElementById('x-tab-' + tabId);
  if(target) target.style.display = 'flex';

  document.querySelectorAll('svg[id^="nav-"]').forEach(el => el.style.fill = '#71767b');
  if(tabId === 'baek') document.getElementById('nav-home').style.fill = '#fff';
  else { const nav = document.getElementById('nav-' + tabId); if(nav) nav.style.fill = '#fff'; }

  if(tabId === 'notify') document.getElementById('notify-dot').style.display = 'none';
  if(tabId === 'msg') document.getElementById('msg-dot').style.display = 'none';
}

function uploadUserImg(input, imgId, placeholderId) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById(placeholderId === 'user-bg-placeholder' ? 'user-bg-img' : 'user-avatar-img');
      img.src = e.target.result; img.style.display = 'block'; document.getElementById(placeholderId).style.display = 'none';
      localStorage.setItem(placeholderId === 'user-bg-placeholder' ? 'userBg' : 'userAvatar', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function triggerLike(element, originalCount, isMainTweet) {
  if (element.classList.contains("liked")) return;
  element.classList.add("liked"); element.innerHTML = `❤️ ${originalCount}`; element.style.color = "#f91880";
  
  if (isMainTweet && !window.hasLiked) {
    window.hasLiked = true;
    const btnBaek = document.getElementById('like-btn-baek'); if(btnBaek) { btnBaek.innerHTML = `❤️ 8.65万`; btnBaek.style.color = "#f91880"; }
    const btnHome = document.getElementById('like-btn-home'); if(btnHome) { btnHome.innerHTML = `❤️ 8.65万`; btnHome.style.color = "#f91880"; }
    
    let lang = localStorage.getItem('sysLang') || 'zh-CN';
    const t = window.trans[lang] || window.trans['zh-CN'];

    setTimeout(() => {
      document.getElementById('notify-content').innerHTML = `<div style="padding:16px; border-bottom:1px solid #2f3336; display:flex; gap:10px;"><img src="avatar.jpg" style="width:40px; height:40px; border-radius:50%;"><div><div><b>${t.tw_baek}</b> ${t.tw_follow}</div><div style="color:#71767b; font-size:13px; margin-top:5px;">${t.tw_just_now}</div></div></div>`;
      document.getElementById('notify-dot').style.display = 'block';
      
      setTimeout(() => {
        document.getElementById('msg-list-content').innerHTML = `<div onclick="openXChat()" style="padding:16px; border-bottom:1px solid #2f3336; display:flex; gap:10px; align-items:center; cursor:pointer;"><img src="avatar.jpg" style="width:50px; height:50px; border-radius:50%; object-fit:cover;"><div style="flex:1;"><div style="display:flex; justify-content:space-between;"><span style="font-weight:bold;">${t.tw_baek}</span><span style="color:#71767b; font-size:13px;">${t.tw_just_now}</span></div><div style="color:#71767b; font-size:14px; margin-top:2px;">${t.tw_1}</div></div></div>`;
        document.getElementById('msg-dot').style.display = 'block';
      }, 800);
    }, 400);
  }
}

let xChatStarted = false;
function openXChat() {
  document.getElementById('x-chatroom').style.display = 'flex';
  if(!xChatStarted) { xChatStarted = true; startXChat(); }
}

function closeXChat() { document.getElementById('x-chatroom').style.display = 'none'; }

function startXChat() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  const area = document.getElementById("xChatArea"); area.innerHTML = "";
  const inputBox = document.getElementById("xInputText"); inputBox.style.opacity = "0.5"; inputBox.style.cursor = "default"; inputBox.onclick = null;
  
  addXBubble("them", t.tw_1, false);
  setTimeout(() => {
    const unreadMeta = document.getElementById("last-meta");
    if(unreadMeta) unreadMeta.innerHTML = `${t.tw_just_now} · <span style="color:#71767b;">${t.read}</span>`;
    setTimeout(() => {
      addXBubble("them", t.tw_2, false);
      setTimeout(() => { addXBubble("them", t.tw_3, true); }, 1500);
    }, 1500);
  }, 2000);
}

function addXBubble(from, text, showChoices) {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  const area = document.getElementById("xChatArea");
  const row = document.createElement("div");
  row.style.display = "flex"; row.style.gap = "10px"; row.style.maxWidth = "85%"; row.style.alignItems = "flex-end";
  row.style.alignSelf = from === "them" ? "flex-start" : "flex-end"; row.style.flexDirection = from === "them" ? "row" : "row-reverse";
  const timeText = from === "them" ? `${t.tw_just_now} · <span style='color:#71767b;'>${t.unread}</span>` : `${t.tw_just_now} · ${t.read}`;
  row.innerHTML = `<div><div style="padding:12px 16px; border-radius:20px; font-size:15px; line-height:1.4; background:${from === 'them' ? '#2f3336' : '#1d9bf0'}; color:#fff; border-bottom-${from === 'them' ? 'left' : 'right'}-radius:4px;">${text}</div><div ${from === "them" ? 'id="last-meta"' : ''} style="font-size:11px; color:#71767b; display:flex; justify-content:${from === 'them' ? 'flex-start' : 'flex-end'}; margin-top:4px; gap:4px;">${timeText}</div></div>`;
  area.appendChild(row); area.scrollTop = area.scrollHeight;
  
  if (showChoices) {
    setTimeout(() => {
      const inputBox = document.getElementById("xInputText");
      inputBox.style.opacity = "1"; inputBox.style.cursor = "pointer"; inputBox.onclick = showXChoices;
    }, 500);
  }
}

function showXChoices() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  const inputBox = document.getElementById("xInputText");
  if(inputBox.onclick === null) return; 
  inputBox.onclick = null; inputBox.style.opacity = "0.3"; inputBox.textContent = ""; inputBox.style.cursor = "default";
  const choicesDiv = document.getElementById("xChoices"); choicesDiv.style.display = "flex"; choicesDiv.innerHTML = "";
  const options = [ { text: t.tw_opt1, reply: t.tw_rep1 }, { text: t.tw_opt2, reply: t.tw_rep2 } ];
  
  options.forEach(opt => {
    const btn = document.createElement("button"); btn.textContent = opt.text;
    btn.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer;";
    btn.onclick = () => {
      choicesDiv.style.display = "none"; addXBubble("me", opt.text, false);
      setTimeout(() => {
        addXBubble("them", opt.reply, false);
        if (opt.text === t.tw_opt1) {
          setTimeout(() => { addXBubble("them", t.tw_meet1, false); setTimeout(() => { showCounterAttack(); }, 2000); }, 2000);
        } else {
          setTimeout(() => { addXBubble("them", t.tw_rep2, false); setTimeout(() => { showSubChoices(); }, 1500); }, 2000);
        }
      }, 1500);
    };
    choicesDiv.appendChild(btn);
  });
}

function showSubChoices() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  document.getElementById("xInputText").style.opacity = "1"; document.getElementById("xInputText").style.cursor = "pointer";
  document.getElementById("xInputText").onclick = () => {
    document.getElementById("xInputText").onclick = null; document.getElementById("xInputText").style.opacity = "0.3"; document.getElementById("xInputText").textContent = "";
    const choicesDiv = document.getElementById("xChoices"); choicesDiv.style.display = "flex"; choicesDiv.innerHTML = "";
    const opts = [ { text: t.tw_opt3, reply: t.tw_rep3 }, { text: t.tw_opt4, reply: t.tw_rep4 } ];
    opts.forEach(o => {
      const btn = document.createElement("button"); btn.textContent = o.text;
      btn.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer;";
      btn.onclick = () => {
        choicesDiv.style.display = "none"; addXBubble("me", o.text, false);
        setTimeout(() => { addXBubble("them", o.reply, false); setTimeout(() => { addXBubble("them", t.tw_meet2, false); showCounterAttack(); }, 2000); }, 1500);
      };
      choicesDiv.appendChild(btn);
    });
  };
}

function showCounterAttack() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  const inputBox = document.getElementById("xInputText");
  inputBox.style.opacity = "1"; inputBox.style.cursor = "pointer";
  inputBox.onclick = () => {
    inputBox.onclick = null; inputBox.style.opacity = "0.3"; inputBox.textContent = "";
    const choicesDiv = document.getElementById("xChoices"); choicesDiv.style.display = "flex"; choicesDiv.innerHTML = "";
    const btn = document.createElement("button"); btn.textContent = t.tw_def;
    btn.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer;";
    btn.onclick = () => {
      choicesDiv.style.display = "none"; addXBubble("me", btn.textContent, false);
      setTimeout(() => {
        addXBubble("them", t.tw_final1, false);
        setTimeout(() => { addXBubble("them", t.tw_final2, false); setTimeout(() => { showFinalChoices(); }, 2000); }, 2000);
      }, 1500);
    };
    choicesDiv.appendChild(btn);
  };
}

function showFinalChoices() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];
  const inputBox = document.getElementById("xInputText");
  inputBox.style.opacity = "1"; inputBox.style.cursor = "pointer";
  inputBox.onclick = () => {
    inputBox.onclick = null; inputBox.style.opacity = "0.3"; inputBox.textContent = "";
    const choicesDiv = document.getElementById("xChoices"); choicesDiv.style.display = "flex"; choicesDiv.innerHTML = "";
    
    const btn1 = document.createElement("button"); btn1.textContent = t.tw_f_opt1;
    btn1.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer; margin-bottom:5px;";
    btn1.onclick = () => {
      choicesDiv.style.display = "none"; addXBubble("me", btn1.textContent, false);
      setTimeout(() => {
        addXBubble("them", t.tw_f_rep1, false);
        setTimeout(() => {
          addXBubble("them", t.tw_f_rep2, false);
          setTimeout(() => {
            addXBubble("them", t.tw_f_rep3, false);
            localStorage.setItem('kyoongUnlockTime', Date.now());
            localStorage.removeItem('kyoongCleared');
            setTimeout(() => { if(typeof triggerKyoongSMS === 'function') triggerKyoongSMS(); }, 10000);
          }, 2000);
        }, 2000);
      }, 1500);
    };
    
    const btn2 = document.createElement("button"); btn2.textContent = t.tw_f_opt2;
    btn2.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer;";
    btn2.onclick = () => {
      choicesDiv.style.display = "none"; addXBubble("me", btn2.textContent, false);
      setTimeout(() => {
        addXBubble("them", t.tw_f_rep4, false);
        setTimeout(() => {
          addXBubble("them", t.tw_f_rep5, false);
          setTimeout(() => {
            const choicesDiv2 = document.getElementById("xChoices");
            choicesDiv2.style.display = "flex"; choicesDiv2.innerHTML = "";
            const btn3 = document.createElement("button"); btn3.textContent = t.tw_f_opt3;
            btn3.style.cssText = "background:#1d9bf0; color:#fff; border:none; border-radius:20px; padding:10px 16px; text-align:left; font-size:14px; cursor:pointer;";
            btn3.onclick = () => {
              choicesDiv2.style.display = "none"; addXBubble("me", btn3.textContent, false);
              setTimeout(() => {
                addXBubble("them", t.tw_f_rep1, false);
                setTimeout(() => {
                  addXBubble("them", t.tw_f_rep2, false);
                  setTimeout(() => {
                    addXBubble("them", t.tw_f_rep3, false);
                    localStorage.setItem('kyoongUnlockTime', Date.now());
                    localStorage.removeItem('kyoongCleared');
                    setTimeout(() => { if(typeof triggerKyoongSMS === 'function') triggerKyoongSMS(); }, 10000);
                  }, 2000);
                }, 2000);
              }, 1500);
            };
            choicesDiv2.appendChild(btn3);
          }, 1500);
        }, 1500);
      }, 1500);
    };
    choicesDiv.appendChild(btn1);
    choicesDiv.appendChild(btn2);
  };
}