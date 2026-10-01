"use client";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { siteConfig as s } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
export function HorizontalShowcase() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () =>
          Math.max(
            0,
            (track.current?.scrollWidth ?? 0) - (ref.current?.clientWidth ?? 0),
          );
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85px",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.revert();
        };
      },
    );
    return () => media.revert();
  }, []);
  return (
    <section id="projetos" ref={ref} className="section horizontal-section">
      <div className="container portfolio-heading">
        <div>
          <SectionHeading {...s.projects} />
        </div>
        <div className="portfolio-controls">
          <button
            aria-label={s.labels.previous}
            onClick={() =>
              track.current?.scrollBy({
                left: -420,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowLeft />
          </button>
          <button
            aria-label={s.labels.next}
            onClick={() =>
              track.current?.scrollBy({
                left: 420,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div ref={track} className="project-track">
        {s.projects.items.map((project, i) => (
          <article key={project.title} className="project">
            <ParallaxImage
              {...project.image}
              speed={0}
              scale={1}
              className="project-image"
              sizes="(max-width: 767px) 85vw, 65vw"
            />
            <div className="project-info">
              <div>
                <p className="eyebrow">
                  {project.category} / 0{i + 1}
                </p>
                <h3>{project.title}</h3>
              </div>
              <span>{project.location}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
