# Briefing — site da fynd

_Aberto em 2026-10-01 pelo orquestrador (`/site`). Modo direto: o usuário autorizou a execução completa ("pode começar")._

## Pedido
Criar o site da fynd, moderno e sofisticado, com animação de scroll e movimento contemporâneo.

- **Para quem:** cliente final. São empreendedores, donos de empresas B2B e líderes comerciais que precisam de mais oportunidades reais de venda.
- **Não é** um site conceitual da marca. Não explicar o significado do fogo, da chama ou do desenho do logo.
- **Mostrar a plataforma.** Ela ainda não existe, então criamos um protótipo verossímil dentro de um mockup de MacBook, numa ou mais dobras. Ele é apresentado como produto, sem a palavra "protótipo".
- Seguir o design system da fynd (tokens, componentes e o guia em `/styleguide`).

## Decisões do orquestrador (sem resposta explícita do usuário; revisar no portão final)
| Tema | Decisão | Motivo |
|---|---|---|
| Formato | Landing page única em `/`, com âncoras | É o primeiro site do produto e o MVP ainda está em evolução |
| Local | Mesmo projeto Next.js, reaproveitando o design system | Consistência e velocidade |
| 3D | Fora nesta versão (o agente `site-3d` não entra) | O MacBook com a interface real explica melhor que uma cena 3D; protege a performance |
| CTA principal | Pedido de acesso antecipado / demonstração (formulário simples, ainda sem backend) | O MVP está em validação; não prometer self-service |
| Bibliotecas de motion | GSAP ScrollTrigger + Motion | São as aprovadas pelo usuário para scroll e microinteração |

## Verdade de produto (limite das promessas)
- O cliente descreve o seu perfil de cliente ideal numa conversa.
- A fynd cruza esse perfil com bases empresariais: CNPJs da Receita Federal organizados e uma base própria de contas corporativas.
- A fynd prioriza as empresas com maior potencial e mostra o contexto de cada uma.
- A fynd apoia o contato inicial (sugestão de abordagem), sem prometer automação total.

## Fora do escopo
- Backend do formulário, blog, páginas de preço e login.
- Números, logos de clientes e depoimentos reais: tudo entra como `[validar]`.

## Bibliotecas aprovadas pelo usuário
ReactBits, 21st.dev, Uiverse, GSAP (scroll), Motion, Three.js, OriginKit, Skiper UI, Cult UI, Unlumen UI e GetLayers.

## Registro de decisões entre etapas
_(o orquestrador preenche ao fim de cada etapa)_
- **Portão A (modo direto):** a arquitetura de 9 seções foi aceita como está. A seção 3 fica separada da demonstração. Há um único pin de scroll, na seção 4.
- **Portão B (modo direto):** o hero fica "Saiba para quem vender agora." O universo fictício é Lumi Embalagens / Camila Rocha / Serra Azul Alimentos. Os pacotes `gsap`, `@gsap/react` e `motion` (v13) já estão instalados.
- **Portão C (modo direto). Conflitos resolvidos:**
  - O pin da seção 4 tem cerca de 300vh: o timing segue o `04-motion.md`, não os 400vh da arquitetura.
  - Cor e ciano seguem o `03-design.md`. Na seção 2, a linha iluminada é o `OpportunityCard active` claro, e o ciano é a barra de 5px. O submit da seção 7 é o único `Button signal` do site. O header e o CTA do hero não são ciano.
  - Componentes externos: ReactBits (ScrollReveal reescrito com useGSAP, CountUp, TextType) e Cult UI (CopyButton), copiados para `src/components/site/`, conforme o `05-componentes.md`.
  - O `OpportunityCard` pode mudar sem quebrar o `/styleguide`: ganha a prop opcional `fitLabel`, a barra passa a usar `scaleX` e a barra ciano vira `<span>`. O visual padrão tem de ficar idêntico.

## Contrato da etapa 4 (dois engenheiros em paralelo)
**Engenheiro P (plataforma)** é dono de `src/components/site/platform/**`, `src/components/site/macbook.tsx`, `src/components/site/reactbits/**`, `src/components/site/cult/**` e `src/components/opportunity-card.tsx`. Exporta:
- `macbook.tsx`: `export function MacBook({ children, className, lidRef? }: { children: React.ReactNode; className?: string; lidRef?: React.Ref<HTMLDivElement> })`. A moldura é CSS e a tela é um canvas fixo de 1280×800 reduzido para caber (container query ou ResizeObserver). `lidRef` aponta para o elemento da tela/tampa, que o GSAP do hero anima.
- `platform/index.ts` exporta:
  - `PlatformShell({ active, breadcrumb, children })`: app shell estático (sem SidebarProvider de página inteira), sempre no tema claro.
  - `ScreenOportunidades({ state })`, `ScreenConversa({ state })`, `ScreenDetalhe({ state })`, `ScreenAbordagem({ state })`
  - `PlatformDemo({ step, state })`: `step: 0|1|2|3` troca as telas com crossfade (Motion `AnimatePresence`).
  - `PlatformPanel({ step })`: a tela da etapa sem a moldura, para o mobile.
  - Em todas as telas, `state: "idle" | "play" | "final"`. `idle` é o estado inicial antes da animação; `play` toca as microinterações (`04-motion.md`); `final` renderiza o estado final sem animação (movimento reduzido, mobile, ou o usuário passou da etapa).
  - `HeroScreen({ play })`: tela A para o hero, com os cards em cascata e a contagem de % quando `play` for true.
  - `MiniConversa`, `MiniLista` e `MiniAbordagem`: recortes pequenos para a seção 3.
  - `NoiseList({ litRef? })`: as 6 linhas da seção 2 (5 skeletons + 1 `OpportunityCard` ativo claro).

**Engenheiro S (site)** é dono de `src/app/page.tsx`, `src/app/layout.tsx` (só metadata/OG), `src/components/site/sections/**`, `src/components/site/header.tsx`, `src/components/site/footer.tsx` e `src/components/site/motion/**`. Ele importa de `@/components/site/platform` e `@/components/site/macbook` só pelo contrato acima, escreve a orquestração GSAP (o scrub do hero, o pin da seção 4 que define `step`/`state`, o reveal da seção 2) e cuida do formulário e do FAQ.
- **Etapa 6, escopo das correções (decisão do orquestrador):**
  - QA: corrigir o B1 e os I1–I6. Dos polimentos, fazer a imagem OG + `metadataBase` e os alvos de toque. O tamanho do JS fica como pendência.
  - Marca, ponto 1: aplicar o tom neutro no destaque dos recortes da seção 3.
  - Marca, ponto 2: aplicar as correções mínimas propostas no `09-revisao-marca.md`.
  - Marca, ponto 3: criar `icon.svg` a partir do `FChama` e remover o favicon do Next.
  - CTA final: o título passa a ser "Comece pela conversa certa.".
  - Avatar da fynd no chat: continua com o wordmark (segue o 03-design). Fica para a Mariana decidir.

## Rotas atuais (2026-10-02)
- A **v3 é a página principal** em `/` (`src/app/page.tsx`). A v1 foi movida intacta para `/v1` (noindex) e a v2 continua em `/v2` (noindex). `/v3` redireciona para `/` (`next.config.ts`). Título, descrição e imagem OG do layout seguem o `docs/site/v3/02-copy-v3.md`.

## v2: hero e header (2026-10-01)
- **Pedido do usuário:** deixar o hero menos seco, usando mais da linguagem visual da marca, com logo maior e uma barra de navegação mais bonita. **A v1 tem de ser mantida.**
- **Rotas:** a v1 continua intacta em `/`. A v2 está em `/v2` (`src/app/v2/page.tsx`, noindex), com `header-v2.tsx` e `sections/hero-v2.tsx`. As outras seções são as mesmas da v1.
- **Header v2:** cápsula flutuante de vidro, wordmark de h-6 para h-7/h-8, indicador deslizante (Motion `layoutId`) no link ativo e CTA com seta. A cápsula alterna entre claro e escuro conforme a seção.
- **Hero v2:** os elementos vêm dos slides da marca em `public/brand/slides`:
  - campo de luz radial;
  - grade de pontos;
  - trilha pontilhada de "Luz revela caminhos", só à direita e fora da coluna de texto;
  - pill de status "Acesso antecipado aberto" com um ponto ciano;
  - CTAs com ícone;
  - faixa de provas (as 3 fontes de dado);
  - brilho atrás do MacBook;
  - 3 cards flutuantes no estilo do slide "Aplicação", com parallax, só a partir de `lg`: "Perfil salvo / 148", "Aderência média 74%" (a média real da lista) e os chips do perfil ideal.
- **Ciano na v2:** aparece como luz ambiente (brilho e trilha em baixa opacidade), no ponto de status e na barra do item ativo. É uma exceção consciente ao "um por dobra", porque segue o tratamento dos slides oficiais da marca. Precisa de aprovação.

- **01/10, pedido do usuário:** "Receita Federal" foi retirada do copy de todas as versões. Os trechos originais estão em comentários `[receita-federal-removido 2026-10-01]`. Não recolocar sem pedido explícito.
