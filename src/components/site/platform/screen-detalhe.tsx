"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { BookmarkIcon, MapPinIcon, MessageSquareTextIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CompanyAvatar } from "@/components/company-avatar"
import { CountUp } from "@/components/site/reactbits/count-up"
import { COMPANY_DATA, CONTEXT_SIGNALS, PROFILE, SOURCES, WHY_TOP, ACTIVE_COMPANY, type ScreenState } from "./data"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "./playback"
import { PlatformShell } from "./shell"
import { OportunidadesContent, type ScreenLayout } from "./screen-oportunidades"

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-mono text-xs font-medium tracking-label text-muted-foreground uppercase">{children}</h4>
}

/** Check desenhado (pathLength) na cor navy-600. Nunca ciano. */
function DrawnCheck({ hidden }: { hidden: boolean }) {
  return (
    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path data-a="check" d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray={1} strokeDashoffset={hidden ? 1 : 0} />
      </svg>
    </span>
  )
}

/** Painel lateral da empresa (tela C), sem a lista atrás. */
export function DetalheDrawer({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <DetalheBody key={key} state={state} layout={layout} />
}

function DetalheBody({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"

  // 04-motion.md §5.3 (cerca de 2,1 s)
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=seal]", { opacity: [0, 1] }, { at: 0.1, duration: 0.3, ease: EASE_OUT }],
      ["[data-a=seal-bar]", { scaleX: [0, 0.92] }, { at: 0.1, duration: 0.8, ease: EASE_OUT }],
      ["[data-a=row]", { opacity: [0, 1], y: [4, 0] }, { at: 0.3, duration: 0.45, delay: stagger(0.04), ease: EASE_OUT }],
      ["[data-a=why-title]", { opacity: [0, 1] }, { at: 0.85, duration: 0.3 }],
      ["[data-a=check]", { strokeDashoffset: [1, 0] }, { at: 0.9, duration: 0.35, delay: stagger(0.1), ease: EASE_OUT }],
      ["[data-a=why]", { opacity: [0, 1], x: [-6, 0] }, { at: 1.1, duration: 0.4, delay: stagger(0.1), ease: EASE_OUT }],
      ["[data-a=signal]", { opacity: [0, 1], y: [8, 0] }, { at: 1.5, duration: 0.4, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=foot]", { opacity: [0, 1] }, { at: 1.8, duration: 0.3, ease: EASE_OUT }],
    ]
    return seq
  })

  const fade = pre(hidden)

  return (
    <div
      ref={scope}
      data-slot="screen-detalhe"
      className={cn("flex h-full flex-col bg-card text-card-foreground", canvas ? "px-8 pt-5 pb-5" : "p-4")}
    >
      {/* Cabeçalho */}
      <div data-a="head" style={pre(hidden, { y: 8 })} className="flex items-center gap-3.5">
        <CompanyAvatar name={ACTIVE_COMPANY} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className={cn("truncate font-heading font-normal", canvas ? "text-[1.375rem] leading-tight" : "text-lg")}>
            {ACTIVE_COMPANY}
          </h3>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            Jundiaí, SP
          </span>
        </div>
        {canvas && (
          <span className="flex size-8 items-center justify-center rounded-full text-muted-foreground">
            <XIcon className="size-4" />
          </span>
        )}
      </div>

      {/* Selo de aderência (navy-600, sem ciano) */}
      <div
        data-a="seal"
        style={fade}
        className={cn("flex items-center gap-4 rounded-lg bg-navy-50", canvas ? "mt-4 px-4 py-3" : "mt-4 px-3 py-2.5")}
      >
        <span className={cn("font-mono font-medium text-navy-900 tabular-nums", canvas ? "text-2xl" : "text-xl")}>
          <CountUp to={92} start={playing} instant={state === "final"} delay={0.1} />%
        </span>
        <span className="min-w-0 flex-1 text-sm leading-snug text-navy-700">de aderência ao perfil {PROFILE}</span>
        <span className={cn("block h-1.5 shrink-0 overflow-hidden rounded-full bg-navy-600/15", canvas ? "w-28" : "w-14")}>
          <span
            data-a="seal-bar"
            className="block h-full origin-left rounded-full bg-navy-600"
            style={{ transform: `scaleX(${hidden ? 0 : 0.92})` }}
          />
        </span>
      </div>

      {/* Dados cadastrais */}
      <div className="mt-4">
        <SectionTitle>Dados cadastrais</SectionTitle>
        <dl className={cn("mt-2.5 grid gap-x-6", canvas ? "grid-cols-3 gap-y-2" : "grid-cols-2 gap-y-2")}>
          {COMPANY_DATA.map((d) => (
            <div key={d.label} data-a="row" style={pre(hidden, { y: 4 })} className={cn("min-w-0", d.wide && "col-span-full")}>
              <dt className="text-xs text-muted-foreground">{d.label}</dt>
              <dd className={cn("font-medium", canvas ? "text-sm" : "text-[13px]", d.label === "CNPJ" && "font-mono tabular-nums")}>
                {d.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Separator className="my-3.5" />

      {/* Por que está no topo */}
      <div>
        <div data-a="why-title" style={fade}>
          <SectionTitle>Por que está no topo</SectionTitle>
        </div>
        <ul className="mt-2 flex flex-col gap-1">
          {WHY_TOP.map((w) => (
            <li key={w} className="flex items-start gap-2.5">
              <DrawnCheck hidden={hidden} />
              <span data-a="why" style={pre(hidden, { x: -6 })} className="text-sm leading-6">
                {w}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sinais de contexto */}
      <div className="mt-3.5">
        <div data-a="signal" style={pre(hidden, { y: 8 })}>
          <SectionTitle>Sinais de contexto</SectionTitle>
        </div>
        <ul className="mt-2 flex flex-col gap-1">
          {CONTEXT_SIGNALS.map((s) => (
            <li
              key={s}
              data-a="signal"
              style={pre(hidden, { y: 8 })}
              className="flex items-start gap-2.5 text-sm leading-6 text-foreground/90"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-navy-600" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Fontes + ações */}
      <div data-a="foot" style={fade} className="mt-auto pt-3">
        {/* nunca em Badge label/eyebrow (caixa alta): contém "fynd" */}
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">{SOURCES}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size={canvas ? "default" : "sm"} tabIndex={-1}>
            <MessageSquareTextIcon />
            Sugerir abordagem
          </Button>
          <Button variant="outline" size={canvas ? "default" : "sm"} tabIndex={-1}>
            <BookmarkIcon />
            Salvar na lista
          </Button>
        </div>
      </div>
    </div>
  )
}

/** Escurecimento sobre a lista enquanto o drawer está aberto (navy-900, 40%). */
export function DrawerOverlay({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("absolute inset-0 bg-navy-900/40", className)} />
}

/** Drawer posicionado à direita da área de conteúdo (canvas). */
export function DrawerFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute inset-y-0 right-0 w-[600px] border-l border-border shadow-lg", className)}>{children}</div>
  )
}

/** Tela C completa: lista A (estado final) com overlay e o drawer da Serra Azul por cima. */
export function ScreenDetalhe({ state }: { state: ScreenState }) {
  return (
    <PlatformShell active="Oportunidades" breadcrumb={["Perfis ideais", PROFILE, ACTIVE_COMPANY]}>
      <OportunidadesContent state="final" />
      <DrawerOverlay />
      <DrawerFrame>
        <DetalheDrawer state={state} />
      </DrawerFrame>
    </PlatformShell>
  )
}

