const viewButtons = document.querySelectorAll("[data-view]");
const viewPanels = document.querySelectorAll("[data-panel]");

viewButtons.forEach(button => {
  button.addEventListener("click", () => {
    viewButtons.forEach(item => item.classList.toggle("active", item === button));
    viewPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === button.dataset.view));
  });
});

const caseDrawer = document.querySelector("#case-drawer");
const openCase = document.querySelector("[data-open-case]");
const closeCase = caseDrawer.querySelector(".drawer-close");

openCase.addEventListener("click", () => caseDrawer.showModal());
closeCase.addEventListener("click", () => caseDrawer.close());
caseDrawer.addEventListener("click", event => {
  if (event.target === caseDrawer) caseDrawer.close();
});
