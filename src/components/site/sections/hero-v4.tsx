"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowDownIcon, ArrowRightIcon, CheckIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { HeroScreenV4, SCREEN_LABELS_V4 } from "@/components/site/platform-v4"
import { gsap, MQ, useGSAP, EASE_OUT, type MQConditions } from "@/components/site/motion/gsap"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V4, CTA_LABEL_V4 } from "./anchors-v4"
import { Backdrop, LitDot, ZeroSetupStrip } from "./hero-parts-v4"

/**
 * Hero v4 (02-copy-v4 §1, 03-design-v4 §1, 04-motion-v4 §5).
 * Igual à v3 no fundo, no título, nos botões, no MacBook, na tampa e no parallax. Muda: subtítulo sem
 * "primeiro contato", a linha de zero setup no lugar da faixa de provas e os 3 cards do funil
 * (você vende → 4.860 com o seu perfil → 12 interessadas), sem setas e sem % entre os números.
 * Ciano: só o ponto aceso do fundo e, dentro da tela, o selo do card ativo.
 */

/** Funil da v4 (universo fictício do copy). Não existe número de contatadas nem de respostas. */
const FUNNEL = { profile: "4.860", interested: 12 } as const

const floatCard =
  "rounded-xl border border-paper-50/10 bg-navy-800/90 text-paper-50 shadow-[0_24px_60px_-20px_hsl(var(--shadow-color)/0.9)] backdrop-blur-md"

const monoLabel = "font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase"

/** 1 · Você vende */
function SellCard() {
  return (
    <div className={cn(floatCard, "w-[16.5rem] p-4")}>
      <span className={monoLabel}>01 · Você vende</span>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Embalagens flexíveis", "Alimentos", "Cosméticos"].map((c) => (
          <span key={c} className="rounded-full border border-paper-50/25 px-2.5 py-1 text-xs">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

/** 2 · Seu perfil (número estático: a contagem acontece uma vez só, na tela Fit da demo) */
function ProfileCard() {
  return (
    <div className={cn(floatCard, "w-[15rem] p-4")}>
      <span className={monoLabel}>02 · Seu perfil</span>
      <span className="mt-2 block font-heading text-4xl leading-none font-light tracking-display tabular-nums">
        {FUNNEL.profile}
      </span>
      <span className="mt-2 block text-xs leading-snug text-steel-300">empresas com o seu perfil</span>
    </div>
  )
}

/** 3 · Interessados (destaque pelo peso e pela pílula clara, nunca por ciano) */
function InterestedCard() {
  return (
    <div className={cn(floatCard, "w-[17rem] p-4")}>
      <span className={monoLabel}>03 · Interessados</span>
      <div className="mt-3 flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-50 text-navy-900">
          <CheckIcon className="size-4" strokeWidth={2} />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">{FUNNEL.interested} interessadas</span>
          <span className="text-xs leading-snug text-steel-300">Serra Azul Alimentos pediu amostras.</span>
        </span>
      </div>
    </div>
  )
}

// Ordem de leitura do funil: esquerda alto → direita alto → direita baixo. Posições e velocidades da v3.
const FLOATS = [
  { Card: SellCard, pos: "left-[-7%] top-[10%]", speed: 0.9 },
  { Card: ProfileCard, pos: "right-[-7%] top-[2%]", speed: 1.4 },
  { Card: InterestedCard, pos: "right-[-5%] top-[58%]", speed: 1.1 },
] as const

export function HeroSectionV4() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const macRef = useRef<HTMLDivElement>(null)
  const lidRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const macInView = useInView(macRef, { once: true, amount: 0.2 })
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (!macInView) return
    const t = window.setTimeout(() => setPlay(true), reduce ? 0 : 850)
    return () => window.clearTimeout(t)
  }, [macInView, reduce])

  useGSAP(
    () => {
      const lid = lidRef.current
      const mac = macRef.current
      if (!lid || !mac) return
      const mm = gsap.matchMedia()
      mm.add(MQ, (ctx) => {
        const { full, compact } = ctx.conditions as MQConditions
        if (!full && !compact) {
          gsap.set(lid, { clearProps: "transform" })
          return
        }
        // Tampa: inclinada → frontal (igual à v3). A tampa não se desloca: subir só ela a solta da base.
        gsap.fromTo(
          lid,
          { rotateX: full ? 14 : 8, scale: full ? 0.94 : 0.97, y: 0, transformOrigin: "50% 100%", willChange: "transform" },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: mac, start: full ? "top 85%" : "top 90%", end: full ? "top 25%" : "top 50%", scrub: 0.6 },
          }
        )
        if (!full) return
        // Parallax dos cards (só `full`)
        gsap.utils.toArray<HTMLElement>("[data-parallax]", mac).forEach((el) => {
          const speed = Number(el.dataset.parallax) || 1
          gsap.fromTo(
            el,
            { y: 60 * speed },
            { y: -60 * speed, ease: "none", scrollTrigger: { trigger: mac, start: "top bottom", end: "bottom top", scrub: 0.8 } }
          )
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id={ANCHORS_V4.top}
      data-theme="dark"
      className="relative isolate min-h-[100svh] overflow-x-clip bg-navy-900"
    >
      <Backdrop>
        <LitDot sectionRef={sectionRef} titleRef={titleRef} />
      </Backdrop>

      <SiteContainer className={cn(siteGrid, "relative pt-[calc(80px+88px)] pb-16 md:pt-[calc(80px+64px)]")}>
        <RevealGroup
          onMount
          gap={0.08}
          startDelay={0.1}
          className="dark col-span-full mx-auto flex max-w-3xl flex-col items-center text-center text-foreground"
        >
          <RevealItem y={16} fade={false}>
            <a
              href={`#${ANCHORS_V4.access}`}
              // QA M1: os nós do flex grudavam no nome calculado ("abertoGarantir"); o rótulo contém o texto visível.
              aria-label="Acesso antecipado aberto. Garantir vaga"
              className="group/pill inline-flex h-9 items-center gap-2.5 rounded-full border border-paper-50/12 bg-paper-50/[0.04] pr-3 pl-3 text-xs font-medium text-paper-50/90 backdrop-blur-sm transition-colors duration-200 outline-none hover:border-paper-50/25 hover:bg-paper-50/[0.07] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-paper-50 opacity-40 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-paper-50" />
              </span>
              Acesso antecipado aberto
              <span aria-hidden="true" className="h-3.5 w-px bg-paper-50/15" />
              <span className="inline-flex items-center gap-1 text-steel-300 transition-colors group-hover/pill:text-paper-50">
                Garantir vaga
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </a>
          </RevealItem>

          <RevealItem y={12} duration={0.9} fade={false} className="mt-7 lg:mt-8">
            <Text ref={titleRef} variant="display" render={<h1 />} className="mx-auto max-w-[17ch] md:text-[5.25rem]">
              Você vende,
              <br />a gente encontra.
            </Text>
          </RevealItem>

          <RevealItem y={16} fade={false} className="mt-6 md:mt-7">
            <Text variant="lead" className="mx-auto max-w-[36rem] text-balance">
              Conte o que a sua empresa vende. A fynd encontra quem tem o seu perfil e entrega só as empresas
              interessadas. Você fecha.
            </Text>
          </RevealItem>

          <RevealItem y={16} fade={false} className="mt-9 flex flex-wrap justify-center gap-3 md:mt-10">
            <a href={`#${ANCHORS_V4.access}`} className={cn(buttonVariants({ variant: "default", size: "lg" }), "group/cta")}>
              {CTA_LABEL_V4}
              <ArrowRightIcon
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
            <a
              href={`#${ANCHORS_V4.howItWorks}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group/demo border-paper-50/15 bg-paper-50/[0.03] backdrop-blur-sm"
              )}
            >
              Ver como funciona
              <ArrowDownIcon
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/demo:translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </RevealItem>

          {/* Linha de zero setup: último filho do grupo, entra como um bloco, sem fade (04-motion-v4 §5). */}
          <RevealItem y={16} fade={false} className="mt-6 md:mt-7">
            <ZeroSetupStrip size="lg" />
          </RevealItem>
        </RevealGroup>

        <motion.div
          ref={macRef}
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
          className="relative col-span-full mt-14 w-full max-md:-mx-[6%] max-md:w-[112%] md:mx-auto md:max-w-[1080px] lg:col-span-10 lg:col-start-2 lg:mt-10"
        >
          {/* A tela é a fonte de luz: brilho largo atrás e abaixo do MacBook */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-10%] top-[8%] bottom-[-12%] -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,color-mix(in_oklch,var(--signal-400)_13%,transparent),color-mix(in_oklch,var(--navy-600)_20%,transparent)_45%,transparent_72%)] blur-2xl"
          />

          <MacBook lidRef={lidRef} label={SCREEN_LABELS_V4.hero}>
            <HeroScreenV4 play={play} />
          </MacBook>

          {/* Cards flutuantes: só em telas largas, decorativos (a informação já está na tela) */}
          <div aria-hidden="true" className="dark pointer-events-none absolute inset-0 hidden lg:block">
            {FLOATS.map(({ Card, pos, speed }, i) => (
              <motion.div
                key={i}
                className={cn("absolute", pos)}
                // Sem depender de `reduce` no render (hidratação). O MotionConfig ("user") deixa só o fade.
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: EASE_OUT }}
              >
                <div data-parallax={speed}>
                  <Card />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* < lg: os cards somem e o funil vira uma linha de texto real abaixo do MacBook (03-design-v4 §1.3). */}
        <p className="col-span-full mt-8 text-center font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase lg:hidden">
          Você vende · <span className="text-paper-50">{FUNNEL.profile}</span> com o seu perfil ·{" "}
          <span className="text-paper-50">{FUNNEL.interested}</span> interessadas
        </p>
      </SiteContainer>
    </section>
  )
}
