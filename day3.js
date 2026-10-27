/* Day 3: show every line inside the native Messages app chat bubbles. */
(function(){
const KEY='day3StoryState';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}};
const write=s=>localStorage.setItem(KEY,JSON.stringify(s));
const $=id=>document.getElementById(id);
function openMessages(){ if(typeof openApp==='function')openApp('msg'); if(typeof initMsgApp==='function')initMsgApp(); }
function boyfriendChat(){ openMessages(); if(typeof closeKyoongChat==='function')closeKyoongChat(); if(typeof openMsgChat==='function')openMsgChat(); return $('chatArea'); }
function baekChat(){ openMessages(); if(typeof closeMsgChat==='function')closeMsgChat(); if(typeof openKyoongChat==='function')openKyoongChat(); return $('kyoongArea'); }
function clearOptions(){['msgOptions','kyoongOptions'].forEach(id=>{const e=$(id);if(e){e.innerHTML='';e.style.display='none';}});}
function add(area,who,line){ if(!area)return; const baek=area.id==='kyoongArea'; const fn=baek?window.addKyoongBubble:window.addMsgBubble; if(typeof fn==='function')fn(who,line); }
function choices(area,items){const id=area&&area.id==='kyoongArea'?'kyoongOptions':'msgOptions';const box=$(id);if(!box)return;box.innerHTML='';box.style.display='flex';items.forEach(([label,fn])=>{const b=document.createElement('button');b.textContent=label;b.style.cssText='padding:12px;border-radius:12px;border:1px solid #007aff;background:#fff;color:#007aff;font-size:14px;text-align:left;line-height:1.45;';b.onclick=()=>{box.style.display='none';fn();};box.appendChild(b);});}
function sequence(area,lines,done){let i=0;const next=()=>{if(i>=lines.length){if(done)done();return;}add(area,lines[i].who,lines[i++].text);setTimeout(next,500);};next();}
function begin(){
 let s=read(); if(s.done||localStorage.getItem('gameDay')!=='3')return;
 if(s.started){resume(s);return;}
 s.started=true;s.stage='cancel';s.route='';write(s);
 const a=boyfriendChat();if(!a)return;
 a.innerHTML='';
 add(a,'them','宝宝，今天临时有点事，晚上不能陪你了。');
 add(a,'them','本来答应你的，抱歉。');
 choices(a,[['去找边伯贤聊天',appointment]]);
 localStorage.setItem('day3StoryState',JSON.stringify(s));
}
function resume(s){
 if(s.stage==='cancel'){const a=boyfriendChat();choices(a,[['去找边伯贤聊天',appointment]]);}
 else if(s.stage==='appointment'){appointment();}
 else if(s.stage==='decision'){showDecision();}
 else if(s.stage==='baekBranch'){finishA();}
 else if(s.stage==='boyfriendBranch'){finishB();}
 else if(s.stage==='tweet'){showTweetNotice();}
 else if(s.stage==='after'){afterLike();}
}
function appointment(){
 let s=read();s.stage='appointment';write(s);
 const a=baekChat();if(!a)return;
 a.innerHTML='';
 sequence(a,[
 {who:'me',text:'今晚有空吗？'},
 {who:'them',text:'当然有。'},
 {who:'them',text:'怎么，终于想起我了？'},
 {who:'me',text:'你要是没空，我就找别人了。'},
 {who:'them',text:'别，姐姐，有我就够了嘛。'},
 {who:'them',text:'七点可以？'},
 {who:'me',text:'完全可以。'},
 {who:'them',text:'姐姐我订好啦。'},
 {who:'them',text:'1708，等你哟>.<'},
 {who:'me',text:'知道了，笨小狗。'}
 ],()=>{s=read();s.stage='decision';write(s);setTimeout(showDecision,450);});
}
function showDecision(){
 let s=read();if(s.route)return;
 const a=boyfriendChat();if(!a)return;
 add(a,'them','宝宝，我这边忙完了。');
 add(a,'them','比想象中结束得早。');
 add(a,'them','你现在在哪？我过去接你，晚上一起吃饭吧。');
 choices(a,[['去见边伯贤',()=>{s=read();s.route='baek';s.stage='baekBranch';write(s);finishA();}],['答应男朋友',()=>{s=read();s.route='boyfriend';s.stage='boyfriendBranch';write(s);finishB();}]]);
}
function finishA(){
 const a=boyfriendChat();if(!a)return;clearOptions();
 sequence(a,[
 {who:'me',text:'你怎么做事一直这么随便？'},
 {who:'me',text:'之前说没空的是你，现在突然说要见面的也是你。'},
 {who:'me',text:'我已经有别的安排了，别来接我。'},
 {who:'them',text:'……？'},
 {who:'them',text:'怎么突然生气了？'},
 {who:'them',text:'我不是想着忙完了就去找你吗。'},
 {who:'them',text:'你已经有安排了？'},
 {who:'them',text:'好吧，那你先忙。'},
 {who:'them',text:'结束了跟我说一声，宝宝。'}
 ],()=>{const s=read();s.stage='baekMeet';write(s);setTimeout(()=>{const b=baekChat();if(b){add(b,'them','七点见，姐姐。别迟到哦。');s.stage='tweet';write(s);showTweetNotice();}},650);});
}
function finishB(){
 const a=boyfriendChat();if(!a)return;clearOptions();
 sequence(a,[
 {who:'me',text:'好吧，那你来接我吧。'},
 {who:'them',text:'好，那你等我，我到了给你发消息。'},
 {who:'them',text:'我到了，下楼吧。'},
 {who:'me',text:'来了。'}
 ],()=>{const b=baekChat();if(!b)return;sequence(b,[
 {who:'me',text:'今晚先不去了。'},
 {who:'me',text:'临时有点事，下次再说吧。'},
 {who:'them',text:'？'},
 {who:'them',text:'姐姐，你这算放我鸽子吗？'},
 {who:'them',text:'我房间都订好了诶。'},
 {who:'me',text:'下次补给你。'},
 {who:'them',text:'这可是你说的。'},
 {who:'them',text:'不许赖账哦，姐姐。'}
 ],()=>{const s=read();s.stage='tweet';write(s);showTweetNotice();});});
}
function showTweetNotice(){
 let s=read();s.stage='tweet';write(s);
 const old=$('day3-notice');if(old)return;
 const n=document.createElement('div');n.id='day3-notice';n.style.cssText='position:fixed;z-index:99997;top:calc(env(safe-area-inset-top, 0px) + 12px);left:14px;right:14px;display:flex;align-items:center;gap:11px;background:rgba(42,42,42,.96);color:#fff;border-radius:20px;padding:13px 15px;box-shadow:0 8px 28px #0005;font:14px -apple-system,BlinkMacSystemFont,sans-serif;cursor:pointer;backdrop-filter:blur(18px);';
 n.innerHTML='<img src="avatar.jpg" style="width:42px;height:42px;border-radius:50%;object-fit:cover;flex-shrink:0"><div style="min-width:0;flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><b style="font-size:14px">Baek.</b><span style="font-size:11px;color:#bbb">现在</span></div><div style="font-size:13px;color:#f3f3f3">发布了新推文</div><div style="font-size:12px;color:#bbb;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">新角度怎么样？</div></div>';
 n.onclick=()=>{n.remove();if(typeof openApp==='function')openApp('x');};document.body.appendChild(n);
}
function afterLike(){
 const s=read();const a=s.route==='baek'?baekChat():boyfriendChat();if(!a)return;clearOptions();
 if(s.route==='baek'){
 sequence(a,[
 {who:'them',text:'姐姐你到家了嘛？你有件东西落我车里了。'},
 {who:'me',text:'嗯？我不记得少了什么呀，是什么东西。'},
 {who:'them',text:'是我的心呀姐姐.......T_T'},
 {who:'them',text:'它明明在你身上的.....我好想你姐姐。'},
 {who:'me',text:'.......油嘴滑舌。'},
 {who:'them',text:'我只跟姐姐这样嘛，姐姐早点休息哦，今天也辛苦啦，晚安。'}
 ],endDay);
 }else{sequence(a,[{who:'them',text:'宝宝，到家了嘛？'}],endDay);}
}
function endDay(){const s=read();s.done=true;s.stage='done';write(s);localStorage.setItem('day3Finished','true');const n=document.createElement('div');n.style.cssText='position:fixed;z-index:99997;left:20px;right:20px;bottom:55px;background:#fff;color:#111;border-radius:16px;padding:14px;text-align:center;box-shadow:0 4px 20px #0003;font:14px sans-serif';n.textContent='第三天剧情已结束';document.body.appendChild(n);setTimeout(()=>n.remove(),3000);}
window.initDay3Story=begin;
window.day3AfterLike=function(){const s=read();if(s.stage!=='tweet'||s.liked)return;s.liked=true;s.stage='after';write(s);afterLike();};
window.addEventListener('load',()=>setTimeout(begin,1000));
})();