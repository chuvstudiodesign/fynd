"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { ArrowDownIcon, ArrowRightIcon, BuildingIcon, CheckIcon, CircleCheckIcon, HandIcon, SendIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { HeroScreenV3, SCREEN_LABELS_V3 } from "@/components/site/platform-v3"
import { gsap, MQ, useGSAP, EASE_OUT, type MQConditions } from "@/components/site/motion/gsap"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS, CTA_LABEL } from "./anchors"

/**
 * Hero v3 — visual da v2 com o copy do reposicionamento (docs/site/v3/02-copy-v3.md §1).
 * Os cards flutuantes contam o funil (você vende → fit → interessados) e a tela do MacBook é a de
 * Interessados. Não há card de "primeiro contato" com números: solto no hero, o funil 60 → 21 → 12
 * seria lido como taxa de resposta prometida (09-revisao-marca-v3 B1).
 * Novo no fundo: "o ponto no meio de todos os pontos", um único ponto aceso na grade, perto do título.
 * Regra de cor (09-revisao-marca-v3 P2.2): o único ponto ciano da dobra é o ponto aceso. A trilha é
 * steel e o ponto do pill é paper. Fora disso, só a luz ambiente e, dentro da tela, o selo
 * "Demonstrou interesse". Nenhum texto ciano.
 */

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
    return { x: Math.round(x), y: Math.round(y), o: Math.round(o * 100) / 100 }
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
          r={2.1}
          className="fynd-path-dot fill-steel-300"
          style={{ "--o": dot.o, opacity: dot.o, animationDelay: `${(i * 0.06).toFixed(2)}s` } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* O ponto aceso ("o ponto no meio de todos os pontos")                 */
/* ------------------------------------------------------------------ */

/** Passo da grade de pontos do fundo: os pontos ficam em 14 + 28·n (centro de cada célula). */
const GRID = 28
const snap = (v: number) => Math.round((v - GRID / 2) / GRID) * GRID + GRID / 2

/** Posição de `el` relativa a `root`, somando offsets (ignora os transforms das animações de entrada). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y }
}

/**
 * Um único ponto da grade aceso em ciano, com halo e pulso suave. Fica numa interseção da grade,
 * à direita da primeira linha do título, ou à esquerda da segunda linha quando não há espaço lateral.
 * Com movimento reduzido, fica estático (sem pulso e sem entrada).
 */
function LitDot({
  sectionRef,
  titleRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>
  titleRef: React.RefObject<HTMLElement | null>
}) {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  // useEffect (não layout): o ref do título só é ligado depois dos layout effects deste componente,
  // que vem antes do h1 na árvore.
  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return
    const commit = (next: { x: number; y: number }) =>
      setPos((p) => (p && p.x === next.x && p.y === next.y ? p : next))
    const place = () => {
      const { x, y } = offsetWithin(title, section)
      const width = section.clientWidth
      const right = x + title.offsetWidth
      const lineH = parseFloat(getComputedStyle(title).lineHeight) || title.offsetHeight / 2
      // Ao lado da primeira linha, a uma célula e meia da borda do título, se couber com folga.
      const side = { x: snap(right + GRID * 1.5), y: snap(y + lineH * 0.35) }
      if (side.x < width - GRID * 2) return commit(side)
      // Sem espaço lateral (mobile): à esquerda do início da 2ª linha ("a gente…"), que é mais curta.
      const range = document.createRange()
      const last = title.lastChild
      if (last) range.selectNodeContents(last)
      const rect = range.getClientRects()[0]
      const lineLeft = rect ? rect.left - title.getBoundingClientRect().left + x : x
      commit({ x: snap(Math.max(GRID * 1.5, lineLeft - GRID * 1.5)), y: snap(y + lineH * 1.5) })
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(section)
    ro.observe(title)
    return () => ro.disconnect()
  }, [sectionRef, titleRef])

  if (!pos) return null

  return (
    <span data-lit-dot className="absolute size-0" style={{ left: pos.x, top: pos.y }}>
      {/* Halo fixo */}
      <span className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--signal-400)_32%,transparent),transparent_65%)]" />
      {/* Pulso suave: um anel que cresce e some devagar */}
      {!reduce && (
        <motion.span
          className="absolute -inset-2 rounded-full border border-signal-300/60"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1.4, delay: 1.6 }}
        />
      )}
      {/* O ponto */}
      <motion.span
        className="absolute -inset-[2.5px] rounded-full bg-signal shadow-[0_0_10px_2px_color-mix(in_oklch,var(--signal-400)_65%,transparent)]"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: EASE_OUT }}
      />
    </span>
  )
}

/** Camadas de fundo: campo de luz, grade de pontos e o brilho que a tela projeta. Todas decorativas. */
function Backdrop({ children }: { children?: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Campo de luz: azul estrutural no alto à esquerda, luz ciano suave à direita do título */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_0%,color-mix(in_oklch,var(--navy-600)_42%,transparent),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_30%_at_80%_33%,color-mix(in_oklch,var(--signal-400)_15%,transparent),transparent_72%)] max-md:bg-[radial-gradient(ellipse_70%_30%_at_50%_30%,color-mix(in_oklch,var(--signal-400)_10%,transparent),transparent_72%)]" />
      {/* Grade de pontos: precisão do sistema, some nas bordas */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--steel-300)_1px,transparent_1.2px)] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_28%,black,transparent_75%)] bg-[size:28px_28px] opacity-[0.09]" />
      <LightPath />
      {children}
      {/* Transição para a seção seguinte (mesmo navy) */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-900" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cards flutuantes: o funil, em ordem de leitura                       */
/* ------------------------------------------------------------------ */

const floatCard =
  "rounded-xl border border-paper-50/10 bg-navy-800/90 text-paper-50 shadow-[0_24px_60px_-20px_hsl(var(--shadow-color)/0.9)] backdrop-blur-md"

const monoLabel = "font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase"

/** 1 · Você vende */
function SellCard() {
  return (
    <div className={cn(floatCard, "w-[16.5rem] p-4")}>
      <span className={monoLabel}>Você vende</span>
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

/** 2 · Fit */
function FitCard() {
  return (
    <div className={cn(floatCard, "w-[14rem] p-4")}>
      <span className={monoLabel}>Fit</span>
      <span className="mt-2 block font-heading text-4xl leading-none font-light tracking-display tabular-nums">148</span>
      <span className="mt-2 block text-xs leading-snug text-steel-300">empresas com fit encontradas</span>
    </div>
  )
}

/** 3 · Interessados (o destaque é paper-50, como a barra de pico da v2; nada de ciano) */
function InterestedCard() {
  return (
    <div className={cn(floatCard, "w-[17rem] p-4")}>
      <span className={monoLabel}>Interessados</span>
      <div className="mt-3 flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-50 text-navy-900">
          <CheckIcon className="size-4" strokeWidth={2} />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">12 interessadas</span>
          <span className="text-xs leading-snug text-steel-300">Serra Azul Alimentos pediu amostras.</span>
        </span>
      </div>
    </div>
  )
}

// Ordem de leitura do funil: esquerda alto → direita alto → direita baixo (o mais perto da tela).
const FLOATS = [
  { Card: SellCard, pos: "left-[-7%] top-[10%]", speed: 0.9 },
  { Card: FitCard, pos: "right-[-7%] top-[2%]", speed: 1.4 },
  { Card: InterestedCard, pos: "right-[-5%] top-[58%]", speed: 1.1 },
] as const

/* ------------------------------------------------------------------ */

const PROOFS = [
  // [receita-federal-removido 2026-10-01] original: "CNPJs da Receita Federal"
  { icon: BuildingIcon, label: "Bases de dados empresariais" },
  { icon: SendIcon, label: "Primeiro contato feito por nós" },
  { icon: CircleCheckIcon, label: "Só chegam interessados" },
  // 4º item opcional (02-copy-v3 §1): sai no mobile para a faixa não quebrar demais.
  { icon: HandIcon, label: "A decisão é sua", optional: true },
]

export function HeroSectionV3() {
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
        // Tampa: inclinada → frontal (igual à v1/v2)
        gsap.fromTo(
          lid,
          { rotateX: full ? 14 : 8, scale: full ? 0.94 : 0.97, y: 0, transformOrigin: "50% 100%", willChange: "transform" },
          {
            rotateX: 0,
            scale: 1,
            y: 0, // a tampa não se desloca: subir só ela a solta da base
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
              href={`#${ANCHORS.access}`}
              className="group/pill inline-flex h-9 items-center gap-2.5 rounded-full border border-paper-50/12 bg-paper-50/[0.04] pr-3 pl-3 text-xs font-medium text-paper-50/90 backdrop-blur-sm transition-colors duration-200 outline-none hover:border-paper-50/25 hover:bg-paper-50/[0.07] focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-paper-50 opacity-40 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-paper-50" />
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
            <Text ref={titleRef} variant="display" render={<h1 />} className="mx-auto max-w-[17ch] md:text-[5.25rem]">
              {/* Quebra do copy: "Você vende, / a gente encontra." (a 2ª linha define os 17ch). */}
              Você vende,
              <br />a gente encontra.
            </Text>
          </RevealItem>

          <RevealItem y={16} fade={false} className="mt-6 md:mt-7">
            <Text variant="lead" className="mx-auto max-w-[36rem] text-balance">
              Diga o que a sua empresa vende. A fynd faz o primeiro contato e só entrega as empresas que demonstraram
              interesse. Você assume a conversa e fecha.
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

          <RevealItem y={16} fade={false} className="mt-5">
            <p className="text-sm text-steel-300">Para PMEs B2B que querem um canal de prospecção ativa sem montar estrutura.</p>
          </RevealItem>

          {/* Respiro vertical reduzido na v3 para a borda do MacBook (Interessados) aparecer na 1ª tela em 1440×900 (09 P1.1). */}
          {/* A faixa é mais larga que a coluna de texto para os 4 itens caberem numa linha no desktop. */}
          <RevealItem y={16} fade={false} className="mt-10 lg:mt-8 lg:w-[58rem] lg:max-w-[calc(100vw-4rem)]">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase">
              {PROOFS.map(({ icon: Icon, label, optional }) => (
                <li key={label} className={cn("items-center gap-2", optional ? "hidden sm:inline-flex" : "inline-flex")}>
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
          className="relative col-span-full mt-16 w-full max-md:-mx-[6%] max-md:w-[112%] md:mx-auto md:max-w-[1080px] lg:col-span-10 lg:col-start-2 lg:mt-10"
        >
          {/* A tela é a fonte de luz: brilho largo atrás e abaixo do MacBook */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-10%] top-[8%] bottom-[-12%] -z-10 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,color-mix(in_oklch,var(--signal-400)_13%,transparent),color-mix(in_oklch,var(--navy-600)_20%,transparent)_45%,transparent_72%)] blur-2xl"
          />

          <MacBook lidRef={lidRef} label={SCREEN_LABELS_V3.hero}>
            <HeroScreenV3 play={play} />
          </MacBook>

          {/* Cards flutuantes: só em telas largas, decorativos (a informação já está na tela) */}
          <div aria-hidden="true" className="dark pointer-events-none absolute inset-0 hidden lg:block">
            {FLOATS.map(({ Card, pos, speed }, i) => (
              <motion.div
                key={i}
                className={cn("absolute", pos)}
                // Sem depender de `reduce` no render: evita divergência de hidratação. Com movimento reduzido,
                // o MotionConfig ("user") já corta o deslocamento e deixa só o fade.
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
      </SiteContainer>
    </section>
  )
}
