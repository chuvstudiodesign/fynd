"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ACTIVE_COMPANY, PROFILE, SCREEN_LABELS, type ScreenState } from "./data"
import { EASE_IN_OUT, EASE_OUT, useInViewState } from "./playback"
import { PlatformShell, type PlatformNav } from "./shell"
import { ConversaContent } from "./screen-conversa"
import { OportunidadesContent } from "./screen-oportunidades"
import { DetalheDrawer, DrawerFrame, DrawerOverlay } from "./screen-detalhe"
import { AbordagemContent } from "./screen-abordagem"

export type DemoStep = 0 | 1 | 2 | 3

const NAV: Record<DemoStep, PlatformNav> = {
  0: "Conversas",
  1: "Oportunidades",
  2: "Oportunidades",
  3: "Oportunidades",
}

const BREADCRUMB: Record<DemoStep, string[]> = {
  0: ["Conversas", "Novo perfil ideal"],
  1: ["Perfis ideais", PROFILE],
  2: ["Perfis ideais", PROFILE, ACTIVE_COMPANY],
  3: ["Perfis ideais", PROFILE, ACTIVE_COMPANY],
}

const SCENE_TRANSITION = { duration: 0.5, ease: EASE_IN_OUT }

/**
 * As 4 telas da demonstração num só shell, para o canvas do MacBook.
 * `step` troca a cena com crossfade (Motion `AnimatePresence`):
 * 0 Conversa (B) · 1 Oportunidades (A) · 2 Detalhe (A + drawer C) · 3 Abordagem (D).
 * Entre 1 e 2 a lista não sai: só o overlay e o drawer entram por cima.
 * `state` vale para a tela da etapa atual.
 */
export function PlatformDemo({ step, state }: { step: DemoStep; state: ScreenState }) {
  const sceneKey = step === 1 || step === 2 ? "list" : `scene-${step}`

  return (
    <PlatformShell active={NAV[step]} breadcrumb={BREADCRUMB[step]} activeProfile={step === 0 ? null : PROFILE}>
      <AnimatePresence initial={false}>
        <motion.div
          key={sceneKey}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.985 }}
          transition={SCENE_TRANSITION}
        >
          {step === 0 && <ConversaContent state={state} />}
          {(step === 1 || step === 2) && (
            <>
              <OportunidadesContent state={step === 1 ? state : "final"} />
              <AnimatePresence initial={false}>
                {step === 2 && (
                  <motion.div
                    key="drawer"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={SCENE_TRANSITION}
                  >
                    <DrawerOverlay />
                    <motion.div
                      initial={{ x: 40 }}
                      animate={{ x: 0 }}
                      exit={{ x: 40 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="absolute inset-0"
                    >
                      <DrawerFrame>
                        <DetalheDrawer state={state} />
                      </DrawerFrame>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          {step === 3 && <AbordagemContent state={state} />}
        </motion.div>
      </AnimatePresence>
    </PlatformShell>
  )
}

/**
 * A tela da etapa sem a moldura, renderizada no tamanho real (mobile e tablet, 03-design.md §3.6):
 * "poço de tela" com barra superior e o painel da etapa (B, lista A, drawer C ou D).
 * Sem `state`, a microinteração toca uma vez quando o painel entra na viewport (`amount: 0.5`).
 */
export function PlatformPanel({
  step,
  state,
  className,
}: {
  step: DemoStep
  state?: ScreenState
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const current = useInViewState(ref, state, { amount: 0.5 })

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && ref.current?.closest(".dark")) {
      console.warn("[PlatformPanel] está dentro de um `.dark`: o painel da plataforma precisa ficar fora do wrapper escuro.")
    }
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={SCREEN_LABELS[step]}
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
      <div inert aria-hidden="true" className={cn(step === 2 && "bg-card")}>
        {step === 0 && <ConversaContent state={current} layout="panel" />}
        {step === 1 && <OportunidadesContent state={current} layout="panel" />}
        {step === 2 && <DetalheDrawer state={current} layout="panel" />}
        {step === 3 && <AbordagemContent state={current} layout="panel" />}
      </div>
    </div>
  )
}
