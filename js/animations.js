export function initAnimations() {
  const targets = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          instance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    observer.observe(target);
  });
}
