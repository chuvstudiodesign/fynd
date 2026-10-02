# 02 — Copy do site da fynd · v3 (reposicionamento)

_Etapa 2 da v3 · agente `site-copy` · 2026-10-01_
_Base: `docs/reunioes/2026-09-29-lucas-mariana-marca.md`, `docs/site/v3/00-briefing-v3.md`, a atualização de 29/09 no topo de `BRAND_FOUNDATION_FYND.md`, `docs/site/02-copy.md` (v2) e o código renderizado em `src/components/site/sections/*` e `src/components/site/platform/*`._

**O que muda numa frase:** a v2 vendia "saiba para quem vender". A v3 vende o que a Mariana chamou de diferencial: **você diz o que vende, a fynd encontra quem tem interesse e faz o primeiro contato, e você fecha.**

Público: o dono ou sócio de PME B2B que quer abrir (ou destravar) um canal de prospecção ativa sem montar estrutura, e o líder comercial que quer o time em conversas que já começaram. Tudo marcado `[validar]` é placeholder e não vai ao ar sem confirmação.

**Regras usadas em todo o documento**
- Assinatura sempre `fynd`, em minúsculas, inclusive no início de frase. `fynd` **nunca** entra em eyebrow, badge `label` ou qualquer texto com `uppercase` por CSS (viraria "FYND"). Por isso nenhum rótulo mono abaixo contém a palavra.
- **A fynd faz o primeiro contato.** O texto do site não nomeia o canal (e-mail, WhatsApp, telefone, LinkedIn) e não diz se o contato é humano, automatizado ou misto. Use sempre "a fynd faz o primeiro contato", "a fynd aborda", "a fynd entra em contato".
- **A decisão e o fechamento são do cliente.** Nada de "faz tudo por você". A fynd entrega o interessado; o cliente assume a conversa e fecha.
- **Não é mailing nem lista fria.** O que o cliente recebe são empresas que demonstraram interesse.
- **Números só dentro das telas de demonstração** (148, 60, 21, 12, porcentagens de fit). No texto do site: zero taxa, zero promessa, zero "X% de resposta".
- Proibido: "IA" como argumento, "automação", "revolucionário", "mágica", "leads garantidos", "IA que faz tudo", urgência falsa. Evitamos também "lead" no texto do site (é jargão; a Mariana usa, o cliente PME nem sempre). Em vez de "priorizar", usamos "encontrar quem tem interesse".
- Vocabulário da Mariana mantido onde funciona: "o que você vende", "fit", "primeiro contato", "interessados", "você fecha", "a gente encontra".
- Ciano: o copy não descreve cor. Indicação para o dev: o ciano marca **"Demonstrou interesse"** dentro da tela e o **único ponto aceso** na grade do fundo do hero. No máximo um ciano por dobra.

---

## Universo fictício do produto (coerente entre todas as telas e o hero)

Mantido da v2: nomes inventados, CNPJs começando com `00.`.

**Quem usa a fynd (a conta logada)**
- Usuária: **Camila Rocha**, **Sócia-diretora** _(na v2 era "Diretora comercial"; mudou para refletir a PME em que a dona atende os interessados)_
- Empresa: **Lumi Embalagens**, que fabrica embalagens flexíveis (pouches, sachês e filmes) para alimentos e cosméticos

**Busca ativa:** `Embalagens flexíveis` _(substitui o "perfil ideal Indústria Sudeste": o cliente não cria perfil, ele cria uma busca a partir do que vende)_
- Critérios **inferidos pela fynd** a partir do que a Camila vende: indústrias de alimentos e cosméticos · SP, MG, RJ e ES · 200 a 500 pessoas · sinal: filial aberta nos últimos 12 meses

**Funil da demonstração (os mesmos números em todas as telas, cards e mini-UIs)**

| Etapa | Número | Onde aparece |
|---|---|---|
| Empresas com fit | **148** | tela 1 (resultado), tela 2, card 2 do hero, sidebar |
| Contatadas na rodada 1 | **60** | tela 1 (resultado), tela 3, card 3 do hero |
| Responderam | **21** | tela 3, card 3 do hero |
| Interessadas | **12** | tela 3, tela 4, card 4 do hero, sidebar |
| Sem interesse agora | **9** (21 − 12) | tela 3 |
| Aguardando resposta | **39** (60 − 21) | tela 3 |
| Na fila para a próxima rodada | **88** (148 − 60) | tela 3 |

**As empresas**

| Empresa | Contexto (`meta`) | Fit | Status no primeiro contato |
|---|---|---|---|
| **Serra Azul Alimentos** _(ativa)_ | Alimentos · Jundiaí, SP · 320 pessoas | 92% | **Interessada** · pediu amostras |
| Bem Natural Cosméticos | Cosméticos · Contagem, MG · 410 pessoas | 84% | **Interessada** · pediu proposta |
| Laticínios Vale Verde | Alimentos · Juiz de Fora, MG · 260 pessoas | 77% | Respondeu · sem interesse agora |
| Casa Doce Biscoitos | Alimentos · Vila Velha, ES · 230 pessoas | 71% | **Interessada** · conversa em novembro |
| Prisma Higiene Pessoal | Cosméticos · Campinas, SP · 480 pessoas | 64% | Aguardando resposta |
| Grão Fino Cafés | Alimentos · Varginha, MG · 210 pessoas | 58% | **Interessada** · perguntou pedido mínimo |
| Nativa Snacks _(nova)_ | Alimentos · Sorocaba, SP · 280 pessoas | 56% | **Interessada** · quer conversar |
| Aroma da Serra Cosméticos _(nova)_ | Cosméticos · Petrópolis, RJ · 240 pessoas | 53% | **Interessada** · pediu catálogo |

As seis primeiras são as da v2 (mesma ordem de fit). As duas novas têm fit mais baixo de propósito: mostram que **interesse não é a mesma coisa que fit**, e por isso o primeiro contato importa. A Laticínios Vale Verde respondeu sem interesse: deixa a demo honesta (nem todo mundo quer).

**O que conta como "demonstrou interesse" no exemplo:** a empresa respondeu pedindo amostra, proposta, catálogo, preço ou uma conversa. `[validar o critério real com a Mariana e o Eduardo]`

---

## SEO e compartilhamento

A rota `/v3` é `noindex`. Os metadados abaixo valem para quando a v3 virar a página principal.

- **`title`:** `fynd · Você vende, a gente encontra`
- **`description` (cerca de 150 caracteres):** `Diga o que a sua empresa vende. A fynd encontra empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse. Você fecha.`
- **`og:title`:** `fynd · Você vende, a gente encontra`
- **`og:description`:** `Não é mailing nem lista fria. A fynd faz o primeiro contato e entrega empresas interessadas no que você vende, com o contexto de cada uma. Quem fecha é você.`
- **Texto da imagem OG (1200×630):** título "Você vende, a gente encontra." e, embaixo, um recorte da tela 4 com o card da Serra Azul Alimentos e o selo "Demonstrou interesse". Wordmark `fynd` no canto. _(Na v2 o OG trazia "Saiba para quem vender agora." e "Menos lista fria. Mais clareza para vender.")_
- **`og:site_name`:** `fynd`
- **`lang`:** `pt-BR`

---

## 0. Header

Igual à v2 (`header-v2.tsx`), sem mudança de texto.

- **Wordmark:** `fynd`, `aria-label` "fynd, voltar ao início"
- **Âncoras:** Como funciona · Dados · Para quem
- **Botão:** Pedir acesso antecipado
- **Mobile:** "Abrir menu" / "Fechar menu"
- **Pular para o conteúdo**

---

## 1. Hero (visual da v2, copy novo)

### Título: 3 opções

O display da v2 usa `max-w-[14ch]` em `5.25rem`. Para caber em 2 linhas, cada opção indica a quebra e a largura necessária.

| | Título | Quebra em 2 linhas | Leitura |
|---|---|---|---|
| **Recomendado** | **Você vende, a gente encontra.** | "Você vende, / a gente encontra." Pede `max-w-[17ch]` (a 2ª linha tem 17 caracteres). | São as palavras da Mariana, quase literais. Divide o trabalho em duas metades: a sua (vender) e a nossa (encontrar). É curto, humano ("a gente") e não promete volume. O subtítulo completa a frase-mãe com "quem tem interesse" e "você fecha". |
| Alternativa 1 | Diga o que vende. Receba interessados. | "Diga o que vende. / Receba interessados." Pede `max-w-[20ch]`. | É a mais literal sobre o produto: entrada (o que você vende) e entrega (interessados). Perde o calor da frase da Mariana e fica mais "instrução" do que promessa. |
| Alternativa 2 | Empresas interessadas, não listas frias. | "Empresas interessadas, / não listas frias." Pede `max-w-[22ch]`, ou cai para `4.5rem`. | Tem o contraste mais forte contra o mailing. Começa pela entrega, mas define a fynd pelo que ela não é. Funciona melhor como frase de transição da seção 2. |

### Copy do hero (recomendado)

- **Pill de status:** ● Acesso antecipado aberto | Pedir convite → _(igual à v2; o ponto ciano do pill continua)_
- **Título (h1):** Você vende, a gente encontra.
- **Subtítulo (lead):** Diga o que a sua empresa vende. A fynd encontra as empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse. Você assume a conversa e fecha.
- **CTA principal:** Pedir acesso antecipado
- **CTA secundário:** Ver como funciona ↓
- **Microlinha sob os botões (opcional):** Sem formulário de cliente ideal. Você começa contando o que vende.
- **Faixa de provas (mono, caixa alta por CSS; nenhuma contém "fynd"):**
  - CNPJs da Receita Federal _(ícone prédio)_
  - Primeiro contato incluído _(ícone mensagem/seta)_
  - Só chegam interessados _(ícone check)_
  - A decisão é sua _(ícone mão/usuário)_ _(4º item opcional; se a faixa quebrar em 2 linhas no mobile, sai este)_
- **MacBook:** **tela 4 (Interessados)**, com a Serra Azul Alimentos ativa.
- **`aria-label` do mockup:** "Tela de interessados da fynd: 12 empresas que demonstraram interesse no primeiro contato, com a Serra Azul Alimentos no topo pedindo amostras."
- **Fundo (nota para o dev):** na grade de pontos, **um único ponto aceso** (ciano, pulso suave) é "o ponto no meio de todos os pontos" da Mariana. Sem texto, sem legenda.

### Cards flutuantes (contam o funil, em ordem de leitura)

Decorativos (`aria-hidden`), só em `lg+`. Nenhum texto ciano; o destaque do card 4 é `paper-50`, como a barra de pico da v2.

| # | Posição sugerida | Rótulo mono | Conteúdo |
|---|---|---|---|
| 1 | esquerda, alto | `VOCÊ VENDE` | Chips: "Embalagens flexíveis" · "Alimentos" · "Cosméticos" |
| 2 | direita, alto | `FIT` | Número grande **148** · linha: "empresas com fit encontradas" |
| 3 | esquerda, baixo | `PRIMEIRO CONTATO` | Duas linhas com barra: "60 contatadas" · "21 responderam" |
| 4 | direita, baixo (o mais próximo da tela) | `INTERESSADOS` | Ícone check em círculo · **12 interessadas** · linha: "Serra Azul Alimentos pediu amostras." |

_Se forem só 3 cards (para não poluir), saia o card 3: o funil continua legível (vende → fit → interessados) e a tela mostra o resto._

---

## 2. O problema

- **Eyebrow:** `O DIA A DIA DE QUEM VENDE` _(igual)_
- **Título (revelado por palavra no scroll):** Mais lista não resolve. Interesse resolve.
- **Subtítulo:** Encontrar empresas com perfil é metade do trabalho. A outra metade é descobrir quem quer conversar, e é aí que a prospecção trava.

**3 dores em colunas**

1. **Mailing comprado, contato frio**
   Você compra uma lista, liga para metade dela e descobre que a empresa mudou, fechou ou nunca teve perfil. Quem atende não estava esperando você.
2. **Sem estrutura para prospectar**
   Abrir um canal de prospecção ativa pede contratar, treinar e montar um processo. Numa empresa pequena, isso trava antes de começar.
3. **Formulário que ninguém sabe responder**
   Setor, porte, cargo, persona, dor. Pedem que você descreva o seu cliente ideal antes de mostrar qualquer resultado, e quase ninguém sabe isso de cabeça.

- **Frase de transição (fim da seção, junto do contraste "lista cinza → uma linha iluminada"):** Menos lista fria. Mais empresas interessadas.
- **CTA:** nenhum.

---

## 3. Como funciona (3 passos que espelham a frase-mãe)

- **Eyebrow:** `COMO FUNCIONA`
- **Título:** Você conta, a fynd encontra, você fecha.
- **Subtítulo:** Sem formulário de cliente ideal e sem lista para trabalhar. Você entra quando a empresa já demonstrou interesse.

| Passo | Rótulo mono | Título | Texto | Mini-UI |
|---|---|---|---|---|
| 1 | `01 · VOCÊ CONTA` | **Você conta o que vende** | Explique o seu produto do seu jeito, como explicaria para um cliente. A fynd entende para quem ele faz sentido. Você não precisa saber descrever o seu cliente ideal. | M1 |
| 2 | `02 · A GENTE ENCONTRA` | **A fynd encontra e faz o primeiro contato** | A fynd cruza o que você vende com bases empresariais, encontra as empresas com fit e faz o primeiro contato para descobrir quem tem interesse. | M2 |
| 3 | `03 · VOCÊ FECHA` | **Você recebe os interessados e fecha** | Só chegam as empresas que demonstraram interesse, com a resposta e o contexto de cada uma. Você assume a conversa e decide o próximo passo. | M3 |

- **CTA secundário discreto:** Ver na prática ↓
- **Ciano nesta dobra:** só o selo "Demonstrou interesse" da M3.

### Mini-recortes (versões curtas das telas)

- **M1 (Você conta):** balão da Camila, versão curta: "Vendo embalagens flexíveis para alimentos e cosméticos." Abaixo, a resposta da fynd em uma linha: "Entendi. Vou buscar indústrias com fit:" e os chips "Alimentos" · "Cosméticos" · "Sudeste".
- **M2 (A gente encontra):** mini-funil de três barras horizontais, neutras:
  - Empresas com fit · **148**
  - Contatadas · **60**
  - Interessadas · **12**
- **M3 (Você fecha):** um card da Serra Azul Alimentos (Jundiaí, SP), selo **Demonstrou interesse** (ciano), trecho: "Conseguem enviar amostras de pouch para biscoito?" e o botão "Assumir conversa". _(Nome truncando no card de 1/3: use `meta` curto, só "Jundiaí, SP".)_

---

## 4. Demonstração guiada (pin de scroll, 4 etapas)

- **Eyebrow:** `NA PRÁTICA`
- **Título da seção (antes do pin):** Do que você vende aos interessados.
- **Subtítulo:** Acompanhe a Camila, da Lumi Embalagens, desde a primeira mensagem até as empresas que querem conversar com ela.
- **Indicador de progresso:** `1 Conversa · 2 Fit · 3 Primeiro contato · 4 Interessados`, com `aria-label` "Etapa X de 4"

| Etapa | Rótulo mono | Título lateral | Texto lateral | Tela |
|---|---|---|---|---|
| 1 | `01 / 04 · CONVERSA` | Comece pelo que você vende | Conte o seu produto do seu jeito. A fynd entende para quem ele faz sentido e mostra os critérios que vai usar. Se quiser, você ajusta. | 1 |
| 2 | `02 / 04 · FIT` | As empresas que fazem sentido | A fynd cruza o que você vende com bases empresariais e encontra as empresas com fit. É o ponto de partida, não a entrega. | 2 |
| 3 | `03 / 04 · PRIMEIRO CONTATO` | A fynd faz o primeiro contato | A fynd aborda as empresas com fit e acompanha cada resposta. Você vê o andamento sem montar uma operação para isso. | 3 |
| 4 | `04 / 04 · INTERESSADOS` | Só chega quem demonstrou interesse | Cada empresa vem com a resposta, o contexto e o próximo passo. A partir daqui, a conversa é sua: você assume, agenda e fecha. | 4 |

- **Ao soltar o pin:**
  - Linha: Pronto para ver isso com o que você vende?
  - **CTA principal:** Pedir acesso antecipado
- **Mobile (blocos empilhados):** os mesmos títulos e textos, na mesma ordem.

**`aria-label` das telas por etapa**
- 1: "Tela de conversa da fynd: a Camila conta o que a Lumi Embalagens vende e a fynd propõe os critérios de setor, região, porte e sinal."
- 2: "Tela de empresas com fit da fynd: 148 empresas encontradas para a busca Embalagens flexíveis, com a Serra Azul Alimentos no topo, com 92% de fit."
- 3: "Tela de primeiro contato da fynd: 60 empresas contatadas, 21 responderam e 12 demonstraram interesse, com a linha do tempo da Serra Azul Alimentos."
- 4: "Tela de interessados da fynd: 12 empresas que demonstraram interesse, com o trecho da resposta, o contexto e as ações para assumir a conversa."

---

## Telas da plataforma (textos dentro do MacBook)

### Elementos comuns (app shell v3)

- **Sidebar, topo:** wordmark `fynd`
- **Grupo "Produto":**
  - Visão geral
  - Interessados `12` _(ativo nas telas 4 e no hero)_
  - Primeiro contato `60` _(ativo na tela 3)_
  - Empresas com fit `148` _(ativo na tela 2)_
  - _(Sai "Oportunidades", "Conversas" e "Listas salvas" da v2. "Listas" contradiz "não é mailing".)_
- **Grupo "Buscas"** _(substitui "Perfis ideais")_:
  - Embalagens flexíveis _(ativa)_
  - Sachês para food service
  - Filmes para cosméticos
  - Ação do grupo: "Nova busca"
- **Rodapé da sidebar:** Camila Rocha · Sócia-diretora
- **Busca no topo (placeholder):** Buscar empresa ou CNPJ
- **Ícone de notificações (`sr-only`):** Notificações

### Tela 1: Conversa ("o que você vende")

- **Cabeçalho da conversa:** Nova busca
- **Mensagem da Camila (digitando):**
  > A gente fabrica embalagens flexíveis para alimentos e cosméticos: pouches, sachês e filmes. Hoje atendemos mais o Sudeste.
- **Resposta da fynd:**
  > Entendi. Pelo que você vende, estas empresas costumam ter fit:
- **Chips de critérios inferidos (rótulo: valor):**
  - Setor: Indústrias de alimentos e cosméticos
  - Região: SP, MG, RJ, ES
  - Porte: 200 a 500 pessoas
  - Sinal: Filial aberta nos últimos 12 meses
- **Continuação da fynd:**
  > Empresas em expansão costumam precisar de mais embalagem. Quer ajustar algo antes de eu buscar e fazer o primeiro contato?
- **Botões:** Buscar e fazer contato (principal) · Ajustar critérios
- **Mensagem de resultado (depois do clique, ponte para a tela 2):**
  > Encontrei 148 empresas com fit. Vou começar o primeiro contato por 60 delas e te aviso quando alguém demonstrar interesse. Salvei como "Embalagens flexíveis".
- **Campo de entrada (placeholder):** Conte o que a sua empresa vende…
- **Nota sob o campo:** Não precisa saber o seu cliente ideal. A fynd sugere, você ajusta.
- _Nota:_ a Camila não descreve ICP. Ela fala do produto e menciona onde atende hoje, como qualquer dono falaria. Quem propõe porte e sinal é a fynd.

### Tela 2: Empresas com fit (o cruzamento, não a entrega)

- **Breadcrumb:** Buscas / Embalagens flexíveis
- **Título:** Empresas com fit
- **Linha de apoio:** 148 empresas encontradas · Receita Federal e base fynd
- **Chips de critério (somente leitura):** Alimentos e cosméticos · Sudeste · 200 a 500 pessoas · Filial recente
- **Ordenação:** Ordenar por: Fit
- **Faixa informativa no topo da lista (neutra, sem ciano):** Ponto de partida. A fynd faz o primeiro contato com estas empresas e só te entrega quem demonstrar interesse.
- **Lista (6 primeiras, coluna "Fit"):** Serra Azul Alimentos 92% _(ativa)_ · Bem Natural Cosméticos 84% · Laticínios Vale Verde 77% · Casa Doce Biscoitos 71% · Prisma Higiene Pessoal 64% · Grão Fino Cafés 58% _(mesmo `meta` da tabela do universo)_
- **Sobre a lista, linha discreta:** Ordenado pelo fit com o que você vende
- **Botão secundário no topo:** Ajustar busca
- **Rodapé da lista:** Ver as 148 empresas
- _Animação:_ igual à v2 (a lista começa fora de ordem, 71, 92, 58, 84, 64, 77, e se reordena).

### Tela 3 (nova): Primeiro contato

- **Breadcrumb:** Buscas / Embalagens flexíveis
- **Título:** Primeiro contato
- **Linha de apoio:** Rodada 1 · 60 empresas · iniciada há 9 dias
- **Funil (3 blocos lado a lado, número grande + rótulo):**
  - **60** · Contatadas
  - **21** · Responderam
  - **12** · Interessadas _(este bloco leva o destaque; o ciano fica no selo "Interessada" da lista, não no número)_
- **Linha sob o funil (mono pequena):** 39 aguardando resposta · 9 sem interesse agora · 88 na fila da próxima rodada
- **Filtros (abas):** Todas · Interessadas · Aguardando · Sem interesse
- **Lista de andamento (empresa · status · última atividade):**

| Empresa | Status | Última atividade |
|---|---|---|
| **Serra Azul Alimentos** _(ativa)_ | Interessada | Respondeu há 2 dias |
| Bem Natural Cosméticos | Interessada | Respondeu há 3 dias |
| Laticínios Vale Verde | Sem interesse agora | Respondeu há 4 dias |
| Casa Doce Biscoitos | Interessada | Respondeu há 4 dias |
| Prisma Higiene Pessoal | Aguardando | 2 contatos · último há 3 dias |
| Grão Fino Cafés | Interessada | Respondeu há 5 dias |

- **Painel lateral: linha do tempo da Serra Azul Alimentos** (de cima para baixo, mais antigo primeiro)
  - **há 9 dias** · Primeiro contato feito
  - **há 5 dias** · Novo contato
  - **há 2 dias** · Resposta recebida: "Temos interesse. Conseguem enviar amostras?"
  - **há 2 dias** · Demonstrou interesse · enviada para Interessados
- **Rodapé do painel:** Ver resposta completa →
- **Nota fixa no rodapé da tela (neutra):** Quando uma empresa demonstra interesse, ela vai para você. A conversa a partir daí é sua.
- _Notas:_ "Primeiro contato feito" e "Novo contato" não citam canal nem quem fez. Se o canal for confirmado, entra um ícone discreto ao lado `[validar canal]`. A Laticínios Vale Verde mostra que nem todo mundo responde com interesse, e é isso que dá credibilidade à tela 4.

### Tela 4 (nova): Interessados (a entrega; também é a tela do hero)

- **Breadcrumb:** Buscas / Embalagens flexíveis
- **Título:** Interessados
- **Linha de apoio:** 12 empresas demonstraram interesse · Rodada 1
- **Ordenação:** Ordenar por: Mais recentes
- **Cards de interessados** (empresa · contexto · selo · trecho da resposta · próximo passo sugerido · ações). O selo **Demonstrou interesse** é ciano **só no card ativo** (Serra Azul); nos demais, o mesmo selo em neutro.

1. **Serra Azul Alimentos** _(ativo)_
   - Alimentos · Jundiaí, SP · 320 pessoas · Fit 92%
   - Selo: **Demonstrou interesse** · respondeu há 2 dias
   - Resposta: "Temos interesse. Estamos abastecendo a nova unidade de Uberlândia. Conseguem enviar amostras de pouch para biscoito?"
   - Contexto: Filial nova em Uberlândia, MG (março de 2026)
   - Próximo passo sugerido: Enviar amostras e marcar uma conversa
2. **Bem Natural Cosméticos**
   - Cosméticos · Contagem, MG · 410 pessoas · Fit 84%
   - Selo: Demonstrou interesse · respondeu há 3 dias
   - Resposta: "Vamos lançar uma linha nova no segundo semestre. Podem mandar uma proposta para sachês de 10 ml?"
   - Contexto: Novo CNAE de cosméticos para cabelo em 2026
   - Próximo passo sugerido: Enviar proposta
3. **Casa Doce Biscoitos**
   - Alimentos · Vila Velha, ES · 230 pessoas · Fit 71%
   - Selo: Demonstrou interesse · respondeu há 4 dias
   - Resposta: "Nosso contrato atual vence em janeiro. Topamos conversar em novembro."
   - Contexto: Fornecedor atual até janeiro
   - Próximo passo sugerido: Agendar conversa para novembro
4. **Grão Fino Cafés**
   - Alimentos · Varginha, MG · 210 pessoas · Fit 58%
   - Selo: Demonstrou interesse · respondeu há 5 dias
   - Resposta: "Usamos embalagem com válvula para café em grão. Qual é o pedido mínimo de vocês?"
   - Contexto: Abriu filial em Belo Horizonte, MG, em 2025
   - Próximo passo sugerido: Responder sobre pedido mínimo
5. **Nativa Snacks**
   - Alimentos · Sorocaba, SP · 280 pessoas · Fit 56%
   - Selo: Demonstrou interesse · respondeu há 5 dias
   - Resposta: "Queremos entender preço e prazo. Dá para conversar na quinta à tarde?"
   - Contexto: Ampliou a fábrica em 2026
   - Próximo passo sugerido: Confirmar a conversa de quinta
6. **Aroma da Serra Cosméticos** _(visível só se couber; senão o rodapé cobre)_
   - Cosméticos · Petrópolis, RJ · 240 pessoas · Fit 53%
   - Selo: Demonstrou interesse · respondeu há 6 dias
   - Resposta: "Estamos cotando embalagem para a linha de refil. Me mandem um catálogo."
   - Contexto: Linha de refil lançada em 2026
   - Próximo passo sugerido: Enviar catálogo

- **Ações em cada card:** Assumir conversa (principal) · Agendar reunião (secundário) · menu "⋯" com "Marcar como sem fit"
- **Painel de detalhe do card ativo (se a tela tiver drawer):**
  - Cabeçalho: avatar "SA" · Serra Azul Alimentos · Jundiaí, SP
  - **Quem respondeu:** Coordenação de compras _(sem nome de pessoa; ver nota)_
  - **Resposta completa:**
    > Olá! Temos interesse, sim. Estamos abastecendo a nova unidade de Uberlândia e precisamos de embalagem para a linha de biscoitos. Conseguem enviar amostras de pouch? Depois podemos marcar uma conversa.
  - **Por que tem fit:** ✓ Indústria de alimentos (CNAE 10) · ✓ Sede no Sudeste (SP) · ✓ Faixa de 200 a 500 pessoas · ✓ Nova filial em Uberlândia, MG, em 2026
  - **Linha do tempo:** Primeiro contato há 9 dias · Novo contato há 5 dias · Respondeu há 2 dias
  - **Fonte (mono pequena, sem uppercase):** `Fontes: Receita Federal (CNPJ, CNAE, situação, filiais) · Base fynd (faixa de funcionários)`
  - **Botões:** Assumir conversa (principal) · Agendar reunião
- **Rodapé da lista:** Ver os 12 interessados
- **Nota fixa no rodapé da tela:** A partir daqui, a conversa é sua. Você decide o próximo passo.
- **Toast ao clicar "Assumir conversa":** Conversa com a Serra Azul Alimentos agora é sua.
- _Notas:_ as respostas são de demonstração, curtas e no tom de quem compra (comprador de PME/indústria média). Nenhum nome de pessoa real ou fictício para o contato: "Coordenação de compras" basta, como o "[nome]" da v2. Os "Contexto" de Bem Natural, Grão Fino, Nativa e Aroma da Serra são sinais de cadastro (CNAE, filial, ampliação) e seguem a mesma regra da v2 `[validar se a base própria oferece "ampliou a fábrica" e "linha lançada"; se não, trocar por filial/CNAE]`.

---

## 5. De onde vêm os dados

- **Eyebrow:** `DADOS`
- **Título:** Não é mailing. Só chega quem tem interesse.
- **Subtítulo:** As bases servem para encontrar as empresas com fit. O primeiro contato serve para descobrir quem quer conversar. Você recebe só o segundo grupo.

**Blocos**
1. **CNPJs da Receita Federal, organizados**
   Os dados cadastrais oficiais (CNAE, porte, situação, endereço e filiais) chegam limpos e prontos para cruzar com o que você vende. _(igual à v2, com o final ajustado)_
2. **Base própria de contas corporativas**
   Informações que complementam o cadastro público e ajudam a entender o porte e o momento de cada empresa. `[validar o que a base contém]`
3. **Fit que você consegue explicar**
   Cada empresa interessada mostra por que tem fit e de onde veio cada dado. Você entra na conversa sabendo com quem está falando.

- **Linha sobre uso responsável:** Trabalhamos com dados empresariais e seguimos a LGPD no tratamento das informações. `[validar redação com jurídico, agora também sobre o primeiro contato]`
- **Rótulos do diagrama:** O que você vende + Receita Federal + Base fynd → Empresas com fit → Primeiro contato → Interessados
- **Card de saída do diagrama:** título "Interessados", etiqueta "Embalagens flexíveis", linhas: Serra Azul Alimentos (Alimentos · Jundiaí, SP) · Bem Natural Cosméticos (Cosméticos · Contagem, MG) · Casa Doce Biscoitos (Alimentos · Vila Velha, ES). _(Na v2 eram "Lista priorizada" e Laticínios Vale Verde; a Vale Verde sai porque respondeu sem interesse.)_
- **Números de escala:** só se validados `[validar]`. Sem número confirmado, o bloco sai sem contador.

---

## 6. Para quem

- **Eyebrow:** `PARA QUEM`
- **Título:** Para vender mais sem montar estrutura.
- **Subtítulo:** Para PMEs B2B que querem abrir um canal de prospecção ativa, ou destravar o que já têm.

**Coluna 1** · badge `Quem vende sozinho`
- **Título:** Teste sem contratar ninguém.
- **Texto:** Comece com poucos contatos e veja quem responde. Os interessados chegam para você, e você mesmo pode atender. Não precisa de um time de prospecção para começar.
- **Itens:**
  - Você começa contando o que vende
  - Começa pequeno e cresce no seu ritmo
  - Atende só quem demonstrou interesse

**Coluna 2** · badge `Quem lidera um time`
- **Título:** Seu time nas conversas que já começaram.
- **Texto:** A fynd faz o primeiro contato e o seu time recebe empresas que demonstraram interesse, com a resposta e o contexto. Menos tempo em contato frio, mais tempo para fechar.
- **Itens:**
  - Interessados com resposta e contexto
  - Cada vendedor assume a conversa certa
  - Um canal ativo sem montar uma operação de prospecção

**3 garantias (faixa abaixo das colunas)**
1. **Sem formulário de cliente ideal.** Você diz o que vende.
2. **Sem lista para trabalhar.** A fynd faz o primeiro contato.
3. **A decisão é sua.** Você assume a conversa e fecha.

**Bloco de experiência (só se confirmado)** `[validar: uso de "40 anos", o nome da empresa e se a Mariana aparece]`
- **Título:** Feita por quem vive prospecção.
- **Texto:** A fynd une [40 anos] de experiência em vendas B2B, de [nome da empresa], a uma ferramenta simples, que entrega o que importa: empresas com interesse.
- **Se não for confirmado, o bloco sai.**

- **Depoimento:** só com cliente piloto real e autorização. Se não houver, o bloco sai.
- **Link secundário:** Quero ver com o que eu vendo → _(âncora para a seção 7)_

---

## 7. CTA final + formulário

- **Eyebrow:** `ACESSO ANTECIPADO`
- **Título (recomendado):** Diga o que você vende.
  - Alternativa: Comece contando o que você vende.
- **Subtítulo:** A fynd está em acesso antecipado. Conte o que a sua empresa vende e mostramos, numa demonstração, como os interessados chegam até você.

### Formulário

| Campo | Rótulo | Placeholder | Obrigatório |
|---|---|---|---|
| Nome | Nome | Seu nome | Sim |
| E-mail | E-mail corporativo | voce@suaempresa.com.br | Sim |
| Empresa | Empresa | Nome da empresa | Sim |
| Cargo | Cargo | Ex.: Sócia-diretora | Sim |
| O que vende | O que a sua empresa vende? _(opcional)_ | Ex.: embalagens flexíveis para indústrias de alimentos | Não |

- **Botão:** Pedir acesso antecipado · **Enviando:** Enviando…
- **Linha sob o botão:** Respondemos por e-mail. Sem spam e sem compartilhar seus dados. `[validar com a política de privacidade]`
- **Erros:** iguais à v2 (Preencha este campo. / Confira o e-mail. Ex.: voce@suaempresa.com.br / Se puder, use o e-mail da empresa. Ajuda a preparar a demonstração. / Não conseguimos enviar agora. Tente de novo em instantes.)
- **Sucesso:** **Pedido recebido.** Obrigado, {nome}. Vamos entrar em contato pelo e-mail informado para marcar a demonstração. · Voltar ao início

### FAQ (6 perguntas)

- **Título do bloco:** Perguntas frequentes

1. **Preciso saber quem é o meu cliente ideal?**
   Não. Você conta o que vende, do seu jeito. A fynd entende para quem o seu produto faz sentido e mostra os critérios que usou. Se quiser, você ajusta.

2. **A fynd entra em contato com as empresas por mim?**
   Sim, a fynd faz o primeiro contato com as empresas com fit para entender quem tem interesse. Você recebe só as que demonstraram interesse e, a partir daí, a conversa é sua: você decide o próximo passo e fecha. `[validar: canal, formato e quem assina a mensagem; a resposta não cita nenhum dos três até a confirmação]`

3. **É uma lista ou um mailing?**
   Não. Você não recebe uma lista para trabalhar. A fynd usa as bases para encontrar as empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse, com a resposta e o contexto de cada uma.

4. **Preciso ter um time comercial?**
   Não. Dá para começar com poucos contatos, e o próprio dono pode atender os interessados. Se você tem um time, ele recebe as conversas que já começaram.

5. **De onde vêm os dados?**
   Dos CNPJs da Receita Federal, organizados para consulta, e de uma base própria de contas corporativas. Cada empresa mostra a fonte das informações e por que tem fit com o que você vende.

6. **Quanto custa?**
   Estamos em acesso antecipado e as condições são apresentadas na demonstração.

_A pergunta da v2 "Preciso integrar meu CRM?" sai para dar lugar às novas. Volta se a Mariana confirmar integração ou exportação `[validar]`._

---

## 8. Footer

Igual à v2.
- **Wordmark:** `fynd`
- **Linha institucional:** Ilumine as oportunidades certas. _(Opção para decidir com a Mariana: trocar por "Você vende, a gente encontra." para fechar o ciclo com o hero. Não alterei porque o briefing pede footer igual.)_
- **Âncoras:** Como funciona · Dados · Para quem · Acesso antecipado
- **Contato:** contato@fynd.com.br `[validar]`
- **Links legais:** Privacidade · Termos `[validar se existem]`
- **Direitos:** © 2026 fynd. Todos os direitos reservados.

---

## O que mudou em relação à v2

| Seção | Trecho v2 (renderizado hoje) | Trecho v3 |
|---|---|---|
| SEO `title` | fynd · Saiba para quem vender agora | fynd · Você vende, a gente encontra |
| SEO `description` | Descreva o seu cliente ideal numa conversa. A fynd encontra as empresas com maior potencial… e sugere o primeiro contato. | Diga o que a sua empresa vende. A fynd encontra empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse. Você fecha. |
| 1 · Hero, título | Saiba para quem vender agora. | Você vende, a gente encontra. |
| 1 · Hero, subtítulo | Conte quem é o seu cliente ideal. A fynd encontra as empresas com maior potencial de compra, mostra por que cada uma faz sentido e sugere o primeiro contato. | Diga o que a sua empresa vende. A fynd encontra as empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse. Você assume a conversa e fecha. |
| 1 · Hero, provas | CNPJs da Receita Federal · Base própria de contas · Critério explicável | CNPJs da Receita Federal · Primeiro contato incluído · Só chegam interessados · A decisão é sua |
| 1 · Hero, cards | Perfil salvo (148) · Aderência média 74% · Perfil ideal (chips) | Você vende → Fit 148 → Primeiro contato 60/21 → Interessados 12 |
| 1 · Hero, MacBook | Tela de oportunidades (lista por aderência) | Tela de interessados (Serra Azul pediu amostras) |
| 2 · Problema, título | Mais dados não resolvem. Clareza resolve. | Mais lista não resolve. Interesse resolve. |
| 2 · Problema, subtítulo | Você não precisa de uma lista maior. Precisa saber onde gastar o tempo do seu time. | Encontrar empresas com perfil é metade do trabalho. A outra metade é descobrir quem quer conversar… |
| 2 · Dores | Listas frias e desatualizadas · Horas montando planilha · Time ligando no escuro | Mailing comprado, contato frio · Sem estrutura para prospectar · Formulário que ninguém sabe responder |
| 2 · Transição | Menos lista fria. Mais clareza para vender. | Menos lista fria. Mais empresas interessadas. |
| 3 · Título | Da conversa à próxima ligação. | Você conta, a fynd encontra, você fecha. |
| 3 · Subtítulo | São três passos, sem planilha no meio. | Sem formulário de cliente ideal e sem lista para trabalhar. Você entra quando a empresa já demonstrou interesse. |
| 3 · Passo 1 | 01 · DESCREVA · Conte quem você quer atender | 01 · VOCÊ CONTA · Você conta o que vende |
| 3 · Passo 2 | 02 · RECEBA · Veja quem tem mais potencial | 02 · A GENTE ENCONTRA · A fynd encontra e faz o primeiro contato |
| 3 · Passo 3 | 03 · ABORDE · Comece com a mensagem certa ("Você revisa e decide.") | 03 · VOCÊ FECHA · Você recebe os interessados e fecha |
| 4 · Demo, título | Uma manhã de prospecção em quatro telas. | Do que você vende aos interessados. |
| 4 · Demo, etapas | Conversa · Prioridades · Contexto · Abordagem | Conversa · Fit · Primeiro contato · Interessados |
| 4 · Demo, etapa 4 | Um primeiro contato que faz sentido. "Você revisa, ajusta e envia pelo seu canal." | Só chega quem demonstrou interesse. "A partir daqui, a conversa é sua." |
| 4 · Fim do pin | Pronto para ver isso com o seu cliente ideal? | Pronto para ver isso com o que você vende? |
| Telas · shell | Oportunidades 12 · Conversas 3 · Listas salvas · grupo "Perfis ideais" · Diretora comercial | Interessados 12 · Primeiro contato 60 · Empresas com fit 148 · grupo "Buscas" · Sócia-diretora |
| Tela 1 | "Novo perfil ideal"; Camila descreve o cliente ideal ("Quero indústrias de alimentos…") | "Nova busca"; Camila diz o que vende; a fynd infere os critérios |
| Tela 2 | Oportunidades da semana · 12 empresas priorizadas · Ordenar por: Aderência | Empresas com fit · 148 empresas encontradas · Ordenar por: Fit · "Ponto de partida" |
| Telas C e D (v2) | Detalhe da empresa; Sugestão de abordagem com e-mail e "A fynd não envia mensagens por você." | Saem. O detalhe vira o painel da tela 4; o rascunho de e-mail sai (contradiz o novo posicionamento e nomeava canal) |
| Tela 3 | — | Nova: Primeiro contato (funil 60 → 21 → 12, linha do tempo) |
| Tela 4 | — | Nova: Interessados (6 respostas, contexto, Assumir conversa / Agendar reunião) |
| 5 · Dados, título | Dados empresariais, organizados para vender. | Não é mailing. Só chega quem tem interesse. |
| 5 · Dados, subtítulo | Toda prioridade tem fonte e critério. Você vê de onde veio cada informação. | As bases servem para encontrar as empresas com fit. O primeiro contato serve para descobrir quem quer conversar… |
| 5 · Bloco 3 | Critério que você consegue explicar ("…por que subiu na lista") | Fit que você consegue explicar ("…você entra na conversa sabendo com quem está falando") |
| 5 · Diagrama | Seu perfil ideal + Receita Federal + Base fynd → Lista priorizada | O que você vende + Receita Federal + Base fynd → Empresas com fit → Primeiro contato → Interessados |
| 6 · Título | Para quem vende e para quem lidera. | Para vender mais sem montar estrutura. |
| 6 · Coluna 1 | Você vende, a fynd aponta o caminho. | Teste sem contratar ninguém. |
| 6 · Coluna 2 | Seu time nas contas certas. | Seu time nas conversas que já começaram. |
| 6 · Garantia 3 | Você decide o contato. A fynd sugere, e você revisa e envia. | A decisão é sua. Você assume a conversa e fecha. |
| 6 · Experiência | — | Bloco novo, condicional: "[40 anos]" `[validar]` |
| 7 · Título | Comece pela conversa certa. | Diga o que você vende. |
| 7 · Form, último campo | Quem é o seu cliente ideal? | O que a sua empresa vende? |
| 7 · FAQ 1 | A fynd envia mensagens por mim? **Não.** | Preciso saber quem é o meu cliente ideal? **Não.** |
| 7 · FAQ 2 | De onde vêm os dados? | A fynd entra em contato com as empresas por mim? **Sim, o primeiro contato.** |
| 7 · FAQ novas | Preciso integrar meu CRM? | É uma lista ou um mailing? · Preciso ter um time comercial? (CRM sai) |
| 8 · Footer | — | Igual (sugestão de linha em aberto) |

---

## Pendências `[validar]` deste copy

1. **Canal, formato e assinatura do primeiro contato.** O site não cita nenhum. Se confirmado, entra só como ícone na tela 3 e numa frase do FAQ 2.
2. **Humano, automatizado ou misto.** O texto não afirma nenhum dos três.
3. **Critério de "demonstrou interesse."** A demo usa: pediu amostra, proposta, catálogo, preço ou conversa.
4. **"40 anos de experiência" e o nome da empresa.** Só com confirmação; senão o bloco da seção 6 sai.
5. **Sinais de contexto novos** (ampliou a fábrica, linha lançada) dependem do que a base própria oferece; se não, viram filial/CNAE.
6. **LGPD:** a redação agora precisa cobrir também o primeiro contato feito pela fynd.
7. **Integração com CRM:** a pergunta saiu do FAQ e volta se houver integração.
8. **Cargo da Camila** ("Sócia-diretora") e a **linha do footer**: decisões pequenas para o Lucas.
