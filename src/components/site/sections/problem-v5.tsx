import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { RevealGroup, RevealItem, RevealListItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { headToBodyV5, sectionYV5 } from "./anchors-v5"

/**
 * O problema em 4 peças (02-copy-v5 §2, 03-design-v5 §1 e §9).
 * Quatro colunas de texto sob hairline: sem cards, sem ícones, sem X e sem ciano.
 * Não há frase de fechamento: a pergunta da seção seguinte é a resposta.
 */
const PIECES = [
  { index: "01", name: "Pessoas", line: "Contratar, treinar e gerenciar SDRs." }, // [validar "SDRs"]
  { index: "02", name: "Dados", line: "Encontrar empresas e contatos certos." },
  { index: "03", name: "Ferramentas", line: "CRM, automações, bases e canais." },
  { index: "04", name: "Operação", line: "Mensagens, cadências, follow-ups e qualificação." },
] as const

export function ProblemSectionV5() {
  return (
    <section data-theme="dark" className={cn("bg-navy-900", sectionYV5)}>
      <SiteContainer className="dark text-foreground">
        <RevealGroup amount={0.25} className={cn(siteGrid, "items-end")}>
          <div className="col-span-full lg:col-span-7">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">PROSPECÇÃO B2B HOJE</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[18ch] lg:mt-5">
                Gerar novos clientes B2B ainda é complexo.
              </Text>
            </RevealItem>
          </div>
          <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              Para prospectar bem, uma empresa precisa coordenar várias peças antes de chegar a uma conversa
              comercial.
            </Text>
          </RevealItem>
        </RevealGroup>

        <RevealGroup amount={0.3} className={headToBodyV5}>
          <ol
            aria-label="As quatro peças que uma empresa precisa coordenar para prospectar"
            className="grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4"
          >
            {PIECES.map((piece) => (
              <RevealListItem
                key={piece.index}
                y={12}
                duration={0.6}
                className="grid grid-cols-[2.5rem_1fr] border-t border-border py-5 sm:block sm:pt-5 sm:pb-0"
              >
                <span className="pt-1 font-mono text-[0.6875rem] tracking-label text-steel-300 tabular-nums sm:block sm:pt-0">
                  {piece.index}
                </span>
                <div>
                  <h3 className="font-heading text-xl leading-[1.3] font-normal text-paper-50 sm:mt-6 sm:text-2xl sm:leading-[1.2] sm:tracking-tight md:text-[1.75rem]">
                    {piece.name}
                  </h3>
                  <p className="mt-2 text-base leading-[1.6] text-steel-300 sm:max-w-[22ch]">{piece.line}</p>
                </div>
              </RevealListItem>
            ))}
          </ol>
        </RevealGroup>
      </SiteContainer>
    </section>
  )
}
