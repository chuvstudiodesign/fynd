# 03 · Design v5: só o que muda em relação à v4 (com as notas de motion)

_Etapa 3 da v5 · modo direto · 2026-10-07_
_Base: `docs/site/v5/00-briefing-v5.md`, material da cliente (só conteúdo e ordem), `docs/site/v4/03-design-v4.md`, `docs/site/v4/04-motion-v4.md`, código `*-v5` (hoje cópia fiel da v4) e `src/app/globals.css`._
_Os textos entre aspas são **provisórios**. O texto final é o do `docs/site/v5/02-copy-v5.md`. Conflito de texto: vale o copy. Conflito de cor, layout ou timing: vale este documento._

**Princípio da v5:** a página muda de assunto (validação de mercado, oportunidade em vez de interessados), mas **não muda de visual**. Tudo o que não aparece aqui segue a v4. As partes novas são montadas com as peças que já existem: cabeçalho dividido, hairlines, card `paper-50`, painel claro sobre campo escuro, `InterestSeal`, rótulo mono. O visual do HTML da cliente (barras ciano, eyebrows em ciano, linha de acento) não entra em nenhum lugar.

---

## 0. O que vale para a página inteira

### 0.1 Ordem, tema, ciano e altura (1440×900)

| # | Seção (arquivo) | Tema | Fundo | Ciano da dobra | Altura-alvo |
|---|---|---|---|---|---|
| 0 | Header (`header-v5`) | adaptativo | igual à v4 | nenhum | 64 (sobreposto) |
| 1 | Hero (`hero-v5`) | escuro | `navy-900` | ponto aceso + selo na tela (iguais à v4) | ~1.430 |
| 2 | O problema, 4 peças (`problem-v5`, reescrita) | escuro | `navy-900` | nenhum | ~690 |
| 3 | Como funciona, 3 passos (`how-it-works-v5`) | claro | `paper-100` | selo da mini 3 (igual à v4) | ~1.070 |
| 4 | Lista × oportunidade (`opportunity-v5`, novo) | escuro | `navy-900` | selo "Interesse demonstrado" no card claro | ~810 (sem padding inferior) |
| 5 | Na prática, demo com pin (`demo-v5`) | escuro | `navy-900` | um por etapa, dentro da tela (igual à v4) | ~3.210 |
| 6 | A diferença: camadas + contraste (`difference-v5`, novo) | claro | `paper-100` | ponto de 8px na camada Resultado | ~850 |
| 7 | Não é mais uma ferramenta (`not-a-tool-v5`, novo) | claro | `paper-50` + hairline | nenhum | ~620 |
| 8 | Encerramento + questionário (`access-v5` + `validation-form-v5`) | escuro | `navy-900` | botão `signal` "Enviar interesse", só na última etapa | ~860 |
| 9 | Footer (`footer-v5`) | escuro | `navy-950` | nenhum | ~400 |
| | **Total** | | | | **~9.940 px** |

- A alternância é a mesma da v4: escuro, escuro, claro, escuro (4 + 5 formam um campo só), claro, claro, escuro, escuro.
- As seções 6 e 7 do briefing ("camadas" e "a diferença") **viram uma seção só** (§5). É a mesma ideia dita duas vezes: o mapa e a conclusão. Juntas ocupam ~850px; separadas passariam de 1.300.
- A seção 4 fica no escuro e emenda na demo: tese ("queremos entregar uma oportunidade") e prova ("na prática") no mesmo campo. Repete a metáfora da v4: o escuro conta o "hoje" e a única superfície clara é a resposta.

**A conta fecha no limite.** Meça com `document.documentElement.scrollHeight` em 1440×900. Se passar de 10.000, corte nesta ordem e pare assim que couber:
1. Pin da demo de `innerHeight * 2` para `innerHeight * 1.8` (−180).
2. Faixa do ciclo sai da seção 3; a frase de fecho vira uma linha `h3` centrada com `mt-12` (−115 líquidos).
3. Linha de saída da demo sai inteira; a demo termina com `pb-24` (−130).
4. Só então mexa em texto: lead da seção 6 e linha de apoio da seção 7.

Não corte: o hero, os minis, o card de oportunidade, nenhuma etapa da demo.

### 0.2 Ritmo vertical
Continuam `sectionYV5` (80 / 96 / 128) e `headToBodyV5` (40 / 48 / 64). Uma constante nova em `anchors-v5.ts`:

```ts
/** Seções curtas da v5 (hoje só a 7). */
export const sectionYCompactV5 = "py-16 md:py-20 lg:py-24" // 64 / 80 / 96
```

Exceções de padding, todas para emendar campos da mesma cor:
- Seção 4: `pt-20 md:pt-24 lg:pt-32 pb-0`. O respiro até a demo é o `pt` da abertura da demo.
- Abertura da demo: `pt-20 md:pt-24 lg:pt-24 pb-12 lg:pb-16` (era `lg:pt-32`).

### 0.3 Âncoras e rótulos (`anchors-v5.ts`)

```ts
export const ANCHORS_V5 = { top: "inicio", howItWorks: "como-funciona", demo: "na-pratica", difference: "a-diferenca", access: "testar" } as const
export const NAV_LINKS_V5 = [
  { id: ANCHORS_V5.howItWorks, label: "Como funciona" },
  { id: ANCHORS_V5.demo, label: "Na prática" },
  { id: ANCHORS_V5.difference, label: "A diferença" },
] as const
export const CTA_LABEL_V5 = "Tenho interesse em testar a fynd" // hero, saída da demo, menu mobile
export const CTA_SHORT_LABEL_V5 = "Quero testar"               // header (todas as larguras) e footer
```

As seções 2, 4 e 7 não têm âncora de menu. A chave `audience` sai.

### 0.4 Cor e tokens
- **Ciano por dobra:** a lista é a da tabela §0.1 e nada mais. As seções 2 e 7, a faixa do ciclo, o indicador de progresso do questionário e os botões "Continuar" não têm ciano. O anel de foco no escuro continua sendo o `--ring` do tema (uso de foco, já existente).
- **`destructive` deixa de aparecer como ícone.** O X da seção 2 da v4 sai junto com ela. Na v5 ele só existe como mensagem e borda de erro do questionário.
- **Sem cor nova.** Só tokens de `globals.css`. Onde o texto fala em "tinta", é opacidade sobre token (`bg-paper-50/10`).
- **Superfície clara dentro de seção escura** (card de oportunidade) e **faixa escura dentro de seção clara** (camada Resultado): o escopo de tokens vem da classe `dark` no elemento certo. Na seção 4, `dark` vai no cabeçalho e no card "hoje", **não** no grid que contém os dois cards. Na seção 6, a camada Resultado recebe `dark bg-navy-900 text-foreground`.
- **"fynd" nunca em `uppercase` por CSS.** Por isso os passos da seção 3 deixam de ter rótulo em caixa alta com o nome do passo (§2).

---

## 1. O problema em 4 peças (escuro)

Substitui o par "hoje × com a fynd". Sem painel claro, sem X, sem check, sem cards: quatro colunas de texto sob hairline. A seção 3 logo abaixo tem três cards; aqui a forma é outra de propósito.

```
┌──────────────────────────────────────────────────────────────────┐
│ O PROBLEMA                                                       │  eyebrow
│ Gerar novos clientes B2B           [lead: para prospectar bem,   │  h1 cols 1–7 · lead cols 8–12,
│ ainda é complexo.                   uma empresa precisa coordenar│  alinhados pela base
│                                     várias peças…]               │
│                                                                  │
│ ───────────────  ───────────────  ───────────────  ───────────── │  border-t por coluna
│ 01               02               03               04            │  mono, steel-300
│ Pessoas          Dados            Ferramentas      Operação      │  h3
│ Contratar,       Encontrar        CRM, automações, Mensagens,    │  text-base steel-300
│ treinar e        empresas e       bases e canais.  cadências,    │
│ gerenciar SDRs.  contatos certos.                  follow-ups…   │
└──────────────────────────────────────────────────────────────────┘
```

- **Cabeçalho:** o dividido da v4. `Text variant="h1" render={<h2/>}` com `max-w-[18ch]`.
- **Peças:** `<ol>` em `grid gap-x-8 lg:grid-cols-4`. Cada `<li>`: `border-t border-border pt-5`.
  - Índice: `font-mono text-[0.6875rem] tracking-label text-steel-300 tabular-nums`.
  - Nome: `Text variant="h3" render={<h3/>}` com `mt-6`, em `paper-50` (15,6:1).
  - Linha: `mt-2 text-base leading-[1.6] text-steel-300` (7,5:1), `max-w-[22ch]`.
- **Hierarquia:** título, depois os quatro nomes (lidos em fila, somam "é muita coisa"), depois as linhas. Não há frase de fechamento: a pergunta da seção 3 é a resposta.
- **Sem ícones.** Nada de boneco, banco de dados, engrenagem ou funil.
- **Responsivo**
  - **1280+:** 4 colunas, como acima.
  - **768:** `grid-cols-2`, duas linhas de duas, `gap-y-10`. Lead abaixo do título (cabeçalho empilha abaixo de `lg`).
  - **390:** lista vertical. Cada item vira `grid grid-cols-[2.5rem_1fr]` (índice à esquerda; nome e linha à direita), `py-5`, hairline entre os itens, nome em `h4`. Fica mais baixo que quatro blocos empilhados.

---

## 2. Como funciona: "Você explica → A fynd trabalha → Você vende" (claro)

**Fica igual à v4:** cabeçalho dividido, os 3 cards `bg-paper-50 border rounded-xl`, os três minis (`MiniContaV5`, `MiniEncontraV5`, `MiniFechaV5`) sem alteração visual, a faixa do ciclo com os seis verbos, o selo da mini 3 como único ciano.

**Muda:**

```
┌──────────────────────────────────────────────────────────────────┐
│ ZERO SETUP                                                       │  eyebrow
│ E se o processo fosse              [lead curto, 1–2 linhas]      │  h1 cols 1–6 · lead cols 8–12
│ muito mais simples?                                              │
│                                                                  │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐   │
│ │ [mini 1]         │ │ [mini 2]         │ │ [mini 3]  (selo) │   │  minis da v4
│ │ 01               │ │ 02               │ │ 03               │   │  só o índice em mono
│ │ Você explica     │ │ A fynd trabalha  │ │ Você vende       │   │  h3 (era h4)
│ │ [1–2 linhas]     │ │ [1–2 linhas]     │ │ [1–2 linhas]     │   │  muted
│ └──────────────────┘ └──────────────────┘ └──────────────────┘   │
│ ──────────────────────────────────────────────────────────────── │
│ Você conhece seu produto.    01        02        …        06     │  faixa do ciclo da v4
│ A fynd cuida da busca.       ENTENDER ─ ENCONTRAR ─ … ─ ENTREGAR │
└──────────────────────────────────────────────────────────────────┘
```

1. **Rótulo do passo:** o eyebrow do card passa a ser só `01`, `02`, `03`. O nome do passo sobe para o título, em `Text variant="h3" render={<h3/>}`. Motivo: "A FYND TRABALHA" em caixa alta quebra a regra da marca, e o trio precisa ser lido como frase ("Você explica, a fynd trabalha, você vende").
2. **Sem setas entre os cards.** O índice e a faixa do ciclo já dão a direção.
3. **Texto do card:** no máximo 2 linhas em 1280. O passo 2 é o mais longo ("Entende o negócio, encontra empresas, aborda e conversa."); os outros dois não podem passar dele.
4. **Faixa do ciclo:** a coluna esquerda troca "A complexidade fica com a fynd." por **"Você conhece seu produto. A fynd cuida da busca."**, no mesmo `h3` Sora 300, `max-w-[18ch]`. O eyebrow acima dela é opcional (decide o copy). A trilha, o colchete e a legenda "você entra aqui" não mudam.
5. **Sai o link "Ver na prática ↓".** A seção seguinte não é mais a demo. A seção termina na faixa do ciclo.

Responsivo: o da v4 (card em duas colunas internas em 768, empilhado em 390; trilha em `grid-cols-3` abaixo de `lg`).

---

## 3. Lista × oportunidade (escuro, emenda na demo)

```
┌──────────────────────────────────────────────────────────────────┐
│                Não queremos entregar uma lista.                  │  h1 centrado · 1ª frase steel-300
│              Queremos entregar uma oportunidade.                 │  2ª frase paper-50
│                                                                  │
│ ┌ HOJE ──────────────────┐  ┌ NOVA OPORTUNIDADE   (✓ Interesse ─┐│
│ │                        │  │                       demonstrado)││  selo = ciano da dobra
│ │ 5.000                  │  │ (SA) Serra Azul Alimentos         ││  h3
│ │ empresas em uma        │  │      Alimentos · Jundiaí, SP      ││  muted
│ │ planilha               │  │ ───────────────────────────────── ││
│ │ ┌──┬─────┬────┬─────┐  │  │ CONTATO      Renata Moraes        ││  dl, rótulo mono
│ │ │▬▬│▬▬▬▬ │▬▬  │▬▬▬  │  │  │              Gerente de compras   ││
│ │ │▬▬│▬▬▬  │▬▬▬ │▬▬   │  │  │ ───────────────────────────────── ││
│ │ │▬▬│▬▬▬▬ │▬   │▬▬▬  │  │  │ NECESSIDADE  Pouch para a linha   ││
│ │ │▬▬│▬▬   │▬▬  │▬▬   │  │  │ IDENTIFICADA de biscoitos da nova ││
│ │ └──┴─────┴────┴─────┘  │  │              unidade              ││
│ │ Sua equipe ainda       │  │ ───────────────────────────────── ││
│ │ precisa descobrir quem │  │ PRÓXIMO      Enviar amostras e    ││
│ │ abordar, localizar…    │  │ PASSO ACEITO marcar reunião       ││
│ └────────────────────────┘  └───────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
   cols 1–5 (campo escuro)        cols 6–12 (painel claro)
```

- **Título:** `Text variant="h1" render={<h2/>}`, centrado, `max-w-[22ch] mx-auto`, cada frase em um `<span className="block">`. A primeira em `text-steel-300`, a segunda em `text-paper-50`. O contraste entre as duas frases é toda a hierarquia: sem eyebrow, sem lead.
- **Grade:** `siteGrid` com `items-stretch`, `headToBodyV5`. Card "hoje" em `lg:col-span-5`, card da oportunidade em `lg:col-span-7`. A assimetria dá o peso à oportunidade.

**Card "hoje" (planilha)**, dentro do `dark`:
- `rounded-2xl border border-border bg-navy-800/60 p-6 lg:p-8`, `flex flex-col`.
- Rótulo `HOJE`: eyebrow (mono, `steel-300`).
- `5.000`: `font-heading text-6xl font-light tracking-display tabular-nums text-steel-300` (5,6:1 sobre `navy-800`), `mt-6`. Abaixo, "empresas em uma planilha" em `text-lg text-paper-50`.
- Planilha: `mt-6`, `aria-hidden`. Grade de 4 colunas × 5 linhas, `rounded-lg border border-border`, células separadas por hairline, cada célula com uma barra `h-1.5 rounded-full bg-steel-500/40` de largura variada. As linhas perdem opacidade em degraus (100, 80, 60, 40, 20%). Sem máscara em gradiente, sem nome de empresa, sem número.
- Texto final: `mt-auto pt-6 text-sm leading-[1.6] text-steel-300`.
- Estático, calmo e sem cor: é o lado que não chama.

**Card da oportunidade**, fora do `dark`:
- `rounded-2xl bg-paper-50 p-6 text-navy-900 shadow-lg lg:p-8`.
- Linha de topo: rótulo `NOVA OPORTUNIDADE` (eyebrow, `steel-500`, 5,3:1) à esquerda e `InterestSeal signal` com o texto "Interesse demonstrado" à direita. É o **único ciano da dobra**, e é preenchimento com texto escuro, não texto ciano.
- Empresa: avatar de iniciais `size-10 rounded-full bg-navy-50 text-navy-700` + nome em `Text variant="h3" render={<h3/>}` + meta em `text-sm text-muted-foreground`. `mt-6`.
- `<dl>` com 3 linhas, `mt-6`, cada uma `grid grid-cols-[9.5rem_1fr] gap-4 border-t border-border py-4`. Rótulo: `font-mono text-[0.6875rem] tracking-label uppercase text-muted-foreground`. Valor: `text-base font-medium`; o cargo vai em segunda linha, `text-sm font-normal text-muted-foreground`.
- **Os cinco campos do material aparecem assim:** empresa (título), cargo do contato (linha 1), necessidade identificada (linha 2), interesse demonstrado (o selo), próximo passo aceito (linha 3).
- Dados vêm de `ACTIVE_V5` em `data-v5.ts` (Serra Azul Alimentos, Renata Moraes · Gerente de compras). Nada de "Empresa XYZ". **Sem aderência, sem %, sem botões**: é um objeto entregue, não uma tela. A tela vem logo abaixo, na demo.
- **Responsivo**
  - **1280+:** 5 + 7 colunas, mesma altura.
  - **768:** dois cards lado a lado em `sm:grid-cols-8` (3 + 5). A planilha cai para 3 colunas × 4 linhas.
  - **390:** empilhados, "hoje" primeiro, `gap-4`. Planilha com 3 linhas. No `<dl>`, o rótulo sobe para cima do valor (`grid-cols-1 gap-1`). O selo desce para baixo do rótulo se não couber na linha (`flex-wrap`).

---

## 4. Na prática: demo (reuso, mais curta)

**Não muda:** MacBook, `PlatformDemoV5`, as três telas, shell, indicador lateral, snap, modo empilhado, painéis mobile, um ciano por tela.

**Muda:**
- **Abertura menor**, porque a tese já foi dita na seção 4: título em `Text variant="h2" render={<h2/>}` (era `h1`), `max-w-[24ch]`; lead mantido em uma linha. Padding de §0.2.
- **Pin:** `end: "+=" + window.innerHeight * 2` (era `* 2.4`). Timeline, labels, `stepFromProgress` e snap ficam iguais (ver §9).
- **Textos laterais:** vocabulário novo (oportunidade, necessidade identificada). Decide o copy; o layout não muda. O rótulo `03 / 03 · INTERESSADOS` continua, porque é o nome da tela.
- **Linha de saída compacta:** vira uma linha só em `lg`. `flex flex-col items-center gap-6 lg:flex-row lg:justify-between`, dentro de `max-w-4xl mx-auto`, com `border-t border-border pt-8`; frase em `h4` à esquerda e botão `default lg` (papel, nunca ciano) à direita. Padding `pt-12 pb-20 md:pb-24`. Em 390, o botão ocupa a largura toda.

---

## 5. A diferença: mercado em camadas + contraste (claro)

Uma seção, `id="a-diferenca"`. À esquerda o mapa; à direita a conclusão.

```
┌──────────────────────────────────────────────────────────────────┐
│ A DIFERENÇA                                                      │  eyebrow
│ O mercado está evoluindo           [lead: as categorias se       │  h1 cols 1–7 · lead cols 8–12
│ em camadas.                         sobrepõem…]                  │
│                                                                  │
│ ┌────────────────────────────────────┐   As ferramentas          │  Sora 300 text-xl, muted
│ │ 01  Dados         Quem existe e    │   tradicionais ajudam     │
│ │                   com quem falar?  │   sua equipe a gerar      │
│ └────────────────────────────────────┘   oportunidades.          │
│ ┌────────────────────────────────────┐   ─────────────────────   │  border-t
│ │ 02  Inteligência  Quem vale        │   A fynd quer gerar a     │  h3, foreground
│ │                   prospectar agora?│   oportunidade para       │
│ └────────────────────────────────────┘   sua equipe.             │
│ ┌────────────────────────────────────┐                           │
│ │ 03  Execução      Como executar a  │   A maioria vende uma ou  │  text-base muted
│ │                   prospecção?      │   mais partes do          │
│ └────────────────────────────────────┘   processo. A fynd quer   │
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   vender o resultado.     │
│ ┃ 04  Resultado     Oportunidade     ┃                           │  faixa navy-900
│ ┃                   comercial   ● fynd┃                           │  ● = ponto ciano 8px
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛                           │
│ DADOS + INTELIGÊNCIA + EXECUÇÃO → RESULTADO                      │  mono, mt-5
└──────────────────────────────────────────────────────────────────┘
   cols 1–7                                  cols 9–12
```

**Camadas (cols 1–7)**
- `<ol className="flex flex-col gap-2">`. Cada camada é uma faixa: `rounded-lg border border-border bg-paper-50 px-5 py-4`, com `grid grid-cols-[2rem_8.5rem_1fr_auto] items-baseline gap-x-4`.
  - Índice: mono `text-[0.6875rem] text-muted-foreground`.
  - Nome: `font-mono text-xs font-medium tracking-label uppercase text-foreground`.
  - Pergunta: `text-base text-foreground`.
- **Camada Resultado (a da fynd):** mesma grade, com `dark border-transparent bg-navy-900 text-foreground` e `py-5` (um pouco mais alta que as outras). É a única faixa escura da seção clara: o destaque vem da inversão, não de cor nova.
  - Na coluna da direita, o wordmark da fynd em versão clara (componente de `brand/*`, altura 16px) precedido de um ponto `size-2 rounded-full bg-signal`. O ponto é o **único ciano da dobra**. A palavra "fynd" não é escrita em mono caixa alta.
  - Texto: "Oportunidade comercial entregue." em `paper-50`.
- **Linha de síntese:** `mt-5 font-mono text-xs tracking-label uppercase text-muted-foreground`, com "RESULTADO" em `text-foreground`. O `+` e a `→` são texto.
- **Sem nomes de concorrentes.** Estrutura pronta em `data-v5.ts`:

  ```ts
  export const SHOW_EXAMPLES = false
  export const LAYERS_V5 = [
    { index: "01", name: "Dados",        question: "Quem existe e com quem falar?",    examples: ["Speedio", "Econodata", "Apollo", "Seamless"] },
    { index: "02", name: "Inteligência", question: "Quem vale prospectar agora?",      examples: ["Datlo", "Cortex", "Demandbase"] },
    { index: "03", name: "Execução",     question: "Como executar a prospecção?",      examples: ["Leads2b", "Ramper", "11x", "Artisan", "AiSDR"] },
    { index: "04", name: "Resultado",    question: "Oportunidade comercial entregue.", examples: [], fynd: true },
  ] as const
  ```

  **Espaço dos exemplos:** segunda linha dentro da faixa, sob a pergunta (`col-start-3`), em `mt-1 font-mono text-xs text-muted-foreground`, nomes separados por " · ", caixa normal, só texto (sem logo, sem link). Com a flag desligada, a linha **não é renderizada** e não fica espaço vazio. Ligada, cada uma das três faixas cresce ~24px (+72px na seção): se isso estourar o teto, aplique o corte 1 de §0.1.

**Contraste (cols 9–12)**, alinhado ao topo das camadas:
- Frase 1 ("As ferramentas tradicionais ajudam…"): `font-heading text-xl font-light leading-[1.35] text-muted-foreground` (`steel-500`, 5,3:1).
- `border-t border-border`, `mt-6 pt-6`.
- Frase 2 ("A fynd quer gerar a oportunidade…"): `Text variant="h3" render={<p/>}`, `text-foreground`. É o texto mais forte da coluna.
- Fecho ("A maioria vende uma ou mais partes… vender o resultado."): `mt-6 text-base text-muted-foreground`.
- Sem X, sem check, sem "nós × eles" em tabela, sem linha de acento ciano. Tom de intenção ("quer gerar", "quer vender"), nunca de promessa.

**Responsivo**
- **1280+:** como acima.
- **768:** uma coluna. Camadas em largura total, com a mesma grade interna; o contraste vem abaixo (`mt-12`), com as duas frases lado a lado em `sm:grid-cols-2 gap-8` e o fecho embaixo, em largura total.
- **390:** dentro de cada faixa a grade vira `grid-cols-[2rem_1fr]`: índice e nome na primeira linha, pergunta na segunda (e exemplos na terceira, se ligados). Na camada Resultado, o ponto e o wordmark descem para o fim da faixa. A linha de síntese quebra depois de "EXECUÇÃO". Contraste empilhado.

A ordem no DOM é camadas, síntese, contraste: igual à ordem visual em todas as larguras.

---

## 6. Não é mais uma ferramenta (claro, `paper-50`, curta)

Substitui "Você só precisa vender". Saem a lista riscada, as quatro negações "Não é…" e a linha "25 mi+".

```
┌──────────────────────────────────────────────────────────────────┐  bg-paper-50, hairline no container
│ A proposta não é ser                Sem configurar IA            │  h1→h2 cols 1–6 · lista cols 8–12
│ mais uma ferramenta.                ───────────────────────────  │
│                                     Sem construir listas         │  Sora 300 text-xl
│                                     ───────────────────────────  │
│                                     Sem montar automações        │
│                                     ───────────────────────────  │
│                                     Sem precisar dominar         │
│                                     prospecção                   │
│ ──────────────────────────────────────────────────────────────── │  border-t, mt-12 lg:mt-16, pt-8
│ PRINCÍPIO                                                        │  eyebrow
│ Você explica o que vende.           A experiência precisa        │  h2 cols 1–7 · apoio cols 8–12,
│ A fynd cuida do restante.           esconder a complexidade, não │  pela base
│                                     transferi-la para o cliente. │
└──────────────────────────────────────────────────────────────────┘
```

- `sectionYCompactV5`, dentro do container com hairline no topo (padrão da v4 para duas claras seguidas).
- **Título:** `Text variant="h2" render={<h2/>}`, `max-w-[16ch]`. Sem eyebrow e sem lead.
- **Lista:** `<ul>`, cada item `border-t border-border py-3.5` (o primeiro sem borda), `font-heading text-xl font-light tracking-display`. A palavra "Sem" em `text-muted-foreground`; o resto em `text-foreground`. Sem ícone, sem riscado. "IA" só existe aqui, dentro de uma negação.
- **Princípio:** `Text variant="h2" render={<p/>}`, cada frase em um `<span className="block">`. É o texto mais forte da seção e a última coisa clara antes do campo escuro. Apoio em `text-base text-muted-foreground max-w-[34ch]`.
- **Sem ciano.**
- **Responsivo:** em **768**, título em cima, lista em `sm:grid-cols-2` (2 × 2, hairline no topo de cada item), princípio e apoio empilhados. Em **390**, tudo em uma coluna; os itens caem para `text-lg`.

---

## 7. Encerramento + questionário em etapas (escuro)

### 7.1 Decisão
O questionário fica **na página, não em modal**. Todos os botões "Tenho interesse em testar a fynd" / "Quero testar" rolam para `#testar`, onde a etapa 1 já está aberta. Motivos: menos um clique, sem armadilha de foco, e a pessoa vê que são só três campos para começar. O layout é o da `access-v4` (texto nas colunas 1–5, card sticky nas 7–12), **sem FAQ**.

```
┌──────────────────────────────────────────────────────────────────┐
│ PRÓXIMO SINAL                  ┌───────────────────────────────┐ │
│ Você testaria a fynd           │ ETAPA 1 DE 4                  │ │  mono
│ na sua empresa?                │ ▬▬▬▬▬▬▬ ─────── ─────── ───── │ │  4 segmentos
│                                │                               │ │
│ [lead: a fynd está em          │ Contato                       │ │  h3 (legend)
│ desenvolvimento; estamos       │ Nome              Empresa     │ │
│ conversando com empresas…]     │ [___________]     [_________] │ │
│                                │ E-mail ou WhatsApp            │ │
│ PILOTO │ 4 ETAPAS · 3 MINUTOS  │ [___________________________] │ │
│                                │                               │ │
│                                │                 ( Continuar → )│ │  default (papel)
│                                └───────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

- **Coluna esquerda:** eyebrow, `Text variant="h1" render={<h2/>}` com `max-w-[14ch]`, lead `max-w-[32rem]`. Abaixo, com `mt-6`, uma linha mono no estilo da `ZeroSetupStrip` (`align="start"`) com itens próprios; se o componente não aceitar itens, parametrize-o em `hero-parts-v5.tsx`. Texto provisório; o copy decide o que entra (não prometa duração se não for medida).
- **Card:** `rounded-2xl border border-border bg-card p-6 sm:p-8`, `lg:sticky lg:top-24`. `bg-card` no escuro é `navy-800`.

### 7.2 Etapas (perguntas e opções exatamente como no material)

| Etapa | Título | Campos | Controle |
|---|---|---|---|
| 1 | Contato | Nome · Empresa · E-mail ou WhatsApp | 3 `Input` (os dois primeiros lado a lado a partir de `sm`). **Os únicos obrigatórios** |
| 2 | Como vocês vendem hoje | Como sua empresa gera novos clientes B2B hoje? · Vocês fazem prospecção ativa? · Maior dificuldade para gerar novas oportunidades | `Textarea` (2 linhas) · grupo de opção em pílulas (Sim / Às vezes / Não) · `Textarea` (2 linhas) |
| 3 | Investimento e modelo | Quanto investe por mês (6 faixas) · Que investimento faria sentido (7 faixas) · Modelo de cobrança (5 opções) | `NativeSelect` · `NativeSelect` · lista de rádio (uma opção por linha) |
| 4 | Piloto | Maior preocupação em contratar a fynd · Participaria de um piloto? | `Textarea` (3 linhas) · grupo de opção em pílulas (Sim / Talvez / Não) |

Por que cada controle:
- **Pílulas** para 3 opções curtas: tudo à vista, um toque.
- **Select** para as faixas de valor: 6 e 7 opções ordenadas ocupariam ~200px cada como pílulas, e o seletor nativo é o melhor controle no celular.
- **Lista de rádio** para o modelo de cobrança: os rótulos são longos ("Mensalidade menor + valor por oportunidade") e precisam ser lidos e comparados; em select ficariam escondidos.

### 7.3 Anatomia e estados

**Indicador de progresso** (topo do card)
- Texto: `ETAPA 2 DE 4` em mono `text-[0.6875rem] tracking-label uppercase text-steel-300`. É texto real; o título da etapa vem logo abaixo.
- Barras: 4 segmentos em `grid grid-cols-4 gap-1.5 mt-3`, `h-1 rounded-full`, `aria-hidden`. Concluídas e atual: `bg-paper-50`. Pendentes: `bg-steel-400` (3,7:1 sobre `navy-800`). **Sem ciano.**
- Não é clicável: a navegação é só por Voltar e Continuar.

**Etapa**
- Cada etapa é um `<fieldset>` com o título na `<legend>`, em `Text variant="h3"`, `mt-6`, `tabIndex={-1}` para receber o foco.
- Nas etapas 2 a 4, uma linha sob o título: "Opcional. Responda o que puder." em `text-sm text-muted-foreground`. Assim nenhum rótulo precisa de "(opcional)".
- Campos em `flex flex-col gap-5 mt-6`.
- **Altura estável:** em `lg`, a área das etapas tem `min-h-[25rem]`, para o card não pular e o sticky não se mexer. Abaixo de `lg` a altura é livre.

**Campos** (todos dentro do `dark`, sobre `navy-800`)
- Rótulo: `FieldLabel`, `text-sm font-medium leading-snug text-paper-50`. O rótulo da pergunta de investimento tem até 3 linhas em 390; não trunque.
- `Input`, `Textarea`, `NativeSelect`: borda `border-steel-400` (a constante `FIELD_BORDER` da v4): **3,7:1 sobre o card e ~3,1:1 sobre o fundo do próprio campo**. Altura mínima de 44px (`h-11`). Texto `paper-50`; placeholder `steel-300` (5,6:1).
- `NativeSelect`: primeira opção vazia ("Selecione", provisório); seta em `steel-300`.
- **Pílulas** (`role="radiogroup"`, `<input type="radio">` nativo escondido, `<label>` visível): `flex flex-wrap gap-2`, cada uma `h-11 rounded-full border px-5 text-sm font-medium`.
  - Normal: `border-steel-400 text-paper-50`, fundo transparente.
  - Hover (ponteiro fino): `bg-paper-50/10`.
  - Selecionada: `border-paper-50 bg-paper-50 text-navy-900` + `CheckIcon size-3.5` à esquerda. A seleção é dada por inversão e por ícone, não só por cor.
  - Foco: anel do tema (`focus-visible:ring-3 ring-ring/50`).
- **Lista de rádio:** `flex flex-col gap-2`, cada linha é um `<label>` `flex min-h-12 items-center gap-3 rounded-lg border border-steel-400 px-4 text-sm`.
  - Marcador: círculo `size-4 rounded-full border border-steel-300`.
  - Selecionada: `border-paper-50 bg-paper-50/10`, e o marcador ganha um miolo `size-2 bg-paper-50`.
- A legenda de cada grupo é a pergunta (`<fieldset>` interno com `<legend>` no estilo do `FieldLabel`).

**Navegação** (rodapé do card, `mt-8 flex items-center justify-between gap-3`)
- **Voltar:** `Button variant="ghost"`, à esquerda. Não aparece na etapa 1 (o espaço fica vazio; "Continuar" não muda de lugar).
- **Continuar:** `Button variant="default" size="lg"` (papel sobre escuro), à direita, com "→".
- **Enviar interesse:** só na etapa 4, `LoadingButton variant="signal" size="lg"`. É o único ciano preenchido do site e o único da dobra.
- `Enter` em um `Input` avança (o `<form>` trata o submit como "continuar" até a última etapa). Em `Textarea`, `Enter` quebra linha.
- Ao trocar de etapa, o foco vai para a `<legend>` da etapa nova, e uma região `role="status"` (sempre montada, `sr-only`) anuncia "Etapa 2 de 4: Como vocês vendem hoje".
- Voltar nunca valida e nunca apaga o que foi preenchido.

**Erro**
- Só a etapa 1 valida: nome e empresa não vazios; contato aceito se for e-mail válido **ou** telefone com 10 dígitos ou mais.
- Ao tentar continuar com erro: o campo recebe `aria-invalid`, borda `border-destructive`, e a mensagem aparece abaixo em `text-sm text-destructive` (`#f5877e`, 5,2:1 sobre `navy-800`), ligada por `aria-describedby`. O foco vai para o primeiro campo com erro. Depois da primeira tentativa, a validação acompanha a digitação (como na v4).
- A mensagem é texto, não só cor. Sem ícone de alerta, sem tremer.
- **Falha no envio:** `role="alert"` em `text-sm text-destructive` acima da navegação; as respostas ficam onde estão e o botão volta ao normal.

**Sucesso**
- O conteúdo do card troca pelo bloco da v4: círculo `size-12` com borda e `CheckIcon` em `paper-50`, título em `h3` (recebe o foco), uma frase em `muted` e o link "Voltar ao início". Texto do copy, no tom de validação (sem prometer vaga).
- O indicador de progresso some. A altura do card é travada na altura da última etapa (`lockedHeight`, como na v4).
- **Sem ciano no sucesso**: o sinal foi o botão.

**Envio simulado**, com um único ponto de integração marcado no código (`submitValidationV5(values)`), como pede o briefing.

### 7.4 Responsivo
- **1280+:** texto em 1–5, card sticky em 7–12.
- **768:** uma coluna; card em largura total, sem sticky. Nome e Empresa lado a lado.
- **390:** card com `p-5`. Campos em uma coluna. Pílulas: as três cabem numa linha ("Às vezes" é a mais larga). Navegação: "Voltar" com largura automática e "Continuar" com `flex-1`. Ao trocar de etapa, se o topo do card estiver fora da tela, role até ele (`scrollIntoView({ block: "start" })`, com `scroll-mt-20` no card); com movimento reduzido, o salto é instantâneo.

---

## 8. Hero, header e footer (ajustes)

- **Hero:** layout, MacBook, tela, cards flutuantes, faixa de zero setup e ponto aceso iguais aos da v4.
  - Título em duas frases com ponto ("Você vende. A fynd encontra."): cada frase em um `<span className="block">`, mesmo `display`.
  - A pílula do topo troca de texto (em desenvolvimento, seleção para o piloto). Mesmo componente.
  - Botão principal com o rótulo longo: em 390 ele ocupa a largura toda e o secundário vai para baixo.
- **Header:** o da v4, com `NAV_LINKS_V5` novos e `CTA_SHORT_LABEL_V5` em todas as larguras (o rótulo longo não cabe ao lado de três links). No menu mobile, o botão do rodapé usa o rótulo longo. O CTA do header some quando a seção 8 está em vista.
- **Footer:** o da v4, com os três links e "Quero testar". Linha institucional com o título novo.

---

## 9. Motion (só as partes novas)

Padrão do `04-motion-v4`: Motion com `Reveal` / `RevealGroup` / `RevealItem`, `once`, `EASE_OUT`; estados iniciais vindos do JS e `data-reveal` visível antes da hidratação. **Nenhum pin novo, nenhum scrub novo, nenhum loop.** O único pin do site continua sendo a demo.

| Parte | Elemento | Gatilho | De → Para | Duração · easing | Movimento reduzido |
|---|---|---|---|---|---|
| **Problema** | Cabeçalho (eyebrow, título, lead) | `RevealGroup`, `amount: 0.25` | `opacity 0, y 16 → 1, 0` | 0,7 s · `EASE_OUT`, `stagger 0.08` | Visível |
| | 4 peças | `RevealGroup`, `amount: 0.3` | `opacity 0, y 12 → 1, 0` | 0,6 s · `EASE_OUT`, `stagger 0.08` | Visível |
| **3 passos** | Cards, minis, faixa do ciclo | os da v4 | iguais | iguais | iguais |
| | Frase "Você conhece seu produto…" | herda o fade da frase antiga | `opacity 0 → 1` | 0,5 s, `delay 0.75` | Visível |
| **Lista × oportunidade** | Título (2 frases) | `RevealGroup`, `amount: 0.4` | `opacity 0, y 16 → 1, 0` | 0,7 s · `EASE_OUT`, `stagger 0.12` | Visível |
| | Card "hoje" | `Reveal`, `amount: 0.3` | `opacity 0, y 16 → 1, 0` | 0,7 s · `EASE_OUT` | Visível |
| | Card da oportunidade | mesmo gatilho, `delay 0.15` | `opacity 0, y 24 → 1, 0` | 0,8 s · `EASE_OUT` | Visível |
| | Linhas do `<dl>` | dentro do card, `delayChildren 0.4` | `opacity 0, y 4 → 1, 0` | 0,45 s · `EASE_OUT`, `stagger 0.06` | Visíveis |
| | Selo "Interesse demonstrado" | depois da última linha (~1,0 s) | `sealSequence`: camada `signal` `opacity 0 → 1`, `scale 0.92 → 1`; anel `opacity 0 → 0.7 → 0`, `scale 1 → 1.35` | 0,45 s e 0,9 s, **uma vez** | Selo já aceso, sem anel |
| | `5.000` e planilha | — | **Estáticos.** Contagem só existe dentro das telas | — | — |
| **A diferença** | Cabeçalho | `RevealGroup`, `amount: 0.25` | `opacity 0, y 16 → 1, 0` | 0,7 s, `stagger 0.08` | Visível |
| | 4 camadas, de 01 a 04 | `RevealGroup`, `amount: 0.3` | `opacity 0, y 8 → 1, 0` | 0,5 s · `EASE_OUT`, `stagger 0.1` | Visíveis |
| | Ponto ciano da camada Resultado | 0,15 s depois da camada 04 | `opacity 0 → 1`, `scale 0.6 → 1`; anel de pulso do `LitDot` (`size-2`) | 0,4 s; anel 0,9 s, **uma vez** | Ponto aceso, sem anel |
| | Linha de síntese | depois das camadas | `opacity 0 → 1` | 0,5 s | Visível |
| | Contraste (2 frases + fecho) | `RevealGroup` próprio, `amount: 0.4` | `opacity 0, y 12 → 1, 0` | 0,6 s, `stagger 0.12` | Visível |
| **Não é ferramenta** | Título | `Reveal` | `opacity 0, y 16 → 1, 0` | 0,7 s | Visível |
| | 4 "Sem…" | `RevealGroup`, `amount: 0.4` | `opacity 0, y 8 → 1, 0` | 0,5 s, `stagger 0.06` | Visíveis |
| | Princípio + apoio | `Reveal`, `amount: 0.5` | `opacity 0, y 12 → 1, 0` | 0,8 s | Visível |
| **Encerramento** | Coluna de texto e card | os da `access-v4` (`RevealGroup`; card `y 24`, 0,8 s, `delay 0.15`) | iguais | iguais | iguais |
| **Questionário** | Troca de etapa | clique em Continuar / Voltar; `AnimatePresence mode="wait"` | sai: `opacity 1 → 0`, `x 0 → -8`; entra: `opacity 0 → 1`, `x 8 → 0` (sinais invertidos ao voltar) | 0,15 s `EASE_IN_OUT` + 0,25 s `EASE_OUT` | Troca seca: só `opacity`, 0,1 s, sem `x` |
| | Segmento de progresso | junto da troca | `scaleX 0 → 1` (origem à esquerda) na barra que acende; ao voltar, `1 → 0` | 0,3 s · `EASE_OUT` | Troca de cor sem transição |
| | Pílula / rádio selecionado | clique | transição CSS de `background-color` e `border-color` | 0,15 s | Sem transição |
| | Mensagem de erro | validação | `opacity 0, y -4 → 1, 0` (igual à v4) | 0,2 s · `EASE_OUT` | Aparece direto |
| | Sucesso | fim do envio | sai o form `opacity → 0, y -8`; entra o bloco `opacity 0, y 8 → 1, 0` (igual à v4) | 0,4 s · `EASE_IN_OUT` | Só `opacity` |
| **Demo** | Pin | `MQ.full` | `end: "+=" + innerHeight * 2` (era 2.4). Timeline 0–3, labels, `stepFromProgress`, snap e playbacks **iguais** | — | Empilhada, como na v4 |
| | Linha de saída | `Reveal` da v4 | igual | igual | igual |

Regras de contenção:
- O foco muda **depois** que a etapa nova monta (no `onExitComplete` / ref da legenda), nunca no meio da troca.
- Nada anima no card "hoje": a planilha não rola, não pisca e não se preenche.
- As camadas não "sobem" nem se empilham com mola; entram na ordem de leitura e ficam.
- O ponto ciano e o selo são os dois únicos elementos novos com escala, e os dois tocam uma vez.

**Sai do motion da v4:** o scrub por palavra do título do problema (`SplitText`), os pares com `x -6`, o check com `pathLength`, a seta do fecho, e os fades de "Você só precisa vender" e "Para quem".

---

## 10. O que se reaproveita e o que sai

**Sem mudar:** `Backdrop`, `LightPath`, `LitDot`, `ZeroSetupStrip` (só ganha itens parametrizáveis), MacBook e a entrada da tampa, cards flutuantes, `PlatformDemoV5` e as três telas, shell, painéis mobile, `InterestSeal` + `sealSequence`, os três minis, a trilha do ciclo, `SiteContainer`, `siteGrid`, `sectionYV5`, `headToBodyV5`, o cabeçalho dividido, o padrão de validação e de sucesso do formulário da v4, `FIELD_BORDER`.

**Sai (apague, sem deixar código morto):**
- `problem-v5.tsx` atual: pares "hoje × com a fynd", painel claro, X em `destructive`, check desenhado, frase "lead frio × lead quente". O arquivo é reescrito com as 4 peças.
- `only-sell-v5.tsx`: negações, lista riscada, linha "25 mi+".
- `audience-v5.tsx`: "Para quem" e os chips de público.
- FAQ e o `Accordion` em `access-v5.tsx`.
- `access-form-v5.tsx`: dá lugar a `validation-form-v5.tsx`.
- Link "Ver na prática ↓" e a frase "A complexidade fica com a fynd."
- Rótulos "Garantir minha vaga" e "Acesso antecipado"; âncora `para-quem`.

---

## 11. Checklist de consistência v5 (além do checklist da v4)

**Comprimento**
- [ ] `scrollHeight` em 1440×900 ≤ ~10.000. Se passar, cortes de §0.1 na ordem.
- [ ] Seção 4 com `pb-0`; abertura da demo com `lg:pt-24`; seção 7 com `sectionYCompactV5`.
- [ ] Pin com `innerHeight * 2`.

**Cor**
- [ ] Ciano só em: ponto do hero, selos (tela do hero, mini 3, card de oportunidade, etapa 3 da demo), badge e ponto das etapas 1 e 2 da demo, ponto da camada Resultado, botão "Enviar interesse". Um por dobra.
- [ ] Nenhum eyebrow, linha de acento, barra ou borda em ciano. Nada do visual do HTML da cliente.
- [ ] `destructive` só em mensagem e borda de erro do questionário.
- [ ] Progresso, pílulas, rádios e "Continuar" sem ciano.
- [ ] Nenhum hex novo nas seções; só tokens e opacidades de tokens.

**Contraste**
- [ ] Bordas de campos, pílulas e rádios em `steel-400` sobre `navy-800` (≥ 3:1). Segmentos pendentes do progresso também.
- [ ] Texto de erro `destructive` do tema escuro (5,2:1). Placeholder `steel-300`.
- [ ] `steel-300` para texto de apoio no escuro; `steel-500` no claro. Nenhum texto em `steel-400`.

**Conteúdo**
- [ ] Card de oportunidade com dados de `ACTIVE_V5`, sem aderência, sem % e sem botões.
- [ ] `SHOW_EXAMPLES = false`. Com a flag desligada, nenhum nome de terceiro no HTML renderizado.
- [ ] "fynd" nunca em `uppercase` por CSS: passos com índice numérico, camada Resultado com o wordmark, legenda do ciclo em caixa normal.
- [ ] "IA" só em "Sem configurar IA". Sem taxa, sem % e sem preço fora do questionário.
- [ ] Perguntas e opções do questionário idênticas às do material; só nome, empresa e contato são obrigatórios.

**Acessibilidade**
- [ ] Peças do problema em `<ol>`; camadas em `<ol>`; card de oportunidade com `<dl>`; planilha `aria-hidden`.
- [ ] Cada etapa em `<fieldset>` com `<legend>`; grupos de opção com rádio nativo; foco na legenda ao trocar; `role="status"` anunciando a etapa; erro ligado por `aria-describedby`.
- [ ] Alvos de toque de 44px nos campos, pílulas, rádios e botões do questionário.
- [ ] Com movimento reduzido: tudo visível, selo e ponto acesos, troca de etapa sem deslocamento.

**Arquivos**
- [ ] Só `-v5` e `src/app/v5/`. Novos: `opportunity-v5.tsx`, `difference-v5.tsx`, `not-a-tool-v5.tsx`, `validation-form-v5.tsx`. Apagados: `only-sell-v5.tsx`, `audience-v5.tsx`, `access-form-v5.tsx`. Nada de `-v4` é tocado.

---

## Resumo das decisões
1. **Mesma alternância de tema da v4**, com a seção "lista × oportunidade" no escuro, emendada na demo: tese e prova no mesmo campo.
2. **Camadas e "a diferença" viram uma seção só**, em duas colunas: o mapa à esquerda, a conclusão à direita.
3. **O problema são quatro colunas de texto sob hairline**, sem cards e sem ícones. O X vermelho sai do site.
4. **O card de oportunidade é a única superfície clara do campo escuro** e leva o selo ciano. O card "hoje" é uma planilha apagada e estática.
5. **A camada Resultado é a única faixa escura da seção clara**, com o wordmark e um ponto ciano de 8px. Os exemplos de terceiros têm lugar reservado, desligado por flag.
6. **O questionário fica na página**, em 4 etapas, com progresso em barras neutras, pílulas para 3 opções, select para faixas e lista de rádio para o modelo de cobrança. Ciano só no envio.
7. **A altura fecha em ~9.940px** com o pin em 200vh de rolagem, a abertura e a saída da demo menores e a seção 7 compacta. A ordem de cortes está em §0.1.
8. **Motion só de entrada**, uma vez. Dois elementos novos com escala (selo e ponto). Nenhum pin novo.
