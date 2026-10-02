"use client"

// Rota temporária do Engenheiro P3: verifica a plataforma v3 isoladamente (cada step × cada state num MacBook).
// ?solo=1&step=0..3&state=idle|play|final mostra só um MacBook grande, para captura.
// ?view=hero | panels | minis isola um bloco.

import { use, useState } from "react"
import { MacBook } from "@/components/site/macbook"
import {
  HeroScreenV3,
  MiniContaV3,
  MiniEncontraV3,
  MiniFechaV3,
  PlatformDemoV3,
  PlatformPanelV3,
  SCREEN_LABELS_V3,
  type DemoStepV3,
  type ScreenState,
} from "@/components/site/platform-v3"
import { Button } from "@/components/ui/button"

const STATES: ScreenState[] = ["idle", "play", "final"]
const STEPS: DemoStepV3[] = [0, 1, 2, 3]
const STEP_NAMES = ["Conversa", "Fit", "Primeiro contato", "Interessados"]

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  labels,
}: {
  value: T
  options: T[]
  onChange: (v: T) => void
  labels?: string[]
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o, i) => (
        <Button key={String(o)} size="sm" variant={o === value ? "default" : "outline"} onClick={() => onChange(o)}>
          {labels?.[i] ?? String(o)}
        </Button>
      ))}
    </div>
  )
}

export default function PlatformV3DemoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = use(searchParams)
  const [step, setStep] = useState<DemoStepV3>((Number(sp.step) || 0) as DemoStepV3)
  const [state, setState] = useState<ScreenState>((sp.state as ScreenState) || "idle")
  const [gridState, setGridState] = useState<ScreenState>("final")
  const [gridKey, setGridKey] = useState(0)
  const [heroPlay, setHeroPlay] = useState(sp.view === "hero")
  const [heroKey, setHeroKey] = useState(0)
  const [miniState, setMiniState] = useState<ScreenState | undefined>(undefined)

  if (sp.solo) {
    return (
      <div className="min-h-svh bg-navy-900 p-10">
        <MacBook className="mx-auto max-w-[1300px]" label={SCREEN_LABELS_V3[step]}>
          <PlatformDemoV3 step={step} state={state} />
        </MacBook>
      </div>
    )
  }
  if (sp.view === "hero") {
    return (
      <div className="min-h-svh bg-navy-900 p-10">
        <MacBook className="mx-auto max-w-[1300px]" label={SCREEN_LABELS_V3.hero}>
          <HeroScreenV3 play={heroPlay} />
        </MacBook>
      </div>
    )
  }
  if (sp.view === "panels") {
    return (
      <div className="min-h-svh bg-paper-100 p-6">
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s} className="mx-auto w-full max-w-[360px]">
              <PlatformPanelV3 step={s} state={(sp.state as ScreenState) || undefined} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (sp.view === "minis") {
    return (
      <div className="min-h-svh bg-paper-100 p-10 text-navy-900">
        <div className="grid gap-8 lg:grid-cols-3">
          {[MiniContaV3, MiniEncontraV3, MiniFechaV3].map((Mini, i) => (
            <div key={i} className="rounded-xl border border-border bg-paper-50 p-6 lg:p-8">
              <Mini state={(sp.state as ScreenState) || undefined} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-navy-900 pb-40 text-paper-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-5 pt-16 sm:px-8 lg:px-12 xl:px-16">
        {/* Demo com step + state */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h1 className="text-3xl">PlatformDemoV3</h1>
            <Segmented value={step} options={STEPS} labels={STEP_NAMES} onChange={setStep} />
            <Segmented value={state} options={STATES} onChange={setState} />
          </div>
          <MacBook className="mx-auto max-w-[900px]" label={SCREEN_LABELS_V3[step]}>
            <PlatformDemoV3 step={step} state={state} />
          </MacBook>
        </section>

        {/* Grade: cada step × cada state */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">Cada step × cada state</h2>
            <Button size="sm" variant="outline" onClick={() => setGridKey((k) => k + 1)}>
              Remontar
            </Button>
            <Segmented value={gridState} options={STATES} onChange={setGridState} />
          </div>
          <div key={gridKey} className="grid gap-12 lg:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s} className="flex flex-col gap-3">
                <span className="font-mono text-xs tracking-label text-steel-300 uppercase">
                  {STEP_NAMES[s]} · {gridState}
                </span>
                <MacBook label={SCREEN_LABELS_V3[s]}>
                  <PlatformDemoV3 step={s} state={gridState} />
                </MacBook>
              </div>
            ))}
          </div>
        </section>

        {/* Hero */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">HeroScreenV3</h2>
            <Button
              size="sm"
              onClick={() => {
                setHeroKey((k) => k + 1)
                setHeroPlay(true)
              }}
            >
              play
            </Button>
            <Button size="sm" variant="outline" onClick={() => setHeroPlay(false)}>
              idle
            </Button>
          </div>
          <MacBook className="mx-auto max-w-[1080px]" label={SCREEN_LABELS_V3.hero}>
            <HeroScreenV3 key={heroKey} play={heroPlay} />
          </MacBook>
        </section>

        {/* Painéis mobile */}
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl">PlatformPanelV3 (mobile, toca ao entrar na viewport)</h2>
          <div className="grid items-start gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s} className="mx-auto w-full max-w-[360px]">
                <PlatformPanelV3 step={s} />
              </div>
            ))}
          </div>
        </section>

        {/* Mini-recortes da seção 3 */}
        <section className="-mx-5 flex flex-col gap-8 bg-paper-100 px-5 py-16 text-navy-900 sm:-mx-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">Mini-recortes v3</h2>
            <Segmented
              value={miniState ?? "auto"}
              options={["auto", ...STATES]}
              onChange={(v) => setMiniState(v === "auto" ? undefined : (v as ScreenState))}
            />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[MiniContaV3, MiniEncontraV3, MiniFechaV3].map((Mini, i) => (
              <div key={i} className="rounded-xl border border-border bg-paper-50 p-6 lg:p-8">
                <Mini state={miniState} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
