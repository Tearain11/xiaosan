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

      <div style="background:#fff; margin:0 16px 16px; border-radius:12px; overflow:hidden;">
        <div style="padding:16px; font-size:16px; font-weight:600; border-bottom:1px solid #eee;">💾 游戏存档</div>
        <div style="padding:14px 16px; color:#1c1c1e; font-size:14px; border-bottom:1px solid #eee;">
          <div style="font-weight:600; margin-bottom:5px;">自动存档</div>
          <div style="color:#8e8e93; font-size:12px;">剧情变化会自动保存，刷新页面后继续游戏。</div>
        </div>
        <div style="padding:12px 16px 4px; font-size:13px; color:#8e8e93;">手动存档</div>
        <div style="padding:8px 12px 12px; display:grid; gap:8px;">
          <div style="display:flex; align-items:center; gap:10px; padding:10px 4px;">
            <div style="flex:1;"><div style="font-size:14px; color:#1c1c1e;">存档位 1</div><div class="game-save-slot-state" style="font-size:11px; color:#8e8e93; margin-top:3px;">空存档位</div></div>
            <button data-save-slot="1" onclick="saveGameSlot(1)" style="border:0; border-radius:18px; padding:8px 12px; background:#007aff; color:#fff;">保存</button>
            <button onclick="loadGameSlot(1)" style="border:0; border-radius:18px; padding:8px 12px; background:#f2f2f7; color:#007aff;">读取</button>
          </div>
          <div style="display:flex; align-items:center; gap:10px; padding:10px 4px; border-top:1px solid #f2f2f7;">
            <div style="flex:1;"><div style="font-size:14px; color:#1c1c1e;">存档位 2</div><div class="game-save-slot-state" style="font-size:11px; color:#8e8e93; margin-top:3px;">空存档位</div></div>
            <button data-save-slot="2" onclick="saveGameSlot(2)" style="border:0; border-radius:18px; padding:8px 12px; background:#007aff; color:#fff;">保存</button>
            <button onclick="loadGameSlot(2)" style="border:0; border-radius:18px; padding:8px 12px; background:#f2f2f7; color:#007aff;">读取</button>
          </div>
          <div style="display:flex; align-items:center; gap:10px; padding:10px 4px; border-top:1px solid #f2f2f7;">
            <div style="flex:1;"><div style="font-size:14px; color:#1c1c1e;">存档位 3</div><div class="game-save-slot-state" style="font-size:11px; color:#8e8e93; margin-top:3px;">空存档位</div></div>
            <button data-save-slot="3" onclick="saveGameSlot(3)" style="border:0; border-radius:18px; padding:8px 12px; background:#007aff; color:#fff;">保存</button>
            <button onclick="loadGameSlot(3)" style="border:0; border-radius:18px; padding:8px 12px; background:#f2f2f7; color:#007aff;">读取</button>
          </div>
          <div id="game-save-status" style="font-size:12px; color:#34a853; min-height:16px; padding:0 4px;"></div>
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

  if (typeof renderGameSaveSlots === 'function') renderGameSaveSlots();

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
  // 语言切换后重新构建所有 App，避免已经打开过的页面继续保留旧语言的 DOM。
  localStorage.setItem('sysLang', langCode);
  location.reload();
}

function lockPhone() {
  document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active"));
  const lock = document.getElementById("lock");
  const lockMain = document.getElementById("lock-main");
  const passcodeScreen = document.getElementById("passcode-screen");
  if (lock) lock.classList.remove("unlocked");
  if (typeof currentPin !== "undefined") currentPin = "";
  if (typeof updateDots === "function") updateDots();
  if (lockMain) lockMain.classList.remove("passcode-active");
  if (passcodeScreen) passcodeScreen.classList.remove("active");
  const error = document.getElementById("passcode-error");
  if (error) error.classList.remove("show");
  const xBanner = document.getElementById("lock-banner");
  if (xBanner) xBanner.classList.remove("show");
  ["lock-msg-banner", "kyoong-banner"].forEach(id => {
    const banner = document.getElementById(id);
    if (banner) {
      banner.style.opacity = "0";
      banner.style.transform = "translateY(-150%)";
    }
  });
}

function clearMemory(confirmText) {
  if (!confirm(confirmText)) return;
  // 禁止旧页面卸载时自动保存，避免清除后又把旧剧情写回来。
  if (typeof skipAutoSaveOnUnload !== "undefined") skipAutoSaveOnUnload = true;
  try {
    // 明确清除所有游戏存档、自动存档及其备份。
    for (const key of Object.keys(localStorage)) localStorage.removeItem(key);
    sessionStorage.clear();
  } catch (error) {
    console.warn("清除存档失败", error);
    alert("清除失败，请检查浏览器是否允许此网站使用本地存储。");
    return;
  }
  // 带一次性参数重新加载，避免旧页面缓存继续显示上一轮剧情。
  const url = new URL(location.href);
  url.searchParams.set("reset", String(Date.now()));
  location.replace(url.toString());
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