/* Optional effects. Native links and readable HTML work even if initialization fails. */
(() => {
 'use strict';
 const root=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const pointer=matchMedia('(hover: hover) and (pointer: fine)');
 const animations=new Set();
 let preference=null, enabled=!reduced.matches, pointerFrame=0, scrollFrame=0, toastTimer=0;
 const boot=(name,fn)=>{try{fn();}catch(error){console.warn(`[portfolio] ${name} enhancement unavailable`,error instanceof Error?error.message:'unknown');}};
 try{preference=localStorage.getItem('portfolio-motion');}catch{/* Storage may be disabled. */}
 const canAnimate=()=>enabled&&document.visibilityState!=='hidden';
 const animate=(el,frames,options)=>{
  if(!canAnimate()||typeof el.animate!=='function')return;
  const a=el.animate(frames,options);animations.add(a);
  a.finished.catch(()=>{}).finally(()=>animations.delete(a));
 };
 const stop=()=>{animations.forEach(a=>a.cancel());animations.clear();cancelAnimationFrame(pointerFrame);pointerFrame=0;document.querySelector('.orbit-set')?.style.removeProperty('transform');};
 boot('motion',()=>{
  const button=document.querySelector('[data-motion-toggle]');
  const apply=()=>{
   enabled=!reduced.matches&&preference!=='off';root.dataset.motion=enabled?'on':'off';if(!enabled)stop();
   if(!button)return;
   button.hidden=false;button.disabled=reduced.matches;button.setAttribute('aria-pressed',String(enabled));
   const label=reduced.matches?'동작 줄이기 적용':enabled?'모션 끄기':'모션 켜기';
   button.setAttribute('aria-label',label);button.title=reduced.matches?'기기의 동작 줄이기 설정을 따릅니다.':label;
   button.querySelector('[data-motion-label]').textContent=label;
   button.querySelector('.motion-icon').textContent=enabled?'Ⅱ':'▶';
  };
  apply();reduced.addEventListener('change',apply);
  button?.addEventListener('click',()=>{preference=enabled?'off':'on';try{localStorage.setItem('portfolio-motion',preference);}catch{}apply();});
  window.addEventListener('storage',e=>{if(e.key==='portfolio-motion'){preference=e.newValue;apply();}});
 });
 boot('entrance',()=>{
  document.querySelectorAll('[data-hero-title]').forEach(el=>animate(el,[{opacity:.4,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.2,.75,.25,1)'}));
  if(!('IntersectionObserver'in window))return;
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;animate(entry.target,[{opacity:.45,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.75,.25,1)'});observer.unobserve(entry.target);}},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('[data-enter]').forEach(el=>observer.observe(el));window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 });
 boot('sculpture',()=>{
  const stage=document.querySelector('[data-sculpture]'),orbit=stage?.querySelector('.orbit-set');if(!orbit)return;
  animate(orbit,[{transform:'rotateX(62deg) rotateY(-44deg) rotateZ(-50deg)',opacity:.2},{transform:'rotateX(42deg) rotateY(-28deg) rotateZ(-35deg)',opacity:1}],{duration:1800,easing:'cubic-bezier(.2,.75,.25,1)'});
  let x=0,y=0;
  stage.addEventListener('pointermove',event=>{if(!canAnimate()||!pointer.matches||event.pointerType==='touch')return;x=event.clientX;y=event.clientY;if(pointerFrame)return;pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!canAnimate())return;const b=stage.getBoundingClientRect();const dx=Math.max(-.5,Math.min(.5,(x-b.left)/b.width-.5)),dy=Math.max(-.5,Math.min(.5,(y-b.top)/b.height-.5));orbit.style.transform=`rotateX(${42-dy*12}deg) rotateY(${-28+dx*16}deg) rotateZ(${-35+dx*5}deg)`;});},{passive:true});
  stage.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);pointerFrame=0;orbit.style.removeProperty('transform');});
 });
 boot('progress',()=>{
  const bar=document.querySelector('.reading-progress');if(!bar)return;
  const update=()=>{scrollFrame=0;if(!enabled)return;const height=Math.max(1,document.documentElement.scrollHeight-innerHeight);bar.style.transform=`scaleX(${Math.min(1,Math.max(0,scrollY/height))})`;};
  const schedule=()=>{if(!scrollFrame&&enabled)scrollFrame=requestAnimationFrame(update);};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});document.addEventListener('toggle',schedule,true);update();
 });
 boot('copy',()=>{
  const button=document.querySelector('[data-copy-email]'),status=document.querySelector('[data-copy-status]'),link=document.querySelector('.contact-email');
  if(!button||!status||!link||!navigator.clipboard?.writeText)return;button.hidden=false;
  button.addEventListener('click',async()=>{button.disabled=true;clearTimeout(toastTimer);let message;
   try{await navigator.clipboard.writeText(link.getAttribute('href').slice(7));message='이메일 주소를 복사했습니다.';}
   catch{message='복사 권한이 없습니다. 위 이메일 주소를 선택해 직접 복사해주세요.';}
   finally{button.disabled=false;}
   status.classList.remove('sr-only');status.textContent=message;toastTimer=setTimeout(()=>{status.textContent='';status.classList.add('sr-only');},6500);
  });
 });
 boot('legacy anchors',()=>{
  const aliases={'#resume':'#about','#side':'#projects','#closing':'#contact','#workstyle':'#approach','#deepdive':'#projects','#keywords':'#about'};
  const resolve=()=>{let hash=location.hash;if(aliases[hash]){hash=aliases[hash];history.replaceState(history.state,'',`${location.pathname}${location.search}${hash}`);document.querySelector(hash)?.scrollIntoView({behavior:'instant',block:'start'});}if(hash==='#more-work'){const archive=document.getElementById('more-work');if(archive instanceof HTMLDetailsElement)archive.open=true;}};
  resolve();window.addEventListener('hashchange',resolve);
 });
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){stop();cancelAnimationFrame(scrollFrame);scrollFrame=0;}});
 window.addEventListener('pagehide',()=>{stop();cancelAnimationFrame(scrollFrame);clearTimeout(toastTimer);});
})();
