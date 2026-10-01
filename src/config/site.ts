const image = (id: string, alt: string) => ({
  src: `/client/${id === "hero" ? "architecture" : id === "house" ? "retreat" : id}.jpg`,
  alt,
});
export const siteConfig = {
  locale: "pt-BR",
  url: "https://example.com",
  business: {
    name: "atelier",
    logo: null as {
      src: string;
      alt: string;
      width: number;
      height: number;
    } | null,
    descriptor: "ARQUITETURA & INTERIORES",
    tagline: "Espaços para sentir.",
    description:
      "Arquitetura autoral que aproxima pessoas, natureza e os pequenos rituais de viver.",
    legalName: "Atelier Arquitetura",
    schemaType: "ProfessionalService" as
      "ProfessionalService" | "LocalBusiness",
  },
  seo: {
    title: "Atelier — Arquitetura para viver com presença",
    description:
      "Um estúdio de arquitetura e interiores. Projetos que respeitam o lugar, valorizam a matéria e acolhem a vida.",
    image: "/client/architecture.jpg",
  },
  contact: {
    phone: "551130304871",
    defaultMessage:
      "Olá! Encontrei vocês pelo site e gostaria de conversar sobre um projeto.",
    email: "contato@atelier.example",
    address: "Rua Harmonia, 582 · Vila Madalena",
    city: "São Paulo, SP",
    hours: "Segunda a sexta, das 9h às 18h",
    country: "BR",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Vila+Madalena+São+Paulo",
  },
  labels: {
    darkMode: "Ativar modo escuro",
    lightMode: "Ativar modo claro",
    menu: "Abrir menu",
    close: "Fechar menu",
    contact: "Vamos conversar",
    projects: "Explorar projetos",
    scroll: "DESLIZE PARA DESCOBRIR",
    back: "Voltar ao início",
    rights: "Todos os direitos reservados.",
    demo: "Estúdio fictício · projetos e depoimentos demonstrativos",
    skip: "Ir para o conteúdo",
    visit: "Como chegar",
    next: "Próximo projeto",
    previous: "Projeto anterior",
  },
  hero: {
    edition: "EST. 2014",
    eyebrow: "ARQUITETURA QUE ACOLHE A VIDA",
    lines: ["Espaços para", "sentir."],
    description:
      "Entre a natureza e o cotidiano, desenhamos lugares que fazem você querer ficar.",
    image: image(
      "hero",
      "Casa contemporânea integrada a um jardim, com materiais naturais",
    ),
    note: "SÃO PAULO · PROJETOS EM TODO O BRASIL",
    project: "CASA DO SILÊNCIO",
    projectDetail: "Residencial · 2025",
  },
  intro: {
    eyebrow: "NOSSA ESSÊNCIA",
    heading: "Um lugar não é apenas o que você vê. É o que você sente.",
    text: "Acreditamos em uma arquitetura que não precisa falar alto. Que nasce da escuta, respeita o tempo e encontra beleza no essencial.",
    footnote: "Menos excesso. Mais significado.",
  },
  services: {
    eyebrow: "O QUE FAZEMOS",
    heading: "Do primeiro traço ao último detalhe.",
    items: [
      {
        title: "Arquitetura residencial",
        description:
          "Casas que traduzem sua maneira de viver. Do estudo do terreno à luz que atravessa a sala.",
        image: image("hero", "Arquitetura residencial com grandes aberturas"),
      },
      {
        title: "Design de interiores",
        description:
          "Matéria, textura e proporção em equilíbrio. Ambientes com identidade, sem abrir mão do conforto.",
        image: image("interior", "Interior luminoso com mobiliário de madeira"),
      },
      {
        title: "Espaços comerciais",
        description:
          "Lugares que tornam a essência da sua marca uma experiência tangível.",
        image: image("detail", "Espaço comercial de composição natural"),
      },
      {
        title: "Acompanhamento de obra",
        description:
          "Presença em cada etapa para que a intenção do projeto se encontre com a realidade.",
        image: image(
          "house",
          "Detalhes de uma casa de arquitetura contemporânea",
        ),
      },
    ],
  },
  showcase: {
    eyebrow: "PROJETO EM DESTAQUE",
    heading: "Casa do silêncio",
    category: "UM REFÚGIO NO MEIO DO COTIDIANO",
    image: image(
      "house",
      "Casa com piscina e integração entre interior e exterior",
    ),
    detail: "São Paulo · 320 m² · 2025",
  },
  about: {
    eyebrow: "O ESTÚDIO",
    heading: "Olhar atento. Arquitetura com intenção.",
    text: "Somos um estúdio independente movido pela curiosidade e pelo cuidado. Unimos repertório, sensibilidade e precisão técnica para criar espaços que continuam fazendo sentido com o passar dos anos.",
    secondText:
      "Cada projeto começa com uma conversa. E se desenvolve como uma parceria — próxima, transparente e feita de escolhas conscientes.",
    image: image(
      "interior",
      "Sala com luz natural, plantas e objetos cuidadosamente selecionados",
    ),
    note: "A beleza está em como se vive.",
  },
  storytelling: {
    eyebrow: "NOSSO OLHAR",
    heading: "O essencial, em três tempos.",
    steps: [
      {
        title: "Escutar o lugar.",
        text: "Antes do desenho, a observação. A luz, o entorno e a história de quem vai habitar.",
        image: image("hero", "Natureza e arquitetura em diálogo"),
      },
      {
        title: "Encontrar a matéria.",
        text: "Madeira, pedra e texturas que convidam ao toque. Materiais honestos, que envelhecem bem.",
        image: image("detail", "Materiais e texturas de um ambiente acolhedor"),
      },
      {
        title: "Dar espaço à vida.",
        text: "O projeto se completa quando ganha seus rituais, suas memórias e sua forma única de acontecer.",
        image: image(
          "interior",
          "Ambiente preparado para os rituais cotidianos",
        ),
      },
    ],
  },
  projects: {
    eyebrow: "PORTFÓLIO SELECIONADO",
    heading: "Diferentes lugares. O mesmo cuidado.",
    items: [
      {
        title: "Casa do silêncio",
        category: "RESIDENCIAL",
        location: "São Paulo · 2025",
        image: image("house", "Residência com piscina cercada por vegetação"),
      },
      {
        title: "Apartamento Horizonte",
        category: "INTERIORES",
        location: "São Paulo · 2024",
        image: image("interior", "Sala de estar aberta e iluminada"),
      },
      {
        title: "Refúgio da Serra",
        category: "RESIDENCIAL",
        location: "Mantiqueira · 2025",
        image: image("hero", "Casa conectada à paisagem natural"),
      },
      {
        title: "Ponto de encontro",
        category: "COMERCIAL",
        location: "São Paulo · 2024",
        image: image("detail", "Espaço de encontro com materiais naturais"),
      },
    ],
  },
  stats: [
    { value: 12, suffix: "", label: "anos de prática" },
    { value: 86, suffix: "", label: "histórias transformadas" },
    { value: 14, suffix: "", label: "cidades, novos olhares" },
  ],
  process: {
    eyebrow: "COMO ACONTECE",
    heading: "Clareza em cada etapa.",
    items: [
      {
        title: "Conversa & descoberta",
        text: "Entendemos seus desejos, sua rotina e as possibilidades do espaço.",
      },
      {
        title: "Conceito & projeto",
        text: "Transformamos a escuta em soluções, desenhos e escolhas de materiais.",
      },
      {
        title: "Detalhamento & obra",
        text: "Organizamos cada detalhe e acompanhamos as decisões de execução.",
      },
      {
        title: "Entrega & novos começos",
        text: "O espaço ganha vida. E nossa relação continua depois da entrega.",
      },
    ],
  },
  testimonials: {
    eyebrow: "QUEM VIVE OS ESPAÇOS",
    items: [
      {
        quote:
          "Eles entenderam o que a gente queria antes mesmo de conseguirmos colocar em palavras. Nossa casa tem a nossa cara — e uma paz que não sabíamos que era possível.",
        name: "Marina & Rafael",
        detail: "Casa do silêncio · São Paulo",
      },
    ],
  },
  gallery: {
    eyebrow: "ENTRE LINHAS E TEXTURAS",
    heading: "Detalhes que fazem o todo.",
    images: [
      image("detail", "Texturas e objetos em um interior contemporâneo"),
      image("interior", "Luz natural sobre materiais e mobiliário"),
      image("house", "Relação entre arquitetura e paisagem"),
    ],
  },
  faq: {
    eyebrow: "PERGUNTAS FREQUENTES",
    heading: "Antes do primeiro traço.",
    items: [
      {
        question: "Como começamos um projeto?",
        answer:
          "Começamos com uma conversa para entender seu momento, suas expectativas e o espaço. A partir dela, preparamos uma proposta com escopo, etapas e investimento.",
      },
      {
        question: "Vocês atendem fora de São Paulo?",
        answer:
          "Sim. Desenvolvemos projetos em todo o Brasil, combinando reuniões online com visitas presenciais conforme as necessidades de cada trabalho.",
      },
      {
        question: "Quanto tempo leva um projeto?",
        answer:
          "O prazo depende da escala e da complexidade. Na proposta, apresentamos um cronograma para cada etapa, com tempo reservado para diálogo e aprovação.",
      },
      {
        question: "O acompanhamento da obra está incluído?",
        answer:
          "O acompanhamento pode fazer parte do escopo contratado. Definimos a frequência das visitas e a forma de comunicação conforme as necessidades da obra.",
      },
    ],
  },
  location: {
    eyebrow: "PORTAS ABERTAS",
    heading: "Uma conversa muda o espaço.",
    text: "Nosso estúdio fica na Vila Madalena. O café está sempre pronto para ouvir sua próxima ideia.",
  },
  finalCTA: {
    eyebrow: "SEU PRÓXIMO CAPÍTULO",
    lines: ["Vamos criar", "o seu lugar?"],
    text: "Conte o que você imagina. A gente começa por aí.",
    cta: "Começar uma conversa",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
};
export type SiteConfig = typeof siteConfig;
