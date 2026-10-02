"use client"

import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MiniContaV3, MiniEncontraV3, MiniFechaV3 } from "@/components/site/platform-v3"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"

const STEPS = [
  {
    label: "01 · VOCÊ CONTA",
    title: "Você conta o que vende",
    text: "Explique o seu produto do seu jeito, como explicaria para um cliente. A fynd entende para quem ele faz sentido. Você não precisa saber descrever o seu cliente ideal.",
    Mini: MiniContaV3,
  },
  {
    label: "02 · A GENTE ENCONTRA",
    title: "A fynd encontra e faz o primeiro contato",
    text: "A fynd cruza o que você vende com bases empresariais, encontra as empresas com fit e faz o primeiro contato para descobrir quem tem interesse.",
    Mini: MiniEncontraV3,
  },
  {
    label: "03 · VOCÊ FECHA",
    title: "Você recebe os interessados e fecha",
    text: "Só chegam as empresas que demonstraram interesse, com a resposta e o contexto de cada uma. Você assume a conversa e decide o próximo passo.",
    Mini: MiniFechaV3,
  },
]

export function HowItWorksSectionV3() {
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
                Você conta, a fynd encontra, você fecha.
              </Text>
            </RevealItem>
          </div>
          <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              Sem formulário de cliente ideal e sem lista para trabalhar. Você entra quando a empresa já demonstrou interesse.
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
