import { ArrowUpRight, ArrowUp } from "lucide-react";
import { siteConfig as s } from "@/config/site";
import { navigation } from "@/config/navigation";
import { Logo } from "@/components/ui/Logo";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <Logo />
        <p className="eyebrow">{s.business.descriptor}</p>
        <a href="#inicio" className="back-top" aria-label={s.labels.back}>
          <ArrowUp size={20} />
        </a>
      </div>
      <div className="footer-middle">
        <nav aria-label="Rodapé">
          {navigation.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div>
          {s.social.map((link) => (
            <a
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
        <a href={`mailto:${s.contact.email}`}>{s.contact.email}</a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {s.business.legalName}. {s.labels.rights}
        </span>
        <span>{s.labels.demo}</span>
      </div>
    </footer>
  );
}
