"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { EASE_IN_OUT, useInViewState } from "@/components/site/platform/playback"
import { PRODUCT, SCREEN_LABELS_V4, type ScreenState } from "./data-v4"
import { PlatformShellV4, type PlatformNavV4 } from "./shell-v4"
import { ProdutoV4Content } from "./screen-produto-v4"
import { FitV4Content } from "./screen-fit-v4"
import { InteressadosV4Content } from "./screen-interessados-v4"

/** 0 Seu produto · 1 Fit · 2 Interessados. */
export type DemoStepV4 = 0 | 1 | 2

const NAV: Record<DemoStepV4, PlatformNavV4> = {
  0: "Seu produto",
  1: "Fit",
  2: "Interessados",
}

const BREADCRUMB: Record<DemoStepV4, string[]> = {
  0: ["Seu produto", PRODUCT],
  1: [PRODUCT, "Fit"],
  2: [PRODUCT, "Interessados"],
}

const SCENE_TRANSITION = { duration: 0.5, ease: EASE_IN_OUT }

function StepContent({ step, state, layout }: { step: DemoStepV4; state: ScreenState; layout?: "canvas" | "panel" }) {
  if (step === 0) return <ProdutoV4Content state={state} layout={layout} />
  if (step === 1) return <FitV4Content state={state} layout={layout} />
  return <InteressadosV4Content state={state} layout={layout} />
}

/**
 * As 3 telas da demonstração v4 num só shell, para o canvas do MacBook (1280×800).
 * `step` troca a cena com crossfade (Motion `AnimatePresence`); `state` vale para a tela da etapa atual:
 * `idle` (escondido, pronto para tocar), `play` (toca uma vez), `final`. Mesma semântica da v3.
 */
export function PlatformDemoV4({ step, state }: { step: DemoStepV4; state: ScreenState }) {
  return (
    <PlatformShellV4 active={NAV[step]} breadcrumb={BREADCRUMB[step]}>
      <AnimatePresence initial={false}>
        <motion.div
          key={`scene-${step}`}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.985 }}
          transition={SCENE_TRANSITION}
        >
          <StepContent step={step} state={state} />
        </motion.div>
      </AnimatePresence>
    </PlatformShellV4>
  )
}

/**
 * A tela da etapa sem a moldura, no tamanho real (mobile e tablet): "poço de tela" com barra superior.
 * Sem `state`, a microinteração toca uma vez quando o painel entra na viewport (`amount: 0.5`).
 * Já traz `role="img"` com o aria-label da etapa.
 */
export function PlatformPanelV4({
  step,
  state,
  className,
}: {
  step: DemoStepV4
  state?: ScreenState
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const current = useInViewState(ref, state, { amount: 0.5 })

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && ref.current?.closest(".dark")) {
      console.warn("[PlatformPanelV4] está dentro de um `.dark`: o painel da plataforma precisa ficar fora do wrapper escuro.")
    }
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={SCREEN_LABELS_V4[step]}
      data-slot="platform-panel"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-paper-100 font-sans text-foreground shadow-lg",
        className
      )}
    >
      <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-border bg-paper-200 px-3">
        <span className="size-2 rounded-full bg-paper-400" />
        <span className="size-2 rounded-full bg-paper-400" />
        <span className="size-2 rounded-full bg-paper-400" />
      </div>
      <div inert aria-hidden="true">
        <StepContent step={step} state={current} layout="panel" />
      </div>
    </div>
  )
}

/** Tela 3 (Interessados) para o hero: cards em cascata e o selo ciano acendendo quando `play` for true. Sem detalhe. */
export function HeroScreenV4({ play }: { play: boolean }) {
  return (
    <PlatformShellV4 active="Interessados" breadcrumb={BREADCRUMB[2]}>
      <InteressadosV4Content state={play ? "play" : "idle"} />
    </PlatformShellV4>
  )
}
