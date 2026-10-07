# 03 · Design v4: só o que muda em relação à v3

_Etapa 3 da v4 · modo direto · 2026-10-07_
_Base: `docs/site/v4/00-briefing-v4.md`, `docs/reunioes/2026-10-01-lucas-mariana-eduardo-revisao-lp.md` (pontos 1 a 30), `docs/reunioes/2026-10-01-escopo-negocio-fynd.md`, `docs/site/03-design.md` (sistema base), código `*-v3` e `platform-v3/*`, `src/app/globals.css`._
_Os textos entre aspas são **provisórios** e saem do briefing. O texto final vem de `docs/site/v4/02-copy-v4.md`, que está sendo escrito em paralelo. Quando houver conflito de texto, vale o copy. Quando o conflito for de layout ou cor, vale este documento._

**Princípio da v4:** a v4 não ganha visual novo. Ela fica **mais curta e mais firme**. Reaproveitamos o hero, o MacBook, o shell, os cards, a grade e as regras de tema da v3. O que muda: o ritmo vertical fica mais apertado, a demo cai para 3 etapas, a seção Dados deixa de existir e entram dois recursos novos e contidos. O primeiro é o **par "hoje × com a fynd"**. O segundo é a **faixa do motor**. Vale tudo o que está em `docs/site/03-design.md`, exceto o que este documento substitui.

---

## 0. O que vale para a página inteira

### 0.1 Ritmo vertical mais curto
Vamos criar uma constante nova em `site-container.tsx`. Ela é **aditiva**, então não edita nada da v3:

```ts
/** Padding vertical das seções da v4 (mais curto que o da v3). */
export const sectionYV4 = "py-20 md:py-24 lg:py-32"        // 80 / 96 / 128 px (v3: 96 / 128 / 160)
/** Cabeçalho da seção → conteúdo, na v4. */
export const headToBodyV4 = "mt-10 md:mt-12 lg:mt-16"      // 40 / 48 / 64 px (v3: 48 / 64 / 80)
```

- Eyebrow → título, título → lead e lead → botões continuam como na v3.
- O formato "cabeçalho dividido" (título nas colunas 1–6, lead nas colunas 8–12, alinhado à base) passa a ser o padrão das seções claras: Como funciona, Você só precisa vender e Para quem. Ele economiza cerca de 120px por seção em relação ao título com o lead embaixo.

### 0.2 Mapa de tema, ciano e altura

| # | Seção (arquivo novo) | Tema | Fundo | Ciano da dobra | Altura-alvo desktop 1440×900 (v3 → v4) |
|---|---|---|---|---|---|
| 0 | Header (`header-v4`) | adaptativo | igual à v2 | nenhum | 64px |
| 1 | Hero (`hero-v4`) | escuro | `navy-900` | ponto aceso + selo "Interessada" na tela (iguais à v3) | ~1500 → **~1430** |
| 2 | Problema (`problem-v4`) | escuro | `navy-900` | **nenhum** (o acento é o X em `destructive`) | ~1700 → **~1050** |
| 3 | Como funciona (`how-it-works-v4`) | claro | `paper-100` | selo da mini 3 (igual à v3) | ~1200 → **~1150** (com a faixa do motor) |
| 4 | Na prática (`demo-v4`) | escuro | `navy-900` | um por etapa, sempre dentro da tela | ~4450 → **~3350** (pin de 400vh → 300vh) |
| 5 | Você só precisa vender (`only-sell-v4`) | claro | `paper-100` | nenhum | Dados ~1300 → **~760** |
| 6 | Para quem (`audience-v4`) | claro | `paper-50` + hairline | nenhum | ~1500 → **~640** |
| 7 | Acesso + FAQ (`access-v4`) | escuro | `navy-900` | botão `signal` do formulário (único ciano preenchido) | ~1300 → **~1150** |
| 8 | Footer (`footer-v4`) | escuro | `navy-950` | nenhum | ~400 (igual) |
| | **Total** | | | | **~13.350 → ~9.990 px (−25%)** |

- A alternância continua escuro, escuro, claro, escuro, claro, claro, escuro, escuro. As seções 5 e 6 são claras e seguidas, por isso a 6 usa `paper-50` com hairline no container, como na v3.
- O destructive (`--destructive`: `#b83a32` no claro e `#f5877e` no `.dark`) entra pela primeira vez no site. Ele aparece **só como ícone X** na coluna "hoje" da seção 2. Não vale como texto, borda, fundo ou tag em nenhum outro lugar.

### 0.3 Âncoras e rótulos
O arquivo `anchors.ts` não pode ser editado, porque o header da v2 o importa. Por isso vamos criar `anchors-v4.ts`:

```ts
export const ANCHORS_V4 = { top: "inicio", howItWorks: "como-funciona", demo: "na-pratica", audience: "para-quem", access: "acesso" } as const
export const NAV_LINKS_V4 = [
  { id: ANCHORS_V4.howItWorks, label: "Como funciona" },
  { id: ANCHORS_V4.demo, label: "Na prática" },
  { id: ANCHORS_V4.audience, label: "Para quem" },
] as const
export const CTA_LABEL_V4 = "Garantir minha vaga" // provisório, vem do 02-copy-v4
```

A seção 5 não tem âncora no menu.

---

## 1. Hero (escuro): faixa de zero setup e os 3 cards flutuantes

Reaproveitamos da v3, sem mudanças: `Backdrop`, `LightPath`, `LitDot`, a pílula de acesso antecipado, o título, os botões, o MacBook, a entrada da tampa e o parallax.

### 1.1 Composição

```
┌──────────────────────────────────────────────────────────────────┐
│ [fynd]          Como funciona  Na prática  Para quem  (Garantir) │
│                                                                  │
│             (• Acesso antecipado aberto │ Pedir convite →)       │  pílula v3
│                                                                  │
│                       Você vende,                     ◉          │  display · ◉ = ponto aceso (ciano)
│                    a gente encontra.                             │
│        [subtítulo novo: empresas interessadas, sem setup]        │  lead, max-w-[36rem]
│                                                                  │
│          ( Garantir minha vaga → )  ( Ver como funciona ↓ )      │  default lg + outline lg
│                                                                  │
│      ZERO SETUP  │  SEM CONFIGURAR · SEM SUBIR BASE · SEM MAILING │  faixa mono, mt-6
│                                                                  │
│  ┌01 · VOCÊ VENDE─────┐                     ┌02 · COM O SEU PERFIL┐
│  │ (Embalagens)(Alim.)│  ╭───────────────╮  │ 4.860               │
│  └────────────────────┘  │  tela:        │  │ empresas com o seu  │
│                          │  Interessados │  │ perfil              │
│                          │  v4           │  └─────────────────────┘
│                          │               │  ┌03 · INTERESSADAS────┐
│                          ╰───────────────╯  │ (✓) 12 interessadas │
│                         ═════════════════   │ Serra Azul pediu…   │
│                                             └─────────────────────┘
└──────────────────────────────────────────────────────────────────┘
```

### 1.2 Faixa "zero setup" (substitui a linha "Para PMEs B2B…" e a faixa `PROOFS`)
- **Onde:** logo abaixo dos botões, com `mt-6 md:mt-7`. Ela ocupa o lugar das duas linhas da v3, que saem. Ficamos com uma linha a menos que a v3, então o hero encurta cerca de 70px e a borda do MacBook sobe na primeira dobra.
- **Forma:** uma linha só, em mono, sem caixa, sem ícone e sem cor. Ela parece um carimbo técnico e não compete com os botões.
  ```tsx
  <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] font-medium tracking-label uppercase">
    <span className="text-paper-50">Zero setup</span>
    <span aria-hidden className="hidden h-3.5 w-px bg-paper-50/15 sm:block" />
    <span className="text-steel-300">Sem configurar · Sem subir base · Sem mailing</span>
  </p>
  ```
- O contraste é `paper-50` sobre navy-900 (15.6:1) e `steel-300` (7.5:1). Os pontos médios são texto, não ícone.
- **Mobile (< sm):** o divisor some e a linha quebra em duas, com "ZERO SETUP" em cima e os três "sem" embaixo, centrados.
- **Não** coloque ciano, check ou badge. "Primeiro contato feito por nós" sai, conforme o briefing.
- Os itens da faixa são texto provisório. O copy pode trocar os três "sem", mas **o máximo é 3 itens** depois de "Zero setup". Mais que isso polui a faixa (ponto 2 da reunião).
- Ela vira um componente reutilizável, `ZeroSetupStrip({ align: "center" | "start" })`, usado também no encerramento (§7).

### 1.3 Os 3 cards flutuantes
Usam o mesmo `floatCard`, as mesmas posições (`FLOATS`) e o mesmo parallax da v3. Mudam o conteúdo e a ordem visível do funil:

| Card | Posição (igual à v3) | Rótulo mono | Conteúdo |
|---|---|---|---|
| 1 | `left-[-7%] top-[10%]`, `w-[16.5rem]` | `01 · Você vende` | 3 chips (igual à v3) |
| 2 | `right-[-7%] top-[2%]`, `w-[15rem]` (era 14rem, porque agora são 4 dígitos) | `02 · Com o seu perfil` | `4.860` em `font-heading text-4xl font-light tracking-display tabular-nums` + "empresas com o seu perfil" em `text-xs text-steel-300` |
| 3 | `right-[-5%] top-[58%]`, `w-[17rem]` | `03 · Interessadas` | check em pílula `paper-50`, "12 interessadas" e "Serra Azul Alimentos pediu amostras." (igual à v3) |

- O índice `01 / 02 / 03` no rótulo garante a ordem de leitura sem setas. **Não desenhe** setas, linhas ou "→" entre os cards, nem % entre 4.860 e 12. Ligar os dois números convida a calcular uma taxa de conversão. A proibição de "taxa/% no texto" vale também aqui.
- O 12 é o destaque visual pelo **peso** (`text-sm font-semibold` com o check em pílula clara), não pela cor. Nenhum card tem ciano.
- O `FUNNEL` da v4 vira `{ profile: 4860, interested: 12 }` em `data-v4.ts`. Não há número de contatadas nem de respostas em lugar nenhum da página.
- **< lg:** os cards somem, como na v3. No lugar deles entra uma linha de funil abaixo do MacBook, `mt-8`, centrada: `font-mono text-[0.6875rem] tracking-label uppercase text-steel-300`, com o texto "Você vende · 4.860 com o seu perfil · 12 interessadas". Os números ficam em `text-paper-50`. Ela é visível para leitores de tela, porque passa a ser o único lugar onde o funil aparece no mobile.

### 1.4 Tela do MacBook no hero
É a **tela Interessados v4** (§4.4) no estado final, com o mesmo `HeroScreenV4 play` (a cascata dos cards toca uma vez). O ciano da tela é só o selo de status do card ativo, como na v3. O `aria-label` vem do copy.

---

## 2. O problema com contraste "hoje × com a fynd" (escuro)

### 2.1 Decisão
- **Tema escuro**, continuando o hero, como na v3. A coluna "hoje" fica **no campo escuro**. A coluna "com a fynd" é um **painel claro** (`paper-50`, fora do `.dark`). É a mesma metáfora da v3: o escuro conta a dor e a única superfície clara é a resposta. Ela também substitui a `NoiseListV3`, que sai e leva junto cerca de 450px.
- **Para não parecer "sistema × sistema"** (alerta do Eduardo, ponto 7):
  1. Os dois lados são escritos na **segunda pessoa e no dia a dia** ("Você compra mailing…" × "Você só fala com…"). Nenhum lado descreve funcionalidade.
  2. Não há cabeçalho de tabela, nome de concorrente, logo, coluna "outros" nem linhas de grade. São duas listas lado a lado.
  3. Os rótulos dos lados são frases curtas em caixa normal, como "No seu dia a dia hoje" e "Com a fynd". **Não use eyebrow em caixa alta no lado fynd**: "fynd" nunca vai em `uppercase` por CSS. Os dois rótulos usam o mesmo estilo, `text-sm font-semibold`, para manter a simetria.
  4. Os dois lados têm o mesmo número de itens e os pares ficam alinhados por linha no desktop. A leitura é "isto vira aquilo", não "nós contra eles".
- **Pares:** 4, de forma provisória. Mailing frio → interessados. Sem estrutura → sem contratar. Setup, configuração e subir base → **zero setup**. Definir cliente ideal → só dizer o que vende. O par do **setup** é o último e fica com o peso maior no lado fynd (§2.3), porque "sem setup muito claro" é pedido explícito da reunião.

### 2.2 Desktop (≥ lg)

```
┌──────────────────────────────────────────────────────────────────┐
│ O DIA A DIA DE QUEM VENDE                                        │  eyebrow
│ Mais mailing não resolve.            [lead curto, 1–2 linhas]    │  h1 cols 1–7 · lead cols 8–12, base
│ Interesse resolve.                                               │
│                                                                  │
│ No seu dia a dia hoje               ┌──────────────────────────┐ │  rótulos text-sm font-semibold
│                                     │ Com a fynd               │ │
│ ✕  Você compra mailing e liga para  │ ✓  Você só fala com quem │ │  ✕ = destructive (só o ícone)
│    quem não está esperando.         │    respondeu e quer saber│ │  ✓ = navy-600
│ ─────────────────────────────────── │ ──────────────────────── │ │  hairlines por linha
│ ✕  …                                │ ✓  …                     │ │
│ ─────────────────────────────────── │ ──────────────────────── │ │
│ ✕  …                                │ ✓  …                     │ │
│ ─────────────────────────────────── │ ──────────────────────── │ │
│ ✕  Configurar ferramenta, subir     │ ✓  Zero setup. Você      │ │  par do setup: lado fynd com
│    base, montar automação.          │    contrata e já começa. │ │  font-semibold no começo
│                                     └──────────────────────────┘ │
│                                                                  │
│             Troque o lead frio pelo lead quente.                 │  h3 centrado, mt-14 lg:mt-16
└──────────────────────────────────────────────────────────────────┘
```

- **Grade:** é um único `grid lg:grid-cols-12 lg:gap-x-8` com linhas explícitas (`lg:grid-rows-[auto_repeat(4,auto)]`):
  - Coluna "hoje": `lg:col-span-6`, com cada item em `lg:row-start-{n+2}` e `lg:pr-10`.
  - Painel fynd: um `div` de fundo em `lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:row-span-5 rounded-2xl bg-paper-50`. Os itens fynd ficam por cima, na mesma coluna, com `lg:row-start-{n+2} lg:px-8`. É assim que os pares alinham na mesma linha sem tabela.
  - O primeiro e o último item do painel têm `pt-8` e `pb-8`, para o painel respirar.
- **Item:** `flex gap-4 py-5 border-t border-border` (o primeiro sem borda). Texto `text-base leading-[1.6]`. Lado hoje: texto `text-steel-300` (7.5:1). Lado fynd: texto `text-foreground`, ou seja, navy-900 sobre paper-50 (> 14:1).
- **Ícones:** `XIcon` e `CheckIcon` em `size-4 mt-1 shrink-0`, `strokeWidth={2}`.
  - O X fica dentro do `.dark`, em `text-destructive`, que vira `#f5877e` sobre navy-900 (6.9:1).
  - O check fica em `text-navy-600` (6.8:1 sobre o claro).
  - Os dois são `aria-hidden`. O sentido vem dos rótulos dos grupos (cada lado é uma `<ul aria-labelledby>`).
  - **Sem círculo de fundo, sem vermelho em texto e sem borda vermelha.**
- **Par do setup:** no lado fynd, o começo da frase ("Zero setup.") vai em `font-semibold`, igual ao padrão das garantias da v3. É o único destaque tipográfico do painel. Não use badge nem ciano.
- **Frase de fechamento:** `Text variant="h3" render={<p/>}`, centrada, `max-w-[24ch] text-balance`, dentro do `.dark`, em `paper-50`. Não tem botão e não tem ciano: é a ponte para a seção clara. O texto provisório é "Troque o lead frio pelo lead quente." e o definitivo vem do copy.

### 2.3 Mobile e tablet (< lg)
- Ficam **dois blocos empilhados**, não pares intercalados. Ler "hoje" inteiro e depois "com a fynd" inteiro é mais claro numa coluna estreita, e evita repetir rótulos 8 vezes.
  1. "No seu dia a dia hoje" e os 4 itens com X, no campo escuro, com hairlines.
  2. `mt-8`: o painel claro `rounded-2xl bg-paper-50 p-6` com "Com a fynd" e os 4 itens com check.
- A ordem no DOM já é essa (todos os itens "hoje", depois todos os itens "fynd"). No desktop, o alinhamento por linha é dado só pelas classes `lg:row-start-*`. Não precisa de dois componentes.

### 2.4 Motion (resumo, quem decide é o motion)
- O título é revelado por palavra, como na v3.
- Os itens "hoje" entram com o `RevealGroup` padrão. O painel claro entra com um leve atraso (`delay 0.15`), e os checks aparecem em cascata.
- Com movimento reduzido, tudo fica estático.
- Não anime o X: nada de tremer ou piscar em vermelho.

---

## 3. Como funciona (claro): os 3 passos e a faixa do motor

### 3.1 O que fica
Ficam o cabeçalho dividido (o título "Você conta, a fynd encontra, você fecha." com destaque, e o lead de zero setup nas colunas 8–12), os 3 cards (`bg-paper-50 border rounded-xl`), as mini-UIs e o link "Ver na prática ↓". O padding passa a ser `sectionYV4` e o espaço entre cabeçalho e conteúdo, `headToBodyV4`.

### 3.2 Mini-UIs
- **M1 (Você conta):** a `MiniContaV3` muda. Abaixo do balão da Camila entram 2 chips de anexo (`Badge variant="outline"`, com `GlobeIcon` "lumiembalagens.com.br" e `FileTextIcon` "Catálogo.pdf"), como prenúncio da etapa 1 da demo. Os chips da resposta continuam `secondary`. Sem ciano.
- **M2 (A gente encontra): substitui `MiniEncontraV3`**, porque a versão da v3 mostra "Contatadas 60", e essa informação agora fica de fora. A nova `MiniEncontraV4` tem três linhas:
  ```
  ┌──────────────────────────────┐
  │ COM O SEU PERFIL             │  mono label, muted
  │ 4.860                        │  font-heading text-3xl font-light, CountUp
  │ ──────────────────────────── │
  │ Abordando e qualificando ▪▪▪ │  text-sm muted + 3 pontos steel-400 animados (indeterminado)
  │ ──────────────────────────── │
  │ ✓ 12 interessadas            │  text-sm font-semibold, check navy-600
  └──────────────────────────────┘
  ```
  Ela não tem barras proporcionais (12 de 4.860 daria uma barra invisível e convidaria à leitura de taxa) e não tem ciano.
- **M3 (Você fecha):** fica igual à `MiniFechaV3`. O selo vira o status "Pediu amostras", e esse selo é **o ciano da dobra**.

### 3.3 Faixa do motor (nova)
Ela fica **abaixo dos 3 cards**, com `mt-12 lg:mt-16`, e **sem card**. Pertence à mesma seção clara.

```
┌──────────────────────────────────────────────────────────────────┐
│ ──────────────────────────────────────────────────────────────── │  border-t border-border pt-8
│ A complexidade         01         02        03        04        05        06      │
│ fica com a fynd.       ENTENDER ─ ENCONTRAR ─ ABORDAR ─ CONVERSAR ─ QUALIFICAR ─ ENTREGAR │
│ [1 linha de apoio]     você          └──────────── a fynd cuida ───────────┘    você  │
└──────────────────────────────────────────────────────────────────┘
```

- **Grade (lg):** frase nas colunas 1–4 e trilha nas colunas 5–12, com `items-center`.
  - **Frase:** `Text variant="h3" render={<p/>}`, `max-w-[16ch]`, Sora 300. Se o copy quiser uma linha de apoio, ela fica em `text-sm text-muted-foreground mt-2`, opcional.
  - **Trilha:** é um `<ol>` com `grid grid-cols-6`. Cada item tem o índice `01` em `font-mono text-[0.6875rem] text-muted-foreground` e o verbo em `font-mono text-xs font-medium tracking-label uppercase`.
- **Conector:** uma linha de 1px `bg-navy-200`, atrás dos itens, no nível do verbo. Cada item tem um ponto de 6px (`bg-paper-100` com `ring-1 ring-navy-300`) sobre a linha.
- **Hierarquia que mostra "a complexidade fica com a fynd":**
  - "Entender" e "Entregar" ficam em `text-foreground`. São os dois toques do cliente.
  - Os quatro do meio ficam em `text-steel-500` (5.3:1) e recebem embaixo um colchete de 1px `border-x border-b border-navy-200 h-2 rounded-b-sm`, com a legenda curta "a fynd cuida" (provisória, vem do copy) em `text-xs text-muted-foreground`.
  - É **a única ilustração da ideia**. Não há ícone de engrenagem, de robô, nem "IA".
  - "Abordar" aparece como verbo do ciclo e é aceito pelo briefing. Ele **não** é promessa nem nomeia canal.
- **Motion ("o motorzinho"):** quando entra na viewport (`amount 0.5`), os pontos acendem em sequência, de `ring-navy-300` para `bg-navy-600`, com 0.12s entre cada um, **uma vez só**. O estado final tem os seis pontos em `navy-600`. Não use loop nem ciano. Com movimento reduzido, a faixa já aparece no estado final.
- **Mobile e tablet (< lg):** a frase fica em cima e a trilha embaixo, com `mt-6`, em `grid-cols-3 gap-y-5` (duas linhas de 3). O conector horizontal some no mobile. O colchete vira uma legenda simples abaixo da grade: "Encontrar, abordar, conversar e qualificar: a fynd cuida." (provisória), em `text-sm text-muted-foreground`.
- **Âncora "Ver na prática ↓":** desce para depois da faixa, com `mt-10`.

---

## 4. Na prática: demo de 3 etapas (escuro, pin)

### 4.1 Estrutura (mudanças sobre `demo-v3.tsx`)
- A abertura é centrada, como na v3, com padding mais curto: `pt-20 pb-12 md:pt-24 lg:pt-32 lg:pb-16`.
- O pin passa a ter **3 etapas e 300vh**: `end: "+=" + window.innerHeight * 2`.
  - `stepFromProgress = Math.min(2, Math.floor(p * 3 + 0.12))`.
  - O snap usa `p * 3` e `/ 3`.
  - `tl.addLabel("end", 3)`.
- O indicador lateral tem 3 itens: "1 Seu produto", "2 Fit" e "3 Interessados". Os rótulos são `01 / 03 · SEU PRODUTO`, `02 / 03 · FIT` e `03 / 03 · INTERESSADOS`. O `aria-label` é "Etapa n de 3".
- A linha de saída é a mesma da v3, com `pt-12 pb-20 md:pb-24 lg:pt-16 lg:pb-32`. O botão fica `default` (papel), nunca ciano.
- O empilhado (< lg, notebook baixo e movimento reduzido) usa 3 blocos com `space-y-20` (era 24) e uma régua de 3 traços.
- **Shell v4** (`shell-v4.tsx`, cópia da v3):
  - A nav tem 3 itens: "Visão geral", "Interessados 12" e "Seu perfil 4.860" (provisório).
  - O item "Primeiro contato" sai. A busca "Embalagens flexíveis" continua na sidebar.
  - O resto do shell fica igual.

### 4.2 Regra de densidade das 3 telas (canvas 1280×800)
- Conteúdo com `max-w-[880px] mx-auto`, `px-10 py-6`, como na v3.
- **No máximo 5 blocos visíveis por tela.** Sem gráficos de linha, sem tabela com colunas ordenáveis, sem filtros e sem abas. Escopo §9: "nada de dashboard complexo".
- No canvas, o texto tem no mínimo 13px e o corpo, 14–15px.
- **Um ciano por tela**, listado em cada uma.

### 4.3 Etapa 1 · Seu produto (`screen-produto-v4.tsx`)

```
┌sidebar─┬ Seu produto / Lumi Embalagens ──────────────────────────────┐
│        │ Seu produto                                                 │  h3 Sora 300 2rem
│        │ ┌ CNPJ ──────────────────────┐  ✓ Lumi Embalagens Ltda       │  input mono · confirmação text-sm
│        │ │ 12.345.678/0001-90         │    Jundiaí, SP                │  check navy-600
│        │ └────────────────────────────┘                               │
│        │                     ┌──────────────────────────────────────┐ │
│        │                     │ A gente fabrica embalagens flexíveis │ │  balão da Camila (default)
│        │                     │ para alimentos e cosméticos…         │ │
│        │                     └──────────────────────────────────────┘ │
│        │                  (⊕ lumiembalagens.com.br) (▤ Catalogo.pdf)  │  chips de anexo, outline
│        │ (f) O que eu entendi                                        │
│        │     ┌─────────────────────────────────────────────────────┐ │  card bg-card border
│        │     │ Produto     Pouches, sachês e filmes flexíveis      │ │  dl 2 colunas, label muted
│        │     │ Para quem   Indústrias de alimentos e cosméticos    │ │
│        │     │ Onde        Brasil todo, começando pelo Sudeste     │ │
│        │     └─────────────────────────────────────────────────────┘ │
│        │ ┌───────────────────────────────────────────────────────────┐│
│        │ │ (◎) Especialista comercial da Lumi  [Pronto p/ aprovação] ││  1 linha · badge = ciano
│        │ │     Abordagem escrita com base no seu catálogo  (Ver)(Aprovar)│
│        │ └───────────────────────────────────────────────────────────┘│
└────────┴─────────────────────────────────────────────────────────────┘
```

- **Hierarquia:**
  1. O balão da Camila: o produto contado do jeito dela.
  2. "O que eu entendi".
  3. A linha do especialista.
  4. O CNPJ, que é a porta de entrada e pesa pouco visualmente.
- **CNPJ:** `InputGroup` estático, `h-10 w-[300px]`, valor em `font-mono tabular-nums`. A confirmação fica ao lado, com o nome da empresa e um check `navy-600`. O CNPJ é fictício e o formato é válido só de forma visual. O valor vem do copy/dados.
- **Anexos:** `Badge variant="outline" className="h-7 px-3 text-[13px]"` com ícone. São só 2. **Não** desenhe barra de upload, porcentagem de envio ou área de arrastar.
- **"O que eu entendi":** é um `dl` em `grid-cols-[120px_1fr] gap-y-2`. Os rótulos ficam em `text-[13px] text-muted-foreground` e os valores em `text-[15px]`. Ele substitui os `CriterionChip` da v3 e **não** tem o chip "Sinal".
- **Especialista comercial:** é um card de uma linha, `rounded-xl border border-navy-100 bg-card px-5 py-3.5`.
  - À esquerda, um avatar neutro com `UserRoundIcon` em `bg-navy-50`.
  - Em seguida, o nome em `font-semibold` e uma subfrase em `text-[13px] muted`.
  - O `Badge variant="signal"` "Pronto para aprovação" é **o ciano da etapa**.
  - À direita ficam `Button variant="outline" size="sm"` "Ver abordagem" e `Button size="sm"` "Aprovar". O botão Aprovar é `default` (navy), não ciano.
  - É só isso: não há passos, toggles, campos de prompt ou "configurar agente". A ideia "validar antes de começar" cabe numa linha (briefing §4).
- **Sem campo de chat no rodapé** (a v3 tinha um). A tela não é uma conversa aberta: é o produto entendido.
- **Motion:**
  1. O CNPJ é digitado (`TextType`, 0.8s).
  2. A confirmação aparece.
  3. O balão entra.
  4. Os anexos entram em cascata.
  5. "O que eu entendi" entra.
  6. A linha do especialista sobe e o badge acende (`scale 0.92 → 1`).
  Ao todo, são cerca de 4s.

### 4.4 Etapa 2 · Fit, por volume (`screen-perfil-v4.tsx`)

```
┌sidebar─┬ Seu perfil / Embalagens flexíveis ──────────────────────────┐
│        │ EMPRESAS COM O SEU PERFIL                                   │  mono label muted
│        │ 4.860                                                       │  font-heading font-light 112px canvas
│        │ no Brasil todo, para o que a Lumi vende                     │  text-[15px] muted
│        │                                                             │
│        │ ┌ Setores ──────────┐ ┌ Regiões ──────────┐ ┌ Porte ──────────┐
│        │ │ Alimentos   2.930 │ │ Sudeste     2.710 │ │ 50 a 199  2.380 │  label text-sm · número mono
│        │ │ ▬▬▬▬▬▬▬▬▬▬        │ │ ▬▬▬▬▬▬▬▬▬         │ │ ▬▬▬▬▬▬▬▬        │  barra 4px
│        │ │ Cosméticos  1.310 │ │ Sul         1.050 │ │ 200 a 499 1.840 │
│        │ │ ▬▬▬▬              │ │ ▬▬▬               │ │ ▬▬▬▬▬▬          │
│        │ │ Bebidas       620 │ │ Nordeste      640 │ │ 500 ou mais 640 │
│        │ │ ▬▬                │ │ Outras        460 │ │ ▬▬              │
│        │ └───────────────────┘ └───────────────────┘ └─────────────────┘
│        │ ┌───────────────────────────────────────────────────────────┐│
│        │ │ ● A fynd já começou a abordar e qualificar.               ││  ● = ciano (único da tela)
│        │ │   Você é avisada quando alguém tiver interesse.           ││  text-sm muted
│        │ └───────────────────────────────────────────────────────────┘│
└────────┴─────────────────────────────────────────────────────────────┘
```

- **O número é o herói da tela.** Use `text-[7rem] leading-none font-light tracking-display tabular-nums` no canvas (cerca de 90px reais no MacBook da demo) e `CountUp` de 0 a 4.860 em 1.2s. O ponto de milhar é fixo (`toLocaleString("pt-BR")`).
- **Recortes agregados:** são 3 cards `rounded-xl border bg-card p-5` em `grid-cols-3 gap-4`, cada um com o título em `text-sm font-semibold`.
  - Cada linha tem rótulo e número em mono e uma barra de 4px proporcional ao maior valor do card. A primeira barra é `navy-600` e as demais, `navy-300`.
  - Os valores somam 4.860 em cada card. Eles são provisórios e o copy/dados confirma.
- **Proibido nesta tela:** nome de empresa, logo, avatar de empresa, % (inclusive nas barras), "fit 92%", lista e o botão "Ver as 4.860 empresas". Os números são absolutos. As barras não têm rótulo de porcentagem.
- **Faixa de status:** `rounded-lg border bg-paper-50 px-4 py-3`. Ela começa com um ponto de 8px em `bg-signal` com o anel de pulso do `LitDot` (versão `size-2`, uma vez, depois parado). Esse ponto é **o ciano da etapa**. O texto fica em `navy-900` e `muted`, nunca em ciano.
- **Motion:**
  1. O rótulo aparece.
  2. O número conta.
  3. Os 3 cards entram em cascata (0.08s).
  4. As barras preenchem (`scaleX`, 0.8s).
  5. A faixa entra e o ponto acende.
  Ao todo, são cerca de 3s.

### 4.5 Etapa 3 · Interessados (`screen-interessados-v4.tsx`, também no hero)

```
┌sidebar─┬ Interessados / Embalagens flexíveis ────────────────────────┐
│        │ Interessados                         Ordenar por: Aderência ▾│
│        │ Responderam e querem saber mais · 12 empresas               │
│        │ ┌───────────────────────────────────────────────────────────┐│
│        │ │ (SA) Serra Azul Alimentos   [✓ Pediu amostras]   ADERÊNCIA ││  selo = ciano
│        │ │      Alimentos · Jundiaí, SP                     94% ▬▬▬▬ ││
│        │ │      CONTATO           INTERESSE IDENTIFICADO   PRÓXIMO PASSO│ dl 3 colunas
│        │ │      Renata Lima       Pouch para biscoito,     Enviar      ││
│        │ │      Gerente de compras para a nova fábrica     amostras    ││
│        │ │                              (Assumir conversa)(Agendar reunião)│
│        │ └───────────────────────────────────────────────────────────┘│
│        │ ┌ (BN) Bem Natural Cosméticos │ Sachês de 10 ml  │[Pediu proposta]│ 88% ┐
│        │ │      Paulo Mendes · Dir. de produto                               │
│        │ ┌ (CD) Casa Doce Biscoitos    │ Troca de fornecedor│[Conversa em nov.]│ 76% ┐
│        │ ┌ (GF) Grão Fino Cafés        │ Embalagem c/ válvula│[Pediu pedido mín.]│ 71% ┐
│        │ Ver os 12 interessados →        A partir daqui, a conversa é sua.│
└────────┴─────────────────────────────────────────────────────────────┘
```

- **Formato do escopo (§5), campo a campo:**

  | Campo | Onde fica no card ativo | Onde fica no card compacto |
  |---|---|---|
  | Empresa | linha 1, `text-base font-semibold`, com meta (setor · cidade) embaixo em muted | coluna 1, `text-[15px] font-semibold` |
  | Contato (nome e cargo) | `dl`, coluna 1: nome em `text-sm font-medium`, cargo em `text-[13px] muted` | coluna 1, segunda linha: "Nome · Cargo" em `text-[13px] muted` |
  | Interesse identificado | `dl`, coluna 2, `text-sm` | coluna 2, `text-sm text-foreground/85 truncate` |
  | Status | **o selo**, ao lado do nome (`InterestSeal` com o texto do status) | selo neutro (`navy-50`, `text-navy-700`) |
  | Próximo passo | `dl`, coluna 3, `text-sm font-medium` | não aparece (densidade) |
  | Aderência (%) | à direita da linha 1: rótulo mono "ADERÊNCIA", `data` "94%" e barra de 64×4px `navy-600` | coluna 4: `font-mono text-sm tabular-nums` e barra de 40×4px |

- **Grade do card compacto:** `grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_auto_5.5rem] items-center gap-5 px-5 py-3`. Não tem botões, só o card ativo tem ações. Isso tira 3 pares de botões da v3 e deixa a tela mais calma.
- **Ordem por aderência** (decrescente). A aderência só existe aqui, porque reflete a interação (ponto 16 da reunião). Ela é número com barra **neutra**, nunca ciano, nunca verde ou vermelho por faixa.
- **Cabeçalho:** "Interessados" em h3 Sora 300 2rem, com a linha "Responderam e querem saber mais · 12 empresas" em muted. Há um único controle, "Ordenar por: Aderência", em texto. Não há filtros nem abas.
- **Rodapé da tela:** igual à v3, com "Ver os 12 interessados →" (ghost) e "A partir daqui, a conversa é sua." em muted.
- **O ciano da etapa** é o selo do card ativo (acende no fim da cascata, com `sealSequence`). A barra de aderência do card ativo é `navy-600`.
- **Visíveis:** 1 card ativo e 3 compactos no canvas (eram 1 + 4 na v3). No hero vale o mesmo.
- **Detalhe ("me manda o telefone", ponto 17):** fica **fora** desta etapa. O toast opcional "Conversa com a Serra Azul Alimentos agora é sua." pode continuar só na demo, como na v3. Ele usa `text-success` no ícone e não usa ciano.
- **Dados:** contato, cargo, interesse identificado e aderência de cada empresa vêm de `data-v4.ts`, preenchido com o 02-copy-v4. Os nomes no wireframe são ilustrativos.

### 4.6 Painéis mobile (< lg, sem moldura)
`PlatformPanelV4` usa o mesmo poço de tela da v3 (barra de 28px, `rounded-xl border shadow-lg`), com layout nativo:
- **Seu produto:** o CNPJ com a confirmação, o balão, os 2 anexos, "O que eu entendi" (3 linhas) e o card do especialista empilhado (badge em cima, os 2 botões `size="xs"` embaixo).
- **Fit:** o número em `text-5xl`, os 3 recortes **em abas visuais estáticas**. Só "Regiões" aparece aberto e os outros dois títulos ficam como chips `secondary`, porque três cards empilhados ocupariam uma tela inteira. Depois vem a faixa de status com o ponto ciano.
- **Interessados:** o card ativo empilhado (a aderência sobe para a linha do selo e o `dl` vira 1 coluna) e 2 compactos, só com empresa, status e aderência.

---

## 5. "Você só precisa vender" (claro, substitui Dados)

```
┌──────────────────────────────────────────────────────────────────┐
│ SEM COMPLICAÇÃO                     Você não precisa…             │  eyebrow (provisório)
│ Você só precisa vender.                                           │  h1 cols 1–6
│                                     buscar mailing                │  lista cols 8–12, risco
│ Não é CRM. Não é chatbot.           fazer setup                   │  "Não é…" em Sora 300
│ Não é base de leads.                subir sua base                │  text-2xl muted
│ Não é automação.                    configurar automação          │
│ [1 linha: é o resultado delas…]     definir cliente ideal         │  text-base muted
│                                     entender de tecnologia        │
│                                     ─────────────────────────     │
│                                     ✓ Você só precisa atender     │  font-semibold, check navy-600
│                                       quem já quer comprar.       │
│ ──────────────────────────────────────────────────────────────── │  border-t, mt-12 lg:mt-16
│ 25 mi+   CNPJs do Brasil todo, organizados.  A cada interação,   │  número h2 Sora 300 · texto
│          a base aprende o que cada empresa compra.               │  text-base muted
└──────────────────────────────────────────────────────────────────┘
```

- `section` em `bg-paper-100`, com `sectionYV4` e `data-theme="light"`. Não tem `id` de menu.
- **Coluna esquerda (cols 1–6):** eyebrow, título h1/h2 e, com `mt-6`, as quatro negações como **um parágrafo** em `font-heading text-2xl font-light tracking-display text-muted-foreground` (steel-500 sobre paper-100, 5.3:1, texto grande). Abaixo vem uma linha de apoio opcional em `text-base`.
  - As negações **não** levam X. O X é exclusivo do "hoje" da seção 2, e repetir o recurso daria a sensação de outro comparativo.
- **Coluna direita (cols 8–12):** o rótulo "Você não precisa…" em `text-sm font-semibold`, seguido de um `<ul>` com 6 itens em `text-base text-muted-foreground line-through decoration-steel-400 decoration-1`, separados por `py-2.5`.
  - O riscado é o recurso visual desta seção: o que **sai da sua rotina**. A legibilidade está garantida (5.3:1) e o sentido vem do rótulo, então o leitor de tela lê a lista normalmente.
  - O fecho, "Você só precisa atender quem já quer comprar.", fica separado por `border-t pt-4 mt-2`, sem riscado, em `font-semibold text-foreground` e com o `CheckIcon` `navy-600`. É o único check da seção.
- **Linha da base:** fica no fim da seção, como uma faixa de largura total com `border-t border-border pt-8`, em grid 12:
  - O número fica nas colunas 1–3, com `font-heading text-5xl font-light tracking-display tabular-nums`. O texto exato ("25 mi+" ou "+25 milhões") vem do copy.
  - O texto fica nas colunas 4–12, em `text-base text-muted-foreground max-w-[40rem]`.
  - Não há ícone de banco de dados, nem mapa do Brasil, nem fonte citada. **Nunca "Receita Federal".**
- **Mobile:** tudo empilhado: título, negações, lista e, por fim, o número com o texto abaixo.
- **Sem ciano. Sem motion além do `Reveal` padrão.** Uma ideia opcional para o motion: o riscado é desenhado da esquerda para a direita em cascata (`background-size` de uma linha de 1px), uma vez. Com movimento reduzido, a lista já aparece riscada.

---

## 6. Para quem (claro, compacto)

```
┌──────────────────────────────────────────────────────────────────┐  bg-paper-50, border-t no container
│ PARA QUEM                                                        │
│ Para vender mais sem montar estrutura.   [lead 1 linha]          │  cabeçalho dividido
│                                                                  │
│ ───────────────────────────────  ─────────────────────────────── │  hairline por coluna
│ Quem vende sozinho               Quem lidera um time             │  text-sm font-semibold
│ Teste sem contratar ninguém.     [título curto]                  │  h3
│ [1–2 linhas]                     [1–2 linhas]                    │  p muted
│                                                                  │
│ FUNCIONA BEM PARA                                                │  eyebrow, mt-12
│ (Consultorias) (Contabilidades) (Crédito empresarial)            │  chips outline, wrap
│ (Benefícios corporativos) (Software houses) (SaaS B2B) …         │
│                                                                  │
│ Quero ver com o que eu vendo →                                   │  link, mt-10
└──────────────────────────────────────────────────────────────────┘
```

- `bg-paper-50`, com `sectionYV4` dentro do container que tem a hairline (o mesmo padrão da v3).
- **As duas colunas deixam de ser cards:** `grid lg:grid-cols-2 gap-10 lg:gap-8`, com cada coluna em `border-t border-border pt-6`, que é o padrão de hairline das seções 2 e 5 da v3.
  - Os checklists e a faixa de 3 garantias saem. As garantias agora estão na seção 5.
  - O `Badge variant="label"` sai porque, em caixa alta, ele quebra mal em 2 linhas. O rótulo passa a ser `text-sm font-semibold`.
- **Chips de público:** `Badge variant="outline"` com `h-8 px-3.5 text-sm`, em `flex flex-wrap gap-2`, com os 11 itens do escopo §7.
  - Sem ícones e sem cor por segmento: todos são iguais.
  - Os chips não são links nem filtros (`<ul>` com `<li>`, sem hover).
  - Na v4 eles não levam o selo "e mais": a lista é a do escopo, e o copy pode cortar.
- **Mobile:** as colunas ficam empilhadas e os chips quebram naturalmente. Se passarem de 4 linhas em 375px, mostre os 8 primeiros e coloque um botão `ghost size="xs"` "Ver todos" que expande no lugar. O copy decide se corta antes.
- **Sem ciano.** O depoimento e o bloco de experiência continuam `null` (iguais à v3). Se forem ligados, entram entre as colunas e os chips.

---

## 7. Encerramento: acesso antecipado e FAQ (escuro)

Igual ao `access-v3.tsx` no layout: texto e FAQ nas colunas 1–5 e formulário sticky nas colunas 7–12. As mudanças são estas:
- **Título:** "O que você quer vender?" em `Text variant="h1" render={<h2/>}`, `max-w-[14ch]`. A pergunta é curta e pode ir em 2 linhas no desktop. É a frase-essência, e o tamanho vem do mesmo h1 visual. Não use display, não use ciano.
- **Reforço de zero setup:** o mesmo `ZeroSetupStrip` do hero, com `align="start"` e `mt-6`, logo abaixo do lead. Ele fecha o arco da página: a mesma linha no começo e no fim (ponto 2 da reunião).
- **Formulário:** é o `AccessFormV3` sem alteração estrutural.
  - O submit `variant="signal"` continua **o único ciano preenchido do site**.
  - Se o copy trocar o rótulo do campo de texto para "O que você quer vender?", o título e o campo passam a se responder. Essa é uma decisão do copy e não muda o layout.
- **FAQ:** no máximo 5 itens. O espaço entre o FAQ e o lead diminui para `mt-10`.
  - A pergunta "A fynd entra em contato…" sai ou é reescrita sem prometer o primeiro contato.
  - A pergunta "De onde vêm os dados?" responde sem fonte.
  - Em "Quanto custa?", não fale em modelo de preço.
- Padding `sectionYV4`.
- Com o menu, o CTA do header some quando esta seção está em vista (igual à v3).

---

## 8. Header e footer

- **Header v4:** cópia do `header-v2.tsx` que importa `NAV_LINKS_V4`, `ANCHORS_V4` e `CTA_LABEL_V4`. O visual, os estados, a leitura de `data-theme`, o menu mobile e a ocultação do CTA na seção 7 continuam iguais aos da v2/v3.
  - A âncora ativa "Na prática" fica acesa durante todo o pin.
  - Não use ciano no header.
- **Footer v4:** cópia do `footer-v3.tsx` com `NAV_LINKS_V4` mais "Acesso antecipado". A linha institucional continua "Você vende, a gente encontra." Sem outras mudanças.

---

## 9. Checklist de consistência v4 (além do checklist de `03-design.md` §5)

**Comprimento**
- [ ] Todas as seções novas usam `sectionYV4` e `headToBodyV4`. Não adicione padding para "consertar" uma seção.
- [ ] Pin da demo com 3 etapas e `innerHeight * 2`. Altura total da página em 1440×900 ≤ ~10.000px (meça com `document.body.scrollHeight`).
- [ ] Saem da página: `NoiseListV3`, `DataSectionV3`, a faixa `PROOFS`, a linha "Para PMEs B2B…" do hero, os checklists e as garantias do Para quem, e a etapa "Primeiro contato".

**Cor**
- [ ] O ciano aparece só no ponto aceso do hero, no selo do card ativo (hero, mini 3 e etapa 3), no badge "Pronto para aprovação" (etapa 1), no ponto de status (etapa 2) e no submit do formulário. As seções 2, 5 e 6 e a faixa do motor não têm ciano.
- [ ] O `destructive` aparece **só** como `XIcon` na coluna "hoje" da seção 2, dentro do `.dark`. Não use texto, borda ou fundo vermelho.
- [ ] Aderência e recortes de volume usam só `navy-600` e `navy-300`. Não use semáforo de cores.

**Conteúdo nas telas**
- [ ] A tela de Fit não tem nome de empresa, avatar nem %. As barras não têm rótulo de porcentagem.
- [ ] A aderência aparece só em Interessados.
- [ ] Nenhuma tela ou card mostra "contatadas", "responderam 21" ou "primeiro contato". O shell v4 não tem esse item de nav.
- [ ] Os cards de Interessados mostram empresa, contato com cargo, interesse identificado, status (selo), próximo passo (no ativo) e aderência.
- [ ] Os cards flutuantes não têm setas nem % entre 4.860 e 12.

**Marca e texto**
- [ ] "fynd" nunca vai em `uppercase` por CSS. O rótulo "Com a fynd" e o "a fynd cuida" do motor ficam em caixa normal. Os rótulos mono em caixa alta não contêm "fynd".
- [ ] Nada de "Receita Federal", "IA", ícone de engrenagem, de robô ou de banco de dados.
- [ ] Os textos entre aspas neste documento são provisórios. O texto final vem do `02-copy-v4.md`.

**Arquivos**
- [ ] Use só arquivos novos com sufixo `-v4` (seções, `platform-v4/**`, `header-v4`, `footer-v4`, `anchors-v4.ts`, `data-v4.ts`). `sectionYV4` e `headToBodyV4` são adições ao `site-container.tsx`, sem alterar o que existe. Não edite nenhum `-v3`, `-v2` ou arquivo sem sufixo.
- [ ] Reaproveite sem copiar: `MacBook`, `InterestSeal`, `sealSequence`, `playback`, `CountUp`, `TextType`, `AccessFormV3`, `SiteContainer` e `siteGrid`. `Backdrop`, `LitDot` e `LightPath` não são exportados por `hero-v3.tsx`. Por isso, copie-os para `hero-parts-v4.tsx` sem nenhuma alteração.

**Acessibilidade**
- [ ] Os pares da seção 2 são duas `<ul aria-labelledby>`, com ícones `aria-hidden`.
- [ ] A lista riscada da seção 5 é legível, com contraste de 5.3:1 e o sentido dado pelo rótulo.
- [ ] A linha de funil do hero mobile é texto real.
- [ ] O `aria-label` do MacBook vem do copy por etapa (3 rótulos + hero).

---

## Resumo das decisões
1. **Mais curta pelo ritmo, não por um visual novo.** O padding de seção cai para 80/96/128px, o pin passa de 400vh para 300vh, Dados sai e Para quem perde cards e checklists. A estimativa é de cerca de 25% a menos de rolagem.
2. **O zero setup é uma linha mono, não um bloco.** Ela fica logo abaixo dos botões do hero, no lugar de duas linhas que saem, e se repete igual no encerramento.
3. **Na seção 2, "hoje × com a fynd" é campo escuro × painel claro.** Os pares ficam alinhados no desktop e viram dois blocos no mobile. O X `destructive` aparece só como ícone. Tudo é escrito na segunda pessoa e sem cabeçalho de tabela, para não virar comparativo de sistemas. A `NoiseList` sai.
4. **O motor é uma trilha de 6 verbos.** Os 4 do meio ficam apagados sob um colchete "a fynd cuida", e é essa trilha que mostra "a complexidade fica com a fynd" sem ilustração.
5. **A demo tem 3 telas com um herói cada:** o produto entendido (com o especialista numa linha), o número 4.860 com recortes neutros e sem nomes, e os cards de interessados no formato do escopo, com a aderência só ali. Há um ciano por tela.
6. **O ciano continua raro.** As seções 2, 5 e 6 e o motor não têm nenhum. O destructive entra no site só como o X das dores.
