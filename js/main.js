const menu = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");
const narrow = window.matchMedia("(max-width: 740px)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  navigation.hidden = narrow.matches && !open;
}

function syncNavigation() {
  menu.hidden = !narrow.matches;
  setMenu(false);
}

syncNavigation();
narrow.addEventListener("change", syncNavigation);
menu.addEventListener("click", () => setMenu(navigation.hidden));
navigation.addEventListener("click", event => {
  if (narrow.matches && event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menu.focus();
  }
});

const viewer = document.querySelector(".viewer");
const viewerImage = viewer.querySelector("img");
viewer.querySelector(".close").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener("close", () => viewerImage.removeAttribute("src"));
document.querySelectorAll(".gallery a").forEach(link => {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || !viewer.showModal) return;
    event.preventDefault();
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector("img").alt;
    viewer.showModal();
  });
});

const links = [...navigation.querySelectorAll("a")];
const sections = links.map(link => document.querySelector(link.hash));
function highlightSection() {
  const active = sections.findLastIndex(section => section.getBoundingClientRect().top <= 125);
  links.forEach((link, index) => {
    if (index === active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", highlightSection, { passive: true });
highlightSection();
