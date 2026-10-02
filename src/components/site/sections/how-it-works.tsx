"use client"

import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MiniAbordagem, MiniConversa, MiniLista } from "@/components/site/platform"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"

const STEPS = [
  {
    label: "01 · DESCREVA",
    title: "Conte quem você quer atender",
    text: "Explique o seu cliente ideal do seu jeito: setor, região, porte, o que importa para você.",
    Mini: MiniConversa,
  },
  {
    label: "02 · RECEBA",
    title: "Veja quem tem mais potencial",
    text: "A fynd cruza o seu perfil com bases empresariais e ordena as empresas por aderência, com o contexto de cada uma.",
    Mini: MiniLista,
  },
  {
    label: "03 · ABORDE",
    title: "Comece com a mensagem certa",
    text: "Receba uma sugestão de primeiro contato baseada no contexto da empresa. Você revisa e decide.",
    Mini: MiniAbordagem,
  },
]

export function HowItWorksSection() {
  return (
    <section id={ANCHORS.howItWorks} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionY)}>
      <SiteContainer>
        <RevealGroup className={cn(siteGrid, "items-end")}>
          <div className="col-span-full lg:col-span-6">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">COMO FUNCIONA</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                Da conversa à próxima ligação.
              </Text>
            </RevealItem>
          </div>
          <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              São três passos, sem planilha no meio.
            </Text>
          </RevealItem>
        </RevealGroup>

        <RevealGroup gap={0.1} className="mt-12 grid gap-4 sm:gap-6 md:mt-16 lg:mt-20 lg:grid-cols-3 xl:gap-8">
          {STEPS.map(({ label, title, text, Mini }) => (
            <RevealItem key={label} className="h-full min-w-0">
              <article className="grid h-full gap-6 rounded-xl border border-border bg-paper-50 p-6 transition-transform duration-200 ease-out sm:grid-cols-2 sm:items-center md:p-8 lg:grid-cols-1 [&>*]:min-w-0 lg:content-start lg:items-start [@media(pointer:fine)]:motion-safe:hover:-translate-y-1">
                <div inert aria-hidden="true">
                  <Mini />
                </div>
                <div>
                  <Text variant="eyebrow">{label}</Text>
                  <Text variant="h4" render={<h3 />} className="mt-3">
                    {title}
                  </Text>
                  <Text className="mt-3 text-muted-foreground">{text}</Text>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <a
            href={`#${ANCHORS.demo}`}
            className={cn(buttonVariants({ variant: "link" }), "group/link h-auto min-h-10 px-0 text-base")}
          >
            Ver na prática
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover/link:translate-y-[3px] motion-reduce:transition-none">
              ↓
            </span>
          </a>
        </div>
      </SiteContainer>
    </section>
  )
}
