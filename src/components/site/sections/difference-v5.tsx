import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { Reveal, RevealGroup, RevealItem, RevealListItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V5, anchorOffsetV5, headToBodyV5, sectionYV5 } from "./anchors-v5"
import { SignalDot } from "./hero-parts-v5"

/**
 * A diferença: mercado em camadas + contraste, numa seção só (02-copy-v5 §6 e §7, 03-design-v5 §5 e §9).
 * À esquerda o mapa (4 camadas); à direita a conclusão. A camada "Resultado" é a única faixa escura da
 * seção clara, e o ponto de 8px dela é o único ciano da dobra.
 *
 * Server Component de propósito: os nomes de terceiros ficam só nesta estrutura de dados, no servidor.
 * Com `SHOW_EXAMPLES` desligado eles não entram no HTML nem no JavaScript enviado ao navegador.
 */

/**
 * Exemplos de empresas por camada (nomes do material da cliente). Desligado por decisão do briefing:
 * risco de citar marcas de terceiros em site público. [validar com a cliente antes de ligar]
 * Ligado, cada uma das três primeiras faixas cresce ~24px (ver a ordem de cortes no 03-design-v5 §0.1).
 */
const SHOW_EXAMPLES: boolean = false

type Layer = { index: string; name: string; question: string; examples: readonly string[]; fynd?: boolean }

const LAYERS_V5: readonly Layer[] = [
  { index: "01", name: "Dados", question: "Quem existe e com quem falar?", examples: ["Speedio", "Econodata", "Apollo", "Seamless"] },
  { index: "02", name: "Inteligência", question: "Quem vale prospectar agora?", examples: ["Datlo", "Cortex", "Demandbase"] },
  { index: "03", name: "Execução", question: "Como executar a prospecção?", examples: ["Leads2b", "Ramper", "11x", "Artisan", "AiSDR"] },
  { index: "04", name: "Resultado", question: "Oportunidade comercial entregue.", examples: [], fynd: true },
]

/** Segunda linha da faixa, sob a pergunta: exemplos (se ligados) ou o marcador da quarta camada. */
const secondLine = "col-start-2 mt-1 sm:col-start-3"

export function DifferenceSectionV5() {
  return (
    <section id={ANCHORS_V5.difference} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionYV5, anchorOffsetV5)}>
      <SiteContainer>
        <RevealGroup amount={0.25} className={cn(siteGrid, "items-end")}>
          <div className="col-span-full lg:col-span-7">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">O MERCADO</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[18ch] lg:mt-5">
                O mercado está evoluindo em camadas.
              </Text>
            </RevealItem>
          </div>
          <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              As categorias se sobrepõem. O que muda é onde cada plataforma concentra valor.
            </Text>
          </RevealItem>
        </RevealGroup>

        {/* Ordem no DOM = ordem visual em todas as larguras: camadas, síntese, contraste. */}
        <div className={cn(siteGrid, "gap-y-12", headToBodyV5)}>
          <div className="col-span-full lg:col-span-7">
            <RevealGroup gap={0.1} amount={0.3}>
              <ol
                aria-label="As quatro camadas do mercado: dados, inteligência, execução e resultado. A fynd quer atuar na quarta, a do resultado."
                className="flex flex-col gap-2"
              >
                {LAYERS_V5.map((layer) => (
                  <RevealListItem
                    key={layer.index}
                    y={8}
                    duration={0.5}
                    className={cn(
                      "grid grid-cols-[2rem_1fr] items-baseline gap-x-4 rounded-lg border px-5 sm:grid-cols-[2rem_8.5rem_1fr]",
                      layer.fynd
                        ? "dark border-transparent bg-navy-900 py-5 text-foreground"
                        : "border-border bg-paper-50 py-4"
                    )}
                  >
                    <span className="font-mono text-[0.6875rem] text-muted-foreground tabular-nums">{layer.index}</span>
                    {/* Nome em mono caixa alta: nenhum deles contém "fynd". */}
                    <span className="font-mono text-xs font-medium tracking-label text-foreground uppercase">
                      {layer.name}
                    </span>
                    <span className="col-start-2 text-base text-foreground max-sm:mt-1 sm:col-start-3">
                      {layer.question}
                    </span>
                    {SHOW_EXAMPLES && layer.examples.length > 0 && (
                      <span className={cn(secondLine, "font-mono text-xs text-muted-foreground")}>
                        {layer.examples.join(" · ")}
                      </span>
                    )}
                    {layer.fynd && (
                      // Caixa normal, no lugar dos exemplos: a marca nunca vai em mono caixa alta.
                      <span className={cn(secondLine, "flex items-center gap-2.5 text-sm text-steel-300")}>
                        <SignalDot delay={0.65} />
                        É aqui que a fynd quer estar.
                      </span>
                    )}
                  </RevealListItem>
                ))}
              </ol>
            </RevealGroup>

            <Reveal y={0} duration={0.5} delay={0.5} amount={0.6}>
              <p className="mt-5 font-mono text-xs leading-relaxed tracking-label text-muted-foreground uppercase">
                <span className="sr-only">Dados mais inteligência mais execução levam ao resultado.</span>
                <span aria-hidden="true">
                  Dados + Inteligência + Execução <br className="sm:hidden" />→{" "}
                  <span className="text-foreground">Resultado</span>
                </span>
              </p>
            </Reveal>
          </div>

          <RevealGroup gap={0.12} amount={0.4} className="col-span-full lg:col-span-4 lg:col-start-9">
            <RevealItem y={12} duration={0.6}>
              <Text variant="eyebrow">A DIFERENÇA</Text>
            </RevealItem>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1 lg:gap-6">
              <RevealItem y={12} duration={0.6}>
                <p className="font-heading text-xl leading-[1.35] font-light text-muted-foreground">
                  As ferramentas tradicionais ajudam sua equipe a gerar oportunidades.
                </p>
              </RevealItem>
              <RevealItem y={12} duration={0.6} className="border-border max-sm:border-t max-sm:pt-6 lg:border-t lg:pt-6">
                {/* Revisão de marca I4: a frase-tese no tamanho de h2. O elemento continua h3, sob o h2 da seção. */}
                <Text variant="h2" render={<h3 />} className="text-foreground">
                  A fynd quer gerar a oportunidade para sua equipe.
                </Text>
              </RevealItem>
            </div>
            <RevealItem y={12} duration={0.6}>
              <p className="mt-6 text-base leading-[1.6] text-muted-foreground">
                A maioria das plataformas vende uma ou mais partes do processo. A fynd quer vender o resultado.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </SiteContainer>
    </section>
  )
}
