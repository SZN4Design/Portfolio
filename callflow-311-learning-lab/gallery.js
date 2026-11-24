/* CallFlow desktop screenshot gallery — no third-party libraries. */
(() => {
  'use strict';
  const dialog = document.getElementById('cf-gallery');
  const triggers = [...document.querySelectorAll('.cf-gallery-trigger')];
  if (!dialog || !triggers.length || !dialog.showModal) return;

  const image = document.getElementById('cf-gallery-image');
  const frame = document.getElementById('cf-gallery-image-wrap');
  const caption = document.getElementById('cf-gallery-caption');
  const counter = document.getElementById('cf-gallery-counter');
  const previous = document.getElementById('cf-gallery-prev');
  const next = document.getElementById('cf-gallery-next');
  const close = document.getElementById('cf-gallery-close');
  const zoom = document.getElementById('cf-gallery-zoom');
  let active = 0;
  let opener = null;
  let touchX = null;
  let touchY = null;
  let lastWheelNav = 0;

  const setActive = i => {
    active = (i + triggers.length) % triggers.length;
    const trigger = triggers[active];
    const thumb = trigger.querySelector('img');
    image.src = trigger.dataset.fullImage;
    image.alt = thumb?.alt || 'CallFlow desktop screenshot';
    caption.textContent = trigger.closest('figure')?.querySelector('figcaption')?.textContent.trim() || image.alt;
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(triggers.length).padStart(2, '0')}`;
    dialog.classList.remove('is-zoomed');
    zoom.setAttribute('aria-pressed', 'false');
    zoom.textContent = 'Zoom in';
    frame.scrollTo({top: 0, left: 0, behavior: 'instant'});
  };

  const shift = step => setActive(active + step);
  triggers.forEach((trigger, i) => trigger.addEventListener('click', () => {
    opener = trigger;
    setActive(i);
    dialog.showModal();
    document.body.classList.add('cf-gallery-open');
    close.focus();
  }));
  previous.addEventListener('click', () => shift(-1));
  next.addEventListener('click', () => shift(1));
  close.addEventListener('click', () => dialog.close());
  zoom.addEventListener('click', () => {
    const isZoomed = dialog.classList.toggle('is-zoomed');
    zoom.textContent = isZoomed ? 'Fit image' : 'Zoom in';
    zoom.setAttribute('aria-pressed', String(isZoomed));
    frame.scrollTo({top: 0, left: 0, behavior: 'instant'});
  });

  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      shift(e.key === 'ArrowLeft' ? -1 : 1);
    }
    // Escape closes the native dialog, including for keyboard and screen-reader users.
  });
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('cf-gallery-open');
    dialog.classList.remove('is-zoomed');
    image.removeAttribute('src');
    opener?.focus();
  });

  // Swipe sideways on touch devices to browse desktop screenshots.
  frame.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) return;
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, {passive:true});
  frame.addEventListener('touchend', e => {
    if (touchX === null || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.4 && !dialog.classList.contains('is-zoomed')) shift(dx < 0 ? 1 : -1);
  }, {passive:true});

  // A horizontal trackpad scroll moves between screenshots; vertical scroll
  // stays available for viewing enlarged images, rather than being hijacked.
  frame.addEventListener('wheel', e => {
    if (dialog.classList.contains('is-zoomed') || Math.abs(e.deltaX) < 35 || Math.abs(e.deltaX) < Math.abs(e.deltaY) * 1.3) return;
    const now = Date.now();
    if (now - lastWheelNav < 550) return;
    lastWheelNav = now;
    e.preventDefault();
    shift(e.deltaX > 0 ? 1 : -1);
  }, {passive:false});
})();
