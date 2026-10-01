"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { siteConfig as site } from "@/config/site";
import { navigation } from "@/config/navigation";
import { whatsappLink } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 50,
      onUpdate: (self) =>
        ref.current?.classList.toggle("is-scrolled", self.scroll() > 50),
    });
    return () => trigger.kill();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        gsap.from(panel.current?.querySelectorAll("a") ?? [], {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.4,
        });
    });
    panel.current?.querySelector("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const nodes = [
          ref.current?.querySelector<HTMLButtonElement>(".theme-toggle"),
          toggle.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = nodes[0];
        const last = nodes.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      ctx.revert();
      document.body.style.overflow = old;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);
  return (
    <header ref={ref} className={`header ${open ? "menu-open" : ""}`}>
      <Logo />
      <nav className="desktop-nav" aria-label="Principal">
        {navigation.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a
          className="nav-contact"
          href={whatsappLink(site.contact.phone, site.contact.defaultMessage)}
        >
          {site.labels.contact}
          <ArrowUpRight size={15} />
        </a>
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? site.labels.close : site.labels.menu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          className="mobile-menu"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={site.labels.menu}
        >
          <nav>
            {[
              ...navigation,
              { label: site.labels.contact, href: "#contato" },
            ].map((link, index) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                <small>0{index + 1}</small>
                {link.label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <p className="eyebrow">{site.business.descriptor}</p>
        </div>
      )}
    </header>
  );
}
