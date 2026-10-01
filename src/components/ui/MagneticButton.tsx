"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { features } from "@/config/sections";
export function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    return () => {
      if (element) gsap.killTweensOf(element);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="inline-block"
      onPointerMove={(event) => {
        if (
          !features.magneticButton ||
          !matchMedia(
            "(pointer: fine) and (prefers-reduced-motion: no-preference)",
          ).matches ||
          !ref.current
        )
          return;
        const rect = ref.current.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (event.clientX - rect.left - rect.width / 2) * 0.08,
          y: (event.clientY - rect.top - rect.height / 2) * 0.08,
          duration: 0.3,
          overwrite: true,
        });
      }}
      onPointerLeave={() =>
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.35, overwrite: true })
      }
    >
      {children}
    </div>
  );
}
