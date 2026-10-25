// 👇 最暴力的默认语言强制重置（必须放在所有代码的最前面）
localStorage.setItem('sysLang', 'zh-CN');

const CONFIG = { wallpaper: "wallpaper.jpg", passcode: "0506" };
const $ = id => document.getElementById(id);

window.trans = {
  "zh-CN": {
    icon_photos: "照片", icon_calendar: "日历", icon_weather: "天气", icon_clock: "时钟", icon_x: "X", icon_notes: "备忘录", icon_mail: "邮件", icon_contacts: "通讯录", icon_settings: "设置", icon_phone: "电话", icon_safari: "Safari", icon_msg: "信息", icon_music: "音乐",
    swipe: "向上轻扫或点击解锁", enter: "输入密码", weatherTitle: "首尔", weatherDesc: "多云 · 最高21° 最低12°", eventTitle: "日程", event1: "晨会", event2: "和TA吃饭",
    msg_title: "信息", msg_boyfriend: "男朋友", msg_1: "宝宝抱歉，临时要开会，今晚的约会去不了了。", msg_2: "下次一定补偿你。", msg_opt1: "你每次都这么说，到底有没有把我放心上？", msg_opt2: "随便吧。", msg_3: "宝宝别闹了，领导在催了，我先去忙了。", msg_opt3: "那你忙吧，不用管我了。", msg_opt4: "（已读不回）", msg_4: "下次我一定补偿你，早点睡。", read: "已读", unread: "未读", imessage: "iMessage",
    tw_home: "主页", tw_notify: "通知", tw_msg: "私信", tw_profile: "个人资料", tw_baek: "Baek.", tw_follow: "关注了你", tw_just_now: "刚刚", tw_tweet_text: "Sit down", tw_bd: "出差✈️", tw_bd_date: "10月18日", tw_bd_text: "出差✈️", tw_bdm: "Black Dream🤫", tw_bdm_date: "10月10日", tw_1: "抓到你了。", tw_2: "啊，变成已读了。", tw_3: "姐姐看私信很快呢。", tw_opt1: "你每天都在盯着谁给你点赞吗？", tw_rep1: "才不是呢。我这半个月，只盯着姐姐一个人的主页看。", tw_opt2: "脸长得不错，仅此而已。", tw_rep2: "那视频呢？视频里的我，姐姐觉得怎么样？", tw_meet1: "既然姐姐一直在看我，那光隔着屏幕看多没意思。要不要出来见一面？", tw_opt3: "没看过哦", tw_rep3: "说谎呢，姐姐一点都不坦诚。", tw_opt4: "像小狗呢", tw_rep4: "如果姐姐喜欢，我可以只当姐姐的小狗^^", tw_meet2: "所以，姐姐和我见一面好不好？", tw_def: "那你应该也知道，姐姐是有男朋友的吧。", tw_final1: "当然知道啦。可如果他在你旁边的话，姐姐怎么会点赞我的推文呢？", tw_final2: "他既然陪不了姐姐，那今晚……换我来陪你好不好？", tw_f_opt1: ".......你在哪？", tw_f_rep1: "姐姐你最好了！等我十分钟，我马上来接你。", tw_f_rep2: "餐厅我已经订好了。我知道姐姐今晚肯定还没吃东西，我不让姐姐饿肚子。", tw_f_rep3: "穿件外套下楼就好，我会让你满意的姐姐", tw_f_opt2: "这样不好，算了吧。", tw_f_rep4: "真的不想下来见我吗，姐姐……", tw_f_rep5: ">_<", tw_f_opt3: "仅此一次。"
  },
  "zh-TW": {
    icon_photos: "照片", icon_calendar: "日曆", icon_weather: "天氣", icon_clock: "時鐘", icon_x: "X", icon_notes: "備忘錄", icon_mail: "郵件", icon_contacts: "通訊錄", icon_settings: "設定", icon_phone: "電話", icon_safari: "Safari", icon_msg: "訊息", icon_music: "音樂",
    swipe: "向上輕掃或點擊解鎖", enter: "輸入密碼", weatherTitle: "首爾", weatherDesc: "多雲 · 最高21° 最低12°", eventTitle: "日程", event1: "晨會", event2: "和TA吃飯",
    msg_title: "訊息", msg_boyfriend: "男朋友", msg_1: "寶寶抱歉，臨時要開會，今晚的約會去不了了。", msg_2: "下次一定補償你。", msg_opt1: "你每次都這麼說，到底有沒有把我放心上？", msg_opt2: "隨便吧。", msg_3: "寶寶別鬧了，領導在催了，我先去忙了。", msg_opt3: "那你忙吧，不用管我了。", msg_opt4: "（已讀不回）", msg_4: "下次我一定補償你，早點睡。", read: "已讀", unread: "未讀", imessage: "iMessage",
    tw_home: "主頁", tw_notify: "通知", tw_msg: "私信", tw_profile: "個人資料", tw_baek: "Baek.", tw_follow: "關注了你", tw_just_now: "剛剛", tw_tweet_text: "Sit down", tw_bd: "出差✈️", tw_bd_date: "10月18日", tw_bd_text: "出差✈️", tw_bdm: "Black Dream🤫", tw_bdm_date: "10月10日", tw_1: "抓到你了。", tw_2: "啊，變成已讀了。", tw_3: "姐姐看私信很快呢。", tw_opt1: "你每天都在盯著誰給你點讚嗎？", tw_rep1: "才不是呢。我這半個月，只盯著姐姐一個人的主頁看。", tw_opt2: "臉長得不錯，僅此而已。", tw_rep2: "那視頻呢？視頻裡的我，姐姐覺得怎麼樣？", tw_meet1: "既然姐姐一直在看我，那光隔著屏幕看多沒意思。要不要出來見一面？", tw_opt3: "沒看過哦", tw_rep3: "說謊呢，姐姐一點都不坦誠。", tw_opt4: "像小狗呢", tw_rep4: "如果姐姐喜歡，我可以只當姐姐的小狗^^", tw_meet2: "所以，姐姐和我見一面好不好？", tw_def: "那你應該也知道，姐姐是有男朋友的吧。", tw_final1: "當然知道啦。可如果他在你旁邊的話，姐姐怎麼會點讚我的推文呢？", tw_final2: "他既然陪不了姐姐，那今晚……換我來陪你好不好？", tw_f_opt1: ".......你在哪？", tw_f_rep1: "姐姐你最好了！等我十分鐘，我馬上來接你。", tw_f_rep2: "餐廳我已經訂好了。我知道姐姐今晚肯定還沒吃東西，我不讓姐姐餓肚子。", tw_f_rep3: "穿件外套下樓就好，我會讓你滿意的姐姐", tw_f_opt2: "這樣不好，算了吧。", tw_f_rep4: "真的不想下來見我嗎，姐姐……", tw_f_rep5: ">_<", tw_f_opt3: "僅此一次。"
  },
  "en-US": {
    icon_photos: "Photos", icon_calendar: "Calendar", icon_weather: "Weather", icon_clock: "Clock", icon_x: "X", icon_notes: "Notes", icon_mail: "Mail", icon_contacts: "Contacts", icon_settings: "Settings", icon_phone: "Phone", icon_safari: "Safari", icon_msg: "Messages", icon_music: "Music",
    swipe: "Swipe up or tap to unlock", enter: "Enter Passcode", weatherTitle: "Seoul", weatherDesc: "Cloudy · High 21° Low 12°", eventTitle: "Events", event1: "Morning Meeting", event2: "Dinner with him",
    msg_title: "Messages", msg_boyfriend: "Boyfriend", msg_1: "Baby, I'm sorry. I have a last-minute meeting. I can't make it tonight.", msg_2: "I'll make it up to you next time.", msg_opt1: "You always say that. Do you even care about me?", msg_opt2: "Whatever.", msg_3: "Baby, don't be like that. The boss is calling. I gotta go.", msg_opt3: "Fine, go do your thing.", msg_opt4: "(Read without reply)", msg_4: "I'll make it up to you next time. Sleep early.", read: "Read", unread: "Unread", imessage: "iMessage",
    tw_home: "Home", tw_notify: "Notifications", tw_msg: "Messages", tw_profile: "Profile", tw_baek: "Baek.", tw_follow: "followed you", tw_just_now: "Just now", tw_tweet_text: "Sit down", tw_bd: "Business trip✈️", tw_bd_date: "Oct 18", tw_bd_text: "Business trip✈️", tw_bdm: "Black Dream🤫", tw_bdm_date: "Oct 10", tw_1: "Caught you.", tw_2: "Ah, it says read.", tw_3: "You read my message so fast, sister.", tw_opt1: "Who do you stare at every day to like?", tw_rep1: "Not true. I've only been staring at your profile for half a month.", tw_opt2: "Just a pretty face, nothing more.", tw_rep2: "What about the video? How did I look in it?", tw_meet1: "Since you keep looking, looking at a screen is boring. Want to meet up?", tw_opt3: "I didn't watch it.", tw_rep3: "Liar. You're not honest at all, sister.", tw_opt4: "Like a puppy.", tw_rep4: "If you like, I can be your puppy ^^", tw_meet2: "So, can we meet, sister?", tw_def: "Then you should know I have a boyfriend.", tw_final1: "Of course I know. But if he was right next to you, why would you like my tweet?", tw_final2: "Since he can't keep you company, let me do it tonight.", tw_f_opt1: ".......Where are you?", tw_f_rep1: "You're the best! Wait ten minutes, I'll come pick you up.", tw_f_rep2: "I already booked the restaurant. You must be hungry. I won't let you starve.", tw_f_rep3: "Just put on a jacket and come down. I'll satisfy you, sister.", tw_f_opt2: "This is not right, forget it.", tw_f_rep4: "You really don't want to see me, sister...?", tw_f_rep5: ">_<", tw_f_opt3: "Just this once."
  },
  "ja-JP": {
    icon_photos: "写真", icon_calendar: "カレンダー", icon_weather: "天気", icon_clock: "時計", icon_x: "X", icon_notes: "メモ", icon_mail: "メール", icon_contacts: "連絡先", icon_settings: "設定", icon_phone: "電話", icon_safari: "Safari", icon_msg: "メッセージ", icon_music: "ミュージック",
    swipe: "上にスワイプまたはタップしてロック解除", enter: "パスコードを入力", weatherTitle: "ソウル", weatherDesc: "曇り · 最高21° 最低12°", eventTitle: "スケジュール", event1: "朝会", event2: "彼と食事",
    msg_title: "メッセージ", msg_boyfriend: "彼氏", msg_1: "ごめん、急に会議が入った。今夜のデートは行けなくなった。", msg_2: "次は必ず埋め合わせする。", msg_opt1: "いつもそう言うよね。私のことちゃんと考えてる？", msg_opt2: "勝手にすれば。", msg_3: "拗ねないで。上司が呼んでるから、もう行くね。", msg_opt3: "じゃあ、頑張ってね。", msg_opt4: "（既読スルー）", msg_4: "次は必ず埋め合わせする。早く寝てね。", read: "既読", unread: "未読", imessage: "iMessage",
    tw_home: "ホーム", tw_notify: "通知", tw_msg: "メッセージ", tw_profile: "プロフィール", tw_baek: "Baek.", tw_follow: "があなたをフォローしました", tw_just_now: "たった今", tw_tweet_text: "Sit down", tw_bd: "出張✈️", tw_bd_date: "10月18日", tw_bd_text: "出張✈️", tw_bdm: "Black Dream🤫", tw_bdm_date: "10月10日", tw_1: "見つけた。", tw_2: "あ、既読になった。", tw_3: "メッセージを読むの早いね、お姉さん。", tw_opt1: "毎日誰のいいねをチェックしてるの？", tw_rep1: "違うよ。この半月、お姉さんのプロフィールしか見てない。", tw_opt2: "顔がいいだけ。それ以上でも以下でもない。", tw_rep2: "動画は？動画の僕はどうだった？", tw_meet1: "ずっと見てるなら、画面越しじゃつまらないよ。会わない？", tw_opt3: "見てないよ。", tw_rep3: "嘘つき。お姉さんは全然素直じゃないね。", tw_opt4: "子犬みたい。", tw_rep4: "お姉さんが好きなら、子犬になるよ^^", tw_meet2: "だから、一度会ってくれない？お姉さん。", tw_def: "私に彼氏がいるって分かってるよね。", tw_final1: "もちろん知ってるよ。でも、彼がそばにいたら、なんで僕のツイートにいいねするの？", tw_final2: "彼がお姉さんを楽しませられないなら、今夜は僕が。", tw_f_opt1: ".......どこにいるの？", tw_f_rep1: "お姉さん最高！10分待って、すぐ迎えに行く。", tw_f_rep2: "レストランはもう予約してある。お腹空いてるでしょ、お姉さん。", tw_f_rep3: "ジャケットを羽織って降りてきて。満足させてあげるから、お姉さん。", tw_f_opt2: "良くないよ、やめよう。", tw_f_rep4: "本当に会いたくないの？お姉さん……", tw_f_rep5: ">_<", tw_f_opt3: "今回だけだよ。"
  },
  "ko-KR": {
    icon_photos: "사진", icon_calendar: "캘린더", icon_weather: "날씨", icon_clock: "시계", icon_x: "X", icon_notes: "메모", icon_mail: "메일", icon_contacts: "연락처", icon_settings: "설정", icon_phone: "전화", icon_safari: "Safari", icon_msg: "메시지", icon_music: "음악",
    swipe: "위로 쓸어올리거나 탭하여 잠금 해제", enter: "암호 입력", weatherTitle: "서울", weatherDesc: "흐림 · 최고 21° 최저 12°", eventTitle: "일정", event1: "아침 회의", event2: "그와 저녁 식사",
    msg_title: "메시지", msg_boyfriend: "남자친구", msg_1: "미안, 갑자기 회의가 잡혔어. 오늘 약속 못 가.", msg_2: "다음에 꼭 보상할게.", msg_opt1: "넌 맨날 그런 말만 해. 나한테 관심 있는 거 맞아?", msg_opt2: "마음대로 해.", msg_3: "삐치지 마. 팀장님이 부르셔서 이만 가볼게.", msg_opt3: "그래, 바쁜 일 하러 가.", msg_opt4: "（읽고 씹음）", msg_4: "다음에 꼭 보상할게. 일찍 자.", read: "읽음", unread: "안읽음", imessage: "iMessage",
    tw_home: "홈", tw_notify: "알림", tw_msg: "메시지", tw_profile: "프로필", tw_baek: "Baek.", tw_follow: "님이 회원님을 팔로우했습니다", tw_just_now: "방금", tw_tweet_text: "Sit down", tw_bd: "출장✈️", tw_bd_date: "10월 18일", tw_bd_text: "출장✈️", tw_bdm: "Black Dream🤫", tw_bdm_date: "10월 10일", tw_1: "잡았다.", tw_2: "아, 읽음으로 바뀌었네.", tw_3: "누나, 메시지 엄청 빨리 보네?", tw_opt1: "매일 누구 좋아요 누르는지 보고 있어?", tw_rep1: "아니야. 난 지난 보름 동안 누나 프로필만 봤어.", tw_opt2: "얼굴이 예쁠 뿐이야, 그 이상은 아니야.", tw_rep2: "영상은? 영상 속 내 모습은 어땠어?", tw_meet1: "계속 볼 거면 화면으로 보는 건 재미없지. 만날래?", tw_opt3: "안 봤는데.", tw_rep3: "거짓말. 누나는 정말 솔직하지 않네.", tw_opt4: "강아지 같아.", tw_rep4: "누나가 좋다면, 난 강아지가 될게 ^^", tw_meet2: "그러니까 누나, 나랑 한 번 만나줄래?", tw_def: "내한테 남자친구 있는 거 알지?", tw_final1: "당연히 알지. 근데 그가 옆에 있다면, 왜 내 트윗에 좋아요를 눌렀을까?", tw_final2: "그가 누나를 못 즐겁게 해준다면, 오늘 밤은 내가.", tw_f_opt1: ".......어디야?", tw_f_rep1: "누나 최고! 10분만 기다려, 바로 데리러 갈게.", tw_f_rep2: "레스토랑은 이미 예약했어. 배고프잖아, 누나.", tw_f_rep3: "재킷만 걸치고 내려와. 만족시켜줄게, 누나.", tw_f_opt2: "이러면 안 돼, 그만하자.", tw_f_rep4: "정말 만나기 싫어, 누나...?", tw_f_rep5: ">_<", tw_f_opt3: "이번 한 번만이야."
  }
};

function applyWallpaper(){ if(CONFIG.wallpaper) $("wallpaper").style.backgroundImage = `url("${CONFIG.wallpaper}")`; }
function updateClock(){
  const d = new Date();
  const hm = d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
  $("homeClock").textContent = hm; $("lockTime").textContent = hm;
  const wd = ["周日","周一","周二","周三","周四","周五","周六"][d.getDay()];
  $("lockDate").textContent = `${d.getMonth()+1}月${d.getDate()}日 ${wd}`;
}

function renderWidgets(){
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];
  $("wWeather").innerHTML = `<div class="w-title"><span>📍 ${t.weatherTitle}</span></div><div class="w-big">18°</div><div class="w-sub">${t.weatherDesc}</div>`;
  $("wEvents").innerHTML = `<div class="w-title"><span>🗓 ${t.eventTitle}</span></div><div class="ev"><b>09:30</b> <span>${t.event1}</span></div><div class="ev"><b>19:00</b> <span>${t.event2}</span></div>`;
}

function updateGlobalLanguage() {
  let lang = localStorage.getItem('sysLang') || 'zh-CN';
  const t = window.trans[lang];
  
  const hint = document.querySelector('.lock-hint'); if(hint) hint.textContent = t.swipe;
  const pTitle = document.querySelector('.p-title'); if(pTitle) pTitle.textContent = t.enter;
  
  document.querySelectorAll('.app').forEach(el => {
    const id = el.dataset.app;
    if (t['icon_' + id] && el.querySelector('.nm')) {
      el.querySelector('.nm').textContent = t['icon_' + id];
    }
  });
  renderWidgets();
}

let currentPin = "";
function showPasscode() { 
  $("lock-main").classList.add("passcode-active"); $("passcode-screen").classList.add("active"); 
  $("lock-banner").classList.remove("show"); const msgBanner = $("lock-msg-banner"); if(msgBanner) msgBanner.style.opacity = "0";
}
let startY = null;
const lockScreen = $("lock");
lockScreen.addEventListener("touchstart", e => { startY = e.touches[0].clientY; }, {passive:true});
lockScreen.addEventListener("touchmove", e => { if(startY !== null && startY - e.touches[0].clientY > 50){ showPasscode(); startY = null; } }, {passive:true});
lockScreen.addEventListener("mousedown", e => { startY = e.clientY; });
lockScreen.addEventListener("mouseup", e => { if(startY !== null && startY - e.clientY > 50) showPasscode(); startY = null; });
$("lock-main").addEventListener("click", showPasscode);

$("keypad").addEventListener("click", e => {
  const key = e.target.closest(".key"); if(!key || key.classList.contains("empty")) return;
  if (key.id === "key-del") currentPin = currentPin.slice(0, -1);
  else if (currentPin.length < 4) currentPin += key.dataset.num;
  updateDots();
  if (currentPin.length === 4) setTimeout(checkPin, 200);
});

function updateDots() {
  const dots = $("passcode-dots").children;
  for (let i = 0; i < 4; i++) { 
    if (i < currentPin.length) dots[i].classList.add("filled"); else dots[i].classList.remove("filled"); 
  }
}
function checkPin() {
  if (currentPin === CONFIG.passcode) {
    $("lock").classList.add("unlocked");
    $("lock-banner").classList.remove("show"); const msgBanner = $("lock-msg-banner"); if(msgBanner) msgBanner.style.opacity = "0";
  } else {
    $("passcode-error").classList.add("show");
    setTimeout(() => { currentPin = ""; updateDots(); $("passcode-error").classList.remove("show"); }, 800);
  }
}

window.addEventListener("load", () => {
  setTimeout(() => { const banner = $("lock-banner"); if(banner) { banner.style.top = "35%"; banner.classList.add("show"); } }, 200);
  renderWidgets();
  updateGlobalLanguage();
  if(typeof initMsgApp === "function") initMsgApp(); 
});

const APPS = [
  { id:"photos", name:"", html:`<img src="icon_photos.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"calendar", name:"", html:`<img src="icon_calendar.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"weather", name:"", html:`<img src="icon_weather.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"clock", name:"", html:`<img src="icon_clock.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"x", name:"", html:`<img src="icon_x.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"notes", name:"", html:`<img src="icon_notes.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"mail", name:"", html:`<img src="icon_mail.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"contacts", name:"", html:`<img src="icon_contacts.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"settings", name:"", html:`<img src="icon_settings.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` }
];

const DOCK_APPS = [
  { id:"phone", name:"", html:`<img src="icon_phone.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"safari", name:"", html:`<img src="icon_safari.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"msg", name:"", html:`<img src="icon_msg.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"music", name:"", html:`<img src="icon_music.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` }
];

const OPENABLE = new Set(["x", "msg", "settings"]);
function createAppHTML(a) { 
  if(a.id === "msg") {
    return `<div class="app" data-app="${a.id}" style="position:relative;">
      <div class="ico">${a.html}</div>
      <div id="app-msg-dot" style="position:absolute; top:-2px; right:0px; width:14px; height:14px; background:#ff3b30; border-radius:50%; border:2px solid #000; display:none; z-index:999;"></div>
      <div class="nm"></div>
    </div>`;
  }
  return `<div class="app" data-app="${a.id}"><div class="ico">${a.html}</div><div class="nm"></div></div>`; 
}

function renderApps(){
  $("apps").innerHTML = APPS.map(createAppHTML).join("");
  $("dock").innerHTML = DOCK_APPS.map(createAppHTML).join("");
  document.querySelectorAll(".app").forEach(el => {
    const id = el.dataset.app;
    if(!OPENABLE.has(id)) return; 
    el.addEventListener("click", () => openApp(id));
  });
}

function openApp(id) {
  document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active"));
  const el = $("app-" + id);
  if(el) {
    el.classList.add("active");
    if (id === "x") { $("lock-banner").classList.remove("show"); if (typeof initXApp === "function") initXApp(); }
    if (id === "msg") { const msgBanner = $("lock-msg-banner"); if(msgBanner) msgBanner.style.opacity = "0"; if (typeof initMsgApp === "function") initMsgApp(); }
    if (id === "settings" && typeof initSettingsApp === "function") initSettingsApp();
  }
}

function goHome() { document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active")); }
document.addEventListener("click", e => { if(e.target.closest("[data-home]")) goHome(); });

function forceGlobalHomebar() {
  if(!document.getElementById("global-homebar")) {
    const bar = document.createElement("div");
    bar.id = "global-homebar";
    // 只留最底部 24px 的点击区域，不挡密码键盘
    bar.style.cssText = "position:fixed !important; bottom:0 !important; left:0 !important; right:0 !important; height:24px !important; z-index:2147483647 !important; cursor:pointer !important; pointer-events:auto !important;";
    
    // 加上那根实体的小白线，让你知道点哪里
    const visual = document.createElement("div");
    visual.style.cssText = "position:absolute; bottom:8px; left:50%; transform:translateX(-50%); width:134px; height:5px; border-radius:3px; background:#ffffff; pointer-events:none; opacity:0.8;";
    bar.appendChild(visual);
    
    bar.onclick = function(e) { 
      e.preventDefault(); 
      e.stopPropagation(); 
      goHome(); 
    };
    document.getElementById("phone").appendChild(bar);
  }
}

function init(){
  applyWallpaper(); updateClock(); setInterval(updateClock, 10000);
  renderApps(); forceGlobalHomebar(); renderWidgets(); updateGlobalLanguage();
}
document.addEventListener("DOMContentLoaded", init);