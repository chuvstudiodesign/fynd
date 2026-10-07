"use client"

import { useId, useRef } from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { XIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { gsap, MQ, SplitText, useGSAP, EASE_OUT, type MQConditions } from "@/components/site/motion/gsap"
import { Reveal, REVEAL_ATTR } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { headToBodyV4, sectionYV4 } from "./anchors-v4"

/**
 * O problema, com contraste "hoje × com a fynd" (02-copy-v4 §2, 03-design-v4 §2, 04-motion-v4 §2).
 * O campo escuro conta o dia a dia de hoje; o painel claro (fora do `.dark`) é o dia a dia com a fynd.
 * Os dois lados falam do cliente, nunca de ferramenta: sem cabeçalho de tabela, sem concorrente.
 * O `destructive` aparece só no ícone X. Nenhum ciano na seção.
 */
const PAIRS = [
  {
    today: { lead: "Mailing frio.", rest: "Você compra uma listagem e liga para quem não está esperando você." },
    fynd: { lead: "Só interessados.", rest: "Chegam empresas que responderam e querem saber mais." },
  },
  {
    today: { lead: "Estrutura cara.", rest: "Prospectar pede contratar, treinar e montar um processo." },
    fynd: { lead: "Sem montar time.", rest: "Você mesmo pode atender quem chega." },
  },
  {
    today: { lead: "Setup sem fim.", rest: "Configurar ferramenta, subir base, definir cliente ideal." },
    fynd: { lead: "Zero setup.", rest: "Você conta o que vende e pronto." },
  },
] as const

// Linhas explícitas no desktop: os pares ficam alinhados sem tabela (03-design-v4 §2.2).
const ROW_START = ["lg:row-start-2", "lg:row-start-3", "lg:row-start-4"] as const
const STAGGER = 0.08

/** Item "hoje": entra com a linha. O X não anima sozinho. */
const todayVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.16 + i * STAGGER } }),
}

/** Item "com a fynd": 0.12 s depois do "hoje" da mesma linha. */
const fyndVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.28 + i * STAGGER } }),
}

const headVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT, delay: i * STAGGER } }),
}

/** Check do lucide desenhado por `pathLength` (0.35 s), junto do item. */
function DrawnCheck({ index }: { index: number }) {
  const reduce = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 size-4 shrink-0 text-navy-600"
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        variants={{
          // O estado inicial não depende de `reduce` (hidratação); com movimento reduzido o desenho é instantâneo.
          hidden: { pathLength: 0 },
          show: {
            pathLength: 1,
            transition: { duration: reduce ? 0 : 0.35, ease: EASE_OUT, delay: reduce ? 0 : 0.36 + index * STAGGER },
          },
        }}
      />
    </svg>
  )
}

export function ProblemSectionV4() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const todayId = useId()
  const fyndId = useId()

  useGSAP(
    () => {
      const title = titleRef.current
      if (!title) return
      const mm = gsap.matchMedia()
      mm.add(MQ, (ctx) => {
        const { full, compact } = ctx.conditions as MQConditions
        if (!full && !compact) return
        // Título lido por palavra conforme o scroll (igual à v3).
        SplitText.create(title, {
          type: "words",
          aria: "auto",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.15 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: title, start: "top 80%", end: "top 35%", scrub: 0.6 },
              }
            ),
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} data-theme="dark" className={cn("bg-navy-900", sectionYV4)}>
      <SiteContainer>
        <div className={cn("dark text-foreground", siteGrid, "items-end")}>
          <div className="col-span-full lg:col-span-7">
            <Reveal>
              <Text variant="eyebrow">O DIA A DIA DE QUEM VENDE</Text>
            </Reveal>
            <Text ref={titleRef} variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
              Mais mailing não resolve. Interesse resolve.
            </Text>
          </div>
          <Reveal className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
            <Text variant="lead" className="max-w-[36rem]">
              Comprar mailing é fácil. Difícil é descobrir quem quer conversar.
            </Text>
          </Reveal>
        </div>

        {/*
         * Uma grade só: no DOM vêm todos os itens "hoje" e depois todos os "com a fynd" (dois blocos no mobile).
         * No desktop, as classes `lg:row-start-*` alinham cada par na mesma linha e o painel claro fica atrás.
         */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className={cn("grid lg:grid-cols-12 lg:grid-rows-[auto_repeat(3,auto)] lg:gap-x-8", headToBodyV4)}
        >
          {/* Coluna "hoje", no campo escuro */}
          <motion.p
            {...REVEAL_ATTR}
            id={todayId}
            custom={0}
            variants={headVariants}
            className="dark pb-2 text-sm font-semibold text-foreground lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end lg:pr-10 lg:pb-3"
          >
            Hoje
          </motion.p>
          <ul aria-labelledby={todayId} className="dark contents text-foreground">
            {PAIRS.map((pair, i) => (
              <motion.li
                key={pair.today.lead}
                {...REVEAL_ATTR}
                custom={i}
                variants={todayVariants}
                className={cn(
                  "flex gap-4 border-t border-border py-5 lg:col-span-6 lg:col-start-1 lg:pr-10",
                  ROW_START[i]
                )}
              >
                <XIcon aria-hidden="true" strokeWidth={2} className="mt-1 size-4 shrink-0 text-destructive" />
                <p className="text-base leading-[1.6] text-steel-300">
                  <span className="font-semibold text-paper-50">{pair.today.lead}</span> {pair.today.rest}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Painel claro "com a fynd": fundo próprio no desktop; no mobile, um bloco empilhado. */}
          <motion.div
            {...REVEAL_ATTR}
            aria-hidden="true"
            custom={1}
            variants={headVariants}
            className="hidden rounded-2xl bg-paper-50 lg:col-span-6 lg:col-start-7 lg:row-span-4 lg:row-start-1 lg:block"
          />
          <div className="mt-8 rounded-2xl bg-paper-50 p-6 text-foreground lg:contents">
            <motion.p
              {...REVEAL_ATTR}
              id={fyndId}
              custom={1}
              variants={headVariants}
              className="pb-2 text-sm font-semibold text-foreground lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end lg:px-8 lg:pt-8 lg:pb-3"
            >
              Com a fynd
            </motion.p>
            <ul aria-labelledby={fyndId} className="lg:contents">
              {PAIRS.map((pair, i) => (
                <motion.li
                  key={pair.fynd.lead}
                  {...REVEAL_ATTR}
                  custom={i}
                  variants={fyndVariants}
                  className={cn(
                    "flex gap-4 border-t border-border py-5 lg:col-span-6 lg:col-start-7 lg:px-8",
                    i === PAIRS.length - 1 && "pb-0 lg:pb-8",
                    ROW_START[i]
                  )}
                >
                  <DrawnCheck index={i} />
                  <p className="text-base leading-[1.6] text-foreground">
                    <span className="font-semibold">{pair.fynd.lead}</span> {pair.fynd.rest}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <Reveal y={12} amount={0.5} className="dark mt-14 text-center text-foreground lg:mt-16">
          <Text variant="h3" render={<p />} className="mx-auto max-w-[24ch] text-balance text-paper-50">
            Troque o lead frio pelo lead quente.
          </Text>
        </Reveal>
      </SiteContainer>
    </section>
  )
}
