(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: 0.035 });
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  const dialog = document.getElementById('project-image-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = document.getElementById('project-dialog-image');
  const label = document.getElementById('project-dialog-label');
  const original = document.getElementById('project-dialog-original');
  const close = document.getElementById('project-dialog-close');
  const zoom = document.getElementById('project-dialog-zoom');
  let previousFocus;
  document.querySelectorAll('[data-full-image]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault(); previousFocus = trigger;
      image.src = trigger.dataset.fullImage;
      image.alt = trigger.dataset.imageLabel || 'Project design';
      label.textContent = image.alt; original.href = image.src;
      dialog.classList.remove('zoomed'); zoom.textContent = 'Zoom in'; zoom.setAttribute('aria-pressed','false');
      dialog.showModal(); dialog.scrollTop = 0;
      document.body.classList.add('modal-open'); close.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  zoom.addEventListener('click', () => {
    const expanded = dialog.classList.toggle('zoomed');
    zoom.textContent = expanded ? 'Fit image' : 'Zoom in'; zoom.setAttribute('aria-pressed', String(expanded));
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open'); image.removeAttribute('src'); previousFocus?.focus();
  });
})();
