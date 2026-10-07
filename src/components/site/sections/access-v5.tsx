import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V5, anchorOffsetV5, sectionYV5 } from "./anchors-v5"
import { ValidationFormV5 } from "./validation-form-v5"

/**
 * Encerramento + questionário de validação (02-copy-v5 §9, 03-design-v5 §7). Layout da `access-v4` sem FAQ:
 * texto nas colunas 1–5, card nas 7–12 (sem sticky: o card é sempre o item mais alto da linha). O questionário fica aberto na própria página; os CTAs da
 * página rolam até aqui. Sem ciano na coluna de texto: o único da dobra é o botão de envio, na última etapa.
 */
export function AccessSectionV5() {
  return (
    <section id={ANCHORS_V5.access} data-theme="dark" className={cn("bg-navy-900", sectionYV5, anchorOffsetV5)}>
      <SiteContainer className="dark text-foreground">
        <div className={cn(siteGrid, "gap-y-10")}>
          <RevealGroup className="col-span-full lg:col-span-5">
            <RevealItem y={16} duration={0.8}>
              <Text variant="eyebrow">PRÓXIMO SINAL</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[14ch] lg:mt-5">
                Você testaria a fynd na sua empresa?
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              <Text variant="lead" className="mt-5 max-w-[32rem] md:mt-6">
                A fynd está em desenvolvimento. Estamos conversando com empresas para validar a proposta e selecionar os
                primeiros interessados em um piloto.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.8}>
              {/* Frases inteiras em caixa normal (mono é papel de rótulo e dado). Texto do copy; não promete duração. */}
              <p className="mt-6 flex flex-col items-start gap-1 text-left text-sm leading-normal">
                <span className="text-paper-50">São 11 perguntas.</span>
                <span className="text-steel-300">Só as três primeiras são obrigatórias.</span>
              </p>
            </RevealItem>
          </RevealGroup>

          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <Reveal y={24} duration={0.8} delay={0.15}>
              <ValidationFormV5 />
            </Reveal>
          </div>
        </div>
      </SiteContainer>
    </section>
  )
}
