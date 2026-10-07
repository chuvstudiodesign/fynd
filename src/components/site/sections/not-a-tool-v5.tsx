import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealListItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { sectionYCompactV5 } from "./anchors-v5"

/**
 * "A proposta não é ser mais uma ferramenta." (02-copy-v5 §8, 03-design-v5 §6 e §9).
 * Seção curta, clara, sem ícone, sem riscado e sem ciano. "IA" só existe aqui, dentro de uma negação.
 * O princípio é o texto mais forte da seção e a última coisa clara antes do campo escuro.
 */
const WITHOUT = ["configurar IA.", "construir listas.", "montar automações.", "precisar dominar prospecção."] as const

export function NotAToolSectionV5() {
  return (
    <section data-theme="light" className="bg-paper-50 text-foreground">
      <SiteContainer>
        {/* Hairline no topo: padrão do site para duas seções claras seguidas. */}
        <div className={cn("border-t border-border", sectionYCompactV5)}>
          <div className={cn(siteGrid, "gap-y-8")}>
            <Reveal y={16} duration={0.7} className="col-span-full lg:col-span-6">
              <Text variant="h2" render={<h2 />} className="max-w-[16ch]">
                A proposta não é ser mais uma ferramenta.
              </Text>
            </Reveal>
            <RevealGroup gap={0.06} amount={0.4} className="col-span-full lg:col-span-5 lg:col-start-8">
              <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
                {WITHOUT.map((item) => (
                  <RevealListItem
                    key={item}
                    y={8}
                    duration={0.5}
                    className="border-t border-border py-3.5 font-heading text-lg font-light tracking-display max-sm:first:border-t-0 sm:text-xl lg:first:border-t-0"
                  >
                    <span className="text-muted-foreground">Sem</span> {item}
                  </RevealListItem>
                ))}
              </ul>
            </RevealGroup>
          </div>

          <Reveal y={12} duration={0.8} amount={0.5} className="mt-12 border-t border-border pt-8 lg:mt-16">
            <Text variant="eyebrow">PRINCÍPIO</Text>
            <div className={cn(siteGrid, "mt-4 items-end gap-y-5")}>
              <Text variant="h2" render={<p />} className="col-span-full lg:col-span-7">
                <span className="block">Você explica o que vende.</span>
                <span className="block">A fynd cuida do restante.</span>
              </Text>
              <p className="col-span-full max-w-[34ch] text-base leading-[1.6] text-muted-foreground lg:col-span-5 lg:col-start-8">
                A experiência precisa esconder a complexidade, não transferi-la para você.
              </p>
            </div>
          </Reveal>
        </div>
      </SiteContainer>
    </section>
  )
}
