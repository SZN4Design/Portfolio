(() => {
  const lines = [...document.querySelectorAll(".zoom-line")];
  const scrollCue = document.getElementById("scrollCue");
  const ctaSection = document.getElementById("ctaSection");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let ticking = false;
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const nav = document.getElementById("homeNav");
  if (nav && !reduceMotion.matches) nav.classList.add("nav-hidden");

  function updateNav() {
    if (!nav || !ctaSection) return;
    const show = ctaSection.getBoundingClientRect().top < window.innerHeight * 0.55;
    nav.classList.toggle("nav-hidden", !show);
  }

  function updateLines() {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const range = viewportHeight * 0.62;

    lines.forEach((line) => {
      const center = line.offsetTop + line.offsetParent.offsetTop + line.offsetHeight / 2 - window.scrollY; // layout position, ignores transforms
      const offset = (center - viewportCenter) / range; // -1 above, +1 below
      const d = clamp(Math.abs(offset), 0, 1.4);
      const near = clamp(1 - d, 0, 1);
      const eased = 1 - Math.pow(1 - near, 2.2);

      const scale = 0.5 + 0.5 * eased;               // largest in the middle
      const opacity = clamp(1 - Math.pow(d, 1.6), 0, 1); // fades to nothing at the edges
      const tilt = clamp(offset, -1.2, 1.2) * -30;    // rolls like a wheel
      const blur = 2.2 * (1 - eased);

      line.style.setProperty("--scale", scale.toFixed(4));
      line.style.setProperty("--opacity", opacity.toFixed(4));
      line.style.setProperty("--tilt", `${tilt.toFixed(2)}deg`);
      line.style.setProperty("--blur", `${blur.toFixed(2)}px`);
    });

    if (scrollCue) scrollCue.classList.toggle("is-hidden", window.scrollY > 40);

    const y = window.scrollY;
    document.documentElement.style.setProperty("--ambient-one-y", `${y * 0.028}px`);
    document.documentElement.style.setProperty("--ambient-two-y", `${-y * 0.020}px`);

    updateNav();
    ticking = false;
  }

  function requestTick() {
    if (!ticking && !reduceMotion.matches) {
      ticking = true;
      requestAnimationFrame(updateLines);
    }
  }

  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) ctaSection.classList.add("is-visible");
      });
    },
    { threshold: 0.28 }
  );

  if (ctaSection) ctaObserver.observe(ctaSection);

  function init() {
    if (reduceMotion.matches) {
      if (ctaSection) ctaSection.classList.add("is-visible");
      return;
    }

    updateLines();
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
  }

  reduceMotion.addEventListener?.("change", () => window.location.reload());
  if (!reduceMotion.matches) document.documentElement.classList.add("motion-ready");
  init();
})();
