import type { Metadata } from "next"
import { MotionProvider } from "@/components/site/motion/motion-provider"
import { SiteHeaderV2 } from "@/components/site/header-v2"
import { SiteFooterV3 } from "@/components/site/footer-v3"
import { HeroSectionV3 } from "@/components/site/sections/hero-v3"
import { ProblemSectionV3 } from "@/components/site/sections/problem-v3"
import { HowItWorksSectionV3 } from "@/components/site/sections/how-it-works-v3"
import { DemoSectionV3 } from "@/components/site/sections/demo-v3"
import { DataSectionV3 } from "@/components/site/sections/data-v3"
import { AudienceSectionV3 } from "@/components/site/sections/audience-v3"
import { AccessSectionV3 } from "@/components/site/sections/access-v3"

// Página principal = v3 (reposicionamento: "Você vende, a gente encontra"). Header da v2; footer próprio (footer-v3).
// Título, descrição e OG vêm do layout. A v1 está em /v1 e a v2 em /v2; /v3 redireciona para cá (next.config.ts).
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

/** Landing da fynd. As seções seguem docs/site/v3. */
export default function Home() {
  return (
    <MotionProvider>
      <SiteHeaderV2 />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSectionV3 />
        <ProblemSectionV3 />
        <HowItWorksSectionV3 />
        <DemoSectionV3 />
        <DataSectionV3 />
        <AudienceSectionV3 />
        <AccessSectionV3 />
      </main>
      <SiteFooterV3 />
    </MotionProvider>
  )
}
