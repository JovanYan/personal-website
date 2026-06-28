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

const caseReviews = {
  zuru: {
    kicker: "01 / PRODUCT · END-TO-END OWNER",
    metric: "1.4M",
    label: "first-order units",
    title: "ZURU × Walmart: From Insight to Global Scale",
    summary: "I led a Walmart canned cat food line from consumer insight to retail-ready execution, balancing desirability, feasibility, cost, and shelf impact.",
    blocks: [
      ["SITUATION", "Walmart needed a value-oriented canned cat food line that could compete in a crowded pet-care category while meeting expectations for quality, price, and scale."],
      ["TASK", "Own the product path across insight, positioning, product feasibility, packaging, sampling, production preparation, and launch material."],
      ["ACTION", "I translated category and user signals into a product brief, coordinated development and sampling rounds, pushed cost optimization, and aligned cross-functional partners around a shelf-ready proposition."],
      ["RESULT", "Secured 1.4M first-order units for Q1 2026 delivery and achieved a 3–5% cost reduction while keeping the core value proposition intact."],
      ["HOW I’D DO IT BETTER", "I would test multiple value propositions earlier with lightweight shopper research, then use the winning purchase trigger to guide product claims, shelf storytelling, and retailer-facing materials."]
    ]
  },
  quaker: {
    kicker: "02 / PRODUCT MARKETING · GTM",
    metric: "45M+",
    label: "launch impressions",
    title: "PepsiCo / Quaker: High-Protein GTM Launch",
    summary: "I helped turn a functional oat product from nutrition language into everyday scenes people could understand, save, and act on.",
    blocks: [
      ["SITUATION", "Quaker was launching a high-protein oat snack into a market where functional claims alone were easy to ignore and difficult to connect to daily behavior."],
      ["TASK", "Shape the go-to-market story for urban women aged 20–35 and translate product benefits into content that could drive attention, reservation, and conversion."],
      ["ACTION", "I reframed nutrition claims into concrete scenes including breakfast, snack, dessert, fitness, and recipe use cases, then supported creator matrix planning and content optimization."],
      ["RESULT", "Reached 45M+ impressions, generated 200K+ reservations within two weeks, and produced a 24% high-performing content rate with measurable uplift across optimized posts."],
      ["HOW I’D DO IT BETTER", "I would build a clearer pre-launch testing loop around message-market fit, using early creator drafts and comment analysis to decide which scenes deserved the most media weight."]
    ]
  },
  kuaishou: {
    kicker: "03 / CONTENT & COMMUNICATION",
    metric: "100M+",
    label: "Weibo topic views",
    title: "Kuaishou: Cultivating Culture Signals into Growth",
    summary: "I supported communications work by finding cultural signals, shaping story angles, and turning fast audience emotion into executable content ideas.",
    blocks: [
      ["SITUATION", "On a fast-moving short-video platform, cultural conversations shifted quickly; communication needed to catch real audience emotion instead of simply chasing hot topics."],
      ["TASK", "Support content and communications work through signal monitoring, story development, creator sourcing, planning, and response tracking."],
      ["ACTION", "I monitored trend and audience signals, developed content angles, supported creator and livestream planning, screened more than 20 creators, and helped structure public-facing ideas."],
      ["RESULT", "Supported campaigns that reached 100M+ Weibo topic views and helped drive 107K followers gained in one day."],
      ["HOW I’D DO IT BETTER", "I would define the audience tension and measurement framework earlier, separating short-term reach from resonance, retention, and longer-term brand value."]
    ]
  }
};

const caseDrawerLayer = document.querySelector(".case-drawer-layer");
const caseDrawer = document.querySelector(".case-drawer");
const caseDrawerKicker = document.querySelector(".case-drawer-kicker");
const caseDrawerMetric = document.querySelector(".case-drawer-metric");
const caseDrawerLabel = document.querySelector(".case-drawer-label");
const caseDrawerTitle = document.querySelector("#case-drawer-title");
const caseDrawerSummary = document.querySelector("#case-drawer-summary");
const caseDrawerContent = document.querySelector(".case-drawer-content");
let lastFocusedCaseCard = null;

function renderCaseDrawer(caseData) {
  caseDrawerKicker.textContent = caseData.kicker;
  caseDrawerMetric.textContent = caseData.metric;
  caseDrawerLabel.textContent = caseData.label;
  caseDrawerTitle.textContent = caseData.title;
  caseDrawerSummary.textContent = caseData.summary;
  caseDrawerContent.innerHTML = caseData.blocks.map(([label, text]) => `
    <section class="case-review-block">
      <b>${label}</b>
      <p>${text}</p>
    </section>
  `).join("");
}

function openCaseDrawer(caseId, sourceCard) {
  const caseData = caseReviews[caseId];
  if (!caseData) return;
  lastFocusedCaseCard = sourceCard;
  renderCaseDrawer(caseData);
  caseDrawerLayer.hidden = false;
  requestAnimationFrame(() => {
    caseDrawerLayer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    caseDrawer.querySelector(".case-drawer-close-top").focus();
  });
}

function closeCaseDrawer() {
  caseDrawerLayer.classList.remove("is-open");
  document.body.style.overflow = "";
  window.setTimeout(() => {
    caseDrawerLayer.hidden = true;
    lastFocusedCaseCard?.focus();
  }, 220);
}

document.querySelectorAll(".case-card[data-case-id]").forEach(card => {
  card.addEventListener("click", () => openCaseDrawer(card.dataset.caseId, card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCaseDrawer(card.dataset.caseId, card);
    }
  });
});
document.querySelectorAll(".case-drawer-close, .case-drawer-scrim").forEach(control => {
  control.addEventListener("click", closeCaseDrawer);
});
window.addEventListener("keydown", event => {
  if (event.key === "Escape" && !caseDrawerLayer.hidden) closeCaseDrawer();
});

const anchorCaseLayer = document.querySelector(".anchor-case-layer");
const anchorCaseOpen = document.querySelector(".anchor-case-open");
let lastFocusedAnchorCaseButton = null;

function openAnchorCaseDrawer() {
  lastFocusedAnchorCaseButton = document.activeElement;
  anchorCaseLayer.hidden = false;
  requestAnimationFrame(() => {
    anchorCaseLayer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    anchorCaseLayer.querySelector(".anchor-case-close-top").focus();
  });
}

function closeAnchorCaseDrawer() {
  anchorCaseLayer.classList.remove("is-open");
  document.body.style.overflow = "";
  window.setTimeout(() => {
    anchorCaseLayer.hidden = true;
    lastFocusedAnchorCaseButton?.focus();
  }, 220);
}

anchorCaseOpen.addEventListener("click", openAnchorCaseDrawer);
document.querySelectorAll(".anchor-case-close, .anchor-case-scrim").forEach(control => {
  control.addEventListener("click", closeAnchorCaseDrawer);
});
window.addEventListener("keydown", event => {
  if (event.key === "Escape" && !anchorCaseLayer.hidden) closeAnchorCaseDrawer();
});

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

const emailDialogLayer = document.querySelector(".email-dialog-layer");
const emailDialog = document.querySelector("#email-dialog");
const emailCopyButton = document.querySelector(".email-copy");
const copyStatus = document.querySelector(".copy-status");

function openEmailDialog() {
  copyStatus.textContent = "";
  emailDialogLayer.hidden = false;
  document.body.style.overflow = "hidden";
  emailCopyButton.focus();
}

function closeEmailDialog() {
  emailDialogLayer.hidden = true;
  document.body.style.overflow = "";
}

document.querySelector(".email-open").addEventListener("click", () => {
  openEmailDialog();
});
emailDialog.querySelector(".dialog-close").addEventListener("click", closeEmailDialog);
emailDialogLayer.querySelector(".email-dialog-scrim").addEventListener("click", closeEmailDialog);
emailCopyButton.addEventListener("click", async () => {
  const email = emailCopyButton.dataset.email;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const copyField = document.createElement("textarea");
      copyField.value = email;
      copyField.setAttribute("readonly", "");
      copyField.style.position = "fixed";
      copyField.style.opacity = "0";
      document.body.append(copyField);
      copyField.select();
      document.execCommand("copy");
      copyField.remove();
    }
    copyStatus.textContent = "Copied to clipboard.";
    emailCopyButton.textContent = "Copied";
  } catch {
    const copyField = document.createElement("textarea");
    copyField.value = email;
    copyField.setAttribute("readonly", "");
    copyField.style.position = "fixed";
    copyField.style.opacity = "0";
    document.body.append(copyField);
    copyField.select();
    const copied = document.execCommand("copy");
    copyField.remove();
    copyStatus.textContent = copied ? "Copied to clipboard." : "Copy blocked. Select the email above.";
    emailCopyButton.textContent = copied ? "Copied" : "Copy email";
  }
  window.setTimeout(() => {
    emailCopyButton.textContent = "Copy email";
  }, 1800);
});
window.addEventListener("keydown", event => {
  if (event.key === "Escape" && !emailDialogLayer.hidden) closeEmailDialog();
});

renderBookPage();
updateActiveChapter();
