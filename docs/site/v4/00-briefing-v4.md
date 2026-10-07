# Briefing: site v4 (revisão da LP com a Mariana e o Eduardo)

_Aberto em 2026-10-07 pelo orquestrador, a pedido do Matheus, em modo direto ("pode começar"). Fontes obrigatórias:_
- _`docs/reunioes/2026-10-01-lucas-mariana-eduardo-revisao-lp.md`: os pedidos da reunião, ponto a ponto (numerados de 1 a 30)_
- _`docs/reunioes/2026-10-01-escopo-negocio-fynd.md`: o escopo do negócio escrito pela Mariana_
- _Base anterior: `docs/site/v3/00-briefing-v3.md`, `docs/site/v3/02-copy-v3.md` e o código `*-v3`_

## Pedido
Aplicar **todos** os ajustes da reunião e reorientar a página pelo escopo da Mariana. A página precisa ficar **menor, mais direta e com mais impacto comercial** ("o que é, o que não é, para quem é"). A **simplicidade / zero setup** vira o argumento central, ao lado do "só chegam interessados".

## O que muda de posicionamento (v3 → v4)
| v3 | v4 |
|---|---|
| Diferencial = "a fynd faz o primeiro contato" | Diferencial = **lead interessado (quente), já qualificado**. O primeiro contato é processo interno, fica "no off" e não aparece como etapa nem como promessa |
| "Mais lista não resolve" | **"Mais mailing não resolve. Interesse resolve."** |
| "Menos lista fria. Mais empresas interessadas." | Algo mais atrativo na linha **"troque o lead frio pelo lead quente"** / mais oportunidade, mais fechamento |
| "Sem formulário de cliente ideal" como argumento principal | **Zero setup**: você contrata e já começa funcionando. Sem configurar, sem subir base, sem mailing, sem entender de tecnologia. Aparece no hero (ou logo abaixo) **e** no encerramento |
| Demo em 4 etapas (Conversa, Fit, Primeiro contato, Interessados) | **Demo em 3 etapas: Seu produto → Fit → Interessados** |
| Tela de Fit = lista de 148 empresas com % de fit | Tela de Fit = **volume** ("encontramos 4.860 empresas com o seu perfil"), **sem nomes de empresa e sem aderência** |
| % de fit por empresa na lista | A **aderência aparece só nos interessados** e reflete a interação (respondeu e interagiu mais → aderência maior) |
| Seção "Dados" com fontes | Sai como seção. A base vira **um argumento curto de volume**: "mais de 25 milhões de CNPJs, do Brasil todo, organizados". **Nunca citar Receita Federal.** "Para o cliente, não importa onde nem como a fynd encontrou" |
| "Não é mailing" | **"Você não precisa se preocupar com mailing."** Não é CRM, chatbot, base de leads nem automação: é o resultado delas sem precisar saber usá-las. A complexidade fica com a fynd |

**Frases aprovadas pelo cliente (manter):** "Você vende, a gente encontra." (hero) · "Você conta, a fynd encontra, você fecha." (Eduardo: "é o slogan") · "Para vender mais sem montar estrutura." · "Teste sem contratar ninguém."
**Frases do escopo para usar:** "Zero setup. Foco no resultado." · "A complexidade fica com a fynd." · "O que você quer vender?" · "Aqui estão empresas com quem seu time deveria falar agora." · ciclo **entender → encontrar → abordar → conversar → qualificar → entregar**.

## Arquitetura v4 (mais curta)
0. **Header**: igual ao da v2 no visual. Âncoras: Como funciona · Na prática · Para quem. Botão de acesso antecipado.
1. **Hero**: título mantido. Subtítulo novo, mais atrativo, focado em entregar empresas interessadas (sem destacar "primeiro contato"). **Linha/faixa de "zero setup"** logo abaixo dos botões, sem poluir. CTA principal de acesso antecipado no tom "garanta sua vaga". MacBook com a tela de Interessados v4. Cards flutuantes: Você vende → 4.860 empresas com o seu perfil → 12 interessadas.
2. **O problema, com contraste**: título com "mailing". Dores lidas como **negativo (X em `destructive`)** e, ao lado, **o jeito fynd (check)**, com "sem setup" muito claro. Atenção ao alerta do Eduardo: não virar comparativo sistema × sistema; é **o seu dia a dia hoje × com a fynd**. Fecha com a frase "lead frio → lead quente".
3. **Como funciona**: "Você conta, a fynd encontra, você fecha." Subtítulo de **zero setup**. Passo 2 reescrito com punch: cruza com a base, encontra quem tem o seu perfil, **aborda e qualifica**, separa quem tem interesse. Abaixo dos 3 passos, uma faixa compacta do **motor**: entender → encontrar → abordar → conversar → qualificar → entregar, com "A complexidade fica com a fynd."
4. **Na prática (demo com pin, 3 etapas)**: Seu produto · Fit · Interessados.
   - **Seu produto**: a Camila informa o CNPJ e conta o que vende; anexa o site e um catálogo (chips de anexo: site, PDF). A fynd resume o que entendeu e propõe o perfil. Mostrar, numa linha, que dá para **validar a abordagem antes de começar** ("Especialista comercial" da Lumi, pronto para aprovação) sem transformar isso em configuração.
   - **Fit**: número grande de empresas com o seu perfil (4.860), recortes agregados (setores, regiões, porte), **sem nomes e sem %**. "A fynd já começou a abordar e qualificar." 
   - **Interessados**: "Responderam e querem saber mais". Cards no formato do escopo: Empresa · Contato (nome e cargo) · Interesse identificado · Status · Próximo passo · aderência (%). Ações "Assumir conversa" / "Agendar reunião".
5. **"Você só precisa vender"** (substitui Dados): "Não é CRM. Não é chatbot. Não é base de leads. Não é automação." + "Você não precisa…" (buscar mailing, fazer setup, subir sua base, configurar automação, definir cliente ideal, entender de tecnologia) + "Você só precisa atender quem já quer comprar." + uma linha de base: mais de 25 milhões de CNPJs, do Brasil todo, organizados, e a inteligência aprende a cada interação. Curta.
6. **Para quem** (compacta): "Para vender mais sem montar estrutura." Duas colunas curtas (quem vende sozinho: "Teste sem contratar ninguém." / quem lidera um time) + chips com o público do item 7 do escopo.
7. **Acesso antecipado + FAQ** (encerramento): título com a pergunta-essência **"O que você quer vender?"**, reforço de zero setup, formulário (o mesmo da v3) e FAQ enxuto (até 5 perguntas). **Preço: não falar de modelo** (não definido); manter "condições apresentadas no acesso antecipado".
8. **Footer**: o da v3 com as âncoras novas e a linha "Você vende, a gente encontra."

## Regras que continuam valendo
- `fynd` sempre minúsculo e nunca em texto com `uppercase` por CSS.
- Não vender pela tecnologia: "IA" não é argumento de headline. Pode aparecer como "motor" no máximo uma vez, discreta. Sem "automação" como promessa, sem "leads garantidos", sem taxa/% no texto do site (números só dentro das telas).
- Não nomear o canal do primeiro contato. Não dizer "a fynd faz o primeiro contato" como diferencial; quando precisar, "a fynd aborda e qualifica".
- A decisão e o fechamento são do cliente.
- Ciano raro: o selo de interesse dentro da tela e o ponto aceso do hero. O X das dores usa `destructive`, só no ícone.
- Sem "Receita Federal" em nenhum texto.

## Universo fictício (atualizado)
Lumi Embalagens (Camila Rocha, Sócia-diretora), embalagens flexíveis para alimentos e cosméticos. Funil: **4.860 empresas com o seu perfil → 12 interessadas** (o miolo do contato não aparece). Interessadas: Serra Azul Alimentos (ativa, pediu amostras), Bem Natural Cosméticos (pediu proposta), Casa Doce Biscoitos, Grão Fino Cafés, Nativa Snacks, Aroma da Serra Cosméticos. Cada uma ganha contato (nome e cargo), interesse identificado, status, próximo passo e aderência coerente com a interação.

## Regras de arquivos
- A v4 vira a página principal (`src/app/page.tsx`). A v3 atual vai para `src/app/v3/page.tsx` (noindex, como a v1 e a v2) e o redirect `/v3 → /` sai do `next.config.ts`.
- Arquivos novos com sufixo `-v4` (`src/components/site/sections/*-v4.tsx`, `src/components/site/platform-v4/**`, `header-v4`/`footer-v4` se precisarem mudar). **Não editar** arquivos `-v3`, `-v2` nem os sem sufixo; reutilizar o que não muda.
- Entregáveis em `docs/site/v4/`.

## Registro de decisões
- 2026-10-07: arquitetura acima definida pelo orquestrador a partir da reunião e do escopo (modo direto, sem portões).
- 2026-10-07, conflitos entre 02/03/04 (regra: copy vence em texto, design em cor e layout, motion em timing):
  - **Texto final é sempre o do `02-copy-v4.md`.** Os textos do `03-design-v4.md` são provisórios. Ex.: "Só precisa atender quem já tem interesse" (copy) vence "quem já quer comprar" (design). Linha de zero setup: texto do copy, layout do design (mono discreto abaixo dos botões, sem ciano).
  - **Pin da demo: 240vh** (motion) e não 300vh (design). Etapa = `floor(p*3 + 0.12)`.
  - Números de recortes da tela Fit e contatos fictícios: valem os do copy; onde o copy não define, os do design.
  - `anchors-v4.ts`, `header-v4.tsx` (cópia do v2 lendo anchors-v4) e `hero-parts-v4.tsx` (cópia das partes de fundo do hero-v3) são arquivos novos.

## Contrato da etapa 4 (v4, dois engenheiros em paralelo)
**Engenheiro P4 (plataforma)** é dono **apenas** de `src/components/site/platform-v4/**`. Pode importar de `platform-v3/*`, `platform/*` e da UI, sem editá-los. O `index.ts` exporta:
- `PlatformDemoV4({ step, state })`, com `step: 0|1|2` (seu produto, fit, interessados) e `state: "idle"|"play"|"final"`, mesma semântica da v3.
- `PlatformPanelV4({ step, state?, className? })`: a tela sem moldura, para o mobile.
- `HeroScreenV4({ play })`: a tela de Interessados, para o hero.
- `MiniContaV4`, `MiniEncontraV4` e `MiniFechaV4({ state?, delay?, className? })`: os recortes da seção Como funciona (o MiniEncontra mostra 4.860 → 12, sem contato).
- `SCREEN_LABELS_V4`: o aria-label de cada etapa (0–2) e `hero`.

**Engenheiro S4 (site)** é dono de `src/app/page.tsx`, `src/components/site/sections/*-v4.tsx`, `anchors-v4.ts`, `header-v4.tsx`, `footer-v4.tsx` e `hero-parts-v4.tsx`. Importa a plataforma de `@/components/site/platform-v4` pelo contrato. Não edita nada `-v3`, `-v2` ou sem sufixo.
