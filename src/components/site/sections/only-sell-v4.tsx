"use client"

import { useId } from "react"
import { motion, stagger } from "motion/react"
import { CheckIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { itemVariants, Reveal, REVEAL_ATTR, RevealGroup, RevealItem, RevealListItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { headToBodyV4, sectionYV4 } from "./anchors-v4"

/**
 * "Você só precisa vender" (02-copy-v4 §5, 03-design-v4 §5, 04-motion-v4 §4). Substitui a seção Dados.
 * Seção clara, curta, sem âncora de menu e sem ciano. As negações não levam X (o X é só da seção 2);
 * o que sai da rotina aparece riscado, estático. A base aparece uma vez, como volume, sem fonte e sem contador.
 */
const NEGATIONS = ["Não é CRM.", "Não é chatbot.", "Não é base de leads.", "Não é automação."]

const NO_NEED = [
  "Buscar mailing",
  "Fazer setup",
  "Subir a sua base",
  "Configurar automação",
  "Definir cliente ideal",
  "Entender de tecnologia",
]

export function OnlySellSectionV4() {
  const listLabelId = useId()
  return (
    <section data-theme="light" className={cn("bg-paper-100 text-foreground", sectionYV4)}>
      <SiteContainer>
        <div className={cn(siteGrid, "gap-y-10")}>
          <RevealGroup amount={0.4} className="col-span-full lg:col-span-6">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">ZERO SETUP</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                Você só precisa vender.
              </Text>
            </RevealItem>
            <p className="mt-6 font-heading text-2xl leading-[1.3] font-light tracking-display text-muted-foreground">
              {NEGATIONS.map((n, i) => (
                // `span` (e não o `RevealItem`, que é `div`) para continuar válido dentro do `<p>`.
                <motion.span key={n} {...REVEAL_ATTR} variants={itemVariants(8, 0, 0.6)} className="inline-block">
                  {n}
                  {i < NEGATIONS.length - 1 ? "\u00a0" : ""}
                </motion.span>
              ))}
            </p>
            <RevealItem y={8} duration={0.6}>
              <Text className="mt-4 max-w-[36rem] text-muted-foreground">
                É o resultado de tudo isso. Você não precisa se preocupar com mailing nem aprender a usar nada.
              </Text>
            </RevealItem>
          </RevealGroup>

          <div className="col-span-full lg:col-span-5 lg:col-start-8">
            <Reveal y={16} duration={0.7} amount={0.4}>
              <p id={listLabelId} className="text-sm font-semibold text-foreground">
                Você não precisa
              </p>
            </Reveal>
            <motion.ul
              aria-labelledby={listLabelId}
              className="mt-2 grid sm:grid-cols-2 sm:gap-x-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.06) } } }}
            >
              {NO_NEED.map((item) => (
                <RevealListItem
                  key={item}
                  y={8}
                  duration={0.6}
                  className="border-b border-border py-2.5 text-base text-muted-foreground line-through decoration-steel-400 decoration-1"
                >
                  {item}
                </RevealListItem>
              ))}
            </motion.ul>
            <Reveal y={12} duration={0.8} amount={0.5} className="mt-5 flex items-start gap-3">
              <CheckIcon aria-hidden="true" strokeWidth={2} className="mt-1.5 size-4 shrink-0 text-navy-600" />
              <p className="text-lg leading-[1.5] font-semibold text-foreground md:text-xl">
                Só precisa atender quem já tem interesse.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Linha da base, ao pé da seção. [validar o número com a Mariana] Nunca citar a origem da base. */}
        <Reveal y={0} duration={0.6} className={cn("border-t border-border pt-8", headToBodyV4)}>
          <p className="max-w-[48rem] text-base leading-[1.6] text-muted-foreground">
            Por trás, <span className="font-semibold text-foreground">mais de 25 milhões de CNPJs do Brasil todo</span>,
            organizados e limpos. E a cada conversa a fynd aprende mais sobre o que cada empresa compra.
          </p>
        </Reveal>
      </SiteContainer>
    </section>
  )
}
