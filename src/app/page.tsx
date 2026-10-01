import { sections } from "@/config/sections";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Storytelling } from "@/components/sections/Storytelling";
import { HorizontalShowcase } from "@/components/sections/HorizontalShowcase";
import { FAQ } from "@/components/sections/FAQ";
import {
  Intro,
  Showcase,
  About,
  Stats,
  Process,
  Testimonials,
  Gallery,
  Location,
  FinalCTA,
} from "@/components/sections/EditorialSections";
export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      {sections.intro && <Intro />}
      {sections.services && <Services />}
      {sections.showcase && <Showcase />}
      {sections.about && <About />}
      {sections.storytelling && <Storytelling />}
      {sections.horizontalShowcase && <HorizontalShowcase />}
      {sections.stats && <Stats />}
      {sections.process && <Process />}
      {sections.testimonials && <Testimonials />}
      {sections.gallery && <Gallery />}
      {sections.faq && <FAQ />}
      {sections.location && <Location />}
      <FinalCTA />
    </main>
  );
}
