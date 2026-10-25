function initSettingsApp() {
  let container = document.getElementById("settingsAppContent");
  if (!container) return;
  container.innerHTML = "";

  let currentLang = localStorage.getItem('sysLang') || 'zh-CN';
  // 强制清理非法缓存，并修正到支持的列表中
  if (!["zh-CN", "zh-TW", "en-US", "ja-JP", "ko-KR"].includes(currentLang)) {
    currentLang = 'zh-CN';
    localStorage.setItem('sysLang', 'zh-CN');
  }

  const i18nSet = {
    "zh-CN": { title: "设置", lang: "语言与地区", lock: "锁定屏幕", clear: "抹掉所有内容和设置", user: "个人资料", name: "输入你的名字", confirm: "确定要抹除所有记忆吗？" },
    "zh-TW": { title: "設定", lang: "語言與地區", lock: "鎖定螢幕", clear: "清除所有內容和設定", user: "個人資料", name: "輸入你的名字", confirm: "確定要抹除所有記憶嗎？" },
    "en-US": { title: "Settings", lang: "Language & Region", lock: "Lock Screen", clear: "Erase All Content and Settings", user: "Profile", name: "Enter your name", confirm: "Are you sure you want to erase all data?" },
    "ja-JP": { title: "設定", lang: "言語と地域", lock: "画面をロック", clear: "すべてのコンテンツと設定を消去", user: "プロフィール", name: "名前を入力", confirm: "すべてのデータを消去してもよろしいですか？" },
    "ko-KR": { title: "설정", lang: "언어 및 지역", lock: "화면 잠금", clear: "모든 콘텐츠 및 설정 지우기", user: "프로필", name: "이름 입력", confirm: "모든 데이터를 지우시겠습니까?" }
  };

  const t = i18nSet[currentLang];
  const langNames = { "zh-CN": "简体中文", "zh-TW": "繁體中文", "en-US": "English", "ja-JP": "日本語", "ko-KR": "한국어" };

  let langOptionsHtml = "";
  Object.keys(langNames).forEach(code => {
    const isSelected = code === currentLang;
    langOptionsHtml += `
      <div onclick="selectLanguage('${code}')" style="padding:16px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff; color:#000;">
        <span style="font-size:16px;">${langNames[code]}</span>
        ${isSelected ? '<span style="color:#007aff; font-size:18px; font-weight:bold;">✓</span>' : ''}
      </div>
    `;
  });

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; height:100%; background:#f2f2f7; color:#000; overflow-y:auto;">
      <div style="padding: 48px 16px 10px; display:flex; justify-content:center; align-items:center; font-size:17px; font-weight:600; background:#f9f9f9; border-bottom:1px solid #ddd;">${t.title}</div>
      
      <div style="background:#fff; margin:16px; border-radius:12px; padding:16px; display:flex; align-items:center; gap:16px;">
        <div style="width:60px; height:60px; border-radius:50%; background:#1d9bf0; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:bold; color:#fff; overflow:hidden;" onclick="document.getElementById('set-avatar-upload').click()">
          <img id="set-avatar-img" style="width:100%; height:100%; object-fit:cover; display:none;">
          <span id="set-avatar-text">👤</span>
          <input type="file" id="set-avatar-upload" accept="image/*" style="display:none;" onchange="uploadSettingsImg(this)">
        </div>
        <div style="flex:1;">
          <div style="font-size:12px; color:#8e8e93; margin-bottom:4px;">${t.user}</div>
          <input type="text" id="set-username" placeholder="${t.name}" style="border:none; font-size:20px; font-weight:600; outline:none; width:100%; padding:0; background:transparent;" value="${localStorage.getItem('userName') || ''}">
        </div>
      </div>

      <div style="background:#fff; margin:0 16px 16px; border-radius:12px; overflow:hidden;">
        <div style="padding:16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleLangList()">
          <span style="font-size:16px;">🌐 ${t.lang}</span>
          <span style="color:#8e8e93; font-size:14px;">${langNames[currentLang]} ›</span>
        </div>
      </div>

      <div id="langListPopup" style="display:none; position:absolute; inset:0; background:#f2f2f7; z-index:999;">
        <div style="padding: 48px 16px 10px; display:flex; align-items:center; background:#f9f9f9; border-bottom:1px solid #ddd;">
          <span onclick="toggleLangList()" style="color:#007aff; font-size:16px; cursor:pointer; margin-right:10px;">‹ ${t.title}</span>
          <span style="font-size:17px; font-weight:600; flex:1; text-align:center; margin-right:20px;">${t.lang}</span>
        </div>
        <div style="padding:16px 0;">
          ${langOptionsHtml}
        </div>
      </div>

      <div style="background:#fff; margin:0 16px 16px; border-radius:12px; overflow:hidden;">
        <div style="padding:16px; border-bottom:1px solid #eee; color:#007aff; font-size:16px; cursor:pointer;" onclick="lockPhone()">🔒 ${t.lock}</div>
        <div style="padding:16px; color:#ff3b30; font-size:16px; cursor:pointer;" onclick="clearMemory('${t.confirm}')">🗑️ ${t.clear}</div>
      </div>
    </div>
  `;

  const savedAvatar = localStorage.getItem('userAvatar');
  if(savedAvatar) {
    const img = document.getElementById('set-avatar-img');
    if(img) { img.src = savedAvatar; img.style.display = 'block'; document.getElementById('set-avatar-text').style.display = 'none'; }
  }

  const nameInput = document.getElementById('set-username');
  if(nameInput) {
    nameInput.value = localStorage.getItem('userName') || '';
    nameInput.addEventListener('input', function() {
      localStorage.setItem('userName', this.value);
    });
  }
}

function toggleLangList() {
  const popup = document.getElementById('langListPopup');
  popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

function selectLanguage(langCode) {
  localStorage.setItem('sysLang', langCode);
  document.getElementById('settingsAppContent').innerHTML = "";
  initSettingsApp();
  if(typeof updateGlobalLanguage === "function") updateGlobalLanguage();
}

function lockPhone() {
  document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active"));
  document.getElementById("lock").classList.remove("unlocked");
  document.getElementById("lock-banner").classList.remove("show");
  const msgBanner = document.getElementById("lock-msg-banner");
  if(msgBanner) msgBanner.style.opacity = "0";
}

function clearMemory(confirmText) {
  if(confirm(confirmText)) { localStorage.clear(); location.reload(); }
}

function uploadSettingsImg(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('set-avatar-img').src = e.target.result;
      document.getElementById('set-avatar-img').style.display = 'block';
      document.getElementById('set-avatar-text').style.display = 'none';
      localStorage.setItem('userAvatar', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}