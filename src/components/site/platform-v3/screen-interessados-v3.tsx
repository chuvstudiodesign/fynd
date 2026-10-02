"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon, CalendarPlusIcon, CheckIcon, ChevronDownIcon, EllipsisIcon, InfoIcon, MessageSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CompanyAvatar } from "@/components/company-avatar"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import { FUNNEL, INTERESTED, SEARCH, type Interested, type ScreenState } from "./data-v3"
import { InterestSeal, sealSequence } from "./parts-v3"

/* Tempos (s): cascata dos interessados, o selo ciano da Serra Azul acende no fim da cascata.
   Fechamento opcional (só na demo, `toast`): "Assumir conversa" pressionado e toast interno (04-motion §5.5). */
const T = { cards: 0.15, detail: 0.55, seal: 1.0, foot: 1.0, press: 2.1, toastIn: 2.25, toastOut: 3.9 }

interface Props {
  state: ScreenState
  layout?: ScreenLayout
  /** Fecha a sequência com o clique em "Assumir conversa" e o toast interno. Padrão: false. */
  toast?: boolean
}

/** Conteúdo da tela 4 (interessados: a entrega), sem o shell. Também é a tela do hero. */
export function InteressadosV3Content({ state: rawState, layout = "canvas", toast = false }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <InteressadosV3Body key={key} state={state} layout={layout} toast={toast} />
}

function InteressadosV3Body({ state, layout = "canvas", toast = false }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"
  const [first, ...rest] = INTERESTED
  const others = rest.slice(0, canvas ? 4 : 2)

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=card]", { opacity: [0, 1], y: [12, 0] }, { at: T.cards, duration: 0.6, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=detail]", { opacity: [0, 1], y: [4, 0] }, { at: T.detail, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ...sealSequence(T.seal, "[data-a=card-active]"),
      ["[data-a=foot]", { opacity: [0, 1] }, { at: T.foot, duration: 0.4, ease: EASE_OUT }],
    ]
    if (toast) {
      seq.push(["[data-a=take]", { scale: [1, 0.96, 1] }, { at: T.press, duration: 0.2 }])
      seq.push(["[data-a=toast]", { opacity: [0, 1], y: [8, 0] }, { at: T.toastIn, duration: 0.3, ease: EASE_OUT }])
      seq.push(["[data-a=toast]", { opacity: [1, 0] }, { at: T.toastOut, duration: 0.3, ease: EASE_OUT }])
    }
    return seq
  })

  const head = pre(hidden, { y: 8 })
  const card = pre(hidden, { y: 12 })

  return (
    <div
      ref={scope}
      data-slot="screen-interessados-v3"
      className={cn("relative flex h-full flex-col", canvas ? "px-10 py-6" : "p-4")}
    >
      <div className={cn("mx-auto flex min-h-0 w-full flex-1 flex-col", canvas && "max-w-[920px]")}>
        {/* Cabeçalho */}
        <div data-a="head" style={head} className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-1">
            {!canvas && <span className="text-xs text-muted-foreground">Buscas / {SEARCH}</span>}
            <h3 className={cn("font-heading font-light tracking-display", canvas ? "text-[2rem] leading-tight" : "text-xl")}>
              Interessados
            </h3>
            <p className={cn("text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
              {FUNNEL.interested} empresas demonstraram interesse · Rodada 1
            </p>
          </div>
          {canvas && (
            <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground">
              Ordenar por: <span className="font-semibold text-foreground">Mais recentes</span>
              <ChevronDownIcon className="size-3.5" />
            </span>
          )}
        </div>

        {/* Lista */}
        <ul className={cn("flex flex-col", canvas ? "mt-5 gap-2" : "mt-3.5 gap-2")}>
          <li data-a="card" style={card}>
            <div data-a="card-active">
              <ActiveCard item={first} hidden={hidden} canvas={canvas} />
            </div>
          </li>
          {others.map((item) => (
            <li key={item.company} data-a="card" style={card}>
              <CompactCard item={item} canvas={canvas} />
            </li>
          ))}
        </ul>

        {canvas && (
          <div data-a="foot" style={pre(hidden)} className="mt-auto flex items-center justify-between gap-4 pt-3">
            <Button variant="ghost" size="sm" tabIndex={-1} className="-ml-3">
              Ver os {FUNNEL.interested} interessados
              <ArrowRightIcon />
            </Button>
            <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <InfoIcon className="size-3.5 shrink-0" />A partir daqui, a conversa é sua. Você decide o próximo passo.
            </p>
          </div>
        )}
        {!canvas && (
          <p data-a="foot" style={pre(hidden)} className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <InfoIcon className="size-3.5 shrink-0" />A partir daqui, a conversa é sua.
          </p>
        )}
      </div>

      {/* Toast interno (só durante o play, quando pedido) */}
      {toast && playing && (
        <div
          data-a="toast"
          style={{ opacity: 0 }}
          className={cn(
            "absolute flex items-center gap-2 rounded-lg border border-border bg-popover px-4 py-3 text-sm font-medium text-popover-foreground shadow-lg",
            canvas ? "right-10 bottom-8" : "right-3 bottom-3"
          )}
        >
          <CheckIcon className="size-4 text-success" />
          Conversa com a Serra Azul Alimentos agora é sua.
        </div>
      )}
    </div>
  )
}

/** Card da Serra Azul: resposta, contexto, próximo passo e ações. Selo ciano. */
function ActiveCard({ item, hidden, canvas }: { item: Interested; hidden: boolean; canvas: boolean }) {
  const detail = pre(hidden, { y: 4 })
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-navy-100 bg-card shadow-xs",
        canvas ? "px-5 pt-4 pb-4" : "p-3.5"
      )}
    >
      <div className={cn("flex items-start", canvas ? "gap-3.5" : "gap-2.5")}>
        <CompanyAvatar name={item.company} size={canvas ? "lg" : "default"} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn("truncate font-semibold", canvas ? "text-base" : "text-sm")}>{item.company}</span>
          <span className={cn("truncate text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
            {canvas ? `${item.meta} · Fit ${item.fit}%` : `${item.city} · Fit ${item.fit}%`}
          </span>
        </div>
        {canvas && (
          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <InterestSeal signal hidden={hidden} />
            <span className="text-xs text-muted-foreground">{item.replied}</span>
          </div>
        )}
      </div>
      {!canvas && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <InterestSeal signal hidden={hidden} size="sm" />
          <span className="text-[11px] text-muted-foreground">{item.replied}</span>
        </div>
      )}

      <blockquote
        data-a="detail"
        style={detail}
        className={cn(
          "border-l-2 border-navy-200 text-foreground",
          canvas ? "mt-3.5 ml-[54px] pl-3.5 text-[15px] leading-relaxed" : "mt-2.5 pl-3 text-[13px] leading-snug"
        )}
      >
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <div
        className={cn(
          canvas ? "mt-3.5 ml-[54px] flex items-end gap-6" : "mt-2.5 flex flex-col gap-2"
        )}
      >
        <dl data-a="detail" style={detail} className={cn("grid min-w-0 flex-1 gap-x-6", canvas ? "grid-cols-2" : "gap-y-1.5")}>
          <div className="min-w-0">
            <dt className={cn("text-muted-foreground", canvas ? "text-xs" : "text-[11px]")}>Contexto</dt>
            <dd className={cn("leading-snug", canvas ? "text-sm" : "text-xs")}>{item.context}</dd>
          </div>
          <div className="min-w-0">
            <dt className={cn("text-muted-foreground", canvas ? "text-xs" : "text-[11px]")}>Próximo passo sugerido</dt>
            <dd className={cn("leading-snug font-medium", canvas ? "text-sm" : "text-xs")}>{item.next}</dd>
          </div>
        </dl>
        <div data-a="detail" style={detail} className="flex shrink-0 items-center gap-1.5">
          <span data-a="take" className="inline-flex">
            <Button size={canvas ? "sm" : "xs"} tabIndex={-1}>
              <MessageSquareIcon />
              Assumir conversa
            </Button>
          </span>
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
      </div>
    </article>
  )
}

/** Card compacto dos demais interessados: selo neutro, trecho da resposta e ações. */
function CompactCard({ item, canvas }: { item: Interested; canvas: boolean }) {
  return (
    <article
      className={cn(
        "flex items-center rounded-xl border border-border bg-card",
        canvas ? "gap-3.5 px-5 py-3" : "gap-2.5 px-3 py-2.5"
      )}
    >
      {canvas && <CompanyAvatar name={item.company} size="lg" />}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("truncate font-semibold text-foreground/85", canvas ? "text-[15px]" : "text-[13px]")}>
            {item.company}
          </span>
          {canvas && <InterestSeal size="sm" className="shrink-0" />}
          <span className={cn("shrink-0 text-muted-foreground", canvas ? "text-xs" : "text-[11px]")}>
            {canvas ? item.replied : item.city}
          </span>
        </div>
        <span className={cn("truncate text-muted-foreground", canvas ? "text-sm" : "text-xs")}>&ldquo;{item.quote}&rdquo;</span>
      </div>
      {canvas && (
        <div className="flex shrink-0 items-center gap-1.5">
          <Button variant="outline" size="sm" tabIndex={-1}>
            Assumir conversa
          </Button>
          <Button variant="ghost" size="icon-sm" tabIndex={-1}>
            <EllipsisIcon />
            <span className="sr-only">Mais ações</span>
          </Button>
        </div>
      )}
    </article>
  )
}
