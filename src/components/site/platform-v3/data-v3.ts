/**
 * Universo fictício da v3 (docs/site/v3/02-copy-v3.md). Coerente entre todas as telas, cards e mini-UIs.
 * Funil da demonstração: 148 com fit → 60 contatadas → 21 responderam → 12 interessadas.
 */

export type { ScreenState } from "@/components/site/platform/data"

export const USER_V3 = { name: "Camila Rocha", role: "Sócia-diretora", company: "Lumi Embalagens" }

/** Busca ativa (substitui o "perfil ideal" da v1/v2). */
export const SEARCH = "Embalagens flexíveis"
export const SEARCHES = [SEARCH, "Sachês para food service", "Filmes para cosméticos"]

export const FUNNEL = {
  fit: 148,
  contacted: 60,
  replied: 21,
  interested: 12,
  waiting: 39,
  notNow: 9,
  queued: 88,
} as const

export type FitCompany = { company: string; meta: string; fit: number }

/** Ordem final da tela 2 (92 → 58). Serra Azul Alimentos é a ativa. */
export const FIT_COMPANIES: FitCompany[] = [
  { company: "Serra Azul Alimentos", meta: "Alimentos · Jundiaí, SP · 320 pessoas", fit: 92 },
  { company: "Bem Natural Cosméticos", meta: "Cosméticos · Contagem, MG · 410 pessoas", fit: 84 },
  { company: "Laticínios Vale Verde", meta: "Alimentos · Juiz de Fora, MG · 260 pessoas", fit: 77 },
  { company: "Casa Doce Biscoitos", meta: "Alimentos · Vila Velha, ES · 230 pessoas", fit: 71 },
  { company: "Prisma Higiene Pessoal", meta: "Cosméticos · Campinas, SP · 480 pessoas", fit: 64 },
  { company: "Grão Fino Cafés", meta: "Alimentos · Varginha, MG · 210 pessoas", fit: 58 },
]

export const ACTIVE = FIT_COMPANIES[0].company

/** Ordem inicial da tela 2 (71, 92, 58, 84, 64, 77), antes de reordenar. */
export const FIT_INITIAL_ORDER: string[] = [
  "Casa Doce Biscoitos",
  "Serra Azul Alimentos",
  "Grão Fino Cafés",
  "Bem Natural Cosméticos",
  "Prisma Higiene Pessoal",
  "Laticínios Vale Verde",
]
export const FIT_FINAL_ORDER: string[] = FIT_COMPANIES.map((c) => c.company)

export const FIT_CRITERIA = ["Alimentos e cosméticos", "Sudeste", "200 a 500 pessoas", "Filial recente"]

/* ---------- Tela 1 · Conversa ---------- */

export const CAMILA_SELLS =
  "A gente fabrica embalagens flexíveis para alimentos e cosméticos: pouches, sachês e filmes. Hoje atendemos mais o Sudeste."

export const INFERRED_CRITERIA: { label: string; value: string; signal?: boolean }[] = [
  { label: "Setor", value: "Indústrias de alimentos e cosméticos" },
  { label: "Região", value: "SP, MG, RJ, ES" },
  { label: "Porte", value: "200 a 500 pessoas" },
  { label: "Sinal", value: "Filial aberta nos últimos 12 meses", signal: true },
]

/* ---------- Tela 3 · Primeiro contato ---------- */

export type ContactStatus = "interested" | "not-now" | "waiting"

export const CONTACT_STATUS_LABEL: Record<ContactStatus, string> = {
  interested: "Interessada",
  "not-now": "Sem interesse agora",
  waiting: "Aguardando",
}

export const CONTACT_ROWS: { company: string; meta: string; status: ContactStatus; activity: string }[] = [
  { company: "Serra Azul Alimentos", meta: "Jundiaí, SP", status: "interested", activity: "Respondeu há 2 dias" },
  { company: "Bem Natural Cosméticos", meta: "Contagem, MG", status: "interested", activity: "Respondeu há 3 dias" },
  { company: "Laticínios Vale Verde", meta: "Juiz de Fora, MG", status: "not-now", activity: "Respondeu há 4 dias" },
  { company: "Casa Doce Biscoitos", meta: "Vila Velha, ES", status: "interested", activity: "Respondeu há 4 dias" },
  { company: "Prisma Higiene Pessoal", meta: "Campinas, SP", status: "waiting", activity: "2 contatos · último há 3 dias" },
  { company: "Grão Fino Cafés", meta: "Varginha, MG", status: "interested", activity: "Respondeu há 5 dias" },
]

export const CONTACT_TABS = ["Todas", "Interessadas", "Aguardando", "Sem interesse"]

/** Linha do tempo da Serra Azul (mais antigo primeiro). Sem canal e sem dizer quem fez o contato. */
export const SERRA_TIMELINE: { when: string; title: string; quote?: string; final?: boolean }[] = [
  { when: "há 9 dias", title: "Primeiro contato feito" },
  { when: "há 5 dias", title: "Novo contato" },
  { when: "há 2 dias", title: "Resposta recebida", quote: "Temos interesse. Conseguem enviar amostras de pouch para biscoito?" },
  { when: "há 2 dias", title: "Demonstrou interesse · enviada para Interessados", final: true },
]

/* ---------- Tela 4 · Interessados ---------- */

/**
 * Estado de interesse curto, para as linhas que destacam um interessado fora das telas
 * (seção Problema e card de saída de Dados). Substitui o fit % nessas linhas (09-revisao-marca-v3 P2.1).
 */
export const INTEREST_STATUS: Record<string, string> = {
  "Serra Azul Alimentos": "Pediu amostras",
  "Bem Natural Cosméticos": "Pediu proposta",
  "Casa Doce Biscoitos": "Conversa em novembro",
  "Grão Fino Cafés": "Perguntou o pedido mínimo",
}

export type Interested = {
  company: string
  meta: string
  /** Contexto curto para os recortes. */
  city: string
  fit: number
  replied: string
  quote: string
  context: string
  next: string
}

export const INTERESTED: Interested[] = [
  {
    company: "Serra Azul Alimentos",
    meta: "Alimentos · Jundiaí, SP · 320 pessoas",
    city: "Jundiaí, SP",
    fit: 92,
    replied: "respondeu há 2 dias",
    quote:
      "Temos interesse. Estamos abastecendo a nova unidade de Uberlândia. Conseguem enviar amostras de pouch para biscoito?",
    context: "Filial nova em Uberlândia, MG (março de 2026)",
    next: "Enviar amostras e marcar uma conversa",
  },
  {
    company: "Bem Natural Cosméticos",
    meta: "Cosméticos · Contagem, MG · 410 pessoas",
    city: "Contagem, MG",
    fit: 84,
    replied: "respondeu há 3 dias",
    quote: "Vamos lançar uma linha nova no segundo semestre. Podem mandar uma proposta para sachês de 10 ml?",
    context: "Novo CNAE de cosméticos para cabelo em 2026",
    next: "Enviar proposta",
  },
  {
    company: "Casa Doce Biscoitos",
    meta: "Alimentos · Vila Velha, ES · 230 pessoas",
    city: "Vila Velha, ES",
    fit: 71,
    replied: "respondeu há 4 dias",
    quote: "Nosso contrato atual vence em janeiro. Topamos conversar em novembro.",
    context: "Incluiu o CNAE de biscoitos recheados em 2026",
    next: "Agendar conversa para novembro",
  },
  {
    company: "Grão Fino Cafés",
    meta: "Alimentos · Varginha, MG · 210 pessoas",
    city: "Varginha, MG",
    fit: 58,
    replied: "respondeu há 5 dias",
    quote: "Usamos embalagem com válvula para café em grão. Qual é o pedido mínimo de vocês?",
    context: "Abriu filial em Belo Horizonte, MG, em 2026",
    next: "Responder sobre pedido mínimo",
  },
  {
    company: "Nativa Snacks",
    meta: "Alimentos · Sorocaba, SP · 280 pessoas",
    city: "Sorocaba, SP",
    fit: 56,
    replied: "respondeu há 5 dias",
    quote: "Queremos entender preço e prazo. Dá para conversar na quinta à tarde?",
    context: "Ampliou a fábrica em 2026",
    next: "Confirmar a conversa de quinta",
  },
  {
    company: "Aroma da Serra Cosméticos",
    meta: "Cosméticos · Petrópolis, RJ · 240 pessoas",
    city: "Petrópolis, RJ",
    fit: 53,
    replied: "respondeu há 6 dias",
    quote: "Estamos cotando embalagem para a linha de refil. Me mandem um catálogo.",
    context: "Linha de refil lançada em 2026",
    next: "Enviar catálogo",
  },
]

/** aria-label do mockup por etapa (o conteúdo da tela é decorativo). */
export const SCREEN_LABELS_V3 = {
  hero: "Tela de interessados da fynd: 12 empresas que demonstraram interesse no primeiro contato, com a Serra Azul Alimentos no topo pedindo amostras.",
  0: "Tela de conversa da fynd: a Camila conta o que a Lumi Embalagens vende e a fynd propõe os critérios de setor, região, porte e sinal.",
  1: "Tela de empresas com fit da fynd: 148 empresas encontradas para a busca Embalagens flexíveis, com a Serra Azul Alimentos no topo, com 92% de fit.",
  2: "Tela de primeiro contato da fynd: 60 empresas contatadas, 21 responderam e 12 demonstraram interesse, com a linha do tempo da Serra Azul Alimentos.",
  3: "Tela de interessados da fynd: 12 empresas que demonstraram interesse, com o trecho da resposta, o contexto e as ações para assumir a conversa.",
} as const
