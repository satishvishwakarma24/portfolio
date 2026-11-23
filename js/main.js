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

const themeToggle = document.querySelector(".theme-toggle");
const themeSun = themeToggle.querySelector(".theme-sun");
const themeMoon = themeToggle.querySelector(".theme-moon");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeColor = document.querySelector('meta[name="theme-color"]');
const root = document.documentElement;

function updateThemeControl() {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : systemTheme.matches;
  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  themeSun.toggleAttribute("hidden", !dark);
  themeMoon.toggleAttribute("hidden", dark);
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeColor.content = getComputedStyle(document.body).backgroundColor;
}

themeToggle.hidden = false;
updateThemeControl();
systemTheme.addEventListener("change", updateThemeControl);
themeToggle.addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : systemTheme.matches;
  root.dataset.theme = dark ? "light" : "dark";
  updateThemeControl();
  try {
    localStorage.setItem("portfolio-theme", root.dataset.theme);
  } catch {
    // The theme still works for this page when storage is unavailable.
  }
});

const email = document.querySelector("#email-link").getAttribute("href").slice("mailto:".length);
const whatsappNumber = document.querySelector(".whatsapp-number").textContent;
const copyStatus = document.querySelector(".copy-status");

if (navigator.clipboard?.writeText) {
  document.querySelectorAll(".copy-contact").forEach(button => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const isEmail = button.dataset.copy === "email";
      const value = isEmail ? email : whatsappNumber.replace(/\s/g, "");
      const label = isEmail ? "Email address" : "WhatsApp number";
      copyStatus.textContent = "";
      try {
        await navigator.clipboard.writeText(value);
        copyStatus.textContent = `${label} copied.`;
      } catch {
        copyStatus.textContent = `Couldn’t copy. You can select and copy ${value}.`;
      }
    });
  });
}
