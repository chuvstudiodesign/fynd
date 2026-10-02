# 05 — Componentes do site da fynd

_Etapa 3 do `/site` · agente `site-componentes` · 2026-10-01_
_Base: `00-briefing.md`, `01-arquitetura.md`, `02-copy.md`, inventário de `src/components/*` e `src/components/ui/*`, `package.json`. `03-design.md` e `04-motion.md` estão sendo escritos em paralelo e ainda não existiam. Se divergirem deste documento em comportamento de animação, vale o `04-motion.md`. Este documento define só **quais peças** entram e **de onde vêm**._

Todas as fontes abaixo foram conferidas em 2026-10-01 no código-fonte (GitHub raw ou JSON do registry), não só na página de demonstração. Nada foi instalado.

---

## Decisão de bibliotecas

| | Biblioteca | Papel | Peças usadas |
|---|---|---|---|
| Base | **shadcn (base-nova), já instalado** | UI do site e de todas as telas do MacBook | button, badge, card, field, input, textarea, accordion, sheet, navigation-menu, progress, separator, message, bubble, toggle-group, toast, sidebar, breadcrumb, avatar + `OpportunityCard`, `CompanyAvatar`, `Wordmark` |
| Efeito 1 | **ReactBits** | Texto e número animados | `ScrollReveal`, `CountUp`, `TextType` |
| Efeito 2 | **Cult UI** | Uma microinteração de produto | `CopyButton` |
| Motor | GSAP ScrollTrigger + Motion v13 (já instalados) | Pin, crossfade de telas, reordenação, entradas | Uso direto, sem wrapper de biblioteca |

Regra aplicada: no máximo 2 bibliotecas de efeito. ReactBits e Cult UI cobrem o que falta. O resto (MacBook, indicador de progresso, diagrama de dados, reordenação da lista) é **feito em casa** com o design system, GSAP e Motion. Nenhuma das bibliotecas aprovadas tem uma versão dessas peças que respeite a marca sem ser reescrita quase inteira.

**Novas dependências npm: nenhuma.** Os três componentes da ReactBits usam só `gsap` e `motion`. O `CopyButton` usa `motion`, `lucide-react` e o `Button` local, e tudo isso já está no `package.json`.

**Forma de trazer:** copiar o código-fonte para `src/components/site/` (pasta nova). O `npx shadcn add` não é recomendado aqui, porque os arquivos precisam de ajustes estruturais (ver abaixo) e o registry da ReactBits grava em `components/` com o nome em PascalCase. Se alguém preferir usar o CLI, o comando é `yes n | npx shadcn add <url-do-json>`, para não sobrescrever button/badge/alert/card. Depois, mova o arquivo e aplique os ajustes.

---

## Por seção

### 0. Header
- **Componente:** composição local. `Wordmark` (`src/components/brand/wordmark.tsx`) + `NavigationMenu` (desktop) + `Sheet` (menu mobile) + `Button` (CTA).
- **Fonte:** `src/components/ui/navigation-menu.tsx`, `sheet.tsx` e `button.tsx` (já instalados).
- **Por que serve:** é navegação simples com 3 âncoras. Não precisa de efeito.
- **Adaptações:** fundo transparente sobre o hero e `bg-background/80 backdrop-blur` depois do primeiro scroll (classe trocada por ScrollTrigger ou `useScroll` do Motion). Traduzir os `aria-label` padrão em inglês do Sheet ("Abrir menu" / "Fechar menu") e adicionar o link "Pular para o conteúdo".
- **Dependências / licença:** nenhuma nova. MIT (shadcn).

### 1. Hero + MacBook
**a) Moldura do MacBook. Feita em casa.**
- **Componente:** `src/components/site/macbook-frame.tsx` (novo). Tampa com bezel e notch, tela como `<div>` que recebe `children` (React real), base em trapézio com a abertura do trackpad. Só CSS e Tailwind, nenhuma imagem.
- **Por que serve:** a arquitetura exige telas em React de verdade dentro do MacBook, com animação interna. Nenhum candidato das bibliotecas aceita `children` vivos sem reescrita (ver "rejeitados").
- **Adaptações:** alumínio com `--steel-*` / `--navy-*` e sem gradiente metálico chamativo. No máximo um `linear-gradient` sutil de dois tons de steel para dar volume. Expor `ref` da tampa e da tela para o GSAP fazer `rotateX`/`scale` com `scrub` (definido pelo motion). `aspect-ratio` 16:10 na tela. No mobile, prop `bare` para mostrar só a tela, sem moldura.
- **Dependências / licença:** nenhuma. Código próprio.

**b) Tela A dentro do MacBook.**
- **Componente:** app shell de `src/app/demos/sidebar/app-shell-demo.tsx` extraído para `src/components/site/screens/screen-opportunities.tsx` + `OpportunityCard`.
- **Adaptações:** a tela é `inert` e `aria-hidden` (o `aria-label` do mockup vai no wrapper, como no copy). Trocar "Mariana Pillati" por "Camila Rocha". Para o % contar, o `OpportunityCard` precisa aceitar o número já formatado vindo de fora. Sugestão: prop opcional `fitLabel?: ReactNode` (default `${fit}%`), em que entra o `<CountUp>`. A barra continua lendo `fit` e pode receber transição de largura.

**c) % de aderência contando.**
- **Componente:** ReactBits **CountUp**.
- **Fonte:** https://reactbits.dev/text-animations/count-up · código: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/CountUp/CountUp.tsx · registry: https://reactbits.dev/r/CountUp-TS-TW.json
- **Por que serve:** é pequeno (spring do Motion + `useInView`) e só mexe no texto. Tem `startWhen` para disparar junto da cascata dos cards ou da etapa do pin.
- **Adaptações:** trocar `Intl.NumberFormat('en-US', …)` por `'pt-BR'`. Respeitar `useReducedMotion()` e mostrar o valor final direto. Aplicar `tabular-nums` (fonte mono ou `font-variant-numeric`) para o número não "pular" de largura. Não tem cor própria.
- **Dependências:** `motion` (já instalado). **Licença:** MIT + Commons Clause (ver nota de licença).

**d) Botões** → `Button` local (pílula) nas variantes default/outline. Nada importado.

### 2. O problema
**a) Título revelado por palavra no scroll ("Mais dados não resolvem. Clareza resolve.")**
- **Componente:** ReactBits **ScrollReveal**, **reescrito** em `src/components/site/scroll-reveal.tsx`.
- **Fonte:** https://reactbits.dev/text-animations/scroll-reveal · código: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/ScrollReveal/ScrollReveal.tsx · registry: https://reactbits.dev/r/ScrollReveal-TS-TW.json
- **Por que serve:** é exatamente a mecânica pedida (opacidade por palavra com `scrub`, sem pin) e já usa GSAP ScrollTrigger, o motor aprovado.
- **Adaptações obrigatórias (há bugs no original):**
  1. **O cleanup mata todos os ScrollTriggers da página** (`ScrollTrigger.getAll().forEach(t => t.kill())`). Ao desmontar ou re-renderizar, isso derrubaria o pin da seção 4. Reescrever com `useGSAP` do `@gsap/react` (escopo no container) ou guardar e matar só os triggers criados ali.
  2. O HTML é inválido: tem `<p>` dentro de `<h2>`. Trocar por `<h2>` com `<span>`s e prop `as`.
  3. Remover `rotate` (`baseRotation = 3`, balanço decorativo) e o blur (`enableBlur`, efeito "genérico"). Fica só opacidade, de `baseOpacity ≈ 0.15` até 1.
  4. Tirar a tipografia fixa (`text-[clamp(...)] font-semibold my-5`) e usar `font-heading` com a escala do `03-design.md`.
  5. Acessibilidade: `aria-label` com a frase inteira no `<h2>` e as palavras em `aria-hidden`, para o leitor de tela não soletrar palavra por palavra. Com `prefers-reduced-motion`, o texto já aparece com opacidade 1.
- **Dependências:** `gsap` + `@gsap/react` (já instalados). **Licença:** MIT + Commons Clause.

**b) As 3 dores** → `Card` local em grid, com entrada escalonada via Motion (`whileInView`). Nada importado.

**c) Contraste "lista cinza → uma linha iluminada"** → 5 ou 6 `OpportunityCard` em `muted`, com um deles ganhando `active` (barra ciano) no scroll. Reaproveita o componente. Nada importado. É o único ciano da seção.

### 3. Como funciona (3 passos)
- **Componente:** `Card` local × 3 com rótulo mono (`01 · DESCREVA`) e mini-UIs E1–E3 montadas com `Bubble`/`Message`, `Badge`, `OpportunityCard` e `Button` (recortes das telas B, A e D, sem moldura de MacBook).
- **Por que serve:** a mini-UI é a própria interface. Um card com efeito (spotlight, bento, tilt) competiria com ela.
- **Adaptações:** entrada escalonada em Motion. As mini-UIs ficam `inert`.
- **Dependências / licença:** nenhuma nova.

### 4. Demonstração guiada (pin)
**a) Pin, troca de telas e indicador 1–4. Feito em casa.**
- **Componente:** `src/components/site/demo-pin.tsx` (GSAP ScrollTrigger `pin` + `scrub`) e `src/components/site/step-indicator.tsx`.
- **Por que serve:** é a peça central e precisa de controle total sobre timeline, mobile e reduced motion. O indicador é um `<ol>` com 4 itens (o ativo com marcador ciano, os outros em `muted-foreground`) e `aria-current="step"`. Também pode ser o `Progress` local segmentado.
- **Dependências / licença:** nenhuma nova.

**b) Etapa 1, a mensagem da Camila "digitando".**
- **Componente:** ReactBits **TextType**.
- **Fonte:** https://reactbits.dev/text-animations/text-type · código: https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/TextType/TextType.tsx · registry: https://reactbits.dev/r/TextType-TS-TW.json
- **Por que serve:** tem efeito de digitação com cursor, `startOnVisible`, `loop={false}` e `variableSpeed` (digitação humana), e o cleanup é correto (`observer.disconnect`, `clearTimeout`).
- **Adaptações:** `loop={false}`, sem `textColors`, cursor fino (`|`) na cor `foreground`, com o piscar removido quando a digitação termina. Dentro do pin, o disparo vem da timeline (montar quando a etapa 1 ficar ativa) e não do `IntersectionObserver`, porque a tela pinada está sempre "visível". Com reduced motion, mostrar o texto completo. O texto real fica num `sr-only` e a versão animada em `aria-hidden`.
- **Dependências:** `gsap` (só para o cursor). **Licença:** MIT + Commons Clause.

**c) Chips de critério (etapa 1)** → `Badge` local (outline/secondary), entrada em Motion. A thread usa `Message` + `Bubble` locais.

**d) Etapa 2, lista reordenando (71, 92, 58… → 92, 84, 77…)** → `OpportunityCard` + `motion.li` com `layout` (reordenação FLIP nativa do Motion) + `CountUp` no %. Nada importado. O `AnimatedList` da ReactBits foi rejeitado (ver abaixo).

**e) Etapa 3, drawer da empresa** → painel estático com o visual do `Sheet`/`Card` local (não o `Sheet` real, que abre portal e trava o foco), `CompanyAvatar`, `Separator`, lista com ícone `Check` do lucide. Entrada lateral em Motion.

**f) Etapa 4, sugestão de abordagem: botão "Copiar".**
- **Componente:** Cult UI **CopyButton**.
- **Fonte:** https://www.cult-ui.com/docs/components/copy-button · código: https://github.com/nolly-studio/cult-ui/blob/main/apps/www/registry/default/ui/copy-button.tsx · registry: https://www.cult-ui.com/r/copy-button.json
- **Por que serve:** é a microinteração de troca do ícone Copy → Check, já usa o `Button` do shadcn, respeita `useReducedMotion` e anuncia o resultado em `aria-live`. Fica coerente com o restante do DS.
- **Adaptações:** traduzir os textos ("Copied to clipboard" → "Mensagem copiada", "Copy to clipboard" → "Copiar mensagem"). Usar `size="sm"` com rótulo "Copiar" visível, já que o copy pede o botão principal com texto e não só o ícone. Remover a classe `bg-code` do layout `overlay`, que não existe nos tokens da fynd. Disparar `toast.add({ title: "Mensagem copiada." })` (o Toaster já está no layout raiz). Na tela dentro do MacBook o botão é decorativo (`inert`). O CopyButton só copia de verdade se a demo tiver uma versão interativa fora do mockup. Se não tiver, basta a animação do ícone disparada pela timeline.
- **Dependências:** `motion`, `lucide-react`, `@/components/ui/button` (todos já existem). **Licença:** MIT.

**g) Seletores de canal e tom** → `ToggleGroup` local. Trecho do ponto de conexão em `<mark>` com fundo `signal/15` e borda ciano: é o único ciano da etapa.

**h) CTA ao soltar o pin** → `Button` local.

### 5. De onde vêm os dados
- **Diagrama "Seu perfil + Receita Federal + Base fynd → Lista priorizada". Feito em casa:** 3 `Card` pequenos à esquerda, conectores SVG (`<path>` com `stroke-dashoffset` animado pelo GSAP) e um `Card` com 3 `OpportunityCard` à direita. Traço em `--border`/`--steel-*`. Ciano só na ponta que chega à lista.
- **Contador de escala:** `CountUp` (o mesmo da seção 1), **só se o número for validado**. Se não houver número, o bloco sai.
- **Blocos 1–3 e linha LGPD:** `Card` + typography local.
- **Dependências / licença:** nenhuma nova.

### 6. Para quem / esforço
- **Componente:** 2 `Card` locais (colunas) com lista de itens (ícone `Check`) + faixa de 3 garantias com `Separator`. Depoimento (só se real): `Card` simples com `Avatar`.
- **Por que serve:** é conteúdo de leitura. Efeito aqui só atrapalharia.
- **Dependências / licença:** nenhuma nova.

### 7. CTA final + formulário + FAQ
- **Formulário:** `Field`, `Label`, `Input`, `Textarea` e `Button`/`LoadingButton` locais (estado "Enviando…" já existe em `src/components/loading-button.tsx`). Sucesso com Motion `AnimatePresence`. Fundo `navy-900`/`#0B1F32` pelo tema escuro local (`.dark` no wrapper). O ciano aparece só no anel de foco e no botão, pela variante `signal`.
- **FAQ:** `Accordion` local (base-ui). Nada importado.
- **Dependências / licença:** nenhuma nova.

### 8. Footer
- `Wordmark` + links + `Separator`. Nada importado.

---

## Nota de licença (ReactBits)
O repositório ReactBits está sob **MIT + Commons Clause** (https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). O uso comercial **dentro de um site ou produto** é permitido. O que fica proibido é vender ou redistribuir os componentes em si, isolados ou em pacote. Para o site da fynd não há impedimento. Manter um comentário no topo de cada arquivo copiado: `// Adaptado de React Bits (reactbits.dev), MIT + Commons Clause, © David Haz`. Não publicar esses arquivos num registry ou pacote da fynd.

Cult UI: MIT (https://github.com/nolly-studio/cult-ui). Manter o comentário de origem no arquivo.

## Arquivos previstos em `src/components/site/`
| Arquivo | Origem |
|---|---|
| `macbook-frame.tsx` | próprio |
| `scroll-reveal.tsx` | ReactBits ScrollReveal (reescrito) |
| `count-up.tsx` | ReactBits CountUp (pt-BR, reduced motion) |
| `text-type.tsx` | ReactBits TextType (sem loop/cores, disparo externo) |
| `copy-button.tsx` | Cult UI CopyButton (traduzido) |
| `demo-pin.tsx`, `step-indicator.tsx`, `data-diagram.tsx` | próprios |
| `screens/screen-opportunities.tsx`, `screen-conversation.tsx`, `screen-company.tsx`, `screen-approach.tsx` | próprios, a partir do app shell e do DS |

Mudança pequena num componente existente: `OpportunityCard` ganha a prop opcional `fitLabel?: ReactNode`, sem quebrar os usos atuais.

---

## Considerados e rejeitados

| Componente | Fonte | Motivo |
|---|---|---|
| Mac Screen | https://www.cult-ui.com/docs/components/mac-screen | É um Macintosh clássico em PNG (`/component-frames/apple-computer-img.png`) com um GIF do Giphy por cima. Não aceita `children`. |
| Great UI Macbook Mockup | https://21st.dev/@saurabh-2607/components/great-ui-macbook-mockup | Traz uma UI de WhatsApp Web embutida no frame e depende do 21st com API key (`/r/...` responde `authentication_required`). |
| Macbook Pro (Ali Imam) | https://21st.dev/@designali-in/components/macbook-pro | Código bloqueado sem API key do 21st e sem props documentadas para conteúdo React. Pela família (mockups SVG com `src`), tende a aceitar só imagem. A moldura própria é mais simples e controlável. |
| Animated 3D MacBook Air | https://21st.dev/@jahed/components/animated-3d-mac-book-air | Rotação 360°, tampa abrindo em loop e teclas pressionando: 3D decorativo sem função. O briefing tirou o 3D desta versão. |
| Mock Browser Window | https://www.cult-ui.com/docs/components/mock-browser-window | O briefing pede MacBook, não janela de navegador. |
| Feature Sticky Section | https://www.cult-ui.com/docs/components/feature-sticky-section | Traz `@radix-ui/react-slot` e `react-use-controllable-state` (o projeto é base-ui) e 851 linhas com conteúdo demo. Duplicaria o pin do GSAP, que já é a decisão. |
| Rolling Number | https://www.cult-ui.com/docs/components/rolling-number | Cumpre o mesmo papel do CountUp, mas sem disparo por visibilidade. Ficamos com um só contador. |
| AnimatedList | https://reactbits.dev/components/animated-list | Cores fixas (`#120F17`, `#222`, `#111`), gradientes de borda e scrollbar própria. É uma lista de seleção, não de reordenação. `motion` `layout` resolve melhor. |
| SplitText | https://reactbits.dev/text-animations/split-text | Toca uma vez e não tem `scrub`. A arquitetura pede revelação ligada ao scroll. O ScrollReveal reescrito cobre isso, então não entra um segundo efeito de texto. |
| ScrollFloat | https://reactbits.dev/text-animations/scroll-float | Letras "flutuando" com escala: chamativo demais para o tom "credível lidera". |
| Stepper | https://reactbits.dev/components/stepper | É um wizard clicável com estilo próprio. O indicador 1–4 é passivo e guiado pelo scroll. |
| ScrollStack | https://reactbits.dev/components/scroll-stack | Concorre com o único pin da página (seção 4) e cria um segundo scroll-jacking. |
| Magic Bento / Spotlight Card | https://reactbits.dev/components/magic-bento · https://reactbits.dev/components/spotlight-card | Glow e partículas no hover: glow genérico, proibido pela regra. |
| Shiny Text | https://reactbits.dev/text-animations/shiny-text | Brilho deslizante no texto, um efeito "IA genérica" que fere a regra do ciano como sinal. |
| Glitch Text / Decrypted / Scrambled | https://reactbits.dev/text-animations/glitch-text | Glitch e "hacker text" estão vetados. |
| Splash Cursor / Target Cursor / Blob Cursor | https://reactbits.dev/animations/splash-cursor | Cursor customizado chamativo, vetado. |
| Border Beam Button / Glow Button / Cosmic Button | https://www.cult-ui.com/docs/components/border-beam-button | Feixe de luz e glow neon no botão, fora dos tokens. O CTA usa o `Button` pílula local. |
| Typewriter / Text Animate (Cult UI) | https://www.cult-ui.com/docs/components/typewriter | Cumprem o mesmo papel do TextType. Para manter os efeitos de texto numa só biblioteca, fica o TextType. |
| Motion FAQs Accordion | https://ui.unlumen.com/components/motion-faqs-accordion | O `Accordion` local já está estilizado. Seria uma terceira biblioteca de efeito. |
| Animate Digits / Animate Count | https://ui.unlumen.com/components/animate-digits | Mesmo papel do CountUp. Seria uma terceira biblioteca. |
| Aurora Bars / Pixel Liquid Background (Unlumen) | https://ui.unlumen.com/components | Aurora colorida e fundos de shader decorativos, vetados. |
| Skiper UI (catálogo) | https://skiper-ui.com/components | O catálogo é renderizado no cliente e não deu para inspecionar o código sem conta. A versão free exige atribuição e muitas peças são pro (US$ 129). Nada nele resolve uma necessidade que ReactBits/Cult/DS não resolvam. |
| OriginKit | https://www.originkit.dev | Biblioteca free de seções animadas. A página não expõe código nem licença sem navegação no cliente. Não havia lacuna para preencher, e seria uma terceira biblioteca. |
| GetLayers | https://www.getlayers.ai | Entrega prompts que geram HTML autônomo, com 3D/WebGL, fundos e gradientes interativos. Não são componentes React no DS, o 3D está fora do escopo e a licença comercial é paga. |
| Uiverse | https://uiverse.io | Botões e loaders em CSS isolado com estética própria (neon, glass). O DS já tem botão, spinner e skeleton. |

## Pendências para os agentes paralelos
- **Motion (`04-motion.md`):** confirmar os gatilhos (a timeline do pin dispara `TextType` e `CountUp` por prop e não por visibilidade) e o comportamento com reduced motion de cada peça listada.
- **Design (`03-design.md`):** escala tipográfica do `ScrollReveal`, tons de steel da moldura do MacBook e opacidade inicial das palavras (`baseOpacity`).
