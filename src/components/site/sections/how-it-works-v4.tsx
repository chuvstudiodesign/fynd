"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, type Variants } from "motion/react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MINI_LABELS_V4, MiniContaV4, MiniEncontraV4, MiniFechaV4 } from "@/components/site/platform-v4"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { REVEAL_ATTR, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V4, headToBodyV4, sectionYV4 } from "./anchors-v4"

/** Os 3 passos (02-copy-v4 §3; passo 2 = opção recomendada). */
const STEPS = [
  {
    label: "01 · VOCÊ CONTA",
    title: "Você conta o que vende",
    text: "Do seu jeito: uma mensagem, o site, um catálogo. Não precisa saber descrever o seu cliente ideal.",
    Mini: MiniContaV4,
    miniLabel: MINI_LABELS_V4.conta,
  },
  {
    label: "02 · A GENTE ENCONTRA",
    title: "A fynd encontra e qualifica os interessados",
    text: "Cruza o que você vende com a base, encontra as empresas com o seu perfil, aborda, qualifica e separa só quem tem interesse.",
    Mini: MiniEncontraV4,
    miniLabel: MINI_LABELS_V4.encontra,
  },
  {
    label: "03 · VOCÊ FECHA",
    title: "Você recebe os interessados e fecha",
    text: "Cada empresa chega com contato, interesse e próximo passo. A conversa e a decisão são suas.",
    Mini: MiniFechaV4,
    miniLabel: MINI_LABELS_V4.fecha,
  },
]

export function HowItWorksSectionV4() {
  return (
    <section id={ANCHORS_V4.howItWorks} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionYV4)}>
      <SiteContainer>
        <RevealGroup className={cn(siteGrid, "items-end")}>
          <div className="col-span-full lg:col-span-6">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">COMO FUNCIONA</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                Você conta, a fynd encontra, você fecha.
              </Text>
            </RevealItem>
          </div>
          <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              Zero setup. Foco no resultado. Você não configura nada, não sobe base e não compra mailing.
            </Text>
          </RevealItem>
        </RevealGroup>

        <RevealGroup gap={0.1} className={cn("grid gap-4 sm:gap-6 lg:grid-cols-3 xl:gap-8", headToBodyV4)}>
          {STEPS.map(({ label, title, text, Mini, miniLabel }) => (
            <RevealItem key={label} className="h-full min-w-0">
              <article className="grid h-full gap-6 rounded-xl border border-border bg-paper-50 p-6 transition-transform duration-200 ease-out sm:grid-cols-2 sm:items-center md:p-8 lg:grid-cols-1 [&>*]:min-w-0 lg:content-start lg:items-start [@media(pointer:fine)]:motion-safe:hover:-translate-y-1">
                {/* O mini é decorativo (aria-hidden); o exemplo chega ao leitor de tela pelo label do copy. */}
                <div role="img" aria-label={miniLabel}>
                  <div inert aria-hidden="true">
                    <Mini />
                  </div>
                </div>
                <div>
                  <Text variant="eyebrow">{label}</Text>
                  <Text variant="h4" render={<h3 />} className="mt-3">
                    {title}
                  </Text>
                  <Text className="mt-3 text-muted-foreground">{text}</Text>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <CycleStrip />

        <div className="mt-10">
          <a
            href={`#${ANCHORS_V4.demo}`}
            className={cn(buttonVariants({ variant: "link" }), "group/link h-auto min-h-10 px-0 text-base")}
          >
            Ver na prática
            <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out group-hover/link:translate-y-[3px] motion-reduce:transition-none">
              ↓
            </span>
          </a>
        </div>
      </SiteContainer>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Faixa do ciclo ("o motorzinho"), sem a palavra "motor" no texto       */
/* ------------------------------------------------------------------ */

const CYCLE = ["Entender", "Encontrar", "Abordar", "Conversar", "Qualificar", "Entregar"] as const
const GAP = 0.06
/** Fim da passada: 11 filhos no stagger + duração do último nó + 0.1 s (04-motion-v4 §3). */
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
 * Entender → Encontrar → Abordar → Conversar → Qualificar → Entregar (02-copy-v4 §3, 03-design-v4 §3.3,
 * 04-motion-v4 §3). Uma passada só, da esquerda para a direita, sem loop e sem ciano. "Entender" e
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
        <Text variant="eyebrow">POR TRÁS DE CADA INTERESSADO</Text>
        <motion.div
          {...REVEAL_ATTR}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.75, ease: EASE_OUT }}
        >
          <Text variant="h3" render={<p />} className="mt-3 max-w-[16ch] font-light">
            A complexidade fica com a fynd.
          </Text>
        </motion.div>
      </div>

      <div
        ref={ref}
        role="img"
        aria-label="Por trás de cada interessado, a fynd entende, encontra, aborda, conversa, qualifica e entrega. Você entra na entrega."
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
