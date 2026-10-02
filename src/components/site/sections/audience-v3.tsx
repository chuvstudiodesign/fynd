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
    label: "Quem vende sozinho",
    title: "Teste sem contratar ninguém.",
    text: "Comece com poucos contatos e veja quem responde. Os interessados chegam para você, e você mesmo pode atender. Não precisa de um time de prospecção para começar.",
    items: ["Você começa contando o que vende", "Começa pequeno e cresce no seu ritmo", "Atende só quem demonstrou interesse"],
  },
  {
    label: "Quem lidera um time",
    title: "Seu time nas conversas que já começaram.",
    text: "A fynd faz o primeiro contato e o seu time recebe empresas que demonstraram interesse, com a resposta e o contexto. Menos tempo em contato frio, mais tempo para fechar.",
    items: [
      "Interessados com resposta e contexto",
      "Cada vendedor assume a conversa certa",
      "Um canal ativo sem montar uma operação de prospecção",
    ],
  },
]

const GUARANTEES = [
  { lead: "Sem formulário de cliente ideal.", rest: "Você diz o que vende." },
  { lead: "Sem lista para trabalhar.", rest: "A fynd faz o primeiro contato." },
  { lead: "A decisão é sua.", rest: "Você assume a conversa e fecha." },
]

/**
 * Bloco de experiência (02-copy-v3 §6). `[validar: uso de "40 anos", o nome da empresa e se a Mariana aparece]`.
 * Desligado até a confirmação: com `null`, o bloco não renderiza e o layout fecha sem espaço vazio.
 * Para ligar, troque por `{ title: "Feita por quem vive prospecção.", text: "A fynd une 40 anos de experiência em vendas B2B, de <empresa>, a uma ferramenta simples, que entrega o que importa: empresas com interesse." }`.
 */
const EXPERIENCE: { title: string; text: string } | null = null

/** Depoimento de cliente piloto: só entra se for real e autorizado. Sem ele, o bloco não existe. */
const TESTIMONIAL: { quote: string; name: string; role: string } | null = null // [validar]

export function AudienceSectionV3() {
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
                  Para vender mais sem montar estrutura.
                </Text>
              </RevealItem>
            </div>
            <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
              <Text variant="lead" className="max-w-[36rem]">
                Para PMEs B2B que querem abrir um canal de prospecção ativa, ou destravar o que já têm.
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

          {EXPERIENCE && (
            <RevealGroup className="mt-16 lg:mt-20">
              <RevealItem y={16} duration={0.7} className="max-w-[40rem] border-l border-border pl-6">
                <Text variant="h3" render={<h3 />}>
                  {EXPERIENCE.title}
                </Text>
                <Text className="mt-4 text-muted-foreground">{EXPERIENCE.text}</Text>
              </RevealItem>
            </RevealGroup>
          )}

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
              Quero ver com o que eu vendo
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
