"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { siteConfig as s } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section id="expertise" className="section services">
      <div className="container">
        <div className="services-heading">
          <SectionHeading {...s.services} />
          <span className="eyebrow">
            01 — {String(s.services.items.length).padStart(2, "0")}
          </span>
        </div>
        <div className="services-layout">
          <div>
            {s.services.items.map((item, i) => (
              <article
                className={`service-row ${active === i ? "active" : ""}`}
                key={item.title}
                onMouseEnter={() => setActive(i)}
              >
                <button
                  type="button"
                  aria-expanded={active === i}
                  aria-controls={`service-${i}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="eyebrow">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <ArrowUpRight size={24} strokeWidth={1} />
                </button>
                <div
                  id={`service-${i}`}
                  className="service-description"
                  hidden={active !== i}
                >
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          {s.services.items[active] && (
            <div className="service-image">
              <ParallaxImage
                {...s.services.items[active].image}
                className="h-full"
                sizes="40vw"
                speed={3}
              />
              <span className="service-image-number">0{active + 1}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
