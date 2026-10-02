"use client"

import { useRef } from "react"
import { stagger, type AnimationSequence } from "motion/react"
import { MessageSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { CompanyAvatar } from "@/components/company-avatar"
import { CountUp } from "@/components/site/reactbits/count-up"
import { FyndAvatar } from "@/components/site/platform/screen-conversa"
import {
  EASE_OUT,
  pre,
  useEffectiveState,
  useInViewState,
  useReplayKey,
  useScreenSequence,
} from "@/components/site/platform/playback"
import { ACTIVE, FUNNEL, INTERESTED, type ScreenState } from "./data-v3"
import { InterestSeal, sealSequence } from "./parts-v3"

export interface MiniV3Props {
  /** Estado controlado. Sem ele, o recorte toca sozinho ao entrar na viewport. */
  state?: ScreenState
  /** Atraso (s) depois de entrar na viewport, para esperar a entrada do card. Padrão 0.6. */
  delay?: number
  className?: string
}

/** Poço de tela claro dos recortes (03-design.md §2.5), igual ao da v1. */
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

/* ---------- M1 · Você conta ---------- */

const M1_CHIPS = ["Alimentos", "Cosméticos", "Sudeste"]

/** Recorte da tela 1: a Camila diz o que vende e a fynd responde com três chips (neutros). */
export function MiniContaV3({ state, delay = 0.6, className }: MiniV3Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniContaBody key={key} state={current} />
    </Well>
  )
}

function MiniContaBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=bubble]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.6, ease: EASE_OUT }],
      ["[data-a=reply]", { opacity: [0, 1], y: [6, 0] }, { at: 0.45, duration: 0.5, ease: EASE_OUT }],
      ["[data-a=chip]", { opacity: [0, 1], scale: [0.96, 1] }, { at: 0.7, duration: 0.6, delay: stagger(0.06), ease: EASE_OUT }],
    ]
    return seq
  })
  return (
    <div ref={scope} className="flex flex-col gap-3">
      <Bubble variant="default" align="end" data-a="bubble" style={pre(hidden, { y: 8 })} className="max-w-[92%]">
        <BubbleContent className="text-sm">Vendo embalagens flexíveis para alimentos e cosméticos.</BubbleContent>
      </Bubble>
      <div className="flex items-start gap-2">
        <FyndAvatar className="size-7 [&_svg]:h-2" />
        <div className="flex min-w-0 flex-col gap-2">
          <span data-a="reply" style={pre(hidden, { y: 6 })} className="pt-0.5 text-sm leading-snug">
            Entendi. Vou buscar indústrias com fit:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {M1_CHIPS.map((c) => (
              <Badge key={c} variant="secondary" data-a="chip" style={pre(hidden, { scale: 0.96 })} className="h-6 px-2.5">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- M2 · A gente encontra ---------- */

const M2_ROWS = [
  { label: "Empresas com fit", value: FUNNEL.fit },
  { label: "Contatadas", value: FUNNEL.contacted },
  { label: "Interessadas", value: FUNNEL.interested },
]

/** Recorte do funil: três barras horizontais neutras (148 → 60 → 12) que preenchem em degraus. */
export function MiniEncontraV3({ state, delay = 0.6, className }: MiniV3Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniEncontraBody key={key} state={current} />
    </Well>
  )
}

function MiniEncontraBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const playing = state === "play"
  const at = (i: number) => i * 0.25
  const scope = useScreenSequence<HTMLUListElement>(state, () =>
    M2_ROWS.map((r, i) => [
      `[data-a=bar-${i}]`,
      { scaleX: [0, r.value / FUNNEL.fit] },
      { at: at(i), duration: 0.8, ease: EASE_OUT },
    ])
  )
  return (
    <ul ref={scope} className="flex flex-col gap-3.5 rounded-lg border border-border bg-card p-3.5">
      {M2_ROWS.map((r, i) => {
        const last = i === M2_ROWS.length - 1
        return (
          <li key={r.label} className="flex flex-col gap-1.5">
            <span className="flex items-baseline justify-between gap-3 text-sm">
              <span className={cn(last ? "font-semibold text-foreground" : "text-foreground/85")}>{r.label}</span>
              <span className={cn("font-mono font-medium tabular-nums", last ? "text-foreground" : "text-muted-foreground")}>
                <CountUp to={r.value} start={playing} instant={state === "final"} delay={at(i)} />
              </span>
            </span>
            <span aria-hidden="true" className="relative block h-1.5 overflow-hidden rounded-full bg-steel-500/20">
              <span
                data-a={`bar-${i}`}
                className={cn("absolute inset-0 origin-left rounded-full", last ? "bg-navy-600" : "bg-steel-500")}
                style={{ transform: `scaleX(${hidden ? 0 : r.value / FUNNEL.fit})` }}
              />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- M3 · Você fecha ---------- */

const SERRA = INTERESTED[0]

/** Recorte da tela 4: o card da Serra Azul, o selo "Demonstrou interesse" (o ciano da dobra) e "Assumir conversa". */
export function MiniFechaV3({ state, delay = 0.6, className }: MiniV3Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [current, key] = useMiniState(ref, state, delay)
  return (
    <Well ref={ref} className={className}>
      <MiniFechaBody key={key} state={current} />
    </Well>
  )
}

function MiniFechaBody({ state }: { state: ScreenState }) {
  const hidden = state !== "final"
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=quote]", { opacity: [0, 1], y: [6, 0] }, { at: 0, duration: 0.6, ease: EASE_OUT }],
      ["[data-a=action]", { opacity: [0, 1], y: [4, 0] }, { at: 0.25, duration: 0.5, ease: EASE_OUT }],
      ...sealSequence(0.6),
    ]
    return seq
  })
  return (
    <div ref={scope} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
      <div className="flex items-center gap-2.5">
        <CompanyAvatar name={ACTIVE} />
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{ACTIVE}</span>
          <span className="truncate text-xs text-muted-foreground">{SERRA.city}</span>
        </span>
      </div>
      <InterestSeal signal hidden={hidden} size="sm" className="self-start" />
      <p
        data-a="quote"
        style={pre(hidden, { y: 6 })}
        className="border-l-2 border-navy-200 pl-3 text-sm leading-snug text-foreground"
      >
        &ldquo;Conseguem enviar amostras de pouch para biscoito?&rdquo;
      </p>
      <div data-a="action" style={pre(hidden, { y: 4 })}>
        <Button size="xs" tabIndex={-1}>
          <MessageSquareIcon />
          Assumir conversa
        </Button>
      </div>
    </div>
  )
}
