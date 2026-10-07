"use client"

import { useRef } from "react"
import { stagger, type AnimationSequence } from "motion/react"
import { CheckIcon, MessageSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { CompanyAvatar } from "@/components/company-avatar"
import { CountUp } from "@/components/site/reactbits/count-up"
import {
  EASE_OUT,
  pre,
  useEffectiveState,
  useInViewState,
  useReplayKey,
  useScreenSequence,
} from "@/components/site/platform/playback"
import { ACTIVE_V4, ATTACHMENTS, FUNNEL_V4, type ScreenState } from "./data-v4"
import { AttachmentChip, FyndAvatar, InterestSeal, sealSequence } from "./parts-v4"

export interface MiniV4Props {
  /** Estado controlado. Sem ele, o recorte toca sozinho ao entrar na viewport. */
  state?: ScreenState
  /** Atraso (s) depois de entrar na viewport, para esperar a entrada do card. Padrão 0.6. */
  delay?: number
  className?: string
}

/**
 * Poço de tela claro dos recortes (igual ao da v3). É decorativo (`aria-hidden`, `inert`):
 * o `aria-label` de cada recorte está em `MINI_LABELS_V4`, para quem monta a seção.
 */
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

/** Recorte da tela 1: o balão da Camila, os dois anexos e a resposta da fynd em uma linha. Sem ciano. */
export function MiniContaV4({ state, delay = 0.6, className }: MiniV4Props) {
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
      ["[data-a=attach]", { opacity: [0, 1], scale: [0.96, 1], y: [4, 0] }, { at: 0.35, duration: 0.45, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=reply]", { opacity: [0, 1], y: [6, 0] }, { at: 0.75, duration: 0.5, ease: EASE_OUT }],
    ]
    return seq
  })
  return (
    <div ref={scope} className="flex flex-col gap-3">
      <div className="flex flex-col items-end gap-1.5">
        <Bubble variant="default" align="end" data-a="bubble" style={pre(hidden, { y: 8 })} className="max-w-[92%]">
          <BubbleContent className="text-sm">Vendo embalagens flexíveis para alimentos e cosméticos.</BubbleContent>
        </Bubble>
        <div className="flex max-w-full flex-wrap justify-end gap-1.5">
          {ATTACHMENTS.map((a) => (
            <AttachmentChip
              key={a.name}
              data-a="attach"
              style={pre(hidden, { y: 4, scale: 0.96 })}
              kind={a.kind}
              name={a.name}
              size="sm"
            />
          ))}
        </div>
      </div>
      <div data-a="reply" style={pre(hidden, { y: 6 })} className="flex items-start gap-2">
        <FyndAvatar className="size-7 [&_svg]:h-2" />
        <span className="pt-1 text-sm leading-snug">Entendi. Vou buscar indústrias de alimentos e cosméticos.</span>
      </div>
    </div>
  )
}

/* ---------- M2 · A gente encontra ---------- */

/**
 * Recorte do funil sem o meio: 4.860 com o seu perfil → 12 interessadas (03-design-v4 §3.2).
 * Sem barras proporcionais (12 de 4.860 convidaria a ler uma taxa) e sem ciano.
 */
export function MiniEncontraV4({ state, delay = 0.6, className }: MiniV4Props) {
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
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=working]", { opacity: [0, 1], y: [4, 0] }, { at: 0.5, duration: 0.45, ease: EASE_OUT }],
      // Os três pontos piscam em sequência duas vezes e param acesos (nada em loop)
      ["[data-a=dot]", { opacity: [0.25, 1, 0.25, 1] }, { at: 0.7, duration: 1.2, delay: stagger(0.12) }],
      ["[data-a=done]", { opacity: [0, 1], y: [4, 0] }, { at: 1.3, duration: 0.5, ease: EASE_OUT }],
    ]
    return seq
  })
  const total = FUNNEL_V4.profile.toLocaleString("pt-BR")
  return (
    <div ref={scope} className="flex flex-col rounded-lg border border-border bg-card p-3.5">
      <span className="font-mono text-[11px] font-medium tracking-label text-muted-foreground uppercase">Com o seu perfil</span>
      <span className="mt-1 grid font-heading text-3xl leading-tight font-light tracking-display tabular-nums">
        <span aria-hidden="true" className="invisible [grid-area:1/1]">
          {total}
        </span>
        <span className="[grid-area:1/1]">
          <CountUp to={FUNNEL_V4.profile} start={playing} instant={state === "final"} duration={1.1} />
        </span>
      </span>
      <div
        data-a="working"
        style={pre(hidden, { y: 4 })}
        className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-sm text-muted-foreground"
      >
        <span>Abordando e qualificando</span>
        <span aria-hidden="true" className="flex items-center gap-1">
          <span data-a="dot" className="size-1.5 rounded-full bg-steel-400" />
          <span data-a="dot" className="size-1.5 rounded-full bg-steel-400" />
          <span data-a="dot" className="size-1.5 rounded-full bg-steel-400" />
        </span>
      </div>
      <div
        data-a="done"
        style={pre(hidden, { y: 4 })}
        className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-sm font-semibold text-foreground"
      >
        <CheckIcon aria-hidden="true" className="size-4 text-navy-600" strokeWidth={2.25} />
        <span className="flex-1">Interessadas</span>
        <span className="font-mono tabular-nums">{FUNNEL_V4.interested}</span>
      </div>
    </div>
  )
}

/* ---------- M3 · Você fecha ---------- */

/** Recorte da tela 3: o card da Serra Azul, o selo "Interessada" (o ciano da dobra), aderência e "Assumir conversa". */
export function MiniFechaV4({ state, delay = 0.6, className }: MiniV4Props) {
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
      ["[data-a=line]", { opacity: [0, 1], y: [6, 0] }, { at: 0, duration: 0.6, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=action]", { opacity: [0, 1], y: [4, 0] }, { at: 0.35, duration: 0.5, ease: EASE_OUT }],
      ...sealSequence(0.7),
    ]
    return seq
  })
  const s = ACTIVE_V4
  return (
    <div ref={scope} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
      <div className="flex items-center gap-2.5">
        <CompanyAvatar name={s.company} />
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{s.company}</span>
          <span className="truncate text-xs text-muted-foreground">
            {s.contact} · {s.role}
          </span>
        </span>
      </div>
      <InterestSeal label="Interessada" signal hidden={hidden} size="sm" className="self-start" />
      <dl className="flex flex-col gap-1.5 text-sm">
        <div data-a="line" style={pre(hidden, { y: 6 })} className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">{s.status}</dd>
        </div>
        <div data-a="line" style={pre(hidden, { y: 6 })} className="flex items-baseline justify-between gap-3">
          <dt className="text-muted-foreground">Aderência</dt>
          <dd className="font-mono font-semibold tabular-nums">{s.adherence}%</dd>
        </div>
      </dl>
      <div data-a="action" style={pre(hidden, { y: 4 })}>
        <Button size="xs" tabIndex={-1}>
          <MessageSquareIcon />
          Assumir conversa
        </Button>
      </div>
    </div>
  )
}
