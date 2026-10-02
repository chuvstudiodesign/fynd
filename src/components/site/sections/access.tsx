"use client"

import { Text } from "@/components/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"
import { AccessForm } from "./access-form"

const FAQ = [
  {
    q: "A fynd envia mensagens por mim?",
    a: "Não. A fynd sugere um primeiro contato com base no contexto da empresa. Você revisa, ajusta e envia pelo seu próprio canal. A decisão é sempre sua.",
  },
  {
    q: "De onde vêm os dados?",
    // [receita-federal-removido 2026-10-01] original: "Dos CNPJs da Receita Federal, organizados para consulta, e de uma base própria…"
    a: "De bases de dados empresariais, organizadas para consulta, e de uma base própria de contas corporativas. Cada empresa mostra a fonte das informações e os critérios que a colocaram na lista.",
  },
  {
    q: "Preciso integrar meu CRM para começar?",
    // [validar: integrações e exportação disponíveis]
    a: "Não. Você começa descrevendo o seu cliente ideal numa conversa. Se o seu time usa um CRM, conte na demonstração para entendermos o melhor caminho.",
  },
  {
    q: "Quanto custa?",
    a: "Estamos em acesso antecipado e as condições são apresentadas na demonstração.",
  },
]

export function AccessSection() {
  return (
    <section id={ANCHORS.access} data-theme="dark" className={cn("bg-navy-900", sectionY)}>
      <SiteContainer className="dark text-foreground">
        <div className={cn(siteGrid, "gap-y-12 lg:grid-rows-[auto_1fr]")}>
          <RevealGroup className="col-span-full lg:col-span-5">
            <RevealItem y={16} duration={0.8}>
              <Text variant="eyebrow">ACESSO ANTECIPADO</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                Comece pela conversa certa.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="lead" className="mt-5 max-w-[36rem] md:mt-6">
                A fynd está em acesso antecipado. Conte quem é o seu cliente ideal e mostramos as primeiras oportunidades
                numa demonstração.
              </Text>
            </RevealItem>
          </RevealGroup>

          <div className="col-span-full lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <Reveal y={24} duration={0.8} delay={0.15} className="lg:sticky lg:top-24">
              <AccessForm />
            </Reveal>
          </div>

          <div className="col-span-full lg:col-span-5 lg:row-start-2">
            <Text variant="h4" render={<h3 />}>
              Perguntas frequentes
            </Text>
            <Accordion className="mt-4 border-t border-border">
              {FAQ.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-border">
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
