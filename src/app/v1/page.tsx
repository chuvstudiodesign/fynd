import type { Metadata } from "next"
import { MotionProvider } from "@/components/site/motion/motion-provider"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { HeroSection } from "@/components/site/sections/hero"
import { ProblemSection } from "@/components/site/sections/problem"
import { HowItWorksSection } from "@/components/site/sections/how-it-works"
import { DemoSection } from "@/components/site/sections/demo"
import { DataSection } from "@/components/site/sections/data"
import { AudienceSection } from "@/components/site/sections/audience"
import { AccessSection } from "@/components/site/sections/access"

// Versão 1 (antiga página principal), mantida para consulta. Fora do índice; o canonical aponta para a página principal.
export const metadata: Metadata = {
  title: "fynd · Saiba para quem vender agora",
  description:
    "Descreva o seu cliente ideal numa conversa. A fynd encontra as empresas com maior potencial, mostra por que cada uma importa e sugere o primeiro contato.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
}

/** Landing da fynd v1. As seções seguem a ordem de docs/site/01-arquitetura.md. */
export default function HomeV1() {
  return (
    <MotionProvider>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <HeroSection />
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
