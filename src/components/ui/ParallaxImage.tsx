"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
export interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  direction?: "up" | "down";
  scale?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  reveal?: boolean;
}
export function ParallaxImage({
  src,
  alt,
  speed = 7,
  direction = "up",
  scale = 1.15,
  className = "",
  priority = false,
  reveal = false,
  sizes = "(max-width: 767px) 100vw, 70vw",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!reveal) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current, {
        clipPath: "inset(12% 0 88% 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    });
    return () => media.revert();
  }, [reveal]);
  useEffect(() => {
    if (speed === 0) return;
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const inner = ref.current?.firstElementChild;
        if (!inner) return;
        const amount =
          Math.min(Math.abs(speed), Math.max(0, scale - 1) * 40) *
          (direction === "up" ? -1 : 1);
        gsap.fromTo(
          inner,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      },
    );
    return () => media.revert();
  }, [speed, direction, scale]);
  return (
    <div ref={ref} className={`image-frame ${className}`}>
      <div className="absolute inset-0" style={{ scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={75}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}
