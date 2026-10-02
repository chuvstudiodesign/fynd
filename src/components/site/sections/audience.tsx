"use client"

import { CheckIcon } from "lucide-react"
import { motion, stagger } from "motion/react"
import { Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { REVEAL_ATTR, RevealGroup, RevealItem, RevealListItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"

const COLUMNS = [
  {
    label: "Para quem vende sozinho ou lidera uma operação pequena",
    title: "Você vende, a fynd aponta o caminho.",
    text: "Descreva o seu cliente ideal e saia com uma lista curta de empresas para procurar hoje. Sem montar planilha, sem contratar ninguém para isso.",
    items: ["Lista pronta em uma conversa", "Contexto de cada empresa antes de ligar", "Sugestão de primeira mensagem"],
  },
  {
    label: "Para quem lidera um time comercial",
    title: "Seu time nas contas certas.",
    // [validar] recursos de time (compartilhamento, multiusuário) antes de prometê-los
    text: "Defina o perfil ideal uma vez e oriente o time com critério explicável para cada conta.",
    items: ["Um perfil ideal claro para orientar o time", "Critério transparente para cada prioridade", "Contexto para orientar a abordagem"],
  },
]

const GUARANTEES = [
  { lead: "Sem implantação longa.", rest: "Você começa por uma conversa." },
  { lead: "Sem planilha para montar.", rest: "A fynd organiza e prioriza." },
  { lead: "Você decide o contato.", rest: "A fynd sugere, e você revisa e envia." },
]

/** Depoimento de cliente piloto: só entra se for real e autorizado. Sem ele, o bloco não existe. */
const TESTIMONIAL: { quote: string; name: string; role: string } | null = null // [validar]

export function AudienceSection() {
  return (
    <section id={ANCHORS.audience} data-theme="light" className="bg-paper-50 text-foreground">
      <SiteContainer>
        <div className={cn("border-t border-border", sectionY)}>
          <RevealGroup className={cn(siteGrid, "items-end")}>
            <div className="col-span-full lg:col-span-6">
              <RevealItem y={16} duration={0.7}>
                <Text variant="eyebrow">PARA QUEM</Text>
              </RevealItem>
              <RevealItem y={16} duration={0.7}>
                <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                  Para quem vende e para quem lidera.
                </Text>
              </RevealItem>
            </div>
            <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
              <Text variant="lead" className="max-w-[36rem]">
                Funciona para quem prospecta sozinho e para quem organiza um time inteiro.
              </Text>
            </RevealItem>
          </RevealGroup>

          <RevealGroup gap={0.1} amount={0.25} className="mt-12 grid gap-4 sm:gap-6 md:mt-16 lg:mt-20 lg:grid-cols-2 xl:gap-8">
            {COLUMNS.map((col) => (
              <RevealItem key={col.title} className="rounded-xl border border-border bg-paper-100 p-8 lg:p-10">
                <Badge variant="label" className="h-auto min-h-6 py-1 text-left whitespace-normal">
                  {col.label}
                </Badge>
                <Text variant="h3" className="mt-6">
                  {col.title}
                </Text>
                <Text className="mt-4 max-w-[36rem] text-muted-foreground">{col.text}</Text>
                <motion.ul
                  className="mt-6 flex flex-col gap-3"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.06, { startDelay: 0.2 }) } } }}
                >
                  {col.items.map((item) => (
                    <RevealListItem key={item} y={0} x={-8} duration={0.6} className="flex items-start gap-3">
                      <CheckIcon aria-hidden="true" className="mt-1 size-4 shrink-0 text-navy-600" />
                      <span className="text-base">{item}</span>
                    </RevealListItem>
                  ))}
                </motion.ul>
              </RevealItem>
            ))}
          </RevealGroup>

          {TESTIMONIAL && (
            <motion.figure
              {...REVEAL_ATTR}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="mt-16 lg:mt-20"
            >
              <Text variant="blockquote" className="max-w-[40rem]">
                {TESTIMONIAL.quote}
              </Text>
              <figcaption className="mt-4 text-sm text-muted-foreground">{TESTIMONIAL.name} · {TESTIMONIAL.role}</figcaption>
            </motion.figure>
          )}

          <RevealGroup className="mt-16 grid gap-8 md:mt-20 lg:mt-24 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
            {GUARANTEES.map((g) => (
              <RevealItem key={g.lead} y={16} duration={0.7} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="text-base leading-[1.6]">
                  <span className="font-semibold text-foreground">{g.lead}</span>{" "}
                  <span className="text-muted-foreground">{g.rest}</span>
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12">
            <a
              href={`#${ANCHORS.access}`}
              className={cn(buttonVariants({ variant: "link" }), "group/link h-auto min-h-10 px-0 text-base")}
            >
              Quero ver com o meu perfil
              <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover/link:translate-x-[3px] motion-reduce:transition-none">
                →
              </span>
            </a>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
