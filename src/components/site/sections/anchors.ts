/** Âncoras da landing, compartilhadas entre header, footer e seções. */
export const ANCHORS = {
  top: "inicio",
  howItWorks: "como-funciona",
  demo: "demonstracao",
  data: "dados",
  audience: "para-quem",
  access: "acesso",
} as const

export const NAV_LINKS = [
  { id: ANCHORS.howItWorks, label: "Como funciona" },
  { id: ANCHORS.data, label: "Dados" },
  { id: ANCHORS.audience, label: "Para quem" },
] as const

export const CTA_LABEL = "Pedir acesso antecipado"
