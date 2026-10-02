"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon, CheckIcon, ChevronRightIcon, ClockIcon, InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CompanyAvatar } from "@/components/company-avatar"
import { CountUp } from "@/components/site/reactbits/count-up"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import {
  ACTIVE,
  CONTACT_ROWS,
  CONTACT_STATUS_LABEL,
  CONTACT_TABS,
  FUNNEL,
  SEARCH,
  SERRA_TIMELINE,
  type ContactStatus,
  type ScreenState,
} from "./data-v3"
import { InterestSeal, SectionLabel, sealSequence } from "./parts-v3"

const STAGES = [
  { label: "Contatadas", value: FUNNEL.contacted },
  { label: "Responderam", value: FUNNEL.replied },
  { label: "Interessadas", value: FUNNEL.interested, highlight: true },
] as const

/* Tempos (s). O funil preenche em degraus; a linha do tempo acende item a item
   e, quando chega em "Demonstrou interesse", o selo da Serra Azul na lista acende (o ciano da tela). */
const T = {
  blocks: 0.15,
  fill: (k: number) => 0.35 + k * 0.32,
  facts: 1.35,
  rows: 0.75,
  panel: 0.95,
  item: (i: number) => 1.35 + i * 0.42,
  foot: 1.7,
}
const SEAL_AT = T.item(SERRA_TIMELINE.length - 1) + 0.15

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 3 (primeiro contato: funil e linha do tempo), sem o shell. */
export function ContatoV3Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <ContatoV3Body key={key} state={state} layout={layout} />
}

function ContatoV3Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"
  const rows = canvas ? CONTACT_ROWS : CONTACT_ROWS.slice(0, 3)

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=block]", { opacity: [0, 1], y: [8, 0] }, { at: T.blocks, duration: 0.6, delay: stagger(0.1), ease: EASE_OUT }],
    ]
    STAGES.forEach((s, k) => {
      seq.push([`[data-a=fill-${k}]`, { scaleX: [0, s.value / FUNNEL.contacted] }, { at: T.fill(k), duration: 0.8, ease: EASE_OUT }])
      if (k > 0) seq.push([`[data-a=step-${k}]`, { opacity: [0, 1], x: [-4, 0] }, { at: T.fill(k) - 0.1, duration: 0.3, ease: EASE_OUT }])
    })
    seq.push(["[data-a=facts]", { opacity: [0, 1] }, { at: T.facts, duration: 0.4, ease: EASE_OUT }])
    seq.push(["[data-a=row]", { opacity: [0, 1], y: [6, 0] }, { at: T.rows, duration: 0.5, delay: stagger(0.06), ease: EASE_OUT }])
    seq.push(["[data-a=panel]", { opacity: [0, 1], y: [8, 0] }, { at: T.panel, duration: 0.6, ease: EASE_OUT }])
    SERRA_TIMELINE.forEach((_, i) => {
      const at = T.item(i)
      seq.push([`[data-a=tl-dot-${i}]`, { opacity: [0, 1], scale: [0.3, 1] }, { at, duration: 0.35, ease: EASE_OUT }])
      seq.push([`[data-a=tl-text-${i}]`, { opacity: [0.35, 1], x: [-4, 0] }, { at: at + 0.05, duration: 0.4, ease: EASE_OUT }])
      if (i < SERRA_TIMELINE.length - 1) {
        seq.push([`[data-a=tl-line-${i}]`, { scaleY: [0, 1] }, { at: at + 0.15, duration: 0.35, ease: EASE_OUT }])
      }
    })
    seq.push(["[data-a=tl-foot]", { opacity: [0, 1] }, { at: SEAL_AT, duration: 0.4, ease: EASE_OUT }])
    seq.push(...sealSequence(SEAL_AT, `[data-row="${ACTIVE}"]`))
    seq.push(["[data-a=foot]", { opacity: [0, 1], y: [4, 0] }, { at: T.foot, duration: 0.4, ease: EASE_OUT }])
    return seq
  })

  const head = pre(hidden, { y: 8 })

  return (
    <div ref={scope} data-slot="screen-contato-v3" className={cn("flex h-full flex-col", canvas ? "px-10 py-6" : "p-4")}>
      <div className={cn("mx-auto flex min-h-0 w-full flex-1 flex-col", canvas && "max-w-[960px]")}>
        {/* Cabeçalho */}
        <div data-a="head" style={head} className="flex min-w-0 flex-col gap-1">
          {!canvas && <span className="text-xs text-muted-foreground">Buscas / {SEARCH}</span>}
          <h3 className={cn("font-heading font-light tracking-display", canvas ? "text-[2rem] leading-tight" : "text-xl")}>
            Primeiro contato
          </h3>
          <p className={cn("text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
            Rodada 1 · {FUNNEL.contacted} empresas · iniciada há 9 dias
          </p>
        </div>

        {/* Funil: 3 blocos lado a lado */}
        <div className={cn("flex items-stretch", canvas ? "mt-5 gap-2" : "mt-3.5 gap-1.5")}>
          {STAGES.map((s, k) => (
            <div key={s.label} className="contents">
              {k > 0 && canvas && (
                <span
                  data-a={`step-${k}`}
                  style={pre(hidden, { x: -4 })}
                  aria-hidden="true"
                  className="flex shrink-0 items-center text-steel-400"
                >
                  <ChevronRightIcon className={canvas ? "size-4" : "size-3"} />
                </span>
              )}
              <div
                data-a="block"
                style={pre(hidden, { y: 8 })}
                className={cn(
                  "flex min-w-0 flex-1 flex-col rounded-xl border",
                  "highlight" in s ? "border-transparent bg-navy-50" : "border-border bg-card",
                  canvas ? "px-5 pt-3.5 pb-4" : "px-2 pt-2 pb-2.5"
                )}
              >
                <span
                  className={cn(
                    "truncate",
                    "highlight" in s ? "font-medium text-navy-700" : "text-muted-foreground",
                    canvas ? "text-sm" : "text-[11px]"
                  )}
                >
                  {s.label}
                </span>
                <span
                  className={cn(
                    "font-heading font-light tracking-display tabular-nums",
                    "highlight" in s ? "text-navy-900" : "text-foreground",
                    canvas ? "mt-1 text-[2.5rem] leading-none" : "mt-0.5 text-2xl leading-none"
                  )}
                >
                  <CountUp to={s.value} start={playing} instant={state === "final"} delay={T.fill(k)} />
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative block overflow-hidden rounded-full",
                    "highlight" in s ? "bg-navy-600/15" : "bg-steel-500/20",
                    canvas ? "mt-3.5 h-1.5" : "mt-2 h-1"
                  )}
                >
                  <span
                    data-a={`fill-${k}`}
                    className={cn(
                      "absolute inset-0 origin-left rounded-full",
                      "highlight" in s ? "bg-navy-600" : "bg-steel-500"
                    )}
                    style={{ transform: `scaleX(${hidden ? 0 : s.value / FUNNEL.contacted})` }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Linha sob o funil */}
        <p
          data-a="facts"
          style={pre(hidden)}
          className={cn(
            "font-mono text-muted-foreground tabular-nums",
            canvas ? "mt-3 text-xs" : "mt-2.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]"
          )}
        >
          {canvas ? (
            <>
              {FUNNEL.waiting} aguardando resposta · {FUNNEL.notNow} sem interesse agora · {FUNNEL.queued} na fila da
              próxima rodada
            </>
          ) : (
            <>
              <span>{FUNNEL.waiting} aguardando resposta</span>
              <span>{FUNNEL.notNow} sem interesse agora</span>
              <span>{FUNNEL.queued} na fila da próxima rodada</span>
            </>
          )}
        </p>

        <div
          className={cn(
            "min-h-0",
            canvas ? "mt-5 grid flex-1 grid-cols-[minmax(0,1fr)_336px] items-start gap-5" : "mt-3.5 flex flex-col gap-3"
          )}
        >
          {/* Andamento */}
          <div className="flex min-w-0 flex-col">
            {canvas && (
              <div data-a="head" style={head} className="flex">
                <span className="flex items-center rounded-full border border-input bg-card p-[3px]">
                  {CONTACT_TABS.map((tab, i) => (
                    <span
                      key={tab}
                      data-active={i === 0 || undefined}
                      className="flex h-7 items-center rounded-full px-3.5 text-[13px] text-muted-foreground data-active:bg-muted data-active:font-semibold data-active:text-foreground"
                    >
                      {tab}
                    </span>
                  ))}
                </span>
              </div>
            )}
            <ul className={cn("flex flex-col overflow-hidden rounded-xl border border-border bg-card", canvas && "mt-3")}>
              {rows.map((r) => {
                const active = r.company === ACTIVE
                return (
                  <li
                    key={r.company}
                    data-a="row"
                    data-row={r.company}
                    style={pre(hidden, { y: 6 })}
                    className={cn(
                      "flex items-center border-b border-border last:border-b-0",
                      active && "bg-navy-50",
                      canvas ? "gap-3 px-4 py-2.5" : "gap-2.5 px-3 py-2"
                    )}
                  >
                    {canvas && <CompanyAvatar name={r.company} size="sm" />}
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={cn(
                          "truncate font-semibold",
                          !active && "text-foreground/85",
                          canvas ? "text-sm" : "text-[13px]"
                        )}
                      >
                        {r.company}
                      </span>
                      <span className={cn("truncate text-muted-foreground", canvas ? "text-xs" : "text-[11px]")}>
                        {canvas ? r.meta : r.activity}
                      </span>
                    </span>
                    <StatusBadge status={r.status} signal={active} hidden={hidden} small={!canvas} />
                    {canvas && (
                      <span className="w-[176px] shrink-0 truncate text-right text-[13px] text-muted-foreground">
                        {r.activity}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Linha do tempo da Serra Azul */}
          <div
            data-a="panel"
            style={pre(hidden, { y: 8 })}
            className={cn("flex flex-col rounded-xl border border-border bg-card", canvas ? "p-5" : "p-3.5")}
          >
            <div className="flex items-center gap-2.5">
              <CompanyAvatar name={ACTIVE} size="sm" />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className={cn("truncate font-semibold", canvas ? "text-sm" : "text-[13px]")}>{ACTIVE}</span>
                <span className="text-xs text-muted-foreground">Jundiaí, SP</span>
              </span>
            </div>
            <SectionLabel className={canvas ? "mt-4" : "mt-3"}>Linha do tempo</SectionLabel>
            <ol className={cn("flex flex-col", canvas ? "mt-3" : "mt-2.5")}>
              {SERRA_TIMELINE.map((item, i) => {
                const last = i === SERRA_TIMELINE.length - 1
                return (
                  <li key={i} className={cn("relative flex gap-3", !last && (canvas ? "pb-4" : "pb-3"))}>
                    {/* Trilho + ponto */}
                    <span className="relative flex w-5 shrink-0 justify-center">
                      {!last && (
                        <span className="absolute top-[22px] -bottom-[2px] w-px bg-border">
                          <span
                            data-a={`tl-line-${i}`}
                            className="block size-full origin-top bg-navy-600"
                            style={{ transform: `scaleY(${hidden ? 0 : 1})` }}
                          />
                        </span>
                      )}
                      {item.final ? (
                        <span className="relative mt-px flex size-5 items-center justify-center rounded-full border-2 border-steel-300 bg-card">
                          <span
                            data-a={`tl-dot-${i}`}
                            style={pre(hidden, { scale: 0.3 })}
                            className="absolute -inset-0.5 flex items-center justify-center rounded-full bg-navy-900 text-paper-50"
                          >
                            <CheckIcon className="size-3" strokeWidth={3} />
                          </span>
                        </span>
                      ) : (
                        <span className="relative mt-[5px] size-3 rounded-full border-2 border-steel-300 bg-card">
                          <span
                            data-a={`tl-dot-${i}`}
                            style={pre(hidden, { scale: 0.3 })}
                            className="absolute -inset-0.5 rounded-full bg-navy-600"
                          />
                        </span>
                      )}
                    </span>
                    <div
                      data-a={`tl-text-${i}`}
                      style={pre(hidden, { x: -4, opacity: 0.35 })}
                      className="flex min-w-0 flex-1 flex-col gap-0.5"
                    >
                      <span className="font-mono text-[11px] text-muted-foreground">{item.when}</span>
                      <span className={cn("leading-snug", canvas ? "text-sm" : "text-[13px]")}>
                        {item.final ? (
                          <>
                            <span className="font-semibold">Demonstrou interesse</span>
                            <span className="text-muted-foreground"> · enviada para Interessados</span>
                          </>
                        ) : (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </span>
                      {item.quote && (
                        <span
                          className={cn(
                            "mt-1 rounded-md border-l-2 border-navy-200 bg-paper-50 leading-snug text-foreground/85",
                            canvas ? "px-3 py-2 text-[13px]" : "px-2.5 py-1.5 text-xs"
                          )}
                        >
                          &ldquo;{item.quote}&rdquo;
                        </span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
            <div data-a="tl-foot" style={pre(hidden)} className={cn("flex", canvas ? "mt-3" : "mt-2")}>
              <Button variant="ghost" size={canvas ? "sm" : "xs"} tabIndex={-1} className="-ml-3">
                Ver resposta completa
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* Nota fixa */}
        <p
          data-a="foot"
          style={pre(hidden, { y: 4 })}
          className={cn("flex items-center gap-1.5 text-muted-foreground", canvas ? "mt-auto pt-3 text-[13px]" : "mt-3 text-xs")}
        >
          <InfoIcon className="size-3.5 shrink-0" />
          Quando uma empresa demonstra interesse, ela vai para você. A conversa a partir daí é sua.
        </p>
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  signal,
  hidden,
  small,
}: {
  status: ContactStatus
  signal: boolean
  hidden: boolean
  small?: boolean
}) {
  const label = CONTACT_STATUS_LABEL[status]
  if (status === "interested") {
    return <InterestSeal label={label} signal={signal} hidden={hidden} size={small ? "sm" : "md"} className="shrink-0" />
  }
  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0 bg-card font-medium text-muted-foreground",
        small ? "h-5 px-2 text-[11px]" : "h-6 px-2.5 text-xs"
      )}
    >
      {status === "waiting" && <ClockIcon />}
      {label}
    </Badge>
  )
}
