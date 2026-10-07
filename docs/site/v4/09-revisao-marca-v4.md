# 09 · Revisão de marca do site da fynd · v4

_Etapa 5 da v4 · revisor de marca · 2026-10-07. Revisei o que está **implementado**: `src/app/page.tsx`, `src/components/site/sections/*-v4.tsx`, `hero-parts-v4.tsx`, `header-v4.tsx`, `footer-v4.tsx`, `src/components/site/platform-v4/**`, e também `src/app/layout.tsx` e `src/app/opengraph-image.tsx`, que entram na página principal. Referências: reunião de 01/10 (30 pontos), escopo da Mariana, `00-briefing-v4`, `02-copy-v4` e `BRAND_FOUNDATION_FYND.md`. Nada foi corrigido nesta etapa._

**Veredito:** a v4 cumpre o que a Mariana e o Eduardo pediram. Dos 30 pontos, **27 estão atendidos e 3 estão parciais** (17, 20 e 22). **Nenhum está sem atendimento e não há bloqueante.** As regras duras foram cumpridas: nenhum "Receita Federal", nenhum "IA", nenhum modelo de preço, `fynd` sempre minúsculo e nunca em `uppercase`, e o primeiro contato não aparece como diferencial. O que falta é visibilidade. Duas mensagens que a dona pediu com ênfase existem, mas aparecem fracas: o zero setup do hero e o "você não precisa se preocupar com mailing". Além disso, a imagem de compartilhamento ainda é a da v3.

---

## 1. Conferência ponto a ponto (código)

| Nº | Pedido | Status | Onde está no código | Observação |
|---|---|---|---|---|
| 1 | Título do hero mantido; subtítulo mais atrativo | Atendido | `sections/hero-v4.tsx:178-188` | Título intacto. Subtítulo A do copy, sem "primeiro contato" e terminando em "Você fecha." |
| 2 | "Sem setup" no topo **e** no encerramento, sem poluir | Atendido (com ressalva) | Hero `hero-v4.tsx:215-217`; encerramento `access-v4.tsx:61`; componente `hero-parts-v4.tsx:177-193`. Também em `how-it-works-v4.tsx:56`, `problem-v4.tsx:30` e no eyebrow de `only-sell-v4.tsx:36` | Está nos dois lugares. No hero, porém, é a menor linha da dobra (mono de 11px, caixa alta, `steel-300`) e pode passar despercebida em 5 s. Ver I2 |
| 3 | Números do MacBook são conceituais | Atendido | `platform-v4/data-v4.ts:1-14` | Universo fictício coerente. Os `[validar]` ficaram só nos comentários |
| 4 | CTA de acesso antecipado ("garanto a vaga"), muitos botões no topo | Atendido | `anchors-v4.ts:18`; header `header-v4.tsx:152-169`; pill `hero-v4.tsx:160-174`; botão `hero-v4.tsx:192-198`; fim da demo `demo-v4.tsx:85-87`; formulário `access-form-v4.tsx:187-196` | "Garantir minha vaga" aparece 5 vezes. Formulário ou WhatsApp continua em aberto (decisão do cliente, não do código) |
| 5 | Trocar "lista" por "mailing" | Atendido | `problem-v4.tsx:129` "Mais mailing não resolve. Interesse resolve." | O título foi trocado. A palavra "lista" ainda aparece no subtítulo (`:134`) e na primeira dor (`:21`). Ver M1 |
| 6 | Dores lidas como negativo, com X vermelho | Atendido | `problem-v4.tsx:171` (`XIcon text-destructive`) e títulos negativos em `:21,25,29` | No `.dark`, o `destructive` é `#f5877e`, que fica entre coral e vermelho. Ver M4 |
| 7 | Comparativo lado a lado, "sem setup" claro, sem virar sistema × sistema | Atendido | `problem-v4.tsx:19-32, 143-218` | "Hoje" × "Com a fynd", só sobre o dia a dia, sem concorrente. O terceiro par é "Zero setup." |
| 8 | "Menos lista fria…" mais atrativo (lead quente) | Atendido | `problem-v4.tsx:222` "Troque o lead frio pelo lead quente." | |
| 9 | "Você conta, a fynd encontra, você fecha." como slogan, com destaque | Atendido | `how-it-works-v4.tsx:50` (h2) | |
| 10 | Subtítulo do Como funciona em sem setup / sem configurar | Atendido | `how-it-works-v4.tsx:56` "Zero setup. Foco no resultado. Você não configura nada, não sobe base e não compra mailing." | |
| 11 | Passo 2 com punch: cruza, encontra, qualifica, entrega o interessado | Atendido | `how-it-works-v4.tsx:25-26` "A fynd encontra e qualifica os interessados" + "Cruza o que você vende com a base, encontra…, aborda, qualifica e separa só quem tem interesse." | |
| 12 | Primeiro contato fora do destaque | Atendido | Sumiu do hero, dos passos, da demo e das telas. Aparece só como "aborda e qualifica" (`how-it-works-v4.tsx:26`, `screen-fit-v4.tsx:151`, FAQ `access-v4.tsx:29`) e como "Abordar" no ciclo do escopo (`how-it-works-v4.tsx:105`) | Nenhum canal é nomeado |
| 13 | Etapa 1 = "Seu produto" | Atendido | `demo-v4.tsx:24-25`; `shell-v4.tsx:29`; `platform-demo-v4.tsx:17` | |
| 14 | Demo em 3 etapas: Produto → Fit → Interessados | Atendido | `demo-v4.tsx:22-41` ("Etapa X de 3" em `:232`); `platform-demo-v4.tsx:13-34` | |
| 15 | Tela Fit só com volume, sem nomes e sem aderência | Atendido | `screen-fit-v4.tsx:70-134` (4.860 + recortes em números absolutos); `data-v4.ts:65-91` | Sem nome de empresa, sem %, sem "exportar". As barras são neutras e o rótulo traz número absoluto |
| 16 | Aderência só nos interessados, vinda da interação | Atendido | `screen-interessados-v4.tsx:84` (dica "sobe conforme a empresa responde e interage") e `:125-153` (% + nº de interações); `minis-v4.tsx:219-220` (recorte de Interessados) | A regra é coerente nos 6 cards (5 interações = 94%, 4 = 88%, 3 = 81/76%, 2 = 72%, 1 = 68%) |
| 17 | Interessados "responderam e querem saber mais"; pode ter telinha de detalhe | **Parcial** | Linha literal em `screen-interessados-v4.tsx:74` | O painel de detalhe (contato, "me manda o telefone", interações) **não foi implementado** (`platform-demo-v4.tsx:106`, `screen-interessados-v4.tsx:14`). O copy previa o painel e a rastreabilidade do `02-copy-v4` o dá como atendido. Ver I4 |
| 18 | Base como volume (+25 mi, Brasil todo, organizada), sem citar fonte nem Receita | Atendido | `only-sell-v4.tsx:94-98` | Nenhuma ocorrência de "Receita" no código v4, no `page.tsx`, no `layout.tsx` ou na OG. O número continua `[validar]` |
| 19 | A base se retroalimenta | Atendido | `only-sell-v4.tsx:97` "a cada conversa a fynd aprende mais sobre o que cada empresa compra." | |
| 20 | "Você não precisa se preocupar com mailing"; simplicidade como ponto principal | **Parcial** | Frase literal só no FAQ 2 (`access-v4.tsx:24`), que fica **fechado** no acordeão. Na página aberta, o mais próximo é "Buscar mailing", riscado (`only-sell-v4.tsx:20`) | A simplicidade é o fio da página. Já a frase que a Mariana pediu ("mais do que não é mailing") não é lida por quem não abre o FAQ. Ver I3 |
| 21 | Lista do que não precisa | Atendido | `only-sell-v4.tsx:19-26, 59-90` + "Só precisa atender quem já tem interesse." (`:87`) | |
| 22 | Seção de dados redundante; vira encerramento com "não é mailing" + "para quem" | **Parcial** | A seção Dados saiu e entrou "Você só precisa vender" (`only-sell-v4.tsx`), antes de Para quem (`audience-v4.tsx`) e do Acesso (`access-v4.tsx`) | A redundância foi resolvida, mas as duas seções continuam separadas e não fundidas no encerramento. A página ainda tem 7 seções, como a v3. Ver M7 |
| 23 | "Para vender mais sem montar estrutura" e "Teste sem contratar ninguém" | Atendido | `audience-v4.tsx:62` e `:19` | |
| 24 | Público do item 7 do escopo | Atendido | `audience-v4.tsx:29-41` (os 11 segmentos) | No mobile aparecem 8 e um botão "Ver todos" |
| 25 | Não é CRM, chatbot, base de leads (nem automação) | Atendido | `only-sell-v4.tsx:17, 43-56` | |
| 26 | "Zero setup. Foco no resultado." / "A complexidade fica com a fynd." | Atendido | `how-it-works-v4.tsx:56` e `:149` | |
| 27 | Ciclo entender → entregar como "motorzinho" | Atendido | `how-it-works-v4.tsx:105-213` (faixa animada, "você entra aqui" sob Entregar) | A palavra "motor" não aparece |
| 28 | Não falar de modelo de preço | Atendido | FAQ 5 `access-v4.tsx:36-37` | Nada sobre mensalidade, créditos, fee, "grátis" ou taxa |
| 29 | Nada de dashboard complexo | Atendido | `shell-v4.tsx:28-32, 78-91` (3 itens + 1 produto); Fit sem exportar; Interessados sem gráficos | |
| 30 | Essência: "O que você quer vender?" | Atendido | Título do encerramento `access-v4.tsx:52`; primeira fala da fynd `data-v4.ts:20`; rótulo do formulário `access-form-v4.tsx:173` | |

### Verificações específicas pedidas

| Item | Resultado |
|---|---|
| "mailing" no lugar de "lista" | Ok no título. Sobram 2 "lista" na seção 2 (M1) |
| Dores com X | Ok, `destructive` só no ícone |
| Zero setup no hero e no encerramento | Ok nos dois, fraco no hero (I2) |
| Passo 2 com punch | Ok |
| Primeiro contato fora do destaque | Ok |
| Demo em 3 etapas com "Seu produto" | Ok |
| Tela Fit só com volume | Ok: 4.860 e recortes que somam 4.860 em cada grupo (setores, regiões, porte), sem nomes e sem % |
| Aderência só nos interessados | Ok (tela 3, recorte M3 e aria-labels) |
| +25 milhões sem fonte | Ok |
| "Você não precisa se preocupar com mailing" | Só no FAQ fechado (I3) |
| Não é CRM/chatbot/base/automação | Ok |
| Público do escopo | Ok |
| Nada de modelo de preço | Ok |
| Mais curta que a v3 | Sim. Pin de 300vh para 240vh, padding de seção menor (`anchors-v4.ts:27` × `site-container.tsx:12`), Dados virou um bloco curto, Para quem caiu para cerca de 1/3 e o FAQ foi de 6 para 5 perguntas. A meta do design é −25% de altura. O número de seções é o mesmo (7) |

---

## 2. Marca

| Critério | Resultado |
|---|---|
| `fynd` minúsculo | Ok em todo o texto visível, nos aria-labels, no metadata e no footer. Nenhum "Fynd" visível (as ocorrências são nomes de componente) |
| `fynd` nunca em `uppercase` por CSS | Ok. Eyebrows, rótulos mono (`hero-v4.tsx:31`, `SectionLabel`, ciclo, etapas da demo, `ZeroSetupStrip`) e "Aderência" não contêm a palavra. "Com a fynd" (`problem-v4.tsx:195`) está em caixa normal. O © do footer não usa uppercase (`footer-v4.tsx:66`) |
| Ciano raro | Ok. Aparece no ponto aceso do hero, no selo "Interessada" do card ativo (hero, M3, etapa 3) e no submit do formulário (`access-form-v4.tsx:189`). As seções 2, 5 e 6, o ciclo, o header e as etapas 1 e 2 não têm ciano (o código ficou mais contido que o `03-design-v4`, que previa ciano no selo do especialista e no ponto de status do Fit). Há ciano apenas como luz ambiente nos gradientes do hero (`hero-parts-v4.tsx:157`, `hero-v4.tsx:230`), nunca como texto |
| Tom | Ok. Fala com o dono e com o gestor comercial, em segunda pessoa, curto. Não sobrou nada conceitual sobre fogo ou logo |
| Tipografia | Ok nos papéis: Sora light nos títulos e números, Manrope na leitura, Plex Mono em rótulos e dados. A exceção é o zero setup do hero, que ficou com papel de rótulo e não de mensagem (I2) |
| Sem IA como argumento | Ok, nenhuma ocorrência de "IA" ou "inteligência artificial". Atenção ao "Especialista comercial" (I5) |
| Sem Receita Federal | Ok em todo o código da página principal. As ocorrências restantes estão em `/styleguide`, fora do site público |
| Sem promessas nem taxas no texto | Ok. Nenhum %, nenhuma taxa, nenhum "leads garantidos". Os únicos números fora das telas são 4.860 e 12 nos cards do hero, que são recortes de tela, e o "25 milhões" aprovado pela Mariana |
| Coerência dos números | Ok entre hero (cards e linha mobile), sidebar (badges 4.860 e 12), M2, mensagem-ponte da tela 1, tela Fit, tela Interessados, M3 e aria-labels: 4.860 → 12, Serra Azul 94% com 5 interações, "Pediu amostras", Renata Moraes · Gerente de compras. Há um único desvio de verossimilhança, a região (M2) |

---

## 3. Correções mínimas

Formato: **decisão → impacto → menor correção eficaz**.

### Bloqueante
Nenhum.

### Importante

**I1. A imagem de compartilhamento ainda é a da v3.** `src/app/opengraph-image.tsx:62` ("PROSPECÇÃO B2B COM CONTEXTO") e `:91` ("Não é mailing nem lista fria. Quem fecha é você.").
→ Quando a Mariana mandar o link (provavelmente por WhatsApp), o cartão mostra "lista fria", a palavra que ela pediu para trocar, e "não é mailing", que ela pediu para superar. O zero setup não aparece.
→ Trocar só os dois textos: o rótulo de `:62` vira algo como "ZERO SETUP" (sem "fynd", então o uppercase é permitido) e a linha de `:91` vira a do copy, "Zero setup. Só chegam interessados.". Atualizar também o comentário de `:6`. O card da Serra Azul previsto no copy pode ficar para depois.

**I2. O zero setup do hero existe, mas lê como nota de rodapé.** `sections/hero-parts-v4.tsx:181` (mono 11px, `uppercase`, `steel-300`), usado em `hero-v4.tsx:215-217`.
→ A Mariana e o Eduardo pediram que isso estivesse "lá em cima" e "muito claro". Hoje é o menor texto da dobra, abaixo dos botões e em cor apagada. Em 5 segundos o leitor entende o que é e para quem é, mas não capta o "contratou, já funciona".
→ Sem mudar o layout: subir a linha para `text-xs` ou `text-sm` e deixar "Zero setup." em `font-semibold`, mantendo o mono e a ausência de ciano. Também dá para trocar `text-steel-300` por `text-paper-50/80` na segunda frase (`:190`). Uma linha só, sem poluir.

**I3. "Você não precisa se preocupar com mailing" só existe dentro do FAQ fechado.** `sections/access-v4.tsx:24`; a seção 5 (`only-sell-v4.tsx:54`) não traz a frase.
→ Foi a formulação que a Mariana defendeu ("mais do que não é mailing… a preocupação é única e exclusivamente atender o cliente aquecido"). Quem não abre o acordeão não a lê.
→ Trocar o complemento de `only-sell-v4.tsx:54` por: "É o resultado de tudo isso. Você não precisa se preocupar com mailing nem aprender a usar nada." Fica uma frase, sem acrescentar nenhum bloco.

**I4. A telinha de detalhe do ponto 17 não foi feita, e a rastreabilidade diz que foi.** O copy (`02-copy-v4.md`, "Painel de detalhe" e a linha 17 da tabela) prevê o painel. O código não o tem (`platform-v4/platform-demo-v4.tsx:106`, `screen-interessados-v4.tsx:14`).
→ O ponto era opcional ("pode ter"), mas o documento que a Mariana vai conferir afirma que está atendido. Isso gera divergência na conferência.
→ A menor correção é documental: ajustar a linha 17 da tabela de rastreabilidade do `02-copy-v4.md` para "linha literal atendida; painel de detalhe adiado (decisão do design, para a demo não alongar)". Se o cliente quiser o painel, ele entra só na etapa 3 da demo, como no copy.

**I5. O "Especialista comercial da Lumi" pode ser lido como uma pessoa.** `platform-v4/data-v4.ts:47-53` ("Ele vai apresentar a Lumi do jeito que você apresentaria"), ícone `UserRoundIcon` em `screen-produto-v4.tsx:229-230` e `:250-251`, e FAQ 3 em `access-v4.tsx:29` ("você conversa com o especialista").
→ Sem "IA" no texto (o que está certo) e com ícone de pessoa, o cliente pode entender que vai ter um vendedor humano dedicado. Isso promete mais do que o MVP entrega, e o próprio FAQ 3 ainda está `[validar]`.
→ Trocar o `UserRoundIcon` pelo `FyndAvatar` (o mesmo avatar das falas da fynd), para que o especialista seja visualmente parte da fynd. O texto não muda. Validar o FAQ 3 antes de publicar; se o especialista não existir no lançamento, usar a versão curta já prevista no copy.

### Menor

**M1. Ainda há "lista" na seção do mailing.** `sections/problem-v4.tsx:134` ("Ter uma lista de empresas é fácil.") e `:21` ("Você compra uma lista e liga…").
→ A troca pedida foi atendida no título, mas a palavra volta logo abaixo, e o mercado fala "mailing" ou "listagem".
→ Em `:134`: "Comprar mailing é fácil. Difícil é descobrir quem quer conversar." Em `:21`: "Você compra uma listagem e liga para quem não está esperando você." ("listagem" é a palavra que a Mariana usou).

**M2. Universo fictício: as 6 interessadas estão todas no Sudeste.** `platform-v4/data-v4.ts:114-182` (Jundiaí, Contagem, Vila Velha, Varginha, Sorocaba, Petrópolis), enquanto o perfil diz "foco no Sudeste e no Sul" (`:43`) e o Fit mostra 1.170 empresas no Sul.
→ É um detalhe, mas quem olha a tela com atenção percebe que o Sul não aparece.
→ Trocar uma cidade de card que não aparece no hero, por exemplo Nativa Snacks em `:166`/`:167`: "Alimentos · Joinville, SC · 280 pessoas" e `city: "Joinville, SC"`.

**M3. O metadata de fallback ainda vende o primeiro contato.** `src/app/layout.tsx:42`, `:46` e `:55` ("A fynd faz o primeiro contato…").
→ A página principal sobrescreve esse texto (`page.tsx:19-42`), então hoje ele não vaza para o site público. Qualquer rota nova que herdar o layout vai repetir a v3.
→ Copiar `DESCRIPTION`/`SHARE_DESCRIPTION` da v4 para o layout, ou deixar só o título no layout.

**M4. A cor do X fica entre coral e vermelho no escuro.** `problem-v4.tsx:171` usa `text-destructive`, que no `.dark` é `#f5877e`.
→ A Mariana pediu "X vermelho". Em navy, o X de 16px pode ler como rosa.
→ Conferir ao vivo com ela. Se não ler como negativo, subir o traço para `strokeWidth={2.5}` antes de mudar a cor. A regra "destructive só no ícone" continua valendo.

**M5. O contraste dos verbos do meio do ciclo precisa ser medido.** `how-it-works-v4.tsx:186` (`text-steel-500` em mono 12px sobre `paper-100`).
→ São justamente os passos que a fynd faz por você. Se ficarem apagados demais, o "motorzinho" perde a leitura.
→ Medir e, se ficar abaixo de 4,5:1, trocar por `text-steel-600`.

**M6. Os `[validar]` precisam ser resolvidos antes de ir ao ar.** São eles: "mais de 25 milhões de CNPJs" e "organizados e limpos" (`only-sell-v4.tsx:93-97`; a Mariana falou "organiza e higieniza"), o FAQ 3 (`access-v4.tsx:28`), o e-mail do footer (`footer-v4.tsx:14`), a linha de privacidade (`access-form-v4.tsx:202`) e a decisão entre formulário e WhatsApp (ponto 4).
→ Nenhum deles é erro de marca, mas são compromissos públicos.
→ Fechar com a Mariana numa lista única.

**M7. A página tem o mesmo número de seções da v3.** `src/app/page.tsx:50-56`.
→ A altura caiu, mas o Eduardo sugeriu juntar "não é mailing" e "para quem" no encerramento, e a página ainda percorre 7 blocos.
→ Se a Mariana ainda achar a página longa, o próximo corte é fundir `OnlySellSectionV4` e `AudienceSectionV4` numa seção clara única: título "Você só precisa vender.", negações, lista do "não precisa", chips de público e a linha da base, sem as duas colunas de persona. Não é obrigatório agora.

---

## 4. Ordem sugerida
1. I1 (OG), I3 (frase do mailing) e M1 ("lista"): três trocas de texto, mais de 10 minutos não leva.
2. I2 (peso do zero setup no hero).
3. I5 (ícone do especialista) e M2 (uma cidade).
4. I4 (ajustar a rastreabilidade) e M3 (layout).
5. M4, M5 e M6 na conferência com a Mariana; M7 só se ela pedir mais corte.
