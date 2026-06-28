const cases = {
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

const layer = document.querySelector(".drawer-layer");
const drawer = document.querySelector(".case-drawer");
const drawerKicker = document.querySelector(".drawer-kicker");
const drawerMetric = document.querySelector(".drawer-metric");
const drawerLabel = document.querySelector(".drawer-label");
const drawerTitle = document.querySelector("#drawer-title");
const drawerSummary = document.querySelector("#drawer-summary");
const drawerContent = document.querySelector(".drawer-content");
let lastFocusedCard = null;

function renderDrawer(caseData) {
  drawerKicker.textContent = caseData.kicker;
  drawerMetric.textContent = caseData.metric;
  drawerLabel.textContent = caseData.label;
  drawerTitle.textContent = caseData.title;
  drawerSummary.textContent = caseData.summary;
  drawerContent.innerHTML = caseData.blocks.map(([label, text]) => `
    <section class="review-block">
      <b>${label}</b>
      <p>${text}</p>
    </section>
  `).join("");
}

function openDrawer(caseId, sourceCard) {
  const caseData = cases[caseId];
  if (!caseData) return;
  lastFocusedCard = sourceCard;
  renderDrawer(caseData);
  layer.hidden = false;
  requestAnimationFrame(() => {
    layer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    drawer.querySelector(".drawer-close-top").focus();
  });
}

function closeDrawer() {
  layer.classList.remove("is-open");
  document.body.style.overflow = "";
  window.setTimeout(() => {
    layer.hidden = true;
    lastFocusedCard?.focus();
  }, 220);
}

document.querySelectorAll(".case-card").forEach(card => {
  card.addEventListener("click", () => openDrawer(card.dataset.caseId, card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDrawer(card.dataset.caseId, card);
    }
  });
});

document.querySelectorAll(".drawer-close, .drawer-scrim").forEach(control => {
  control.addEventListener("click", closeDrawer);
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape" && !layer.hidden) closeDrawer();
});
