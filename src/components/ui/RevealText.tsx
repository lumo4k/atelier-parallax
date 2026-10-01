"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
export function RevealText({
  text,
  mode = "word",
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  mode?: "line" | "word" | "character";
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const parts =
    mode === "line"
      ? text.split("\n")
      : mode === "character"
        ? Array.from(text)
        : text.split(" ");
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(ref.current?.querySelectorAll("[data-part]") ?? [], {
        yPercent: 105,
        duration: 0.85,
        stagger: 0.035,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
      });
    });
    return () => media.revert();
  }, [text, mode]);
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {parts.map((part, index) => (
          <span
            className={mode === "line" ? "reveal-line" : "reveal-word"}
            key={index}
          >
            <span data-part className="inline-block">
              {part === " " ? "\u00a0" : part}
            </span>
            {mode === "word" && index < parts.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
