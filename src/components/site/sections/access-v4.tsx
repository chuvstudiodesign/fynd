"use client"

import { Text } from "@/components/typography"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V4, sectionYV4 } from "./anchors-v4"
import { AccessFormV4 } from "./access-form-v4"
import { ZeroSetupStrip } from "./hero-parts-v4"

/**
 * Acesso antecipado + FAQ, encerramento (02-copy-v4 §7, 03-design-v4 §7). Layout do `access-v3`:
 * texto e FAQ nas colunas 1–5, formulário sticky nas 7–12. A linha de zero setup repete a do hero.
 * Preço: nenhum modelo citado.
 */
const FAQ = [
  {
    q: "Preciso configurar alguma coisa?",
    a: "Não. Você não sobe base, não configura ferramenta e não define cliente ideal. Conta o que vende, e a fynd começa.",
  },
  {
    q: "Vou receber uma lista ou um mailing?",
    a: "Não, e você não precisa se preocupar com mailing. Só chegam empresas que responderam e querem saber mais, com contato, interesse e próximo passo.",
  },
  {
    q: "Como a fynd chega até essas empresas?",
    // [validar: o especialista de validação existirá no lançamento? Se não, termina em "aborda e qualifica. Você só recebe quem tem interesse."]
    a: "A fynd encontra as empresas com o seu perfil, aborda e qualifica. Antes de começar, você conversa com o especialista que vai apresentar a sua empresa e aprova a abordagem.",
  },
  {
    q: "Preciso ter um time comercial?",
    a: "Não. O próprio dono pode atender os interessados. Se você tem um time, ele recebe conversas que já começaram.",
  },
  {
    q: "Quanto custa?",
    a: "Estamos em acesso antecipado. As condições são apresentadas a quem garantir a vaga.",
  },
]

export function AccessSectionV4() {
  return (
    <section id={ANCHORS_V4.access} data-theme="dark" className={cn("bg-navy-900", sectionYV4)}>
      <SiteContainer className="dark text-foreground">
        <div className={cn(siteGrid, "gap-y-10 lg:grid-rows-[auto_1fr]")}>
          <RevealGroup className="col-span-full lg:col-span-5">
            <RevealItem y={16} duration={0.8}>
              <Text variant="eyebrow">ACESSO ANTECIPADO</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[14ch] lg:mt-5">
                O que você quer vender?
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="lead" className="mt-5 max-w-[36rem] md:mt-6">
                Responda e garanta sua vaga. Mostramos como os interessados chegam até você.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <ZeroSetupStrip align="start" className="mt-6" />
            </RevealItem>
          </RevealGroup>

          <div className="col-span-full lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
            <Reveal y={24} duration={0.8} delay={0.15} className="lg:sticky lg:top-24">
              <AccessFormV4 />
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
