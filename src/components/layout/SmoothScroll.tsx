"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { features } from "@/config/sections";
export function SmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = features.smoothScroll
        ? new Lenis({
            lerp: 0.12,
            smoothWheel: true,
            syncTouch: false,
            anchors: { offset: -90 },
          })
        : null;
      const tick = (time: number) => lenis?.raf(time * 1000);
      lenis?.on("scroll", ScrollTrigger.update);
      if (lenis) {
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
      if (features.scrollProgress)
        gsap.to("[data-scroll-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      let active = true;
      const refresh = () => {
        if (active) ScrollTrigger.refresh();
      };
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        active = false;
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis?.off("scroll", ScrollTrigger.update);
        lenis?.destroy();
      };
    });
    return () => media.revert();
  }, []);
  return features.scrollProgress ? (
    <div className="scroll-progress" data-scroll-progress aria-hidden="true" />
  ) : null;
}
