function initMsgApp() {
  const container = document.getElementById("msgAppContent");
  if (container.innerHTML.trim() !== "") return;

  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang] || window.trans['zh-CN'];

  // 只有当前存档确实进入第二天后才显示 kyoong，避免新存档沿用旧的解锁标记。
  const isKyoongUnlocked = localStorage.getItem('kyoongCleared') === 'true'
    && (parseInt(localStorage.getItem('gameDay') || '1', 10) >= 2)
    && localStorage.getItem('dayOneFinished') === 'true';

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%; background:#fff; color:#000;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee;">
        <span onclick="document.querySelectorAll('.app-page').forEach(s=>s.classList.remove('active'))" style="color:#007aff; font-size:16px; cursor:pointer; display:flex; align-items:center;">
          ‹ 桌面
        </span>
        <span style="font-size:17px; font-weight:600; position:absolute; left:50%; transform:translateX(-50%);">${t.msg_title}</span>
        <span style="width:40px;"></span>
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
      <!-- 隐形回桌面热区 -->
      <div onclick="document.querySelectorAll('.app-page').forEach(s=>s.classList.remove('active'))" style="position:absolute; bottom:0; left:0; right:0; height:30px; z-index:99999; cursor:pointer;"></div>
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
      <!-- 隐形回桌面热区 -->
      <div onclick="document.querySelectorAll('.app-page').forEach(s=>s.classList.remove('active'))" style="position:absolute; bottom:0; left:0; right:0; height:30px; z-index:99999; cursor:pointer;"></div>
    </div>
  `;

  // 恢复上次离开时的聊天现场和剧情步骤，刷新后不从头重播。
  const savedBoyfriendChat = localStorage.getItem('storyChat_boyfriend');
  const savedBaekChat = localStorage.getItem('storyChat_baek');
  const savedMsgStep = localStorage.getItem('storyStep_boyfriend');
  const savedKyoongStep = localStorage.getItem('storyStep_baek');
  if (savedBoyfriendChat) document.getElementById('chatArea').innerHTML = savedBoyfriendChat;
  if (savedBaekChat) document.getElementById('kyoongArea').innerHTML = savedBaekChat;
  if (savedMsgStep !== null) msgStep = parseInt(savedMsgStep, 10) || 0;
  if (savedKyoongStep !== null) kyoongStep = parseInt(savedKyoongStep, 10) || 0;
  if (!window.storyProgressSaveTimer) {
    window.storyProgressSaveTimer = setInterval(() => {
      const boyfriendArea = document.getElementById('chatArea');
      const baekArea = document.getElementById('kyoongArea');
      if (boyfriendArea) localStorage.setItem('storyChat_boyfriend', boyfriendArea.innerHTML);
      if (baekArea) localStorage.setItem('storyChat_baek', baekArea.innerHTML);
      localStorage.setItem('storyStep_boyfriend', String(msgStep || 0));
      localStorage.setItem('storyStep_baek', String(kyoongStep || 0));
    }, 500);
  }

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

function saveStoryProgressNow() {
  const boyfriendArea = document.getElementById('chatArea'), baekArea = document.getElementById('kyoongArea');
  if (boyfriendArea) localStorage.setItem('storyChat_boyfriend', boyfriendArea.innerHTML);
  if (baekArea) localStorage.setItem('storyChat_baek', baekArea.innerHTML);
  if (typeof msgStep !== 'undefined') localStorage.setItem('storyStep_boyfriend', String(msgStep || 0));
  if (typeof kyoongStep !== 'undefined') localStorage.setItem('storyStep_baek', String(kyoongStep || 0));
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
  document.getElementById('chatRoom').style.display = 'flex';
  document.getElementById('msgPreview').style.color = '#c7c7cc';
  const banner = document.getElementById('lock-msg-banner'); if (banner) banner.style.opacity = '0';
  const dot = document.getElementById('app-msg-dot'); if (dot) dot.style.display = 'none';
  const area = document.getElementById('chatArea');
  // 只有玩家主动点进男朋友聊天框，才把第二天的七条完整邀约放进聊天记录。
  if (localStorage.getItem('dayTwoBoyfriendNoticeSent') === 'true' && localStorage.getItem('dayTwoBoyfriendChatOpened') !== 'true') {
    localStorage.setItem('dayTwoBoyfriendChatOpened', 'true'); area.innerHTML = '';
    ['宝宝，今天下午有空吗？','昨天是我不好，不应该把你一个人晾在那里。','这几天一直忙着自己的事，都没怎么好好陪你。','所以今天下午留给我，好不好？','带你去吃你之前收藏了很久的那家餐厅，吃完再陪你逛街。上次你看中的东西不是还没买吗？这次不许再说不要了。','就当是我给你赔罪。','宝宝，给我一个机会，好不好？'].forEach(line => addMsgBubble('them', line));
    localStorage.setItem('dayTwoBoyfriendChatFinished', 'true');
    if (typeof showDayTwoBaekNotification === 'function') setTimeout(showDayTwoBaekNotification, 650);
  } else if (area.innerHTML.trim() === '') {
    addMsgBubble('them', '宝宝抱歉，临时要开会，今晚的约会去不了了。'); msgStep = 1;
  }
  if (localStorage.getItem('dayTwoBaekNoticeSent') === 'true') renderDayTwoBoyfriendChoices();
  saveStoryProgressNow();
}
function closeMsgChat() { document.getElementById("chatRoom").style.display = "none"; }

function addMsgBubble(from, text) {
  const area = document.getElementById("chatArea");
  const row = document.createElement("div");
  row.style.display = "flex"; row.style.justifyContent = from === "them" ? "flex-start" : "flex-end"; row.style.alignItems = "flex-end"; row.style.gap = "5px";
  if (from === "them") {
    row.innerHTML = `<div style="background:#e5e5ea; color:#000; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div><div class="msg-status" style="font-size:11px; color:#007aff; margin-bottom:4px;">未读</div>`;
  } else {
    row.innerHTML = `<div style="font-size:11px; color:#8e8e93; margin-bottom:4px;">已读</div><div style="background:#007aff; color:#fff; padding:10px 14px; border-radius:18px; font-size:15px; max-width:75%; line-height:1.4;">${text}</div>`;
  }
  area.appendChild(row); area.scrollTop = area.scrollHeight; if (typeof saveStoryProgressNow === 'function') saveStoryProgressNow();
}

function triggerMsgOptions() {
  if (msgStep === 0) return; 
  document.querySelectorAll('.msg-status').forEach(el => { el.textContent = "已读"; el.style.color = "#8e8e93"; });
  const opts = document.getElementById("msgOptions"); opts.style.display = "flex"; opts.innerHTML = "";

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
  if (text !== '（已读不回）') addMsgBubble("me", text);
  if (nextStep === 2) {
    setTimeout(() => { addMsgBubble("them", "宝宝别闹了，领导在催了，我先去忙了。"); msgStep = 2; }, 1200);
  } else if (nextStep === 3) {
    setTimeout(() => { addMsgBubble("them", "下次我一定补偿你，早点睡。"); }, 1200);
  }
}

// ================= kyoong 逻辑 =================
function markKyoongAsRead() {
  document.querySelectorAll('.kyoong-msg-status').forEach(el => { el.textContent = '已读'; el.style.color = '#8e8e93'; });
  const preview = document.getElementById('kyoongPreview'); if (preview) preview.style.color = '#c7c7cc';
}
let kyoongStep = 0;
function openKyoongChat() {
  document.getElementById('kyoongRoom').style.display = 'flex'; markKyoongAsRead();
  const banner = document.getElementById('kyoong-banner'); if (banner) banner.style.opacity = '0';
  const area = document.getElementById('kyoongArea');
  if (area.innerHTML.trim() === '') {
    addKyoongBubble('them', '姐姐，醒了吗？');
    setTimeout(() => addKyoongBubble('them', '明明才分开几个小时，可是我好想你哦。'), 1000);
    setTimeout(() => addKyoongBubble('them', '看样子没醒啊.....T T'), 11000);
    setTimeout(() => addKyoongBubble('them', '不过我真的好开心，姐姐你居然真的愿意见我。觉得我怎么样呢？没有让姐姐失望吧。'), 12500);
    setTimeout(() => { addKyoongBubble('them', '还有就是......你昨晚一直在求我慢一点的时候，声音真的很好听呢~'); kyoongStep = 1; }, 14000);
  }
}
function closeKyoongChat() { document.getElementById('kyoongRoom').style.display = 'none'; }
function addKyoongBubble(from, text) {
  const area = document.getElementById('kyoongArea'); const row = document.createElement('div');
  row.style.display = 'flex'; row.style.justifyContent = from === 'them' ? 'flex-start' : 'flex-end'; row.style.alignItems = 'flex-end'; row.style.gap = '5px';
  if (from === 'them') row.innerHTML = `<div style="background:#e5e5ea;color:#000;padding:10px 14px;border-radius:18px;font-size:15px;max-width:75%;line-height:1.4;">${text}</div><div class="kyoong-msg-status" style="font-size:11px;color:#007aff;margin-bottom:4px;">未读</div>`;
  else row.innerHTML = `<div style="font-size:11px;color:#8e8e93;margin-bottom:4px;">已读</div><div style="background:#007aff;color:#fff;padding:10px 14px;border-radius:18px;font-size:15px;max-width:75%;line-height:1.4;">${text}</div>`;
  area.appendChild(row); area.scrollTop = area.scrollHeight;
}
function triggerKyoongOptions() {
  if (!kyoongStep) return; markKyoongAsRead();
  const opts = document.getElementById('kyoongOptions'); opts.style.display = 'flex'; opts.innerHTML = '';
  const addChoice = (label, handler) => { const btn = document.createElement('button'); btn.textContent = label; btn.style.cssText = 'padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;'; btn.onclick = () => { opts.style.display = 'none'; handler(); }; opts.appendChild(btn); };
  if (kyoongStep === 1) addChoice('等一下....你怎么会有我的号码？？', () => {
    addKyoongBubble('me', '等一下....你怎么会有我的号码？？');
    setTimeout(() => addKyoongBubble('them', '姐姐你醒啦！'), 900);
    setTimeout(() => addKyoongBubble('them', '我很贴心吧，在姐姐睡着了的时候就帮姐姐存好了我自己的号码。'), 1800);
    setTimeout(() => { addKyoongBubble('them', '这样姐姐想我的时候就可以随时打给我了>_<'); kyoongStep = 2; }, 2700);
  });
  else if (kyoongStep === 2) addChoice('而且这个头像和备注是什么情况？？？', () => { addKyoongBubble('me', '而且这个头像和备注是什么情况？？？'); setTimeout(() => { addKyoongBubble('them', '这么明显吗？'); kyoongStep = 3; }, 900); });
  else if (kyoongStep === 3) addChoice('你觉得呢？', () => { addKyoongBubble('me', '你觉得呢？'); setTimeout(() => addKyoongBubble('them', '姐姐不是已经看到了吗。'), 900); setTimeout(() => { addKyoongBubble('them', '还要我亲口承认呀？'); kyoongStep = 4; }, 1800); });
  else if (kyoongStep === 4) addChoice('边伯贤，你能不能好好说话。', () => { addKyoongBubble('me', '边伯贤，你能不能好好说话。'); setTimeout(() => addKyoongBubble('them', '好嘛～'), 900); setTimeout(() => addKyoongBubble('them', '那姐姐呢？'), 1800); setTimeout(() => { addKyoongBubble('them', '你打算怎么处理我们之间的事？'); kyoongStep = 5; }, 2700); });
  else if (kyoongStep === 5) {
    addChoice('我觉得我们还是不要再联系了。昨天的事，就当作没发生过吧。', () => {
      addKyoongBubble('me', '我觉得我们还是不要再联系了。昨天的事，就当作没发生过吧。');
      const replies = ['我知道了姐姐。', '对不起，是我不该这样逾越。', '是我太贪心了。', '我不会再打扰你了，姐姐。', '祝你幸福。'];
      replies.forEach((line, i) => setTimeout(() => { addKyoongBubble('them', line); if (i === replies.length - 1) setTimeout(showKyoongEnding, 700); }, 1000 * (i + 1))); kyoongStep = 0;
    });
    addChoice('其实……我想了很久。', () => {
      addKyoongBubble('me', '其实……我想了很久。');
      kyoongStep = 6;
    });
  } else if (kyoongStep >= 6 && kyoongStep <= 11) {
    const heroineLines = {
      6: '从答应和你见面的那一刻起，我就一直在想这件事。',
      7: '我知道自己有男朋友，昨天答应见面的时候，也知道这意味着什么。',
      8: '但是我现在想好了。',
      9: '如果你不介意的话，我们以后还可以像昨天那样见面吗？',
      10: '我没办法和你谈恋爱，这个很抱歉。',
      11: '只是……如果你也愿意的话，我们可以暂时维持现在这样的关系。'
    };
    const line = heroineLines[kyoongStep];
    addChoice(line, () => {
      addKyoongBubble('me', line);
      if (kyoongStep < 11) {
        kyoongStep += 1;
      } else {
        kyoongStep = 0;
        const replies = [
          '姐姐真的想好了？',
          '我还以为，姐姐会狠心不要我了呢.....',
          '这种事，我当然愿意，无论什么身份，你愿意给我一个能在你身边的机会。',
          '我就已经很知足了。',
          '不过，随意弃狗可是很严重的。',
          '所以姐姐，不要后悔，我是不会轻易放你走的。'
        ];
        replies.forEach((reply, i) => setTimeout(() => {
          addKyoongBubble('them', reply);
          if (i === replies.length - 1) {
            kyoongStep = 12;
            setTimeout(() => {
              const opts = document.getElementById('kyoongOptions');
              if (opts) {
                opts.style.display = 'flex';
                opts.innerHTML = '';
                const btn = document.createElement('button');
                btn.textContent = '这种事才不是开玩笑的呢';
                btn.style.cssText = 'padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;';
                btn.onclick = () => {
                  opts.style.display = 'none';
                  addKyoongBubble('me', '这种事才不是开玩笑的呢');
                  kyoongStep = 0;
                  setTimeout(() => addKyoongBubble('them', '那姐姐下午要不要出来见一面？'), 900);
                  setTimeout(() => addKyoongBubble('them', '我本来还想再等等的，毕竟刚才说了那些话。'), 1900);
                  setTimeout(() => {
                    addKyoongBubble('them', '可是想了想，喜欢见姐姐这件事，好像也没什么好藏着的。');
                    setTimeout(showDayTwoInvite, 900);
                  }, 2900);
                };
                opts.appendChild(btn);
              }
            }, 500);
          }
        }, 1000 * (i + 1)));
      }
    });
  }
}
function showDayTwoInvite() {
  // 前面三条邀约已在上一段剧情中发送，这里只弹男朋友通知，绝不重复添加聊天气泡。
  if (localStorage.getItem('dayTwoInviteSequenceStarted') === 'true') return;
  localStorage.setItem('dayTwoInviteSequenceStarted', 'true');
  localStorage.setItem('dayTwoInviteStage', 'boyfriend-notification');
  const avatar = '<div style="width:40px;height:40px;flex:0 0 40px;border-radius:10px;background:#8e8e93;display:flex;align-items:center;justify-content:center;font-size:20px;">👤</div>';
  showDayTwoNotification('day-two-boyfriend-notice', '男朋友', '宝宝，今天下午有空吗', avatar, () => {
    localStorage.setItem('dayTwoBoyfriendNoticeSent', 'true');
    const preview = document.getElementById('msgPreview');
    if (preview) preview.textContent = '宝宝，今天下午有空吗？';
    saveStoryProgressNow();
  });
}

function showDayTwoNotification(id, sender, message, avatarHtml, onDone) {
  const phone = document.getElementById('phone');
  const old = document.getElementById(id); if (old) old.remove();
  const banner = document.createElement('div'); banner.id = id;
  banner.style.cssText = 'position:absolute;top:48px;left:16px;right:16px;background:rgba(45,45,48,.88);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.16);border-radius:18px;padding:12px 14px;display:flex;gap:10px;align-items:center;z-index:100001;box-shadow:0 8px 24px rgba(0,0,0,.22);color:#fff;opacity:0;transform:translateY(-12px);transition:all .28s;';
  banner.innerHTML = avatarHtml + '<div style="min-width:0;flex:1;"><div style="display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#ddd;margin-bottom:4px;"><b style="font-size:13px;color:#fff;">' + sender + '</b><span>刚刚</span></div><div style="font-size:14px;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + message + '</div></div>';
  phone.appendChild(banner); requestAnimationFrame(() => { banner.style.opacity = '1'; banner.style.transform = 'translateY(0)'; });
  setTimeout(() => { banner.style.opacity = '0'; banner.style.transform = 'translateY(-12px)'; setTimeout(() => { banner.remove(); if (onDone) onDone(); }, 320); }, 2400);
}

function showDayTwoBaekNotification() {
  if (localStorage.getItem('dayTwoBoyfriendChatFinished') !== 'true' || localStorage.getItem('dayTwoBaekNoticeSent') === 'true') return;
  const avatar = '<img src="kyoong.jpg" style="width:40px;height:40px;flex:0 0 40px;border-radius:10px;object-fit:cover;">';
  showDayTwoNotification('day-two-baek-notice', '边伯贤', '所以，姐姐下午有空嘛？', avatar, () => {
    localStorage.setItem('dayTwoBaekNoticeSent', 'true'); localStorage.setItem('dayTwoInviteStage', 'choices-ready');
    const area = document.getElementById('kyoongArea');
    if (area && !area.innerText.includes('姐姐，那我等你回复哦。')) addKyoongBubble('them', '姐姐，那我等你回复哦。');
    const preview = document.getElementById('kyoongPreview'); if (preview) preview.textContent = '姐姐，那我等你回复哦。';
    renderDayTwoBoyfriendChoices(); renderDayTwoBaekChoices(); saveStoryProgressNow();
  });
}

function renderDayTwoBoyfriendChoices() {
  if (localStorage.getItem('dayTwoBaekNoticeSent') !== 'true' || localStorage.getItem('dayTwoInviteChoice')) return;
  const opts = document.getElementById('msgOptions'); if (!opts) return; opts.style.display = 'flex'; opts.innerHTML = '';
  [['好吧，那你下午来接我。', true], ['今天就算了，我还有别的安排。', false]].forEach(([label, yes]) => {
    const btn = document.createElement('button'); btn.textContent = label;
    btn.style.cssText = 'padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;';
    btn.onclick = () => finishDayTwoInvite('boyfriend', yes); opts.appendChild(btn);
  });
}

function renderDayTwoBaekChoices() {
  if (localStorage.getItem('dayTwoBaekNoticeSent') !== 'true' || localStorage.getItem('dayTwoInviteChoice')) return;
  const opts = document.getElementById('kyoongOptions'); if (!opts) return; opts.style.display = 'flex'; opts.innerHTML = '';
  [['好呀，那待会儿见。', true], ['今天不行，下次再说吧。', false]].forEach(([label, yes]) => {
    const btn = document.createElement('button'); btn.textContent = label;
    btn.style.cssText = 'padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;';
    btn.onclick = () => finishDayTwoInvite('baek', yes); opts.appendChild(btn);
  });
}

function finishDayTwoInvite(chosenPerson, agrees) {
  if (localStorage.getItem('dayTwoInviteChoice')) return;
  const boyfriendAgrees = chosenPerson === 'boyfriend' ? agrees : !agrees;
  const baekAgrees = chosenPerson === 'baek' ? agrees : !agrees;
  const boyfriendArea = document.getElementById('chatArea'), baekArea = document.getElementById('kyoongArea');
  ['msgOptions','kyoongOptions'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  if (boyfriendArea && !boyfriendArea.dataset.dayTwoReplyAdded) { boyfriendArea.dataset.dayTwoReplyAdded = 'true'; addMsgBubble('me', boyfriendAgrees ? '好吧，那你下午来接我。' : '今天就算了，我还有别的安排。'); }
  if (baekArea && !baekArea.dataset.dayTwoReplyAdded) { baekArea.dataset.dayTwoReplyAdded = 'true'; addKyoongBubble('me', baekAgrees ? '好呀，那待会儿见。' : '今天不行，下次再说吧。'); }
  localStorage.setItem('dayTwoInviteChoice', boyfriendAgrees ? 'boyfriend-yes' : 'baek-yes');
  localStorage.setItem('dayTwoFinished', 'true'); localStorage.setItem('dayTwoInviteSequenceFinished', 'true'); localStorage.setItem('dayTwoInviteStage', 'finished');
  kyoongStep = 0; msgStep = 0; saveStoryProgressNow();
}
function showKyoongEnding() {
  // 结局一：到此为止。保留独立结局画面，并提供重新开始选项。
  localStorage.setItem("dayOneFinished", "true");
  kyoongStep = 0;
  localStorage.setItem("kyoongStep", "0");
  let ending = document.getElementById('kyoong-ending-screen');
  if (!ending) {
    ending = document.createElement('div');
    ending.id = 'kyoong-ending-screen';
    ending.style.cssText = 'position:absolute;inset:0;z-index:100000;background:#111;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;box-sizing:border-box;';
    ending.innerHTML = '<div style="font-size:12px;letter-spacing:4px;color:#b9b9b9;margin-bottom:14px;">ENDING 01</div><div style="font-size:30px;font-weight:700;margin-bottom:24px;">到此为止</div><div style="font-size:15px;line-height:2;text-align:left;max-width:340px;">有些错误，在发生之后才终于显露出它的重量。<br><br>你选择停在这里，不再让一时的冲动成为继续伤害别人的理由。</div><div style="font-size:12px;color:#b9b9b9;margin-top:28px;">本次故事已结束</div><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:28px;"><button id="kyoong-ending-return" style="padding:11px 20px;border:1px solid #777;border-radius:22px;background:transparent;color:#fff;font-size:14px;">返回手机</button><button id="kyoong-ending-restart" style="padding:11px 20px;border:1px solid #fff;border-radius:22px;background:#fff;color:#111;font-size:14px;">重新开始</button></div>';
    document.getElementById('phone').appendChild(ending);
    document.getElementById('kyoong-ending-return').onclick = () => { ending.remove(); closeKyoongChat(); };
    document.getElementById('kyoong-ending-restart').onclick = () => {
      if (!confirm('确定要重新开始吗？当前剧情进度会清空，但设置和手动存档会保留。')) return;
      restartStoryFromBeginning();
    };
  } else ending.style.display = 'flex';
}

function restartStoryFromBeginning() {
  const keep = new Set(['sysLang','userName','userAvatar','userBg']);
  const remove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !keep.has(key) && key !== 'gameAutoSave' && !key.startsWith('gameSaveSlot_')) remove.push(key);
  }
  remove.forEach(key => localStorage.removeItem(key));
  localStorage.removeItem('gameAutoSave');
  location.reload();
}
