"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { siteConfig as s } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="section container faq">
      <div>
        <SectionHeading {...s.faq} />
      </div>
      <div>
        {s.faq.items.map((item, i) => (
          <article
            key={item.question}
            className={`faq-item ${active === i ? "active" : ""}`}
          >
            <h3>
              <button
                onClick={() => setActive(active === i ? null : i)}
                aria-expanded={active === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-button-${i}`}
              >
                {item.question}
                <Plus size={20} strokeWidth={1.5} />
              </button>
            </h3>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              className="faq-answer"
              inert={active !== i}
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
