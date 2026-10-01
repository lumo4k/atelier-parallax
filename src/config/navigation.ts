import { sections } from "./sections";
export const navigation = [
  ...(sections.about ? [{ label: "O estúdio", href: "#estudio" }] : []),
  ...(sections.horizontalShowcase
    ? [{ label: "Projetos", href: "#projetos" }]
    : sections.showcase
      ? [{ label: "Projetos", href: "#destaque" }]
      : []),
  ...(sections.services ? [{ label: "Expertise", href: "#expertise" }] : []),
];
