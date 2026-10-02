"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowDownIcon, ArrowRightIcon, BuildingIcon, CheckIcon, DatabaseIcon, ListChecksIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { HeroScreen } from "@/components/site/platform"
import { gsap, MQ, useGSAP, EASE_OUT, type MQConditions } from "@/components/site/motion/gsap"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS, CTA_LABEL } from "./anchors"

/**
 * Hero v2 — mesma mensagem da v1, com a linguagem visual da marca (slides "Luz revela caminhos",
 * "Ciano é luz" e "A marca orienta nos detalhes"): campo de luz radial, trilha pontilhada,
 * grade de pontos e cards de interface flutuando ao redor do MacBook.
 * Regra de cor: o ciano entra como luz ambiente (brilho e trilha em baixa opacidade), como o ponto
 * de status e, dentro da tela, na barra do item ativo. Nenhum texto ciano.
 */

const MOCKUP_LABEL =
  "Tela de oportunidades da fynd: lista de empresas ordenadas por aderência ao perfil ideal, com Serra Azul Alimentos no topo, com 92%."

/* ------------------------------------------------------------------ */
/* Trilha pontilhada ("a luz revela caminhos")                          */
/* ------------------------------------------------------------------ */

const VIEW = { w: 1440, h: 900 }
const GLOW = { x: 1170, y: 360 }

/** Pontos ao longo de uma curva cúbica que sobe da esquerda para a direita. Calculado uma vez, no módulo. */
const PATH_DOTS = (() => {
  // Sobe pela direita, longe da coluna de texto, e atravessa o foco de luz.
  const p0 = [1010, 990], p1 = [1110, 700], p2 = [1120, 420], p3 = [1540, 40]
  const n = 46
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const u = 1 - t
    const x = u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0]
    const y = u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1]
    const d = Math.hypot(x - GLOW.x, y - GLOW.y)
    const o = 0.07 + 0.78 * Math.exp(-((d / 250) ** 2))
    return { x: Math.round(x), y: Math.round(y), o: Math.round(o * 100) / 100, lit: o > 0.42 }
  })
})()

function LightPath() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-[100svh] w-full md:block"
    >
      {PATH_DOTS.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.lit ? 2.6 : 2.1}
          className={cn("fynd-path-dot", dot.lit ? "fill-signal-300" : "fill-steel-300")}
          style={{ "--o": dot.o, opacity: dot.o, animationDelay: `${(i * 0.06).toFixed(2)}s` } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}

/** Camadas de fundo: campo de luz, grade de pontos e o brilho que a tela projeta. Todas decorativas. */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Campo de luz: azul estrutural no alto à esquerda, luz ciano suave à direita do título */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_0%,color-mix(in_oklch,var(--navy-600)_42%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_30%_at_80%_33%,color-mix(in_oklch,var(--signal-400)_15%,transparent),transparent_72%)] max-md:bg-[radial-gradient(ellipse_70%_30%_at_50%_30%,color-mix(in_oklch,var(--signal-400)_10%,transparent),transparent_72%)]" />
      {/* Grade de pontos: precisão do sistema, some nas bordas */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--steel-300)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_28%,black,transparent_75%)] bg-[size:28px_28px] opacity-[0.09]" />
      <LightPath />
      {/* Transição para a seção seguinte (mesmo navy) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-900" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cards flutuantes (linguagem do slide "A marca orienta nos detalhes") */
/* ------------------------------------------------------------------ */

const floatCard =
  "rounded-xl border border-paper-50/10 bg-navy-800/90 text-paper-50 shadow-[0_24px_60px_-20px_hsl(var(--shadow-color)/0.9)] backdrop-blur-md"

// Altura relativa das barras (média 74% = média das 6 empresas da lista: 92, 84, 77, 71, 64, 58).
const BARS = [38, 62, 48, 80, 56, 92, 44, 70, 84, 52, 66, 74]
const BAR_PEAK = 5

function ProfileSavedCard() {
  return (
    <div className={cn(floatCard, "flex w-[17rem] items-start gap-3 p-4")}>
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-paper-50/25">
        <CheckIcon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold">Perfil salvo</span>
        <span className="text-xs leading-snug text-steel-300">148 empresas compatíveis encontradas.</span>
      </span>
    </div>
  )
}

function FitCard() {
  return (
    <div className={cn(floatCard, "w-[15.5rem] p-4")}>
      <span className="text-xs text-steel-300">Aderência média</span>
      <div className="mt-1 flex items-end justify-between gap-4">
        <span className="font-heading text-4xl leading-none font-light tracking-display tabular-nums">74%</span>
        <span className="flex h-12 items-end gap-[3px]">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={cn("w-1.5 rounded-[2px]", i === BAR_PEAK ? "bg-paper-50" : "bg-navy-600")}
              style={{ height: `${h}%` }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

function ProfileChipsCard() {
  return (
    <div className={cn(floatCard, "w-[16.5rem] p-4")}>
      <span className="font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase">Perfil ideal</span>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Alimentos", "Sudeste", "200–500 pessoas"].map((c) => (
          <span key={c} className="rounded-full border border-paper-50/25 px-2.5 py-1 text-xs">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

const FLOATS = [
  { Card: ProfileSavedCard, pos: "left-[-7%] top-[14%]", speed: 0.9 },
  { Card: FitCard, pos: "right-[-8%] top-[3%]", speed: 1.4 },
  { Card: ProfileChipsCard, pos: "left-[-4%] top-[62%]", speed: 0.6 },
] as const

/* ------------------------------------------------------------------ */

const PROOFS = [
  // [receita-federal-removido 2026-10-01] original: { icon: BuildingIcon, label: "CNPJs da Receita Federal" }
  { icon: BuildingIcon, label: "Bases empresariais organizadas" },
  { icon: DatabaseIcon, label: "Base própria de contas" },
  { icon: ListChecksIcon, label: "Critério explicável" },
]

export function HeroSectionV2() {
  const sectionRef = useRef<HTMLElement>(null)
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
        // Tampa: inclinada → frontal (igual à v1)
        gsap.fromTo(
          lid,
          { rotateX: full ? 14 : 8, scale: full ? 0.94 : 0.97, y: 0, transformOrigin: "50% 100%", willChange: "transform" },
          {
            rotateX: 0,
            scale: 1,
            y: full ? -24 : 0,
            ease: "none",
            scrollTrigger: { trigger: mac, start: full ? "top 85%" : "top 90%", end: full ? "top 25%" : "top 50%", scrub: 0.6 },
          }
        )
        if (!full) return
        // Parallax dos cards: cada um sobe numa velocidade, dando profundidade ao redor da tela
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
      id={ANCHORS.top}
      data-theme="dark"
      className="relative isolate min-h-[100svh] overflow-x-clip bg-navy-900"
    >
      <Backdrop />

      <SiteContainer className={cn(siteGrid, "relative pt-[calc(80px+88px)] pb-16 md:pt-[calc(80px+120px)]")}>
        <RevealGroup
          onMount
          gap={0.08}
          startDelay={0.1}
          className="dark col-span-full mx-auto flex max-w-3xl flex-col items-center text-center text-foreground"
        >
          <RevealItem y={16} fade={false}>
            <a
              href={`#${ANCHORS.access}`}
              className="group/pill inline-flex h-9 items-center gap-2.5 rounded-full border border-paper-50/12 bg-paper-50/[0.04] pr-3 pl-3 text-xs font-medium text-paper-50/90 backdrop-blur-sm transition-colors duration-200 outline-none hover:border-paper-50/25 hover:bg-paper-50/[0.07] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-signal opacity-60 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              Acesso antecipado aberto
              <span aria-hidden="true" className="h-3.5 w-px bg-paper-50/15" />
              <span className="inline-flex items-center gap-1 text-steel-300 transition-colors group-hover/pill:text-paper-50">
                Pedir convite
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </a>
          </RevealItem>

          <RevealItem y={12} duration={0.9} fade={false} className="mt-7 lg:mt-8">
            <Text variant="display" render={<h1 />} className="mx-auto max-w-[14ch] md:text-[5.25rem]">
              Saiba para quem vender agora.
            </Text>
          </RevealItem>

          <RevealItem y={16} fade={false} className="mt-6 md:mt-7">
            <Text variant="lead" className="mx-auto max-w-[36rem]">
              Conte quem é o seu cliente ideal. A fynd encontra as empresas com maior potencial de compra, mostra por
              que cada uma faz sentido e sugere o primeiro contato.
            </Text>
          </RevealItem>

          <RevealItem y={16} fade={false} className="mt-9 flex flex-wrap justify-center gap-3 md:mt-10">
            <a href={`#${ANCHORS.access}`} className={cn(buttonVariants({ variant: "default", size: "lg" }), "group/cta")}>
              {CTA_LABEL}
              <ArrowRightIcon
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
            <a
              href={`#${ANCHORS.demo}`}
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

          <RevealItem y={16} fade={false} className="mt-10 md:mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase">
              {PROOFS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-3.5 text-steel-400" strokeWidth={1.75} />
                  {label}
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>

        <motion.div
          ref={macRef}
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
          className="relative col-span-full mt-16 w-full max-md:-mx-[6%] max-md:w-[112%] md:mx-auto md:max-w-[1080px] lg:col-span-10 lg:col-start-2 lg:mt-20"
        >
          {/* A tela é a fonte de luz: brilho largo atrás e abaixo do MacBook */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-10%] top-[8%] bottom-[-12%] -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,color-mix(in_oklch,var(--signal-400)_13%,transparent),color-mix(in_oklch,var(--navy-600)_20%,transparent)_45%,transparent_72%)] blur-2xl"
          />

          <MacBook lidRef={lidRef} label={MOCKUP_LABEL}>
            <HeroScreen play={play} />
          </MacBook>

          {/* Cards flutuantes: só em telas largas, decorativos (a informação já está na tela) */}
          <div aria-hidden="true" className="dark pointer-events-none absolute inset-0 hidden lg:block">
            {FLOATS.map(({ Card, pos, speed }, i) => (
              <motion.div
                key={i}
                className={cn("absolute", pos)}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
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
      </SiteContainer>
    </section>
  )
}
