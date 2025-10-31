import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initHorizontal() {
  let panels = gsap.utils.toArray('.horizontal-container .panel');
  let container = document.querySelector('.horizontal-container');

  if (!container || !panels || panels.length === 0) {
    console.warn('[HorizontalSection] container or panels not found — skipping horizontal setup');
    return;
  }

  const panelWidth = panels[0].offsetWidth || Math.max(document.documentElement.clientWidth, window.innerWidth);
  const distance = panelWidth * (panels.length - 1);

  let panelTween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=' + distance,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      //markers: true,
    }
  });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initHorizontal);
} else {
  initHorizontal();
}