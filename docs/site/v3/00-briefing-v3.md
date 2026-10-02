# Briefing: site v3 (reposicionamento pós-reunião)

_Aberto em 2026-10-01 pelo orquestrador. Fonte: `docs/reunioes/2026-09-29-lucas-mariana-marca.md` e a atualização no topo de `BRAND_FOUNDATION_FYND.md`._

## Pedido
O usuário pediu uma **v3 baseada na v2** (mesmo header e mesmo hero visual), com o copy voltado ao diferencial que a Mariana explicou: **a fynd não só encontra empresas com fit, ela faz o primeiro contato e entrega empresas que demonstraram interesse**. A v1 (`/`) e a v2 (`/v2`) **não podem ser alteradas**.

## Novo posicionamento (o que muda)
| Antes (v1/v2) | Agora (v3) |
|---|---|
| "Conte quem é o seu cliente ideal" | **"Diga o que você vende."** O cliente não precisa saber descrever o ICP |
| "Empresas priorizadas por aderência" | **"Empresas interessadas"**: só chega quem demonstrou interesse |
| "A fynd sugere o primeiro contato; você revisa e envia" | **A fynd faz o primeiro contato** e identifica o interesse |
| FAQ: "A fynd envia mensagens por mim? Não." | **Sim, a fynd faz o primeiro contato.** Você recebe o interessado e fecha |
| Público: times comerciais B2B | **PME B2B** que quer criar ou destravar um canal de prospecção ativa sem montar estrutura; o próprio dono pode atender |

**Frase-mãe:** "Você diz o que vende. A fynd encontra quem tem interesse. Você fecha."
**Limites (seguem valendo):** sem automação total ("o seu time decide e fecha"), sem "leads garantidos", sem "IA mágica". Não é compra de mailing nem lista fria.

## Pendências de validação (marcar `[validar]` e não inventar)
- O **canal** do primeiro contato (e-mail, WhatsApp, telefone ou LinkedIn): no site, escrever de forma neutra ("a fynd faz o primeiro contato"), sem nomear canal.
- Se o contato é humano, automatizado ou misto. Não afirmar nenhum dos três.
- O que conta como "demonstrou interesse". Use exemplos verossímeis dentro do protótipo, como uma resposta pedindo proposta, mas nada de taxa ou promessa no texto do site.
- "40 anos de experiência em prospecção/área comercial": pode entrar como `[validar]`, num bloco que só aparece se for confirmado.

## Arquitetura v3 (as seções continuam as mesmas; muda o conteúdo)
0. **Header:** igual ao da v2.
1. **Hero:** visual da v2 com o copy novo. Título baseado na frase-mãe. Dentro do MacBook vai a tela de **Interessados** em vez da lista de aderência. Os cards flutuantes contam o funil: o que você vende → empresas com fit → contatos feitos → interessados.
   - Ideia da Mariana: "o ponto no meio de todos os pontos". Na grade de pontos do fundo, **um único ponto aceso** (ciano, com pulso suave) representa encontrar o interessado.
2. **O problema:** lista fria / mailing comprado, sem estrutura para prospecção ativa, formulário de ICP que ninguém sabe responder.
3. **Como funciona, em 3 passos que espelham a frase-mãe:** **Você conta o que vende** → **A fynd encontra e faz o primeiro contato** → **Você recebe os interessados e fecha.**
4. **Demonstração (pin, 4 etapas):**
   1. **Conversa:** "o que você vende" (a tela de conversa atual quase serve; o título passa a ser "Nova busca", e a fynd infere os critérios sem perguntar ICP).
   2. **Empresas com fit:** a lista atual, enquadrada como o cruzamento com as bases. Não é a entrega final.
   3. **Primeiro contato (tela nova):** o andamento dos contatos, com o funil (contatadas → responderam → interessadas) e a linha do tempo de cada empresa.
   4. **Interessados (tela nova):** a entrega, com as empresas que demonstraram interesse, um trecho da resposta, o contexto e ações para o time ("Assumir conversa", "Agendar reunião"). O ciano marca "Demonstrou interesse".
5. **Dados:** fontes (Receita Federal + base própria) e "não é mailing: só chega quem demonstrou interesse".
6. **Para quem:** PME B2B; quem quer criar um canal de prospecção ativa; o dono que vende sozinho ("teste com poucos contatos sem contratar ninguém"); o time comercial que quer mais conversas qualificadas.
7. **CTA + FAQ** reescrito: "Preciso saber meu cliente ideal?" (não), "A fynd entra em contato em meu nome?" (sim, o primeiro contato `[validar canal]`), "É uma lista ou mailing?" (não), "Quanto custa?".
8. **Footer:** igual.

## Universo fictício (mantido)
Lumi Embalagens (Camila Rocha) vende embalagens flexíveis. A Serra Azul Alimentos é a empresa em destaque, agora como **interessada** (por exemplo, respondeu pedindo amostras ou proposta). Os números das telas são de demonstração: 148 empresas com fit, X contatadas, 12 interessadas. Mantenha a coerência entre telas e cards.

## Regras de arquivos (decisão do usuário: não sobrescrever versões)
- Rota nova: `src/app/v3/page.tsx` (noindex).
- Arquivos novos com sufixo `-v3`. **Não edite** os arquivos da v1/v2 (`hero.tsx`, `hero-v2.tsx`, `header-v2.tsx`, as seções sem sufixo e as telas da plataforma existentes). Uma seção que não muda pode ser reutilizada; uma que muda vira cópia `-v3`.

## Registro de decisões
- (preencher ao fim de cada etapa)
- **Copy (modo direto):** o hero é "Você vende, a gente encontra.", com `max-w` de 17ch. O funil da demo é 148 → 60 → 21 → 12. As telas C/D da v2 saem e entram as telas 3 (primeiro contato) e 4 (interessados). Aceito "Sócia-diretora" para a Camila. A troca do footer **não** foi aplicada.

## Contrato da etapa 4 (v3, dois engenheiros em paralelo)
**Engenheiro P3 (plataforma)** é dono **apenas** de `src/components/site/platform-v3/**`. Pode importar primitivos de `src/components/site/platform/*` e da UI, mas **não pode editar** nada fora da pasta dele. O `index.ts` exporta:
- `PlatformDemoV3({ step, state })`, com `step: 0|1|2|3` (conversa, fit, primeiro contato, interessados) e `state: "idle"|"play"|"final"`, mesma semântica da v1.
- `PlatformPanelV3({ step, state?, className? })`: a tela sem moldura, para o mobile.
- `HeroScreenV3({ play })`: a tela de Interessados, para o hero.
- `MiniContaV3`, `MiniEncontraV3` e `MiniFechaV3({ state?, delay?, className? })`: os recortes da seção 3.
- `SCREEN_LABELS_V3`: o aria-label de cada etapa (0–3) e `hero`.

**Engenheiro S3 (site)** é dono de `src/app/v3/page.tsx` e dos arquivos `src/components/site/sections/*-v3.tsx`. Reutiliza `header-v2.tsx`, `footer.tsx`, `NoiseList` e `MacBook` sem editar nada. Importa a plataforma de `@/components/site/platform-v3` pelo contrato.
- **Etapa 6 (correções da revisão de marca, decisão do orquestrador): aplicar tudo o que está no `09-revisao-marca-v3.md`.**
  - B1: tirar o card "Primeiro contato" do hero (sobram 3 cards: você vende → fit 148 → 12 interessadas).
  - B2: a tela 1 fica neutra ("Buscar empresas" e a mensagem sugerida pela revisão).
  - Subtítulo do hero começando pelo diferencial; microlinha voltada para PMEs B2B; o item "Primeiro contato incluído" da faixa de provas é reescrito.
  - Problema e Dados mostram estado de interesse, não fit. Como o `NoiseList` é compartilhado com a v1/v2, cria-se uma cópia v3.
  - Ciano do hero: o **único ponto aceso** é o ponto da Mariana. A trilha fica em steel e o ponto do selo vira paper. Dentro da tela, o selo "Demonstrou interesse" continua ciano.
  - Ajustes menores do documento, inclusive `footer-v3.tsx` com a linha nova (o footer da v1/v2 não muda).

- **01/10, pedido do usuário:** "Receita Federal" foi retirada do copy de todas as versões. Os trechos originais estão em comentários `[receita-federal-removido 2026-10-01]`. Não recolocar sem pedido explícito.
