# Validação do template

Verificação local em 30/09/2026, com Next.js 16.3.8, React 19.3, Node 22.23 e Microsoft Edge headless.

- Build de produção: passou; página, robots, sitemap e ícone gerados estaticamente.
- TypeScript: passou, com modo strict.
- ESLint: passou sem avisos.
- Playwright: dois testes iniciais passaram em desenvolvimento e em produção. Após adicionar os temas, três testes passaram em desenvolvimento, incluindo preferência inicial clara, troca pelo teclado, persistência após reload e controle mobile.
- Larguras verificadas: 320, 375, 390, 430, 768, 1024, 1440 e 1920 px.
- Verificações: ausência de overflow e de corte do título, menu por teclado, Escape, fechamento ao navegar e ao redimensionar, FAQ, imagens carregadas, progressão do storytelling, remoção/recriação dos pins no resize e mudança de reduced motion sem duplicação.
- Revisão visual: hero desktop e mobile, serviços, estúdio e CTA final.

## Lighthouse mobile local

Auditoria no build de produção, em `http://localhost:3002`, com a configuração mobile padrão do Lighthouse:

| Categoria | Resultado |
| --- | ---: |
| Performance | 92 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

FCP: 0,8 s. LCP: 3,0 s. TBT: 170 ms. CLS: 0.

Os resultados variam conforme hardware, cache, rede e hospedagem. O LCP ainda pode ser melhorado com fotografias específicas para mobile e ajuste do asset principal de cada cliente. Pontuação automatizada não substitui revisão manual de acessibilidade ou teste em aparelhos físicos.

O relatório JSON da sessão está em `artifacts/lighthouse.json` (ignorado pelo Git). Para repetir: inicie o build de produção e execute `npx --yes --package=lighthouse lighthouse http://localhost:3002 --chrome-flags=--headless --output=json --output-path=artifacts/lighthouse.json`. Lighthouse precisa de Chrome ou de `CHROME_PATH` apontando para um navegador compatível.
