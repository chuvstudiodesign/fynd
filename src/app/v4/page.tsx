import type { Metadata } from "next"
import { MotionProvider } from "@/components/site/motion/motion-provider"
import { SiteHeaderV4 } from "@/components/site/header-v4"
import { SiteFooterV4 } from "@/components/site/footer-v4"
import { HeroSectionV4 } from "@/components/site/sections/hero-v4"
import { ProblemSectionV4 } from "@/components/site/sections/problem-v4"
import { HowItWorksSectionV4 } from "@/components/site/sections/how-it-works-v4"
import { DemoSectionV4 } from "@/components/site/sections/demo-v4"
import { OnlySellSectionV4 } from "@/components/site/sections/only-sell-v4"
import { AudienceSectionV4 } from "@/components/site/sections/audience-v4"
import { AccessSectionV4 } from "@/components/site/sections/access-v4"

/*
 * Versão 4 (página principal até a v5), mantida para consulta em /v4. Fora do índice; o canonical aponta para
 * a página principal. SEO e compartilhamento do 02-copy-v4; a imagem OG é a de `./opengraph-image.tsx`.
 * O merge de metadata entre segmentos é raso: `openGraph` e `twitter` são redefinidos inteiros aqui.
 */
const TITLE = "fynd · Você vende, a gente encontra"
const DESCRIPTION =
  "Conte o que a sua empresa vende. A fynd encontra empresas com o seu perfil e entrega só as interessadas. Zero setup, sem mailing. Você fecha."
const SHARE_DESCRIPTION =
  "Zero setup e sem mailing. Você conta o que vende e recebe só empresas interessadas, com contato e próximo passo. Quem fecha é você."

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
    url: "/v4",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
}

/** Landing da fynd v4. As seções seguem docs/site/v4. */
export default function HomeV4() {
  return (
    <MotionProvider>
      <SiteHeaderV4 />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSectionV4 />
        <ProblemSectionV4 />
        <HowItWorksSectionV4 />
        <DemoSectionV4 />
        <OnlySellSectionV4 />
        <AudienceSectionV4 />
        <AccessSectionV4 />
      </main>
      <SiteFooterV4 />
    </MotionProvider>
  )
}
