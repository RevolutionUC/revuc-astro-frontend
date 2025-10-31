import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
gsap.defaults({ ease: "none" });

const main = gsap
  .timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: "#svg-stage",
      scrub: true,
      start: "top center",
      end: "bottom center"
    }
  })
  .to(".ball01", { duration: 0.01, autoAlpha: 1 })
  .from(".theLine", { drawSVG: 0 }, 0)
  .to(
    ".ball01",
    {
      motionPath: {
        path: ".theLine",
        align: ".theLine",
        alignOrigin: [0.5, 0.5]
      }
    },
    0
  );

