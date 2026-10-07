# 02 · Copy do site da fynd · v4 (página principal)

_Etapa 2 da v4 · agente `site-copy` · 2026-10-07 · modo direto (decisões registradas no fim)_
_Fontes: `docs/site/v4/00-briefing-v4.md` (principal), `docs/reunioes/2026-10-01-lucas-mariana-eduardo-revisao-lp.md` (30 pontos), `docs/reunioes/2026-10-01-escopo-negocio-fynd.md`, `docs/site/v3/02-copy-v3.md` e o código `*-v3`._

**A v4 numa frase:** você conta o que vende, sem setup nenhum, e recebe só empresas interessadas, com contato e próximo passo. A simplicidade é o argumento, e o texto precisa ser simples também.

**Regras aplicadas em todo o documento**
- `fynd` sempre minúsculo, inclusive no início de frase. Nunca entra em eyebrow, badge, rótulo mono ou qualquer texto com `uppercase` por CSS. Nenhum rótulo mono abaixo contém a palavra. O cabeçalho "Com a fynd" da seção 2 é texto em caixa normal.
- O diferencial é **o interessado já qualificado**. O primeiro contato é processo interno: não aparece como etapa, como selo nem como promessa. Quando é inevitável falar dele, o texto diz "a fynd aborda e qualifica". Nenhum canal é nomeado.
- Nada de "Receita Federal". A base aparece uma única vez, como volume: "mais de 25 milhões de CNPJs, do Brasil todo".
- Não usamos "IA" nem "automação" como promessa. "Motor" não aparece no texto visível (o rótulo da faixa é "Por trás de cada interessado").
- Nada sobre modelo de preço.
- A decisão e o fechamento são sempre do cliente.
- Números só dentro das telas (e o "25 milhões" da base, aprovado pela Mariana). Sem taxa, sem %, sem "X interessados por mês" no texto do site.
- Usamos "lead" só onde a Mariana e o Eduardo pediram ("lead frio, lead quente", "base de leads"). No resto, "empresas interessadas".
- Ciano (nota para o dev): o selo "Interessada" no card ativo dentro das telas e o ponto aceso no fundo do hero. O X das dores usa `destructive`, só no ícone.

---

## Universo fictício (o mesmo em todas as telas, cards e recortes)

Nomes inventados. CNPJs começam com `00.`. Os números são conceituais, já que o produto ainda não existe (ponto 3 da reunião). `[validar antes de publicar: manter como ilustração]`

**Quem usa a fynd**
- **Camila Rocha**, Sócia-diretora da **Lumi Embalagens**
- CNPJ da Lumi: `00.418.392/0001-07`
- O que vende: embalagens flexíveis (pouches, sachês e filmes) para indústrias de alimentos e cosméticos. Atende o Brasil todo, com mais força no Sudeste e no Sul.
- Anexos que a Camila manda: `lumiembalagens.com.br` (site) e `Catalogo-Lumi-2026.pdf` (PDF, 4,2 MB)

**Produto ativo:** `Embalagens flexíveis`

**Perfil proposto pela fynd** (inferido, a Camila não descreve)
- Setor: Indústrias de alimentos e cosméticos
- Região: Brasil todo, com foco no Sudeste e no Sul
- Porte: a partir de 50 pessoas
- Sinal: em expansão (filial nova ou linha nova)

**Funil:** **4.860 empresas com o seu perfil → 12 interessadas.** O meio do caminho (abordadas, responderam) não aparece em nenhuma tela.

**Recortes da tela Fit (somam 4.860 em cada grupo)**

| Setor | | Região | | Porte | |
|---|---|---|---|---|---|
| Alimentos | 3.120 | Sudeste | 2.430 | 50 a 199 pessoas | 2.310 |
| Cosméticos e higiene | 1.740 | Sul | 1.170 | 200 a 499 pessoas | 1.840 |
| | | Nordeste | 680 | 500 pessoas ou mais | 710 |
| | | Centro-Oeste | 390 | | |
| | | Norte | 190 | | |

**As 6 interessadas** (ordenadas por aderência). A aderência reflete a interação: quem respondeu e interagiu mais tem aderência maior (ponto 16). Regra usada: 5 interações ≈ 90% ou mais; 3 a 4 ≈ 75 a 89%; 1 a 2 ≈ 65 a 74%. `[validar a regra com a Mariana]`

| # | Empresa | Contexto (`meta`) | Contato | Interesse identificado | Status | Próximo passo | Aderência | Interações | Respondeu |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Serra Azul Alimentos** _(ativa)_ | Alimentos · Jundiaí, SP · 320 pessoas | Renata Moraes · Gerente de compras | Pouch para a linha de biscoitos da nova unidade | Pediu amostras | Enviar amostras e marcar reunião | **94%** | 5 | há 2 dias |
| 2 | Bem Natural Cosméticos | Cosméticos · Contagem, MG · 410 pessoas | Felipe Andrade · Coordenador de suprimentos | Sachês de 10 ml para uma linha nova | Pediu proposta | Enviar proposta | **88%** | 4 | há 3 dias |
| 3 | Casa Doce Biscoitos | Alimentos · Vila Velha, ES · 230 pessoas | Juliana Teixeira · Diretora industrial | Trocar de fornecedor quando o contrato vencer, em janeiro | Quer conversar em novembro | Agendar reunião para novembro | **81%** | 3 | há 4 dias |
| 4 | Grão Fino Cafés | Alimentos · Varginha, MG · 210 pessoas | Marcos Vilela · Sócio | Embalagem com válvula para café em grão | Perguntou o pedido mínimo | Responder sobre o pedido mínimo | **76%** | 3 | há 5 dias |
| 5 | Nativa Snacks | Alimentos · Sorocaba, SP · 280 pessoas | Patrícia Lima · Compradora | Preço e prazo de pouches para snacks | Quer conversar | Confirmar a reunião de quinta | **72%** | 2 | há 5 dias |
| 6 | Aroma da Serra Cosméticos | Cosméticos · Petrópolis, RJ · 240 pessoas | Ricardo Nunes · Gerente de produto | Embalagem para a linha de refil | Pediu catálogo | Enviar catálogo | **68%** | 1 | há 6 dias |

_Saem da v3: Laticínios Vale Verde e Prisma Higiene Pessoal (só existiam na lista de fit e no primeiro contato, que não mostram mais nomes)._

**O que conta como "interessada" no exemplo:** respondeu e pediu amostra, proposta, catálogo, condições ou uma conversa. `[validar o critério real]`

---

## SEO e compartilhamento

- **`title`:** `fynd · Você vende, a gente encontra`
- **`description`** (cerca de 145 caracteres): `Conte o que a sua empresa vende. A fynd encontra empresas com o seu perfil e entrega só as interessadas. Zero setup, sem mailing. Você fecha.`
- **`og:title`:** `fynd · Você vende, a gente encontra`
- **`og:description`:** `Zero setup e sem mailing. Você conta o que vende e recebe só empresas interessadas, com contato e próximo passo. Quem fecha é você.`
- **Imagem OG (1200×630):** título "Você vende, a gente encontra." Abaixo, à esquerda, a linha "Zero setup. Só chegam interessados." À direita, recorte do card da Serra Azul Alimentos (Renata Moraes · Gerente de compras · Pediu amostras · selo "Interessada" · Aderência 94%). Wordmark `fynd` no canto.
- **`og:site_name`:** `fynd` · **`lang`:** `pt-BR`
- A v3 vai para `/v3` com `noindex` (regra do briefing).

---

## 0. Header

Visual da v2/v3. Muda o texto das âncoras e do botão.

- **Wordmark:** `fynd` · `aria-label` "fynd, voltar ao início"
- **Âncoras:** Como funciona · Na prática · Para quem
- **Botão:** Garantir minha vaga _(em telas estreitas: "Garantir vaga")_
- **Mobile:** "Abrir menu" / "Fechar menu"
- **Link de acessibilidade:** Pular para o conteúdo

---

## 1. Hero

- **Pill de status:** ● Acesso antecipado aberto | Garantir vaga →
- **Título (h1):** Você vende, a gente encontra.

### Subtítulo: 3 opções

| | Subtítulo | Leitura |
|---|---|---|
| **A · Recomendado** | **Conte o que a sua empresa vende. A fynd encontra quem tem o seu perfil e entrega só as empresas interessadas. Você fecha.** | Mantém o ritmo da frase-mãe (você conta, a fynd encontra, você fecha), troca o "primeiro contato" pela entrega e termina no cliente. São 22 palavras, cabem em 3 linhas. |
| B | Diga o que você vende e receba empresas que já querem conversar, com contato e próximo passo. | Mais concreta sobre o que chega. Perde o "você fecha" e começa a competir com a tela, que já mostra contato e próximo passo. |
| C | Troque o mailing frio por empresas interessadas no que você vende. A fynd encontra, você fecha. | É a mais combativa. Antecipa o argumento da seção 2 e repete "mailing" duas dobras seguidas. |

- **CTA principal:** Garantir minha vaga _(âncora para `#acesso`; ver pendência do WhatsApp)_
- **CTA secundário:** Ver como funciona ↓
- **Linha de zero setup (logo abaixo dos botões, uma linha só, ícone de check neutro):** **Zero setup.** Contratou, já está funcionando.
  - _Substitui a faixa de 4 provas da v3 (saem "CNPJs da Receita Federal" e "Primeiro contato incluído"). Uma linha, sem poluir._
- **MacBook:** tela Interessados (ver "Telas"), Serra Azul Alimentos ativa, sem painel de detalhe.
- **`aria-label` do mockup:** "Tela de interessados da fynd: 12 empresas que responderam e querem saber mais, com a Serra Azul Alimentos no topo pedindo amostras, com 94% de aderência."
- **Fundo:** um único ponto aceso (ciano) na grade. Sem texto.

### Cards flutuantes (3, `aria-hidden`, só em `lg+`)

| # | Posição | Rótulo mono | Conteúdo |
|---|---|---|---|
| 1 | esquerda, alto | `VOCÊ VENDE` | Chips: Embalagens flexíveis · Alimentos · Cosméticos |
| 2 | direita, alto | `SEU PERFIL` | Número grande **4.860** · "empresas com o seu perfil" |
| 3 | direita, baixo | `INTERESSADOS` | Ícone check · **12 interessadas** · "Serra Azul Alimentos pediu amostras." |

---

## 2. O problema, com contraste

- **Eyebrow:** `O DIA A DIA DE QUEM VENDE`
- **Título (revelado por palavra no scroll):** Mais mailing não resolve. Interesse resolve.
- **Subtítulo:** Ter uma lista de empresas é fácil. Difícil é descobrir quem quer conversar.

### Contraste: o seu dia a dia hoje × com a fynd

Duas colunas, três linhas pareadas. À esquerda, ícone X (`destructive`); à direita, ícone check (neutro). Os cabeçalhos são texto em caixa normal, **não** eyebrow (o da direita contém "fynd").

- **Cabeçalho esquerdo:** Hoje
- **Cabeçalho direito:** Com a fynd

| | Hoje (X) | Com a fynd (check) |
|---|---|---|
| 1 | **Mailing frio.** Você compra uma lista e liga para quem não está esperando você. | **Só interessados.** Chegam empresas que responderam e querem saber mais. |
| 2 | **Estrutura cara.** Prospectar pede contratar, treinar e montar um processo. | **Sem montar time.** Você mesmo pode atender quem chega. |
| 3 | **Setup sem fim.** Configurar ferramenta, subir base, definir cliente ideal. | **Zero setup.** Você conta o que vende e pronto. |

_Nota contra o alerta do Eduardo: os dois lados falam do dia a dia do cliente, nunca de "ferramenta X × fynd". Nenhum concorrente é citado. No mobile, cada par fica empilhado (X em cima, check embaixo), para a leitura continuar sendo "problema → solução"._

### Frase de fechamento: 3 opções

| | Frase | Leitura |
|---|---|---|
| **Recomendada** | **Troque o lead frio pelo lead quente.** | São as palavras da Mariana, na língua de quem compra mailing. É um verbo de ação com contraste direto, e conversa com a lista cinza que se apaga e deixa uma linha acesa. |
| Alternativa 1 | Menos contato frio. Mais oportunidade, mais fechamento. | Usa o pedido do Eduardo. É mais longa, e "fechamento" chega perto de prometer resultado. |
| Alternativa 2 | Sai o mailing. Entram os interessados. | É curta e fecha com o título da seção, mas repete "mailing" e perde o "quente", que foi a palavra pedida. |

- **Visual (opcional):** a lista cinza → uma linha acesa da v3, sem texto novo. A linha acesa é o card da Serra Azul Alimentos com o status "Pediu amostras". Se a seção ficar longa, a lista sai e fica só a frase.
- **CTA:** nenhum.

---

## 3. Como funciona

- **Eyebrow:** `COMO FUNCIONA`
- **Título:** Você conta, a fynd encontra, você fecha.
- **Subtítulo:** Zero setup. Foco no resultado. Você não configura nada, não sobe base e não compra mailing.

### Os 3 passos

| Passo | Rótulo mono | Título | Texto | Recorte |
|---|---|---|---|---|
| 1 | `01 · VOCÊ CONTA` | **Você conta o que vende** | Do seu jeito: uma mensagem, o site, um catálogo. Não precisa saber descrever o seu cliente ideal. | M1 |
| 2 | `02 · A GENTE ENCONTRA` | _ver opções abaixo_ | _ver opções abaixo_ | M2 |
| 3 | `03 · VOCÊ FECHA` | **Você recebe os interessados e fecha** | Cada empresa chega com contato, interesse e próximo passo. A conversa e a decisão são suas. | M3 |

### Passo 2: 3 opções

| | Título | Texto | Leitura |
|---|---|---|---|
| **Recomendado** | **A fynd encontra e qualifica os interessados** | Cruza o que você vende com a base, encontra as empresas com o seu perfil, aborda, qualifica e separa só quem tem interesse. | O título já diz a última camada ("qualifica os interessados"), que é o diferencial, e o texto mostra todas as camadas numa frase só, com verbos em sequência. É o punch que o Eduardo pediu, sem destacar o primeiro contato. |
| Alternativa 1 | A fynd encontra, aborda e qualifica | Cruza o que você vende com a base, encontra quem tem o seu perfil e separa só as empresas com interesse. | Mostra mais trabalho no título, mas termina no mecanismo, não no resultado. "Aborda" no título chama atenção para o contato. |
| Alternativa 2 | A fynd separa quem tem interesse | Entre milhares de empresas com o seu perfil, a fynd aborda, qualifica e deixa passar só quem quer conversar. | É a mais orientada a benefício. "Milhares" é vago, e "separa" sozinho parece filtro de lista, o que reabre a ambiguidade que o Eduardo apontou. |

### Faixa do ciclo (logo abaixo dos 3 passos, compacta, uma linha no desktop)

- **Rótulo mono:** `POR TRÁS DE CADA INTERESSADO`
- **Ciclo (6 etapas ligadas por →):** Entender → Encontrar → Abordar → Conversar → Qualificar → Entregar
- **Marca sob "Entregar" (texto pequeno, caixa normal):** você entra aqui
- **Frase (caixa normal, não uppercase):** A complexidade fica com a fynd.
- _Nota para o dev: é a "faixa do motor" do briefing. A palavra "motor" não aparece no texto. As 5 primeiras etapas ficam neutras; "Entregar" ganha peso (`paper-50`), sem ciano. Animação sugerida: as etapas acendem em sequência, uma vez, quando a faixa entra na tela. Com `prefers-reduced-motion`, todas ficam acesas._
- **`aria-label` da faixa:** "Por trás de cada interessado, a fynd entende, encontra, aborda, conversa, qualifica e entrega. Você entra na entrega."

- **CTA discreto:** Ver na prática ↓

### Mini-recortes

- **M1 (Você conta):** balão da Camila: "Vendo embalagens flexíveis para alimentos e cosméticos." Embaixo, dois chips de anexo: `lumiembalagens.com.br` · `Catalogo-Lumi-2026.pdf`. Resposta da fynd em uma linha: "Entendi. Vou buscar indústrias de alimentos e cosméticos."
- **M2 (A gente encontra):** duas barras horizontais neutras, sem o meio do funil:
  - Com o seu perfil · **4.860**
  - Interessadas · **12**
  - Linha pequena entre as barras: "Abordando e qualificando"
- **M3 (Você fecha):** card da Serra Azul Alimentos: "Renata Moraes · Gerente de compras" · status "Pediu amostras" · selo **Interessada** (ciano) · "Aderência 94%" · botão "Assumir conversa".
- **`aria-label`s:**
  - M1: "Exemplo: a Camila conta o que a Lumi Embalagens vende e anexa o site e o catálogo."
  - M2: "Exemplo: 4.860 empresas com o perfil da Lumi, das quais 12 se mostraram interessadas."
  - M3: "Exemplo: a Serra Azul Alimentos, interessada, pediu amostras. Contato: Renata Moraes, gerente de compras."

---

## 4. Na prática (demo com pin, 3 etapas)

- **Eyebrow:** `NA PRÁTICA`
- **Título:** Do que você vende aos interessados.
- **Subtítulo:** Acompanhe a Camila, da Lumi Embalagens, em três telas.
- **Indicador de progresso:** `1 Seu produto · 2 Fit · 3 Interessados` · `aria-label` "Etapa X de 3"

| Etapa | Rótulo mono | Título lateral | Texto lateral | Tela |
|---|---|---|---|---|
| 1 | `01 / 03 · SEU PRODUTO` | Comece pelo que você vende | A Camila manda o CNPJ, o site e o catálogo. A fynd resume o que entendeu, propõe o perfil e mostra como vai apresentar a Lumi. Ela aprova, e pronto. | Seu produto |
| 2 | `02 / 03 · FIT` | O tamanho do seu mercado | Você vê quantas empresas têm o seu perfil, no Brasil todo. Nenhuma lista para trabalhar: a fynd já começou a abordar e qualificar. | Fit |
| 3 | `03 / 03 · INTERESSADOS` | Só chega quem quer conversar | Empresas que responderam e querem saber mais, com contato, interesse e próximo passo. A partir daqui, a conversa é sua. | Interessados |

- **Ao soltar o pin:** Pronto para ver isso com o que você vende? · **CTA:** Garantir minha vaga
- **Mobile:** os mesmos títulos e textos, empilhados.

**`aria-label` das telas por etapa**
- 1: "Tela Seu produto da fynd: a Camila informa o CNPJ, conta o que a Lumi Embalagens vende e anexa o site e o catálogo. A fynd resume o que entendeu, propõe o perfil e apresenta o especialista comercial da Lumi para aprovação."
- 2: "Tela Fit da fynd: 4.860 empresas com o perfil da Lumi Embalagens, divididas por setor, região e porte. A abordagem e a qualificação já começaram."
- 3: "Tela Interessados da fynd: 12 empresas que responderam e querem saber mais, cada uma com contato, interesse identificado, status, próximo passo e aderência. A Serra Azul Alimentos está no topo, com 94%."

---

## Telas da plataforma (textos dentro do MacBook)

Princípio (ponto 29): a tela parece simples de propósito. São três itens de navegação, sem dashboard, sem gráfico de desempenho e sem configurações à vista.

### Shell v4

- **Sidebar, topo:** wordmark `fynd`
- **Navegação** (espelha a demo):
  - Seu produto _(ativo na etapa 1)_
  - Fit `4.860` _(ativo na etapa 2)_
  - Interessados `12` _(ativo na etapa 3 e no hero)_
- **Grupo "O que você vende":**
  - Embalagens flexíveis _(ativo)_
  - Ação: + Novo produto
  - _(Saem "Buscas", "Sachês para food service", "Filmes para cosméticos", "Primeiro contato" e "Visão geral".)_
- **Rodapé da sidebar:** Camila Rocha · Sócia-diretora · Lumi Embalagens
- **Busca no topo (placeholder):** Buscar interessado
- **Notificações (`sr-only`):** Notificações · badge `1` com tooltip "Nova empresa interessada"

### Tela 1: Seu produto

- **Cabeçalho:** Seu produto · Embalagens flexíveis
- **Primeira mensagem da fynd:**
  > Oi, Camila. O que você quer vender?
- **Mensagem da Camila (digitando):**
  > Nosso CNPJ é 00.418.392/0001-07. A gente fabrica embalagens flexíveis para alimentos e cosméticos: pouches, sachês e filmes. Atendemos o Brasil todo, mais forte no Sudeste e no Sul.
- **Chips de anexo na mensagem dela:** 🔗 `lumiembalagens.com.br` · 📄 `Catalogo-Lumi-2026.pdf` · 4,2 MB _(ícones de link e de PDF, sem emoji no código)_
- **Resposta da fynd, parte 1 (resumo):**
  > Li o site e o catálogo. Pelo que entendi, a Lumi vende:
  - Embalagens flexíveis: pouches, sachês e filmes
  - Para indústrias de alimentos e cosméticos
  - Com impressão personalizada e pedidos a partir de 5 mil unidades
- **Resposta da fynd, parte 2 (perfil proposto; chips rótulo: valor):**
  > Estas empresas têm o seu perfil:
  - Setor: Indústrias de alimentos e cosméticos
  - Região: Brasil todo, foco no Sudeste e no Sul
  - Porte: a partir de 50 pessoas
  - Sinal: em expansão (filial nova ou linha nova)
- **Card do especialista (uma linha de destaque, não é configuração):**
  - Título: Especialista comercial da Lumi
  - Selo: Pronto para aprovação
  - Linha: Ele vai apresentar a Lumi do jeito que você apresentaria. Converse com ele antes de começar.
  - Botões: **Aprovar e começar** (principal) · Conversar com ele
- **Mensagem de resultado (depois do clique, ponte para a tela 2):**
  > Pronto. Encontrei 4.860 empresas com o seu perfil e já comecei a abordar e qualificar. Te aviso quando alguém quiser conversar.
- **Campo de entrada (placeholder):** Conte o que você quer vender…
- **Botão de anexo (`aria-label`):** Anexar site, PDF, apresentação ou áudio
- **Nota sob o campo:** Pode mandar site, catálogo, apresentação ou áudio.
- _Nota: a Camila não descreve cliente ideal; quem propõe setor, porte e sinal é a fynd. O resumo "pedidos a partir de 5 mil unidades" vem do catálogo e mostra que a fynd leu o material._

### Tela 2: Fit (volume, sem nomes e sem %)

- **Breadcrumb:** Embalagens flexíveis / Fit
- **Rótulo pequeno:** Seu potencial
- **Número grande:** 4.860
- **Linha sob o número:** empresas com o seu perfil, no Brasil todo
- **Chips do perfil (somente leitura):** Alimentos e cosméticos · Brasil todo · A partir de 50 pessoas · Em expansão
- **Três blocos de recorte** (barras horizontais neutras com o número absoluto ao lado; **sem porcentagem**):
  - **Setores:** Alimentos 3.120 · Cosméticos e higiene 1.740
  - **Regiões:** Sudeste 2.430 · Sul 1.170 · Nordeste 680 · Centro-Oeste 390 · Norte 190
  - **Porte:** 50 a 199 pessoas 2.310 · 200 a 499 pessoas 1.840 · 500 pessoas ou mais 710
- **Faixa de status (neutra, ponto pulsando em cinza claro, sem ciano):**
  - Título: Abordagem e qualificação em andamento
  - Linha: A fynd já começou a abordar e qualificar. Quem tiver interesse aparece em Interessados.
  - Link: Ver interessados →
- _Nota: nenhuma empresa nomeada, nenhuma aderência. Não há botão "Ver as 4.860 empresas" nem "Exportar"; isso reabriria a ideia de mailing._

### Tela 3: Interessados (a entrega; é também a tela do hero)

- **Breadcrumb:** Embalagens flexíveis / Interessados
- **Título:** Interessados
- **Linha de apoio:** Responderam e querem saber mais · 12 empresas
- **Ordenação:** Ordenar por: Aderência
- **Dica ao lado do rótulo "Aderência" (tooltip ou linha pequena):** A aderência sobe conforme a empresa responde e interage.
- **Cards** (formato do escopo). O selo **Interessada** é ciano só no card ativo; nos demais, o mesmo selo fica neutro.

Estrutura de cada card:
```
[Empresa]                               [selo Interessada]   Aderência [94%]
[meta]
Contato               Renata Moraes · Gerente de compras
Interesse identificado Pouch para a linha de biscoitos da nova unidade
Status                Pediu amostras · respondeu há 2 dias
Próximo passo         Enviar amostras e marcar reunião
[Assumir conversa]  [Agendar reunião]  [⋯]
```

Conteúdo dos 6 cards: o da tabela "As 6 interessadas" acima, na mesma ordem. O 6º (Aroma da Serra) só aparece se couber; senão o rodapé cobre.

- **Menu "⋯":** Ver detalhes · Marcar como sem fit
- **Rodapé da lista:** Ver os 12 interessados
- **Nota fixa no rodapé da tela:** A partir daqui, a conversa é sua.
- **Toast ao clicar "Assumir conversa":** A conversa com a Serra Azul Alimentos agora é sua.

**Painel de detalhe (só na etapa 3 da demo; no hero, não abre).** É a "telinha de detalhe" do ponto 17.
- **Cabeçalho:** avatar "SA" · Serra Azul Alimentos · Alimentos · Jundiaí, SP · 320 pessoas
- **Contato:** Renata Moraes · Gerente de compras
  - Telefone: (11) 9••••-••08 · E-mail: renata@••••••.com.br _(mascarados de propósito no site, para não exibir dado que possa ser real)_
  - Botão: Ver contato
- **O que ela disse:**
  > Temos interesse, sim. Estamos abastecendo a nova unidade de Uberlândia e precisamos de pouch para a linha de biscoitos. Conseguem enviar amostras? Depois marcamos uma reunião.
- **Interesse identificado:** Pouch para a linha de biscoitos da nova unidade
- **Por que tem o seu perfil:** ✓ Indústria de alimentos · ✓ Sudeste · ✓ 320 pessoas · ✓ Nova unidade em Uberlândia, MG, em 2026
- **Aderência 94% · 5 interações** (lista curta, sem canal e sem dizer quem abordou):
  - Respondeu à abordagem
  - Perguntou sobre prazo de entrega
  - Mandou as medidas do pouch
  - Pediu amostras
  - Sugeriu uma reunião
- **Próximo passo:** Enviar amostras e marcar reunião
- **Botões:** Assumir conversa (principal) · Agendar reunião
- _Saem da v3: a linha "Fontes: Receita Federal…" e a linha do tempo "Primeiro contato feito / Novo contato"._

---

## 5. Você só precisa vender

_Substitui a seção "Dados". Curta, em tom de encerramento (ponto 22)._

- **Eyebrow:** `ZERO SETUP`
- **Título:** Você só precisa vender.
- **Linha de abertura (quatro frases curtas, em sequência):** Não é CRM. Não é chatbot. Não é base de leads. Não é automação.
- **Complemento:** É o resultado de tudo isso, sem você precisar aprender a usar nada.

**Você não precisa** _(rótulo em caixa normal; seis itens em grade 3×2 ou 2×3, cada um com traço neutro, sem X vermelho, que já foi usado na seção 2)_
- Buscar mailing
- Fazer setup
- Subir a sua base
- Configurar automação
- Definir cliente ideal
- Entender de tecnologia

- **Frase de fechamento (maior):** Só precisa atender quem já tem interesse.
- **Linha da base (pequena, ao pé da seção):** Por trás, mais de 25 milhões de CNPJs do Brasil todo, organizados e limpos. E a cada conversa a fynd aprende mais sobre o que cada empresa compra. `[validar o número com a Mariana]`
- _Nota: nada sobre a origem da base ("para o cliente, não importa onde nem como a fynd encontrou")._

---

## 6. Para quem (compacta)

- **Eyebrow:** `PARA QUEM`
- **Título:** Para vender mais sem montar estrutura.
- **Subtítulo:** Para PMEs B2B em que cada cliente novo vale uma boa conversa.

**Coluna 1** · badge `Quem vende sozinho`
- **Título:** Teste sem contratar ninguém.
- **Texto:** Os interessados chegam para você mesmo atender. Não precisa de um time de prospecção para começar.

**Coluna 2** · badge `Quem lidera um time`
- **Título:** Seu time só com quem quer conversar.
- **Texto:** Menos horas em contato frio, mais tempo para fechar.

**Chips** · rótulo em caixa normal: Feito para
Consultorias · Contabilidades · Crédito empresarial · Benefícios corporativos · Software houses · SaaS B2B · Serviços empresariais · Imobiliário · Clínicas e grupos de saúde · Escritórios especializados · Vendas consultivas

- _Saem da v3: os itens das colunas, a faixa de 3 garantias, o bloco "40 anos" e o depoimento. Se a experiência for confirmada, volta como uma linha só, aqui ou no rodapé. `[validar]`_

---

## 7. Acesso antecipado + FAQ (encerramento)

- **Eyebrow:** `ACESSO ANTECIPADO`
- **Título:** O que você quer vender?
- **Subtítulo:** Responda e garanta sua vaga. Mostramos como os interessados chegam até você.
- **Reforço de zero setup (linha com check, mesma da hero):** **Zero setup.** Contratou, já está funcionando.

### Formulário (o mesmo da v3, com dois textos novos)

| Campo | Rótulo | Placeholder | Obrigatório |
|---|---|---|---|
| Nome | Nome | Seu nome | Sim |
| E-mail | E-mail corporativo | voce@suaempresa.com.br | Sim |
| Empresa | Empresa | Nome da empresa | Sim |
| Cargo | Cargo | Ex.: Sócia-diretora | Sim |
| O que vende | O que você quer vender? _(opcional)_ | Ex.: embalagens flexíveis para indústrias de alimentos | Não |

- **Botão:** Garantir minha vaga · **Enviando:** Enviando…
- **Linha sob o botão:** Respondemos por e-mail. Sem spam e sem compartilhar seus dados. `[validar com a política de privacidade]`
- **Erros:** iguais aos da v3.
- **Sucesso:** **Pedido recebido.** Obrigado, {nome}. Vamos falar com você pelo e-mail informado para os próximos passos. · Voltar ao início

### FAQ (5 perguntas)

- **Título do bloco:** Perguntas frequentes

1. **Preciso configurar alguma coisa?**
   Não. Você não sobe base, não configura ferramenta e não define cliente ideal. Conta o que vende, e a fynd começa.
2. **Vou receber uma lista ou um mailing?**
   Não, e você não precisa se preocupar com mailing. Só chegam empresas que responderam e querem saber mais, com contato, interesse e próximo passo.
3. **Como a fynd chega até essas empresas?**
   A fynd encontra as empresas com o seu perfil, aborda e qualifica. Antes de começar, você conversa com o especialista que vai apresentar a sua empresa e aprova a abordagem. `[validar]`
4. **Preciso ter um time comercial?**
   Não. O próprio dono pode atender os interessados. Se você tem um time, ele recebe conversas que já começaram.
5. **Quanto custa?**
   Estamos em acesso antecipado. As condições são apresentadas a quem garantir a vaga.

_Saem da v3: "De onde vêm os dados?" (a base aparece como volume na seção 5) e "Preciso saber quem é o meu cliente ideal?" (incorporada à pergunta 1)._

---

## 8. Footer

- **Wordmark:** `fynd`
- **Linha:** Você vende, a gente encontra.
- **Âncoras:** Como funciona · Na prática · Para quem · Acesso antecipado
- **Contato:** contato@fynd.com.br `[validar]`
- **Links legais:** Privacidade · Termos `[validar se existem]`
- **Direitos:** © 2026 fynd. Todos os direitos reservados.

---

## Mais curta que a v3

| | v3 | v4 |
|---|---|---|
| Seções | 8 + Dados | 8 (Dados vira "Você só precisa vender", com metade do texto) |
| Hero, provas | Faixa com 4 itens | 1 linha de zero setup |
| Hero, cards | 4 | 3 |
| Problema | 3 dores com parágrafo de 2 frases | 3 pares de uma frase cada |
| Demo | 4 etapas, 4 telas | 3 etapas, 3 telas |
| Tela de fit | Lista com 6 empresas e % | Um número e três recortes |
| Para quem | 2 colunas com 3 itens + 3 garantias + experiência + depoimento | 2 colunas de uma frase + chips |
| FAQ | 6 perguntas | 5, com respostas de 2 frases no máximo |
| Telas, navegação | 4 itens + 3 buscas | 3 itens + 1 produto |

---

## Decisões tomadas (modo direto)

1. **Subtítulo do hero:** opção A.
2. **Zero setup no hero:** uma linha sob os botões ("Zero setup. Contratou, já está funcionando."), repetida no encerramento. A faixa de provas da v3 sai.
3. **CTA:** "Garantir minha vaga" em toda a página, como pediu o Eduardo. É um convite, sem contagem regressiva nem "últimas vagas".
4. **Frase de fechamento da seção 2:** "Troque o lead frio pelo lead quente." O "lead" foi liberado aqui por ser a palavra da Mariana e a do mercado.
5. **Passo 2:** "A fynd encontra e qualifica os interessados."
6. **Faixa do ciclo:** rótulo "Por trás de cada interessado". A palavra "motor" não entra no texto visível; o "você entra aqui" liga o ciclo ao "você fecha".
7. **Seção 5:** troquei o "Você só precisa atender quem já quer comprar." do briefing por **"Só precisa atender quem já tem interesse."** Interesse ainda não é compra, e a marca pede precisão sobre qualificação. Se a Mariana preferir a versão mais forte, é só trocar a frase.
8. **Primeiro contato:** fica só no FAQ 3, sem nome de canal, com "aborda e qualifica". Não aparece em nenhuma tela.
9. **Aderência:** só nos interessados, sempre com o número de interações ao lado, para que fique claro de onde vem.
10. **Contato no detalhe:** telefone e e-mail mascarados no site.

## Pendências `[validar]`

1. **CTA:** vai para o formulário ou para o WhatsApp (ponto 4). O copy assume o formulário; se for WhatsApp, o botão continua "Garantir minha vaga" e a seção 7 ganha a linha "Prefere falar agora? Chame no WhatsApp."
2. **"Mais de 25 milhões de CNPJs":** confirmar o número e a redação "organizados e limpos".
3. **Regra de aderência por interação** (5 interações ≈ 90%+ etc.) e **critério de "interessada"**.
4. **FAQ 3:** confirmar que o especialista de validação existirá no lançamento. Se não existir, a resposta termina em "aborda e qualifica. Você só recebe quem tem interesse."
5. **Números da demo** (4.860, 12, 94% etc.): são conceituais e precisam do aval para ir ao ar como ilustração.
6. **"Pedidos a partir de 5 mil unidades"** no resumo da tela 1: é detalhe fictício do catálogo. Pode sair se parecer específico demais.
7. **Experiência de "40 anos"**, depoimento, contato do footer, Privacidade/Termos e a linha de LGPD (agora também cobrindo a abordagem).

---

## Rastreabilidade: os 30 pontos da reunião

| Nº | Ponto | Onde foi atendido |
|---|---|---|
| 1 | Título do hero aprovado; subtítulo mais atrativo | Hero: título mantido; 3 opções de subtítulo, recomendada a A (sem "primeiro contato", termina em "Você fecha") |
| 2 | "Sem setup" no topo e no encerramento, sem poluir | Hero: linha única "Zero setup. Contratou, já está funcionando."; repetida na seção 7; também no subtítulo da seção 3, na linha 3 do contraste e no eyebrow da seção 5 |
| 3 | Números do MacBook são conceituais | Universo fictício marcado como ilustrativo; pendência 5 |
| 4 | CTA de acesso antecipado, "garanto a vaga", muitos botões no topo | "Garantir minha vaga" no header, no pill, no hero, no fim da demo e no formulário; WhatsApp × formulário na pendência 1 |
| 5 | Trocar "lista" por "mailing" | Seção 2: "Mais mailing não resolve. Interesse resolve." |
| 6 | Dores lidas como negativo, com X vermelho | Seção 2: coluna "Hoje" com X em `destructive` e títulos negativos ("Mailing frio", "Estrutura cara", "Setup sem fim") |
| 7 | Comparativo lado a lado com "sem setup" claro, sem virar sistema × sistema | Seção 2: "Hoje" × "Com a fynd", só sobre o dia a dia, sem concorrente; linha 3 = "Zero setup" |
| 8 | "Menos lista fria…" mais atrativo (lead quente, mais oportunidade) | Seção 2: 3 opções; recomendada "Troque o lead frio pelo lead quente." |
| 9 | "Você conta, a fynd encontra, você fecha." como slogan | Seção 3: título com destaque |
| 10 | Subtítulo do Como funciona em sem setup | Seção 3: "Zero setup. Foco no resultado. Você não configura nada, não sobe base e não compra mailing." |
| 11 | Passo 2 com punch: cruza, encontra, qualifica, entrega o interessado | Seção 3: 3 opções; recomendada "A fynd encontra e qualifica os interessados" + texto com todas as camadas |
| 12 | Primeiro contato não é diferencial | Some do hero, dos passos, da demo, das telas e da faixa de provas; fica só no FAQ 3 como "aborda e qualifica" |
| 13 | Etapa 1 = "Seu produto" | Demo e shell: "Seu produto" |
| 14 | Demo em 3 passos | Seção 4: Seu produto · Fit · Interessados; "Etapa X de 3" |
| 15 | Fit mostra volume, sem nomes e sem aderência | Tela 2: "4.860 empresas com o seu perfil" e recortes com números absolutos; sem nomes, sem % |
| 16 | Aderência só nos interessados, vinda da interação | Tela 3: aderência por card + tooltip "sobe conforme a empresa responde e interage"; painel com "5 interações"; regra no universo |
| 17 | Interessados: "responderam e querem saber mais"; telinha de detalhe | Tela 3: linha de apoio literal ("Responderam e querem saber mais"). Implementado: o card completo da Serra Azul (no canvas da demo e do hero e no painel do mobile) mostra contato e cargo (Renata Moraes · Gerente de compras), interesse identificado, status ("Pediu amostras", respondeu há 2 dias), próximo passo ("Enviar amostras e marcar reunião"), aderência com nº de interações e as ações "Assumir conversa" e "Agendar reunião". O painel de detalhe separado (com "Ver contato", fala e histórico de interações) não foi feito, por decisão do design, para a demo não alongar; se o cliente pedir, entra só na etapa 3 |
| 18 | Base como volume (25 mi, Brasil todo, organizada), sem Receita | Seção 5: linha da base; "Receita Federal" removida de todo o site (provas, telas, FAQ, diagrama) |
| 19 | A base se retroalimenta | Seção 5: "a cada conversa a fynd aprende mais sobre o que cada empresa compra" |
| 20 | "Você não precisa se preocupar com mailing"; simplicidade como ponto principal | FAQ 2 (literal); seção 5 inteira; simplicidade como fio da página (ver "Mais curta que a v3") |
| 21 | Lista do que não precisa | Seção 5: "Você não precisa" com 6 itens + "Só precisa atender quem já tem interesse." |
| 22 | Seção de dados redundante; virar encerramento | Seção "Dados" sai; vira a seção 5, curta, colada ao Para quem e ao acesso |
| 23 | "Para vender mais sem montar estrutura" e "Teste sem contratar ninguém" | Seção 6: título e coluna 1 |
| 24 | Público do item 7 do escopo | Seção 6: chips "Feito para" com os 11 segmentos |
| 25 | Não é CRM, chatbot, base de leads | Seção 5: "Não é CRM. Não é chatbot. Não é base de leads. Não é automação." + "É o resultado de tudo isso…" |
| 26 | "Zero setup. Foco no resultado." e "A complexidade fica com a fynd." | Subtítulo da seção 3 e frase da faixa do ciclo |
| 27 | Ciclo entender → entregar como "motorzinho" | Seção 3: faixa "Por trás de cada interessado", com animação em sequência |
| 28 | Não tocar em preço | FAQ 5: só "condições apresentadas a quem garantir a vaga"; nenhum modelo citado |
| 29 | O que a fynd não deve se tornar orienta o tom | Shell com 3 itens, sem dashboard; tela Fit sem exportar/listar; tom sem ferramenta ("não precisa aprender a usar nada") |
| 30 | Essência: "O que você quer vender?" | Título da seção 7; primeira mensagem da fynd na tela 1; rótulo do campo do formulário; placeholder do chat |
