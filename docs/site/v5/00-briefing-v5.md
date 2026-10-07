# Briefing: site v5 (validação de mercado, a partir do material da cliente)

_Aberto em 2026-10-07 pelo orquestrador, a pedido do Lucas, em modo direto (trabalho em segundo plano, sem portões)._

## Fontes obrigatórias
- `docs/site/v5/material-cliente/Fynd_Landing_Page_Branding.html`: protótipo de landing enviado pela cliente. **Vale só pelo conteúdo (o que dizer e em que ordem). O design dele NÃO é referência.**
- `docs/site/v5/material-cliente/` (pptx "Validação de mercado · MASI", 8 slides): mesmo conteúdo do HTML, com três frases a mais, transcritas abaixo.
- Base de design, motion e código: a v4 (`docs/site/v4/*`, `src/components/site/sections/*-v4.tsx`, `platform-v4/**`). A reunião de 01/10 (`docs/reunioes/2026-10-01-lucas-mariana-eduardo-revisao-lp.md`) continua valendo onde o material novo não disser o contrário.

Frases que só estão no pptx: "Você conhece seu produto. A fynd cuida da busca." · "A experiência precisa esconder a complexidade, não transferi-la para o cliente." · "Queremos validar isso com empresas reais." · "DADOS + INTELIGÊNCIA + EXECUÇÃO → RESULTADO" · no passo 2: "Entende o negócio, encontra empresas, aborda e conversa." · no card "hoje": "Sua equipe ainda precisa descobrir quem abordar, localizar contatos, enviar mensagens, insistir e qualificar."

## Regra de trabalho (nova, do Lucas)
Toda alteração vai para uma **URL nova**. A v5 vive em **`/v5`** (noindex, canonical `/v5`). **A v4 não é tocada**: nem `src/app/page.tsx`, nem `*-v4`, nem `platform-v4`, nem `opengraph-image.tsx`. A home continua sendo a v4 até a cliente aprovar a v5.

## O que muda de posicionamento (v4 → v5)
| v4 | v5 |
|---|---|
| Produto pronto, "Garantir minha vaga", acesso antecipado | **Validação de mercado.** A fynd está em desenvolvimento e seleciona empresas para os primeiros testes (piloto). CTA único: **"Tenho interesse em testar a fynd"** |
| Entrega = "empresas interessadas" | Entrega = **oportunidade comercial** (empresa, contato com cargo, necessidade identificada, interesse demonstrado, próximo passo aceito). "Interessados" continua sendo o nome da tela do produto |
| Problema = mailing frio × lead quente | Problema = **gerar clientes B2B é complexo**: quatro peças a coordenar (Pessoas, Dados, Ferramentas, Operação) |
| Sem falar de mercado | **Mercado em camadas**: Dados → Inteligência → Execução → Resultado. As ferramentas vendem partes do processo; a fynd quer vender o resultado |
| Formulário curto de acesso | **Questionário de validação** (11 perguntas do material), em etapas |
| "Mais mailing não resolve" | "Não queremos entregar uma lista. Queremos entregar uma oportunidade." (a palavra "lista" volta, porque é o texto da própria cliente, mais recente que a reunião) |

## Arquitetura v5 (ordem do material da cliente)
0. **Header**: o da v4, com âncoras revistas (ex.: Como funciona · Na prática · A diferença) e o botão "Quero testar" / "Tenho interesse em testar a fynd".
1. **Hero**: "Você vende. A fynd encontra." (duas frases, com ponto). Rótulo "geração de oportunidades B2B". Subtítulo: uma nova forma de gerar oportunidades comerciais sem precisar montar uma operação complexa de prospecção. CTA "Tenho interesse em testar a fynd". Linha de zero setup mantida. MacBook com a tela de Interessados (reuso da v4).
2. **O problema**: "Gerar novos clientes B2B ainda é complexo." + as quatro peças (01 Pessoas, 02 Dados, 03 Ferramentas, 04 Operação) com uma linha cada. Substitui o contraste "hoje × com a fynd" da v4.
3. **Zero setup / Como funciona**: "E se o processo fosse muito mais simples?" Três passos: **Você explica → A fynd trabalha → Você vende.** Fecha com "Você conhece seu produto. A fynd cuida da busca." Reusa os minis e a faixa do ciclo da v4 se couberem sem alongar.
4. **Lista × oportunidade**: "Não queremos entregar uma lista. Queremos entregar uma oportunidade." Dois cards: HOJE "5.000 empresas em uma planilha" (a equipe ainda precisa descobrir quem abordar, localizar contatos, enviar mensagens, insistir e qualificar) × COM A FYND "Nova oportunidade" (empresa, cargo do contato, necessidade identificada, interesse demonstrado, próximo passo aceito). O card da fynd deve usar o universo fictício (Serra Azul Alimentos, Renata Moraes · Gerente de compras) em vez de "Empresa XYZ", e pode levar o selo ciano de interesse.
5. **Na prática (demo com pin, 3 etapas)**: mantém a da v4 (Seu produto → Fit → Interessados) como prova visual do passo a passo. Só os textos laterais se ajustam ao vocabulário novo. É a seção candidata a encurtar se a página ficar longa.
6. **Mercado em camadas**: "O mercado está evoluindo em camadas." Quatro camadas com a pergunta de cada uma (Dados: quem existe e com quem falar? · Inteligência: quem vale prospectar agora? · Execução: como executar a prospecção? · Resultado: oportunidade comercial entregue). A fynd fica na quarta, destacada. Linha de síntese: Dados + Inteligência + Execução → Resultado. **Sem nomes de concorrentes** (decisão abaixo).
7. **A diferença**: "As ferramentas tradicionais ajudam sua equipe a gerar oportunidades." × "A fynd quer gerar a oportunidade para sua equipe." + "A maioria vende uma ou mais partes do processo. A fynd quer vender o resultado." Pode se fundir com a 6 numa seção só, se o design achar melhor.
8. **Não é mais uma ferramenta**: "A proposta não é ser mais uma ferramenta." Sem configurar IA · Sem construir listas · Sem montar automações · Sem precisar dominar prospecção. Princípio: "Você explica o que vende. A fynd cuida do restante." + "A experiência precisa esconder a complexidade, não transferi-la para o cliente." Substitui "Você só precisa vender" da v4.
9. **Encerramento + questionário**: rótulo "próximo sinal". Título "Você testaria a fynd na sua empresa?" Texto: a fynd está em desenvolvimento; estamos conversando com empresas para validar a proposta e selecionar os primeiros interessados em um piloto. CTA abre o questionário.
10. **Footer**: o da v4 com âncoras novas.

Saem da v5: a seção "Para quem" e o FAQ da v4 (não estão no material). Se o copy achar que uma pergunta de FAQ é indispensável, no máximo 3, fechadas.

## Questionário de validação (seção 9)
Perguntas e opções **exatamente** como no HTML da cliente: Nome · Empresa · E-mail ou WhatsApp · Como sua empresa gera novos clientes B2B hoje? (texto) · Vocês fazem prospecção ativa? (Sim / Às vezes / Não) · Maior dificuldade para gerar novas oportunidades (texto) · Quanto investe por mês em geração de novos clientes (6 faixas) · Que investimento mensal faria sentido (7 faixas) · Modelo de cobrança preferido (5 opções) · Maior preocupação em contratar a fynd (texto) · Participaria de um piloto? (Sim / Talvez / Não).
- Em **etapas** (sugestão: 1 Contato · 2 Como vocês vendem hoje · 3 Investimento e modelo · 4 Piloto), com indicador de progresso, voltar/avançar, validação só do que é obrigatório (nome, empresa, contato) e foco gerenciado entre etapas.
- O envio continua **simulado** (como na v4), com um ponto único de integração claramente marcado no código. Mensagem de sucesso própria.
- Estas perguntas de investimento e cobrança são a única exceção à regra "não falar de preço": são perguntas ao visitante, não promessa de preço.

## Decisões do orquestrador (o Lucas pode reverter)
1. **`/v5` separado**, home segue na v4.
2. **Sem nomes de concorrentes** na seção de camadas (risco de citar marcas de terceiros em site público). Deixar a estrutura de dados pronta para ligar os exemplos com uma flag (`SHOW_EXAMPLES = false`), com os nomes do material.
3. **Perguntas de preço entram**, em etapas.
4. **`fynd` sempre minúsculo**, mesmo onde o material escreve "Fynd".
5. **"Sem configurar IA"** pode aparecer, por ser negação e texto da cliente. "IA" continua fora de headline e de promessa.
6. **"Lista"** liberada no título da seção 4 e em "Sem construir listas".

## Regras que continuam valendo
- Design system da fynd (tokens, tipografia, tema por seção) e a regra do ciano raro: ponto aceso do hero, selo de interesse e, no máximo, o destaque da camada "Resultado"/card da oportunidade. Não copiar o visual do HTML da cliente (barras ciano, tipografia, layout).
- Sem "Receita Federal". Sem taxa ou % no texto do site (números só dentro das telas). Sem "leads garantidos". Não nomear o canal de abordagem.
- Tom honesto de produto em desenvolvimento: "quer gerar", "estamos selecionando", sem prometer resultado.
- A decisão e o fechamento são do cliente.
- Página não pode ficar mais longa que a v4 (meta: até ~10.000px em 1440×900). Seções 6, 7 e 8 devem ser curtas.
- Universo fictício da v4 mantido (Lumi Embalagens, 4.860 → 12, Serra Azul com 94% e 5 interações).

## Regras de arquivos
- Os arquivos `-v5` já existem como **cópia fiel da v4** (identificadores renomeados para V5, `tsc` passando): `src/app/v5/page.tsx`, `src/components/site/sections/*-v5.tsx`, `anchors-v5.ts`, `header-v5.tsx`, `footer-v5.tsx`, `src/components/site/platform-v5/**`.
- Só se edita `-v5` e `src/app/v5/`. Arquivos novos levam o sufixo `-v5`. Seções que saem (audience-v5, only-sell-v5, problem-v5 se for reescrita com outro nome) devem ser apagadas ou renomeadas, sem deixar código morto.
- Entregáveis em `docs/site/v5/`.
- Conflitos entre documentos: copy vence em texto, design em cor e layout, motion em timing.
- Dev server já roda em `http://localhost:3210` (não derrubar nem subir outro).

## Registro de decisões (etapa 3 → 4)
- 2026-10-07: copy (`02-copy-v5.md`) e design com motion (`03-design-v5.md`) prontos. Não há `04-motion-v5.md`; o motion da v5 é a seção "Motion" do design, sobre a base do `04-motion-v4.md`.
- **Pin da demo: `innerHeight * 2`** (design), para a página caber em ~10.000px. Timeline, labels e snap não mudam.
- **Texto é sempre o do copy.** A linha mono do encerramento não promete duração ("3 minutos" sai).
- **Rótulos das telas** (`platform-v5`): aplicar as trocas do copy (Interessados: "Necessidade identificada" e "Interesse demonstrado"; Fit: título e faixa de status; tooltip do shell). Nenhum dado muda.
- **Âncoras** em `anchors-v5.ts`: `access: "testar"`, `difference: "a-diferenca"`, sem `audience`. Constantes `CTA_LABEL_V5` e `CTA_SHORT_LABEL_V5`.

## Contrato da etapa 4 (v5, dois engenheiros em paralelo)
**Engenheiro S5 (seções)** é dono de `src/app/v5/page.tsx`, `anchors-v5.ts`, `header-v5.tsx`, `footer-v5.tsx`, `hero-v5.tsx`, `hero-parts-v5.tsx`, `problem-v5.tsx`, `how-it-works-v5.tsx`, `opportunity-v5.tsx` (novo), `demo-v5.tsx`, `difference-v5.tsx` (novo), `not-a-tool-v5.tsx` (novo). Apaga `only-sell-v5.tsx` e `audience-v5.tsx`. Na página, a última seção é `<AccessSectionV5 />` de `sections/access-v5`, que é do F5.
**Engenheiro F5 (formulário e plataforma)** é dono de `access-v5.tsx` (encerramento, `id` = `ANCHORS_V5.access`, exporta `AccessSectionV5`), `validation-form-v5.tsx` (novo), apaga `access-form-v5.tsx`, e é dono de `src/components/site/platform-v5/**` (trocas de rótulo). Lê `anchors-v5.ts` mas não edita; se o S5 ainda não tiver trocado as chaves, usa `ANCHORS_V5.access`, que existe nas duas versões.
Ninguém edita `-v4`, `-v3`, `-v2`, arquivos sem sufixo, `src/app/page.tsx` ou `opengraph-image.tsx`.
- 2026-10-07, etapa 6: seção 4 fica **sem eyebrow** ("A ENTREGA" do copy não entra; vale o design). Pin da demo em `innerHeight * 1.8` e só a partir de 1280px (abaixo disso, versão empilhada). Altura medida: 9.860px em 1440×900.
- 2026-10-07, decisão do Lucas: **a v5 é a página principal (`/`)**. A v4 foi para `/v4` (noindex, com a imagem de compartilhamento dela em `src/app/v4/`). `/v5` continua existindo, noindex, com canonical em `/`. Substitui a decisão 1 acima.
