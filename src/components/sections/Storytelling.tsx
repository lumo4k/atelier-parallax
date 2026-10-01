"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig as s } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function Storytelling() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const ctx = gsap.context(() => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]");
          const images = gsap.utils.toArray<HTMLElement>("[data-story-image]");
          gsap.set(panels.slice(1), { autoAlpha: 0, y: 20 });
          gsap.set(images.slice(1), { autoAlpha: 0 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 8%",
              end: () => `+=${window.innerHeight * 1.35}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          panels.slice(1).forEach((panel, i) => {
            tl.to(panels[i], { autoAlpha: 0, y: -15, duration: 0.3 }, i + 0.6)
              .to(panel, { autoAlpha: 1, y: 0, duration: 0.4 }, i + 0.8)
              .to(images[i + 1], { autoAlpha: 1, duration: 0.5 }, i + 0.65);
          });
          tl.to({}, { duration: 0.4 });
        }, ref);
        return () => ctx.revert();
      },
    );
    return () => media.revert();
  }, []);
  return (
    <section ref={ref} className="story-section section">
      <div className="container">
        <SectionHeading {...s.storytelling} />
        <div className="story-layout">
          <div className="story-copy">
            {s.storytelling.steps.map((step, i) => (
              <article data-story-panel key={step.title}>
                <p className="eyebrow">
                  0{i + 1} / 0{s.storytelling.steps.length}
                </p>
                <h3>{step.title}</h3>
                <p className="body-copy">{step.text}</p>
                <div className="story-mobile-image">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
          <div className="story-images">
            {s.storytelling.steps.map((step) => (
              <div data-story-image key={step.title}>
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="50vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
