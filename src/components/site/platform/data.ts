/**
 * Universo fictício do produto (02-copy.md). Coerente entre todas as telas.
 * Nomes inventados; CNPJs começam com `00.` para nunca coincidir com empresa real.
 */

export type ScreenState = "idle" | "play" | "final"

export const USER = { name: "Camila Rocha", role: "Diretora comercial", company: "Lumi Embalagens" }

export const PROFILE = "Indústria Sudeste"

export type Opportunity = { company: string; meta: string; fit: number }

/** Ordem final da tela A (92 → 58). Serra Azul Alimentos é a ativa. */
export const OPPORTUNITIES: Opportunity[] = [
  { company: "Serra Azul Alimentos", meta: "Alimentos · Jundiaí, SP · 320 pessoas", fit: 92 },
  { company: "Bem Natural Cosméticos", meta: "Cosméticos · Contagem, MG · 410 pessoas", fit: 84 },
  { company: "Laticínios Vale Verde", meta: "Alimentos · Juiz de Fora, MG · 260 pessoas", fit: 77 },
  { company: "Casa Doce Biscoitos", meta: "Alimentos · Vila Velha, ES · 230 pessoas", fit: 71 },
  { company: "Prisma Higiene Pessoal", meta: "Cosméticos · Campinas, SP · 480 pessoas", fit: 64 },
  { company: "Grão Fino Cafés", meta: "Alimentos · Varginha, MG · 210 pessoas", fit: 58 },
]

export const ACTIVE_COMPANY = OPPORTUNITIES[0].company

/** Ordem inicial da etapa 2 (71, 92, 58, 84, 64, 77), antes de reordenar. */
export const INITIAL_ORDER: string[] = [
  "Casa Doce Biscoitos",
  "Serra Azul Alimentos",
  "Grão Fino Cafés",
  "Bem Natural Cosméticos",
  "Prisma Higiene Pessoal",
  "Laticínios Vale Verde",
]

export const FINAL_ORDER: string[] = OPPORTUNITIES.map((o) => o.company)

export const LIST_CRITERIA = ["Alimentos e cosméticos", "Sudeste", "200 a 500 pessoas", "Filial recente"]

export const CAMILA_MESSAGE =
  "Vendo embalagens flexíveis. Quero indústrias de alimentos e cosméticos no Sudeste, entre 200 e 500 pessoas. Se estiverem abrindo filial, melhor ainda."

export const CHAT_CRITERIA: { label: string; value: string; signal?: boolean }[] = [
  { label: "Setor", value: "Alimentos, Cosméticos" },
  { label: "Região", value: "SP, MG, RJ, ES" },
  { label: "Porte", value: "200 a 500 pessoas" },
  { label: "Sinal", value: "Filial aberta nos últimos 12 meses", signal: true },
]

export const COMPANY_DATA: { label: string; value: string; wide?: boolean }[] = [
  { label: "CNPJ", value: "00.418.273/0001-00" },
  { label: "Situação", value: "Ativa" },
  { label: "CNAE principal", value: "1092-9/00 · Fabricação de biscoitos e bolachas", wide: true },
  { label: "Porte", value: "Médio" },
  { label: "Faixa de funcionários", value: "200 a 500" },
  { label: "Cidade", value: "Jundiaí, SP" },
  { label: "Em atividade desde", value: "2007 (19 anos)" },
  { label: "Filiais", value: "2" },
]

export const WHY_TOP = [
  "Indústria de alimentos (CNAE 10)",
  "Sede no Sudeste (SP)",
  "Faixa de 200 a 500 pessoas",
  "Nova filial registrada em 2026 em Uberlândia, MG",
]

export const CONTEXT_SIGNALS = [
  "Abriu filial em Uberlândia, MG, em março de 2026",
  "Incluiu CNAE secundário de fabricação de produtos para snacks em 2025",
]

// [receita-federal-removido 2026-10-01] original: "Fontes: Receita Federal (CNPJ, CNAE, situação, filiais) · Base fynd (faixa de funcionários)"
export const SOURCES =
  "Fontes: bases empresariais (CNPJ, CNAE, situação, filiais) · Base fynd (faixa de funcionários)"

export const EMAIL_SUBJECT = "Embalagens para a nova unidade de Uberlândia"

/** Texto puro do rascunho (para copiar). */
export const EMAIL_PLAIN = [
  "Olá, [nome],",
  "Vi que a Serra Azul abriu uma unidade em Uberlândia neste ano. Expansões assim costumam pedir mais volume de embalagem e entregas mais rápidas na nova região.",
  "Sou da Lumi Embalagens. Atendemos indústrias de alimentos em SP e MG com embalagens flexíveis para biscoitos e snacks.",
  "Faz sentido conversarmos 15 minutos na próxima semana sobre como vocês vão abastecer a nova unidade?",
  "Abraço,\nCamila Rocha\nLumi Embalagens",
].join("\n\n")

/** aria-label do mockup por etapa (o conteúdo da tela é decorativo). */
export const SCREEN_LABELS = {
  hero: "Tela de oportunidades da fynd: lista de empresas ordenadas por aderência ao perfil ideal, com Serra Azul Alimentos no topo, com 92%.",
  0: "Tela de conversa da fynd: a Camila descreve o cliente ideal e a fynd confirma os critérios de setor, região, porte e sinal.",
  1: "Tela de oportunidades da fynd: empresas ordenadas por aderência ao perfil Indústria Sudeste, com Serra Azul Alimentos no topo, com 92%.",
  2: "Detalhe da Serra Azul Alimentos na fynd: dados cadastrais, critérios atendidos, sinais de contexto e fontes.",
  3: "Sugestão de primeiro contato da fynd para a Serra Azul Alimentos, com o ponto de conexão destacado: a nova filial.",
} as const
