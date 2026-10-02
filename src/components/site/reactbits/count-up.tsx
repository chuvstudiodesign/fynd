"use client"

// Adaptado de React Bits (reactbits.dev), MIT + Commons Clause, © David Haz
// Mudanças: formatação pt-BR, disparo externo (`start`), `instant` para o estado final,
// tween determinístico (`animate` do Motion, sem spring) e escrita direta em textContent.

import { useEffect, useRef } from "react"
import { animate } from "motion/react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/components/site/platform/playback"

export interface CountUpProps {
  to: number
  from?: number
  /** Segundos. Padrão 0.8 (04-motion.md). */
  duration?: number
  /** Atraso em segundos depois de `start` virar verdadeiro. */
  delay?: number
  /** Dispara a contagem. */
  start?: boolean
  /** Mostra o valor final, sem animação (estado final / movimento reduzido). */
  instant?: boolean
  /** Opções do `Intl.NumberFormat("pt-BR")`. */
  format?: Intl.NumberFormatOptions
  className?: string
  onEnd?: () => void
}

export function CountUp({
  to,
  from = 0,
  duration = 0.8,
  delay = 0,
  start = true,
  instant = false,
  format,
  className,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = usePrefersReducedMotion()
  const final = instant || reduce
  const fmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0, ...format })
  const formatKey = JSON.stringify(format ?? {})

  useEffect(() => {
    if (final || !start) return
    const el = ref.current
    if (!el) return
    const formatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0, ...JSON.parse(formatKey) })
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = formatter.format(Math.round(v))
      },
      onComplete: onEnd,
    })
    return () => controls.stop()
  }, [final, start, from, to, duration, delay, formatKey, onEnd])

  return (
    <span
      key={final ? "final" : "count"}
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {fmt.format(final ? to : from)}
    </span>
  )
}
