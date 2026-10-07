"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { usePrefersReducedMotion } from "@/components/site/platform/playback"

/**
 * Partes de fundo do hero, iguais às da v4 (03-design-v5 §10: `Backdrop`, `LitDot` e `LightPath` sem mudança).
 * Regra de cor: o ponto aceso é o único ciano do fundo; a trilha é steel.
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

export function LightPath() {
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
export function LitDot({
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
      // Sem espaço lateral (mobile): à esquerda do início da última linha do título.
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
export function Backdrop({ children }: { children?: React.ReactNode }) {
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
/* Linha de zero setup (hero) e linha mono do encerramento             */
/* ------------------------------------------------------------------ */

/** Itens padrão: a linha de zero setup do hero (02-copy-v5 §1). */
const ZERO_SETUP_ITEMS = ["Zero setup.", "Você explica o que vende. A fynd cuida do restante."] as const

/**
 * Linha de itens separados por um divisor, sem caixa e sem ciano (03-design-v5 §7.1 e §10).
 * O primeiro item é o destaque. `items` deixa o encerramento usar a mesma linha com outro texto.
 *
 * Regra da marca: "fynd" nunca entra em `uppercase` por CSS. Por isso a caixa alta mono só é aplicada
 * quando nenhum item contém a palavra; com ela (caso do hero), a linha sai em caixa normal.
 * No mobile o divisor some e a linha quebra. Renderize dentro de um wrapper `.dark`.
 */
export function ZeroSetupStrip({
  items = ZERO_SETUP_ITEMS,
  icon,
  align = "center",
  size = "sm",
  className,
}: {
  items?: readonly string[]
  /** Ícone decorativo antes do primeiro item (neutro, nunca ciano). */
  icon?: React.ReactNode
  align?: "center" | "start"
  /** `lg` no hero: maior, com o primeiro item em semibold e os demais mais claros. */
  size?: "sm" | "lg"
  className?: string
}) {
  const lg = size === "lg"
  const caps = !items.some((item) => /fynd/i.test(item))
  return (
    <p
      className={[
        "flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium max-sm:flex-col",
        caps
          ? ["font-mono tracking-label uppercase", lg ? "text-xs md:text-sm" : "text-[0.6875rem]"].join(" ")
          : lg
            ? "text-sm md:text-base"
            : "text-sm",
        align === "center" ? "justify-center text-center" : "justify-start text-left max-sm:items-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, i) => (
        <span key={item} className="contents">
          {i > 0 && <span aria-hidden="true" className="hidden h-3.5 w-px bg-paper-50/15 sm:block" />}
          <span
            className={
              i === 0
                ? ["inline-flex items-center gap-2 text-paper-50", lg && "font-semibold"].filter(Boolean).join(" ")
                : lg
                  ? "text-paper-50/80"
                  : "text-steel-300"
            }
          >
            {i === 0 && icon}
            {item}
          </span>
        </span>
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Ponto de sinal (camada "Resultado" da seção A diferença)            */
/* ------------------------------------------------------------------ */

/**
 * Ponto ciano de 8px com um anel de pulso que toca uma vez (03-design-v5 §5 e §9). Parente pequeno do
 * `LitDot`. Entra pelas variantes do grupo (`hidden` → `show`), `delay` segundos depois do item que o contém.
 * Com movimento reduzido, o ponto já está aceso e o anel não existe.
 */
export function SignalDot({ delay = 0, className }: { delay?: number; className?: string }) {
  // Seguro para hidratação: vale `false` no servidor e na hidratação, e troca logo depois.
  const reduce = usePrefersReducedMotion()
  return (
    <span aria-hidden="true" className={["relative inline-flex size-2 shrink-0", className].filter(Boolean).join(" ")}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full border border-signal"
          style={{ opacity: 0 }}
          variants={{
            hidden: { opacity: 0, scale: 1 },
            show: {
              opacity: [0, 0.7, 0],
              scale: [1, 1, 2.6],
              transition: { duration: 0.9, delay: delay + 0.1, times: [0, 0.05, 1], ease: EASE_OUT },
            },
          }}
        />
      )}
      <motion.span
        data-reveal=""
        className="relative size-2 rounded-full bg-signal"
        variants={{
          hidden: { opacity: 0, scale: 0.6 },
          show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay, ease: EASE_OUT } },
        }}
      />
    </span>
  )
}
