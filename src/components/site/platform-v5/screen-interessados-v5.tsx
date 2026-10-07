"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon, CalendarPlusIcon, ChevronDownIcon, EllipsisIcon, InfoIcon, MessageSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CompanyAvatar } from "@/components/company-avatar"
import { CountUp } from "@/components/site/reactbits/count-up"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import { FUNNEL_V5, INTERESTED_V5, PRODUCT, interactionsLabel, type InterestedV5, type ScreenState } from "./data-v5"
import { InterestSeal, NeutralBar, sealSequence } from "./parts-v5"

/* Tempos (s): 04-motion-v5 §1.6 (cerca de 2,2 s). Sem reordenação, sem toast, sem painel de detalhe:
   o ponto 17 é atendido pelo card completo da Serra Azul (contato, interesse, status e próximo passo). */
const T = { head: 0, cards: 0.15, cardGap: 0.06, barLag: 0.2, detail: 0.55, seal: 1.2, foot: 1.3 }
const barAt = (i: number) => T.cards + T.barLag + i * T.cardGap

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 3 (Interessados: a entrega), sem o shell. Também é a tela do hero. */
export function InteressadosV5Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <InteressadosV5Body key={key} state={state} layout={layout} />
}

function InteressadosV5Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"
  const [first, ...rest] = INTERESTED_V5
  // 1 ativo + 3 compactos no canvas (03-design-v5 §4.5); 1 + 2 no painel (§4.6)
  const others = rest.slice(0, canvas ? 3 : 2)
  const items = [first, ...others]

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: T.head, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=card]", { opacity: [0, 1], y: [12, 0] }, { at: T.cards, duration: 0.6, delay: stagger(T.cardGap), ease: EASE_OUT }],
      ...items.map(
        (item, i): AnimationSequence[number] => [
          `[data-a=bar-${i}]`,
          { scaleX: [0, item.adherence / 100] },
          { at: barAt(i), duration: 0.8, ease: EASE_OUT },
        ]
      ),
      ["[data-a=detail]", { opacity: [0, 1], y: [4, 0] }, { at: T.detail, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ...sealSequence(T.seal, "[data-a=card-active]"),
      ["[data-a=foot]", { opacity: [0, 1] }, { at: T.foot, duration: 0.4, ease: EASE_OUT }],
    ]
    return seq
  })

  const head = pre(hidden, { y: 8 })
  const card = pre(hidden, { y: 12 })
  const adherence = (i: number) => (
    <CountUp to={items[i].adherence} start={playing} instant={state === "final"} delay={barAt(i)} />
  )

  return (
    <div ref={scope} data-slot="screen-interessados-v5" className={cn("relative flex h-full flex-col", canvas ? "px-10 py-6" : "p-4")}>
      <div className={cn("mx-auto flex min-h-0 w-full flex-1 flex-col", canvas && "max-w-[920px]")}>
        {/* Cabeçalho */}
        <div data-a="head" style={head} className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-1">
            {!canvas && <span className="text-xs text-muted-foreground">{PRODUCT} / Interessados</span>}
            {/* QA M2: <p> e não <h3>; a tela é decorativa e o h3 quebrava o outline (h1 → h3 → h2). */}
            <p className={cn("font-heading font-light tracking-display", canvas ? "text-[2rem] leading-tight" : "text-xl")}>
              Interessados
            </p>
            <p className={cn("text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
              Responderam e querem saber mais · {FUNNEL_V5.interested} empresas
            </p>
          </div>
          {canvas && (
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="flex items-center gap-1 text-[13px] text-muted-foreground">
                Ordenar por: <span className="font-semibold text-foreground">Aderência</span>
                <ChevronDownIcon className="size-3.5" />
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <InfoIcon className="size-3 shrink-0" />A aderência sobe conforme a empresa responde e interage.
              </span>
            </div>
          )}
        </div>

        {/* Lista */}
        <ul className={cn("flex flex-col gap-2", canvas ? "mt-5" : "mt-3.5")}>
          <li data-a="card" style={card}>
            <div data-a="card-active">
              <ActiveCard item={first} hidden={hidden} canvas={canvas} adherence={adherence(0)} />
            </div>
          </li>
          {others.map((item, i) => (
            <li key={item.company} data-a="card" style={card}>
              <CompactCard item={item} index={i + 1} hidden={hidden} canvas={canvas} adherence={adherence(i + 1)} />
            </li>
          ))}
        </ul>

        {canvas ? (
          <div data-a="foot" style={pre(hidden)} className="mt-auto flex items-center justify-between gap-4 pt-3">
            <Button variant="ghost" size="sm" tabIndex={-1} className="-ml-3">
              Ver os {FUNNEL_V5.interested} interessados
              <ArrowRightIcon />
            </Button>
            <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <InfoIcon className="size-3.5 shrink-0" />A partir daqui, a conversa é sua.
            </p>
          </div>
        ) : (
          <p data-a="foot" style={pre(hidden)} className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <InfoIcon className="size-3.5 shrink-0" />A partir daqui, a conversa é sua.
          </p>
        )}
      </div>
    </div>
  )
}

/** Bloco de aderência: rótulo, número, barra neutra e nº de interações (de onde vem o número). */
function Adherence({
  value,
  label,
  index,
  interactions,
  hidden,
  size,
}: {
  value: number
  label: React.ReactNode
  index: number
  interactions: number
  hidden: boolean
  size: "lg" | "sm"
}) {
  const lg = size === "lg"
  return (
    <div className={cn("flex shrink-0 flex-col items-end", lg ? "w-[7.5rem] gap-1" : "w-[5.5rem] gap-1")}>
      {lg && <span className="font-mono text-[11px] font-medium tracking-label text-muted-foreground uppercase">Aderência</span>}
      <span className={cn("font-mono font-semibold text-foreground tabular-nums", lg ? "text-lg leading-none" : "text-sm leading-none")}>
        {label}%
      </span>
      <NeutralBar value={value / 100} hidden={hidden} anim={`bar-${index}`} strong={lg} className={lg ? "w-16" : "w-10"} />
      <span className={cn("whitespace-nowrap text-muted-foreground", lg ? "text-xs" : "text-[11px]")}>
        {interactionsLabel(interactions)}
      </span>
    </div>
  )
}

/** Card da Serra Azul no formato do escopo: empresa, contato, interesse, status, próximo passo e aderência. */
function ActiveCard({
  item,
  hidden,
  canvas,
  adherence,
}: {
  item: InterestedV5
  hidden: boolean
  canvas: boolean
  adherence: React.ReactNode
}) {
  const detail = pre(hidden, { y: 4 })
  const fields: { term: string; value: React.ReactNode; strong?: boolean }[] = [
    {
      term: "Contato",
      value: (
        <>
          <span className="block font-medium">{item.contact}</span>
          <span className={cn("block text-muted-foreground", canvas ? "text-[13px]" : "text-[11px]")}>{item.role}</span>
        </>
      ),
    },
    { term: "Necessidade identificada", value: item.interest },
    {
      term: "Interesse demonstrado",
      value: (
        <>
          <span className="block">{item.status}</span>
          <span className={cn("block text-muted-foreground", canvas ? "text-[13px]" : "text-[11px]")}>{item.replied}</span>
        </>
      ),
    },
    { term: "Próximo passo", value: item.next, strong: true },
  ]

  return (
    <article className={cn("flex flex-col rounded-xl border border-navy-100 bg-card shadow-xs", canvas ? "px-5 py-4" : "p-3.5")}>
      <div className={cn("flex items-start", canvas ? "gap-3.5" : "gap-2.5")}>
        {canvas && <CompanyAvatar name={item.company} size="lg" />}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex min-w-0 items-center gap-2.5">
            <span className={cn("truncate font-semibold", canvas ? "text-base" : "text-sm")}>{item.company}</span>
            {canvas && <InterestSeal label="Interessada" signal hidden={hidden} className="shrink-0" />}
          </span>
          <span className={cn("truncate text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
            {canvas ? item.meta : item.city}
          </span>
          {!canvas && <InterestSeal label="Interessada" signal hidden={hidden} size="sm" className="mt-1.5 self-start" />}
        </div>
        <Adherence
          value={item.adherence}
          label={adherence}
          index={0}
          interactions={item.interactions}
          hidden={hidden}
          size={canvas ? "lg" : "sm"}
        />
      </div>

      <dl
        className={cn(
          "grid",
          canvas ? "mt-3.5 ml-[54px] grid-cols-[1fr_1.35fr_1fr_1.1fr] gap-x-6" : "mt-3 grid-cols-1 gap-y-2"
        )}
      >
        {fields.map((f) => (
          <div key={f.term} data-a="detail" style={detail} className="min-w-0">
            <dt className={cn("text-muted-foreground", canvas ? "text-xs" : "text-[11px]")}>{f.term}</dt>
            <dd className={cn("mt-0.5 leading-snug", canvas ? "text-sm" : "text-xs", f.strong && "font-medium")}>{f.value}</dd>
          </div>
        ))}
      </dl>

      <div data-a="detail" style={detail} className={cn("flex items-center gap-1.5", canvas ? "mt-3.5 ml-[54px]" : "mt-3")}>
        <Button size={canvas ? "sm" : "xs"} tabIndex={-1}>
          <MessageSquareIcon />
          Assumir conversa
        </Button>
        <Button variant="outline" size={canvas ? "sm" : "xs"} tabIndex={-1}>
          <CalendarPlusIcon />
          Agendar reunião
        </Button>
        {canvas && (
          <Button variant="ghost" size="icon-sm" tabIndex={-1}>
            <EllipsisIcon />
            <span className="sr-only">Mais ações</span>
          </Button>
        )}
      </div>
    </article>
  )
}

/** Card compacto: empresa, contato e cargo, interesse, status (selo neutro) e aderência. Sem ações. */
function CompactCard({
  item,
  index,
  hidden,
  canvas,
  adherence,
}: {
  item: InterestedV5
  index: number
  hidden: boolean
  canvas: boolean
  adherence: React.ReactNode
}) {
  const meter = (
    <Adherence
      value={item.adherence}
      label={adherence}
      index={index}
      interactions={item.interactions}
      hidden={hidden}
      size="sm"
    />
  )
  if (!canvas) {
    return (
      <article className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-[13px] font-semibold text-foreground/85">{item.company}</span>
          <InterestSeal label={item.status} size="sm" className="self-start" />
        </div>
        {meter}
      </article>
    )
  }
  return (
    <article className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_auto_5.5rem] items-center gap-5 rounded-xl border border-border bg-card px-5 py-3">
      <div className="flex min-w-0 items-center gap-3.5">
        <CompanyAvatar name={item.company} size="lg" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[15px] font-semibold text-foreground/85">{item.company}</span>
          <span className="truncate text-[13px] text-muted-foreground">
            {item.contact} · {item.role}
          </span>
        </div>
      </div>
      <span className="truncate text-sm text-foreground/85">{item.interest}</span>
      <InterestSeal label={item.status} size="sm" />
      {meter}
    </article>
  )
}
