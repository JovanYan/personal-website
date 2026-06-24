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
  bookProgress.style.background =
    `linear-gradient(90deg, var(--blue) ${(currentPage + 1) / bookPages.length * 100}%, rgba(24,24,23,.13) 0)`;
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

document.querySelectorAll("[data-go-page]").forEach(button => {
  button.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    goToBookPage(Number(button.dataset.goPage));
  });
});

document.querySelector(".book-pages").addEventListener("click", event => {
  const routeTarget = event.target.closest("[data-go-page]");
  if (routeTarget) {
    goToBookPage(Number(routeTarget.dataset.goPage));
    return;
  }
  if (event.target.closest(".page-corner")) {
    goToBookPage(1);
    return;
  }
  if (event.target.closest("a, button")) return;
  if (currentPage === 0) return;
  const rect = event.currentTarget.getBoundingClientRect();
  if (event.clientX > rect.left + rect.width / 2) goToBookPage(currentPage + 1);
  else goToBookPage(currentPage - 1);
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

  const id = activeChapter.id;
  chapterLinks.forEach(link => link.classList.toggle("active", link.hash === `#${id}`));
  chapterNumber.textContent = activeChapter.dataset.chapter;
  chapterFrame = null;
}

window.addEventListener("scroll", () => {
  if (chapterFrame) return;
  chapterFrame = requestAnimationFrame(updateActiveChapter);
}, { passive: true });
window.addEventListener("hashchange", updateActiveChapter);

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

const motionSections = [...document.querySelectorAll("main > section:not(.hero)")];
const motionSelectors = {
  about: [".section-title", ".about-statement", ".strength-list article"],
  journey: [".journey-heading", ".book"],
  work: [".section-title", ".case-card"],
  "ai-builds": [".section-title", ".ai-principle", ".anchor-showcase-copy", ".anchor-product-stage", ".future-build"],
  contact: [":scope > .eyebrow", ":scope > div", ":scope > footer"]
};

document.documentElement.classList.add("motion-ready");

motionSections.forEach(section => {
  section.classList.add("section-motion");
  const selectors = motionSelectors[section.id] || [":scope > *"];
  const items = selectors.flatMap(selector => [...section.querySelectorAll(selector)]);
  [...new Set(items)].forEach((item, index) => {
    item.classList.add("motion-item");
    item.style.setProperty("--motion-delay", `${Math.min(index * 90, 450)}ms`);
  });
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      sectionObserver.unobserve(entry.target);
    });
  }, { threshold: .03, rootMargin: "0px 0px -6% 0px" });
  motionSections.forEach(section => sectionObserver.observe(section));
} else {
  motionSections.forEach(section => section.classList.add("is-visible"));
}

const cursorLabel = document.querySelector(".cursor-label");
const interactivePhotos = document.querySelectorAll(".interactive-photo");
interactivePhotos.forEach(photo => {
  photo.addEventListener("mouseenter", () => cursorLabel.classList.add("visible"));
  photo.addEventListener("mouseleave", () => cursorLabel.classList.remove("visible"));
  photo.addEventListener("mousemove", event => {
    cursorLabel.style.left = `${event.clientX}px`;
    cursorLabel.style.top = `${event.clientY}px`;
  });
});

document.querySelectorAll("details").forEach(detail => {
  detail.addEventListener("toggle", () => {
    const label = detail.querySelector("summary i");
    if (label) label.textContent = detail.open ? "Close −" : label.textContent.includes("Explore") ? "Explore +" : "Open +";
  });
});

// EDIT CASE DETAILS: homepage card copy is in index.html; longer case content lives here.
const caseContent = {
  zuru: {
    label: "CASE 01 · ZURU × WALMART",
    title: "From consumer insight to 1.4 million units.",
    lead: "I led a Walmart canned cat food line from research and positioning through innovation, development, sampling, production, and offline promotion.",
    image: "assets/portfolio/mr-purrs-product-stack.webp",
    imageAlt: "Mr Purrs canned cat food product line",
    sections: [
      ["ROLE", "End-to-end Product Owner · Europe & North America"],
      ["APPROACH", "Consumer and competitor research informed positioning, product concepts, packaging decisions, cost control, sampling and production delivery."],
      ["IMPACT", "1.4M first-order units confirmed in 2025 for Q1 2026 delivery, with a 3–5% cost reduction."],
      ["WHAT I’D DO BETTER", "Test multiple value propositions earlier and identify which affordable difference genuinely changes purchase intent before increasing development investment."]
    ]
  },
  quaker: {
    label: "CASE 02 · PEPSICO / QUAKER",
    title: "Turning product benefits into consumer relevance.",
    lead: "For a new high-protein oat snack, I translated nutrition and ingredient benefits into relatable usage scenarios and built a multi-level creator matrix.",
    image: "assets/portfolio/jovan-yan-quaker-boston-diptych.png",
    imageAlt: "Jovan Yan and Quaker campaign",
    sections: [
      ["ROLE", "Product Marketing · Urban women aged 20–35"],
      ["KEY DECISION", "Move from broad nutrition language to specific breakfast, snack, dessert, fitness and recipe situations, with creators playing distinct awareness, trust and conversion roles."],
      ["IMPACT", "45M+ impressions, 24% high-performing content rate and 200K+ product reservations in two weeks. Across 63 optimized posts, average performance increased by 8.83%."],
      ["WHAT I’D DO BETTER", "Validate demand earlier in product development and connect social content with offline trials, livestreams, paid media and more experimental short-form formats."]
    ],
    gallery: [
      "assets/portfolio/quaker-social-review/strategy-evolution.png",
      "assets/portfolio/quaker-social-review/content-optimization-results.png"
    ]
  },
  kuaishou: {
    label: "CASE 03 · KUAISHOU",
    title: "Turning cultural signals into stories people chose to spread.",
    lead: "At Kuaishou, I worked on trend research, story development, creator sourcing, content planning and performance tracking across communication projects.",
    image: "assets/portfolio/jovan-yan-kuaishou-internship-card.jpeg",
    imageAlt: "Jovan Yan's Kuaishou internship profile card",
    sections: [
      ["ROLE", "PR & Communications Intern · Beijing, China"],
      ["OBSERVATION", "The strongest topics connected with an emotion or cultural conversation audiences already wanted to discuss, rather than beginning with a generic campaign message."],
      ["EXECUTION", "I developed content angles around emerging cultural signals, supported creator collaboration and tracked how stories moved across platforms. My work included women-focused communication, creator sourcing and livestream planning support."],
      ["IMPACT", "A women-focused topic generated 100M+ Weibo views and contributed to 107K new followers in one day. I also screened and introduced more than 20 creators."],
      ["WHAT I’D DO BETTER", "Define the audience tension and measurement framework earlier—not only tracking reach, but separating attention, resonance, follower quality and longer-term brand value."]
    ]
  },
  anchor: {
    label: "CASE 03 · TIME ANCHOR",
    title: "A five-year diary for meeting your past self.",
    lead: "After hearing why physical five-year diaries were difficult to maintain, I designed and built a digital alternative that balances ritual with feedback and searchability.",
    image: "deliverables/5year-diary-screenshots/02-diary-view.png",
    imageAlt: "Time Anchor same-day diary timeline",
    customLayout: "time-anchor"
  }
};

const caseDrawer = document.querySelector("#case-drawer");
const drawerContent = caseDrawer.querySelector(".drawer-content");

document.querySelectorAll(".case-open").forEach(button => {
  button.addEventListener("click", () => {
    const item = caseContent[button.dataset.case];
    caseDrawer.classList.toggle("time-anchor-drawer", item.customLayout === "time-anchor");

    if (item.customLayout === "time-anchor") {
      drawerContent.innerHTML = `
        <header class="anchor-case-heading">
          <small>${item.label}</small>
          <h2 id="case-title">A diary people wanted to keep—without the friction that made them stop.</h2>
          <p class="drawer-lead">${item.lead}</p>
        </header>
        <section class="anchor-observe">
          <div class="anchor-observe-copy">
            <small>01 · OBSERVE</small>
            <h3>The real problem was continuity.</h3>
            <p>At an offline journaling event, I heard the same tension several times: physical five-year diaries felt meaningful, but they were difficult to carry, offered little feedback, and made progress hard to see.</p>
            <blockquote>I reframed the challenge from “make journaling more emotional” to reducing friction while preserving the seriousness of writing something down.</blockquote>
          </div>
          <div class="anchor-evidence">
            <figure><img src="previews/time-anchor-case/assets/journaling-community.JPG" alt="An offline journaling community gathering"><figcaption>Where the observation began</figcaption></figure>
            <figure><img src="previews/time-anchor-case/assets/five-year-diary-reference.jpg" alt="A physical five-year diary"><figcaption>The ritual worth preserving</figcaption></figure>
          </div>
        </section>
        <section class="anchor-response">
          <header><small>02 · PRODUCT RESPONSE</small><h3>Three decisions shaped the experience.</h3></header>
          <ol>
            <li><b>01</b><div><strong>Make time visible.</strong><p>A same-day five-year timeline supports reflection; an annual memory map makes accumulated effort visible.</p></div></li>
            <li><b>02</b><div><strong>Make memory searchable.</strong><p>Keyword search helps people rediscover themes and changes that are difficult to notice one entry at a time.</p></div></li>
            <li><b>03</b><div><strong>Protect the original moment.</strong><p>Primary entries are locked. Later understanding appears as a follow-up note, preserving both versions of the self.</p></div></li>
          </ol>
        </section>
        <section class="anchor-build">
          <div><small>03 · HOW I BUILT IT</small><h3>Observe → Define → Design → Build → Audit</h3><p>ChatGPT clarified requirements and product logic. Gemini supported visual exploration and implementation. I owned the priorities, trade-offs, experience principles and final decisions.</p></div>
          <blockquote><small>04 · WHAT I LEARNED</small>Vibe coding made the interface tangible quickly. The real product work was deciding what deserved to exist—and what should wait.</blockquote>
        </section>
        <div class="anchor-case-actions">
          <a href="apps/time-anchor/" target="_blank" rel="noopener">Try the product ↗</a>
        </div>
      `;
      caseDrawer.showModal();
      return;
    }

    const card = button.closest(".case-card");
    const cardTitle = card.querySelector("h3").textContent.trim();
    const cardLabel = card.querySelector("small").textContent.trim();
    const cardLead = card.querySelector(".case-card-copy > p").textContent.trim();
    const sections = item.sections.map(([heading, copy]) =>
      `<section class="${heading === "WHAT I’D DO BETTER" || heading === "NEXT STEP" ? "reflection-callout" : ""}"><h3>${heading}</h3><p>${copy}</p></section>`
    ).join("");
    const gallery = item.gallery
      ? `<div class="drawer-gallery">${item.gallery.map(src => `<img src="${src}" alt="">`).join("")}</div>`
      : "";
    drawerContent.innerHTML = `
      <small>${cardLabel}</small>
      <h2 id="case-title">${cardTitle}</h2>
      <p class="drawer-lead">${cardLead}</p>
      <figure><img src="${item.image}" alt="${item.imageAlt}"></figure>
      <div class="drawer-sections">${sections}</div>
      ${gallery}
    `;
    caseDrawer.showModal();
  });
});

caseDrawer.querySelector(".drawer-close").addEventListener("click", () => caseDrawer.close());
caseDrawer.addEventListener("click", event => {
  if (event.target === caseDrawer) caseDrawer.close();
});

const wechatDialog = document.querySelector("#wechat-dialog");
document.querySelector(".wechat-open").addEventListener("click", () => wechatDialog.showModal());
wechatDialog.querySelector(".dialog-close").addEventListener("click", () => wechatDialog.close());
wechatDialog.addEventListener("click", event => {
  if (event.target === wechatDialog) wechatDialog.close();
});

renderBookPage();
updateActiveChapter();
