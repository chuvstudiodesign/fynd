"use client"

import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore, type CSSProperties } from "react"
import { useAnimate, useInView, type AnimationPlaybackControls, type AnimationSequence } from "motion/react"
import type { ScreenState } from "./data"

/* Tokens de movimento (04-motion.md §2) */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReduce(callback: () => void) {
  const mql = window.matchMedia(REDUCE_QUERY)
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

/**
 * `prefers-reduced-motion` seguro para hidratação: no servidor e na hidratação vale `false`,
 * e o React troca para o valor real logo depois, sem divergência de markup.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  )
}

/** Estado efetivo: com movimento reduzido, tudo vai direto para `final`. */
export function useEffectiveState(state: ScreenState): ScreenState {
  const reduce = usePrefersReducedMotion()
  return reduce ? "final" : state
}

/**
 * Chave de remontagem. Voltar para `idle` (ou tocar de novo depois de `final`) remonta o corpo da tela,
 * para que os estilos iniciais escondidos voltem a valer.
 */
export function useReplayKey(state: ScreenState) {
  const [track, setTrack] = useState({ prev: state, key: 0 })
  if (track.prev !== state) {
    const replay = state === "idle" || (state === "play" && track.prev === "final")
    setTrack({ prev: state, key: track.key + (replay ? 1 : 0) })
  }
  return track.key
}

/**
 * Toca uma sequência do Motion (`useAnimate`) quando `state` é `play`.
 * Ao sair de `play`, a sequência é completada (nunca fica congelada no meio).
 */
export function useScreenSequence<T extends Element = HTMLDivElement>(
  state: ScreenState,
  build: () => AnimationSequence
) {
  const [scope, animate] = useAnimate<T>()
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const getSequence = useEffectEvent(build)

  useEffect(() => {
    if (state !== "play") return
    const sequence = getSequence()
    if (sequence.length === 0) return
    controls.current = animate(sequence)
    return () => {
      controls.current?.complete()
      controls.current = null
    }
  }, [state, animate])

  return scope
}

/** Executa callbacks com atraso (em segundos) enquanto `active` for verdadeiro. */
export function useTimeline(active: boolean, steps: [at: number, run: () => void][]) {
  const run = useEffectEvent((index: number) => steps[index]?.[1]())
  const times = steps.map(([at]) => at).join(",")
  useEffect(() => {
    if (!active) return
    const ids = times.split(",").map((at, index) => window.setTimeout(() => run(index), Number(at) * 1000))
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [active, times])
}

/**
 * Estado para componentes que se disparam sozinhos ao entrar na viewport (mini-UIs e painéis mobile).
 * Se `state` vier de fora, ele manda.
 */
export function useInViewState(
  ref: React.RefObject<Element | null>,
  state: ScreenState | undefined,
  { delay = 0, amount = 0.5 }: { delay?: number; amount?: number } = {}
): ScreenState {
  const inView = useInView(ref, { once: true, amount })
  const [delayed, setDelayed] = useState(false)
  useEffect(() => {
    if (!inView || delay <= 0) return
    const id = window.setTimeout(() => setDelayed(true), delay * 1000)
    return () => window.clearTimeout(id)
  }, [inView, delay])
  if (state) return state
  const started = delay > 0 ? delayed : inView
  return started ? "play" : "idle"
}

/** Estilo inicial escondido (aplicado só antes do estado final). */
export function pre(
  hidden: boolean,
  { y = 0, x = 0, scale, opacity = 0 }: { y?: number; x?: number; scale?: number; opacity?: number } = {}
): CSSProperties | undefined {
  if (!hidden) return undefined
  const transforms = [
    x ? `translateX(${x}px)` : "",
    y ? `translateY(${y}px)` : "",
    scale !== undefined ? `scale(${scale})` : "",
  ]
    .filter(Boolean)
    .join(" ")
  return { opacity, ...(transforms ? { transform: transforms } : {}) }
}
