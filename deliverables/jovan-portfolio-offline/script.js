const bookPages = [...document.querySelectorAll(".book-page")];
const bookCounter = document.querySelector(".book-counter");
const bookProgress = document.querySelector(".book-progress");
const previousPage = document.querySelector(".book-prev");
const bookHome = document.querySelector(".book-home");
let currentPage = 0;
let bookDirection = "forward";

function renderBookPage() {
  bookPages.forEach((page, index) => {
    page.hidden = index !== currentPage;
    page.classList.toggle("active", index === currentPage);
    page.classList.remove("page-forward", "page-backward");
    if (index === currentPage) page.classList.add(bookDirection === "backward" ? "page-backward" : "page-forward");
  });
  const number = String(currentPage + 1).padStart(2, "0");
  bookCounter.textContent = `[ ${number} / ${String(bookPages.length).padStart(2, "0")} ]`;
  bookProgress.style.setProperty("--book-progress", `${(currentPage + 1) / bookPages.length * 100}%`);
  previousPage.hidden = currentPage === 0;
  bookHome.hidden = currentPage === 0;
  document.querySelector(".book").classList.toggle("book-open", currentPage > 0);
}

function goToBookPage(pageNumber) {
  const previousScrollY = window.scrollY;
  const nextPage = Math.max(0, Math.min(bookPages.length - 1, pageNumber));
  bookDirection = nextPage < currentPage ? "backward" : "forward";
  currentPage = nextPage;
  renderBookPage();
  window.scrollTo({ top: previousScrollY, behavior: "auto" });
}

previousPage.addEventListener("click", () => goToBookPage(currentPage - 1));
bookHome.addEventListener("click", () => goToBookPage(0));
document.querySelector(".book-pages").addEventListener("click", event => {
  const routeTarget = event.target.closest("[data-go-page]");
  if (routeTarget) return goToBookPage(Number(routeTarget.dataset.goPage));
  if (event.target.closest(".page-corner")) return goToBookPage(1);
  if (event.target.closest("a, button") || currentPage === 0) return;
  const rect = event.currentTarget.getBoundingClientRect();
  goToBookPage(currentPage + (event.clientX > rect.left + rect.width / 2 ? 1 : -1));
});

let touchStartX = null;
document.querySelector(".book-pages").addEventListener("touchstart", event => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
document.querySelector(".book-pages").addEventListener("touchend", event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 55) goToBookPage(currentPage + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });

const chapters = [...document.querySelectorAll(".chapter")];
const chapterLinks = [...document.querySelectorAll(".chapter-list a")];
const chapterNumber = document.querySelector(".chapter-toggle span");
let chapterFrame;
function updateActiveChapter() {
  const marker = window.innerHeight * .48;
  const activeChapter = chapters.find(chapter => {
    const rect = chapter.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  }) || chapters[0];
  chapterLinks.forEach(link => link.classList.toggle("active", link.hash === `#${activeChapter.id}`));
  chapterNumber.textContent = activeChapter.dataset.chapter;
  chapterFrame = null;
}
window.addEventListener("scroll", () => {
  if (chapterFrame) return;
  chapterFrame = requestAnimationFrame(updateActiveChapter);
}, { passive: true });

const nav = document.querySelector(".chapter-nav");
const navToggle = document.querySelector(".chapter-toggle");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
chapterLinks.forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll("details").forEach(detail => {
  detail.addEventListener("toggle", () => {
    const label = detail.querySelector("summary i");
    if (label) label.textContent = detail.open ? "Close −" : "Open +";
  });
});

const motionSections = [...document.querySelectorAll("main > section:not(.hero)")];
document.documentElement.classList.add("motion-ready");
motionSections.forEach(section => {
  section.classList.add("section-motion");
  [...section.children].forEach((item, index) => {
    item.classList.add("motion-item");
    item.style.setProperty("--motion-delay", `${Math.min(index * 90, 450)}ms`);
  });
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .03, rootMargin: "0px 0px -6% 0px" });
  motionSections.forEach(section => observer.observe(section));
} else {
  motionSections.forEach(section => section.classList.add("is-visible"));
}

const cursorLabel = document.querySelector(".cursor-label");
document.querySelectorAll(".interactive-photo").forEach(photo => {
  photo.addEventListener("mouseenter", () => cursorLabel.classList.add("visible"));
  photo.addEventListener("mouseleave", () => cursorLabel.classList.remove("visible"));
  photo.addEventListener("mousemove", event => {
    cursorLabel.style.left = `${event.clientX}px`;
    cursorLabel.style.top = `${event.clientY}px`;
  });
});

const wechatDialog = document.querySelector("#wechat-dialog");
document.querySelector(".wechat-open").addEventListener("click", () => wechatDialog.showModal());
wechatDialog.querySelector(".dialog-close").addEventListener("click", () => wechatDialog.close());
wechatDialog.addEventListener("click", event => {
  if (event.target === wechatDialog) wechatDialog.close();
});

renderBookPage();
updateActiveChapter();
