"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { EASE_IN_OUT, useInViewState } from "@/components/site/platform/playback"
import { SCREEN_LABELS_V3, SEARCH, type ScreenState } from "./data-v3"
import { PlatformShellV3, type PlatformNavV3 } from "./shell-v3"
import { ConversaV3Content } from "./screen-conversa-v3"
import { FitV3Content } from "./screen-fit-v3"
import { ContatoV3Content } from "./screen-contato-v3"
import { InteressadosV3Content } from "./screen-interessados-v3"

/** 0 Conversa · 1 Empresas com fit · 2 Primeiro contato · 3 Interessados. */
export type DemoStepV3 = 0 | 1 | 2 | 3

const NAV: Record<DemoStepV3, PlatformNavV3 | null> = {
  0: null,
  1: "Empresas com fit",
  2: "Primeiro contato",
  3: "Interessados",
}

const BREADCRUMB: Record<DemoStepV3, string[]> = {
  0: ["Buscas", "Nova busca"],
  1: ["Buscas", SEARCH],
  2: ["Buscas", SEARCH],
  3: ["Buscas", SEARCH],
}

const SCENE_TRANSITION = { duration: 0.5, ease: EASE_IN_OUT }

function StepContent({ step, state, layout }: { step: DemoStepV3; state: ScreenState; layout?: "canvas" | "panel" }) {
  if (step === 0) return <ConversaV3Content state={state} layout={layout} />
  if (step === 1) return <FitV3Content state={state} layout={layout} />
  if (step === 2) return <ContatoV3Content state={state} layout={layout} />
  return <InteressadosV3Content state={state} layout={layout} toast={layout !== "panel"} />
}

/**
 * As 4 telas da demonstração v3 num só shell, para o canvas do MacBook.
 * `step` troca a cena com crossfade (Motion `AnimatePresence`); `state` vale para a tela da etapa atual,
 * com a mesma semântica da v1: `idle` (escondido, pronto para tocar), `play` (toca uma vez), `final`.
 */
export function PlatformDemoV3({ step, state }: { step: DemoStepV3; state: ScreenState }) {
  return (
    <PlatformShellV3 active={NAV[step]} breadcrumb={BREADCRUMB[step]} activeSearch={step === 0 ? null : SEARCH}>
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
    </PlatformShellV3>
  )
}

/**
 * A tela da etapa sem a moldura, no tamanho real (mobile e tablet): "poço de tela" com barra superior.
 * Sem `state`, a microinteração toca uma vez quando o painel entra na viewport (`amount: 0.5`).
 */
export function PlatformPanelV3({
  step,
  state,
  className,
}: {
  step: DemoStepV3
  state?: ScreenState
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const current = useInViewState(ref, state, { amount: 0.5 })

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && ref.current?.closest(".dark")) {
      console.warn("[PlatformPanelV3] está dentro de um `.dark`: o painel da plataforma precisa ficar fora do wrapper escuro.")
    }
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={SCREEN_LABELS_V3[step]}
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

/** Tela 4 (Interessados) para o hero: cards em cascata e o selo ciano acendendo quando `play` for true. */
export function HeroScreenV3({ play }: { play: boolean }) {
  return (
    <PlatformShellV3 active="Interessados" breadcrumb={["Buscas", SEARCH]}>
      <InteressadosV3Content state={play ? "play" : "idle"} />
    </PlatformShellV3>
  )
}
