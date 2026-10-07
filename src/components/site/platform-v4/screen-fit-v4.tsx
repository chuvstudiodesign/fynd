"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/site/reactbits/count-up"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import { BREAKDOWNS, FIT_CHIPS, FUNNEL_V4, PRODUCT, type Breakdown, type ScreenState } from "./data-v4"
import { NeutralBar } from "./parts-v4"

/* Tempos (s): 04-motion-v4 §1.5 (cerca de 1,9 s). Sem lista, sem nomes, sem %. */
const T = { head: 0, count: 0.15, countDur: 1.3, caption: 0.25, blocks: 0.55, bars: 0.65, strip: 1.45 }

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 2 (Fit por volume), sem o shell. */
export function FitV4Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <FitV4Body key={key} state={state} layout={layout} />
}

const shareOf = (group: Breakdown, value: number) => value / Math.max(...group.rows.map((r) => r.value))

function FitV4Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"
  // Painel (mobile): só "Regiões" aberto; os outros dois títulos viram chips (03-design-v4 §4.6)
  const groups = canvas ? BREAKDOWNS : BREAKDOWNS.filter((g) => g.title === "Regiões")

  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: T.head, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=caption]", { opacity: [0, 1], y: [4, 0] }, { at: T.caption, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=block]", { opacity: [0, 1], y: [8, 0] }, { at: T.blocks, duration: 0.45, delay: stagger(0.08), ease: EASE_OUT }],
    ]
    let i = 0
    groups.forEach((g, gi) =>
      g.rows.forEach((r, ri) => {
        seq.push([
          `[data-a=bar-${gi}-${ri}]`,
          { scaleX: [0, shareOf(g, r.value)] },
          { at: T.bars + i * 0.06, duration: 0.6, ease: EASE_OUT },
        ])
        i++
      })
    )
    seq.push(["[data-a=strip]", { opacity: [0, 1], y: [4, 0] }, { at: T.strip, duration: 0.4, ease: EASE_OUT }])
    return seq
  })

  const head = pre(hidden, { y: 8 })
  const total = FUNNEL_V4.profile.toLocaleString("pt-BR")

  return (
    <div ref={scope} data-slot="screen-fit-v4" className={cn("flex h-full flex-col", canvas ? "px-10 py-8" : "p-4")}>
      <div className={cn("mx-auto flex w-full flex-col", canvas && "max-w-[880px]")}>
        {/* Herói: o volume */}
        <div data-a="head" style={head}>
          {!canvas && <span className="mb-1 block text-xs text-muted-foreground">{PRODUCT} / Fit</span>}
          {/* Mesmo visual do SectionLabel, mas em <p>: a tela é decorativa e não entra no outline (QA M2). */}
          <p className={cn("font-mono text-xs font-medium tracking-label text-muted-foreground uppercase", !canvas && "text-[11px]")}>
            Seu potencial
          </p>
        </div>
        <p
          className={cn(
            "grid font-heading leading-none font-light tracking-display tabular-nums",
            canvas ? "mt-3 text-[7rem]" : "mt-2 text-5xl"
          )}
        >
          <span aria-hidden="true" className="invisible [grid-area:1/1]">
            {total}
          </span>
          <span className="[grid-area:1/1]">
            <CountUp to={FUNNEL_V4.profile} start={playing} instant={state === "final"} delay={T.count} duration={T.countDur} />
          </span>
        </p>
        <p data-a="caption" style={pre(hidden, { y: 4 })} className={cn("text-muted-foreground", canvas ? "mt-3 text-[15px]" : "mt-2 text-sm")}>
          empresas com o seu perfil, no Brasil todo
        </p>

        {/* Chips do perfil (somente leitura) */}
        <div data-a="head" style={head} className={cn("flex flex-wrap gap-2", canvas ? "mt-5" : "mt-3")}>
          {FIT_CHIPS.map((c) => (
            <Badge key={c} variant="secondary" className={canvas ? "h-7 px-3 text-[13px]" : "h-6 px-2.5"}>
              {c}
            </Badge>
          ))}
        </div>

        {/* Recortes agregados: números absolutos, barras neutras, sem porcentagem */}
        {!canvas && (
          <div data-a="head" style={head} className="mt-4 flex flex-wrap items-center gap-1.5">
            {BREAKDOWNS.map((g) => (
              <Badge
                key={g.title}
                variant={g.title === "Regiões" ? "outline" : "secondary"}
                className={cn("h-6 px-2.5", g.title === "Regiões" && "bg-card font-semibold")}
              >
                {g.title}
              </Badge>
            ))}
          </div>
        )}
        <div className={cn("grid", canvas ? "mt-7 grid-cols-3 gap-4" : "mt-2.5 grid-cols-1")}>
          {groups.map((g, gi) => (
            <section
              key={g.title}
              data-a="block"
              style={pre(hidden, { y: 8 })}
              className={cn("flex flex-col rounded-xl border border-border bg-card", canvas ? "gap-3 p-5" : "gap-2.5 p-3.5")}
            >
              {canvas && <p className="text-sm font-semibold">{g.title}</p>}
              <ul className={cn("flex flex-col", canvas ? "gap-3" : "gap-2.5")}>
                {g.rows.map((r, ri) => (
                  <li key={r.label} className="flex flex-col gap-1.5">
                    <span className={cn("flex items-baseline justify-between gap-3", canvas ? "text-sm" : "text-[13px]")}>
                      <span className="truncate text-foreground/85">{r.label}</span>
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {r.value.toLocaleString("pt-BR")}
                      </span>
                    </span>
                    <NeutralBar value={shareOf(g, r.value)} hidden={hidden} anim={`bar-${gi}-${ri}`} strong={ri === 0} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Faixa de status: neutra, ponto estático, sem ciano (o andamento não é o sinal; o interesse é) */}
        <div
          data-a="strip"
          style={pre(hidden, { y: 4 })}
          className={cn(
            "flex items-start rounded-lg border border-border bg-paper-50",
            canvas ? "mt-5 gap-3 px-4 py-3" : "mt-3 gap-2.5 px-3 py-2.5"
          )}
        >
          <span aria-hidden="true" className={cn("shrink-0 rounded-full bg-navy-600", canvas ? "mt-1.5 size-2" : "mt-1 size-1.5")} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className={cn("font-semibold text-foreground", canvas ? "text-sm" : "text-[13px]")}>
              Abordagem e qualificação em andamento
            </span>
            <span className={cn("leading-snug text-muted-foreground", canvas ? "text-[13px]" : "text-xs")}>
              A fynd já começou a abordar e qualificar. Quem tiver interesse aparece em Interessados.
            </span>
          </div>
          {canvas && (
            <Button variant="ghost" size="sm" tabIndex={-1} className="-mr-2 shrink-0 self-center">
              Ver interessados
              <ArrowRightIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
