"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
export function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const state = { value: 0 };
      gsap.to(state, {
        value,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
        onUpdate: () => {
          if (element)
            element.textContent = `${Math.round(state.value)}${suffix}`;
        },
      });
      return () => {
        if (element) element.textContent = `${value}${suffix}`;
      };
    });
    return () => media.revert();
  }, [value, suffix]);
  return (
    <span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}
