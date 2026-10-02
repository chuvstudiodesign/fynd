# 09 — Revisão de marca · v3

_Agente `site-revisor-marca` · 2026-10-01_
_Critério principal: o que a Mariana disse na reunião de 29/09 (`docs/reunioes/2026-09-29-lucas-mariana-marca.md`). Também foram lidos a atualização no topo de `BRAND_FOUNDATION_FYND.md`, `00-briefing-v3.md` e `02-copy-v3.md`. Revisei o texto renderizado em `src/app/v3/page.tsx`, `sections/*-v3.tsx` e `platform-v3/**`, e as capturas `v3-d-*` e `v3pin-*`._

## Veredito

A v3 trocou o posicionamento de verdade. Não sobra nenhum pedido de ICP, nenhum "priorizadas", nenhum canal nomeado, nenhum "IA" ou "automação" no texto, e `fynd` aparece sempre em minúsculas. O universo fictício é coerente de ponta a ponta.

Restam **2 bloqueantes para publicar**. Nenhum dos dois impede mostrar o site à Mariana, mas ambos precisam da validação dela:
1. **O hero exibe uma taxa de interesse fora das telas.**
2. **A tela 1 sugere contato automático com um clique.**

Além deles, há 3 ajustes de clareza que valem mais do que qualquer polimento.

---

## Respostas ao checklist

| # | Pergunta | Resultado |
|---|---|---|
| 1 | Sobrou pedido de ICP ou "priorizadas" como entrega? | **Não.** As 7 ocorrências de "cliente ideal" são todas negações ("Sem formulário de cliente ideal", FAQ 1, nota da tela 1, dor 3 etc.). Não há "priorizar", "aderência" nem "perfil ideal" no texto visível. Há um resíduo só para leitor de tela (ver P3.3) e dois visuais que ainda mostram priorização por fit (P2.1). |
| 2 | O diferencial fica claro em 5 segundos? | **Parcialmente.** O título "Você vende, a gente encontra." não diz *o que* a fynd encontra. O "faz o primeiro contato e só entrega interessados" está na 2ª frase de um lead de 4 frases e na faixa mono miúda. O MacBook com a tela de Interessados fica abaixo da dobra em 1440×900 (`v3-d-0`). Ver P1.1. |
| 3 | Alguma promessa vai além do validado? | **Sim, duas** (os bloqueantes B1 e B2), mais "Primeiro contato **incluído**" (P1.3). Nenhum canal nomeado, nada dizendo "humano" ou "automático" no texto, sem "40 anos" (bloco `null`) e sem depoimento (`null`). |
| 4 | PME e prospecção ativa aparecem com clareza? | **Tarde.** "PMEs B2B" só aparece no subtítulo de Para quem (6ª dobra). "Prospecção ativa" aparece na dor 2 e em Para quem. O hero não diz para quem é. Ver P1.2. |
| 5 | `fynd` minúscula? Ciano controlado? Palavras proibidas? | **`fynd` ok:** nenhum eyebrow, badge ou rótulo `uppercase` contém a palavra ("Base fynd" está em texto normal no diagrama e na tela 2). **Palavras proibidas: nenhuma** (sem "lead", "IA", "automação", "garantido" ou "mágica"). **Ciano:** está controlado nas dobras 2 a 7, mas no hero há sinais demais (P2.2). |
| 6 | Universo 148 → 60 → 21 → 12 coerente? | **Sim.** Bate em todos os pontos: cards do hero, sidebar (12/60/148), mensagem da tela 1 (148/60), tela 3 (60/21/12 · 39/9/88), tela 4 ("12 empresas", "Ver os 12 interessados"), mini M2 (148/60/12) e diagrama de Dados (Serra, Bem Natural, Casa Doce, sem a Vale Verde). O "respondeu há X dias" casa entre as telas 3 e 4, e a Serra Azul aparece com 92%, Jundiaí e amostras em todos os lugares. Há dois detalhes menores (P3.1, P3.2). |

---

## Bloqueantes (antes de publicar)

### ✅ B1. O card "Primeiro contato" do hero publica uma taxa de interesse
- **Decisão:** os cards flutuantes ficam fora do MacBook e mostram "60 contatadas · 21 responderam" ao lado de "12 interessadas" (`hero-v3.tsx:218-253`). Lido como texto do site, isso vira "35% respondem, 20% se interessam". É exatamente a taxa que o briefing proíbe e que a Mariana não validou (o critério de "interesse" está em aberto). Dentro da tela 3 o mesmo funil passa como demonstração; solto no hero, passa como promessa.
- **Impacto:** é a primeira coisa com número que o visitante vê, e um comprador vai usá-la como referência de resultado.
- **Menor correção:** remover o card 3 (o próprio `02-copy-v3` previu essa saída). O funil continua legível como "você vende → 148 com fit → 12 interessadas · Serra Azul pediu amostras", e o número fica ancorado no exemplo da Serra Azul. Se quiser manter o card, troque os números por estados sem quantidade ("Contato feito → Resposta recebida").

### ✅ B2. A tela 1 mostra o software fazendo o contato sozinho, com um clique
- **Decisão:** o assistente fala em primeira pessoa e dispara o contato: "Quer ajustar algo antes de eu buscar **e fazer o primeiro contato**?", o botão **"Buscar e fazer contato"** e "**Vou começar** o primeiro contato por 60 delas e te aviso…" (`screen-conversa-v3.tsx:141,149,172`). Isso responde por conta própria a pendência "humano, automatizado ou misto": diz que é automatizado, imediato e sem revisão da mensagem pelo cliente.
- **Impacto:** contradiz "não prometemos automação total" e toca no ponto que a Mariana chamou de "muito discutido em prospecção com IA". Se o contato for humano ou misto, a demo está errada.
- **Menor correção:** tirar o agente da ação de contatar e manter só a busca.
  - Botão: "Buscar empresas".
  - Pergunta: "Quer ajustar algo antes de eu buscar?"
  - Resultado: "Encontrei 148 empresas com fit. O primeiro contato começa por 60 delas, e você é avisada quando alguém demonstrar interesse."
  - A tela 3 continua mostrando que o contato acontece, sem dizer quem o faz.

---

## Prioridade 1 (clareza do diferencial e do público)

### ✅ P1.1. O hero diz "encontra", mas não diz "quem tem interesse"
- **Decisão:** sozinho, "Você vende, a gente encontra." pode ser lido como "a gente encontra empresas", que é a metade do trabalho que, nas palavras da Mariana, "milhões de empresas fazem". O que diferencia ("faz o primeiro contato", "só as que demonstraram interesse") está no meio do lead e na faixa mono de 11px.
- **Impacto:** a leitura de 5 segundos fica em "mais uma base de empresas". A frase da Mariana tem três tempos: vende → encontramos quem tem interesse → você fecha.
- **Menor correção:** manter o título e reescrever o lead em três frases curtas que espelhem a frase-mãe, com o diferencial primeiro: "Diga o que a sua empresa vende. A fynd faz o primeiro contato e só entrega as empresas que demonstraram interesse. Você assume a conversa e fecha." O "encontra as empresas com fit" sai do hero, já que é o ponto de partida e não a entrega. Opcional: reduzir o respiro vertical do hero para a borda do MacBook com "Interessados" aparecer na primeira tela em 1440×900.

### ✅ P1.2. O hero não diz para quem é
- **Decisão:** PME B2B e prospecção ativa aparecem pela primeira vez na 6ª dobra. A microlinha do hero gasta o espaço com outra negação de ICP, a 7ª do site.
- **Impacto:** o dono de PME, que é o público que a Mariana definiu, não se reconhece no topo. O excesso de "cliente ideal" ainda ensina um termo que a gente quer que ele esqueça.
- **Menor correção:** trocar a microlinha "Sem formulário de cliente ideal. Você começa contando o que vende." por "Para PMEs B2B que querem um canal de prospecção ativa sem montar estrutura." A negação de ICP fica onde já trabalha bem: o passo 1, o FAQ 1 e a garantia 1.

### ✅ P1.3. "Primeiro contato incluído" é uma promessa comercial
- **Decisão:** "incluído" fala de preço e pacote, e o preço ainda é "apresentado na demonstração".
- **Impacto:** cria uma expectativa contratual que ninguém validou.
- **Menor correção:** "A fynd faz o primeiro contato" ou "Primeiro contato feito pela fynd". Atenção: o segundo é rótulo mono `uppercase` e contém "fynd". Fica, então, **"Primeiro contato feito por nós"** ou simplesmente **"Primeiro contato"**.

---

## Prioridade 2 (o visual ainda conta a história antiga)

### ✅ P2.1. Dois destaques visuais ainda celebram o fit, não o interesse
- **Decisão:**
  - Na seção Problema, a "linha iluminada" que sai da lista cinza é a Serra Azul com **92%** e barra de fit (`NoiseList` da v2, `v3-d-3`). A frase logo abaixo diz "Mais empresas interessadas", mas a imagem mostra uma empresa *filtrada*.
  - Em Dados, o card de saída se chama "Interessados", mas cada linha mostra fit % com barra, na ordem de fit (`v3pin-4`). Isso contradiz a tela 4 ("Ordenar por: Mais recentes").
- **Impacto:** é justamente o "filtrar a base e entregar quem tem mais fit" que a Mariana disse que não é o diferencial.
- **Menor correção:** nas duas, trocar o `92%` e a barra pelo estado de interesse. O `OpportunityCard` já aceita `fitLabel`; a correção é passar "Pediu amostras", "Pediu proposta" e "Conversa em novembro", e esconder a barra. No Problema isso exige uma cópia `noise-list-v3` (a v2 não pode ser editada).

### ✅ P2.2. Ciano demais no hero: o "ponto único" não fica único
- **Decisão:** a primeira dobra tem o ponto do pill, o ponto aceso com pulso e halo, a **trilha de pontos ciano** subindo pela direita (`fill-signal-300` nos `lit`) e o brilho ambiente ciano. A ideia da Mariana é "aquele ponto no meio de todos os pontos"; com a trilha acesa, ele vira mais um entre muitos.
- **Impacto:** a metáfora mais forte da reunião se perde, e a regra "um ciano por dobra" estoura.
- **Menor correção:** trilha em `steel-300` (sem `lit` ciano) e ponto do pill em neutro (`paper-50`) nesta versão. Assim o único ciano da dobra é o ponto aceso.

### ⏸ P2.3. "Buscar e fazer contato" e "Assumir conversa" sugerem uma inbox
- **Decisão:** "Assumir conversa" e "Ver resposta completa" dão a entender que a conversa acontece dentro da fynd, o que é um canal implícito. "Agendar reunião" sugere integração com agenda.
- **Impacto:** é baixo, mas vale perguntar à Mariana junto com o canal.
- **Menor correção:** nenhuma agora. Incluir na lista de validação: "o interessado chega como? (contato para você ligar ou conversa já aberta)".

---

## Prioridade 3 (detalhes)

1. ✅ **A citação da Serra Azul varia.** Na linha do tempo da tela 3 está "Temos interesse. Conseguem enviar amostras?"; na tela 4 e no M3 está "…amostras de pouch para biscoito?". Use a mesma frase final nas três ("Conseguem enviar amostras de pouch para biscoito?").
2. ✅ **A Grão Fino Cafés contradiz o critério.** O contexto diz "Abriu filial em Belo Horizonte, MG, em 2025", mas o critério inferido é "Filial aberta nos últimos 12 meses" (hoje é out/2026). Troque por "em 2026" ou por um sinal de CNAE.
3. ✅ **Há um resíduo para leitor de tela.** `OpportunityCard` tem `sr-only` "Aderência de X% ao perfil ideal" (`opportunity-card.tsx`). Na v3 ele hoje está dentro de `aria-hidden`/`role="img"` e não é lido, mas qualquer uso fora disso traz o vocabulário antigo de volta. Quando a P2.1 for aplicada, passe um rótulo acessível novo.
4. ✅ **"Contexto: Fornecedor atual até janeiro" (Casa Doce)** vem da resposta, não da base. Ou se troca o rótulo do campo, ou se usa um sinal cadastral, para não parecer que a fynd sabe o contrato do cliente.
5. ✅ **O footer mantém "Ilumine as oportunidades certas."** Está fora do novo posicionamento. A troca por "Você vende, a gente encontra." já está anotada como decisão do Lucas e é recomendada.
6. ✅ **Na captura `v3pin-1`**, a etapa "2 Fit" está ativa enquanto a tela ainda mostra a conversa, com o breadcrumb já em "Embalagens flexíveis" e o título "Empresas com fit" esmaecido por baixo. Parece o meio do crossfade no momento da captura; vale conferir se no scroll real a tela 2 aparece já assentada.

---

## O que está certo (não mexer)

- Os três passos espelham a frase-mãe ("Você conta, a fynd encontra, você fecha.") e cada mini tem um único ciano (o selo da M3).
- "É o ponto de partida, não a entrega" (demo 2) e a faixa "Ponto de partida." da tela 2 resolvem o "não é priorizar".
- "Não é mailing. Só chega quem tem interesse." e a Vale Verde "sem interesse agora" na tela 3 dão honestidade à demo.
- FAQ 2 responde "Sim" sem citar canal nem quem assina, como pede a pendência.
- O público "Quem vende sozinho / Teste sem contratar ninguém" traduz bem o "quero só testar com 100 leads" da reunião, sem número.
- Os blocos de 40 anos, depoimento e LGPD estão desligados (`null`) até a validação.

---

## Status da etapa 6 (2026-10-01, `site-frontend`)

Aplicado conforme o "Registro de decisões · Etapa 6" do `00-briefing-v3.md`. A v1 (`/`) e a v2 (`/v2`) não foram tocadas por esta etapa: só mudaram `src/app/v3/**`, `sections/*-v3.tsx`, `platform-v3/**` e o novo `footer-v3.tsx`.

| Item | Status | O que foi feito |
|---|---|---|
| B1 | ✅ | Card "Primeiro contato" (60 contatadas · 21 responderam) removido do hero. Ficam 3 cards: Você vende → Fit 148 → 12 interessadas (`hero-v3.tsx`). |
| B2 | ✅ | Tela 1 neutra: pergunta "Quer ajustar algo antes de eu buscar?", botão "Buscar empresas" e resultado "Encontrei 148 empresas com fit. O primeiro contato começa por 60 delas, e você é avisada quando alguém demonstrar interesse." (`screen-conversa-v3.tsx`). |
| P1.1 | ✅ | Lead: "Diga o que a sua empresa vende. A fynd faz o primeiro contato e só entrega as empresas que demonstraram interesse. Você assume a conversa e fecha." A meta description de `/v3` acompanha. Opcional também aplicado: respiro vertical reduzido; em 1440×900 a borda do MacBook (barra da tela) aparece na primeira dobra. O título "Interessados" da tela ainda fica logo abaixo da dobra. |
| P1.2 | ✅ | Microlinha: "Para PMEs B2B que querem um canal de prospecção ativa sem montar estrutura." |
| P1.3 | ✅ | Faixa de provas: "Primeiro contato feito por nós" (sem "fynd" no rótulo em caixa alta). |
| P2.1 | ✅ | Novo `platform-v3/interest-card-v3.tsx` (mesmo desenho do `OpportunityCard`, com o estado de interesse no lugar do % e da barra) e `platform-v3/noise-list-v3.tsx` (cópia v3 do `NoiseList`). Problema mostra a Serra Azul com "Pediu amostras"; Dados mostra "Pediu amostras", "Pediu proposta" e "Conversa em novembro", na ordem da tela 4. Estados em `INTEREST_STATUS` (`data-v3.ts`). No mobile o estado desce para baixo do nome. |
| P2.2 | ✅ | Trilha de pontos toda em `steel-300` (sem `lit` ciano) e ponto do pill em `paper-50`. O único ponto ciano da dobra é o ponto aceso; dentro da tela, o selo "Demonstrou interesse" continua ciano. |
| P2.3 | ⏸ | Sem correção, como o próprio item pede. Depende da Mariana: entra na lista de validação ("o interessado chega como? contato para você ligar ou conversa já aberta"). "Assumir conversa", "Ver resposta completa" e "Agendar reunião" seguem nas telas 3 e 4. |
| P3.1 | ✅ | Linha do tempo da tela 3 com a mesma frase: "Temos interesse. Conseguem enviar amostras de pouch para biscoito?" (cabe sem quebrar o painel). |
| P3.2 | ✅ | Grão Fino Cafés: "Abriu filial em Belo Horizonte, MG, em 2026". |
| P3.3 | ✅ | O `InterestCardV3` tem rótulo acessível próprio ("Demonstrou interesse: Pediu amostras"). A v3 não usa mais o `OpportunityCard` fora das telas. |
| P3.4 | ✅ | Casa Doce: o contexto virou sinal cadastral, "Incluiu o CNAE de biscoitos recheados em 2026". |
| P3.5 | ✅ | Novo `src/components/site/footer-v3.tsx` com "Você vende, a gente encontra.", usado só em `/v3`. O `footer.tsx` da v1/v2 não mudou. |
| P3.6 | ✅ | Conferido no scroll real (Playwright, 1440×900): 400 ms depois de a etapa 2 ficar ativa, a tela 2 já está assentada, sem a conversa por baixo. Era o meio do crossfade na captura antiga; nada a corrigir. |

### Fora da revisão: "Receita Federal" removida da v3 (pedido do usuário, 2026-10-01)

A cliente ainda não confirmou se a fonte pode ser citada. Cada trecho ficou com o comentário `[receita-federal-removido 2026-10-01] original: "…"` para dar para recuperar:
- `hero-v3.tsx`: faixa de provas "CNPJs da Receita Federal" → "Bases de dados empresariais".
- `data-v3.tsx`: título "CNPJs da Receita Federal, organizados" → "Bases empresariais, organizadas"; texto "Os dados cadastrais oficiais…" → "Os dados cadastrais…"; prova 2 "complementam o cadastro público" → "complementam os dados cadastrais"; nó do diagrama "Receita Federal" → "Bases empresariais"; figcaption atualizado.
- `access-v3.tsx`: FAQ "De onde vêm os dados?" → "De bases de dados empresariais, organizadas para consulta, e de uma base própria de contas corporativas. …"
- `platform-v3/screen-fit-v3.tsx`: "148 empresas encontradas · Receita Federal e base fynd" → "… · bases empresariais e base fynd".
- "CNPJ" como campo (busca por CNPJ) ficou, porque não afirma fonte.
