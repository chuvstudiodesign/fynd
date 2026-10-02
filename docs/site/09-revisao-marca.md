# 09 — Revisão de marca do site da fynd

_Etapa 5 do `/site` · agente `site-revisor-marca` · 2026-10-01_
_Fontes: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/site/**` (código e textos renderizados), `BRAND_FOUNDATION_FYND.md`, `DESIGN_PLAYBOOK.md`, `docs/site/00` a `05` e screenshots de `scratchpad/shots/` (alguns foram capturados no meio de animações e por isso não contam como evidência de bug)._

Formato: **decisão → impacto → menor correção eficaz**. A ordem é por prioridade. Nada foi editado.

## Veredito

O site fala com o cliente final. Não há nenhum trecho sobre fogo, chama, vela, luz ou desenho do logo. O hero passa no teste dos 5 segundos: "Saiba para quem vender agora." diz o que é, o eyebrow "PROSPECÇÃO B2B COM CONTEXTO" diz para quem, e "Pedir acesso antecipado" é o próximo passo. As dores da seção 2 ("Você compra uma lista, liga para metade dela…") e o FAQ estão na voz certa. As palavras proibidas ("IA", "revolucionário", "mágica", "leads garantidos", "automação") não aparecem. A plataforma é coerente entre as telas e é honesta sobre o envio: "Você revisa antes de enviar. A fynd não envia mensagens por você."

Antes de apresentar, faltam três coisas: um favicon da marca, o ciano duplicado da seção 3 e alguns recursos de produto que aparecem como fato sem `[validar]`.

---

## Bloqueadores (corrigir antes de mostrar à Mariana)

### B1. A aba mostra o favicon padrão do Next.js
- **Decisão:** `src/app/favicon.ico` é o arquivo padrão do create-next-app (25.931 bytes, o triângulo da Vercel). Não existe `icon.svg` nem `apple-icon`. A imagem OG também não existe (`layout.tsx`: "A imagem OG (1200×630) ainda não foi produzida").
- **Impacto:** é a primeira coisa de marca que a cliente vê na aba e no compartilhamento. Também é o único lugar onde o `f`-chama deveria aparecer no site (03-design §checklist).
- **Menor correção:** criar `src/app/icon.svg` a partir de `FChama` (navy-900 sobre paper ou paper sobre navy-900), apagar o `favicon.ico` padrão e adicionar um `opengraph-image.png` simples (wordmark + "Saiba para quem vender agora." sobre navy-900).
- **Status:** ✅ **Corrigido (etapa 6).** `src/app/icon.svg`: o `f`-chama em paper-50 sobre um quadrado navy-900 de cantos arredondados, com os paths do `FChama`. O `favicon.ico` foi apagado e hoje `/favicon.ico` responde 404. A imagem OG é `src/app/opengraph-image.tsx` (`ImageResponse`, 1200×630): navy-900, wordmark, eyebrow, "Saiba para quem vender agora." em Sora Light e "Menos lista fria. Mais clareza para vender.", sem ciano.

### B2. A dobra "Como funciona" tem dois cianos
- **Decisão:** em `how-it-works.tsx`, os três cards ficam lado a lado no desktop. O card 02 (`MiniLista`) tem a barra ciano de 5px do Serra Azul. O card 03 (`MiniAbordagem`) usa `HighlightParagraph`, que pinta o trecho "abriu uma unidade em Uberlândia neste ano" com `bg-signal-100`. Isso aparece no screenshot `d-04.png`. O 03-design §3 diz: "O ciano desta dobra é **só** a barra do Serra Azul na E2."
- **Impacto:** quebra a regra de no máximo um ciano por dobra justamente na seção que ensina o modelo mental. Também antecipa o realce que deveria ser o momento especial da etapa 4 da demo.
- **Menor correção:** dar ao `HighlightParagraph` uma prop `tone?: "signal" | "neutral"`. Em `minis.tsx`, passar `tone="neutral"` (`bg-navy-50`, ou só o negrito navy-900 sem fundo). A demo (etapa 4) continua com `signal-100`.
- **Status:** ✅ **Corrigido (etapa 6).** `HighlightParagraph` ganhou `tone`. A `MiniAbordagem` usa `tone="neutral"` (`bg-navy-50`), e a etapa 4 da demo continua com `signal-100`. Conferido no navegador: a dobra 3 tem só a barra do Serra Azul em ciano.

### B3. Recursos e números aparecem como fato sem `[validar]`
A Fundação de Marca §2 e o 01-arquitetura §5 pedem que integrações, canais e o que o MVP faz sejam validados. Hoje, estes trechos aparecem na tela e no código sem marcação:

| Onde | Texto renderizado | Por que é risco | Menor correção |
|---|---|---|---|
| `screen-abordagem.tsx`, seletor "Canal" | "E-mail · **LinkedIn**" | O 02-copy marca `[validar canais disponíveis no MVP]`, mas o código não tem a marcação. Sugere integração com o LinkedIn. | Adicionar `// [validar]` e, enquanto isso, deixar só "E-mail", ou trocar por "E-mail · Mensagem". |
| `audience.tsx`, coluna do líder | "Perfis ideais **compartilhados**", "dê ao time a mesma prioridade" | Promete um recurso multiusuário (time, compartilhamento) que não está na verdade de produto do briefing. | Adicionar `// [validar]`. Texto seguro: "Um perfil ideal claro para orientar o time". |
| `screen-oportunidades.tsx` | "12 empresas priorizadas · **atualizado hoje às 8h**" e "Oportunidades **da semana**" | Sugere atualização diária e um ciclo semanal. A Receita atualiza o CNPJ mensalmente, e a frequência está como `[validar]`. | Trocar por "12 empresas priorizadas · perfil Indústria Sudeste" e "Oportunidades", ou marcar `[validar]`. |
| `access.tsx`, FAQ "Quanto custa?" | "…de acordo com o **tamanho do seu time**." | Define um modelo de preço que ninguém validou. | "…as condições são apresentadas na demonstração." |
| `data.tsx`, H2 | "Dados **públicos**, organizados para vender." | A base própria de contas corporativas não é pública. O título contradiz o card 02 logo abaixo. | "Dados empresariais, organizados para vender." |
| `shell.tsx`, sidebar | Item "**Propostas**" | A fynd não gera propostas. O item promete um módulo fora da verdade de produto. | Remover o item, ou trocar por "Listas salvas" (coerente com o botão "Salvar na lista"). |

**Status (etapa 6):** ✅ todos corrigidos com a menor correção proposta.
- Canal: só "E-mail", com o comentário `[validar canais disponíveis no MVP]`.
- Coluna do líder: o texto ficou "Defina o perfil ideal uma vez e oriente o time com critério explicável para cada conta.", e o item "Perfis ideais compartilhados" virou "Um perfil ideal claro para orientar o time", com `// [validar]`.
- Tela de oportunidades: o título ficou "Oportunidades" e a linha, "12 empresas priorizadas · perfil Indústria Sudeste", com `[validar frequência de atualização]`.
- FAQ de preço: "…as condições são apresentadas na demonstração."
- H2 da seção 5: "Dados empresariais, organizados para vender."
- Sidebar: "Propostas" virou "Listas salvas", com ícone de lista.
- ⏸ A validação com a Mariana continua pendente.

Os itens que já estão corretamente contidos ficam como estão: o depoimento e a linha de LGPD só renderizam quando forem validados, e o e-mail `contato@fynd.com.br` e a linha "Sem spam…" estão marcados `[validar]` no código. **Atenção:** o domínio `fynd.com.br` ainda depende da validação de INPI e domínio (Fundação §10), então esse e-mail não pode ir ao ar.

---

## Alta prioridade

### A1. O CTA final volta a falar a língua da marca
- **Decisão:** o H2 da seção 7 é "Encontre o próximo sinal." O rodapé repete "Ilumine as oportunidades certas."
- **Impacto:** o usuário pediu que o site falasse com o empreendedor e não fosse conceitual. "Sinal" é vocabulário interno da marca (Fundação §7: "Uso em interface"). No ponto de conversão, o dono de empresa não sabe o que é "o próximo sinal". É o único título do site que não diz um benefício concreto.
- **Menor correção:** trocar o H2 por algo literal, por exemplo "Veja para quem vender, a partir do seu cliente ideal." ou "Comece pela conversa certa." (já previsto no 01-arquitetura). O rodapé pode manter a linha institucional, que é assinatura e não argumento, mas "Saiba para quem vender agora." fecha o ciclo com o hero e é mais coerente com o pedido.
- **Status:** ✅ **Corrigido (etapa 6).** O H2 da seção 7 agora é "Comece pela conversa certa." ⏸ O rodapé mantém "Ilumine as oportunidades certas." como assinatura, porque o orquestrador não pediu essa troca.

### A2. Frases longas em badge `label` (caixa alta mono) e "Para quem" quatro vezes
- **Decisão:** em `audience.tsx`, os badges `variant="label"` trazem "PARA QUEM VENDE SOZINHO OU LIDERA UMA OPERAÇÃO PEQUENA" e "PARA QUEM LIDERA UM TIME COMERCIAL". O eyebrow é "PARA QUEM", o H2 "Para quem vende e para quem lidera." e o lead "Funciona para quem…".
- **Impacto:** o mono em caixa alta e espaçado serve para rótulos curtos (papel "dados/rótulos"). Uma frase de oito palavras fica lenta de ler e parece ficha técnica (`d-12.png`). A repetição de "Para quem" enfraquece a hierarquia.
- **Menor correção:** reduzir os badges para "Quem vende" e "Quem lidera um time". Trocar o lead por um benefício: "Começa numa conversa, com ou sem time de vendas."
- **Status:** ⏸ **Pendente.** Fora do escopo da etapa 6: o orquestrador limitou a marca aos pontos B1, B2, B3 e ao CTA final.

### A3. O avatar da fynd no chat usa o wordmark reduzido (decisão para a Mariana)
- **Decisão:** `FyndAvatar` (`screen-conversa.tsx`) põe o wordmark com `h-2.5` num círculo de 32px. No canvas reduzido do MacBook, isso fica com cerca de 5px de altura. O 03-design proibiu o `FChama` no site.
- **Impacto:** a arquitetura de marca diz que o `f`-chama é o símbolo de redução para "avatar, favicon, app". Dentro do produto, um avatar é exatamente esse uso. Mostrar o símbolo sem explicá-lo não é conceitual. O wordmark nesse tamanho fica ilegível e não testa a marca no contexto real.
- **Menor correção:** usar `<FChama className="h-4 w-auto" />` dentro do `FyndAvatar` (paper-50 sobre navy-900) e registrar a exceção no 03-design: "o `FChama` aparece só no favicon e no avatar da fynd dentro da plataforma".
- **Status:** ⏸ **Pendente, decisão da Mariana.** O avatar continua com o wordmark, como manda o 03-design (decisão do orquestrador na etapa 6).

---

## Polimento

_Status (etapa 6): ⏸ P1 a P4 pendentes, fora do escopo das correções. O P2 (sincronia do indicador) não mudou de código, mas o snap sem inércia reduz as paradas no meio do scrub._

- **P1. Os nomes truncam na MiniLista** (`d-04.png`: "Serra Azul Alim…", "Bem Natural C…", "Cosméticos · Cont…"). No card de 1/3 de largura, a lista parece quebrada. **Correção:** em `MiniListaBody`, passar `meta` curto (só a cidade/UF) e reduzir a barra (`[&_[data-slot=opportunity-card-bar]]:w-8`), ou mostrar só duas linhas.
- **P2. O indicador da demo pode dessincronizar do texto.** O `pin-1.png` mostra "2 PRIORIDADES" ativo com o texto "03 / 04 · CONTEXTO" e a tela ainda na lista. Pode ser só a captura no meio do scrub (o texto segue a timeline com `scrub: 0.6`, e o `step` segue `self.progress`), mas vale conferir no navegador em rolagem lenta. Não é um problema de marca. Só é registrado porque a Mariana vai rolar devagar.
- **P3. "Mais dados não resolvem. Clareza resolve."** é o ponto de vista da marca e está no limite do conceitual. Funciona porque o lead logo abaixo traduz para o usuário ("Você não precisa de uma lista maior…"). Manter.
- **P4. Dois CTAs idênticos na primeira dobra** (header + hero, ambos "Pedir acesso antecipado"). Isso é aceitável e está previsto no 01-arquitetura. Se a Mariana achar redundante, o header pode esconder o botão enquanto o CTA do hero estiver visível, como já faz na seção 7.

---

## Auditoria: `fynd` em caixa alta por CSS

Varri todos os elementos com `uppercase` renderizados no site: `Text variant="eyebrow"`, `Badge variant="label"`, o indicador da demo (`demo.tsx:255`), `SectionTitle` do drawer (`screen-detalhe.tsx:21`) e a lista legal do footer (`footer.tsx:65`, que hoje está vazia).

| Elemento com `uppercase` | Textos | Contém "fynd"? |
|---|---|---|
| Eyebrows | PROSPECÇÃO B2B COM CONTEXTO · O DIA A DIA DE QUEM VENDE · 01/02/03 · COMO FUNCIONA · 01 · DESCREVA / 02 · RECEBA / 03 · ABORDE · NA PRÁTICA · 01 / 04 · CONVERSA … 04 / 04 · ABORDAGEM · DADOS · 01/02/03 · PARA QUEM · ACESSO ANTECIPADO | Não |
| Badge `label` | VOCÊ · FONTE · FONTE (diagrama de dados) · PARA QUEM VENDE SOZINHO… · PARA QUEM LIDERA… · PONTO DE CONEXÃO: NOVA FILIAL | Não |
| Indicador da demo | 1 CONVERSA · 2 PRIORIDADES · 3 CONTEXTO · 4 ABORDAGEM | Não |
| Títulos do drawer | DADOS CADASTRAIS · POR QUE ESTÁ NO TOPO · SINAIS DE CONTEXTO | Não |
| Links legais do footer | (não renderizam) | — |

**Resultado: nenhuma ocorrência atual.** Observações:
- O screenshot `d-14.png` (12:26) mostra "© 2026 **FYND**. TODOS OS DIREITOS RESERVADOS." Isso já foi corrigido: `footer.tsx` foi editado às 12:30 sem `uppercase`, e o `m-20.png` (12:32) confirma "© 2026 fynd.". Se esse screenshot for mostrado à cliente, é preciso refazê-lo.
- **Risco latente:** no diagrama de dados (`data.tsx`), o rótulo "Base fynd" está num `<span>` comum, mas os badges ao lado ("FONTE") são `label`. Se alguém trocar o tag pelo nome da fonte, aparece "BASE FYND". O mesmo vale para o rodapé de fontes do drawer (`font-mono` sem `uppercase`, hoje correto). **Correção preventiva:** um comentário `{/* nunca em Badge label/eyebrow: contém "fynd" */}` nesses dois pontos. ✅ **Aplicado (etapa 6)** em `data.tsx` (`SOURCES`) e em `screen-detalhe.tsx` (rodapé de fontes).
- Fora do CSS, toda ocorrência em texto está em minúsculas, inclusive no início de frase ("A fynd…"), no `title`/OG e nos `aria-label`. Não existe "Fynd" nem "FYND" em nenhuma string.

---

## Auditoria: ciano por dobra

Regra (03-design §checklist): no máximo **um** elemento ciano visível por dobra. O foco (`ring`, que é signal no tema escuro) não entra na conta.

| Dobra | Ciano visível | Conta | Status |
|---|---|---|---|
| Header | nenhum (CTA `default`, papel no escuro e navy no claro) | 0 | ok |
| 1 · Hero + MacBook | barra de 5px do Serra Azul na tela "Oportunidades" (aparece depois da cascata) | 1 | ok |
| 2 · Problema | barra de 5px da linha iluminada da `NoiseList` | 1 | ok |
| 3 · Como funciona | barra do Serra Azul na `MiniLista` (o realce da `MiniAbordagem` agora é `navy-50`) | 1 | ✅ ok (B2 corrigido) |
| 4 · Demo, etapa 1 | chip "Sinal: Filial aberta nos últimos 12 meses" (`Badge signal`) | 1 | ok |
| 4 · Demo, etapa 2 | barra do Serra Azul | 1 | ok |
| 4 · Demo, etapa 3 | barra do Serra Azul atrás do overlay; o drawer usa navy-600 | 1 | ok |
| 4 · Demo, etapa 4 | realce `signal-100` do ponto de conexão | 1 | ok |
| 4 · Saída do pin | CTA `default` (papel) | 0 | ok |
| 4 · Mobile empilhado | um ciano por painel, e cada painel ocupa a própria tela | 1 por painel | ok |
| 5 · Dados | barra do Serra Azul na "Lista priorizada" do diagrama | 1 | ok |
| 6 · Para quem | nenhum (checks em navy-600; o depoimento não renderiza) | 0 | ok |
| 7 · Acesso | submit `Button variant="signal"` (o único ciano preenchido do site) | 1 (+ ring de foco) | ok |
| Footer | nenhum | 0 | ok |

O ciano **nunca** aparece como texto sobre fundo claro. O chip de sinal usa texto `signal-foreground` (#171925) sobre ciano, e o realce usa texto navy-900 sobre `signal-100`. O ciano não aparece em `primary`, em divisórias nem no indicador de progresso.

---

## Checklist do agente

| Pergunta | Resposta |
|---|---|
| Fala com o empreendedor e o gestor, e não sobre a marca? Sobrou algo sobre fogo ou logo? | Sim. Não há nada sobre fogo ou logo. Os pontos conceituais que restam são "Encontre o próximo sinal." (A1) e, de forma aceitável, a linha do rodapé. |
| Alguma promessa além da verdade de produto? | Sim: LinkedIn, perfis compartilhados, "atualizado hoje às 8h", preço por tamanho de time, "Dados públicos" e "Propostas" (B3). "Sem envio automático" está explícito e correto. |
| `fynd` sempre em minúsculas? Palavras proibidas? | Sim, sem ocorrências (ver a auditoria). Nenhuma palavra proibida. |
| Ciano como sinal, nunca texto em fundo claro, no máximo um por dobra? | Uma violação, na dobra 3 (B2). O resto está ok. |
| Tipografia nos papéis certos? | Sim: Sora light no display/H1, Manrope na leitura, Plex Mono em rótulos e dados. Exceção: frases longas em badge `label` (A2). |
| O protótipo é verossímil e coerente com o MVP? | Sim. O universo (Lumi / Camila / Serra Azul), os CNPJs fictícios `00.`, as fontes por dado e o "[nome]" no rascunho estão bem resolvidos. Ajustes: "Propostas", LinkedIn e o avatar com wordmark ilegível (B3, A3). |
| Hero em 5 segundos: o quê, para quem, próximo passo? | Passa. |

## Checklist de liberação

- [x] Favicon `f`-chama e imagem OG (B1) ✅
- [x] Um ciano na dobra 3 (B2) ✅
- [ ] Os itens de B3 corrigidos ou marcados `[validar]` (✅ etapa 6), e validados com a Mariana (⏸)
- [x] H2 da seção 7 literal (A1) ✅ "Comece pela conversa certa."
- [ ] Nome `fynd` e domínio `fynd.com.br` confirmados (INPI/domínio) antes de publicar o e-mail de contato
- [ ] Screenshots para a apresentação refeitos depois das correções (o `d-14.png` está desatualizado)
- [ ] Teste real: rolagem lenta da demo (P2), mobile a 390px e `prefers-reduced-motion`
