/* Optional, event-driven effects. HTML and the complete orbit are visible without JS. */
(() => {
 'use strict';
 const root = document.documentElement;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const pointer = matchMedia('(hover: hover) and (pointer: fine)');
 const animations = new Set();
 let preference = null, enabled = !reduced.matches;
 let pointerFrame = 0, toastTimer = 0;
 let resetSculpture = () => {};
 const boot = (name, fn) => { try { fn(); } catch (error) {
  console.warn(`[portfolio] ${name} enhancement unavailable`, error instanceof Error ? error.message : 'unknown');
 } };
 try { preference = localStorage.getItem('portfolio-motion'); } catch { /* Storage is optional. */ }
 const canAnimate = () => enabled && document.visibilityState !== 'hidden';
 const animate = el => {
  if (!canAnimate() || typeof el.animate !== 'function') return;
  const animation = el.animate(
   [{opacity:.7, transform:'translateY(8px)'}, {opacity:1, transform:'none'}],
   {duration:300, easing:'ease-out'}
  );
  animations.add(animation);
  animation.finished.catch(() => {}).finally(() => animations.delete(animation));
 };
 const stop = () => {
  animations.forEach(animation => animation.cancel()); animations.clear();
  cancelAnimationFrame(pointerFrame); pointerFrame = 0;
  resetSculpture();
 };
 boot('motion', () => {
  const button = document.querySelector('[data-motion-toggle]');
  const apply = () => {
   enabled = !reduced.matches && preference !== 'off';
   root.dataset.motion = enabled ? 'on' : 'off';
   if (!enabled) stop();
   if (!button) return;
   button.hidden = false; button.disabled = reduced.matches;
   button.setAttribute('aria-pressed', String(enabled));
   const label = reduced.matches ? '동작 줄이기 적용' : enabled ? '모션 끄기' : '모션 켜기';
   button.setAttribute('aria-label', label);
   button.title = reduced.matches ? '기기의 동작 줄이기 설정을 따릅니다.' : label;
   button.querySelector('[data-motion-label]').textContent = label;
   button.querySelector('.motion-icon').textContent = enabled ? 'Ⅱ' : '▶';
  };
  apply(); reduced.addEventListener('change', apply);
  button?.addEventListener('click', () => {
   preference = enabled ? 'off' : 'on';
   try { localStorage.setItem('portfolio-motion', preference); } catch {}
   apply();
  });
  window.addEventListener('storage', event => {
   if (event.key === 'portfolio-motion' || event.key === null) { preference = event.newValue; apply(); }
  });
 });
 boot('entrance', () => {
  if (!('IntersectionObserver' in window)) return;
  // Never fade the hero or an ancestor of 3D art: opacity can flatten a 3D subtree.
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    animate(entry.target); observer.unobserve(entry.target);
   }
  }, {threshold:.1});
  document.querySelectorAll('[data-enter]').forEach(el => {
   if ((!el.closest('.project-card,.hero') || el.matches('.project-info')) && !el.querySelector('.orbit-set,.water-rings,.module-stack')) observer.observe(el);
  });
 });
 boot('sculpture', () => {
  const stage = document.querySelector('[data-sculpture]');
  const orbit = stage?.querySelector('.orbit-set');
  if (!orbit || !('IntersectionObserver' in window)) return;
  let visible = false, bounds = null, x = 0, y = 0;
  resetSculpture = () => { bounds = null; orbit.style.removeProperty('transform'); };
  const observer = new IntersectionObserver(entries => {
   visible = entries[0].isIntersecting;
   if (!visible) { cancelAnimationFrame(pointerFrame); pointerFrame = 0; resetSculpture(); }
  });
  observer.observe(stage);
  const allowed = () => visible && canAnimate() && pointer.matches && !navigator.connection?.saveData;
  stage.addEventListener('pointerenter', () => { bounds = null; }, {passive:true});
  stage.addEventListener('pointermove', event => {
   if (!allowed() || event.pointerType === 'touch') return;
   x = event.clientX; y = event.clientY;
   if (pointerFrame) return;
   pointerFrame = requestAnimationFrame(() => {
    pointerFrame = 0;
    if (!allowed()) return;
    // Read geometry only after entry/resize/scroll, before writing a transform.
    bounds ??= stage.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const dx = Math.max(-.5, Math.min(.5, (x-bounds.left)/bounds.width-.5));
    const dy = Math.max(-.5, Math.min(.5, (y-bounds.top)/bounds.height-.5));
    orbit.style.transform = `rotateX(${42-dy*8}deg) rotateY(${-28+dx*10}deg) rotateZ(${-35+dx*3}deg)`;
   });
  }, {passive:true});
  stage.addEventListener('pointerleave', () => {
   cancelAnimationFrame(pointerFrame); pointerFrame = 0; resetSculpture();
  }, {passive:true});
  window.addEventListener('resize', () => { bounds = null; }, {passive:true});
  window.addEventListener('scroll', () => { bounds = null; }, {passive:true});
  pointer.addEventListener('change', () => { if (!pointer.matches) resetSculpture(); });
 });
 // Reading progress remains CSS scroll-timeline driven; no JS progress loop.
 boot('copy', () => {
  const button = document.querySelector('[data-copy-email]');
  const status = document.querySelector('[data-copy-status]');
  const link = document.querySelector('.contact-email');
  if (!button || !status || !link || !navigator.clipboard?.writeText) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
   button.disabled = true; clearTimeout(toastTimer); let message;
   try { await navigator.clipboard.writeText(link.getAttribute('href').slice(7)); message = '이메일 주소를 복사했습니다.'; }
   catch { message = '복사 권한이 없습니다. 위 이메일 주소를 선택해 직접 복사해주세요.'; }
   finally { button.disabled = false; }
   status.classList.remove('sr-only'); status.textContent = message;
   toastTimer = setTimeout(() => { status.textContent = ''; status.classList.add('sr-only'); }, 6500);
  });
 });
 boot('legacy anchors', () => {
  const aliases = {'#resume':'#about','#side':'#projects','#closing':'#contact','#workstyle':'#approach','#deepdive':'#projects','#keywords':'#about'};
  const resolve = () => {
   let hash = location.hash;
   if (aliases[hash]) {
    hash = aliases[hash]; history.replaceState(history.state, '', `${location.pathname}${location.search}${hash}`);
    document.querySelector(hash)?.scrollIntoView({behavior:'instant', block:'start'});
   }
   if (hash === '#more-work') {
    const archive = document.getElementById('more-work');
    if (archive instanceof HTMLDetailsElement) archive.open = true;
   }
  };
  resolve(); window.addEventListener('hashchange', resolve);
 });
 document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') stop(); });
 window.addEventListener('pageshow', resetSculpture);
 window.addEventListener('pagehide', () => { stop(); clearTimeout(toastTimer); });
})();
