"use client"

// Adaptado de React Bits (reactbits.dev), MIT + Commons Clause, © David Haz
// Mudanças: sem loop, sem apagar, sem cores; disparo externo (`play`) em vez de IntersectionObserver;
// digitação determinística com o `animate` do Motion (pausa curta em vírgula e ponto);
// cursor fino que para de piscar ao terminar; texto completo em sr-only.

import { createElement, useEffect, useRef, type ElementType } from "react"
import { animate, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { usePrefersReducedMotion } from "@/components/site/platform/playback"

export interface TextTypeProps {
  text: string
  as?: ElementType
  /** Dispara a digitação. */
  play?: boolean
  /** Mostra o texto inteiro, sem animação. */
  instant?: boolean
  /** Atraso em segundos antes de começar. */
  delay?: number
  /** Duração da digitação em segundos, sem contar as pausas. Padrão 1.6. */
  duration?: number
  /** Pausa em segundos depois de vírgula e ponto. Padrão 0.06. */
  punctuationPause?: number
  showCursor?: boolean
  /** Esconde o cursor quando a digitação termina. */
  hideCursorWhenDone?: boolean
  className?: string
  cursorClassName?: string
  onComplete?: () => void
}

/** Momento (em s) em que cada caractere aparece. */
function charTimes(text: string, duration: number, pause: number) {
  const step = duration / Math.max(1, text.length)
  const times: number[] = []
  let t = 0
  for (const char of text) {
    t += step
    times.push(t)
    if (char === "," || char === ".") t += pause
  }
  return times
}

export function TextType({
  text,
  as = "span",
  play = false,
  instant = false,
  delay = 0,
  duration = 1.6,
  punctuationPause = 0.06,
  showCursor = true,
  hideCursorWhenDone = true,
  className,
  cursorClassName,
  onComplete,
}: TextTypeProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const reduce = usePrefersReducedMotion()
  const final = instant || reduce

  useEffect(() => {
    if (final || !play) return
    const el = textRef.current
    if (!el) return
    const times = charTimes(text, duration, punctuationPause)
    const total = times[times.length - 1] ?? 0
    let shown = 0
    const controls = animate(0, total, {
      duration: total,
      delay,
      ease: "linear",
      onUpdate: (t) => {
        let n = shown
        while (n < times.length && times[n] <= t + 1e-6) n++
        if (n !== shown) {
          shown = n
          el.textContent = text.slice(0, n)
        }
      },
      onComplete: () => {
        el.textContent = text
        if (hideCursorWhenDone && cursorRef.current) cursorRef.current.style.display = "none"
        onComplete?.()
      },
    })
    return () => controls.stop()
  }, [final, play, text, duration, punctuationPause, delay, hideCursorWhenDone, onComplete])

  const cursorVisible = showCursor && !(final && hideCursorWhenDone)

  return createElement(
    as,
    { className: cn("whitespace-pre-wrap", className) },
    <span className="sr-only">{text}</span>,
    <span aria-hidden="true">
      <span key={final ? "final" : "typing"} ref={textRef}>
        {final ? text : ""}
      </span>
      {cursorVisible && (
        <motion.span
          ref={cursorRef}
          className={cn("ml-px inline-block w-px translate-y-[0.1em] self-center bg-current", cursorClassName)}
          style={{ height: "1.1em" }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  )
}
