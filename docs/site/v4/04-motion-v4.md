# 04 — Motion v4 (só o que muda em relação à v3)

_Etapa 3 do `/site` v4 · agente `site-motion` · 2026-10-07 · modo direto_
_Base: `00-briefing-v4.md`, `docs/site/04-motion.md` (doc mestre, continua valendo) e o código v3 (`sections/*-v3.tsx`, `platform-v3/*`, `motion/*`)._

Tudo o que não aparece aqui segue o `04-motion.md` e o comportamento atual da v3: tokens (§2 do mestre), `MQ` de `motion/gsap.ts`, `Reveal`/`RevealGroup`/`RevealItem`, `useScreenSequence`/`useEffectiveState`/`useReplayKey`/`pre()` de `platform/playback.ts`, `CountUp`, `InterestSeal` + `sealSequence`, header, para quem, acesso + FAQ e footer.

**Direção da v4: menos animação.** A página fica mais curta e o movimento acompanha. Saldo final: 1 pin (era 1), com 240vh (era 300vh), 3 telas com playback (eram 4) e uma seção a menos com coreografia (Dados sai inteira).

---

## 0. O que sai da v3 (não portar para os `-v4`)

| Sai | Onde estava | Por quê |
|---|---|---|
| Tela "Primeiro contato" e o seu playback | `screen-contato-v3`, etapa 3 do pin | A etapa não existe mais (briefing v4) |
| Reordenação da lista de fit (FLIP, `useTimeline`, barra ciano lateral do card ativo) | `screen-fit-v3` | A tela de Fit vira volume, sem lista e sem % |
| Exceção "a etapa 2 toca de novo ao descer da 1" no `goTo` | `demo-v3.tsx` | Era da reordenação. Na v4 toda tela toca uma vez por carregamento e, ao voltar, aparece no estado final |
| "Assumir conversa" pressionado + toast interno na etapa final | `screen-interessados-v3` (`toast`) | Fechamento teatral que alonga a etapa. O rodapé da tela ("A partir daqui, a conversa é sua") já fecha a ideia |
| Lista cinza → linha iluminada (scrub) | `problem-v3` + `noise-list-v3` | O contraste "hoje × com a fynd" ocupa o lugar dela |
| Diagrama de fontes, conectores e contador de escala | Seção Dados (mestre §3.5) | A seção sai. O "mais de 25 milhões de CNPJs" vira texto, **sem contador** |
| Faixa de provas do hero (4 itens com ícone) | `hero-v3` (`PROOFS`) | Substituída pela linha de zero setup (§5) |

---

## 1. Demo com pin: 3 etapas (Seu produto → Fit → Interessados)

Continua sendo **o único pin do site**, só em `MQ.full`. Estrutura, palco, indicador lateral, navegação por botão, `aria-live`, `inert` e modo empilhado são os da v3 (`demo-v3.tsx`), com 3 etapas no lugar de 4.

### 1.1 Parâmetros do ScrollTrigger

| Parâmetro | v3 | v4 |
|---|---|---|
| `end` | `"+=" + innerHeight * 3` (300vh) | `"+=" + innerHeight * 2.4` (240vh, cerca de 80vh por etapa; a etapa 1 tem o playback mais longo) |
| Duração total da timeline | 4.0 | **3.0** (1.0 por etapa) |
| `stepFromProgress` | `floor(p * 4 + 0.12)`, clamp 0..3 | `Math.min(2, Math.max(0, Math.floor(p * 3 + 0.12)))` |
| `snap.snapTo` | `pos = p * 4`; `local > 0.74 → ceil(pos) / 4` | `pos = p * 3`; `local > 0.74 → Math.min(1, ceil(pos) / 3)`. Resto igual (`inertia: false`, `duration {0.2, 0.5}`, `delay 0.15`, `power1.inOut`) |
| Labels | `step1..step4`, `end` em 4 | `step1` (0), `step2` (1), `step3` (2), `end` (3) |
| Indicador | 4 segmentos, "Etapa X de 4" | 3 segmentos, `aria-label="Etapa X de 3: …"`, rótulos `01 / 03 · SEU PRODUTO`, `02 / 03 · FIT`, `03 / 03 · INTERESSADOS` |
| Entrada do MacBook antes do pin | `y 48 → 0`, `opacity 0.4 → 1`, `start "top 90%"`, `end "top top"`, scrub 0.6 | Igual |
| `scrub`, `anticipatePin`, `invalidateOnRefresh` | 0.6, 1, true | Igual |

### 1.2 Timeline (unidades da timeline; total = 3.0, mapeado em 240vh)

| Tempo | Label | Acontece | Propriedades (GSAP, `ease: "none"` salvo indicação) |
|---|---|---|---|
| 0.00 | `step1` | Tela Seu produto visível, texto 1 visível | `gsap.set(texts.slice(1), { autoAlpha: 0, y: 12 })`; `fills` em `scaleY 0` |
| 0.00–0.85 | — | Leitura da etapa 1. `step = 0` dispara o playback §1.4 | `fills[0]`: `scaleY 0 → 1` |
| 0.76–0.88 | — | Texto 1 sai | `autoAlpha 1 → 0`, `y 0 → -12`, 0.12, `power2.in` |
| 0.88–1.00 | — | Texto 2 entra; a tela troca em 0.88 (`stepFromProgress` com +0.12) | `autoAlpha 0 → 1`, `y 12 → 0`, 0.12, `power2.out` |
| 1.00 | `step2` | `step = 1`: playback §1.5 | — |
| 1.00–1.85 | — | Leitura da etapa 2 | `fills[1]`: `scaleY 0 → 1` |
| 1.76–2.00 | — | Troca de texto 2 → 3 (mesmo `swap` da v3) | idem |
| 2.00 | `step3` | `step = 2`: playback §1.6 | — |
| 2.00–2.85 | — | Leitura da etapa 3 | `fills[2]`: `scaleY 0 → 1` |
| 2.85–3.00 | — | Respiro: o pin não solta em cima do playback final | `tl.to({}, { duration: 0.15 }, 2.85)` |
| 3.00 | `end` | Pin solta; CTA pós-demo entra por `Reveal` (igual à v3) | — |

A troca de tela dentro do MacBook continua no Motion (`AnimatePresence` do `PlatformDemoV4`, `opacity 0 → 1` / `y 16 → 0`, saída `y -12`, `scale 0.985`, 0.5 s, `EASE_IN_OUT`), disparada pela mudança de `step`. O GSAP só mexe nos textos laterais, nos `fills` e no wrapper do MacBook. As duas libs nunca tocam o mesmo nó.

### 1.3 Regras de playback (mudanças)
- `goTo` simplificado: `state = playedRef.has(next) ? "final" : "play"`. Sem exceção de replay.
- Ao sair da etapa no meio do playback, `useScreenSequence` já chama `complete()`: a tela fica no estado final. Mantido.
- Movimento reduzido: `useEffectiveState` entrega `final` direto. Mantido.
- Modo empilhado (`compact` e `reduce`): 3 blocos, cada um com `PlatformPanelV4` e `useInViewState(ref, undefined, { amount: 0.5 })`. Indicador estático de 3 traços.

### 1.4 Tela Seu produto (etapa 1, cerca de 4,4 s)

Ponto de partida: o playback da `screen-conversa-v3` (campo → bolha da Camila → resposta da fynd). Sai o indicador "escrevendo" (economiza 0,6 s) e entram o CNPJ, os anexos e a linha do especialista. Seletores `data-a`, tudo em `useScreenSequence`.

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.15 | Placeholder do campo | `opacity 1 → 0` |
| 0.15–0.65 | Campo CNPJ (linha própria no compositor, mono, `tabular-nums`) | Digitação linear com `TextType` (`duration: 0.5`). O texto já vem com a máscara (`00.000.000/0000-00`), então a largura cresce caractere a caractere sem reflow do resto. O CNPJ é o fictício do `data-v4`, nunca um real |
| 0.75–1.95 | Texto do produto | `TextType`, `duration: 1.2`, linear (o texto da v4 é mais curto que o da v3) |
| 2.00–2.40 | Chips de anexo (site, PDF do catálogo) no compositor | `opacity 0 → 1`, `scale 0.96 → 1`, `y 4 → 0`, 0.35 s, `stagger(0.08)`, `EASE_OUT`. Sem barra de upload |
| 2.45–2.65 | Botão enviar | `scale 1 → 0.94 → 1`, 0.2 s |
| 2.55–2.95 | Bolha da Camila (CNPJ + texto + chips de anexo) | `opacity 0 → 1`, `y 8 → 0`, 0.4 s; o compositor volta ao placeholder (`opacity`, 0.15 s) |
| 3.05–3.45 | Bolha da fynd com o resumo ("Entendi: …") | `opacity 0 → 1`, `y 8 → 0`, 0.4 s |
| 3.30–3.75 | Chips do perfil proposto (setor, região, porte) | `opacity 0 → 1`, `scale 0.96 → 1`, `y 4 → 0`, 0.45 s, `stagger(0.08)` (o `CriterionChip` da v3) |
| 3.85–4.25 | Linha "Especialista comercial · Lumi" + badge "Pronto para aprovação" + botão "Revisar" | Entra como uma linha só: `opacity 0 → 1`, `y 8 → 0`, 0.4 s. **Sem clique simulado e sem troca para "Aprovado"**: a linha mostra que dá para validar, não vira etapa de configuração. Badge neutro (`secondary`), nunca ciano |
| 4.05–4.45 | Mensagem-ponte para o Fit ("Perfil pronto. Já estou buscando…") | `opacity 0 → 1`, `y 8 → 0`, 0.4 s |

- O thread continua alinhado por baixo (`justify-end`), como na v3: as mensagens novas empurram as antigas sem `scrollTop` animado.
- Texto digitado com o valor completo em `sr-only` e a versão animada `aria-hidden` (o MacBook inteiro já é `aria-hidden`/`inert`; no painel empilhado, o `role="img"` leva o resumo).
- Painel (`layout="panel"`): mesma sequência; o texto do produto usa `line-clamp-2` como na v3.

### 1.5 Tela Fit (etapa 2, cerca de 1,9 s)

Sem lista, sem nomes, sem %. O número é a informação; o resto entra discreto.

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.45 | Cabeçalho ("Empresas com o seu perfil", breadcrumb, chips do perfil) | `opacity 0 → 1`, `y 8 → 0`, `stagger(0.06)` (igual ao `head` da v3) |
| 0.15–1.45 | **Número 4.860** (display, `font-light`, `tabular-nums`) | `CountUp to={4860} duration={1.3} delay={0.15}`, `EASE_OUT`, formatação pt-BR ("4.860"). A largura é reservada por um "fantasma" com o valor final (`invisible`) sob o número animado (grid 1/1), para CLS 0. Sem `scale` e sem brilho: o número para e fica |
| 0.25–0.65 | Legenda do número ("empresas com o seu perfil em todo o Brasil") | `opacity 0 → 1`, `y 4 → 0`, 0.4 s |
| 0.55–1.25 | Recortes agregados (3 blocos: setores, regiões, porte) | Blocos: `opacity 0 → 1`, `y 8 → 0`, 0.45 s, `stagger(0.08)`. Se o design usar barras de proporção nos recortes: `scaleX 0 → share` (origin left, cor neutra `navy-200`/`steel`), 0.6 s, `stagger(0.06)`, **sem número de %** ao lado |
| 1.45–1.85 | Faixa "A fynd já começou a abordar e qualificar." | `opacity 0 → 1`, `y 4 → 0`, 0.4 s, logo depois do número assentar. Ícone neutro (`navy-600`), estático. Nada de pulso nem ciano: o andamento não é o sinal, o interesse é |

`CountUp` já cobre `instant` (estado `final`) e movimento reduzido (valor final direto).

### 1.6 Tela Interessados (etapa 3, cerca de 2,2 s; é também a tela do hero)

Ponto de partida: `screen-interessados-v3` (sequência `head` → `card` → `detail` → selo → `foot`). Muda o card (formato do escopo) e entra a aderência, que agora só existe aqui.

| t (s) | Elemento | Animação |
|---|---|---|
| 0.00–0.45 | Cabeçalho ("Responderam e querem saber mais", "12 interessadas") | `opacity 0 → 1`, `y 8 → 0`, `stagger(0.06)` |
| 0.15–0.85 | Cards chegando (ativo + compactos; 5 no canvas, 3 no painel) | `opacity 0 → 1`, `y 12 → 0`, 0.6 s, `stagger(0.06)` (5 itens). Cada card chega inteiro: Empresa, Contato (nome e cargo), Status |
| 0.35–1.15 | Barras de aderência de cada card | `scaleX 0 → pct/100` (origin left, `barScale` do `OpportunityCard` ou barra equivalente com o mesmo contrato), 0.8 s, `EASE_OUT`, mesmo stagger dos cards (0.06), começando 0.2 s depois do card |
| 0.35–1.15 | Número `%` | `CountUp` em sincronia com a barra (mesmo `delay`) |
| 0.55–0.95 | Detalhe do card ativo (Serra Azul): Interesse identificado, Próximo passo, ações "Assumir conversa" / "Agendar reunião" | `opacity 0 → 1`, `y 4 → 0`, 0.45 s, `stagger(0.06)` |
| 1.20–2.10 | **Selo ciano "Demonstrou interesse"** no card ativo | `sealSequence(1.2, "[data-a=card-active]")`: camada `signal` `opacity 0 → 1`, `scale 0.92 → 1`, 0.45 s; anel `opacity 0 → 0.7 → 0`, `scale 1 → 1.35`, 0.9 s, **uma vez**. Acende depois da barra do card ativo terminar: primeiro a evidência, depois o sinal |
| 1.30–1.70 | Rodapé ("Ver os 12 interessados" + "A partir daqui, a conversa é sua.") | `opacity 0 → 1`, 0.4 s |

- Os demais cards usam o selo neutro, sem animação própria.
- Os status ("Pediu amostras", "Pediu proposta") são badges estáticos que entram com o card.
- Sem reordenação: a lista já vem em "Mais recentes" e a aderência alta não "sobe" na tela.
- Hero: mesmo componente (`HeroScreenV4` com `play` após 0.85 s do `useInView` do MacBook, como na v3), sem toast.

---

## 2. O problema: "hoje × com a fynd"

Sem pin. O título continua com o scrub por palavra da v3 (`SplitText`, `start "top 80%"`, `end "top 35%"`, `opacity 0.15 → 1`, `scrub: 0.6`, só em `full`/`compact`), agora em "Mais mailing não resolve. Interesse resolve.". O que muda é o bloco de contraste.

Estrutura: linhas pareadas (cada dor "hoje" tem o seu par "com a fynd" na mesma linha no desktop; no mobile, o par fica empilhado: X em cima, check embaixo). A primeira linha é a do **sem setup**.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Cabeçalhos das colunas ("Hoje" / "Com a fynd") | `RevealGroup` do bloco, `amount: 0.25` | `opacity`, `y` | `0, 16 → 1, 0` | `EASE_OUT` | 0.7 s, `stagger(0.08)` | Motion | Visível |
| Linha (par) | Mesmo grupo, uma `RevealItem` por linha | `opacity`, `y` | `0, 8 → 1, 0` | `EASE_OUT` | 0.6 s, `stagger(0.08)` entre linhas | Motion | Visível |
| Item "hoje" + ícone X (`destructive`, só no ícone) | Junto da linha | — (entra com a linha) | — | — | — | Motion (herda) | Visível |
| Item "com a fynd" | 0.12 s depois do "hoje" da mesma linha (variant filho com `delay: 0.12`) | `opacity`, `x` | `0, -6 → 1, 0` | `EASE_OUT` | 0.5 s | Motion | Visível |
| Ícone check do "com a fynd" | Junto do item | `pathLength` do `<path>` do check | `0 → 1` | `EASE_OUT` | 0.35 s | Motion (`motion.path` com o path do lucide `Check`) | Check desenhado |
| Fecho "lead frio → lead quente" | `Reveal`, `amount: 0.5` | `opacity`, `y` | `0, 12 → 1, 0` | `EASE_OUT` | 0.7 s | Motion | Visível |
| Seta do fecho | 0.2 s depois do fecho | `x` | `-4 → 0` | `EASE_OUT` | 0.4 s | Motion | Estática |

Regras de contenção:
- **O X não anima sozinho.** Sem shake, sem risco atravessando o texto, sem vermelho pulsando: a dor é lida, não encenada. Só o check tem desenho, e é curto.
- O "hoje" não apaga quando o "com a fynd" aparece (nada de `opacity 0.35` na coluna da esquerda): apagar a esquerda viraria o comparativo sistema × sistema que o Eduardo pediu para evitar.
- Nenhum ciano na seção. O check usa a cor neutra/sucesso do DS.
- Total do bloco, do primeiro cabeçalho ao último check: cerca de 1 s.

---

## 3. Faixa do motor (dentro de Como funciona)

`entender → encontrar → abordar → conversar → qualificar → entregar` + "A complexidade fica com a fynd."

Uma passada só, ao entrar na viewport, da esquerda para a direita. Uma `RevealGroup` (`amount: 0.5`, `gap: 0.06`) cujos filhos alternam **nó** e **conector** (11 filhos), para um único stagger cobrir os dois.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| Nós (rótulo mono em caixa baixa, o motor não leva "fynd" em `uppercase`) | `RevealGroup`, `once`, `amount: 0.5` | `opacity`, `y` | `0, 8 → 1, 0` | `EASE_OUT` | 0.5 s | Motion | Visível |
| Conectores (linha de 1 px ou "→") | Mesmo stagger, entre os nós | `scaleX` (origin left) | `0 → 1` | `EASE_OUT` | 0.3 s | Motion | Desenhados |
| Nó "entregar" | Fim da passada (+0.1 s depois do último conector) | troca de classe `data-done`: `text-muted-foreground → text-foreground` (transição de cor CSS 0.3 s) | — | CSS | 0.3 s | — (o `onAnimationComplete` do grupo aplica o atributo) | Já em `foreground` |
| "A complexidade fica com a fynd." | Depois do último nó | `opacity` | `0 → 1` | `EASE_OUT` | 0.5 s, `delay: 0.75` | Motion | Visível |

- Total: cerca de 1,1 s. **Não repete, não faz loop, não tem ponto viajando pela linha.**
- Mobile: a faixa quebra em 2 linhas de 3 (ou vira vertical). O conector da quebra de linha some (`hidden`); conectores verticais usam `scaleY` (origin top).
- Sem ciano: o destaque do "entregar" é só contraste de texto.

**Ajuste no Como funciona (consequência):** o mini do passo 2 (`MiniEncontraV3`, 3 barras 148 → 60 → 12) mostra o miolo do contato, que agora fica no off. No `-v4`, ele passa a ter **2 barras** (4.860 → 12) com a mesma animação em degraus (`scaleX`, 0.6 s, `stagger(0.1)`). Os outros dois minis e a entrada dos 3 cards seguem a v3.

---

## 4. "Você só precisa vender"

Seção curta, revelação curta. Sem GSAP.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| "Não é CRM. Não é chatbot. Não é base de leads. Não é automação." (4 frases curtas, cada uma num `span`) | `RevealGroup`, `amount: 0.4` | `opacity`, `y` | `0, 8 → 1, 0` | `EASE_OUT` | 0.6 s, `stagger(0.08)` | Motion | Visível |
| Título/linha "Você não precisa…" | Mesmo grupo, depois das negações | `opacity`, `y` | `0, 16 → 1, 0` | `EASE_OUT` | 0.7 s | Motion | Visível |
| 6 itens (buscar mailing, fazer setup, subir sua base, configurar automação, definir cliente ideal, entender de tecnologia) | `RevealGroup` da lista, `amount: 0.3` | `opacity`, `y` | `0, 8 → 1, 0` | `EASE_OUT` | 0.6 s, `stagger(0.06)` | Motion | Visível |
| "Você só precisa atender quem já quer comprar." | `Reveal`, `amount: 0.5` | `opacity`, `y` | `0, 12 → 1, 0` | `EASE_OUT` | 0.8 s | Motion | Visível |
| Linha de base ("mais de 25 milhões de CNPJs, do Brasil todo, organizados…") | `Reveal` | `opacity` | `0 → 1` | `EASE_OUT` | 0.6 s | Motion | Visível |

- **Sem contador no "25 milhões".** É argumento de texto, não placar; números animados ficam só dentro das telas.
- Sem risco animado nos itens "você não precisa" (nada de `line-through` desenhado com `clip-path`): o ícone de cada item é estático.
- Total por bloco: abaixo de 1 s.

---

## 5. Hero

Mantido da v3: entrada do texto (`RevealGroup onMount`, `gap 0.08`, `startDelay 0.1`, H1 sem fade), MacBook (`y 40 → 0`, 0.9 s, delay 0.25), tampa com scrub (`rotateX 14 → 0`, `scale 0.94 → 1`, só `full`/`compact`), trilha pontilhada, ponto aceso ciano e playback da tela Interessados (§1.6) 0.85 s depois do MacBook entrar na viewport.

| Elemento | Gatilho | Propriedade | De → Para | Easing | Duração | Lib | Reduzido |
|---|---|---|---|---|---|---|---|
| **Linha de zero setup** (logo abaixo dos botões, no lugar da faixa de provas) | Último filho do `RevealGroup onMount` | `y` (sem fade, como os irmãos) | `16 → 0` | `EASE_OUT` | 0.8 s, no stagger do grupo | Motion | Estática |
| Itens da linha (se houver separadores ou ícones) | — | **Sem stagger próprio**: a linha entra como um bloco | — | — | — | — | — |
| 3 cards flutuantes (Você vende → 4.860 empresas com o seu perfil → 12 interessadas) | `whileInView`, `amount: 0.6` | `opacity`, `y`, `scale` | `0, 24, 0.96 → 1, 0, 1` | `EASE_OUT` | 0.8 s, `delay 0.5 + i * 0.15` | Motion | Só fade (o `MotionConfig` corta o resto) |
| Parallax dos cards | `full` apenas, `trigger: mac`, `start "top bottom"`, `end "bottom top"` | `y` | `60·speed → -60·speed` | `none` | `scrub: 0.8` | GSAP (no `data-parallax` interno) | Sem parallax |
| Número "4.860" do card do meio | — | **Estático.** A contagem acontece uma vez só na página, na tela de Fit da demo | — | — | — | — | — |

- Os 3 cards mantêm a mesma posição, velocidade e ordem de leitura da v3; muda só o conteúdo do card do meio (de "Fit 148" para "4.860 empresas com o seu perfil").
- A linha de zero setup não tem ícone animado, check desenhado nem ciano: ela precisa parecer calma ao lado dos botões.
- O H1 continua sem `opacity 0` inicial (LCP).

---

## 6. Movimento reduzido e performance (deltas)

- Nada novo foge do padrão: os estados iniciais escondidos vêm do JS (`initial` do Motion, `pre()` nas telas, `gsap.set` dentro do `matchMedia`), e `data-reveal` mantém tudo visível antes da hidratação e sem JS.
- `reduce`: sem pin, sem `SplitText`, sem scrub; demo empilhada com as 3 telas em `final` (CNPJ e texto completos, 4.860 sem contagem, barras cheias, selo ciano aceso); checks já desenhados; faixa do motor com conectores desenhados e "entregar" em `foreground`.
- `pathLength` só nos checks do problema (SVG pequeno, sem custo de layout). Contagens escrevem em `textContent` (`CountUp`), sem re-render.
- `will-change: transform` continua só na tampa do hero e no wrapper do MacBook pinado.
- A ordem dos ScrollTriggers da v3 se mantém: o pin da demo empurra o que vem abaixo, e as seções abaixo dele (Você só precisa vender, Para quem, Acesso) usam só Motion `whileInView`, que não depende do `refresh`.
- Checklist de teste: CPU 4× mais lenta, 1440×900 e 1280×720 (o pin entra) e 1280×640 (empilhado); trocar `prefers-reduced-motion` com a página aberta (o `matchMedia` reverte tudo).

---

## Resumo

- **Demo:** 3 etapas, pin de 240vh (era 300vh), timeline 0–3 com `stepFromProgress = floor(p·3 + 0.12)` e snap ajustado. Playbacks: Seu produto em cerca de 4,4 s (CNPJ digitado, texto, anexos, resumo, linha do especialista sem clique), Fit em cerca de 1,9 s (contagem até 4.860, recortes agregados, sem lista) e Interessados em cerca de 2,2 s (cards, aderência com barra e contagem, selo ciano acendendo uma vez). Sem replay, sem reordenação e sem toast.
- **Problema:** cada par "hoje × com a fynd" entra junto. O X fica parado, só o check se desenha (0,35 s) e o "hoje" não apaga.
- **Motor:** uma passada de cerca de 1,1 s, nós e conectores num stagger único, e o "entregar" ganha contraste no fim.
- **Você só precisa vender:** fades curtos em stagger, sem contador e sem risco animado.
- **Hero:** a linha de zero setup entra no stagger do grupo e os 3 cards seguem a coreografia da v3, com o 4.860 estático.
- **Saldo:** 1 pin, 3 telas, uma seção a menos com coreografia, e o ciano só no ponto do hero e no selo de interesse.
