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

// Versão 3 em avaliação (reposicionamento: "Você vende, a gente encontra"). Header da v2; footer próprio (footer-v3).
// Fora do índice até ser aprovada; o canonical aponta para a página principal.
export const metadata: Metadata = {
  title: "fynd · Você vende, a gente encontra",
  description:
    "Diga o que a sua empresa vende. A fynd faz o primeiro contato e só entrega as empresas que demonstraram interesse. Você assume a conversa e fecha.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
}

export default function HomeV3() {
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
