/** Âncoras da landing v4 (03-design-v4 §0.3), compartilhadas entre header, footer e seções. */
export const ANCHORS_V4 = {
  top: "inicio",
  howItWorks: "como-funciona",
  demo: "na-pratica",
  audience: "para-quem",
  access: "acesso",
} as const

/** A seção "Você só precisa vender" não entra no menu. */
export const NAV_LINKS_V4 = [
  { id: ANCHORS_V4.howItWorks, label: "Como funciona" },
  { id: ANCHORS_V4.demo, label: "Na prática" },
  { id: ANCHORS_V4.audience, label: "Para quem" },
] as const

/** CTA de toda a página (02-copy-v4, decisão 3). */
export const CTA_LABEL_V4 = "Garantir minha vaga"
/** Versão curta, para telas estreitas (02-copy-v4 §0). */
export const CTA_SHORT_LABEL_V4 = "Garantir vaga"

/*
 * Ritmo vertical da v4 (03-design-v4 §0.1). O design pedia estas constantes em `site-container.tsx`,
 * mas aquele arquivo é compartilhado com a v1–v3; ficam aqui para não editar arquivo sem sufixo.
 */
/** Padding vertical das seções da v4 (mais curto que o da v3). */
export const sectionYV4 = "py-20 md:py-24 lg:py-32"
/** Cabeçalho da seção → conteúdo, na v4. */
export const headToBodyV4 = "mt-10 md:mt-12 lg:mt-16"
