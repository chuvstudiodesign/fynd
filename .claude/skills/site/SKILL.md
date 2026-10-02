---
name: site
description: Orquestrador do site da fynd. Conduz a criação ou evolução do site institucional (landing page do produto) passando pelos agentes site-* em ordem, com portões de aprovação. Use quando o usuário pedir para criar, refazer ou evoluir o site, uma seção ou uma dobra.
---

# Orquestrador do site da fynd

Você (a sessão principal) é o orquestrador. Subagentes não chamam outros subagentes, então **toda delegação parte daqui**. Você protege o escopo, mantém a narrativa, junta as entregas e leva cada portão ao usuário.

## Premissas fixas
- O site vende a **plataforma** para o **cliente final**: empreendedores e líderes comerciais B2B. Não é um site conceitual da marca (sem explicar fogo nem logo).
- A plataforma aparece num **protótipo interativo dentro de um mockup de MacBook**. Ele é apresentado como produto, sem rótulo de "protótipo".
- Design system: tokens em `src/app/globals.css`, componentes em `src/components/ui/*`, guia em `/styleguide`. O ciano é raro.
- Stack: Next.js 16 (ler `AGENTS.md`), Tailwind 4, shadcn base-nova, GSAP ScrollTrigger e Motion. Dev server na porta 3210.
- Todos os entregáveis ficam em `docs/site/`.

## Agentes
| Etapa | Agente | Entregável |
|---|---|---|
| 1 | `site-arquitetura` | `docs/site/01-arquitetura.md` |
| 2 | `site-copy` | `docs/site/02-copy.md` |
| 3 | `site-design`, `site-motion` e `site-componentes` (em paralelo) | `03-design.md`, `04-motion.md`, `05-componentes.md` |
| 4 | `site-frontend` (com `site-3d` se a arquitetura pedir) | código em `src/app/page.tsx` e `src/components/site/**` |
| 5 | `site-qa` e `site-revisor-marca` (em paralelo) | `08-qa.md`, `09-revisao-marca.md` |
| 6 | `site-frontend` | correções dos bloqueantes e importantes |

## Fluxo
0. **Briefing**: escreva `docs/site/00-briefing.md` com o pedido do usuário, as premissas acima, as decisões já tomadas e o que está fora do escopo.
1. Rode a etapa 1. **Portão A**: mostre o mapa de seções ao usuário.
2. Rode a etapa 2. **Portão B**: mostre o hero e o tom.
3. Rode a etapa 3 com os três agentes em paralelo. Resolva conflitos entre eles (o design vence em cor e layout, o motion vence em timing, o curador vence em origem do componente) e registre as decisões em `00-briefing.md`. **Portão C**.
4. Rode a etapa 4, seção por seção se o site for grande. Verifique você mesmo no navegador (`open http://localhost:3210`).
5. Rode a etapa 5 com os dois agentes em paralelo.
6. Rode a etapa 6 e reverifique. Apresente ao usuário: link, o que foi feito, o que ficou `[validar]` e as pendências.

**Modo direto**: se o usuário autorizar a execução completa ("pode começar", "faz tudo"), passe pelos portões A–C sem parar, registre as decisões no briefing e apresente tudo no final.

## Ao delegar
Cada prompt de subagente deve conter: o objetivo da etapa, os arquivos de entrada, o arquivo de saída e as decisões do usuário que ainda não estão nos documentos. Os subagentes começam do zero.
