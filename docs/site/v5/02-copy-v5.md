# 02 · Copy do site da fynd · v5 (`/v5`, validação de mercado)

_Etapa 2 da v5 · agente `site-copy` · 2026-10-07 · modo direto (decisões registradas no fim)_
_Fontes: `docs/site/v5/00-briefing-v5.md` (principal), `docs/site/v5/material-cliente/Fynd_Landing_Page_Branding.html` (texto da cliente), as seis frases do pptx transcritas no briefing, `docs/site/v4/02-copy-v4.md` (formato e telas) e a reunião de 01/10 (contexto)._

**A v5 numa frase:** a fynd está em desenvolvimento e quer entregar a oportunidade comercial pronta, em vez de mais uma ferramenta; a página explica a proposta e convida empresas a testar.

**Regras aplicadas em todo o documento**
- **Texto da cliente primeiro.** Onde o material dela tem a frase, a frase é a dela. Os ajustes foram só quatro: `fynd` em minúsculas, o card "Empresa XYZ" trocado pelo universo fictício, o texto do card "Hoje" na versão do pptx (como manda o briefing) e "para o cliente" virando "para você" no princípio da seção 8.
- `fynd` sempre minúsculo, inclusive no início de frase. **Nunca** entra em eyebrow, badge, rótulo mono ou qualquer texto com `uppercase` por CSS. Nenhum rótulo mono abaixo contém a palavra. "Com a fynd", "A fynd trabalha" e o marcador da quarta camada são texto em caixa normal.
- **Produto em desenvolvimento.** O verbo é "quer gerar", "quer vender", "estamos selecionando". Nada de "contratou", "garanta", "já está funcionando". A página não promete resultado nem vaga no piloto.
- A entrega se chama **oportunidade** (empresa, contato com cargo, necessidade identificada, interesse demonstrado, próximo passo aceito). "Interessados" continua sendo só o nome da tela do produto.
- "IA" aparece uma única vez, como negação ("Sem configurar IA"). Fora de título e de promessa.
- "Lista" aparece em dois lugares: no título da seção 4 e em "Sem construir listas".
- Sem "Receita Federal", sem nome de canal de abordagem, sem "leads garantidos", sem taxa ou % no texto do site. O único número fora das telas é o "5.000" do card "Hoje", que é ilustração da cliente, não métrica.
- Preço: só como pergunta ao visitante, dentro do questionário.
- A decisão e o fechamento são sempre do cliente.
- Ciano (nota para o dev): ponto aceso do hero, selo "Interessada" e, no máximo, o destaque da camada "Resultado" ou do card da oportunidade. Nenhum texto depende da cor para ser entendido.

---

## Universo fictício

**Igual à v4**, sem nenhuma mudança de nomes ou números: Camila Rocha, Sócia-diretora da Lumi Embalagens; produto ativo "Embalagens flexíveis"; 4.860 empresas com o perfil → 12 interessadas; as 6 empresas da tabela da v4, com a Serra Azul Alimentos (Renata Moraes · Gerente de compras · 94% · 5 interações) no topo. `[validar antes de publicar: manter como ilustração]`

Uso novo na v5: o card "Nova oportunidade" da seção 4 é a Serra Azul Alimentos (ver seção 4).

---

## SEO e compartilhamento (`/v5`)

- **`title`:** `fynd · Você vende. A fynd encontra.`
- **`description`** (cerca de 155 caracteres): `Uma nova forma de gerar oportunidades comerciais B2B sem montar uma operação de prospecção. Em desenvolvimento: estamos selecionando empresas para o piloto.`
- **`og:title`:** `fynd · Você vende. A fynd encontra.`
- **`og:description`:** `Você explica o que vende. A fynd quer encontrar, abordar e entregar a oportunidade comercial. Estamos selecionando empresas para os primeiros testes.`
- **Texto de compartilhamento (WhatsApp, LinkedIn, e-mail):** `A fynd está em desenvolvimento e procura empresas B2B para os primeiros testes. Veja a proposta e conte se você testaria.`
- **Imagem OG (1200×630), se o dev criar uma própria da `/v5`:** rótulo mono "GERAÇÃO DE OPORTUNIDADES B2B"; título em duas linhas "Você vende." / "A fynd encontra."; à direita, recorte do card da Serra Azul Alimentos com o selo "Interessada"; wordmark `fynd` no canto. A imagem da v4 (`src/app/opengraph-image.tsx`) não pode ser editada; se não houver imagem própria, a `/v5` herda a da v4, cujo título ("Você vende, a gente encontra.") continua compatível.
- **`og:site_name`:** `fynd` · **`lang`:** `pt-BR`
- **`robots`:** `noindex` · **`canonical`:** `/v5` (regra do briefing).

---

## 0. Header

Visual da v4. Mudam as âncoras e o botão.

- **Wordmark:** `fynd` · `aria-label` "fynd, voltar ao início"
- **Âncoras:** Como funciona · Na prática · A diferença
  - Destinos sugeridos: `#como-funciona` (seção 3) · `#na-pratica` (seção 5) · `#a-diferenca` (seção 6; se 6 e 7 forem fundidas, é a seção única) · CTA em `#testar` (seção 9). Sai `#para-quem`; `#acesso` vira `#testar`.
- **Botão:** Tenho interesse em testar a fynd _(telas estreitas e header compacto: "Quero testar")_
- **Mobile:** "Abrir menu" / "Fechar menu"
- **Link de acessibilidade:** Pular para o conteúdo
- **`aria-label` da navegação:** "Seções da página"

---

## 1. Hero

- **Pill de status:** ● Em desenvolvimento · selecionando empresas para o piloto | Quero testar →
  - _Texto em caixa normal. Substitui "Acesso antecipado aberto" da v4._
- **Eyebrow (mono):** `GERAÇÃO DE OPORTUNIDADES B2B`
- **Título (h1), duas frases, com ponto, quebra entre elas:** Você vende. A fynd encontra.
- **Subtítulo:** Uma nova forma de gerar oportunidades comerciais sem precisar montar uma operação complexa de prospecção.
- **CTA principal:** Tenho interesse em testar a fynd _(leva a `#testar` e abre o questionário)_
- **CTA secundário:** Ver como funciona ↓
- **Linha de zero setup (uma linha, ícone de check neutro):** **Zero setup.** Você explica o que vende. A fynd cuida do restante.
  - _A linha da v4 ("Contratou, já está funcionando.") sai: fala de um produto que já se contrata. A nova usa o princípio da própria cliente._
- **MacBook:** tela Interessados (ver "Telas"), Serra Azul Alimentos ativa, sem painel de detalhe.
- **`aria-label` do mockup:** "Ilustração da tela de interessados da fynd: 12 empresas que responderam e querem saber mais, com a Serra Azul Alimentos no topo pedindo amostras, com 94% de aderência."
- **Fundo:** um único ponto aceso (ciano) na grade. Sem texto. _(É o "sinal" do material da cliente, no lugar da barra ciano.)_

### Título do hero: alternativas

| | Título | Leitura |
|---|---|---|
| **Recomendado** | **Você vende. A fynd encontra.** | É o texto da cliente e o mais recente. As duas frases com ponto dão mais peso que a vírgula da v4, e nomear a marca ajuda quem ainda não a conhece. |
| Alternativa 1 | Você vende, a gente encontra. | O título aprovado na reunião de 01/10. Mais coloquial, mas não diz o nome e diverge do material novo. |
| Alternativa 2 | Você explica o que vende. A fynd encontra. | Antecipa o passo 1 e o princípio da seção 8. Mais longo, e tira do cliente o papel que importa (vender). |

### Cards flutuantes (3, `aria-hidden`, só em `lg+`)

| # | Posição | Rótulo mono | Conteúdo | Mudança |
|---|---|---|---|---|
| 1 | esquerda, alto | `VOCÊ EXPLICA` | Chips: Embalagens flexíveis · Alimentos · Cosméticos | Rótulo (era `VOCÊ VENDE`) |
| 2 | direita, alto | `SEU PERFIL` | Número grande **4.860** · "empresas com o seu perfil" | Igual à v4 |
| 3 | direita, baixo | `NOVA OPORTUNIDADE` | Ícone check · **Serra Azul Alimentos** · "Pediu amostras. Próximo passo aceito." | Rótulo e texto (era `INTERESSADOS` · "12 interessadas") |

---

## 2. O problema, em 4 peças

- **Eyebrow (mono):** `PROSPECÇÃO B2B HOJE`
- **Título:** Gerar novos clientes B2B ainda é complexo.
- **Subtítulo:** Para prospectar bem, uma empresa precisa coordenar várias peças antes de chegar a uma conversa comercial.

| Nº (mono) | Peça | Linha |
|---|---|---|
| `01` | **Pessoas** | Contratar, treinar e gerenciar SDRs. |
| `02` | **Dados** | Encontrar empresas e contatos certos. |
| `03` | **Ferramentas** | CRM, automações, bases e canais. |
| `04` | **Operação** | Mensagens, cadências, follow-ups e qualificação. |

- **Linha de fechamento:** nenhuma. A pergunta da seção 3 ("E se o processo fosse muito mais simples?") é a resposta; uma frase a mais aqui atrasa a virada.
- **CTA:** nenhum.
- **`aria-label` da lista:** "As quatro peças que uma empresa precisa coordenar para prospectar"
- _"SDRs" é a palavra da cliente e do público que já prospecta. Se o público-alvo do piloto incluir donos que nunca montaram time, a linha 01 pode virar "Contratar, treinar e gerenciar um time de prospecção." `[validar]`_
- _Sai da v4: o contraste "Hoje × Com a fynd" com X vermelho, o título "Mais mailing não resolve" e "Troque o lead frio pelo lead quente."_

---

## 3. Como funciona (3 passos)

- **Eyebrow (mono):** `ZERO SETUP`
- **Título:** E se o processo fosse muito mais simples?
- **Subtítulo:** nenhum. Os três passos respondem à pergunta.

| Passo | Nº (mono) | Título (caixa normal) | Texto | Recorte |
|---|---|---|---|---|
| 1 | `01` | **Você explica** | Conte o que sua empresa vende e quem costuma comprar. | M1 |
| 2 | `02` | **A fynd trabalha** | Entende seu negócio, encontra empresas, aborda e identifica interesse. | M2 |
| 3 | `03` | **Você vende** | Seu time recebe as oportunidades que merecem uma conversa comercial. | M3 |

- _Passo 2: o HTML diz "aborda e identifica interesse"; o pptx diz "aborda e conversa". Fica a versão do HTML, que termina no que chega ao cliente. "Conversar" continua na faixa do ciclo._
- _Os títulos dos passos não podem ser rótulo mono nem `uppercase` (o do passo 2 contém "fynd"). O rótulo mono é só o número._
- **Frase de fechamento (maior, depois dos passos):** Você conhece seu produto. A fynd cuida da busca.
- **CTA discreto:** Ver na prática ↓

### Faixa do ciclo (opcional; entra só se não alongar a seção)

- **Rótulo mono:** `POR TRÁS DE CADA OPORTUNIDADE` _(era "…DE CADA INTERESSADO")_
- **Ciclo:** Entender → Encontrar → Abordar → Conversar → Qualificar → Entregar _(igual à v4)_
- **Marca sob "Entregar":** você entra aqui _(igual à v4)_
- **Frase da faixa:** sai "A complexidade fica com a fynd." A frase de fechamento da seção já cumpre esse papel, e a ideia de complexidade volta na seção 8.
- **`aria-label` da faixa:** "Por trás de cada oportunidade, a fynd entende, encontra, aborda, conversa, qualifica e entrega. Você entra na entrega."
- _Se o design tiver de escolher entre a faixa e a frase de fechamento, fica a frase._

### Mini-recortes

- **M1 (Você explica):** igual à v4.
- **M2 (A fynd trabalha):** igual à v4, com a linha entre as barras trocada para "Abordando e identificando interesse".
- **M3 (Você vende):** igual à v4 (card da Serra Azul Alimentos, selo **Interessada**, "Assumir conversa").
- **`aria-label`s:**
  - M1: "Exemplo: a Camila explica o que a Lumi Embalagens vende e anexa o site e o catálogo."
  - M2: "Exemplo: 4.860 empresas com o perfil da Lumi, das quais 12 se mostraram interessadas."
  - M3: "Exemplo: a Serra Azul Alimentos pediu amostras. Contato: Renata Moraes, gerente de compras."

---

## 4. Lista × oportunidade

- **Eyebrow (mono):** `A ENTREGA`
- **Título (duas frases, uma por linha):** Não queremos entregar uma lista. Queremos entregar uma oportunidade.
- **Subtítulo:** nenhum.

### Card 1 · Hoje

- **Rótulo mono:** `HOJE`
- **Número grande:** 5.000
- **Título do card:** empresas em uma planilha
- **Texto:** Sua equipe ainda precisa descobrir quem abordar, localizar contatos, enviar mensagens, insistir e qualificar.
- _Visual neutro, sem X vermelho. O "5.000" é ilustração._

### Card 2 · Com a fynd

- **Cabeçalho da coluna (caixa normal, não é eyebrow):** Com a fynd
- **Rótulo mono do card:** `NOVA OPORTUNIDADE`
- **Empresa:** Serra Azul Alimentos · selo **Interessada** (ciano)
- **Meta:** Alimentos · Jundiaí, SP · 320 pessoas

| Rótulo | Valor |
|---|---|
| Contato | Renata Moraes · Gerente de compras |
| Necessidade identificada | Pouch para a linha de biscoitos da nova unidade |
| Interesse demonstrado | Pediu amostras |
| Próximo passo aceito | Receber as amostras e marcar uma reunião |

- _Os quatro rótulos são os do material ("cargo do contato", "Necessidade identificada", "Interesse demonstrado", "Próximo passo aceito"). O card não tem botões nem aderência: aqui ele é um conceito, não a tela._
- _Substitui "Empresa XYZ · Diretor Financeiro" pelo universo fictício, como pede o briefing._
- **Linha sob os cards:** nenhuma.
- **`aria-label` do par:** "Comparação: hoje, uma planilha com 5.000 empresas para a equipe trabalhar. Com a fynd, uma oportunidade com empresa, contato, necessidade identificada, interesse demonstrado e próximo passo aceito."
- **Mobile:** "Hoje" em cima, "Com a fynd" embaixo.

---

## 5. Na prática (demo com pin, 3 etapas)

- **Eyebrow (mono):** `NA PRÁTICA`
- **Título:** Do que você vende à oportunidade.
- **Subtítulo:** Veja como deve funcionar, com a Camila, da Lumi Embalagens, em três telas.
- **Nota pequena (junto ao subtítulo ou sob o MacBook):** Telas ilustrativas. O produto está em desenvolvimento.
- **Indicador de progresso:** `1 Seu produto · 2 Fit · 3 Interessados` · `aria-label` "Etapa X de 3" _(igual à v4)_

| Etapa | Rótulo mono | Título lateral | Texto lateral | Tela |
|---|---|---|---|---|
| 1 | `01 / 03 · SEU PRODUTO` | Você explica o que vende | A Camila manda o CNPJ, o site e o catálogo. A fynd resume o que entendeu e propõe o perfil de quem costuma comprar. Ela aprova, e pronto. | Seu produto |
| 2 | `02 / 03 · FIT` | A fynd começa a trabalhar | Você vê quantas empresas têm o seu perfil, no Brasil todo. Nenhuma lista para a equipe trabalhar: a fynd aborda e identifica quem tem interesse. | Fit |
| 3 | `03 / 03 · INTERESSADOS` | Você recebe a oportunidade | Cada empresa chega com contato, necessidade, interesse demonstrado e próximo passo. A partir daqui, a conversa é sua. | Interessados |

- **Ao soltar o pin:** Quer ver isso com o que a sua empresa vende? · **CTA:** Tenho interesse em testar a fynd
- **Mobile:** os mesmos títulos e textos, empilhados.
- _Se a página passar do limite, esta é a seção a encurtar: corta-se a etapa 2 (o M2 da seção 3 já mostra o volume) e o indicador vira "Etapa X de 2"._

**`aria-label` das telas por etapa**
- 1: igual à v4.
- 2: "Tela Fit da fynd: 4.860 empresas com o perfil da Lumi Embalagens, divididas por setor, região e porte. A abordagem já começou."
- 3: "Tela Interessados da fynd: 12 empresas que responderam e querem saber mais, cada uma com contato, necessidade identificada, interesse demonstrado, próximo passo e aderência. A Serra Azul Alimentos está no topo, com 94%."

---

## Telas da plataforma (o que muda em relação à v4)

- **Shell:** igual à v4, com uma troca: tooltip do badge de notificações "Nova empresa interessada" → **"Nova oportunidade"**.
- **Tela 1 · Seu produto:** igual à v4.
- **Tela 2 · Fit:** igual à v4, com duas trocas na faixa de status, para acompanhar o passo 2:
  - Título: "Abordagem e qualificação em andamento" → **"Abordagem em andamento"**
  - Linha: "A fynd já começou a abordar e qualificar. Quem tiver interesse aparece em Interessados." → **"A fynd já começou a abordar e identificar interesse. Quem responder aparece em Interessados."**
- **Tela 3 · Interessados (e hero):** igual à v4, com dois rótulos de linha do card trocados, para o card da tela e o da seção 4 falarem a mesma língua:
  - "Interesse identificado" → **"Necessidade identificada"** (os valores não mudam: "Pouch para a linha de biscoitos da nova unidade" etc.)
  - "Status" → **"Interesse demonstrado"** (os valores não mudam: "Pediu amostras · respondeu há 2 dias" etc.)
  - "Próximo passo" continua igual (na tela é a ação do cliente: "Enviar amostras e marcar reunião").
  - Título "Interessados", linha de apoio, ordenação, dica de aderência, botões, menu, rodapé, nota fixa e toast: iguais à v4.
- **Painel de detalhe:** igual à v4 (continua fora, por decisão de design). Se entrar, o bloco "Interesse identificado" também vira "Necessidade identificada".

_Se o orquestrador preferir não tocar em `platform-v5`, as telas ficam 100% iguais à v4 e a página continua coerente; as trocas acima são de alinhamento de vocabulário, não de correção._

---

## 6. Mercado em camadas

- **Eyebrow (mono):** `O MERCADO`
- **Título:** O mercado está evoluindo em camadas.
- **Subtítulo:** As categorias se sobrepõem. O que muda é onde cada plataforma concentra valor.

| Nº (mono) | Camada (mono) | Pergunta | Exemplos (ocultos, `SHOW_EXAMPLES = false`) |
|---|---|---|---|
| `01` | `DADOS` | Quem existe e com quem falar? | Speedio · Econodata · Apollo · Seamless |
| `02` | `INTELIGÊNCIA` | Quem vale prospectar agora? | Datlo · Cortex · Demandbase |
| `03` | `EXECUÇÃO` | Como executar a prospecção? | Leads2b · Ramper · 11x · Artisan · AiSDR |
| `04` | `RESULTADO` _(destacada)_ | Oportunidade comercial entregue. | — |

- **Marcador da quarta camada (caixa normal, no lugar dos exemplos):** É aqui que a fynd quer estar.
  - _No material, o marcador é só "FYND". Em caixa normal e com o verbo "quer", ele respeita a marca e o estágio do produto._
- **Linha de síntese (mono):** `DADOS + INTELIGÊNCIA + EXECUÇÃO → RESULTADO`
- **`aria-label` da lista:** "As quatro camadas do mercado: dados, inteligência, execução e resultado. A fynd quer atuar na quarta, a do resultado."
- **`aria-label` da síntese:** "Dados mais inteligência mais execução levam ao resultado."
- _Os nomes da coluna "Exemplos" são do material da cliente e ficam só na estrutura de dados. Não são publicados (decisão 2 do briefing). `[validar com a cliente se quer exibir]`_

---

## 7. A diferença

_Pode se fundir com a seção 6. Nesse caso, o eyebrow `O MERCADO` fica no bloco das camadas e `A DIFERENÇA` no par de frases; a âncora `#a-diferenca` aponta para o início do conjunto._

- **Eyebrow (mono):** `A DIFERENÇA`
- **Frase 1 (apagada, tom secundário):** As ferramentas tradicionais ajudam sua equipe a gerar oportunidades.
- **Frase 2 (em destaque):** A fynd quer gerar a oportunidade para sua equipe.
- **Texto de apoio:** A maioria das plataformas vende uma ou mais partes do processo. A fynd quer vender o resultado.
- **CTA:** nenhum.
- _As duas frases formam o h2 da seção (ou a frase 2 é o h2 e a frase 1, um parágrafo antes dela). A frase 1 não pode ficar só decorativa: o leitor de tela precisa das duas, nessa ordem._
- _Nenhum concorrente é citado. "Ferramentas tradicionais" e "a maioria das plataformas" são as palavras da cliente._

---

## 8. Não é mais uma ferramenta

- **Eyebrow (mono):** `SIMPLES DE PROPÓSITO`
- **Título:** A proposta não é ser mais uma ferramenta.

**Quatro itens** (lista com traço neutro; no material, uma linha corrida)
- Sem configurar IA.
- Sem construir listas.
- Sem montar automações.
- Sem precisar dominar prospecção.

**Card do princípio**
- **Rótulo mono:** `PRINCÍPIO`
- **Frase grande:** Você explica o que vende.
- **Frase de apoio:** A fynd cuida do restante.

- **Linha de fechamento (pequena, sob o conjunto):** A experiência precisa esconder a complexidade, não transferi-la para você.
  - _No pptx: "…não transferi-la para o cliente." Trocado por "para você" porque o leitor é o cliente. `[validar]`_
- **CTA:** nenhum (o encerramento vem logo abaixo).
- _Sai da v4: "Você só precisa vender.", "Não é CRM. Não é chatbot…", a grade de seis itens e a linha dos "25 milhões de CNPJs"._

---

## 9. Encerramento + questionário

### Encerramento

- **Eyebrow (mono):** `PRÓXIMO SINAL`
- **Título:** Você testaria a fynd na sua empresa?
- **Texto:** A fynd está em desenvolvimento. Estamos conversando com empresas para validar a proposta e selecionar os primeiros interessados em um piloto.
- **CTA:** Tenho interesse em testar a fynd _(abre o questionário e leva o foco ao título dele)_
- **Linha sob o botão:** São 11 perguntas. Só as três primeiras são obrigatórias.

### Questionário: moldura

- **Título:** Conte um pouco sobre sua empresa
- **Linha de abertura:** Queremos validar isso com empresas reais. Responda o que souber: só o contato é obrigatório.
- **Indicador de progresso (mono):** `ETAPA 1 DE 4` + nome da etapa em caixa normal ao lado
- **`aria-label` do indicador:** "Etapa X de 4: {nome da etapa}" · anunciado em `aria-live="polite"` a cada troca
- **`aria-label` do formulário:** "Questionário de interesse em testar a fynd"
- **Marca de campo opcional (ao lado do rótulo, etapas 2 a 4):** opcional
- **Botões:** Continuar · Voltar · **Enviar interesse** (última etapa) · estado de envio: Enviando…
- **Fechar (se o design usar painel ou modal):** `aria-label` "Fechar questionário"
- **Linha de privacidade (sob o botão, em todas as etapas ou só na última):** Usamos suas respostas só para avaliar o piloto e falar com você. Não compartilhamos seus dados. `[validar com a política de privacidade]`
- **Foco:** ao avançar ou voltar, o foco vai para o título da etapa. Com erro, vai para o primeiro campo inválido.

_Os rótulos e as opções abaixo são os do HTML da cliente, sem alteração (só "Fynd" → "fynd" na pergunta 10)._

### Etapa 1 de 4 · Contato

- **Título da etapa:** Contato
- **Ajuda da etapa:** Para a gente saber com quem falar.

| # | Rótulo | Tipo | Placeholder | Ajuda | Obrigatório |
|---|---|---|---|---|---|
| 1 | Nome | texto | Seu nome | — | Sim |
| 2 | Empresa | texto | Nome da empresa | — | Sim |
| 3 | E-mail ou WhatsApp | texto | voce@suaempresa.com.br ou (11) 90000-0000 | Um dos dois basta. | Sim |

**Erros**
- Nome vazio: Informe o seu nome.
- Empresa vazia: Informe o nome da empresa.
- Contato vazio: Informe um e-mail ou um WhatsApp para a gente falar com você.
- Contato inválido: Confira o contato. Use um e-mail completo ou um WhatsApp com DDD.
- **Resumo de erro (para leitor de tela, `role="alert"`):** Falta preencher {n} campo(s) para continuar.

### Etapa 2 de 4 · Como vocês vendem hoje

- **Título da etapa:** Como vocês vendem hoje
- **Ajuda da etapa:** Respostas curtas já ajudam.

| # | Rótulo | Tipo | Opções / placeholder |
|---|---|---|---|
| 4 | Como sua empresa gera novos clientes B2B hoje? | texto longo | Ex.: indicações, feiras, ligações do time comercial, anúncios |
| 5 | Vocês fazem prospecção ativa? | escolha única | Sim · Às vezes · Não |
| 6 | Qual é hoje a maior dificuldade para gerar novas oportunidades? | texto longo | Ex.: achar o contato certo, falta de tempo, poucas respostas |

### Etapa 3 de 4 · Investimento e modelo

- **Título da etapa:** Investimento e modelo
- **Ajuda da etapa:** Não é uma proposta de preço. O modelo ainda não está definido, e suas respostas ajudam a desenhá-lo.

| # | Rótulo | Tipo | Opções |
|---|---|---|---|
| 7 | Quanto aproximadamente sua empresa investe por mês em geração de novos clientes? | escolha única | Até R$ 1.000 · R$ 1.000–3.000 · R$ 3.000–5.000 · R$ 5.000–10.000 · Mais de R$ 10.000 · Não sei informar |
| 8 | Por uma solução que encontra, aborda e entrega oportunidades qualificadas, qual investimento mensal faria sentido? | escolha única | Até R$ 500 · R$ 500–1.000 · R$ 1.000–2.000 · R$ 2.000–3.000 · R$ 3.000–5.000 · Mais de R$ 5.000 · Não contrataria nesse modelo |
| 9 | Qual modelo de cobrança você preferiria? | escolha única | Mensalidade fixa · Mensalidade menor + valor por oportunidade · Pagamento por oportunidade qualificada · Pagamento apenas quando virar venda · Outro |

- **Ajuda da pergunta 7:** Some pessoas, ferramentas e mídia. Vale uma estimativa.
- _Nenhuma opção vem marcada (no HTML, o `select` deixava a primeira selecionada, o que distorce a pesquisa). Se o design usar `select` em vez de botões de opção, a primeira entrada é "Selecione"._
- _As faixas têm limites repetidos (R$ 3.000 está em duas). Mantidas como a cliente escreveu. `[validar]`_
- _"Outro" não abre campo de texto, para ficar fiel ao material. `[validar se a cliente quer um campo "Qual?"]`_

### Etapa 4 de 4 · Piloto

- **Título da etapa:** Piloto
- **Ajuda da etapa:** Última etapa.

| # | Rótulo | Tipo | Opções / placeholder |
|---|---|---|---|
| 10 | Qual seria sua maior preocupação em contratar a fynd? | texto longo | Ex.: como a minha empresa seria apresentada, qualidade das oportunidades, custo |
| 11 | Se estivesse disponível hoje, você participaria de um piloto? | escolha única | Sim · Talvez · Não |

- **Botão:** Enviar interesse

### Envio

- **Enviando:** Enviando… _(botão desabilitado; `aria-busy` no formulário)_
- **Erro de envio (`role="alert"`):** Não foi possível enviar agora. Suas respostas continuam aqui. Tente de novo em instantes. · Botão: Tentar de novo
- **Limite de texto (se houver contador):** {n} de 600 caracteres

### Sucesso

- **Título:** Interesse registrado.
- **Texto (piloto = Sim, Talvez ou em branco):** Obrigado, {nome}. Estamos conversando com as empresas interessadas e selecionando as primeiras para o piloto. Vamos falar com você pelo contato informado.
- **Texto (piloto = Não):** Obrigado, {nome}. Suas respostas ajudam a acertar a proposta. Se mudar de ideia sobre o piloto, é só nos chamar.
- **Link:** Voltar ao início
- **Anúncio para leitor de tela (`role="status"`):** Interesse registrado. Obrigado.
- _O sucesso não promete vaga, prazo nem resultado. A frase do protótipo ("Obrigado. Interesse registrado neste protótipo.") perde o "neste protótipo", que era nota interna._
- _O envio continua simulado, como na v4. A nota "A coleta real pode ser conectada ao Tally, Typeform…" do material é para o time, não para o visitante: fica como comentário no ponto de integração do código. `[validar o destino das respostas antes de divulgar a URL]`_

### FAQ

**Não entra.** As três dúvidas que restariam já têm resposta no fluxo: "preciso configurar?" (seções 3 e 8), "vou receber uma lista?" (seção 4), "quanto custa?" (ajuda da etapa 3).

---

## 10. Footer

- **Wordmark:** `fynd`
- **Linha:** Você vende. A fynd encontra.
- **Rótulo mono:** `VALIDAÇÃO DE MERCADO · 2026` _(no material: "fynd · validação de mercado · 2026"; o nome fica no wordmark, fora do rótulo em maiúsculas)_
- **Âncoras:** Como funciona · Na prática · A diferença · Quero testar
- **`aria-label` da navegação:** "Rodapé"
- **Contato:** contato@fynd.com.br `[validar]`
- **Links legais:** Privacidade · Termos `[validar se existem]`
- **Direitos:** © 2026 fynd. Todos os direitos reservados.

---

## Microcopy e `aria-label`s (resumo para o dev)

| Onde | Texto |
|---|---|
| CTA longo (hero, fim da demo, encerramento, header largo) | Tenho interesse em testar a fynd |
| CTA curto (header compacto, pill, footer) | Quero testar |
| CTA secundário do hero | Ver como funciona ↓ |
| CTA discreto da seção 3 | Ver na prática ↓ |
| Pill do hero | Em desenvolvimento · selecionando empresas para o piloto |
| Zero setup (hero) | **Zero setup.** Você explica o que vende. A fynd cuida do restante. |
| Nota da demo | Telas ilustrativas. O produto está em desenvolvimento. |
| Sob o CTA do encerramento | São 11 perguntas. Só as três primeiras são obrigatórias. |
| Questionário: navegação | Continuar · Voltar · Enviar interesse · Enviando… · Tentar de novo |
| Questionário: campo opcional | opcional |
| Sucesso | Interesse registrado. |
| Link para pular | Pular para o conteúdo |
| Menu mobile | Abrir menu / Fechar menu |

Constantes sugeridas em `anchors-v5.ts`: `CTA_LABEL_V5 = "Tenho interesse em testar a fynd"` · `CTA_SHORT_LABEL_V5 = "Quero testar"`. O CTA longo nunca recebe `uppercase`.

---

## Tamanho em relação à v4

| | v4 | v5 |
|---|---|---|
| Problema | 3 pares "Hoje × Com a fynd" + frase + lista cinza | 4 linhas de uma frase |
| Como funciona | subtítulo + 3 passos + faixa com frase | 3 passos de uma frase + frase de fechamento (faixa opcional) |
| Lista × oportunidade | (não existia) | 2 cards |
| Demo | 3 etapas | 3 etapas (candidata a 2) |
| Camadas + diferença | (não existiam) | 4 linhas + 2 frases, podem ser uma seção |
| "Você só precisa vender" / "Não é ferramenta" | 4 negações + 6 itens + 2 frases + linha da base | 4 itens + card de 2 frases + 1 linha |
| Para quem | 2 colunas + 11 chips | sai |
| Encerramento | formulário de 5 campos + FAQ de 5 perguntas | título + texto + CTA; questionário em 4 etapas, uma por vez; sem FAQ |

---

## Decisões tomadas (modo direto)

1. **Hero:** "Você vende. A fynd encontra.", em duas frases com ponto. Subtítulo literal da cliente.
2. **Linha de zero setup:** "Zero setup. Você explica o que vende. A fynd cuida do restante." A da v4 ("Contratou, já está funcionando.") sai, por falar de produto pronto.
3. **CTA único:** "Tenho interesse em testar a fynd"; versão curta "Quero testar". Some "Garantir minha vaga" de toda a página.
4. **Pill do hero:** "Em desenvolvimento · selecionando empresas para o piloto". O "validação de mercado · 2026" do material vai para o footer.
5. **Passo 2:** versão do HTML ("aborda e identifica interesse"), não a do pptx ("aborda e conversa").
6. **Card "Hoje":** texto do pptx (como manda o briefing), não o do HTML ("filtrar, pesquisar, abordar, acompanhar e qualificar").
7. **Card "Nova oportunidade":** Serra Azul Alimentos, com os quatro rótulos da cliente e o selo "Interessada". "Próximo passo aceito" descreve o que a empresa aceitou ("Receber as amostras e marcar uma reunião").
8. **Quarta camada:** marcador "É aqui que a fynd quer estar.", em caixa normal, no lugar de "FYND".
9. **Seção 8:** "…não transferi-la para você", no lugar de "para o cliente".
10. **Faixa do ciclo:** opcional; rótulo "Por trás de cada oportunidade"; perde a frase "A complexidade fica com a fynd." para não repetir a seção 8.
11. **Demo:** títulos laterais espelham os três passos (Você explica / A fynd começa a trabalhar / Você recebe a oportunidade) e ganha a nota "Telas ilustrativas".
12. **Telas:** só trocas de rótulo (duas no card de Interessados, duas na faixa de status do Fit, uma no tooltip). Nenhum dado muda.
13. **Questionário:** 4 etapas (3 + 3 + 3 + 2 perguntas), rótulos e opções literais, nenhuma opção pré-marcada, só a etapa 1 obrigatória, ajuda na etapa 3 dizendo que não é proposta de preço, sucesso com duas variantes conforme a resposta do piloto.
14. **Sem FAQ e sem "Para quem".**
15. **Títulos acima de 8 palavras** (seções 4 e 7) foram mantidos por serem frases da cliente.
16. **"SDRs"** mantido na peça 01, por ser a palavra da cliente.

## Pendências `[validar]`

1. **Destino das respostas do questionário** (hoje simulado). Sem isso, a URL não pode ser divulgada: quem responder não será registrado.
2. **Linha de privacidade** do questionário e links Privacidade/Termos. As perguntas pedem dados de contato e de investimento.
3. **Contato do footer** (contato@fynd.com.br).
4. **Exemplos de empresas nas camadas:** ficam ocultos. Confirmar com a cliente se ela aceita a seção sem os nomes.
5. **Faixas de valor** das perguntas 7 e 8 (limites repetidos) e campo de texto para "Outro" na pergunta 9.
6. **"SDRs"** na peça 01: manter ou trocar por "um time de prospecção".
7. **"…não transferi-la para você"** (era "para o cliente").
8. **Universo fictício e números das telas** como ilustração (pendência herdada da v4), agora com a nota "Telas ilustrativas".
9. **Imagem OG própria da `/v5`** ou herdar a da v4.
10. **Trocas de rótulo nas telas** ("Necessidade identificada", "Interesse demonstrado"): confirmar com o orquestrador se valem o toque em `platform-v5`.

---

## Rastreabilidade: material da cliente → v5

| # | Bloco do material | Onde foi parar na v5 |
|---|---|---|
| 1 | `<title>` "Fynd — Você vende. A Fynd encontra." | SEO: `title`, com `fynd` minúsculo e "·" no lugar do travessão |
| 2 | Topo: wordmark + "validação de mercado · 2026" | Header (wordmark) e footer (rótulo mono). No hero, o estágio aparece no pill "Em desenvolvimento · selecionando empresas para o piloto" |
| 3 | Eyebrow "geração de oportunidades b2b" | Hero: eyebrow, literal |
| 4 | h1 "Você vende. A Fynd encontra." | Hero: h1, literal (`fynd` minúsculo); também linha do footer e `og:title` |
| 5 | Subtítulo "Uma nova forma de gerar oportunidades comerciais…" | Hero: subtítulo, literal; base da `description` |
| 6 | Botão "Tenho interesse em testar a Fynd" | CTA único da página (header, hero, fim da demo, encerramento) |
| 7 | Barra ciano "signal" no hero | Sai como forma (o design do material não é referência). A ideia fica no ponto aceso do hero |
| 8 | h2 "Gerar novos clientes B2B ainda é complexo." | Seção 2: título, literal |
| 9 | "Para prospectar bem, uma empresa precisa coordenar várias peças…" | Seção 2: subtítulo, literal |
| 10 | 01 Pessoas · 02 Dados · 03 Ferramentas · 04 Operação | Seção 2: as quatro linhas, literais |
| 11 | Eyebrow "zero setup" | Seção 3: eyebrow; também a linha de zero setup do hero |
| 12 | h2 "E se o processo fosse muito mais simples?" | Seção 3: título, literal |
| 13 | Passo 01 "Você explica" + texto | Seção 3: passo 1, literal; título lateral da etapa 1 da demo; rótulo do card flutuante 1 |
| 14 | Passo 02 "A Fynd trabalha" + "Entende seu negócio, encontra empresas, aborda e identifica interesse." | Seção 3: passo 2, literal; eco na etapa 2 da demo, no M2 e na faixa de status do Fit |
| 15 | Passo 03 "Você vende" + texto | Seção 3: passo 3, literal |
| 16 | h2 "Não queremos entregar uma lista. Queremos entregar uma oportunidade." | Seção 4: título, literal |
| 17 | Card "hoje · 5.000 · empresas em uma planilha" | Seção 4: card 1, literal |
| 18 | Texto do card hoje (HTML): "…filtrar, pesquisar, abordar, acompanhar e qualificar." | Substituído pela versão do pptx (item 33), por orientação do briefing |
| 19 | Card "nova oportunidade · Empresa XYZ · Diretor Financeiro" | Seção 4: card 2, com Serra Azul Alimentos e Renata Moraes · Gerente de compras (universo fictício) |
| 20 | "Necessidade identificada · Interesse demonstrado · Próximo passo aceito" | Seção 4: rótulos do card 2, literais, com valores; os dois primeiros também viram rótulos do card na tela Interessados |
| 21 | h2 "O mercado está evoluindo em camadas." | Seção 6: título, literal |
| 22 | "As categorias se sobrepõem. O que muda é onde cada plataforma concentra valor." | Seção 6: subtítulo, literal |
| 23 | Camadas 01 a 04 com as perguntas | Seção 6: literais |
| 24 | Exemplos de empresas por camada (Speedio, Econodata, Apollo…) | Fora do texto publicado; ficam na estrutura de dados, atrás de `SHOW_EXAMPLES = false` (risco de citar marcas de terceiros) |
| 25 | "FYND" na quarta camada | Seção 6: marcador "É aqui que a fynd quer estar.", em caixa normal |
| 26 | Eyebrow "a diferença" + "As ferramentas tradicionais ajudam sua equipe a gerar oportunidades." | Seção 7: eyebrow e frase 1, literais; âncora do header |
| 27 | "A Fynd quer gerar a oportunidade para sua equipe." | Seção 7: frase 2, literal |
| 28 | "A maioria das plataformas vende uma ou mais partes do processo. A Fynd quer vender o resultado." | Seção 7: texto de apoio, literal |
| 29 | Linha ciano de destaque sob a frase | Sai (design do material) |
| 30 | h2 "A proposta não é ser mais uma ferramenta." + "Sem configurar IA. Sem construir listas…" | Seção 8: título e os quatro itens, literais |
| 31 | Card "princípio · Você explica o que vende. · A Fynd cuida do restante." | Seção 8: card, literal; também a linha de zero setup do hero |
| 32 | Eyebrow "próximo sinal" + h2 "Você testaria a Fynd na sua empresa?" + texto "A Fynd está em desenvolvimento…" | Seção 9: encerramento, literais; base da `description`, do pill e da mensagem de sucesso |
| 33 | pptx: "Sua equipe ainda precisa descobrir quem abordar, localizar contatos, enviar mensagens, insistir e qualificar." | Seção 4: texto do card "Hoje" |
| 34 | pptx: "Você conhece seu produto. A fynd cuida da busca." | Seção 3: frase de fechamento |
| 35 | pptx: "A experiência precisa esconder a complexidade, não transferi-la para o cliente." | Seção 8: linha de fechamento, com "para você" |
| 36 | pptx: "Queremos validar isso com empresas reais." | Seção 9: linha de abertura do questionário |
| 37 | pptx: "DADOS + INTELIGÊNCIA + EXECUÇÃO → RESULTADO" | Seção 6: linha de síntese |
| 38 | pptx, passo 2: "Entende o negócio, encontra empresas, aborda e conversa." | Não usada como texto do passo (fica a do HTML). "Conversar" aparece na faixa do ciclo |
| 39 | Título do formulário "Conte um pouco sobre sua empresa" | Seção 9: título do questionário, literal |
| 40 | "Protótipo de validação. A coleta real pode ser conectada ao Tally, Typeform…" | Sai do texto visível (nota interna). Vira comentário no ponto de integração e pendência 1 |
| 41 | Nome · Empresa · E-mail ou WhatsApp | Questionário, etapa 1, literais e obrigatórios |
| 42 | "Como sua empresa gera novos clientes B2B hoje?" · "Vocês fazem prospecção ativa?" (Sim / Às vezes / Não) · "Qual é hoje a maior dificuldade…" | Questionário, etapa 2, literais |
| 43 | "Quanto aproximadamente sua empresa investe por mês…" (6 faixas) · "Por uma solução que encontra, aborda e entrega…" (7 faixas) · "Qual modelo de cobrança você preferiria?" (5 opções) | Questionário, etapa 3, literais, sem opção pré-marcada |
| 44 | "Qual seria sua maior preocupação em contratar a Fynd?" · "Se estivesse disponível hoje, você participaria de um piloto?" (Sim / Talvez / Não) | Questionário, etapa 4, literais (`fynd` minúsculo) |
| 45 | Botão "Enviar interesse" | Questionário: botão da última etapa, literal |
| 46 | "Obrigado. Interesse registrado neste protótipo." | Sucesso: "Interesse registrado." + "Obrigado, {nome}…", sem "neste protótipo" |
| 47 | Footer "fynd · validação de mercado · 2026" | Footer: wordmark + rótulo mono |

**Entrou na v5 sem estar no material** (herdado da v4 ou exigido pelo briefing): seção 5 "Na prática" com as três telas; mini-recortes e faixa do ciclo na seção 3; cards flutuantes do hero; linha de zero setup; nota "Telas ilustrativas"; linha de privacidade; ajudas, placeholders e erros do questionário; âncoras do header e do footer.

**Saiu da v4:** "Garantir minha vaga" e "acesso antecipado"; o contraste com X vermelho e "Troque o lead frio pelo lead quente."; "Você só precisa vender" e "Não é CRM…"; a linha dos 25 milhões de CNPJs; a seção "Para quem"; o FAQ; o formulário curto.
