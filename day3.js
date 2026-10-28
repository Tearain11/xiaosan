/* Day 3 story: paced, choice-driven Messages conversations. */
(function(){
const KEY='day3StoryState', $=id=>document.getElementById(id);
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}};
const write=s=>localStorage.setItem(KEY,JSON.stringify(s));
function openMessages(){if(typeof openApp==='function')openApp('msg');if(typeof initMsgApp==='function')initMsgApp();}
function openBoyfriend(){openMessages();if(typeof closeKyoongChat==='function')closeKyoongChat();if(typeof openMsgChat==='function')openMsgChat();return $('chatArea');}
function openBaek(){openMessages();if(typeof closeMsgChat==='function')closeMsgChat();if(typeof openKyoongChat==='function')openKyoongChat();return $('kyoongArea');}
function clearOptions(){['msgOptions','kyoongOptions'].forEach(id=>{const e=$(id);if(e){e.innerHTML='';e.style.display='none';}});}
function add(area,who,line){if(!area)return;const fn=area.id==='kyoongArea'?window.addKyoongBubble:window.addMsgBubble;if(typeof fn==='function')fn(who,line);}
function options(area,items){const box=$(area&&area.id==='kyoongArea'?'kyoongOptions':'msgOptions');if(!box)return;box.innerHTML='';box.style.display='flex';items.forEach(([label,fn])=>{const b=document.createElement('button');b.textContent=label;b.style.cssText='padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;';b.onclick=()=>{box.style.display='none';fn();};box.appendChild(b);});}
function notifyBoyfriend(message,callback){
 let n=$('day3-bf-notice');if(n)n.remove();
 n=document.createElement('div');n.id='day3-bf-notice';
 n.style.cssText='position:fixed;z-index:99997;top:calc(env(safe-area-inset-top,0px) + 12px);left:14px;right:14px;display:flex;align-items:center;gap:11px;background:rgba(42,42,42,.96);color:#fff;border-radius:20px;padding:13px 15px;box-shadow:0 8px 28px #0005;font:14px -apple-system,BlinkMacSystemFont,sans-serif;cursor:pointer;backdrop-filter:blur(18px);';
 n.innerHTML='<div style="width:42px;height:42px;border-radius:50%;background:#8e8e93;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">👤</div><div style="min-width:0;flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><b>信息 · 男朋友</b><span style="font-size:11px;color:#bbb">现在</span></div><div style="font-size:13px;color:#f3f3f3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+message+'</div></div>';
 n.onclick=()=>{n.remove();const a=openBoyfriend();if(callback)callback(a);};document.body.appendChild(n);
 setTimeout(()=>{if(n.isConnected){n.style.transition='opacity .4s';n.style.opacity='0';setTimeout(()=>n.remove(),450);}},9000);
}
function begin(){
 if(localStorage.getItem('gameDay')!=='3')return;
 let s=read();
 if(s.version!==2){s={version:2,started:false,stage:'bf-cancel',route:'',done:false};write(s);}
 if(s.done)return;
 if(s.started){resume(s);return;}
 s.version=2;s.started=true;s.stage='bf-cancel';s.route='';write(s);
 notifyBoyfriend('宝宝，今天临时有事，晚上不能陪你了。',a=>{
   if(!a)return;a.innerHTML='';
   add(a,'them','宝宝，今天临时有点事，晚上不能陪你了。');
   add(a,'them','本来答应你的，抱歉。');
   s=read();s.stage='bf-apology-choice';write(s);
   options(a,[['好吧',()=>replyOkay()]]);
 });
}
function resume(s){
 if(s.stage==='bf-cancel')notifyBoyfriend('宝宝，今天临时有事，晚上不能陪你了。',a=>{a.innerHTML='';add(a,'them','宝宝，今天临时有点事，晚上不能陪你了。');add(a,'them','本来答应你的，抱歉。');options(a,[['好吧',replyOkay]]);});
 else if(s.stage==='bf-apology-choice'){const a=openBoyfriend();options(a,[['好吧',replyOkay]]);}
 else if(s.stage==='baek-ask'){const a=openBaek();options(a,[['今晚有空吗？',askBaek]]);}
 else if(s.stage==='baek-reply'){const a=openBaek();options(a,[['你要是没空，我就找别人了。',replyBaekPlayful],['那你今晚陪我，好不好？',replyBaekSweet]]);}
 else if(s.stage==='bf-sudden-free')notifyBoyfriend('宝宝，我这边忙完了。',showBoyfriendInvite);
 else if(s.stage==='bf-invite-choice'){const a=openBoyfriend();options(a,[['去见边伯贤',()=>chooseRoute('baek')],['答应男朋友',()=>chooseRoute('boyfriend')]]);}
 else if(s.stage==='tweet')showTweetNotice();
 else if(s.stage==='after')afterLike();
}
function replyOkay(){
 localStorage.setItem('dayTwoInviteSequenceStarted','true');
 let s=read();s.stage='baek-ask';write(s);const a=openBoyfriend();add(a,'me','好吧');clearOptions();
 setTimeout(()=>{const b=openBaek();if(!b)return;options(b,[['今晚有空吗？',askBaek]]);},450);
}
function askBaek(){
 let s=read();s.stage='baek-reply';write(s);const a=openBaek();add(a,'me','今晚有空吗？');clearOptions();
 setTimeout(()=>{add(a,'them','当然有。');setTimeout(()=>{add(a,'them','怎么，终于想起我了？');options(a,[['你要是没空，我就找别人了。',replyBaekPlayful],['那你今晚陪我，好不好？',replyBaekSweet]]);},550);},500);
}
function replyBaekPlayful(){const a=openBaek();add(a,'me','你要是没空，我就找别人了。');clearOptions();setTimeout(()=>{add(a,'them','别，姐姐，有我就够了嘛。');setTimeout(()=>{add(a,'them','七点可以？');options(a,[['完全可以。',confirmBaek]]);},550);},500);}
function replyBaekSweet(){const a=openBaek();add(a,'me','那你今晚陪我，好不好？');clearOptions();setTimeout(()=>{add(a,'them','当然好啊，姐姐。');setTimeout(()=>{add(a,'them','七点可以？');options(a,[['完全可以。',confirmBaek]]);},550);},500);}
function confirmBaek(){const a=openBaek();add(a,'me','完全可以。');clearOptions();setTimeout(()=>{add(a,'them','姐姐我订好啦。');setTimeout(()=>{add(a,'them','1708，等你哟>.<');options(a,[['知道了，笨小狗。',finishBaekInvite]]);},550);},500);}
function finishBaekInvite(){const a=openBaek();add(a,'me','知道了，笨小狗。');clearOptions();let s=read();s.stage='bf-sudden-free';write(s);setTimeout(()=>notifyBoyfriend('宝宝，我这边忙完了。',showBoyfriendInvite),700);}
function showBoyfriendInvite(a){
 if(!a)a=openBoyfriend();if(!a)return;
 add(a,'them','宝宝，我这边忙完了。');add(a,'them','比想象中结束得早。');add(a,'them','你现在在哪？我过去接你，晚上一起吃饭吧。');
 let s=read();s.stage='bf-invite-choice';write(s);
 options(a,[['去见边伯贤',()=>chooseRoute('baek')],['答应男朋友',()=>chooseRoute('boyfriend')]]);
}
function chooseRoute(route){let s=read();s.route=route;s.stage=route==='baek'?'baekBranch':'boyfriendBranch';write(s);clearOptions();if(route==='baek')finishA();else finishB();}
function finishA(){const a=openBoyfriend();if(!a)return;clearOptions();const lines=[['me','你怎么做事一直这么随便？'],['me','之前说没空的是你，现在突然说要见面的也是你。'],['me','我已经有别的安排了，别来接我。'],['them','……？'],['them','怎么突然生气了？'],['them','我不是想着忙完了就去找你吗。'],['them','你已经有安排了？'],['them','好吧，那你先忙。'],['them','结束了跟我说一声，宝宝。']];let i=0;const next=()=>{if(i>=lines.length){let s=read();s.stage='tweet';write(s);showTweetNotice();return;}add(a,lines[i][0],lines[i++][1]);setTimeout(next,650);};next();}
function finishB(){const a=openBoyfriend();if(!a)return;clearOptions();add(a,'me','好吧，那你来接我吧。');setTimeout(()=>add(a,'them','好，那你等我，我到了给你发消息。'),550);setTimeout(()=>add(a,'them','我到了，下楼吧。'),1100);setTimeout(()=>add(a,'me','来了。'),1650);setTimeout(()=>{const b=openBaek();if(!b)return;const lines=[['me','今晚先不去了。'],['me','临时有点事，下次再说吧。'],['them','？'],['them','姐姐，你这算放我鸽子吗？'],['them','我房间都订好了诶。'],['me','下次补给你。'],['them','这可是你说的。'],['them','不许赖账哦，姐姐。']];let i=0;const next=()=>{if(i>=lines.length){let s=read();s.stage='tweet';write(s);showTweetNotice();return;}add(b,lines[i][0],lines[i++][1]);setTimeout(next,650);};next();},2100);}
function showTweetNotice(){let s=read();s.stage='tweet';write(s);let n=$('day3-tweet-notice');if(n)return;n=document.createElement('div');n.id='day3-tweet-notice';n.style.cssText='position:fixed;z-index:99997;top:calc(env(safe-area-inset-top,0px) + 12px);left:14px;right:14px;display:flex;align-items:center;gap:11px;background:rgba(42,42,42,.96);color:#fff;border-radius:20px;padding:13px 15px;box-shadow:0 8px 28px #0005;font:14px -apple-system,BlinkMacSystemFont,sans-serif;cursor:pointer;backdrop-filter:blur(18px);';n.innerHTML='<img src="avatar.jpg" style="width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0"><div style="min-width:0;flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><b>Baek.</b><span style="font-size:11px;color:#bbb">现在</span></div><div style="font-size:13px;color:#f3f3f3">发布了新推文</div><div style="font-size:12px;color:#bbb;margin-top:2px">新角度怎么样？</div></div>';n.onclick=()=>{n.remove();if(typeof openApp==='function')openApp('x');};document.body.appendChild(n);}
function afterLike(){const s=read();const a=s.route==='baek'?openBaek():openBoyfriend();if(!a)return;clearOptions();if(s.route==='baek'){const lines=[['them','姐姐你到家了嘛？你有件东西落我车里了。'],['me','嗯？我不记得少了什么呀，是什么东西。'],['them','是我的心呀姐姐.......T_T'],['them','它明明在你身上的.....我好想你姐姐。'],['me','.......油嘴滑舌。'],['them','我只跟姐姐这样嘛，姐姐早点休息哦，今天也辛苦啦，晚安。']];let i=0;const next=()=>{if(i>=lines.length){endDay();return;}add(a,lines[i][0],lines[i++][1]);setTimeout(next,650);};next();}else{add(a,'them','宝宝，到家了嘛？');endDay();}}
function endDay(){const s=read();s.done=true;s.stage='done';write(s);localStorage.setItem('day3Finished','true');}
window.initDay3Story=begin;
window.day3AfterLike=function(){const s=read();if(s.stage!=='tweet'||s.liked)return;s.liked=true;s.stage='after';write(s);afterLike();};
window.addEventListener('load',()=>setTimeout(begin,1000));
})();