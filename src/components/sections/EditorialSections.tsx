import { siteConfig as s } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { whatsappLink } from "@/lib/utils";
import { ArrowUpRight, MapPin } from "lucide-react";
export function Intro() {
  return (
    <section id="essencia" className="section container intro">
      <p className="eyebrow">{s.intro.eyebrow}</p>
      <div>
        <RevealText text={s.intro.heading} className="statement" />
        <div className="intro-bottom">
          <p>{s.intro.footnote}</p>
          <ScrollReveal>
            <p className="body-copy">{s.intro.text}</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export function Showcase() {
  return (
    <section id="destaque" className="showcase">
      <ParallaxImage
        {...s.showcase.image}
        className="showcase-image"
        sizes="100vw"
        speed={6}
      />
      <div className="showcase-caption container">
        <div>
          <p className="eyebrow">{s.showcase.eyebrow}</p>
          <h2>{s.showcase.heading}</h2>
        </div>
        <div>
          <p>{s.showcase.category}</p>
          <small>{s.showcase.detail}</small>
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="estudio" className="section container about">
      <div>
        <SectionHeading {...s.about} />
        <ScrollReveal>
          <p className="body-copy">{s.about.text}</p>
          <p className="body-copy mt-6">{s.about.secondText}</p>
        </ScrollReveal>
        <p className="about-note">{s.about.note}</p>
      </div>
      <ParallaxImage
        {...s.about.image}
        className="about-image"
        reveal
        direction="down"
        sizes="(max-width: 767px) 100vw, 45vw"
      />
    </section>
  );
}
export function Stats() {
  return (
    <section className="stats container" aria-label={s.business.descriptor}>
      {s.stats.map((stat) => (
        <div key={stat.label}>
          <p>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <span className="stat-dot">.</span>
          </p>
          <span className="eyebrow">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
export function Process() {
  return (
    <section className="section container process">
      <div>
        <SectionHeading {...s.process} />
      </div>
      <div>
        {s.process.items.map((item, i) => (
          <ScrollReveal key={item.title}>
            <article className="process-item">
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p className="body-copy">{item.text}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
export function Testimonials() {
  return (
    <section className="section testimonial">
      <div className="container">
        <p className="eyebrow">{s.testimonials.eyebrow}</p>
        {s.testimonials.items.map((testimonial) => (
          <figure className="testimonial-entry" key={testimonial.name}>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <ScrollReveal>
              <blockquote>{testimonial.quote}</blockquote>
            </ScrollReveal>
            <figcaption className="quote-author">
              {testimonial.name}
              <span>{testimonial.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export function Gallery() {
  return (
    <section className="section container gallery">
      <SectionHeading {...s.gallery} />
      <div className="gallery-grid">
        {s.gallery.images.map((image, i) => (
          <ParallaxImage
            key={image.src}
            {...image}
            className={`gallery-image gallery-image-${i}`}
            reveal
            speed={i + 3}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        ))}
      </div>
    </section>
  );
}
export function Location() {
  return (
    <section className="section container location">
      <div>
        <SectionHeading {...s.location} />
        <p className="body-copy">{s.location.text}</p>
        <address>
          {s.contact.address}
          <br />
          {s.contact.city}
        </address>
        <p className="body-copy">{s.contact.hours}</p>
        <Button
          href={s.contact.mapUrl}
          target="_blank"
          rel="noreferrer"
          variant="text"
        >
          {s.labels.visit}
        </Button>
      </div>
      <a
        className="map-placeholder"
        href={s.contact.mapUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`${s.labels.visit}: ${s.contact.city} ${s.contact.address}`}
      >
        <div className="map-grid" aria-hidden="true" />
        <MapPin size={36} strokeWidth={1} />
        <span>{s.contact.city}</span>
        <small>{s.contact.address}</small>
        <ArrowUpRight className="map-arrow" />
      </a>
    </section>
  );
}
export function FinalCTA() {
  return (
    <section id="contato" className="section final-cta">
      <div className="container">
        <p className="eyebrow">{s.finalCTA.eyebrow}</p>
        <RevealText
          text={s.finalCTA.lines.join("\n")}
          mode="line"
          className="cta-title"
        />
        <div className="cta-bottom">
          <p>{s.finalCTA.text}</p>
          <MagneticButton>
            <Button
              href={whatsappLink(s.contact.phone, s.contact.defaultMessage)}
              variant="secondary"
            >
              {s.finalCTA.cta}
            </Button>
          </MagneticButton>
        </div>
        <a className="cta-email" href={`mailto:${s.contact.email}`}>
          {s.contact.email}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
