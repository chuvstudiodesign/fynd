# 04 — Motion do site da fynd

_Etapa 3 do `/site` · agente `site-motion` · 2026-10-01_
_Base: `00-briefing.md`, `01-arquitetura.md`, `02-copy.md`, `src/components/opportunity-card.tsx`. O `03-design.md` ainda não existia quando este documento foi escrito; cores e superfícies citadas aqui usam os tokens do design system e devem ser conferidas com ele._

Princípio: **luz revelando o que importa.** O movimento conduz o olho até a informação útil (a empresa no topo, o critério atendido, o ponto de conexão) e depois para. Nada de rebote, loop decorativo, parallax de fundo ou scroll suavizado artificialmente.

---

## 1. Versões e APIs confirmadas no código instalado

| Pacote | Versão | O que foi conferido em `node_modules` |
|---|---|---|
| `gsap` | 3.15.0 | `ScrollTrigger`, `SplitText` (com `mask`, `autoSplit`, `onSplit` e `aria: "auto"`), `gsap.matchMedia()`, `ScrollTrigger#labelToScroll()` e `snap.snapTo: "labelsDirectional"` estão disponíveis. Os plugins vêm todos no pacote `gsap`. |
| `@gsap/react` | 2.1.2 | `useGSAP(func, { scope, dependencies, revertOnUpdate })` devolve `{ context, contextSafe }`. Ele faz a limpeza sozinho e cai em `useEffect` no SSR. |
| `motion` | 13.5.0 | `motion/react` só reexporta `framer-motion` 13.5. O entry **não tem `"use client"`**, então todo arquivo que importa de `motion/react` precisa começar com `"use client"`. Existe `motion/react-client` para usar `motion.div` direto em Server Component, mas aqui não vamos precisar dele. |
| | | **Mudança da v12/v13:** `staggerChildren` e `staggerDirection` estão **deprecados**. Use `transition={{ delayChildren: stagger(0.08) }}` (e `stagger(0.08, { from: "last" })`), com `stagger` importado de `motion/react`. |
| | | `MotionConfig reducedMotion="user" \| "always" \| "never"`, `useReducedMotion()`, `useInView(ref, { once, amount, margin })`, `useAnimate()` (as animações devolvem controles com `.complete()`/`.stop()`), `animate(from, to, { onUpdate })`, `LayoutGroup`, `layout`/`layoutId`, `AnimatePresence` (`mode="wait" \| "popLayout"`). `viewport` aceita `{ once, amount, margin, root }`. |
| | | `AnimateView` (`motion/react-animate-view`) é novo, mas exige React DOM 19.3+. O projeto está em React 19.2.8, então **não use**. |
| `next` | 16.3.8 | Sem impacto direto no motion: os componentes animados ficam como Client Components, e a página e o texto continuam renderizados no servidor. |

### Setup único
- Crie `src/lib/gsap.ts` com `"use client"`, registrando `gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)` uma única vez, e importe `gsap`/`ScrollTrigger` sempre desse módulo.
- Defina os padrões globais: `gsap.defaults({ ease: "power3.out", duration: 0.8 })`.
- Monte `<MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.7 }}>` num provider client em volta da landing (só da landing, não do layout raiz, para não mexer no `/styleguide`).
- Chame `ScrollTrigger.refresh()` depois de `document.fonts.ready` e no `onLoadingComplete` das imagens do MacBook, porque fontes e imagens mudam as alturas, e o pin precisa medir certo.
- **Não** use ScrollSmoother, Lenis nem `scroll-behavior` com JS. O scroll é nativo. As âncoras usam `scroll-behavior: smooth` em CSS, e só dentro de `@media (prefers-reduced-motion: no-preference)`.
- Cada seção usa `useGSAP(() => { const mm = gsap.matchMedia(); mm.add({...}, ctx => {...}) }, { scope: sectionRef })`. O `matchMedia` reverte tudo quando a condição muda (resize, preferência de movimento).

### Condições de mídia (iguais em todo o site)
```ts
const MQ = {
  full:    "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
  compact: "((max-width: 1023px) or (max-height: 679px)) and (prefers-reduced-motion: no-preference)",
  reduce:  "(prefers-reduced-motion: reduce)",
}
```
`full` é o único caso com pin. A altura mínima existe porque o MacBook pinado não cabe em notebooks muito baixos. Nesse caso a seção usa o modo empilhado.

---

## 2. Tokens de movimento

| Token | Valor GSAP | Valor Motion | Uso |
|---|---|---|---|
| `ease.out` (padrão) | `power3.out` | `[0.22, 1, 0.36, 1]` | Entradas, revelações e preenchimentos |
| `ease.inOut` | `power2.inOut` | `[0.65, 0, 0.35, 1]` | Crossfade de telas e reordenação |
| `ease.linear` | `none` | `"linear"` | Digitação, scrub de leitura e contagem |
| `dur.enter` | 0.8 s | 0.8 s | Entrada de bloco |
| `dur.enter-sm` | 0.6 s | 0.6 s | Entrada de item pequeno (chip, linha, check) |
| `dur.micro` | 0.2 s | 0.2 s | Hover, press e foco |
| `stagger` | 0.08 s | `stagger(0.08)` | Padrão; 0.06 s para listas com 5 itens ou mais, 0.1 s para 3 colunas |
| `dist.y` | 24 px | 24 px | Deslocamento de entrada de bloco (16 px no mobile) |
| `dist.y-sm` | 8 px | 8 px | Chips, bolhas e linhas |
| `scrub` | `0.6` | — | Suavização de todo scrub (nunca `true` seco, que treme no trackpad) |

Propriedades permitidas: `transform` (`x`, `y`, `scale`, `scaleX`, `scaleY`, `rotateX`), `opacity` e `clip-path: inset()` (só nos dois pontos marcados). Nunca anime `width`, `height`, `top`, `left`, `box-shadow` grande nem `filter: blur`.

**Ajuste obrigatório no `OpportunityCard`:** hoje a barra de aderência usa `style={{ width: pct% }}`. Para animar, a barra interna precisa passar a ocupar 100% com `origin-left` e `transform: scaleX(pct/100)`. Visualmente nada muda, e o preenchimento passa a ser `scaleX`. Exponha também um `ref`/`data-slot` no número `%` para a contagem.

**Regra do ciano em movimento:** o ciano (`signal`) só aparece animado em três momentos: (1) a barra lateral do card ativo acendendo (hero e etapa 2), (2) a linha que se ilumina na seção 2 e (3) o anel de foco do formulário (CSS, sem animação extra). Indicador de progresso, botões, chips e conectores não usam ciano.

---

## 3. Tabelas por seção

Colunas: **Elemento · Gatilho (start → end) · Propriedade · De → Para · Easing · Duração/Scrub · Lib · Movimento reduzido**.
Os gatilhos de Motion (`whileInView`) usam `viewport={{ once: true, amount: 0.3 }}`, a não ser que a linha diga outra coisa.

### 0. Header

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Camada de fundo do header (div absoluta com `bg-background/80` + `backdrop-blur` fixo) | `ScrollTrigger.create({ start: 8, end: "max", onToggle })` alterna `data-scrolled` no header | `opacity` da camada | 0 → 1 | CSS `ease-out` | 0.3 s (transição CSS) | GSAP (só o gatilho) | Igual, mas sem a transição: troca instantânea |
| Borda inferior (hairline) | Mesmo gatilho | `opacity` | 0 → 1 | CSS | 0.3 s | GSAP (gatilho) | Instantâneo |
| Âncora ativa (sublinhado) | `ScrollTrigger` por seção (`start: "top center"`, `end: "bottom center"`, `onToggle`) | `scaleX` do sublinhado (origin left) | 0 → 1 | `ease.out` | 0.3 s CSS | GSAP (gatilho) | Sublinhado aparece sem transição |
| Botão "Pedir acesso antecipado" | Hover / press | `scale` | 1 → 1.02 / 0.98 | `ease.out` | `dur.micro` | Motion (`whileHover`, `whileTap`) | `whileTap` só; sem scale no hover |
| Menu mobile | Abrir/fechar | painel `opacity` + `y`; itens com `delayChildren: stagger(0.05)` | `y -8 → 0`, `opacity 0 → 1` | `ease.out` | 0.35 s | Motion (`AnimatePresence`) | Só `opacity` (a `MotionConfig` já corta o `y`) |

O header **não se esconde** ao rolar para baixo: o CTA precisa ficar sempre à mão. O blur não é animado; só a opacidade da camada que o contém.

### 1. Hero com MacBook

Sem pin. A "abertura" do MacBook é um scrub curto atrelado ao primeiro scroll, e a cascata dos cards acontece ao carregar.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração/Scrub | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Eyebrow, subtítulo, CTAs, microlinha | Carregamento (mount) | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.8 s, `delayChildren: stagger(0.08, { startDelay: 0.1 })` | Motion (variants no wrapper) | Visível de imediato (só fade de 0.3 s) |
| **H1** "Saiba para quem vender agora." | Mount | `y` apenas | `12px → 0` | `ease.out` | 0.9 s | Motion | Estático |
| MacBook, wrapper externo | Mount | `opacity`, `y` | `0, 40px → 1, 0` | `ease.out` | 0.9 s, delay 0.25 s | Motion (wrapper externo) | Visível, sem deslocamento |
| MacBook, **tampa/tela** (wrapper interno, `transform-origin: 50% 100%`, pai com `perspective: 1600px`) | `trigger: macbook`, `start: "top 85%"`, `end: "top 25%"` | `rotateX`, `scale`, `y` | `rotateX 14° → 0°`, `scale 0.94 → 1`, `y 0 → -24px` | `none` dentro do scrub | `scrub: 0.6` | GSAP | Em 0° e escala 1, sem ScrollTrigger |
| Brilho do display (gradiente sutil sobre a tela, `pointer-events: none`) | Mesmo ScrollTrigger | `opacity` | 0.35 → 0 | `none` | `scrub: 0.6` | GSAP | Ausente |
| Cards da lista (tela A) | Mount, 0.6 s depois do MacBook (ou `useInView` do MacBook com `once`, o que acontecer depois) | `opacity`, `y` | `0, 8px → 1, 0` | `ease.out` | 0.6 s, `delayChildren: stagger(0.06)` | Motion | Lista completa visível |
| Barra de aderência de cada card | Junto da entrada de cada card, mais 0.1 s | `scaleX` | `0 → pct/100` | `ease.out` | 0.8 s | Motion | Valor final |
| Número `%` | Mesmo instante da barra | texto via `animate(0, pct, { onUpdate })` em `ref.textContent` (sem re-render) | `0 → pct` | `ease.out` | 0.8 s | Motion | Valor final |
| Barra ciano do card ativo (Serra Azul, span real no lugar do `::before`) | Ao terminar a contagem do 1º card (+0.15 s) | `scaleY` (origin center), `opacity` | `0 → 1` | `ease.out` | 0.45 s | Motion | Acesa desde o início |
| Fundo do card ativo | Mesmo instante | troca de classe `data-active` (transição de cor CSS existente) | — | CSS | 0.3 s | — | Instantâneo |

Notas:
- **LCP:** o H1 nunca começa com `opacity: 0` (ele é o provável LCP). Só translada.
- Os wrappers são separados: o externo usa Motion (entrada), e o interno usa GSAP (scrub). As duas libs nunca tocam no mesmo nó.
- No modo `compact` (mobile), o scrub da tampa fica mais curto e leve: `rotateX 8° → 0°`, `scale 0.97 → 1`, `start: "top 90%"`, `end: "top 50%"`.

### 2. O problema

Sem pin. O título é lido conforme o scroll, e o contraste "lista cinza → uma linha iluminada" fecha a seção.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração/Scrub | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Eyebrow + subtítulo | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s | Motion | Visível |
| Título "Mais dados não resolvem. Clareza resolve." (`SplitText`, `type: "words"`, `aria: "auto"`) | `trigger: título`, `start: "top 80%"`, `end: "top 35%"` | `opacity` de cada palavra | `0.15 → 1` | `none` | `scrub: 0.6`, `stagger: 0.1` (dentro do tween) | GSAP | Sem split; texto inteiro com opacidade 1 |
| "Clareza resolve." (palavras finais) | Fim do mesmo scrub | `opacity` vai a 1 e a cor passa de `muted-foreground` para `foreground` via classe ao completar (`onLeave`) | — | — | — | GSAP | Já em `foreground` |
| 3 colunas de dores | `whileInView` (`amount: 0.25`) | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s, `delayChildren: stagger(0.1)` | Motion | Visível |
| Lista cinza (6 linhas genéricas, só com UI do DS) | `trigger: lista`, `start: "top 75%"`, `end: "center 45%"` | `opacity` de 5 linhas | `0.9 → 0.35` | `none` | `scrub: 0.6` | GSAP | Já no estado final (5 linhas a 0.35) |
| Linha que se ilumina (a 3ª) | Mesmo scrub, no último terço da timeline | `opacity` 0.9 → 1, `x 0 → 4px`; barra ciano `scaleY 0 → 1` | — | `none` | parte do mesmo scrub | GSAP | Linha já destacada, barra acesa |
| Frase "Menos lista fria. Mais clareza para vender." | `whileInView` | `opacity`, `y` | `0, 12px → 1, 0` | `ease.out` | 0.7 s | Motion | Visível |

`SplitText` precisa de `autoSplit: true` com a animação criada dentro de `onSplit` (para refazer depois da troca de fonte e no resize). Use `aria: "auto"`, que já coloca `aria-label` no título e `aria-hidden` nas palavras.

### 3. Como funciona (3 passos)

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Eyebrow, título, subtítulo | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s, `stagger(0.08)` | Motion | Visível |
| 3 cards de passo | `whileInView` (`amount: 0.3`) | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s, `delayChildren: stagger(0.1)` | Motion | Visível |
| Rótulo mono `01 · DESCREVA` etc. | Junto do card | `opacity` | 0 → 1 | `ease.out` | 0.6 s, +0.1 s | Motion (variant filho) | Visível |
| Mini-UI E1: bolha + chips | Ao terminar a entrada do card 1 | bolha `opacity`/`y 8 → 0`; chips `opacity`/`scale 0.96 → 1` | — | `ease.out` | 0.6 s, chips `stagger(0.06)` | Motion | Estado final |
| Mini-UI E2: 3 cards | Ao terminar o card 2 | barras `scaleX 0 → pct`; ciano do 1º `scaleY 0 → 1` no fim | — | `ease.out` | 0.8 s, `stagger(0.06)` | Motion | Estado final |
| Mini-UI E3: destaque do trecho | Ao terminar o card 3 | fundo de destaque `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | — | `ease.out` | 0.6 s | Motion | Destaque visível |
| Hover no card | Hover (só `pointer: fine`) | `y` | `0 → -4px` | `ease.out` | `dur.micro` | Motion | Sem deslocamento |
| "Ver na prática ↓" | Hover | seta `y 0 → 3px` | — | `ease.out` | `dur.micro` | Motion | Estático |

### 4. Demonstração guiada (pin), visão geral
A timeline completa está na §4. Aqui fica só o resumo por elemento.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração/Scrub | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Eyebrow, título, subtítulo (antes do pin) | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s | Motion | Visível |
| Palco (coluna de texto + MacBook) | `pin: true`, `start: "top top"`, `end: "+=300%"` | — | — | — | `scrub: 0.6`, `snap` em labels | GSAP | **Sem pin**: modo empilhado (§4.4) |
| Entrada do MacBook antes do pin | `start: "top 90%"`, `end: "top top"` | `y`, `opacity` | `48px, 0.4 → 0, 1` | `none` | `scrub: 0.6` | GSAP | Estático |
| Telas B / A / C / D (wrappers de tela) | Labels da timeline | `opacity`, `y`, `scale` / `x` | ver §4.2 | `ease.inOut` | scrub | GSAP | Empilhadas, estáticas |
| Microinterações internas | Mudança de `step` (estado React) | ver §5 | — | — | tempo, não scroll | Motion | Estado final direto |
| Texto lateral por etapa | Labels | `opacity`, `y` | `12px, 0 → 0, 1` (sai com `-12px`) | `ease.inOut` | scrub | GSAP | Empilhado |
| Indicador de progresso 1–4 | Progresso da timeline | trilho: `scaleX` (origin left) do segmento ativo; rótulo ativo muda de `muted-foreground` para `foreground` por classe | 0 → 1 por etapa | `none` | scrub | GSAP | Indicador estático, ou oculto no empilhado |
| CTA ao soltar o pin | `whileInView` | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s | Motion | Visível |

### 5. De onde vêm os dados

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Cabeçalho da seção | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s | Motion | Visível |
| 3 blocos de prova | `whileInView` (`amount: 0.25`) | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s, `stagger(0.1)` | Motion | Visível |
| Diagrama, nós de origem (Seu perfil ideal · Receita Federal · Base fynd) | `whileInView` no diagrama (`amount: 0.4`) | `opacity`, `y` | `0, 8px → 1, 0` | `ease.out` | 0.6 s, `stagger(0.08)` | Motion | Visível |
| Conectores (linhas) | Depois dos nós (+0.2 s) | `scaleX` (origin left; vertical no mobile com `scaleY`, origin top) | `0 → 1` | `ease.out` | 0.6 s, `stagger(0.06)` | Motion | Desenhados |
| Nó "Lista priorizada" (mini-card com 3 linhas) | Depois dos conectores | `opacity`, `scale` | `0, 0.97 → 1, 1` | `ease.out` | 0.6 s | Motion | Visível |
| Linhas do mini-card | Logo após o nó | barras `scaleX 0 → pct`, `stagger(0.06)` | — | `ease.out` | 0.6 s | Motion | Final |
| Contador de escala | **Só se houver número validado** `[validar]`. `useInView` com `once` | texto via `animate(0, N, { onUpdate })` com `Intl.NumberFormat("pt-BR")` | `0 → N` | `ease.out` | 1.2 s | Motion | Número final. Sem número validado, sem contador |
| Linha LGPD | `whileInView` | `opacity` | 0 → 1 | `ease.out` | 0.6 s | Motion | Visível |

### 6. Para quem / esforço

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Cabeçalho | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s | Motion | Visível |
| 2 colunas | `whileInView` (`amount: 0.25`) | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s, `stagger(0.1)` | Motion | Visível |
| Itens de cada coluna | Junto da coluna | `opacity`, `x` | `0, -8px → 1, 0` | `ease.out` | 0.6 s, `stagger(0.06)` | Motion | Visível |
| 3 garantias de esforço | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.7 s, `stagger(0.08)` | Motion | Visível |
| Link "Quero ver com o meu perfil →" | Hover | seta `x 0 → 3px` | — | `ease.out` | `dur.micro` | Motion | Estático |
| Depoimento `[validar]` | `whileInView` | `opacity` | 0 → 1 | `ease.out` | 0.7 s | Motion | Visível (só entra se for real) |

### 7. CTA final + formulário

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Eyebrow, título, subtítulo | `whileInView` | `opacity`, `y` | `0, 16px → 1, 0` | `ease.out` | 0.8 s, `stagger(0.08)` | Motion | Visível |
| Card do formulário | `whileInView` | `opacity`, `y` | `0, 24px → 1, 0` | `ease.out` | 0.8 s, delay 0.15 s | Motion | Visível |
| Campos | Foco | anel de foco (`ring` = ciano, token existente) | CSS | — | 0.15 s CSS | CSS | Igual (é cor, não movimento) |
| Mensagem de erro do campo | Validação | `opacity`, `y` | `0, -4px → 1, 0` | `ease.out` | 0.2 s | Motion (`AnimatePresence`) | Só opacidade |
| Botão submit | Hover/press | `scale` | `1 → 0.98` no press | `ease.out` | `dur.micro` | Motion | Sem scale |
| Botão "Enviando…" | Submit | troca de rótulo com crossfade; spinner do `LoadingButton` existente | — | — | 0.2 s | Motion (`AnimatePresence mode="wait"` no rótulo) | Troca sem transição |
| Formulário → "Pedido recebido." | Sucesso simulado | form sai `opacity 1 → 0, y 0 → -8px`; sucesso entra `opacity 0 → 1, y 8px → 0`; o container usa `layout` para acomodar a nova altura (transform, não height) | — | `ease.inOut` | 0.4 s cada | Motion (`AnimatePresence mode="wait"` + `layout`) | Troca instantânea; mova o foco para o título do sucesso (`tabIndex={-1}`) |
| FAQ (accordion do DS) | Abrir/fechar | animação nativa do componente do DS | — | — | padrão do componente | DS | Padrão do DS |

### 8. Footer

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Conteúdo inteiro | `whileInView` (`amount: 0.2`) | `opacity` | 0 → 1 | `ease.out` | 0.6 s | Motion | Visível |
| Links | Hover | sublinhado `scaleX 0 → 1` (origin left) | — | `ease.out` | `dur.micro` | CSS | Sublinhado estático no hover |

---

## 4. Timeline detalhada da seção com pin (seção 4)

É **o único pin do site** (o limite é 2, e fica 1 de reserva). Só existe na condição `MQ.full`.

### 4.1 Estrutura

```
<section id="como-funciona-demo">           // altura natural; o pinSpacing do GSAP cria os 300vh extras
  <header>…título antes do pin…</header>     // Motion whileInView
  <div ref={stage} class="h-svh grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
    <aside> indicador 1–4 + 4 blocos de texto empilhados (absolute) </aside>
    <MacBook>
      <Screen id="B" />  <Screen id="A" />  <Screen id="C" (drawer sobre A) />  <Screen id="D" />
    </MacBook>
  </div>
  <div>CTA ao soltar o pin</div>
</section>
```

- Pin do `stage`: `pin: true`, `start: "top top"`, `end: () => "+=" + innerHeight * 3`, `scrub: 0.6`, `invalidateOnRefresh: true`, `anticipatePin: 1`.
- `snap: { snapTo: "labelsDirectional", duration: { min: 0.2, max: 0.5 }, delay: 0.15, ease: "power1.inOut" }`. Se no teste o snap parecer que "puxa" o scroll, retire, porque ele é opcional.
- As 4 telas ficam empilhadas por `position: absolute` dentro da tela do MacBook. Use `visibility: hidden` via `autoAlpha` nas telas fora de cena, para não receberem foco nem clique.
- Um `onUpdate` da timeline calcula `step = 1..4` (pela label mais próxima já passada) e chama `setStep` **só quando muda** (guarde num ref e compare). É esse estado que dispara as microinterações de Motion (§5).

### 4.2 Timeline (unidades da timeline; total = 4.0)

A timeline tem `duration` total de 4 e é mapeada nos 300vh de pin (cerca de 75vh por etapa).

| Tempo | Label | Acontece | Propriedades (GSAP, scrub) |
|---|---|---|---|
| 0.00 | `step1` | Estado inicial: tela B visível, texto 1 visível, segmento 1 do indicador em 0 | B `autoAlpha 1`; demais telas `autoAlpha 0` |
| 0.00–0.85 | — | Leitura da etapa 1. O Motion toca a conversa (§5.1) ao entrar `step = 1` | segmento 1 `scaleX 0 → 1` (ease `none`) |
| 0.85–1.15 | — | **B → A** | B: `autoAlpha 1 → 0`, `y 0 → -12px`, `scale 1 → 0.985`. A: `autoAlpha 0 → 1`, `y 16px → 0`. Texto 1 sai (`y → -12px`, `opacity → 0`), texto 2 entra (`y 12px → 0`). Ease `power2.inOut` |
| 1.00 | `step2` | `step = 2`: o Motion toca a reordenação (§5.2) | — |
| 1.00–1.85 | — | Leitura da etapa 2 | segmento 2 `scaleX 0 → 1` |
| 1.85–2.15 | — | **A → A + C** (drawer) | Overlay de escurecimento sobre A: `opacity 0 → 0.5` (navy, token do DS). Drawer C: `autoAlpha 0 → 1`, `x 40px → 0`. A **não** some (o drawer fica sobre a lista). Textos 2 → 3 |
| 2.00 | `step3` | `step = 3`: o Motion toca os checks e os sinais (§5.3) | — |
| 2.00–2.85 | — | Leitura da etapa 3 | segmento 3 `scaleX 0 → 1` |
| 2.85–3.15 | — | **A + C → D** | A, overlay e C: `autoAlpha → 0`, `y 0 → -12px`. D: `autoAlpha 0 → 1`, `y 16px → 0`. Textos 3 → 4 |
| 3.00 | `step4` | `step = 4`: o Motion toca o destaque do ponto de conexão (§5.4) | — |
| 3.00–4.00 | — | Leitura da etapa 4, com respiro antes de soltar | segmento 4 `scaleX 0 → 1` em 3.00–3.85; 3.85–4.00 sem mudança (para o pin não soltar em cima da última troca) |
| 4.00 | `end` | Pin solta; o CTA "Pronto para ver isso com o seu cliente ideal?" entra por `whileInView` | — |

### 4.3 Navegação e acessibilidade dentro do pin
- Os itens do indicador são `<button>`. O clique faz `window.scrollTo({ top: st.labelToScroll("stepN"), behavior: reduce ? "auto" : "smooth" })`. Use `aria-current="step"` no ativo e `aria-label="Etapa X de 4"`.
- O texto de cada etapa existe no DOM o tempo todo. Os não ativos ficam com `aria-hidden` e `inert` (que tiram também o foco). O bloco ativo tem `aria-live="polite"` só no título, para anunciar a troca sem repetir a tela inteira.
- As telas do MacBook são decorativas para leitor de tela (`aria-hidden` no MacBook, com um `aria-label` resumido no wrapper, como no hero). O conteúdo útil já está no texto lateral.
- Com o Tab, a navegação pula o MacBook (`inert` nele) e passa pelo indicador e pelo CTA.

### 4.4 Modos sem pin (`MQ.compact` e `MQ.reduce`)
- **compact (mobile, tablet e notebook baixo):** as 4 etapas viram 4 blocos empilhados, cada um com rótulo mono, título, texto e a **tela sozinha, sem a moldura do MacBook** (cantos arredondados, borda do DS). Entrada de cada bloco: Motion `whileInView`, `opacity 0 → 1`, `y 16px → 0`, 0.7 s. A microinteração da tela toca quando o bloco entra na viewport (`useInView` com `once: true` e `amount: 0.5`), e não por `step`. A tela C aparece sozinha (drawer como card), sem a lista atrás. Não há indicador de progresso; o rótulo `01 / 04` já orienta.
- **reduce:** mesmo layout empilhado do compact (mesmo no desktop largo, com o MacBook podendo ficar com moldura). Todas as telas vêm no estado final: conversa completa, lista já ordenada, checks marcados e destaque visível. Nenhum ScrollTrigger é criado.

---

## 5. Microinterações do protótipo (Motion)

Regras comuns:
- Cada tela expõe `play()` e `finish()`. A sequência usa `useAnimate()`, e os controles retornados ficam num ref.
- **Ao sair da etapa** (o `step` muda) antes de terminar, chame `controls.complete()`: a tela fica no estado final, nunca congelada no meio.
- **Toca uma vez por carregamento.** Se o usuário voltar para a etapa, a tela aparece no estado final, sem repetir o teatro. Exceção: a reordenação (§5.2) pode tocar de novo se o usuário voltar à etapa 1 e descer outra vez, porque é curta e é a prova principal.
- `useReducedMotion()` true faz renderizar direto o estado final, sem chamar `play()`.
- Tudo o que é texto "digitado" ou contado tem o texto completo num `sr-only` e a versão animada com `aria-hidden`.

### 5.1 Etapa 1, tela B: digitação na conversa (cerca de 4,6 s)

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00 | Campo de entrada | Placeholder "Descreva o seu cliente ideal…" some (`opacity 1 → 0`, 0.15 s); caret aparece (piscando via CSS `steps(1)`, 1 s) |
| 0.15–1.75 | Texto no campo | Digitação: `animate(0, text.length, { duration: 1.6, ease: "linear", onUpdate: v => el.textContent = text.slice(0, Math.round(v)) })`. São 1,6 s para cerca de 150 caracteres. Não use jitter aleatório, para manter o resultado determinístico. Vírgulas e pontos ganham uma pausa de 60 ms (implemente com keyframes `times`, ou digite por segmentos separados por pontuação) |
| 1.85 | Botão enviar do campo | `scale 1 → 0.94 → 1`, 0.2 s (simula o clique) |
| 1.95 | Campo | Texto some (`opacity`, 0.15 s) e o placeholder volta |
| 1.95–2.35 | Bolha da Camila | Entra no thread: `opacity 0 → 1`, `y 8px → 0`, 0.4 s, `ease.out` |
| 2.45–3.05 | Indicador "fynd está escrevendo" (3 pontos) | Pontos com `opacity 0.3 ↔ 1` em sequência (`repeat: 1`, 0.6 s no total). Depois o indicador sai (`opacity → 0`) |
| 3.05–3.45 | Bolha da fynd "Entendi. Vou buscar…" | `opacity 0 → 1`, `y 8px → 0`, 0.4 s |
| 3.35–3.95 | 4 chips de critério (Setor, Região, Porte, Sinal) | `opacity 0 → 1`, `scale 0.96 → 1`, `y 4px → 0`, 0.45 s cada, `delay: stagger(0.08)` |
| 3.95–4.25 | "Quer ajustar algo antes de eu buscar?" + botões | `opacity 0 → 1`, `y 8px → 0`, 0.4 s, botões com `stagger(0.06)` |
| 4.35–4.55 | "Buscar empresas" | Estado pressionado: `scale 1 → 0.97 → 1`, 0.2 s |
| 4.55–4.95 | Mensagem de resultado "Encontrei 148 empresas…" | `opacity 0 → 1`, `y 8px → 0`, 0.4 s. Faz a ponte para a tela A |

O thread rola internamente para manter a última mensagem visível. Use `y` negativo no container interno (transform), e não `scrollTop` animado.

### 5.2 Etapa 2, tela A: lista se reordenando (cerca de 2,4 s)

Ordem inicial: **71, 92, 58, 84, 64, 77**, ou seja, Casa Doce, Serra Azul, Grão Fino, Bem Natural, Prisma, Vale Verde. Ordem final: **92, 84, 77, 71, 64, 58**.

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.45 | Cabeçalho da tela (breadcrumb "Perfis ideais / Indústria Sudeste", título, chips) | `opacity 0 → 1`, `y 8px → 0`, `stagger(0.06)` |
| 0.20–1.00 | Barras de aderência na ordem inicial | `scaleX 0 → pct/100` (origin left), 0.8 s, `ease.out`, `stagger(0.06)` |
| 0.20–1.00 | Números `%` | Contagem `0 → pct` em sincronia com as barras (`animate` + `onUpdate` no `textContent`) |
| 1.05 | Linha "Ordenado pela aderência ao seu perfil ideal" | `opacity 0 → 1`, 0.3 s. Sinaliza a reordenação que vem |
| 1.10–1.85 | **Reordenação** | `setOrder(final)` numa só troca. Cada `<motion.li layout>` dentro de `<LayoutGroup>`, com `transition={{ layout: { duration: 0.75, ease: [0.65, 0, 0.35, 1] } }}`. Só transform (FLIP do Motion). Os cards que sobem passam por cima (`z-index` maior para quem tem `fit` maior durante a transição) |
| 1.90–2.35 | Serra Azul vira ativa | Barra ciano lateral `scaleY 0 → 1` (origin center), 0.45 s, `ease.out`; `data-active` aplicado (fundo e cor por transição CSS existente) |
| 2.35 | Fim | Estado estável, igual ao do hero |

- O `<ul>` mantém altura fixa (todas as linhas com a mesma altura), para o `layout` não deslocar nada fora da lista.
- Use `layout="position"` nos cards para não distorcer o texto. Os cards não mudam de tamanho.
- A barra ciano precisa ser um `<span>` real (hoje é um `::before`), porque pseudo-elemento não é animável pelo Motion. Mantenha a cor `bg-signal`.

### 5.3 Etapa 3, tela C: drawer com contexto (cerca de 2,0 s depois da entrada pelo scrub)

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.40 | Cabeçalho (avatar SA, nome, cidade) | `opacity 0 → 1`, `y 8px → 0` |
| 0.10–0.90 | Selo "92% de aderência…" | Contagem `0 → 92` + anel/barra do selo `scaleX 0 → 0.92`, 0.8 s |
| 0.30–0.90 | "Dados cadastrais" (8 linhas) | `opacity 0 → 1`, `y 4px → 0`, 0.45 s, `stagger(0.04)` (exceção ao stagger mínimo: são linhas de tabela curtas) |
| 0.90–1.60 | "Por que está no topo": 4 linhas com check | Cada linha: ícone check desenhado (`pathLength 0 → 1`, 0.35 s) e depois o texto (`opacity 0 → 1`, `x -6px → 0`, 0.4 s). `stagger(0.1)` entre linhas |
| 1.50–1.90 | "Sinais de contexto" | `opacity 0 → 1`, `y 8px → 0`, `stagger(0.08)` |
| 1.80–2.10 | Linha mono de fontes + botões | `opacity 0 → 1` |

O check usa a cor de sucesso/neutra do DS, nunca ciano.

### 5.4 Etapa 4, tela D: sugestão de abordagem (cerca de 1,9 s)

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.40 | Título do painel, "Para", seletores Canal/Tom | `opacity 0 → 1`, `y 8px → 0`, `stagger(0.06)` |
| 0.20–0.60 | Indicador do Tom | O pill de seleção desliza de "Direto" para "Consultivo" com `layoutId="tone-pill"` (0.4 s, `ease.inOut`). Mostra que o tom é escolha do usuário |
| 0.40–0.90 | Assunto + corpo do e-mail | `opacity 0 → 1`, parágrafos com `stagger(0.08)`. O texto **não** é digitado: é um rascunho pronto, e digitar de novo aqui repetiria a etapa 1 |
| 0.95–1.55 | Destaque do ponto de conexão ("abriu uma unidade em Uberlândia neste ano") | Fundo de destaque atrás do trecho: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`, 0.6 s, `ease.out`. É um dos dois usos de `clip-path`. Cor de destaque neutra/navy do DS, não ciano |
| 1.45–1.85 | Etiqueta "Ponto de conexão: nova filial" | `opacity 0 → 1`, `x -6px → 0`, 0.4 s |
| 1.60–1.90 | Botões Copiar/Ajustar + nota "Você revisa antes de enviar…" | `opacity 0 → 1`, `y 4px → 0` |

### 5.5 Interações do usuário dentro do MacBook
- O MacBook é `inert` e `aria-hidden` (ver §4.3), então não há foco nem clique dentro dele. Os hovers dos cards também ficam desativados, porque a tela é demonstração, não app.
- **Exceção opcional:** no hero, os cards podem ter hover visual (`bg-accent`, CSS existente) se o design pedir, sem clique.
- O toast "Mensagem copiada." **não** aparece sozinho. Se o design quiser um fechamento para a etapa 4, use o botão "Copiar" pressionado (`scale 0.97`) e o toast interno da tela (`opacity`, `y 8px → 0`, 0.3 s, some após 1.6 s) por volta de t = 2.2 s. Ele roda só uma vez e é renderizado dentro do mockup, não pelo Toaster global.

---

## 6. Movimento reduzido: resumo
- `MotionConfig reducedMotion="user"` corta transform e layout em todo o Motion; o que sobra é fade de opacidade, que é aceitável. Nas sequências com estado (digitação, contagem, reordenação), `useReducedMotion()` renderiza o estado final direto.
- O GSAP só cria ScrollTriggers nas condições `full`/`compact`. Em `reduce`, o `matchMedia` não cria nada e o conteúdo fica no estado final (sem `SplitText`, sem pin, sem scrub).
- Nenhum estado inicial "escondido" vem do CSS. Os estados iniciais são aplicados pelo JS (`initial` do Motion e `gsap.set`/`from` dentro do `matchMedia`). O H1 do hero nunca fica invisível.
- O CSS global da landing inclui `@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto } .caret { animation: none } }`.

## 7. Performance e checklist do dev
- No máximo **1 pin** (seção 4). O scrub da tampa do hero não pinta nada fora do MacBook.
- `will-change: transform` só nos wrappers com scrub (tampa do hero e telas da seção 4). Remova nos demais.
- Nenhum `ScrollTrigger` dentro de componentes de lista: um por seção, dentro do `useGSAP` com `scope`.
- O `setStep` da seção 4 só dispara quando o valor muda; nunca faça `setState` em todo `onUpdate`.
- Contagens e digitação escrevem em `ref.textContent`, sem re-render do React.
- Teste com o DevTools em CPU 4× mais lenta: o scrub precisa ficar sem saltos e sem layout shift (CLS 0 nas seções animadas).
- Teste a ordem dos ScrollTriggers: o pin da seção 4 muda as posições abaixo dela, então os triggers das seções 5–8 são criados depois (ordem de montagem) ou com `refreshPriority` menor.
- Pendências para o design (`03-design.md`): a cor do overlay que escurece a lista na etapa 3, o tom de destaque do ponto de conexão na etapa 4, a moldura do MacBook (imagem ou CSS) e o fundo da seção 4. Se o design definir um fundo escuro para o palco, o ciano da barra ativa continua válido (é sinal), e o restante segue a regra do `primary` papel.
