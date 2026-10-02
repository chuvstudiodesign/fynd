"use client"

import { useRef, useState } from "react"
import { stagger, type AnimationSequence } from "motion/react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { OpportunityCard } from "@/components/opportunity-card"
import { CopyButton } from "@/components/site/cult/copy-button"
import { CountUp } from "@/components/site/reactbits/count-up"
import { EMAIL_SUBJECT, OPPORTUNITIES, type ScreenState } from "./data"
import { EASE_OUT, pre, useEffectiveState, useInViewState, useReplayKey, useScreenSequence, useTimeline } from "./playback"
import { HighlightParagraph } from "./screen-abordagem"

export interface MiniProps {
  /** Estado controlado. Sem ele, o recorte toca sozinho ao entrar na viewport. */
  state?: ScreenState
  /** Atraso (s) depois de entrar na viewport, para esperar a entrada do card. Padrão 0.6. */
  delay?: number
  className?: string
}

/** Poço de tela claro dos recortes (03-design.md §2.5). */
function Well({
  children,
  className,
  ref,
}: {
  children: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      inert
      aria-hidden="true"
      className={cn("overflow-hidden rounded-lg border border-border bg-paper-100 p-4 font-sans text-foreground", className)}
    >
      {children}
    </div>
  )
}

function useMiniState(ref: React.RefObject<HTMLDivElement | null>, state: ScreenState | undefined, delay: number) {
  const raw = useInViewState(ref, state, { delay, amount: 0.5 })
  const effective = useEffectiveState(raw)
  const key = useReplayKey(effective)
  return [effective, key] as const
}

/* ---------- E1 · Descreva ---------- */

const E1_CHIPS = ["Alimentos", "Sudeste", "200 a 500"]

/** Recorte da tela B: a mensagem curta da Camila e três chips. */
export function MiniConversa({ state, delay = 0.6, className }: MiniProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniConversaBody key={key} state={current} />
    </Well>
  )
}

function MiniConversaBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=bubble]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.6, ease: EASE_OUT }],
      ["[data-a=chip]", { opacity: [0, 1], scale: [0.96, 1] }, { at: 0.35, duration: 0.6, delay: stagger(0.06), ease: EASE_OUT }],
    ]
    return seq
  })
  return (
    <div ref={scope} className="flex flex-col gap-3">
      <Bubble variant="default" align="end" data-a="bubble" style={pre(hidden, { y: 8 })} className="max-w-[92%]">
        <BubbleContent className="text-sm">
          Indústrias de alimentos e cosméticos no Sudeste, 200 a 500 pessoas.
        </BubbleContent>
      </Bubble>
      <div className="flex flex-wrap gap-1.5">
        {E1_CHIPS.map((c) => (
          <Badge key={c} variant="secondary" data-a="chip" style={pre(hidden, { scale: 0.96 })} className="h-6 px-2.5">
            {c}
          </Badge>
        ))}
      </div>
    </div>
  )
}

/* ---------- E2 · Receba ---------- */

const TOP3 = OPPORTUNITIES.slice(0, 3)

/** Recorte da tela A: os 3 primeiros cards, com Serra Azul ativa. */
export function MiniLista({ state, delay = 0.6, className }: MiniProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniListaBody key={key} state={current} />
    </Well>
  )
}

function MiniListaBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const playing = state === "play"
  const [lit, setLit] = useState(false)
  const litAt = 0.12 + 0.8

  useTimeline(playing, [[litAt, () => setLit(true)]])

  const scope = useScreenSequence<HTMLUListElement>(state, () => {
    const seq: AnimationSequence = TOP3.map((o, i) => [
      `[data-card="${o.company}"] [data-slot=opportunity-card-bar]`,
      { scaleX: [0, o.fit / 100] },
      { at: i * 0.06, duration: 0.8, ease: EASE_OUT },
    ])
    seq.push([
      `[data-card="${TOP3[0].company}"] [data-slot=opportunity-card-signal]`,
      { scaleY: [0, 1], opacity: [0, 1] },
      { at: litAt, duration: 0.45, ease: EASE_OUT },
    ])
    return seq
  })

  return (
    <ul ref={scope} className="flex flex-col gap-2">
      {TOP3.map((o, i) => (
        <li key={o.company} data-card={o.company}>
          <OpportunityCard
            tabIndex={-1}
            company={o.company}
            meta={o.meta}
            fit={o.fit}
            active={i === 0 && (state === "final" || lit)}
            barScale={hidden ? 0 : undefined}
            className="gap-3 px-4 py-2.5"
            fitLabel={
              <>
                <CountUp to={o.fit} start={playing} instant={state === "final"} delay={i * 0.06} />%
              </>
            }
          />
        </li>
      ))}
    </ul>
  )
}

/* ---------- E3 · Aborde ---------- */

/** Recorte da tela D: assunto, a frase com o ponto de conexão e o botão Copiar. */
export function MiniAbordagem({ state, delay = 0.6, className }: MiniProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniAbordagemBody key={key} state={current} />
    </Well>
  )
}

function MiniAbordagemBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=mark-bg]", { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { at: 0, duration: 0.6, ease: EASE_OUT }],
    ]
    return seq
  })
  return (
    <div ref={scope} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
      <div className="flex items-baseline gap-2 border-b border-border pb-2.5 text-[13px]">
        <span className="shrink-0 text-muted-foreground">Assunto</span>
        <span className="min-w-0 font-semibold">{EMAIL_SUBJECT}</span>
      </div>
      {/* Tom neutro: o ciano desta dobra é só a barra do Serra Azul na MiniLista (03-design §3). */}
      <HighlightParagraph
        tone="neutral"
        className="text-sm leading-relaxed"
        hidden={hidden}
        before="Vi que a Serra Azul "
        mark="abriu uma unidade em Uberlândia neste ano"
        after="."
      />
      <div>
        <CopyButton value="" notify={false} tabIndex={-1} />
      </div>
    </div>
  )
}
