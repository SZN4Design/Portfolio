const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sections = document.querySelectorAll(".reveal");

if (reducedMotion || !("IntersectionObserver" in window)) {
  sections.forEach((section) => section.classList.add("in-view"));
} else {
  document.documentElement.classList.add("motion-ready");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
  sections.forEach((section) => observer.observe(section));
}

const dialog = document.querySelector("#image-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogLabel = document.querySelector("#dialog-label");
const closeButton = document.querySelector("#dialog-close");
let previousFocus;

document.querySelectorAll(".image-open, .original-image-open").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.classList.remove("zoomed");
    document.getElementById("dialog-zoom").textContent = "Zoom in";
    document.getElementById("dialog-zoom").setAttribute("aria-pressed", "false");
    document.getElementById("original-image-link").href = button.dataset.image;
    previousFocus = button;
    dialogImage.src = button.dataset.image;
    dialogImage.alt = button.dataset.label;
    dialogLabel.textContent = button.dataset.label;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("modal-open");
    closeButton.focus();
  });
});

function closeDialog() {
  dialog.close();
}
closeButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  dialogImage.removeAttribute("src");
  previousFocus?.focus();
});

document.getElementById("dialog-zoom").addEventListener("click", (event) => { const zoomed = dialog.classList.toggle("zoomed"); event.currentTarget.textContent = zoomed ? "Fit image" : "Zoom in"; event.currentTarget.setAttribute("aria-pressed", String(zoomed)); });
