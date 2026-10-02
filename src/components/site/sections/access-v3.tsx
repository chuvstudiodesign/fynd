"use client"

import { Text } from "@/components/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"
import { AccessFormV3 } from "./access-form-v3"

const FAQ = [
  {
    q: "Preciso saber quem é o meu cliente ideal?",
    a: "Não. Você conta o que vende, do seu jeito. A fynd entende para quem o seu produto faz sentido e mostra os critérios que usou. Se quiser, você ajusta.",
  },
  {
    q: "A fynd entra em contato com as empresas por mim?",
    // [validar: canal, formato e quem assina a mensagem; a resposta não cita nenhum dos três até a confirmação]
    a: "Sim, a fynd faz o primeiro contato com as empresas com fit para entender quem tem interesse. Você recebe só as que demonstraram interesse e, a partir daí, a conversa é sua: você decide o próximo passo e fecha.",
  },
  {
    q: "É uma lista ou um mailing?",
    a: "Não. Você não recebe uma lista para trabalhar. A fynd usa as bases para encontrar as empresas com fit, faz o primeiro contato e entrega só as que demonstraram interesse, com a resposta e o contexto de cada uma.",
  },
  {
    q: "Preciso ter um time comercial?",
    a: "Não. Dá para começar com poucos contatos, e o próprio dono pode atender os interessados. Se você tem um time, ele recebe as conversas que já começaram.",
  },
  {
    q: "De onde vêm os dados?",
    // [receita-federal-removido 2026-10-01] original: "Dos CNPJs da Receita Federal, organizados para consulta, e de uma base própria de contas corporativas. …"
    a: "De bases de dados empresariais, organizadas para consulta, e de uma base própria de contas corporativas. Cada empresa mostra a fonte das informações e por que tem fit com o que você vende.",
  },
  {
    q: "Quanto custa?",
    a: "Estamos em acesso antecipado e as condições são apresentadas na demonstração.",
  },
]

export function AccessSectionV3() {
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
                Diga o que você vende.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="lead" className="mt-5 max-w-[36rem] md:mt-6">
                A fynd está em acesso antecipado. Conte o que a sua empresa vende e mostramos, numa demonstração, como os
                interessados chegam até você.
              </Text>
            </RevealItem>
          </RevealGroup>

          <div className="col-span-full lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <Reveal y={24} duration={0.8} delay={0.15} className="lg:sticky lg:top-24">
              <AccessFormV3 />
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
