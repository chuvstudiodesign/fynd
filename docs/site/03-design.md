# 03 — Design do site da fynd

_Etapa 3 do `/site` · agente `site-design` · 2026-10-01_
_Base: `00-briefing.md`, `01-arquitetura.md`, `02-copy.md`, `src/app/globals.css`, `src/components/typography.tsx`, `ui/button.tsx`, `ui/badge.tsx`, `opportunity-card.tsx`, `brand/*`, `DESIGN_PLAYBOOK.md` §2 e §4, `skills/color-typography-system`, `skills/presentation-design-principles`._
_Paralelo: motion (`site-motion`) e componentes. Este documento fixa **estados de início e fim, layout e cor**. As curvas, durações e gatilhos ficam com o motion._

**Ideia de direção:** a página vai do escuro para o claro, como a passagem da incerteza para a clareza. O campo azul profundo (`navy-900`) abre o site e a tela do produto é a fonte de luz: a interface aparece **clara**, dentro de um MacBook escuro. O ciano aparece só onde a fynd aponta algo, como o item ativo, um sinal ou o botão final. A sofisticação vem do espaço, do alinhamento e da contenção. Não usamos brilhos, gradientes decorativos nem ilustração.

---

## 1. Grid, espaçamento e tipografia

### 1.1 Container e colunas

| Faixa | Breakpoint (Tailwind) | Colunas | Gutter (gap) | Margem lateral | Container |
|---|---|---|---|---|---|
| Mobile | `< sm` (< 640) | 4 | 16px (`gap-4`) | 20px (`px-5`) | 100% |
| Tablet | `sm`–`md` (640–1023) | 8 | 24px (`gap-6`) | 32px (`px-8`) | 100% |
| Desktop | `lg` (≥ 1024) | 12 | 24px (`gap-6`) | 48px (`px-12`) | 100% |
| Largo | `xl` (≥ 1280) | 12 | 32px (`gap-8`) | 64px (`px-16`) | **max 1280px** (`max-w-7xl`), centrado |

- Um único wrapper `SiteContainer` (`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16`). Toda seção usa esse wrapper, e nenhuma inventa a própria largura.
- Grid interno: `grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12` com os gaps acima.
- **Eixo de alinhamento:** todo título de seção começa na coluna 1 (alinhado à esquerda). As únicas exceções centradas são o hero, a abertura da demonstração e a linha pós-pin. Isso cria uma margem esquerda forte e editorial.
- **Medida de leitura:** corpo e subtítulo com `max-w-[36rem]` (cerca de 60 caracteres). Títulos com `max-w-[18ch]` (display) ou `max-w-[22ch]` (h1/h2), sempre com `text-balance`.
- Sangria: só o MacBook do hero pode ultrapassar o container no mobile (ver §3.6).

### 1.2 Escala de espaçamento (base 8)

| Uso | Mobile | md | lg+ |
|---|---|---|---|
| Padding vertical de seção (`--section-y`) | 96px `py-24` | 128px `py-32` | 160px `py-40` |
| Eyebrow → título | 16px `mt-4` | 16px | 20px `mt-5` |
| Título → subtítulo | 20px `mt-5` | 24px `mt-6` | 24px |
| Subtítulo → botões | 32px `mt-8` | 40px `mt-10` | 40px |
| Cabeçalho da seção → conteúdo | 48px `mt-12` | 64px `mt-16` | 80px `mt-20` |
| Entre cards irmãos | gutter | gutter | gutter |
| Padding interno de card | 24px `p-6` | 32px `p-8` | 32px |
| Separação entre blocos dentro da seção (ex.: colunas → faixa de garantias) | 64px | 80px | 96px `mt-24` |

Regra: os espaços entre seções nunca são preenchidos com divisores. A troca de tema já separa as seções. Quando duas seções seguidas têm o mesmo tema (5 → 6), use uma hairline `border-t border-border` no container, nunca na largura total.

### 1.3 Papéis tipográficos no site (usar `<Text variant>`)

| Papel | Variante | Onde |
|---|---|---|
| Título do hero | `display` (72px no md+), com `render={<h1/>}` | só o hero |
| Título de seção | `h1` visual com tag `h2` (`<Text variant="h1" render={<h2/>}>`) | seções 2 a 7 |
| Título de bloco | `h3` | colunas da seção 6, título lateral da demo |
| Título de card | `h4` | passos (3), blocos de dados (5) |
| Subtítulo | `lead` | logo após cada título de seção |
| Corpo | `p` | cards e textos |
| Rótulo | `eyebrow` (mono, caixa alta, `tracking-label`) | eyebrow de seção, `01 · DESCREVA`, `01 / 04 · CONVERSA` |
| Dado | `data` | %, CNPJ, números |

- Título sempre em Sora 300 com `tracking-display`. Nunca use negrito em títulos. A ênfase vem do tamanho, nunca do peso.
- Só um `h1` na página.
- No escuro, `lead` usa `text-muted-foreground` (steel-300 sobre navy-900 = **7.5:1**). No claro, usa steel-500 sobre paper-100 = **5.3:1**.

### 1.4 Pares de contraste aprovados (medidos)

| Texto / fundo | Razão | Uso permitido |
|---|---|---|
| paper-50 / navy-900 | 15.6:1 | títulos e corpo no escuro |
| steel-300 / navy-900 | 7.5:1 | apoio no escuro |
| steel-400 / navy-900 | 4.9:1 | metadados pequenos no escuro (mínimo) |
| steel-300 / navy-800 | 5.6:1 | apoio dentro de cards escuros |
| navy-900 / paper-100 | > 14:1 | títulos e corpo no claro |
| navy-600 / paper-100 | 6.8:1 | ícones de check, links no claro |
| steel-500 / paper-100 e paper-50 | 5.3 e 5.6:1 | apoio no claro |
| signal-foreground / signal-400 | 9.7:1 | botão e badge `signal` |
| ~~steel-400 / paper-100~~ | 3.0:1 | **proibido para texto** (só bordas/ícones decorativos) |
| ~~paper-500 / paper-100~~ | 3.1:1 | **proibido para texto** |
| ~~signal-400 como texto em fundo claro~~ | — | **proibido sempre** |

---

## 2. Tema por seção

### 2.1 Mapa de ritmo

| # | Seção | Tema | Fundo | Cyan desta dobra |
|---|---|---|---|---|
| 0 | Header | adaptativo | transparente → vidro | nenhum |
| 1 | Hero + MacBook | **escuro** | `navy-900` | barra do card ativo (Serra Azul) dentro da tela |
| 2 | O problema | **escuro** | `navy-900` (continua o hero) | a única linha "iluminada" da lista |
| 3 | Como funciona | **claro** | `paper-100` | barra do card ativo na mini-UI E2 |
| 4 | Demonstração (pin) | **escuro** | `navy-900` | um por etapa, sempre dentro da tela (ver §2.5) |
| 5 | Dados | **claro** | `paper-100` | barra do item ativo no diagrama |
| 6 | Para quem | **claro** | `paper-50` + hairline | **nenhum** |
| 7 | CTA + formulário | **escuro** | `navy-900` | botão `signal` "Pedir acesso antecipado" |
| 8 | Footer | **escuro** | `navy-950` | nenhum |

A proporção fica perto de 70% escuro e 30% claro em altura de rolagem, por causa do pin de 400vh. Somando as superfícies azuis dentro das telas e dos cards, isso respeita a base de 62%. A primeira troca escuro → claro (2 → 3) é deliberada: acontece no momento em que o texto diz "Clareza resolve".

### 2.2 Como aplicar o tema (importante para o engenheiro)

A variante `dark` do projeto é `&:is(.dark *)` e não pode ser desfeita num descendente. Como a tela do produto precisa ser **clara dentro de uma seção escura**, o tema é aplicado **por bloco, e não pela seção inteira**:

- A `<section>` recebe só o fundo: `bg-navy-900` (ou `bg-paper-100`) e `data-theme="dark|light"`, que o header lê.
- Os blocos de texto, botões e formulário de uma seção escura ficam dentro de um `<div className="dark">`, para que `primary`, `muted-foreground`, `border` e `ring` invertam corretamente.
- O `MacbookFrame` e o conteúdo da tela ficam **fora** do wrapper `.dark`, e o app renderiza no tema claro padrão.
- Não crie a classe `.light`, não altere o `@custom-variant` e não use hex solto.

### 2.3 Seção 1 · Hero + MacBook (escuro)

```
┌──────────────────────────────────────────────────────────────────┐
│ [fynd]                 Como funciona  Dados  Para quem  (Pedir…) │  header 64px, transparente
│                                                                  │
│                    PROSPECÇÃO B2B COM CONTEXTO                   │  eyebrow, steel-300
│                                                                  │
│                  Saiba para quem vender agora.                   │  display, paper-50, max 14ch
│                                                                  │
│        Conte quem é o seu cliente ideal. A fynd encontra…        │  lead, steel-300, max 36rem
│                                                                  │
│          ( Pedir acesso antecipado )  ( Ver como funciona )      │  default (papel) + outline
│          Sem implantação longa. Você começa com uma conversa.    │  muted, text-sm
│                                                                  │
│      ╭──────────────────────────────────────────────────────╮    │
│      │ ▪▪▪                     ▬                            │    │  MacBook, cols 2–11
│      │ ┌────────┬───────────────────────────────────────┐   │    │  (max 1080px)
│      │ │ fynd   │ Perfis ideais / Indústria Sudeste      │   │    │
│      │ │ ...    │ Oportunidades da semana                │   │    │
│      │ │        │ ▌Serra Azul Alimentos        92% ▬▬▬  │   │    │  ← único ciano
│      │ │        │  Bem Natural Cosméticos      84% ▬▬   │   │    │
│      │ └────────┴───────────────────────────────────────┘   │    │
│      ╰──────────────────────────────────────────────────────╯    │
│   ═══════════════════════════════════════════════════════════   │  base
└──────────────────────────────────────────────────────────────────┘
```

- Altura: `min-h-[100svh]`. O topo tem `pt-[calc(64px+96px)]` (md: `+128px`). O MacBook começa visível na primeira dobra em desktop 1440×900: pelo menos o terço superior da tela aparece acima da dobra.
- Bloco de texto centrado, `col-span-full`, `text-center`, `mx-auto`.
- Botões: principal `variant="default" size="lg"` (no `.dark` vira papel sobre navy) e secundário `variant="outline" size="lg"`. **O CTA do hero não é ciano**, porque o ciano desta dobra é da tela.
- MacBook: `lg:col-span-10 lg:col-start-2`, `max-w-[1080px]`, `mt-16 lg:mt-20`. O estado final do motion é plano e frontal (sem rotação). O estado inicial (tampa inclinada) é decisão do motion.
- Hierarquia: 1. título, 2. tela, 3. CTA principal, 4. subtítulo, 5. eyebrow.
- A borda inferior do hero não tem divisória. O fundo continua `navy-900` até a seção 2.

### 2.4 Seção 2 · O problema (escuro)

```
┌──────────────────────────────────────────────────────────────────┐
│ O DIA A DIA DE QUEM VENDE                                        │  cols 1–8
│ Mais dados não resolvem.                                         │  h1, paper-50
│ Clareza resolve.                                                 │  (revelação por palavra)
│ Você não precisa de uma lista maior…                             │  lead
│                                                                  │
│ ─────────────────── ─────────────────── ───────────────────      │  border-t border-border
│ 01                  02                  03                       │  eyebrow mono
│ Listas frias e      Horas montando      Time ligando             │  h4, paper-50
│ desatualizadas      planilha            no escuro                │
│ Você compra uma…    Filtrar CNAE…       Sem critério claro…      │  p, steel-300
│                                                                  │
│            ┌────────────────────────────────────────┐            │  cols 3–10
│            │  ░░░░░░░░░░░░░░░░░░░░░░   ░░  ░░░░     │            │  6 linhas "genéricas"
│            │  ░░░░░░░░░░░░░░░░░░░░     ░░  ░░░░     │            │  steel-700 / steel-800
│            │ ▌Serra Azul Alimentos       92% ▬▬▬    │            │  ← linha iluminada (ciano)
│            │  ░░░░░░░░░░░░░░░░░░░░░░░  ░░  ░░░░     │            │
│            └────────────────────────────────────────┘            │
│         Menos lista fria. Mais clareza para vender.              │  h3 centrado, paper-50
└──────────────────────────────────────────────────────────────────┘
```

- Dores em `grid lg:grid-cols-3`, sem cards: só uma hairline no topo de cada coluna (`border-t border-border pt-6`). Usar menos caixas aqui deixa a seção mais elegante.
- Contraste "lista cinza → linha iluminada": são 6 linhas com o formato de `OpportunityCard`. Cinco delas são *skeletons* em `bg-steel-800`/`bg-steel-700` com 1px de borda `border-border`. Uma é real: um `OpportunityCard active` em **tema claro** (fica fora do `.dark`), que acende na mesma posição. O escuro conta a dor e a única linha clara, a resposta. O ciano é a barra de 5px dessa linha.
- A frase de transição fica centrada, com `mt-16`. Ela é a ponte para a seção clara seguinte.

### 2.5 Seção 3 · Como funciona (claro)

```
┌──────────────────────────────────────────────────────────────────┐
│ COMO FUNCIONA                                                    │
│ Da conversa à                          São três passos, sem      │  título cols 1–6
│ próxima ligação.                       planilha no meio.         │  lead cols 8–12, alinhado
│                                                                  │  à base do título
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│ │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ ┌───────────────┐ ││  mini-UI em "recorte
│ │ │ E1 mensagem + │ │ │ │▌Serra Azul 92%│ │ │ │ Assunto: …    │ ││  de tela": aspect 4/3
│ │ │ chips         │ │ │ │ Bem Natural 84│ │ │ │ "Vi que a…"   │ ││  bg-card, border,
│ │ └───────────────┘ │ │ └───────────────┘ │ │ └───────────────┘ ││  rounded-xl
│ │ 01 · DESCREVA     │ │ 02 · RECEBA       │ │ 03 · ABORDE       ││  eyebrow
│ │ Conte quem você   │ │ Veja quem tem     │ │ Comece com a      ││  h4
│ │ quer atender      │ │ mais potencial    │ │ mensagem certa    ││
│ │ Explique o seu…   │ │ A fynd cruza…     │ │ Receba uma…       ││  p, muted
│ └───────────────────┘ └───────────────────┘ └───────────────────┘│
│ Ver na prática ↓                                                 │  Button variant="link"
└──────────────────────────────────────────────────────────────────┘
```

- Cards: `bg-paper-50 border border-border rounded-xl p-6 lg:p-8`, sem sombra (a marca é plana). As mini-UIs ficam num poço `bg-paper-100 rounded-lg border` com `p-4`, e a interface aparece em escala 1:1. Elas não são miniaturas reduzidas: são recortes legíveis.
- Tablet: os cards ficam em coluna única, com a mini-UI à esquerda e o texto à direita (`sm:grid-cols-2` dentro do card). Mobile: tudo empilhado.
- O ciano desta dobra é **só** a barra do Serra Azul na E2. Na E1, os chips usam `Badge variant="secondary"`, e na E3 o botão "Copiar" usa `default`.

### 2.6 Seção 4 · Demonstração guiada (escuro, pin)

**Abertura (antes do pin, centrada):** eyebrow `NA PRÁTICA`, título `h1`, subtítulo `lead`, com `py-section` normal.

**Trecho fixo (desktop ≥ lg, `h-[100svh]`, conteúdo centralizado na vertical):**

```
┌──────────────────────────────────────────────────────────────────┐
│ ┃ 1 Conversa      │ ╭────────────────────────────────────────╮   │
│ │ 2 Prioridades   │ │                                        │   │  progresso: cols 1–4
│ │ 3 Contexto      │ │        tela B / A / C / D              │   │  MacBook: cols 5–12
│ │ 4 Abordagem     │ │        (crossfade entre etapas)        │   │
│                   │ │                                        │   │
│ 02 / 04 · PRIORI… │ │                                        │   │  eyebrow
│ As empresas       │ ╰────────────────────────────────────────╯   │
│ certas, na ordem  │ ══════════════════════════════════════════   │  h3, paper-50
│ certa             │                                              │
│ A fynd cruza…     │                                              │  p, steel-300, max 28ch
└──────────────────────────────────────────────────────────────────┘
```

- Coluna de texto: `lg:col-span-4`, alinhada à base do MacBook (`self-end`, para não flutuar no meio). O MacBook fica em `lg:col-span-8`, e a largura renderizada vai de cerca de 760 a 820px.
- **Indicador de progresso:** lista vertical de 4 itens em `eyebrow`. O inativo usa `text-steel-400` (4.9:1). O ativo usa `text-paper-50` com um traço vertical de 2px `bg-paper-50` à esquerda. **Não usar ciano no indicador.** O ciano da dobra está dentro da tela.
- Texto por etapa: só um conjunto visível de cada vez (o motion faz a troca). Altura reservada, para o layout não pular.
- **O único ciano por etapa (sempre na tela, e a tela é clara):**
  1. Conversa: no chip "Sinal: Filial aberta…", `Badge variant="signal"`. Os outros chips usam `secondary`.
  2. Prioridades: a barra de 5px do card ativo (Serra Azul).
  3. Contexto: a barra do card ativo, que continua visível atrás do drawer. O drawer não tem ciano. A aderência dele usa `navy-600`.
  4. Abordagem: o realce do ponto de conexão, com `bg-signal-100` atrás do trecho em negrito e texto `navy-900`. A etiqueta "Ponto de conexão: nova filial" usa `Badge variant="label"`.
- **Saída do pin:** linha centrada em `h3` ("Pronto para ver isso…") e `Button default lg`, que no escuro fica em papel. Ela não é ciano, porque o ciano do CTA é exclusivo da seção 7.
- **Tablet e mobile (< lg): sem pin.** As 4 etapas viram blocos empilhados (`space-y-24`). Cada bloco tem eyebrow, h3 e texto, e logo abaixo o **painel da tela sem moldura** (ver §3.6). Isso inclui uma pequena régua de progresso horizontal: 4 traços de 24px, o ativo em `paper-50` e os demais em `steel-700`.

### 2.7 Seção 5 · De onde vêm os dados (claro)

```
┌──────────────────────────────────────────────────────────────────┐
│ DADOS                              ┌ Seu perfil ideal ─┐          │
│ Dados públicos,                    ├ Receita Federal ──┼──┐       │  diagrama cols 7–12
│ organizados para vender.           └ Base fynd ────────┘  │       │  3 nós (card pequeno)
│ Toda prioridade tem fonte…                                ▼       │  linhas SVG 1px navy-300
│                                    ┌ Lista priorizada ─────────┐  │
│                                    │▌Serra Azul Alimentos  92% │  │  ← ciano
│                                    │ Bem Natural Cosméticos 84%│  │
│                                    └───────────────────────────┘  │
│ ──────────────────── ──────────────────── ────────────────────    │
│ 01                   02                   03                     │
│ CNPJs da Receita…    Base própria de…     Critério que você…     │  h4
│ Os dados cadastrais… Informações sobre…   Cada empresa mostra…   │  p, muted
│                                                                  │
│ Trabalhamos com dados empresariais e seguimos a LGPD… [validar]  │  text-sm muted, cols 1–8
└──────────────────────────────────────────────────────────────────┘
```

- Texto à esquerda em `lg:col-span-5`, e o diagrama em `lg:col-start-7 lg:col-span-6`. O diagrama é feito com componentes (`Card`, `Badge variant="label"` para "FONTE", `OpportunityCard`), e os conectores são um SVG inline com `stroke="var(--navy-300)"` e `stroke-width=1`. Ele não leva ícones de banco de dados nem ilustração.
- Os 3 blocos de prova usam o mesmo padrão de hairline da seção 2. A repetição dá identidade.
- Contador numérico: **não renderizar** enquanto o número estiver `[validar]`. O layout funciona sem ele, porque não há espaço reservado vazio.

### 2.8 Seção 6 · Para quem (claro, paper-50)

```
┌──────────────────────────────────────────────────────────────────┐  border-t no container
│ PARA QUEM                                                        │
│ Para quem vende e para quem lidera.        Funciona para quem…   │  mesmo split da seção 3
│                                                                  │
│ ┌─────────────────────────────┐ ┌─────────────────────────────┐  │
│ │ VENDE OU LIDERA OPERAÇÃO    │ │ LIDERA UM TIME COMERCIAL    │  │  Badge variant="label"
│ │ PEQUENA                     │ │                             │  │
│ │ Você vende, a fynd aponta   │ │ Seu time nas contas certas. │  │  h3
│ │ o caminho.                  │ │                             │  │
│ │ Descreva o seu cliente…     │ │ Defina os perfis ideais…    │  │  p, muted
│ │ ✓ Lista pronta em uma…      │ │ ✓ Perfis ideais…            │  │  check navy-600
│ └─────────────────────────────┘ └─────────────────────────────┘  │
│                                                                  │
│ Sem implantação longa. │ Sem planilha para montar. │ Você decide │  faixa de 3 garantias,
│ Você começa por uma…   │ A fynd organiza…          │ o contato…  │  divisórias verticais
│                                                                  │
│ Quero ver com o meu perfil →                                     │  Button variant="link"
└──────────────────────────────────────────────────────────────────┘
```

- Os dois cards têm o mesmo peso: `bg-paper-100 border rounded-xl p-8 lg:p-10`. Nenhum é "destacado", porque os dois públicos são igualmente válidos.
- A faixa de garantias não tem card: `grid lg:grid-cols-3`, com `lg:divide-x divide-border` e cada item em `px-8`. O começo de cada frase fica em `font-semibold`, e o resto em muted.
- **Esta dobra não tem ciano.** Ela é o descanso antes da conversão.
- Depoimento: se for validado, entra entre os cards e a faixa como `blockquote` (a borda esquerda é `border-signal`). Nesse caso, ele vira o ciano da dobra. Se não houver depoimento, o bloco não é renderizado.

### 2.9 Seção 7 · CTA final + formulário (escuro)

```
┌──────────────────────────────────────────────────────────────────┐
│ ACESSO ANTECIPADO                  ┌────────────────────────────┐ │
│ Encontre o                         │ Nome          E-mail corp. │ │  card navy-800,
│ próximo sinal.                     │ [          ]  [          ] │ │  border-border,
│ A fynd está em acesso…             │ Empresa       Cargo        │ │  rounded-2xl p-8
│                                    │ [          ]  [          ] │ │
│ Perguntas frequentes               │ Quem é o seu cliente…      │ │
│ ─ A fynd envia mensagens por mim?+ │ [                        ] │ │  textarea 3 linhas
│ ─ De onde vêm os dados?         +  │ (  Pedir acesso antecipado ) │  ← ciano (signal, lg, w-full)
│ ─ Preciso integrar meu CRM?     +  │ Respondemos por e-mail…    │ │  text-xs muted
│ ─ Quanto custa?                 +  │                            │ │
└──────────────────────────────────────────────────────────────────┘
```

- Texto e FAQ em `lg:col-span-5`, e o formulário em `lg:col-start-7 lg:col-span-6`, com `lg:sticky lg:top-24` enquanto o FAQ for mais alto.
- FAQ com `Accordion` do DS, título "Perguntas frequentes" em `h4` e itens separados por `border-border`.
- Inputs do DS dentro do `.dark` (o foco usa `ring` = signal, o que conta como foco e é permitido). Os rótulos ficam sempre visíveis acima do campo, nunca só como placeholder. Os erros aparecem em `text-destructive` abaixo do campo, com `aria-describedby`.
- **O botão `variant="signal"` é o único ciano preenchido do site.** É o ponto de chegada da narrativa da luz.
- Sucesso: o conteúdo do card é substituído no mesmo tamanho (sem *layout shift*), com o ícone check em `paper-50`, "Pedido recebido." em `h3`, o texto e o link "Voltar ao início".

### 2.10 Seção 8 · Footer (escuro, navy-950)

Ver §4.2.

---

## 3. Mockup MacBook

### 3.1 Princípio
A máquina é só uma moldura discreta. O protagonista é a interface clara. A moldura é feita **só com CSS** (divs com `aspect-ratio`), sem imagem, sem logotipo da Apple e sem textura fotográfica. O SVG é opcional, só para a curva da base.

### 3.2 Anatomia e proporções (relativas à largura da tampa = `W`)

| Parte | Especificação |
|---|---|
| Tela (área do app) | **16:10**. Canvas de design fixo em **1280×800**, escalado para caber |
| Bezel | laterais `2.2% W`, topo `2.8% W`, base `3.2% W` · cor `navy-950` |
| Tampa (contorno) | `rounded-t-[2.2%W]` e `rounded-b-[0.8%W]` (usar `--lid-r` calculado em px via container query: `calc(100cqw * 0.022)`) · 1px de borda `steel-600` para sugerir a aresta de alumínio sobre o fundo escuro |
| Raio da tela | `0.9% W` nos cantos superiores, `0` nos inferiores |
| Notch | `8% W` de largura e `1.6% W` de altura, `navy-950`, raio inferior `0.6% W`, centrado no topo da tela, por cima do app |
| Base (deck) | largura **`112% W`**, altura `2.2% W`, centrada e encostada na tampa. Gradiente vertical de **2 paradas de tokens**, `steel-200 → steel-400` (o único gradiente permitido, porque descreve material). Cantos inferiores `rounded-b-[40%_100%]` para a curva da frente |
| Recorte de abertura | `14% W` de largura e `40%` da altura da base, centrado no topo, `bg-steel-500`, raio inferior total |
| Sombra de contato | elipse sob a base, com `90%` da largura e `3% W` de altura, `bg-navy-950/70`, `blur-xl`. No fundo claro, `shadow-lg` |
| Reflexo | **nenhum.** Sem brilho, sem glare e sem halo ciano |

### 3.3 Escala do conteúdo
- O app é renderizado sempre no canvas de 1280×800 (`w-[1280px] h-[800px] origin-top-left`) e reduzido com `transform: scale(var(--screen-scale))`. O `--screen-scale` vem de um `ResizeObserver` na área da tela (`largura / 1280`). Isso garante que a composição seja idêntica em qualquer tamanho e que o motion trabalhe com coordenadas estáveis.
- Tamanhos de referência: no hero de 1080px, a tela tem cerca de 1030px (escala de aproximadamente 0.80, com nome de empresa em cerca de 13px). Na demo de 800px, a escala fica perto de 0.6. O conteúdo foi desenhado para continuar legível nessas escalas: corpo mínimo de 14px no canvas e nada abaixo de 12px.

### 3.4 Tema da interface na tela
- **Sempre o tema claro** (`paper-100` de fundo, `paper-50` nos cards, sidebar `paper-50`). Motivo: sobre o campo `navy-900`, a tela clara é literalmente a luz da página e cria o maior contraste de figura e fundo. O ciano da barra ativa também ganha leitura.
- A interface usa o app shell de `src/app/demos/sidebar/app-shell-demo.tsx` como base, com os dados do Universo fictício (Camila Rocha e Lumi Embalagens; **remova "Mariana Pillati"**).
- Densidade: sidebar com 240px de largura no canvas e conteúdo com `px-10 py-8`. Na tela A, mostre 6 cards. Não encha a tela. O espaço em branco também vale dentro dela.
- Os elementos interativos internos são decorativos: o conteúdo da tela recebe `inert` e `aria-hidden="true"`, e a moldura recebe `role="img"` e `aria-label` com o texto do copy. Na demo, cada etapa troca o `aria-label`.

### 3.5 Instâncias
| Onde | Largura | Estado final | Tela |
|---|---|---|---|
| Hero | até 1080px (cols 2–11) | frontal, plano | A |
| Demo (lg+) | cols 5–12, cerca de 800px | frontal, plano, fixo pelo pin | B → A → C → D |

O componente é um só: `MacbookFrame` (`children` = conteúdo da tela, `className` para largura). Não há variações de cor nem "modo prata".

### 3.6 Mobile e tablet
- **Hero (< md):** a moldura completa com `width: 112%` do container e `-mx-[6%]`, uma sangria leve e simétrica. A seção recebe `overflow-x-clip` (nunca `overflow-hidden` no body). A tela vira ilustração, e o `aria-label` carrega o sentido.
- **Demo (< lg):** **sem moldura.** Mostre só o painel relevante, renderizado **nativamente (sem escala)** dentro de um "poço de tela": `rounded-xl border border-border bg-paper-100 shadow-lg overflow-hidden`, com uma barra superior de 28px em `paper-200` e 3 pontos `paper-400`. Os painéis são: B (conversa), lista A (sem sidebar), drawer C e painel D. O texto fica legível de verdade.

---

## 4. Header e footer

### 4.1 Header
- **Estrutura:** `fixed inset-x-0 top-0 z-50 h-16` com o container padrão. Wordmark à esquerda (`h-6`, cerca de 50px de largura, `aria-label` "fynd, voltar ao início"). Âncoras centradas no desktop (`text-sm font-medium`, `gap-8`). CTA à direita (`Button size="sm"`).
- **O tema acompanha a seção que está por baixo:** um `IntersectionObserver` lê `data-theme` da seção sob a faixa do header (linha de 64px do topo) e aplica `.dark` ao header quando ela é escura.

| Estado | Fundo | Texto e links | CTA |
|---|---|---|---|
| Topo do hero (scroll < 8px) | transparente, sem borda | wordmark `paper-50`, links `steel-300` → hover `paper-50` | `default` (papel) |
| Rolado sobre escuro | `bg-navy-900/80 backdrop-blur-md`, `border-b border-border` | idem | `default` (papel) |
| Rolado sobre claro | `bg-paper-100/80 backdrop-blur-md`, `border-b border-border` | wordmark `navy-900`, links `steel-500` → hover `navy-900` | `default` (navy) |
| Durante o pin da demo | igual a "rolado sobre escuro" | — | — |
| Seção 7 em vista | o CTA do header some (`opacity-0 pointer-events-none`), porque o formulário já está na tela | — | — |

- A troca de cor dura `200ms`, só em `background-color`, `color` e `border-color`. O header **não se esconde** ao rolar, porque o CTA precisa estar sempre à mão.
- Âncora ativa: `aria-current="true"`, cor plena (`foreground`) e um sublinhado de 1px com `underline-offset-8`. Não usa ciano.
- Foco: o `ring` do DS (navy-600 no claro, signal no escuro).
- **Link de pular:** "Pular para o conteúdo", `sr-only focus:not-sr-only`, como pílula `default` em `top-3 left-5`.
- **Mobile (< md):** wordmark à esquerda e, à direita, o botão `ghost size="icon"` com "Abrir menu" / "Fechar menu" (ícone de 2 traços → X). O CTA fica **escondido na barra** abaixo de `sm` e aparece com `size="xs"` entre `sm` e `md`.
- **Menu mobile:** painel de tela cheia `bg-navy-900` (`.dark`, sempre escuro), que entra de cima para baixo. Dentro dele: as 3 âncoras em `h2` (Sora 300, empilhadas, `gap-6`, `pt-24`) e, no rodapé, o `Button default lg w-full` "Pedir acesso antecipado". Ele tem foco preso, fecha com `Esc` e ao clicar numa âncora, e trava a rolagem do body enquanto está aberto.

### 4.2 Footer
```
┌──────────────────────────────────────────────────────────────────┐  navy-950, .dark
│ fynd                                Como funciona   contato@…    │  wordmark h-7, paper-50
│ Ilumine as oportunidades certas.    Dados                        │  h4 Sora 300, steel-300
│                                     Para quem                    │
│                                     Acesso antecipado            │
│ ──────────────────────────────────────────────────────────────── │  border-border
│ © 2026 fynd. Todos os direitos reservados.   Privacidade · Termos│  eyebrow-size mono, steel-400
└──────────────────────────────────────────────────────────────────┘
```
- `pt-24 pb-10`. Wordmark e linha institucional em `lg:col-span-6`. Âncoras em `lg:col-span-3`. Contato em `lg:col-span-3`.
- Mobile: tudo empilhado e alinhado à esquerda, `gap-10`, com a linha legal quebrando em duas.
- Sem redes sociais e sem ciano. Os links legais só são renderizados se existirem `[validar]`.

---

## 5. Checklist de consistência para o engenheiro

**Sistema**
- [ ] Só tokens: escalas `navy|signal|steel|paper-*` e semânticos (`primary`, `muted-foreground`, `border`…). Nenhum hex, `rgb()` solto ou cor arbitrária.
- [ ] O único gradiente do site é o da base do MacBook (`steel-200 → steel-400`). Nenhum fundo de seção tem gradiente, glow, ruído ou blur decorativo.
- [ ] Nada de fogo, chama, robô, cérebro, alvo ou ícone de "IA" e faíscas. O `FChama` não aparece no site, a não ser como favicon.
- [ ] Sombras só em camadas flutuantes (MacBook, poço de tela mobile, menu). Os cards são planos.
- [ ] Raios: cards `rounded-xl`, painéis grandes `rounded-2xl`, botões e badges em pílula (já no DS).

**Ciano**
- [ ] No máximo **um** elemento ciano visível por dobra (contar com a tela inteira). Foco (`ring`) não entra na conta.
- [ ] Ciano nunca como texto sobre fundo claro, nunca em `primary`, nunca em divisórias, ícones de lista ou indicadores de progresso.
- [ ] O `Button variant="signal"` só aparece no submit da seção 7.

**Tipografia e layout**
- [ ] Só um `h1` (hero). Os títulos de seção são `<Text variant="h1" render={<h2/>}>`.
- [ ] Títulos em Sora 300 com `tracking-display`, sem negrito. Rótulos em `eyebrow` (mono, caixa alta, `tracking-label`).
- [ ] Todo conteúdo dentro do `SiteContainer`, alinhado à coluna 1. Centro só no hero, na abertura da demo e na linha pós-pin.
- [ ] Padding de seção `py-24 md:py-32 lg:py-40`. Não colocar margens arbitrárias para "consertar" uma seção.
- [ ] Corpo com no máximo `36rem` de medida e títulos com `text-balance`.

**Tema**
- [ ] A `<section>` define o fundo e `data-theme`. O `.dark` vai nos wrappers de texto e UI, e **não** envolve o `MacbookFrame` nem a linha iluminada da seção 2.
- [ ] O header muda de tema pelo `data-theme` da seção sob ele.
- [ ] Pares de texto dentro da tabela §1.4. Nada de `steel-400` ou `paper-500` como texto em fundo claro.

**MacBook e telas**
- [ ] Canvas de 1280×800 escalado por `ResizeObserver`. As telas usam o tema claro e os dados do Universo fictício. Não pode aparecer "Mariana Pillati" nem a palavra "protótipo".
- [ ] Conteúdo da tela com `inert` e `aria-hidden`. A moldura com `role="img"` e `aria-label` do copy, atualizado por etapa.
- [ ] Mobile: no hero, moldura com sangria de 112% e `overflow-x-clip`. Na demo, painéis nativos sem moldura e sem pin.
- [ ] O estado final de todo motion bate com o layout deste documento (MacBook frontal e plano, lista na ordem final 92 → 58).

**Acessibilidade e qualidade**
- [ ] Contraste de 4.5:1 para texto comum e 3:1 para texto grande, já verificado na tabela.
- [ ] `prefers-reduced-motion`: a página continua completa e estática (MacBook plano, etapas da demo empilhadas como no mobile).
- [ ] Alvos de toque ≥ 40px. Foco visível em tudo. Link de pular funcionando. Menu mobile com foco preso e `Esc`.
- [ ] Sem rolagem horizontal entre 320px e 1920px. Teste em 375, 768, 1024, 1440 e 1920.
- [ ] Itens `[validar]` (contador, depoimento, links legais e LGPD) só são renderizados quando validados e não deixam espaço vazio quando ausentes.
