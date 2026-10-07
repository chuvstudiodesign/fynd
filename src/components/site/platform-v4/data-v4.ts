/**
 * Universo fictício da v4 (docs/site/v4/02-copy-v4.md, "Universo fictício"). Coerente entre telas, cards e recortes.
 * Funil: 4.860 empresas com o seu perfil → 12 interessadas. O meio do caminho (abordadas, responderam) não aparece.
 * Sem "Receita Federal", sem canal de contato, sem "primeiro contato".
 */

export type { ScreenState } from "@/components/site/platform/data"

export const USER_V4 = { name: "Camila Rocha", role: "Sócia-diretora", company: "Lumi Embalagens" }

/** Produto ativo (grupo "O que você vende" da sidebar). */
export const PRODUCT = "Embalagens flexíveis"

export const FUNNEL_V4 = { profile: 4860, interested: 12 } as const

/* ---------- Tela 1 · Seu produto ---------- */

export const LUMI_CNPJ = "00.418.392/0001-07"

export const FYND_GREETING = "Oi, Camila. O que você quer vender?"

/** Mensagem da Camila, em duas partes para a digitação (CNPJ primeiro, depois o produto). */
export const CAMILA_CNPJ = `Nosso CNPJ é ${LUMI_CNPJ}.`
export const CAMILA_PRODUCT =
  "A gente fabrica embalagens flexíveis para alimentos e cosméticos: pouches, sachês e filmes. Atendemos o Brasil todo, mais forte no Sudeste e no Sul."

export const ATTACHMENTS: { kind: "link" | "pdf"; name: string; meta?: string }[] = [
  { kind: "link", name: "lumiembalagens.com.br" },
  { kind: "pdf", name: "Catalogo-Lumi-2026.pdf", meta: "4,2 MB" },
]

export const UNDERSTOOD_INTRO = "Li o site e o catálogo. Pelo que entendi, a Lumi vende:"
export const UNDERSTOOD = [
  "Embalagens flexíveis: pouches, sachês e filmes",
  "Para indústrias de alimentos e cosméticos",
  "Com impressão personalizada e pedidos a partir de 5 mil unidades",
]

export const PROFILE_INTRO = "Estas empresas têm o seu perfil:"
export const PROFILE_V4: { label: string; value: string }[] = [
  { label: "Setor", value: "Indústrias de alimentos e cosméticos" },
  { label: "Região", value: "Brasil todo, foco no Sudeste e no Sul" },
  { label: "Porte", value: "a partir de 50 pessoas" },
  { label: "Sinal", value: "em expansão (filial nova ou linha nova)" },
]

export const SPECIALIST = {
  /** "com IA" só aqui, dentro da tela e discreto (termo do escopo; revisão de marca I5): o especialista não é uma pessoa. */
  title: "Especialista comercial com IA",
  seal: "Pronto para aprovação",
  line: "Ele vai apresentar a Lumi do jeito que você apresentaria. Converse com ele antes de começar.",
  approve: "Aprovar e começar",
  talk: "Conversar com ele",
}

export const BRIDGE_MESSAGE =
  "Pronto. Encontrei 4.860 empresas com o seu perfil e já comecei a abordar e qualificar. Te aviso quando alguém quiser conversar."

/* ---------- Tela 2 · Fit (volume, sem nomes e sem %) ---------- */

export const FIT_CHIPS = ["Alimentos e cosméticos", "Brasil todo", "A partir de 50 pessoas", "Em expansão"]

export type Breakdown = { title: string; rows: { label: string; value: number }[] }

/** Cada grupo soma 4.860. */
export const BREAKDOWNS: Breakdown[] = [
  {
    title: "Setores",
    rows: [
      { label: "Alimentos", value: 3120 },
      { label: "Cosméticos e higiene", value: 1740 },
    ],
  },
  {
    title: "Regiões",
    rows: [
      { label: "Sudeste", value: 2430 },
      { label: "Sul", value: 1170 },
      { label: "Nordeste", value: 680 },
      { label: "Centro-Oeste", value: 390 },
      { label: "Norte", value: 190 },
    ],
  },
  {
    title: "Porte",
    rows: [
      { label: "50 a 199 pessoas", value: 2310 },
      { label: "200 a 499 pessoas", value: 1840 },
      { label: "500 pessoas ou mais", value: 710 },
    ],
  },
]

/* ---------- Tela 3 · Interessados ---------- */

export type InterestedV4 = {
  company: string
  meta: string
  city: string
  contact: string
  role: string
  interest: string
  status: string
  next: string
  /** Aderência (%), reflete a interação. */
  adherence: number
  interactions: number
  replied: string
}

/** Ordenadas por aderência. Serra Azul Alimentos é a ativa. */
export const INTERESTED_V4: InterestedV4[] = [
  {
    company: "Serra Azul Alimentos",
    meta: "Alimentos · Jundiaí, SP · 320 pessoas",
    city: "Jundiaí, SP",
    contact: "Renata Moraes",
    role: "Gerente de compras",
    interest: "Pouch para a linha de biscoitos da nova unidade",
    status: "Pediu amostras",
    next: "Enviar amostras e marcar reunião",
    adherence: 94,
    interactions: 5,
    replied: "respondeu há 2 dias",
  },
  {
    company: "Bem Natural Cosméticos",
    meta: "Cosméticos · Contagem, MG · 410 pessoas",
    city: "Contagem, MG",
    contact: "Felipe Andrade",
    role: "Coordenador de suprimentos",
    interest: "Sachês de 10 ml para uma linha nova",
    status: "Pediu proposta",
    next: "Enviar proposta",
    adherence: 88,
    interactions: 4,
    replied: "respondeu há 3 dias",
  },
  {
    company: "Casa Doce Biscoitos",
    meta: "Alimentos · Vila Velha, ES · 230 pessoas",
    city: "Vila Velha, ES",
    contact: "Juliana Teixeira",
    role: "Diretora industrial",
    interest: "Trocar de fornecedor quando o contrato vencer, em janeiro",
    status: "Quer conversar em novembro",
    next: "Agendar reunião para novembro",
    adherence: 81,
    interactions: 3,
    replied: "respondeu há 4 dias",
  },
  {
    company: "Grão Fino Cafés",
    meta: "Alimentos · Varginha, MG · 210 pessoas",
    city: "Varginha, MG",
    contact: "Marcos Vilela",
    role: "Sócio",
    interest: "Embalagem com válvula para café em grão",
    status: "Perguntou o pedido mínimo",
    next: "Responder sobre o pedido mínimo",
    adherence: 76,
    interactions: 3,
    replied: "respondeu há 5 dias",
  },
  {
    company: "Nativa Snacks",
    meta: "Alimentos · Joinville, SC · 280 pessoas",
    city: "Joinville, SC",
    contact: "Patrícia Lima",
    role: "Compradora",
    interest: "Preço e prazo de pouches para snacks",
    status: "Quer conversar",
    next: "Confirmar a reunião de quinta",
    adherence: 72,
    interactions: 2,
    replied: "respondeu há 5 dias",
  },
  {
    company: "Aroma da Serra Cosméticos",
    meta: "Cosméticos · Petrópolis, RJ · 240 pessoas",
    city: "Petrópolis, RJ",
    contact: "Ricardo Nunes",
    role: "Gerente de produto",
    interest: "Embalagem para a linha de refil",
    status: "Pediu catálogo",
    next: "Enviar catálogo",
    adherence: 68,
    interactions: 1,
    replied: "respondeu há 6 dias",
  },
]

export const ACTIVE_V4 = INTERESTED_V4[0]

export const interactionsLabel = (n: number) => `${n} ${n === 1 ? "interação" : "interações"}`

/* ---------- aria-labels (02-copy-v4) ---------- */

/** aria-label do mockup por etapa (o conteúdo da tela é decorativo). */
export const SCREEN_LABELS_V4 = {
  hero: "Tela de interessados da fynd: 12 empresas que responderam e querem saber mais, com a Serra Azul Alimentos no topo pedindo amostras, com 94% de aderência.",
  0: "Tela Seu produto da fynd: a Camila informa o CNPJ, conta o que a Lumi Embalagens vende e anexa o site e o catálogo. A fynd resume o que entendeu, propõe o perfil e apresenta o especialista comercial da Lumi para aprovação.",
  1: "Tela Fit da fynd: 4.860 empresas com o perfil da Lumi Embalagens, divididas por setor, região e porte. A abordagem e a qualificação já começaram.",
  2: "Tela Interessados da fynd: 12 empresas que responderam e querem saber mais, cada uma com contato, interesse identificado, status, próximo passo e aderência. A Serra Azul Alimentos está no topo, com 94%.",
} as const

/** aria-label dos recortes da seção Como funciona (os recortes em si são `aria-hidden`). */
export const MINI_LABELS_V4 = {
  conta: "Exemplo: a Camila conta o que a Lumi Embalagens vende e anexa o site e o catálogo.",
  encontra: "Exemplo: 4.860 empresas com o perfil da Lumi, das quais 12 se mostraram interessadas.",
  fecha: "Exemplo: a Serra Azul Alimentos, interessada, pediu amostras. Contato: Renata Moraes, gerente de compras.",
} as const
