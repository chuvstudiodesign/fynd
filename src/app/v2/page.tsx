import type { Metadata } from "next"
import { MotionProvider } from "@/components/site/motion/motion-provider"
import { SiteHeaderV2 } from "@/components/site/header-v2"
import { SiteFooter } from "@/components/site/footer"
import { HeroSectionV2 } from "@/components/site/sections/hero-v2"
import { ProblemSection } from "@/components/site/sections/problem"
import { HowItWorksSection } from "@/components/site/sections/how-it-works"
import { DemoSection } from "@/components/site/sections/demo"
import { DataSection } from "@/components/site/sections/data"
import { AudienceSection } from "@/components/site/sections/audience"
import { AccessSection } from "@/components/site/sections/access"

// Versão 2 em avaliação: mesma página da v1 (/), com header e hero novos. Fora do índice até ser aprovada.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
}

export default function HomeV2() {
  return (
    <MotionProvider>
      <SiteHeaderV2 />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSectionV2 />
        <ProblemSection />
        <HowItWorksSection />
        <DemoSection />
        <DataSection />
        <AudienceSection />
        <AccessSection />
      </main>
      <SiteFooter />
    </MotionProvider>
  )
}
