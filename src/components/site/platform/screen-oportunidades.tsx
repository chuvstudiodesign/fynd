"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { animate, stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon, ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OpportunityCard } from "@/components/opportunity-card"
import { CountUp } from "@/components/site/reactbits/count-up"
import {
  ACTIVE_COMPANY,
  FINAL_ORDER,
  INITIAL_ORDER,
  LIST_CRITERIA,
  OPPORTUNITIES,
  PROFILE,
  type ScreenState,
} from "./data"
import { EASE_IN_OUT, EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence, useTimeline } from "./playback"
import { PlatformShell } from "./shell"

export type ListMode = "reorder" | "cascade"
export type ScreenLayout = "canvas" | "panel"

const BY_NAME = new Map(OPPORTUNITIES.map((o) => [o.company, o]))
const sel = (company: string, slot: string) => `[data-card="${company}"] [data-slot=${slot}]`

/* Tempos (s) das duas coreografias: 04-motion.md §1 (cascade, hero) e §5.2 (reorder, etapa 2) */
const T = {
  reorder: { barsAt: 0.2, sortedAt: 1.05, reorderAt: 1.1, activeAt: 1.9 },
  cascade: { barsAt: 0.1, sortedAt: 0, reorderAt: 0, activeAt: 1.05 },
}

interface ListProps {
  state: ScreenState
  mode?: ListMode
  layout?: ScreenLayout
  /** Quantos cards mostrar (o painel mobile pode mostrar menos). */
  limit?: number
}

/** Conteúdo da tela A (sem o shell). */
export function OportunidadesContent({ state: rawState, mode = "reorder", layout = "canvas", limit }: ListProps) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <OportunidadesBody key={key} state={state} mode={mode} layout={layout} limit={limit} />
}

function OportunidadesBody({ state, mode = "reorder", layout = "canvas", limit }: ListProps) {
  const hidden = state !== "final"
  const playing = state === "play"
  const t = T[mode]
  const startOrder = mode === "reorder" ? INITIAL_ORDER : FINAL_ORDER
  const [order, setOrder] = useState(startOrder)
  const [lit, setLit] = useState(false)

  const currentOrder = (state === "final" ? FINAL_ORDER : order).filter((c) =>
    limit ? FINAL_ORDER.indexOf(c) < limit : true
  )
  const isLit = state === "final" || lit

  useTimeline(playing, [
    ...(mode === "reorder" ? ([[t.reorderAt, () => setOrder(FINAL_ORDER)]] as [number, () => void][]) : []),
    [t.activeAt, () => setLit(true)],
  ])

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = []
    if (mode === "reorder") {
      seq.push(["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }])
    } else {
      seq.push(["[data-a=card]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.6, delay: stagger(0.06), ease: EASE_OUT }])
    }
    startOrder.forEach((company, i) => {
      if (limit && FINAL_ORDER.indexOf(company) >= limit) return
      const fit = BY_NAME.get(company)!.fit
      seq.push([sel(company, "opportunity-card-bar"), { scaleX: [0, fit / 100] }, { at: t.barsAt + i * 0.06, duration: 0.8, ease: EASE_OUT }])
    })
    if (mode === "reorder") {
      seq.push(["[data-a=sorted]", { opacity: [0, 1] }, { at: t.sortedAt, duration: 0.3, ease: EASE_OUT }])
    }
    seq.push([
      sel(ACTIVE_COMPANY, "opportunity-card-signal"),
      { scaleY: [0, 1], opacity: [0, 1] },
      { at: t.activeAt, duration: 0.45, ease: EASE_OUT },
    ])
    return seq
  })

  // Reordenação (FLIP manual): offsetTop ignora o scale do canvas, ao contrário do `layout` do Motion
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

  const headStyle = pre(hidden && mode === "reorder", { y: 8 })
  const sortedStyle = pre(hidden && mode === "reorder")
  const canvas = layout === "canvas"

  return (
    <div
      ref={scope}
      data-slot="screen-oportunidades"
      className={cn("flex h-full flex-col", canvas ? "px-10 py-7" : "p-4")}
    >
      <div className={cn("mx-auto flex w-full flex-col", canvas && "max-w-[880px]")}>
        {/* Cabeçalho */}
        <div data-a="head" style={headStyle} className="flex items-end justify-between gap-6">
          <div className="flex min-w-0 flex-col gap-1">
            {!canvas && <span className="text-xs text-muted-foreground">Perfis ideais / {PROFILE}</span>}
            <h3 className={cn("font-heading font-light tracking-display", canvas ? "text-[2rem] leading-tight" : "text-xl")}>
              Oportunidades
            </h3>
            <p className={cn("text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
              {/* [validar frequência de atualização] antes de mostrar horário ou ciclo semanal */}
              12 empresas priorizadas · perfil {PROFILE}
            </p>
          </div>
          {canvas && (
            <Button variant="outline" size="sm" tabIndex={-1}>
              <SlidersHorizontalIcon />
              Ajustar perfil
            </Button>
          )}
        </div>

        {/* Chips de critério */}
        <div data-a="head" style={headStyle} className={cn("flex flex-wrap gap-2", canvas ? "mt-5" : "mt-3")}>
          {LIST_CRITERIA.map((c) => (
            <Badge key={c} variant="secondary" className={canvas ? "h-7 px-3 text-[13px]" : "h-6 px-2.5"}>
              {c}
            </Badge>
          ))}
        </div>

        {/* Linha da ordenação */}
        <div
          className={cn(
            "flex items-center justify-between gap-4 text-muted-foreground",
            canvas ? "mt-5 text-[13px]" : "mt-4 text-xs"
          )}
        >
          <span data-a="sorted" style={sortedStyle}>
            Ordenado pela aderência ao seu perfil ideal
          </span>
          {canvas && (
            <span data-a="head" style={headStyle} className="flex items-center gap-1">
              Ordenar por: <span className="font-semibold text-foreground">Aderência</span>
              <ChevronDownIcon className="size-3.5" />
            </span>
          )}
        </div>

        {/* Lista */}
        <ul ref={listRef} className={cn("relative isolate flex flex-col", canvas ? "mt-3 gap-2" : "mt-2.5 gap-1.5")}>
            {currentOrder.map((company) => {
              const o = BY_NAME.get(company)!
              const i = startOrder.indexOf(company)
              return (
                <li key={company} data-li={company} className="relative" style={{ zIndex: o.fit }}>
                  <div data-card={company} data-a="card" style={pre(hidden && mode === "cascade", { y: 8 })}>
                    <OpportunityCard
                      tabIndex={-1}
                      company={o.company}
                      meta={o.meta}
                      fit={o.fit}
                      active={company === ACTIVE_COMPANY && isLit}
                      showAvatar={canvas}
                      barScale={hidden ? 0 : undefined}
                      className={cn("hover:bg-card data-active:hover:bg-navy-50", canvas ? "py-3.5" : "gap-3 px-4 py-3")}
                      fitLabel={
                        <>
                          <CountUp
                            to={o.fit}
                            start={playing}
                            instant={state === "final"}
                            delay={t.barsAt + i * 0.06}
                          />
                          %
                        </>
                      }
                    />
                  </div>
                </li>
              )
            })}
        </ul>

        {canvas && (
          <div data-a="head" style={headStyle} className="mt-4 flex">
            <Button variant="ghost" size="sm" tabIndex={-1} className="-ml-3">
              Ver as 12 oportunidades
              <ArrowRightIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/** Tela A completa (shell + lista), para o canvas de 1280×800. */
export function ScreenOportunidades({ state }: { state: ScreenState }) {
  return (
    <PlatformShell active="Oportunidades" breadcrumb={["Perfis ideais", PROFILE]}>
      <OportunidadesContent state={state} mode="reorder" />
    </PlatformShell>
  )
}

/** Tela A para o hero: cards em cascata, barras e % contando quando `play` for true. */
export function HeroScreen({ play }: { play: boolean }) {
  return (
    <PlatformShell active="Oportunidades" breadcrumb={["Perfis ideais", PROFILE]}>
      <OportunidadesContent state={play ? "play" : "idle"} mode="cascade" />
    </PlatformShell>
  )
}
