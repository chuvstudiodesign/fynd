"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, type Variants } from "motion/react"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { MiniContaV5, MiniEncontraV5, MiniFechaV5 } from "@/components/site/platform-v5"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { REVEAL_ATTR, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V5, anchorOffsetV5, headToBodyV5, sectionYV5 } from "./anchors-v5"

/**
 * Como funciona, 3 passos (02-copy-v5 §3, 03-design-v5 §2).
 * O rótulo mono do card é só o índice: o nome do passo é o título, em caixa normal
 * ("A fynd trabalha" não pode virar caixa alta). Os `aria-label`s dos recortes são os do copy.
 */
const STEPS = [
  {
    index: "01",
    title: "Você explica",
    text: "Conte o que sua empresa vende e quem costuma comprar.",
    Mini: MiniContaV5,
    miniLabel: "Exemplo: a Camila explica o que a Lumi Embalagens vende e anexa o site e o catálogo.",
  },
  {
    index: "02",
    title: "A fynd trabalha",
    text: "Entende seu negócio, encontra empresas, aborda e identifica interesse.",
    Mini: MiniEncontraV5,
    miniLabel: "Exemplo: 4.860 empresas com o perfil da Lumi, das quais 12 se mostraram interessadas.",
  },
  {
    index: "03",
    title: "Você vende",
    text: "Seu time recebe as oportunidades que merecem uma conversa comercial.",
    Mini: MiniFechaV5,
    miniLabel: "Exemplo: a Serra Azul Alimentos pediu amostras. Contato: Renata Moraes, gerente de compras.",
  },
]

export function HowItWorksSectionV5() {
  return (
    <section id={ANCHORS_V5.howItWorks} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionYV5, anchorOffsetV5)}>
      <SiteContainer>
        {/* Sem subtítulo: os três passos respondem à pergunta do título (02-copy-v5 §3). */}
        <RevealGroup>
          <RevealItem y={16} duration={0.7}>
            <Text variant="eyebrow">ZERO SETUP</Text>
          </RevealItem>
          <RevealItem y={16} duration={0.7}>
            <Text variant="h1" render={<h2 />} className="mt-4 max-w-[20ch] lg:mt-5">
              E se o processo fosse muito mais simples?
            </Text>
          </RevealItem>
        </RevealGroup>

        <RevealGroup gap={0.1} className={cn("grid gap-4 sm:gap-6 lg:grid-cols-3 xl:gap-8", headToBodyV5)}>
          {STEPS.map(({ index, title, text, Mini, miniLabel }) => (
            <RevealItem key={index} className="h-full min-w-0">
              <article className="grid h-full gap-6 rounded-xl border border-border bg-paper-50 p-6 transition-transform duration-200 ease-out sm:grid-cols-2 sm:items-center md:p-8 lg:grid-cols-1 [&>*]:min-w-0 lg:content-start lg:items-start [@media(pointer:fine)]:motion-safe:hover:-translate-y-1">
                {/* O mini é decorativo (aria-hidden); o exemplo chega ao leitor de tela pelo label do copy. */}
                <div role="img" aria-label={miniLabel}>
                  <div inert aria-hidden="true">
                    <Mini />
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs font-medium tracking-label text-muted-foreground tabular-nums">
                    {index}
                  </span>
                  <Text variant="h3" render={<h3 />} className="mt-3">
                    {title}
                  </Text>
                  <Text className="mt-3 text-muted-foreground">{text}</Text>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <CycleStrip />
      </SiteContainer>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Faixa do ciclo ("o motorzinho"), sem a palavra "motor" no texto       */
/* ------------------------------------------------------------------ */

const CYCLE = ["Entender", "Encontrar", "Abordar", "Conversar", "Qualificar", "Entregar"] as const
const GAP = 0.06
/** Fim da passada: 11 filhos no stagger + duração do último nó + 0.1 s. */
const DONE_AFTER = (CYCLE.length * 2 - 2) * GAP + 0.5 + 0.1

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}
const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.3, ease: EASE_OUT } },
}

/**
 * Entender → Encontrar → Abordar → Conversar → Qualificar → Entregar (02-copy-v5 §3, 03-design-v5 §2).
 * À esquerda, a frase de fechamento da seção. Uma passada só, da esquerda para a direita, sem loop e sem ciano. "Entender" e
 * "Entregar" são os toques do cliente (texto `foreground`); os quatro do meio ficam apagados sob o
 * colchete. "Entregar" ganha contraste no fim da passada. Com movimento reduzido, já aparece no estado final.
 */
function CycleStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setDone(true), reduce ? 0 : DONE_AFTER * 1000)
    return () => window.clearTimeout(t)
  }, [inView, reduce])

  return (
    <div className={cn(siteGrid, "mt-12 items-center gap-y-6 border-t border-border pt-8 lg:mt-16")}>
      <div className="col-span-full lg:col-span-4">
        <Text variant="eyebrow">POR TRÁS DE CADA OPORTUNIDADE</Text>
        <motion.div
          {...REVEAL_ATTR}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}
        >
          <Text variant="h3" render={<p />} className="mt-3 max-w-[18ch] font-light">
            Você conhece seu produto. A fynd cuida da busca.
          </Text>
        </motion.div>
      </div>

      <div
        ref={ref}
        role="img"
        aria-label="Por trás de cada oportunidade, a fynd entende, encontra, aborda, conversa, qualifica e entrega. Você entra na entrega."
        className="col-span-full lg:col-span-8"
      >
        <motion.div
          aria-hidden="true"
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: GAP } } }}
          className="grid grid-cols-3 gap-y-5 lg:grid-cols-[auto_minmax(0.75rem,1fr)_auto_minmax(0.75rem,1fr)_auto_minmax(0.75rem,1fr)_auto_minmax(0.75rem,1fr)_auto_minmax(0.75rem,1fr)_auto] lg:gap-y-2"
        >
          {CYCLE.map((verb, i) => {
            const isClient = i === 0 || i === CYCLE.length - 1
            const isLast = i === CYCLE.length - 1
            return (
              <Fragment key={verb}>
                <motion.div
                  {...REVEAL_ATTR}
                  variants={nodeVariants}
                  className="flex flex-col items-start gap-2 lg:row-start-1 lg:items-center lg:text-center"
                >
                  <span className="font-mono text-[0.6875rem] leading-4 text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-1.5 rounded-full bg-navy-600" />
                  <span
                    data-done={isLast && done ? "" : undefined}
                    className={cn(
                      "font-mono text-xs font-medium tracking-label uppercase transition-colors duration-300 motion-reduce:transition-none",
                      isClient && !isLast && "text-foreground",
                      !isClient && "text-steel-500",
                      isLast && "text-muted-foreground data-done:text-foreground"
                    )}
                  >
                    {verb}
                  </span>
                  {isLast && <span className="text-xs text-muted-foreground">você entra aqui</span>}
                </motion.div>
                {!isLast && (
                  <motion.span
                    variants={connectorVariants}
                    // Na altura do ponto: índice (16px) + gap (8px) + metade do ponto (3px).
                    className="hidden h-px origin-left self-start bg-navy-200 lg:row-start-1 lg:mt-[26.5px] lg:block"
                  />
                )}
              </Fragment>
            )
          })}
          {/* Colchete sob os quatro do meio: o que a fynd cuida. Só no desktop. */}
          <motion.span
            variants={nodeVariants}
            className="hidden h-2 rounded-b-sm border-x border-b border-navy-200 lg:col-start-3 lg:col-end-10 lg:row-start-2 lg:block"
          />
        </motion.div>
      </div>
    </div>
  )
}
