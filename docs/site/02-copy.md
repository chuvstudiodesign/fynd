# 02 — Copy do site da fynd

_Etapa 2 do `/site` · agente `site-copy` · 2026-10-01_
_Base: `00-briefing.md`, `01-arquitetura.md`, `BRAND_FOUNDATION_FYND.md` §7–8, `DESIGN_PLAYBOOK.md` §4 (Linguagem verbal)._

Público: o empreendedor que ainda prospecta na mão e o líder comercial que precisa gerar pipeline. O texto fala do dia a dia deles, não da marca. Tudo o que está marcado `[validar]` é placeholder e não pode ir ao ar sem confirmação.

**Regras usadas em todo o documento**
- Assinatura sempre `fynd`, em minúsculas, inclusive no início de frase.
- Ciano/sinal só no item ativo. O copy não descreve cor; isso é para o dev.
- Sem "protótipo", "IA que faz tudo", "leads garantidos", "revolucionário" ou "mágica", e sem urgência falsa.
- A decisão de contato é sempre humana. A fynd sugere, mas não envia nada.

---

## Universo fictício do produto (coerente entre todas as telas)

Use estes dados em todas as telas (A–E) e no hero. Os nomes são genéricos e inventados, e os CNPJs começam com `00.` para nunca coincidirem com uma empresa real.

**Quem usa a fynd (a conta logada)**
- Usuária: **Camila Rocha**, Diretora comercial
- Empresa dela: **Lumi Embalagens**, que fabrica embalagens flexíveis para alimentos e cosméticos
- _Nota para o dev:_ o demo atual usa "Mariana Pillati" no rodapé da sidebar. No site, troque por Camila Rocha para não expor um nome real.

**Perfil ideal ativo:** `Indústria Sudeste`
- Setor: alimentos e cosméticos
- Região: SP, MG, RJ e ES
- Porte: de 200 a 500 pessoas
- Sinal: filial aberta nos últimos 12 meses

**Lista priorizada (a ordem final da tela A)**

| # | Empresa | Linha de contexto (`meta`) | Aderência |
|---|---|---|---|
| 1 | **Serra Azul Alimentos** _(ativa)_ | Alimentos · Jundiaí, SP · 320 pessoas | 92% |
| 2 | Bem Natural Cosméticos | Cosméticos · Contagem, MG · 410 pessoas | 84% |
| 3 | Laticínios Vale Verde | Alimentos · Juiz de Fora, MG · 260 pessoas | 77% |
| 4 | Casa Doce Biscoitos | Alimentos · Vila Velha, ES · 230 pessoas | 71% |
| 5 | Prisma Higiene Pessoal | Cosméticos · Campinas, SP · 480 pessoas | 64% |
| 6 | Grão Fino Cafés | Alimentos · Varginha, MG · 210 pessoas | 58% |

Na etapa 2 da demo, a lista começa fora de ordem (por exemplo 71, 92, 58, 84, 64, 77) e se reordena até chegar a esta.

---

## SEO e compartilhamento

- **`title`:** `fynd · Saiba para quem vender agora`
- **`description` (cerca de 155 caracteres):** `Descreva o seu cliente ideal numa conversa. A fynd encontra as empresas com maior potencial, mostra por que cada uma importa e sugere o primeiro contato.`
- **Open Graph `og:title`:** `fynd · Saiba para quem vender agora`
- **Open Graph `og:description`:** `Menos lista fria. Mais clareza para vender. Empresas priorizadas para o seu perfil de cliente ideal, com contexto e uma sugestão de abordagem.`
- **Texto da imagem OG (1200×630):** título "Saiba para quem vender agora." e, embaixo, um recorte da tela A com Serra Azul Alimentos ativa (92%). Wordmark `fynd` no canto.
- **`og:site_name`:** `fynd`
- **`lang`:** `pt-BR`

---

## 0. Header

- **Wordmark:** `fynd`, com link para o topo. `aria-label`: "fynd, voltar ao início"
- **Âncoras:** Como funciona · Dados · Para quem
- **Botão:** Pedir acesso antecipado
- **Mobile:** o botão do menu tem `aria-label` "Abrir menu" ou "Fechar menu". Dentro do menu ficam as mesmas três âncoras e o botão.
- **Link de pular (acessibilidade):** "Pular para o conteúdo"

---

## 1. Hero com MacBook

### Título: 3 opções

| | Título | Leitura |
|---|---|---|
| **Recomendado** | **Saiba para quem vender agora.** | Fala da dor mais concreta do empreendedor, que é não saber por onde começar. Tem 5 palavras, é ação imediata, não promete volume e conversa direto com a tela "Oportunidades da semana" logo abaixo. |
| Alternativa 1 | Ilumine as oportunidades certas. | Mais elegante e de marca, mas mais abstrata. Funciona melhor como linha institucional no footer. |
| Alternativa 2 | Menos lista fria. Mais clareza para vender. | Tem o melhor contraste dor/benefício, só que é mais longa e começa pelo negativo. Fica como frase de apoio na seção 2 ou no OG. |

### Copy do hero
- **Eyebrow (mono):** `PROSPECÇÃO B2B COM CONTEXTO`
- **Título:** Saiba para quem vender agora.
- **Subtítulo:** Conte quem é o seu cliente ideal. A fynd encontra as empresas com maior potencial de compra, mostra por que cada uma faz sentido e sugere o primeiro contato.
- **CTA principal:** Pedir acesso antecipado
- **CTA secundário:** Ver como funciona
- **Microlinha sob os botões (opcional):** Sem implantação longa. Você começa com uma conversa.
- **MacBook:** tela A (ver "Telas da plataforma"), com Serra Azul Alimentos ativa.
- **`alt` / `aria-label` do mockup:** "Tela de oportunidades da fynd: lista de empresas ordenadas por aderência ao perfil ideal, com Serra Azul Alimentos no topo, com 92%."

---

## 2. O problema

- **Eyebrow:** `O DIA A DIA DE QUEM VENDE`
- **Título (revelado por palavra no scroll):** Mais dados não resolvem. Clareza resolve.
- **Subtítulo:** Você não precisa de uma lista maior. Precisa saber onde gastar o tempo do seu time.

**3 dores em colunas**

1. **Listas frias e desatualizadas**
   Você compra uma lista, liga para metade dela e descobre que a empresa mudou, fechou ou nunca teve perfil.
2. **Horas montando planilha**
   Filtrar CNAE, cruzar cidade e porte e limpar duplicadas toma a manhã inteira antes da primeira ligação.
3. **Time ligando no escuro**
   Sem critério claro, cada vendedor escolhe de um jeito. O esforço é grande e a resposta é pouca.

- **Frase de transição (fim da seção, junto do contraste "lista cinza → uma linha iluminada"):** Menos lista fria. Mais clareza para vender.
- **CTA:** nenhum.

---

## 3. Como funciona (3 passos)

- **Eyebrow:** `COMO FUNCIONA`
- **Título:** Da conversa à próxima ligação.
- **Subtítulo:** São três passos, sem planilha no meio.

| Passo | Rótulo mono | Título | Texto | Mini-UI (tela E) |
|---|---|---|---|---|
| 1 | `01 · DESCREVA` | Conte quem você quer atender | Explique o seu cliente ideal do seu jeito: setor, região, porte, o que importa para você. | Recorte da tela B: a mensagem da Camila e os chips |
| 2 | `02 · RECEBA` | Veja quem tem mais potencial | A fynd cruza o seu perfil com bases empresariais e ordena as empresas por aderência, com o contexto de cada uma. | Recorte da tela A: os 3 primeiros cards |
| 3 | `03 · ABORDE` | Comece com a mensagem certa | Receba uma sugestão de primeiro contato baseada no contexto da empresa. Você revisa e decide. | Recorte da tela D: o trecho destacado do e-mail |

- **CTA secundário discreto:** Ver na prática ↓

---

## 4. Demonstração guiada (pin de scroll)

- **Eyebrow:** `NA PRÁTICA`
- **Título da seção (antes do pin):** Uma manhã de prospecção em quatro telas.
- **Subtítulo:** Acompanhe a Camila, da Lumi Embalagens, encontrando as próximas contas para o time.
- **Indicador de progresso:** `1 Conversa · 2 Prioridades · 3 Contexto · 4 Abordagem`, com `aria-label` "Etapa X de 4"

| Etapa | Rótulo mono | Título lateral | Texto lateral | Tela |
|---|---|---|---|---|
| 1 | `01 / 04 · CONVERSA` | Comece pelo seu cliente ideal | Explique quem você quer atender, do seu jeito. A fynd transforma a conversa em critérios claros que você pode ajustar. | B |
| 2 | `02 / 04 · PRIORIDADES` | As empresas certas, na ordem certa | A fynd cruza o seu perfil com bases empresariais e coloca no topo as empresas com maior potencial. | A |
| 3 | `03 / 04 · CONTEXTO` | Saiba por que antes de ligar | Cada empresa mostra os critérios que atende, os sinais encontrados e a fonte de cada dado. Você investe a ligação com segurança. | C |
| 4 | `04 / 04 · ABORDAGEM` | Um primeiro contato que faz sentido | Receba uma sugestão de mensagem a partir do contexto da empresa. Você revisa, ajusta e envia pelo seu canal. | D |

- **Ao soltar o pin:**
  - Linha: Pronto para ver isso com o seu cliente ideal?
  - **CTA principal:** Pedir acesso antecipado
- **Mobile (blocos empilhados):** os mesmos títulos e textos, na mesma ordem.

---

## Telas da plataforma (textos dentro do MacBook)

### Elementos comuns (app shell)
- **Sidebar, topo:** wordmark `fynd`
- **Navegação:** Visão geral · Oportunidades `12` · Conversas `3` · Propostas
- **Grupo:** Perfis ideais
  - Indústria Sudeste _(ativo, ícone com sinal)_
  - Cosméticos SP
  - Food service Sul
  - Ação do grupo: "Novo perfil"
- **Rodapé da sidebar:** Camila Rocha · Diretora comercial
- **Busca no topo (placeholder):** Buscar empresa ou CNPJ

### Tela A: Oportunidades (lista)
- **Breadcrumb:** Perfis ideais / Indústria Sudeste
- **Título:** Oportunidades da semana
- **Linha de apoio:** 12 empresas priorizadas · atualizado hoje às 8h
- **Chips de critério (somente leitura):** Alimentos e cosméticos · Sudeste · 200 a 500 pessoas · Filial recente
- **Ordenação:** Ordenar por: Aderência
- **Lista:** a tabela do "Universo fictício", com Serra Azul Alimentos ativa
- **Sobre a lista, linha discreta:** Ordenado pela aderência ao seu perfil ideal
- **Botão secundário no topo:** Ajustar perfil
- **Rodapé da lista:** Ver as 12 oportunidades

### Tela B: Conversa do cliente ideal
- **Cabeçalho da conversa:** Novo perfil ideal
- **Mensagem da Camila (digitando):**
  > Vendo embalagens flexíveis. Quero indústrias de alimentos e cosméticos no Sudeste, entre 200 e 500 pessoas. Se estiverem abrindo filial, melhor ainda.
- **Resposta da fynd:**
  > Entendi. Vou buscar empresas com estes critérios:
- **Chips de critérios extraídos (rótulo: valor):**
  - Setor: Alimentos, Cosméticos
  - Região: SP, MG, RJ, ES
  - Porte: 200 a 500 pessoas
  - Sinal: Filial aberta nos últimos 12 meses
- **Continuação da fynd:**
  > Quer ajustar algo antes de eu buscar?
- **Botões:** Buscar empresas (principal) · Ajustar critérios
- **Mensagem de resultado (depois do clique, faz a ponte para a tela A):**
  > Encontrei 148 empresas compatíveis e priorizei as 12 com maior aderência. Salvei como "Indústria Sudeste".
- **Campo de entrada (placeholder):** Descreva o seu cliente ideal…
- **Nota sob o campo:** Você pode refinar o perfil a qualquer momento.
- _Nota:_ "148" e "12" são números de interface do exemplo, não métricas de produto.

### Tela C: Detalhe da empresa (drawer sobre a lista)
- **Cabeçalho:** avatar "SA" · **Serra Azul Alimentos** · Jundiaí, SP
- **Selo de aderência:** 92% de aderência ao perfil Indústria Sudeste
- **Bloco "Dados cadastrais":**
  - CNPJ: 00.418.273/0001-00
  - Situação: Ativa
  - CNAE principal: 1092-9/00 · Fabricação de biscoitos e bolachas
  - Porte: Médio
  - Faixa de funcionários: 200 a 500
  - Cidade: Jundiaí, SP
  - Em atividade desde: 2007 (19 anos)
  - Filiais: 2
- **Bloco "Por que está no topo":** cada linha com check
  - ✓ Indústria de alimentos (CNAE 10)
  - ✓ Sede no Sudeste (SP)
  - ✓ Faixa de 200 a 500 pessoas
  - ✓ Nova filial registrada em 2026 em Uberlândia, MG
- **Bloco "Sinais de contexto":**
  - Abriu filial em Uberlândia, MG, em março de 2026
  - Incluiu CNAE secundário de fabricação de produtos para snacks em 2025
- **Fonte (linha mono pequena):** `Fontes: Receita Federal (CNPJ, CNAE, situação, filiais) · Base fynd (faixa de funcionários)`
- **Botões:** Sugerir abordagem (principal) · Salvar na lista
- _Nota de verdade de produto:_ todos os sinais acima vêm de dados cadastrais (filial e CNAE). Não use sinais como "está contratando" ou "saiu na imprensa" até confirmar que a base própria os oferece `[validar]`. A faixa de funcionários vem da base fynd porque a Receita não informa número de pessoas `[validar com produto]`.

### Tela D: Sugestão de abordagem
- **Título do painel:** Sugestão de primeiro contato
- **Para:** Serra Azul Alimentos · Compras
- **Canal (seletor):** E-mail · LinkedIn `[validar canais disponíveis no MVP]`
- **Tom (seletor):** Direto · Consultivo · Próximo _(Consultivo selecionado)_
- **Assunto:** Embalagens para a nova unidade de Uberlândia
- **Corpo (rascunho editável):**
  > Olá, [nome],
  >
  > Vi que a Serra Azul **abriu uma unidade em Uberlândia neste ano**. Expansões assim costumam pedir mais volume de embalagem e entregas mais rápidas na nova região.
  >
  > Sou da Lumi Embalagens. Atendemos indústrias de alimentos em SP e MG com embalagens flexíveis para biscoitos e snacks.
  >
  > Faz sentido conversarmos 15 minutos na próxima semana sobre como vocês vão abastecer a nova unidade?
  >
  > Abraço,
  > Camila Rocha
  > Lumi Embalagens
- **Destaque do ponto de conexão (o trecho em negrito), com etiqueta ao lado:** Ponto de conexão: nova filial
- **Botões:** Copiar (principal) · Ajustar
- **Feedback ao copiar (toast):** Mensagem copiada.
- **Nota fixa no rodapé do painel:** Você revisa antes de enviar. A fynd não envia mensagens por você.
- _Nota:_ o "[nome]" fica de propósito. Não inventamos contato pessoal. Só troque por um nome se o MVP mostrar contatos `[validar]`.

### Tela E: mini-UIs dos 3 passos (seção 3)
- **E1 (Descreva):** só a mensagem da Camila (versão curta: "Indústrias de alimentos e cosméticos no Sudeste, 200 a 500 pessoas.") e os chips "Alimentos", "Sudeste" e "200 a 500".
- **E2 (Receba):** os 3 primeiros cards: Serra Azul Alimentos 92% _(ativo)_, Bem Natural Cosméticos 84% e Laticínios Vale Verde 77%.
- **E3 (Aborde):** a linha do assunto e a frase destacada: "Vi que a Serra Azul abriu uma unidade em Uberlândia neste ano." Abaixo, o botão "Copiar".

---

## 5. De onde vêm os dados

- **Eyebrow:** `DADOS`
- **Título:** Dados públicos, organizados para vender.
- **Subtítulo:** Toda prioridade tem fonte e critério. Você vê de onde veio cada informação.

**Blocos**
1. **CNPJs da Receita Federal, organizados**
   Os dados cadastrais oficiais (CNAE, porte, situação, endereço e filiais) chegam limpos e prontos para filtrar, sem planilha.
2. **Base própria de contas corporativas**
   Informações sobre as empresas que complementam o cadastro público e ajudam a entender o porte e o momento de cada conta. `[validar o que a base contém]`
3. **Critério que você consegue explicar**
   Cada empresa mostra quais critérios atende e por que subiu na lista. Seu time sabe por que está ligando.

- **Linha sobre uso responsável:** Trabalhamos com dados empresariais e seguimos a LGPD no tratamento das informações. `[validar redação com jurídico]`
- **Rótulos do diagrama:** Seu perfil ideal + Receita Federal + Base fynd → Lista priorizada
- **Números de escala (só se validados):** `[validar]` "+ de XX milhões de CNPJs organizados" · "Atualização [mensal]". Se não houver número confirmado, o bloco sai sem contador.

---

## 6. Para quem / quanto esforço

- **Eyebrow:** `PARA QUEM`
- **Título:** Para quem vende e para quem lidera.
- **Subtítulo:** Funciona para quem prospecta sozinho e para quem organiza um time inteiro.

**Coluna 1: Para quem vende sozinho ou lidera uma operação pequena**
- **Título:** Você vende, a fynd aponta o caminho.
- **Texto:** Descreva o seu cliente ideal e saia com uma lista curta de empresas para procurar hoje. Sem montar planilha, sem contratar ninguém para isso.
- **Itens:**
  - Lista pronta em uma conversa
  - Contexto de cada empresa antes de ligar
  - Sugestão de primeira mensagem

**Coluna 2: Para quem lidera um time comercial**
- **Título:** Seu time nas contas certas.
- **Texto:** Defina os perfis ideais uma vez e dê ao time a mesma prioridade, com critério explicável para cada conta.
- **Itens:**
  - Perfis ideais compartilhados
  - Critério transparente para cada prioridade
  - Contexto para orientar a abordagem

**3 garantias de esforço (faixa abaixo das colunas)**
1. **Sem implantação longa.** Você começa por uma conversa.
2. **Sem planilha para montar.** A fynd organiza e prioriza.
3. **Você decide o contato.** A fynd sugere, e você revisa e envia.

- **Depoimento:** `[validar]`. Só entra com cliente piloto real e autorização. Formato: citação de até 2 linhas, mais nome, cargo e empresa. **Se não houver, o bloco sai.** Não usar depoimento fictício.
- **Link secundário:** Quero ver com o meu perfil →, com âncora para a seção 7.

---

## 7. CTA final + formulário

- **Eyebrow:** `ACESSO ANTECIPADO`
- **Título (recomendado):** Encontre o próximo sinal.
  - Alternativa: Comece pela conversa certa.
- **Subtítulo:** A fynd está em acesso antecipado. Conte quem é o seu cliente ideal e mostramos as primeiras oportunidades numa demonstração.
  - Não usar "vagas limitadas" até confirmar `[validar]`.

### Formulário
| Campo | Rótulo | Placeholder | Obrigatório |
|---|---|---|---|
| Nome | Nome | Seu nome | Sim |
| E-mail | E-mail corporativo | voce@suaempresa.com.br | Sim |
| Empresa | Empresa | Nome da empresa | Sim |
| Cargo | Cargo | Ex.: Diretora comercial | Sim |
| Cliente ideal | Quem é o seu cliente ideal? _(opcional)_ | Ex.: indústrias de alimentos no Sudeste, de 200 a 500 pessoas | Não |

- **Botão:** Pedir acesso antecipado
- **Botão enviando:** Enviando…
- **Linha sob o botão:** Respondemos por e-mail. Sem spam e sem compartilhar seus dados. `[validar com a política de privacidade]`

**Mensagens de erro**
- Campo vazio: Preencha este campo.
- E-mail inválido: Confira o e-mail. Ex.: voce@suaempresa.com.br
- E-mail pessoal (opcional, sem bloquear): Se puder, use o e-mail da empresa. Ajuda a preparar a demonstração.
- Falha no envio: Não conseguimos enviar agora. Tente de novo em instantes.

**Estado de sucesso**
- **Título:** Pedido recebido.
- **Texto:** Obrigado, {nome}. Vamos entrar em contato pelo e-mail informado para marcar a demonstração.
- **Link:** Voltar ao início

### FAQ (4 perguntas)
- **Título do bloco:** Perguntas frequentes

1. **A fynd envia mensagens por mim?**
   Não. A fynd sugere um primeiro contato com base no contexto da empresa. Você revisa, ajusta e envia pelo seu próprio canal. A decisão é sempre sua.

2. **De onde vêm os dados?**
   Dos CNPJs da Receita Federal, organizados para consulta, e de uma base própria de contas corporativas. Cada empresa mostra a fonte das informações e os critérios que a colocaram na lista.

3. **Preciso integrar meu CRM para começar?**
   Não. Você começa descrevendo o seu cliente ideal numa conversa. Se o seu time usa um CRM, conte na demonstração para entendermos o melhor caminho. `[validar: integrações e exportação disponíveis]`

4. **Quanto custa?**
   Estamos em acesso antecipado e as condições são apresentadas na demonstração, de acordo com o tamanho do seu time.

---

## 8. Footer

- **Wordmark:** `fynd`
- **Linha institucional:** Ilumine as oportunidades certas.
- **Âncoras:** Como funciona · Dados · Para quem · Acesso antecipado
- **Contato:** contato@fynd.com.br `[validar]`
- **Links legais:** Privacidade · Termos `[validar se existem]`
- **Direitos:** © 2026 fynd. Todos os direitos reservados.
- Sem redes sociais até confirmar os perfis.

---

## Pendências `[validar]` levantadas pelo copy

1. Os canais da sugestão de abordagem no MVP (e-mail, LinkedIn, WhatsApp) e se ela já existe.
2. O que a base própria contém: faixa de funcionários e outros sinais além do cadastro.
3. Os números de escala da base e a frequência de atualização (seção 5).
4. Integrações com CRM e exportação (FAQ 3).
5. A redação sobre LGPD e a linha de privacidade do formulário.
6. O e-mail de contato e se há páginas de privacidade e termos.
7. Um depoimento de cliente piloto, só se for real e autorizado.
8. O hero final: "Saiba para quem vender agora." é a recomendação, mas ainda é um território de teste.
