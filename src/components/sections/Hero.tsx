"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { siteConfig as site } from "@/config/site";
import { sections } from "@/config/sections";
import { Button } from "@/components/ui/Button";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero-image]", { scale: 1.08, duration: 1.6 })
          .from("[data-hero-overlay]", { opacity: 0, duration: 0.7 }, 0.1)
          .from(
            "[data-hero-line]",
            { yPercent: 110, stagger: 0.12, duration: 1 },
            0.3,
          )
          .from("[data-hero-copy]", { opacity: 0, y: 15, duration: 0.6 }, 0.8)
          .from("[data-hero-cta]", { opacity: 0, y: 15, duration: 0.6 }, 1)
          .from(
            "[data-hero-detail]",
            { opacity: 0, stagger: 0.1, duration: 0.6 },
            1.15,
          );
        const desktop = gsap.matchMedia();
        desktop.add("(min-width: 768px)", () =>
          gsap.to("[data-hero-image]", {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }),
        );
        return () => desktop.revert();
      }, ref);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);
  const projectHref = sections.horizontalShowcase
    ? "#projetos"
    : sections.showcase
      ? "#destaque"
      : "#contato";
  return (
    <section id="inicio" ref={ref} className="hero">
      <div className="hero-image" data-hero-image>
        <Image
          src={site.hero.image.src}
          alt={site.hero.image.alt}
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
      </div>
      <div className="hero-overlay" data-hero-overlay />
      <div className="hero-body container">
        <p className="eyebrow" data-hero-detail>
          <span className="small-line" />
          {site.hero.eyebrow}
        </p>
        <h1>
          {site.hero.lines.map((line, i) => (
            <span className="hero-line" key={line}>
              <span data-hero-line className={i === 1 ? "italic" : ""}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <div className="hero-bottom">
          <div>
            <p className="hero-copy" data-hero-copy>
              {site.hero.description}
            </p>
            <div data-hero-cta>
              <Button variant="outline" href={projectHref}>
                {site.labels.projects}
              </Button>
            </div>
          </div>
          <a className="hero-project" href={projectHref} data-hero-detail>
            <span>
              {site.hero.project}
              <ArrowUpRight size={18} />
            </span>
            <small>{site.hero.projectDetail}</small>
          </a>
        </div>
      </div>
      <div className="hero-foot container" data-hero-detail>
        <a href={sections.intro ? "#essencia" : "#contato"}>
          <ArrowDown size={16} />
          {site.labels.scroll}
        </a>
        <span>{site.hero.note}</span>
        <span>{site.hero.edition}</span>
      </div>
    </section>
  );
}
