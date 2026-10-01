# Atelier — template institucional

Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger e Lenis. Marca, projetos e depoimento são demonstrações fictícias.

## GitHub Pages

O workflow `.github/workflows/pages.yml` publica automaticamente pushes na branch `main`. No repositório, selecione **Settings → Pages → Source → GitHub Actions** e envie o código, incluindo o `package-lock.json` e o workflow. O Actions detecta o caminho e a URL do Pages, gera a pasta `out` e publica o artefato. Domínio próprio e repositório `usuario.github.io` usam caminho vazio automaticamente. O workflow utiliza as ações oficiais do GitHub: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Para gerar localmente, execute `npm run build:pages -- /nome-do-repositorio`. Para domínio próprio ou site na raiz, execute `npm run build:pages`. A exportação desabilita o otimizador de servidor do Next.js e serve as imagens locais diretamente. O build normal (`npm run build`) mantém a otimização de imagens para Vercel. Não há necessidade de commitar `out`, `.next` ou `node_modules`.

`NEXT_PUBLIC_SITE_URL` permite configurar o endereço publicado em um build manual; no Actions ele é definido automaticamente. `node scripts/check-export.mjs /nome-do-repositorio` valida os assets e a troca de tema na exportação local sob o mesmo subdiretório.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Personalizar um cliente

1. Edite `src/config/site.ts`: identidade, textos, contato, imagens, SEO e dados estruturados.
2. Edite `src/config/theme.ts`: cores, raios e espaçamento. Fontes são carregadas com `next/font` no layout.

   O tema inicial é claro. `darkTheme` define os tokens sobrescritos no modo escuro; os demais são herdados do tema base. O controle no header salva a escolha em `localStorage`, aplica a preferência antes da primeira pintura e continua funcionando quando o armazenamento está bloqueado. As seções cinematográficas mantêm cores de contraste independentes do fundo da página.

3. Substitua `public/client/` por fotografias e identidade do cliente. Atualize os caminhos e os textos alternativos em `site.ts`. A marca atual é tipográfica; para uma marca gráfica, configure `business.logo` com `src`, `alt`, `width` e `height`.
4. Habilite seções em `src/config/sections.ts`. Navegação e links de projetos se adaptam às seções disponíveis.
5. Configure domínio real em `siteConfig.url`, telefone, email, redes sociais e favicon antes de publicar. `example.com` e `.example` são intencionais na demonstração.
6. Execute as verificações e publique na Vercel.

## Movimento

Lenis utiliza exclusivamente o ticker do GSAP (segundos convertidos para milissegundos), sem um segundo loop RAF. Atualiza ScrollTrigger a cada scroll e mantém touch nativo. Todo contexto/trigger possui cleanup. Storytelling e galeria horizontal usam pin apenas em desktop, com distâncias calculadas e invalidação no resize. Em mobile, a narrativa fica vertical e o portfólio tem scroll horizontal nativo com controles. Reduced motion remove Lenis, pin, parallax e reveals; o conteúdo é apresentado diretamente. CSS é o fallback sem JavaScript.

## Arquitetura

`page.tsx` compõe seções independentes. Blocos editoriais sem estado são Server Components; GSAP e interações ficam em componentes client específicos. `EditorialSections.tsx` agrupa exportações sem lógica compartilhada; pode ser dividido por seção conforme o projeto crescer. Tokens vêm do tema e são aplicados no elemento html. Não há CMS nem um sistema de presets imposto: presets futuros podem produzir a mesma estrutura de `siteConfig` e tema.

## Imagens e conteúdo

Fotografias demonstrativas de Pexels, armazenadas localmente e servidas pelo otimizador Next.js. Veja `public/client/CREDITS.md`. Ao publicar para um cliente, substitua fotografias, métricas e depoimentos por material autorizado e dados reais. Mapa ilustrativo abre Google Maps; pode ser substituído por um embed. Nenhum formulário coleta dados.

## Verificação em navegador

`npm run test:e2e` verifica navegação, FAQ, menu por teclado, ausência de overflow em diferentes larguras, resize e reduced motion. Instale Chromium com `npx playwright install chromium` quando necessário. `npm run dev` deve estar ativo na porta 3000. Lighthouse deve ser medido no build de produção no ambiente de hospedagem; não há pontuação garantida.

No Windows, os testes usam o Edge instalado; em outros sistemas usam Chromium. Para validar produção, execute `npm run build`, `npm run start -- --port 3002` e, em outro terminal, `node scripts/test-production.mjs`. `PLAYWRIGHT_BASE_URL` permite testar outra URL. `node scripts/preview.mjs` gera capturas em `artifacts/previews` para revisão visual.
