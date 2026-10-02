"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { animate, stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon, ChevronDownIcon, InfoIcon, SlidersHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OpportunityCard } from "@/components/opportunity-card"
import { CountUp } from "@/components/site/reactbits/count-up"
import {
  EASE_IN_OUT,
  EASE_OUT,
  pre,
  useEffectiveState,
  useReplayKey,
  useScreenSequence,
  useTimeline,
} from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import {
  ACTIVE,
  FIT_COMPANIES,
  FIT_CRITERIA,
  FIT_FINAL_ORDER,
  FIT_INITIAL_ORDER,
  FUNNEL,
  SEARCH,
  type ScreenState,
} from "./data-v3"

const BY_NAME = new Map(FIT_COMPANIES.map((o) => [o.company, o]))
const sel = (company: string, slot: string) => `[data-card="${company}"] [data-slot=${slot}]`

/* Tempos (s) da reordenação: 04-motion.md §5.2, com a faixa "Ponto de partida" entrando junto do cabeçalho */
const T = { barsAt: 0.2, sortedAt: 1.05, reorderAt: 1.1, activeAt: 1.9 }

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 2 (empresas com fit: o cruzamento, não a entrega), sem o shell. */
export function FitV3Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <FitV3Body key={key} state={state} layout={layout} />
}

function FitV3Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const [order, setOrder] = useState(FIT_INITIAL_ORDER)
  const [lit, setLit] = useState(false)
  const currentOrder = state === "final" ? FIT_FINAL_ORDER : order
  const isLit = state === "final" || lit

  useTimeline(playing, [
    [T.reorderAt, () => setOrder(FIT_FINAL_ORDER)],
    [T.activeAt, () => setLit(true)],
  ])

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
    ]
    FIT_INITIAL_ORDER.forEach((company, i) => {
      const fit = BY_NAME.get(company)!.fit
      seq.push([sel(company, "opportunity-card-bar"), { scaleX: [0, fit / 100] }, { at: T.barsAt + i * 0.06, duration: 0.8, ease: EASE_OUT }])
    })
    seq.push(["[data-a=sorted]", { opacity: [0, 1] }, { at: T.sortedAt, duration: 0.3, ease: EASE_OUT }])
    seq.push([sel(ACTIVE, "opportunity-card-signal"), { scaleY: [0, 1], opacity: [0, 1] }, { at: T.activeAt, duration: 0.45, ease: EASE_OUT }])
    return seq
  })

  // Reordenação (FLIP manual, como na v1): offsetTop ignora o scale do canvas
  const listRef = useRef<HTMLUListElement>(null)
  const tops = useRef(new Map<string, number>())
  const orderKey = currentOrder.join("|")
  useLayoutEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-li]") ?? []
    items.forEach((el) => {
      const name = el.dataset.li ?? ""
      const top = el.offsetTop
      const prev = tops.current.get(name)
      if (playing && prev !== undefined && prev !== top) {
        animate(el, { y: [prev - top, 0] }, { duration: 0.75, ease: EASE_IN_OUT })
      }
      tops.current.set(name, top)
    })
  }, [orderKey, playing])

  const headStyle = pre(hidden, { y: 8 })
  const canvas = layout === "canvas"

  return (
    <div ref={scope} data-slot="screen-fit-v3" className={cn("flex h-full flex-col", canvas ? "px-10 py-6" : "p-4")}>
      <div className={cn("mx-auto flex w-full flex-col", canvas && "max-w-[880px]")}>
        {/* Cabeçalho */}
        <div data-a="head" style={headStyle} className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-1">
            {!canvas && <span className="text-xs text-muted-foreground">Buscas / {SEARCH}</span>}
            <h3 className={cn("font-heading font-light tracking-display", canvas ? "text-[2rem] leading-tight" : "text-xl")}>
              Empresas com fit
            </h3>
            <p className={cn("text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
              {/* [receita-federal-removido 2026-10-01] original: "{FUNNEL.fit} empresas encontradas · Receita Federal e base fynd" */}
              {FUNNEL.fit} empresas encontradas · bases empresariais e base fynd
            </p>
          </div>
          {canvas && (
            <Button variant="outline" size="sm" tabIndex={-1}>
              <SlidersHorizontalIcon />
              Ajustar busca
            </Button>
          )}
        </div>

        {/* Chips de critério (somente leitura) */}
        <div data-a="head" style={headStyle} className={cn("flex flex-wrap gap-2", canvas ? "mt-4" : "mt-3")}>
          {FIT_CRITERIA.map((c) => (
            <Badge key={c} variant="secondary" className={canvas ? "h-7 px-3 text-[13px]" : "h-6 px-2.5"}>
              {c}
            </Badge>
          ))}
        </div>

        {/* Faixa informativa (neutra, sem ciano) */}
        <div
          data-a="head"
          style={headStyle}
          className={cn(
            "flex items-start gap-2.5 rounded-lg border border-border bg-paper-50 text-foreground/85",
            canvas ? "mt-4 px-4 py-2.5 text-[13px] leading-snug" : "mt-3 px-3 py-2 text-xs leading-snug"
          )}
        >
          <InfoIcon className={cn("shrink-0 text-navy-600", canvas ? "mt-px size-4" : "size-3.5")} />
          <span>
            <span className="font-semibold text-foreground">Ponto de partida.</span> A fynd faz o primeiro contato com estas
            empresas e só te entrega quem demonstrar interesse.
          </span>
        </div>

        {/* Linha da ordenação */}
        <div
          className={cn(
            "flex items-center justify-between gap-4 text-muted-foreground",
            canvas ? "mt-4 text-[13px]" : "mt-3.5 text-xs"
          )}
        >
          <span data-a="sorted" style={pre(hidden)}>
            Ordenado pelo fit com o que você vende
          </span>
          {canvas && (
            <span data-a="head" style={headStyle} className="flex items-center gap-1">
              Ordenar por: <span className="font-semibold text-foreground">Fit</span>
              <ChevronDownIcon className="size-3.5" />
            </span>
          )}
        </div>

        {/* Lista */}
        <ul ref={listRef} className={cn("relative isolate flex flex-col", canvas ? "mt-2.5 gap-1.5" : "mt-2.5 gap-1.5")}>
          {currentOrder.map((company) => {
            const o = BY_NAME.get(company)!
            const i = FIT_INITIAL_ORDER.indexOf(company)
            return (
              <li key={company} data-li={company} className="relative" style={{ zIndex: o.fit }}>
                <div data-card={company}>
                  <OpportunityCard
                    tabIndex={-1}
                    company={o.company}
                    meta={o.meta}
                    fit={o.fit}
                    active={company === ACTIVE && isLit}
                    showAvatar={canvas}
                    barScale={hidden ? 0 : undefined}
                    className={cn("hover:bg-card data-active:hover:bg-navy-50", canvas ? "py-2.5" : "gap-3 px-4 py-3")}
                    fitLabel={
                      <>
                        <CountUp to={o.fit} start={playing} instant={state === "final"} delay={T.barsAt + i * 0.06} />%
                      </>
                    }
                  />
                </div>
              </li>
            )
          })}
        </ul>

        {canvas && (
          <div data-a="head" style={headStyle} className="mt-2 flex">
            <Button variant="ghost" size="sm" tabIndex={-1} className="-ml-3">
              Ver as {FUNNEL.fit} empresas
              <ArrowRightIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
