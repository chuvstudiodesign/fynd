# 01 — Arquitetura do site da fynd

_Etapa 1 do `/site` · agente `site-arquitetura` · 2026-10-01_
_Base: `00-briefing.md`, `BRAND_FOUNDATION_FYND.md`, `DESIGN_PLAYBOOK.md` §4, `skills/brand-strategy/SKILL.md`, `src/components/opportunity-card.tsx`, `src/app/demos/sidebar/app-shell-demo.tsx`._

Formato: landing page única em `/`, com âncoras, 9 seções contando header e footer. Sem 3D. A plataforma aparece num MacBook já no hero e é demonstrada passo a passo em uma seção com pin de scroll.

---

## 1. Público e o que cada um precisa sentir

| | Quem é | O que precisa sentir para clicar |
|---|---|---|
| **Principal** | Empreendedor ou dono de empresa B2B (PME e média) que vende para outras empresas e ainda prospecta "na mão", com planilhas e listas compradas. Muitas vezes é ele quem vende. | "Isso me poupa horas e me diz **para quem ligar agora**, sem eu precisar montar um time de dados ou configurar um CRM gigante." Alívio e controle, sem promessa milagrosa. |
| **Secundário** | Líder ou gestor comercial (diretor, head de vendas, coordenador de SDRs) responsável por gerar pipeline para o time. | "Meu time vai gastar tempo nas contas certas, e eu consigo explicar **por que** cada conta foi priorizada." Confiança no critério e nos dados, mais o contexto para orientar a abordagem. |

Tensão a resolver (regra da brand-strategy): **credível lidera, energia acompanha**. O site deve parecer sofisticado e vivo, mas cada afirmação precisa caber no que o MVP faz hoje.

## 2. Ações do site

- **Ação principal:** pedir acesso antecipado / demonstração. Formulário curto (nome, e-mail corporativo, empresa, cargo, campo opcional "Quem é o seu cliente ideal?"). Rótulo sugerido: "Pedir acesso antecipado". Sem backend nesta versão (estado de sucesso simulado).
- **Ação secundária:** "Ver como funciona", âncora para a demonstração com pin (seção 4). Serve a quem ainda não está pronto para deixar o contato.
- Regra de repetição: o CTA principal aparece no header (fixo), no hero, ao fim da demonstração e na seção final. Não repetir em todas as dobras.

## 3. Mapa de seções

| # | Seção | Pergunta do comprador | Altura |
|---|---|---|---|
| 0 | Header | "Onde estou? Como falo com eles?" | fixo, fino |
| 1 | Hero + MacBook | "O que é?" | longa (100vh+) |
| 2 | O problema | "Isso é para mim?" | média |
| 3 | Como funciona (3 passos) | "Como funciona, em resumo?" | média |
| 4 | Demonstração guiada | "Como é usar de verdade?" | **pin de scroll** (~400vh) |
| 5 | De onde vêm os dados | "Posso confiar nos dados?" | média |
| 6 | Para quem / esforço | "Quanto esforço dá? Serve para meu time?" | média |
| 7 | CTA final + formulário | "Qual o próximo passo?" | média |
| 8 | Footer | institucional | curta |

### 0. Header
- **Objetivo:** orientar e manter o CTA sempre à mão.
- **Conteúdo:** wordmark `fynd` (sem explicação do símbolo); âncoras "Como funciona", "Dados", "Para quem"; botão "Pedir acesso antecipado". Transparente sobre o hero, ganha fundo com blur após o primeiro scroll.
- **CTA:** principal.

### 1. Hero com MacBook
- **Objetivo:** dizer em uma frase o que a fynd faz e mostrar o produto imediatamente.
- **Pergunta:** "O que é?"
- **Conteúdo:** headline de benefício (território: "Ilumine as oportunidades certas" / "Saiba para quem vender agora"); subtítulo com a explicação curta ("A fynd ajuda seu time a encontrar empresas com maior potencial de compra a partir de uma conversa sobre o seu cliente ideal"); dois botões (principal + "Ver como funciona"). Abaixo, o **MacBook com a tela "Oportunidades"** (app shell com sidebar + lista de `OpportunityCard`). Animação de entrada: a tampa/tela sobe com o scroll inicial (scale/rotateX leve, GSAP scrub), e os cards da lista entram em cascata com o % de aderência contando. O ciano aparece só no card ativo.
- **CTA:** principal + secundário.

### 2. O problema
- **Objetivo:** gerar identificação com a dor antes de explicar o produto.
- **Pergunta:** "Isso é para mim?"
- **Conteúdo:** frase-tese ("Mais dados não resolvem. Clareza sobre onde agir resolve.") e 3 dores curtas em colunas: listas frias e desatualizadas; horas montando e limpando planilhas; time ligando para quem não tem perfil. Motion: texto revelado por palavra/linha conforme o scroll (scrub), sem pin. Pode haver um contraste visual "lista genérica cinza → uma linha iluminada", feito com a própria UI, nunca com fogo.
- **CTA:** nenhum (ponte para a seção 3).

### 3. Como funciona (resumo em 3 passos)
- **Objetivo:** dar o modelo mental antes da demonstração detalhada.
- **Pergunta:** "Como funciona, em resumo?"
- **Conteúdo:** 3 passos numerados com ícone/mini-UI: **1. Descreva** seu cliente ideal numa conversa. **2. Receba** as empresas priorizadas por aderência, com contexto. **3. Aborde** com uma sugestão de primeiro contato. Cards com entrada escalonada (Motion).
- **CTA:** secundário discreto ("Ver na prática ↓").
- _Nota:_ se a página ficar longa, esta seção pode ser fundida como "trilho de passos" fixo dentro da seção 4. Recomendo manter separada na v1 para quem rola rápido.

### 4. Demonstração guiada (pin de scroll) — seção principal
- **Objetivo:** provar que o produto é real e simples, mostrando o fluxo inteiro dentro do MacBook.
- **Pergunta:** "Como é usar de verdade?"
- **Mecânica:** o MacBook fica fixo (GSAP ScrollTrigger `pin`, ~400vh, `scrub`). À esquerda (desktop) ou acima (mobile), um texto curto por etapa com indicador de progresso 1–4. A tela troca a cada etapa com transição suave (crossfade + leve deslocamento); elementos internos animam (mensagem digitando, lista ordenando, barra de aderência preenchendo).
- **Etapas:**
  1. **Conversa sobre o cliente ideal** — tela "Conversas": o usuário escreve algo como "Indústrias do Sudeste, 200 a 500 pessoas, que compram embalagem"; a fynd responde confirmando critérios em chips (setor, região, porte). Texto lateral: "Comece explicando quem você quer atender, do seu jeito."
  2. **Lista priorizada** — tela "Oportunidades": lista de `OpportunityCard` reordenando por aderência (92%, 84%, 77%…), com o perfil "Indústria Sudeste" no breadcrumb. Texto: "A fynd cruza seu perfil com bases empresariais e ordena as empresas com maior potencial."
  3. **Detalhe da empresa com contexto** — painel/drawer da empresa ativa: dados cadastrais (CNPJ, CNAE, porte, cidade, tempo de atividade), "por que está no topo" (critérios atendidos em lista), sinais de contexto. Texto: "Veja por que cada empresa foi priorizada antes de investir uma ligação."
  4. **Sugestão de abordagem** — rascunho de primeira mensagem editável, com tom e ponto de conexão citado; botões "Copiar" e "Ajustar". Texto: "Receba uma sugestão de primeiro contato. Você revisa e decide." (deixar explícito que a decisão é humana; sem "envio automático").
- **CTA:** ao soltar o pin, botão principal "Pedir acesso antecipado".
- **Mobile:** sem pin longo; as 4 etapas viram blocos empilhados, cada um com a tela do MacBook recortada (ou só a tela, sem moldura) e entrada simples.

### 5. De onde vêm os dados
- **Objetivo:** dar credibilidade ao critério (principal objeção do gestor comercial).
- **Pergunta:** "Posso confiar nos dados?"
- **Conteúdo:** 2 blocos de prova: **CNPJs da Receita Federal organizados** e **base própria de contas corporativas**. Um terceiro bloco curto sobre critério transparente ("cada empresa mostra por que foi priorizada"). Uma linha sobre responsabilidade no uso de dados / LGPD `[validar redação com jurídico]`. Números de escala (quantidade de empresas na base, atualização) só se validados: `[validar]`. Visual: diagrama simples "seu perfil + bases → lista priorizada", feito com componentes da UI; contador numérico animado apenas se houver número real.
- **CTA:** nenhum.

### 6. Para quem / quanto esforço
- **Objetivo:** responder "serve para mim e dá trabalho?" para os dois públicos.
- **Pergunta:** "Quanto esforço dá? Serve para meu time?"
- **Conteúdo:** duas colunas — **Para quem vende sozinho ou lidera uma operação pequena** (começa numa conversa, sem implantação longa) e **Para quem lidera um time comercial** (prioridade compartilhada, critério explicável, contexto para orientar a abordagem). Abaixo, 3 garantias honestas de esforço: sem implantação longa; sem planilha para montar; você mantém o controle do contato. Espaço reservado para depoimento de cliente piloto `[validar]` — se não houver, a seção sai sem ele (não usar depoimento fictício).
- **CTA:** nenhum (ou link secundário para a seção 7).

### 7. CTA final + formulário
- **Objetivo:** converter.
- **Pergunta:** "Qual o próximo passo?"
- **Conteúdo:** título convidativo ("Encontre o próximo sinal." / "Comece pela conversa certa."), frase sobre o acesso antecipado (vagas limitadas só se for verdade `[validar]`), formulário curto descrito na §2, estado de sucesso. Fundo azul profundo `#0B1F32` com o ciano apenas no foco/botão. Possível FAQ curto (3–4 perguntas: "A fynd envia mensagens por mim?", "De onde vêm os dados?", "Preciso integrar meu CRM?" `[validar]`, "Quanto custa?" → "falamos na demonstração").
- **CTA:** principal (submit).

### 8. Footer
- **Conteúdo:** wordmark, linha institucional, âncoras, e-mail de contato `[validar]`, links de privacidade/termos `[validar se existem]`, © fynd. Sem redes sociais até confirmar perfis.

## 4. Telas da plataforma necessárias

Todas renderizadas como componentes React reais dentro do mockup MacBook, reaproveitando o app shell (`src/app/demos/sidebar/app-shell-demo.tsx`) e o design system. Nada de imagem estática. Sem a palavra "protótipo" na página.

| Tela | Onde aparece | O que mostra | Base existente |
|---|---|---|---|
| **A. Oportunidades (lista)** | Hero (1) e etapa 2 da demo (4) | Sidebar (Visão geral, Oportunidades, Conversas, Propostas; perfis ideais), breadcrumb do perfil, título "Oportunidades da semana", lista de `OpportunityCard` com % de aderência e barra; um item ativo com barra ciano | App shell + `OpportunityCard` — praticamente pronta; precisa de versão "estática animável" (reordenação, contagem de %) |
| **B. Conversa do cliente ideal** | Etapa 1 da demo | Thread de chat: mensagem do usuário, resposta da fynd com chips de critérios extraídos (setor, região, porte, sinal) e botão "Buscar empresas" | Nova; usar componentes de input/badge/card do DS |
| **C. Detalhe da empresa** | Etapa 3 da demo | Drawer/painel lateral sobre a lista: avatar, nome, CNPJ, CNAE, porte, cidade, tempo de atividade; bloco "Por que está no topo" com critérios atendidos (check) e aderência; fonte do dado (Receita Federal / base fynd) | Nova; compor com Drawer/Card/`CompanyAvatar` do DS |
| **D. Sugestão de abordagem** | Etapa 4 da demo | Rascunho de primeira mensagem (e-mail ou LinkedIn) com destaque do ponto de conexão, seletor de tom, botões "Copiar" e "Ajustar"; nota "Você revisa antes de enviar" | Nova |
| **E. Mini-UIs dos 3 passos** | Seção 3 | Recortes pequenos de B, A e D | Derivadas de A/B/D |

Dados fictícios: usar empresas claramente genéricas (Alfa Embalagens, Norte Metais…, como no demo atual) e CNPJs com formato válido mas fictício (ex.: `00.000.000/0001-00`), para não expor empresa real.

## 5. Itens que dependem de validação `[validar]`

- Números de escala da base (quantidade de CNPJs/empresas, frequência de atualização).
- Qualquer métrica de resultado (tempo economizado, taxa de resposta, % de aderência média). **Não usar nenhum número real até ter fonte.**
- Logos de clientes ou pilotos (faixa de logos fica fora até haver autorização).
- Depoimentos (nome, cargo, empresa, foto, autorização).
- O que o MVP faz hoje em contato inicial: se a sugestão de abordagem já existe, e em quais canais (e-mail, LinkedIn, WhatsApp).
- Integrações (CRM etc.) — não citar até confirmar.
- Redação sobre LGPD / uso responsável de dados.
- Promessa de "vagas limitadas" ou prazo do acesso antecipado.
- E-mail de contato, política de privacidade, termos, perfis sociais.
- Headline final (as frases da Fundação de Marca são "territórios de teste").

## 6. Referências consultadas para calibrar a estrutura

- https://linear.app — produto mostrado na primeira dobra, UI real como herói, ritmo de seções curto.
- https://attio.com — CRM B2B com interface como protagonista e demonstração de fluxo por scroll.
- https://www.clay.com — prospecção B2B baseada em dados: explica fontes de dados e enriquecimento sem jargão excessivo.
- https://www.apollo.io — mesma categoria (prospecção B2B); referência do que **não** fazer: promessas de volume e muitos números.
- https://www.raycast.com — uso de mockup de máquina + scroll com pin para contar o fluxo do produto.

Padrões adotados: produto na 1ª dobra; uma única narrativa pinada em vez de várias; seção de dados/confiança separada; CTA repetido só nos pontos de decisão; sem faixa de logos até haver clientes reais.
