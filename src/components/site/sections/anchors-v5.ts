/** Âncoras da landing v5 (03-design-v5 §0.3), compartilhadas entre header, footer e seções. */
export const ANCHORS_V5 = {
  top: "inicio",
  howItWorks: "como-funciona",
  demo: "na-pratica",
  difference: "a-diferenca",
  access: "testar",
} as const

/** As seções do problema, da lista × oportunidade e do "não é mais uma ferramenta" não entram no menu. */
export const NAV_LINKS_V5 = [
  { id: ANCHORS_V5.howItWorks, label: "Como funciona" },
  { id: ANCHORS_V5.demo, label: "Na prática" },
  { id: ANCHORS_V5.difference, label: "A diferença" },
] as const

/** CTA único da página (02-copy-v5, decisão 3). Contém "fynd": nunca recebe `uppercase`. */
export const CTA_LABEL_V5 = "Tenho interesse em testar a fynd"
/** Versão curta: header, pill do hero e footer. */
export const CTA_SHORT_LABEL_V5 = "Quero testar"

/*
 * Ritmo vertical da v5 (03-design-v5 §0.2). Ficam aqui, e não em `site-container.tsx`,
 * porque aquele arquivo é compartilhado com as versões anteriores.
 */
/** Padding vertical das seções da v5. */
export const sectionYV5 = "py-20 md:py-24 lg:py-32"
/** Seções curtas da v5 (hoje só "Não é mais uma ferramenta"). */
export const sectionYCompactV5 = "py-16 md:py-20 lg:py-24"
/**
 * Seções com âncora (08-qa-v5 M7). O `scroll-padding-top: 4rem` global fazia a âncora parar com 64px da seção
 * anterior atrás do header, que então lia o tema errado. As seções da v5 já têm 80px ou mais de padding
 * superior, então a margem negativa anula os 64px e a seção encosta no topo. O token global não muda.
 */
export const anchorOffsetV5 = "-scroll-mt-16"
/** Cabeçalho da seção → conteúdo, na v5. */
export const headToBodyV5 = "mt-10 md:mt-12 lg:mt-16"
