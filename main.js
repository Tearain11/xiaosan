const CONFIG = {
  wallpaper: "wallpaper.jpg", 
  passcode: "0506",
  weather: { place:"首尔", temp:"18°", desc:"多云", high:"21°", low:"12°" },
  events: [ { time:"09:30", title:"晨会" }, { time:"19:00", title:"和TA吃饭" } ]
};
const $ = id => document.getElementById(id);

function applyWallpaper(){ if(CONFIG.wallpaper) $("wallpaper").style.backgroundImage = `url("${CONFIG.wallpaper}")`; }
function updateClock(){
  const d = new Date();
  const hm = d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
  $("homeClock").textContent = hm; $("lockTime").textContent = hm;
  const wd = ["周日","周一","周二","周三","周四","周五","周六"][d.getDay()];
  $("lockDate").textContent = `${d.getMonth()+1}月${d.getDate()}日 ${wd}`;
}
function renderWidgets(){
  const w = CONFIG.weather;
  $("wWeather").innerHTML = `<div class="w-title"><span>📍 ${w.place}</span></div><div class="w-big">${w.temp}</div><div class="w-sub">${w.desc} · 最高${w.high} 最低${w.low}</div>`;
  $("wEvents").innerHTML = `<div class="w-title"><span>🗓 日程</span></div>${CONFIG.events.map(ev => `<div class="ev"><b>${ev.time}</b> <span>${ev.title}</span></div>`).join("")}`;
}

let currentPin = "";
function showPasscode() { $("lock-main").classList.add("passcode-active"); $("passcode-screen").classList.add("active"); $("lock-banner").classList.remove("show"); }
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
  if (currentPin === CONFIG.passcode) $("lock").classList.add("unlocked");
  else {
    $("passcode-error").classList.add("show");
    setTimeout(() => { currentPin = ""; updateDots(); $("passcode-error").classList.remove("show"); }, 800);
  }
}

window.addEventListener("load", () => setTimeout(() => $("lock-banner").classList.add("show"), 2000));

const SVGS = {
  mail: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
  msg: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`,
  music: `<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`
};

const APPS = [
  { id:"photos", name:"照片", cls:"", html:`<img src="icon_photos.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"calendar", name:"日历", cls:"", html:`<img src="icon_calendar.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"weather", name:"天气", cls:"", html:`<img src="icon_weather.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"clock", name:"时钟", cls:"", html:`<img src="icon_clock.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"x", name:"X", cls:"", html:`<img src="icon_x.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"notes", name:"备忘录", cls:"", html:`<img src="icon_notes.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"mail", name:"邮件", cls:"", html:`<img src="icon_mail.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"contacts", name:"通讯录", cls:"", html:`<img src="icon_contacts.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"settings", name:"设置", cls:"", html:`<img src="icon_settings.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` }
];

const DOCK_APPS = [
  { id:"phone", name:"电话", cls:"", html:`<img src="icon_phone.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"safari", name:"Safari", cls:"", html:`<img src="icon_safari.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"msg", name:"信息", cls:"", html:`<img src="icon_msg.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` },
  { id:"music", name:"音乐", cls:"", html:`<img src="icon_music.png" style="width:100%;height:100%;object-fit:cover;border-radius:14px;">` }
];

const OPENABLE = new Set(["x"]);

function createAppHTML(a) { return `<div class="app" data-app="${a.id}"><div class="ico ${a.cls}">${a.html}</div><div class="nm">${a.name}</div></div>`; }

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
    // 连上了！调用支线 x-app.js 里的初始化
    if (id === "x" && typeof initXApp === "function") {
      initXApp();
    }
  }
}

document.addEventListener("click", e => {
  if(e.target.closest("[data-home]")) {
    document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active"));
  }
});

function init(){
  applyWallpaper();
  updateClock(); setInterval(updateClock, 10000);
  renderWidgets();
  renderApps();
}
document.addEventListener("DOMContentLoaded", init);
function goHome() {
  document.querySelectorAll(".app-page").forEach(s => s.classList.remove("active"));
}