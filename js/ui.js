export function initUI() {
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const updateHeader = () =>
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open menu" : "Close menu",
      );
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        navLinks.classList.remove("is-open");
      }),
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        navLinks.classList.remove("is-open");
        menuButton.focus();
      }
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const cards = [...document.querySelectorAll("[data-selectable]")];
  const selectCard = (selectedCard) => {
    cards.forEach((card) => {
      const isSelected = card === selectedCard;
      card.classList.toggle("is-selected", isSelected);
      card.setAttribute("aria-current", String(isSelected));
    });
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (!event.target.closest("a")) selectCard(card);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCard(card);
      }
    });
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    });
  });

  const progress = document.querySelector("[data-scroll-progress]");
  const updateProgress = () => {
    if (!progress) return;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}
