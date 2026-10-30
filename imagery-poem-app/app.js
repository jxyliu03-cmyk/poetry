// Paste your deployed Google Apps Script /exec URL between the quotes.
const REQUEST_ENDPOINT = 'https://script.google.com/macros/s/AKfycbywsAcadklAKZ9TK4n1YDybXv5vgxowEhLyazlpEgkKoABGoJT5pHRm5Y8ktMkUhhyR/exec';

const motifs = [
  { id:'wind', glyph:'〰', name:'Wind / Season', lines:['晚风把未说完的话吹向更远的季节','季风沿着衣袖缓慢上升','风替沉默翻过一页'] },
  { id:'rain', glyph:'⠇', name:'Rain / Snow / Mist', lines:['雨停在屋檐最暗的一寸','雪在车窗上练习告别','雾气把旧路重新交给清晨'] },
  { id:'moon', glyph:'◐', name:'Moon / Dawn', lines:['弯月泊在天光的折痕里','黎明从群山之间取回名字','日出将我们的影子分向两岸'] },
  { id:'mountain', glyph:'△', name:'Mountain / Plain', lines:['山脉在远处展开沉默','荒原收下所有没有回答的问题','草原把归途铺到视线之外'] },
  { id:'water', glyph:'≈', name:'River / Tide', lines:['江水替时间保留一道回声','湖心轻轻托住倾斜的天色','潮汐从身体深处往返'] },
  { id:'door', glyph:'⌑', name:'Door / Passage', lines:['一座拱门正在身后褪色','回廊把脚步送回多年以前','门槛两侧住着不同的我们'] },
  { id:'light', glyph:'✦', name:'Lamp / Fire', lines:['两盏灯在黑暗里互相辨认','焰火短暂照亮河流的骨骼','微光从掌纹里慢慢醒来'] },
  { id:'cosmos', glyph:'⦿', name:'Cosmos / Star', lines:['宇宙在一粒尘埃里失去边界','奇点容纳了丰盈与衰亡','星群替我们继续无穷的计算'] },
  { id:'road', glyph:'↗', name:'Road / Return', lines:['道路从脚下分岔成许多以后','我们奔跑，像要赶上自己的回声','归途在每一次回望中改变方向'] },
  { id:'body', glyph:'◇', name:'Body / Object', lines:['掌心藏着一件褪色的小事','伤痕比语言更早记住那一年','一件旧物让宏大的黄昏突然安静'] },
  { id:'youth', glyph:'Ⅱ', name:'Youth / Time', lines:['少年在旧课桌前想象以后','童年从一阵广播声里返回','远处的青年与此刻同时抬头'] },
  { id:'city', glyph:'▥', name:'City / Elsewhere', lines:['异乡在车窗外退成一层薄雪','街尾的花把城市染得很轻','城市用无数窗口保存孤独'] }
];

const bridges = [
  '从这里望去，过去与未来同时发生',
  '一瞬太短，一生又来不及解释',
  '日常露出一道缝，浩瀚便从那里进入',
  '我们并肩，像两句尚未押韵的话',
  '我以为自己已经离开，却仍站在原点附近'
];
const turns = [
  '世界忽然拉远，我们只是其中两个微小的坐标',
  '有限的身体站在无垠的场域中',
  '很多年后，记忆仍从日常里忽然显影',
  '没有谁回答那年留下的问题'
];
const endings = [
  '原来亏欠也是爱留下的形状',
  '而无垠并不遥远，它从一次凝望开始',
  '日出之后，未完成的生命再次启程',
  '世界向前，而怀念缓慢地朝我走来',
  '此刻不必谈来世，我们正共享一小段光'
];

const motifGrid=document.querySelector('#motif-grid');
const poemEl=document.querySelector('#poem');
const metaEl=document.querySelector('#result-meta');
const copyBtn=document.querySelector('#copy');
const regenBtn=document.querySelector('#regenerate');
const requestForm=document.querySelector('#request-form');
const requestStatus=document.querySelector('#request-status');
let lastPoem='';

function pick(list){return list[Math.floor(Math.random()*list.length)];}
function shuffled(list){return [...list].sort(()=>Math.random()-.5);}

motifs.forEach((motif)=>{
  const button=document.createElement('button');
  button.type='button'; button.className='motif'; button.dataset.id=motif.id;
  button.setAttribute('aria-pressed','false');
  button.innerHTML=`<span class="glyph">${motif.glyph}</span><span class="name">${motif.name}</span>`;
  button.addEventListener('click',()=>{
    const selected=button.classList.toggle('selected');
    button.setAttribute('aria-pressed',String(selected));
    if(document.querySelectorAll('.motif.selected').length>5){
      button.classList.remove('selected'); button.setAttribute('aria-pressed','false');
      button.animate([{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:240});
    }
    syncRequestImages();
  });
  motifGrid.appendChild(button);
});

function selectedMotifs(){return [...document.querySelectorAll('.motif.selected')].map(el=>motifs.find(m=>m.id===el.dataset.id));}
function syncRequestImages(){document.querySelector('#request-images').value=selectedMotifs().map(m=>m.name).join(', ');}
function selectRandom(){
  document.querySelectorAll('.motif').forEach(el=>{el.classList.remove('selected');el.setAttribute('aria-pressed','false');});
  shuffled([...document.querySelectorAll('.motif')]).slice(0,3).forEach(el=>{el.classList.add('selected');el.setAttribute('aria-pressed','true');});
  syncRequestImages();
}
function generatePoem(){
  let chosen=selectedMotifs();
  if(chosen.length<2){selectRandom();chosen=selectedMotifs();}
  const imageLines=shuffled(chosen).map(m=>pick(m.lines));
  const lines=[imageLines[0],imageLines[1],pick(bridges),...imageLines.slice(2),pick(turns),pick(endings)];
  lastPoem=lines.join('\n');
  poemEl.classList.remove('empty');
  poemEl.innerHTML=lines.map((line,index)=>`<p style="animation-delay:${index*70}ms">${line}</p>`).join('');
  metaEl.textContent=chosen.map(m=>m.name).join(' · ');
  copyBtn.disabled=false; regenBtn.disabled=false;
}

document.querySelector('#randomize').addEventListener('click',selectRandom);
document.querySelector('#generate').addEventListener('click',generatePoem);
regenBtn.addEventListener('click',generatePoem);
copyBtn.addEventListener('click',async()=>{
  await navigator.clipboard.writeText(lastPoem); copyBtn.textContent='Copied';
  setTimeout(()=>{copyBtn.textContent='Copy';},1400);
});

if(REQUEST_ENDPOINT.startsWith('https://script.google.com/')) requestForm.action=REQUEST_ENDPOINT;
else requestStatus.textContent='Connect the Gmail endpoint before publishing.';

requestForm.addEventListener('submit',(event)=>{
  if(!REQUEST_ENDPOINT.startsWith('https://script.google.com/')){
    event.preventDefault(); requestStatus.textContent='This request box is not connected yet.'; return;
  }
  requestStatus.textContent='Sending…';
  window.setTimeout(()=>{requestStatus.textContent='Your request is on its way to Jamie.';requestForm.reset();syncRequestImages();},1200);
});

selectRandom();
