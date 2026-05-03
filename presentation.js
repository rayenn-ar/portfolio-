(function () {
  'use strict';

  const TOTAL = 14;
  let current = 0;
  let animating = false;

  const container    = document.getElementById('slides-container');
  const slides       = Array.from(container.querySelectorAll('.slide'));
  const btnPrev      = document.getElementById('btn-prev');
  const btnNext      = document.getElementById('btn-next');
  const btnFS        = document.getElementById('btn-fullscreen');
  const progressTxt  = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-bar-fill');

  /* ── Init slides ── */
  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    if (i === 0) s.classList.add('active');
  });

  /* ── Update chrome ── */
  function updateChrome() {
    progressTxt.textContent = `${current + 1} / ${TOTAL}`;
    progressFill.style.width = `${((current + 1) / TOTAL) * 100}%`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === TOTAL - 1;
    btnPrev.style.opacity = current === 0 ? '0.3' : '1';
    btnNext.style.opacity = current === TOTAL - 1 ? '0.3' : '1';
  }

  /* ── Video management ── */
  function manageVideos(targetIndex) {
    slides.forEach((slide, i) => {
      slide.querySelectorAll('video').forEach(v => {
        if (i !== targetIndex) v.pause();
      });
    });
  }

  /* ── Slide transition ── */
  function goTo(next) {
    if (next === current || next < 0 || next >= TOTAL || animating) return;
    animating = true;

    const leaving  = slides[current];
    const entering = slides[next];
    const forward  = next > current;

    entering.classList.remove('prev');
    entering.style.transform = forward ? 'translateX(100%)' : 'translateX(-100%)';
    entering.classList.add('active');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        entering.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
        entering.style.transform  = 'translateX(0)';
        leaving.style.transition  = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
        leaving.style.transform   = forward ? 'translateX(-100%)' : 'translateX(100%)';
      });
    });

    setTimeout(() => {
      leaving.classList.remove('active');
      leaving.classList.add('prev');
      leaving.style.transform  = '';
      leaving.style.transition = '';
      entering.style.transition = '';
      current = next;
      updateChrome();
      manageVideos(current);
      animating = false;
    }, 460);
  }

  /* ══════════════════════════════════════════════
     FULLSCREEN
  ══════════════════════════════════════════════ */
  function isFullscreen() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen)       return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.mozRequestFullScreen)    return el.mozRequestFullScreen();
    if (el.msRequestFullscreen)     return el.msRequestFullscreen();
  }

  function exitFullscreen() {
    if (document.exitFullscreen)       return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.mozCancelFullScreen)  return document.mozCancelFullScreen();
    if (document.msExitFullscreen)     return document.msExitFullscreen();
  }

  function toggleFullscreen() {
    isFullscreen() ? exitFullscreen() : enterFullscreen();
  }

  function updateFSButton() {
    if (isFullscreen()) {
      btnFS.textContent = '⛶';
      btnFS.title       = 'F — Quitter le plein écran';
      btnFS.setAttribute('aria-label', 'Quitter le plein écran');
      btnFS.classList.add('fs-active');
    } else {
      btnFS.textContent = '⛶';
      btnFS.title       = 'F — Plein écran';
      btnFS.setAttribute('aria-label', 'Plein écran');
      btnFS.classList.remove('fs-active');
    }
  }

  btnFS.addEventListener('click', toggleFullscreen);

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange']
    .forEach(evt => document.addEventListener(evt, updateFSButton));

  /* ── Navigation buttons ── */
  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  /* ── Keyboard ── */
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        goTo(current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goTo(current - 1);
        break;
      case 'Home':
        e.preventDefault();
        goTo(0);
        break;
      case 'End':
        e.preventDefault();
        goTo(TOTAL - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        /* Browser handles Escape to exit fullscreen natively */
        break;
    }
  });

  /* ── Mouse wheel (blocked, used for nav) ── */
  let wheelCooldown = false;
  document.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (wheelCooldown) return;
    wheelCooldown = true;
    setTimeout(() => { wheelCooldown = false; }, 600);
    goTo(e.deltaY > 0 ? current + 1 : current - 1);
  }, { passive: false });

  /* ── Touch / swipe ── */
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      goTo(dx > 0 ? current + 1 : current - 1);
    } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
      goTo(dy > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  /* ── Lazy preload nearby videos ── */
  function preloadNearby() {
    [-1, 0, 1].forEach(offset => {
      const idx = current + offset;
      if (idx >= 0 && idx < TOTAL) {
        slides[idx].querySelectorAll('video[preload="metadata"]').forEach(v => {
          if (!v.dataset.loaded) { v.load(); v.dataset.loaded = '1'; }
        });
      }
    });
  }

  /* ── Init ── */
  updateChrome();
  updateFSButton();
  preloadNearby();
  setInterval(preloadNearby, 1000);

})();
