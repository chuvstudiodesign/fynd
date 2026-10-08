import type { Metadata } from "next"
import { MotionProvider } from "@/components/site/motion/motion-provider"
import { SiteHeaderV9 } from "@/components/site/header-v9"
import { SiteFooterV5 } from "@/components/site/footer-v5"
import { HeroSectionV9 } from "@/components/site/sections/hero-v9"
import { ProblemSectionV5 } from "@/components/site/sections/problem-v5"
import { HowItWorksSectionV6 } from "@/components/site/sections/how-it-works-v6"
import { OpportunitySectionV9 } from "@/components/site/sections/opportunity-v9"
import { DemoSectionV7 } from "@/components/site/sections/demo-v7"
import { DifferenceSectionV5 } from "@/components/site/sections/difference-v5"
import { NotAToolSectionV5 } from "@/components/site/sections/not-a-tool-v5"
import { AccessSectionV5 } from "@/components/site/sections/access-v5"

/*
 * v9 = v8 com o mobile igual ao desktop: CTA no header, cards do hero, trilha de pontos e planilha completa.
 * v8 = v7 sem a legenda "Tela ilustrativa. O produto está em desenvolvimento." sob o MacBook do hero.
 * v7 = v6 sem a abertura da demo ("Na prática · Do que você vende à oportunidade."). A v6 é a v5 sem a pill
 * "em desenvolvimento" e a linha de zero setup no hero e sem a faixa "Por trás de cada oportunidade".
 * É a página principal desde 2026-10-08; esta rota fica para consulta,
 * fora do índice, com canonical na página principal. SEO e compartilhamento do 02-copy-v5.
 * O merge de metadata entre segmentos é raso: `openGraph` e `twitter` são redefinidos inteiros aqui.
 * A imagem de compartilhamento é a de `./opengraph-image.tsx`, que também alimenta o `twitter:image`.
 */
const TITLE = "fynd · Você vende. A fynd encontra."
const DESCRIPTION =
  "Uma nova forma de gerar oportunidades comerciais B2B sem montar uma operação de prospecção. Em desenvolvimento: estamos selecionando empresas para o piloto."
const SHARE_DESCRIPTION =
  "Você explica o que vende. A fynd quer encontrar, abordar e entregar a oportunidade comercial. Estamos selecionando empresas para os primeiros testes."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    siteName: "fynd",
    locale: "pt_BR",
    type: "website",
    url: "/v9",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
}

/** Landing da fynd v9. As seções seguem a ordem de docs/site/v5/00-briefing-v5.md. */
export default function HomeV9() {
  return (
    <MotionProvider>
      <SiteHeaderV9 />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSectionV9 />
        <ProblemSectionV5 />
        <HowItWorksSectionV6 />
        <OpportunitySectionV9 />
        <DemoSectionV7 />
        <DifferenceSectionV5 />
        <NotAToolSectionV5 />
        <AccessSectionV5 />
      </main>
      <SiteFooterV5 />
    </MotionProvider>
  )
}
