# 09 · Revisão de marca · v5 (`/v5`, validação de mercado)

_Etapa 5 da v5 · 2026-10-07 · revisão do código implementado, por leitura (sem renderização)._
_Não verificado no navegador: ciano por dobra, altura total e HTML final sem nomes de terceiros._

## Veredito

Fiel ao material da cliente e às regras da marca. Dois bloqueios para divulgar a URL (imagem de compartilhamento e envio simulado), quatro correções importantes e ajustes menores de vocabulário. Nada impede mostrar a página à cliente.

## 1. Fidelidade ao material da cliente

| Bloco | Status | Onde | Observação |
|---|---|---|---|
| Hero: título | Atendido | `sections/hero-v5.tsx:185-186` | `fynd` minúsculo |
| Hero: subtítulo | Atendido | `hero-v5.tsx:192-193` | Literal |
| Hero: CTA | Atendido | `hero-v5.tsx:199`, `anchors-v5.ts:18` | |
| Hero: rótulo "geração de oportunidades B2B" | **Faltando** | `hero-v5.tsx` (entre 181 e 183) | Está no material, no briefing e no copy §1; sem motivo registrado |
| "validação de mercado · 2026" | Atendido | `footer-v5.tsx:48` | Movido para o footer (registrado) |
| 4 peças | Atendido | `problem-v5.tsx:13-16`, `:30`, `:36-37` | Literais |
| 3 passos | Atendido | `how-it-works-v5.tsx:19-39`, `:49`, `:53`, `:136` | Passo 2 na versão do HTML (registrado) |
| Lista × oportunidade | Atendido | `opportunity-v5.tsx:60-63`, `:77-83`, `:103-104`, `:45-50` | Texto "Hoje" do pptx e Serra Azul no lugar de "Empresa XYZ" (registrados). Eyebrow "A ENTREGA" do copy não entrou (o design pede sem eyebrow; conflito não registrado) |
| Camadas | Atendido | `difference-v5.tsx:27-30`, `:47`, `:53`, `:107-108` | Exemplos ocultos (`SHOW_EXAMPLES = false`, `:22`); "FYND" virou "É aqui que a fynd quer estar." (`:95`) |
| A diferença | Parcial (ênfase) | `difference-v5.tsx:116-132` | Textos literais. A frase-tese, que no material é uma citação gigante em seção própria, virou `h3` numa coluna lateral |
| Não é mais uma ferramenta | Atendido | `not-a-tool-v5.tsx:12`, `:23`, `:46-47`, `:50` | "para você" no lugar de "para o cliente" (registrado, `[validar]`) |
| Encerramento | Parcial (registrado) | `access-v5.tsx:20`, `:24`, `:29-30` | Sem o botão do material: o questionário já fica aberto na página (design §7.1) |
| Questionário: 11 perguntas | Atendido | `validation-form-v5.tsx:479-482`, `:487-500`, `:508-518`, `:528-533` | Literais |
| Questionário: opções | Atendido | `validation-form-v5.tsx:24-49` | 3 + 6 + 7 + 5 + 3, literais. Nenhuma pré-marcada (registrado) |
| Botão "Enviar interesse" e título do formulário | Atendido | `validation-form-v5.tsx:653`, `:573` | |
| Mensagem de sucesso | Atendido | `validation-form-v5.tsx:674-679` | Sem "neste protótipo" (registrado) |

Divergências sem motivo registrado:
- Falta o eyebrow do hero.
- Os cards flutuantes do hero ganharam numeração ("01 · Você explica", `hero-v5.tsx:41`, `:57`, `:70`); o copy pede só "VOCÊ EXPLICA" etc.
- Falta o eyebrow "A ENTREGA" da seção 4.

## 2. Regras da marca

| Regra | Status | Evidência |
|---|---|---|
| `fynd` minúsculo, nunca em `uppercase` por CSS | Atendido | Nenhum rótulo em caixa alta contém a palavra; `ZeroSetupStrip` desliga a caixa alta quando há "fynd" (`hero-parts-v5.tsx:199`) |
| Ciano raro | Atendido (por código) | Ponto do hero, selo "Interessada" (tela, mini 3, card da oportunidade), ponto da camada Resultado (`difference-v5.tsx:94`), botão "Enviar interesse" (`validation-form-v5.tsx:647`). Nenhum texto ciano, nenhum eyebrow, barra ou linha de acento |
| Só tokens | Atendido, com uma ressalva | `header-v5.tsx:108-109` usa `rgb(248_247_243/0.06)` literal (é o valor de `paper-50`, herdado da v4) |
| Nada do visual do HTML da cliente | Atendido | Sem barra ciano, sem eyebrow ciano, sem card com borda ciano |
| Sem "Receita Federal" | Atendido | Só num comentário (`data-v5.ts:4`) |
| Sem taxa ou % fora das telas | Atendido | "94%" só em tela, recorte e `aria-label`; "5.000" é ilustração registrada |
| Sem promessa de resultado | Atendido na página, **violado na imagem OG herdada** | Ver B1 |
| Nenhum concorrente visível | Atendido | Nomes só na estrutura de dados de um Server Component (`difference-v5.tsx:27-29`), atrás da flag |
| "IA" só na negação e dentro da tela | Atendido | `not-a-tool-v5.tsx:12`; `data-v5.ts:49` ("Especialista comercial com IA", na tela 1) |

## 3. Verdade de produto

- **Em desenvolvimento e piloto: dito com clareza** no pill do hero (`hero-v5.tsx:174`), na nota da demo (`demo-v5.tsx:72`), no encerramento (`access-v5.tsx:29-30`), no footer (`footer-v5.tsx:48`), na `description` (`app/v5/page.tsx:21-24`) e na mensagem de sucesso.
- **Restos da v4 nos componentes `-v5`: nenhum.** O único resto está fora deles: a imagem OG herdada (B1).
- **Telas sinalizadas como ilustrativas: só na demo.** O MacBook do hero e os três recortes de "Como funciona" não têm aviso visível (I2).

## 4. Coerência de vocabulário e do universo fictício

- **Oportunidade × interessados:** coerente com a decisão registrada. "Oportunidade" é a entrega; "Interessados" é a tela (título, menu, "Ver os 12 interessados", "Buscar interessado"); "Interessada" é o selo. O tooltip do shell já é "Nova oportunidade" (`shell-v5.tsx:133`).
- **"Lead" e "mailing":** ausentes. "Lista" só no título da seção 4, em "Sem construir listas" e na negação da demo (`demo-v5.tsx:34`).
- **4.860 → 12, Serra Azul (94%, 5 interações), Renata Moraes, Lumi, Camila:** consistentes em hero, recortes, card da oportunidade e telas. Os três recortes do Fit somam 4.860.
- Três pontas soltas: M1, M2 e M3 abaixo.

## Correções priorizadas

### Bloqueante (para divulgar a URL; não impede mostrar à cliente)

**B1 · Imagem de compartilhamento é a da v4**
- Decisão: a `/v5` herda `src/app/opengraph-image.tsx`.
- Impacto: o link compartilhado mostra "ZERO SETUP", "Você vende, a gente encontra." (`:77`) e "Zero setup. Só chegam interessados." (`:93`). Contradiz o título novo e promete resultado.
- Menor correção: criar `src/app/v5/opengraph-image.tsx` (arquivo novo, dentro da regra) com:
- rótulo `GERAÇÃO DE OPORTUNIDADES B2B`
- título "Você vende." / "A fynd encontra."
- linha de base "Em desenvolvimento · selecionando empresas para o piloto"
- `alt` "fynd · Você vende. A fynd encontra."

**B2 · Envio simulado com mensagem de sucesso real**
- Decisão: `submitValidationV5` só espera 1,2 s (`validation-form-v5.tsx:88-91`); a tela de sucesso diz "Interesse registrado." e "Vamos falar com você pelo contato informado." (`:673-679`).
- Impacto: quem responder acredita que foi registrado e não foi. Numa página cujo valor é honestidade, é a falha mais grave possível.
- Menor correção: ligar o destino real no corpo da função antes de divulgar. Enquanto não houver, a URL circula só internamente.

### Importante

**I1 · Hero sem o rótulo "GERAÇÃO DE OPORTUNIDADES B2B"**
- Impacto: nada acima da dobra diz "B2B"; o "para quem é" some dos 5 segundos.
- Menor correção: em `hero-v5.tsx`, um `RevealItem` antes do título (linha 183) com `<Text variant="eyebrow">GERAÇÃO DE OPORTUNIDADES B2B</Text>`. Se pill + eyebrow + título pesar, reduzir o `mt` do título.

**I2 · Mockup do hero sem aviso visível de ilustração**
- Impacto: uma tela completa com "12 empresas" e "94%" logo abaixo do CTA soa a produto pronto. O aviso só existe no `aria-label` (`hero-v5.tsx:29-30`) e na demo.
- Menor correção: legenda sob o MacBook, depois de `hero-v5.tsx:264`, em `text-xs text-steel-300` centrado: "Tela ilustrativa. O produto está em desenvolvimento."

**I3 · Privacidade e contato não validados, mas publicados**
- Impacto: "Usamos suas respostas só para avaliar o piloto e falar com você. Não compartilhamos seus dados." (`validation-form-v5.tsx:658-660`) é um compromisso sem política. O formulário coleta nome, contato e investimento. O `mailto:contato@fynd.com.br` (`footer-v5.tsx:14`, `:63-65`) pode não existir.
- Menor correção: esconder o e-mail até a confirmação, como já é feito com `LEGAL_LINKS`. Manter a frase de privacidade só com o aval da cliente; sem aval, reduzir a "Usamos suas respostas para avaliar o piloto e falar com você."

**I4 · A frase-tese ficou pequena**
- Decisão: "A fynd quer gerar a oportunidade para sua equipe." é `h3` numa coluna de 4 (`difference-v5.tsx:125-127`), sob o h2 "O mercado está evoluindo em camadas.".
- Impacto: no material da cliente, essa é a maior frase da página depois do hero. Aqui, o mapa de mercado pesa mais que a conclusão. O link "A diferença" do menu também cai num bloco cujo eyebrow é "O MERCADO" (`:43`).
- Menor correção: trocar `variant="h3"` por `variant="h2"` em `difference-v5.tsx:125`. Conferir a altura; se estourar, aplicar o corte 1 do design §0.1.

### Menor

**M1 · Tela 1 ainda diz "qualificar"**
- `data-v5.ts:57`: "…já comecei a abordar e qualificar."
- Sugerido: "Pronto. Encontrei 4.860 empresas com o seu perfil e já comecei a abordar e identificar interesse. Te aviso quando alguém quiser conversar."

**M2 · Recorte M3 ainda usa "Status"**
- `minis-v5.tsx:215`. A tela e o card da seção 4 já dizem "Interesse demonstrado".
- Sugerido: "Interesse" (cabe na linha).

**M3 · Rótulos e comentários de v4 sem uso**
- `data-v5.ts:208-212`: `MINI_LABELS_V5` não é usado e ainda diz "conta" e "interessada".
- `data-v5.ts:201`: `SCREEN_LABELS_V5.hero` duplica `HERO_SCREEN_LABEL`.
- `minis-v5.tsx:62`, `:112`, `:177`: comentários "Você conta / A gente encontra / Você fecha".
- `parts-v5.tsx:67`: `up` não é usado.
- Sugerido: apagar (regra do briefing: sem código morto).

**M4 · `aria-label` das telas da demo sem "Ilustração"**
- `data-v5.ts:202-204`.
- Sugerido: prefixar com "Ilustração da tela…", como no hero.

**M5 · "só o contato é obrigatório" é ambíguo**
- `validation-form-v5.tsx:576`. São três campos obrigatórios.
- Sugerido: "Responda o que souber: só a etapa de contato é obrigatória."

**M6 · Saída da demo sugere vaga**
- `demo-v5.tsx:92`: "Quer ver isso com o que a sua empresa vende?"
- Sugerido: "Quer testar isso com o que a sua empresa vende?"

**M7 · Frases inteiras em mono caixa alta**
- `access-v5.tsx:35-38`. Mono é papel de rótulo e dado.
- Sugerido: `text-sm` em caixa normal, com a primeira frase em `text-paper-50` e a segunda em `text-steel-300`.

**M8 · Título do questionário menor que o título da etapa**
- `validation-form-v5.tsx:572` (h4) × `:614` (h3).
- Sugerido: inverter os variantes.

**M9 · Numeração nos cards flutuantes do hero**
- `hero-v5.tsx:41`, `:57`, `:70`.
- Sugerido: seguir o copy ("Você explica", "Seu perfil", "Nova oportunidade") ou registrar a numeração.

**M10 · Eyebrow "A ENTREGA" ausente**
- `opportunity-v5.tsx:57`.
- Sugerido: registrar no briefing que vale o design (sem eyebrow) ou incluir.

**M11 · Cor literal no header**
- `header-v5.tsx:108-109`.
- Sugerido: `color-mix(in oklch, var(--paper-50) 6%, transparent)`.

**M12 · Serra Azul aparece cinco vezes**
- Tela do hero, card flutuante, recorte M3, card da seção 4 e etapa 3 da demo.
- Sugerido: nenhuma mudança agora; se a cliente achar repetitivo, o card flutuante 3 é o primeiro a sair.

## Lista de `[validar]` para a cliente

1. Destino das respostas do questionário (hoje nada é gravado).
2. Frase de privacidade e existência das páginas Privacidade e Termos.
3. E-mail `contato@fynd.com.br`.
4. Seção de camadas sem os nomes de empresas (ocultos por risco de citar terceiros). Ela aceita?
5. Fusão de "camadas" e "a diferença" numa seção, e tamanho da frase "A fynd quer gerar a oportunidade para sua equipe." (I4).
6. Encerramento sem o botão: o questionário já aparece aberto.
7. Faixas de valor com limites repetidos (R$ 1.000, 3.000 e 5.000 em duas faixas) e "Outro" sem campo de texto.
8. Nenhuma opção pré-marcada nas perguntas de escolha (no HTML dela a primeira vinha marcada).
9. "SDRs" na peça 01, ou "um time de prospecção".
10. "…não transferi-la para você" (era "para o cliente").
11. Passo 2: "aborda e identifica interesse" (HTML) em vez de "aborda e conversa" (pptx).
12. Card "Hoje": texto do pptx em vez do HTML.
13. "Seu time" (passo 3) × "sua equipe" (demais seções): manter os dois ou unificar.
14. Título "Você vende. A fynd encontra." no lugar do aprovado em 01/10 ("Você vende, a gente encontra.").
15. Universo fictício e números das telas como ilustração: 4.860, 12, 94%, 5 interações. Conferir que o CNPJ `00.418.392/0001-07` (`data-v5.ts:18`) não é de empresa real.
16. Coisas que as telas mostram e o MVP precisa fazer: "Sinal: em expansão (filial nova ou linha nova)" (`data-v5.ts:44`), "Especialista comercial com IA" com aprovação (`data-v5.ts:49`) e a aderência que sobe com as interações.
17. "Zero setup" e "Sem configurar IA" × o passo de aprovar o especialista na tela 1: é aprovação ou configuração?
18. Imagem de compartilhamento própria da `/v5` (B1).
