"use client"

// Rota temporária do Engenheiro P: verifica o MacBook e as telas da plataforma isoladamente.

import { use, useState } from "react"
import { MacBook } from "@/components/site/macbook"
import {
  HeroScreen,
  MiniAbordagem,
  MiniConversa,
  MiniLista,
  NoiseList,
  PlatformDemo,
  PlatformPanel,
  SCREEN_LABELS,
  ScreenAbordagem,
  ScreenConversa,
  ScreenDetalhe,
  ScreenOportunidades,
  type DemoStep,
  type ScreenState,
} from "@/components/site/platform"
import { ScrollReveal } from "@/components/site/reactbits/scroll-reveal"
import { CopyButton } from "@/components/site/cult/copy-button"
import { Button } from "@/components/ui/button"

const STATES: ScreenState[] = ["idle", "play", "final"]
const STEPS: DemoStep[] = [0, 1, 2, 3]
const STEP_NAMES = ["Conversa", "Prioridades", "Contexto", "Abordagem"]

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
    <div className="flex gap-1">
      {options.map((o, i) => (
        <Button key={String(o)} size="sm" variant={o === value ? "default" : "outline"} onClick={() => onChange(o)}>
          {labels?.[i] ?? String(o)}
        </Button>
      ))}
    </div>
  )
}

export default function PlatformDemoPage({ searchParams }: PageProps<"/demos/platform">) {
  // ?step=0..3&state=idle|play|final&solo=1 (solo mostra só o MacBook da demo, para captura)
  const sp = use(searchParams)
  const [step, setStep] = useState<DemoStep>((Number(sp.step) || 0) as DemoStep)
  const [state, setState] = useState<ScreenState>((sp.state as ScreenState) || "idle")
  const [heroPlay, setHeroPlay] = useState(false)
  const [heroKey, setHeroKey] = useState(0)
  const [miniState, setMiniState] = useState<ScreenState | undefined>(undefined)
  const [single, setSingle] = useState<ScreenState>("final")
  if (sp.solo) {
    return (
      <div className="min-h-svh bg-navy-900 p-10">
        <MacBook className="mx-auto max-w-[1300px]" label={SCREEN_LABELS[step]}>
          <PlatformDemo step={step} state={state} />
        </MacBook>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-navy-900 pb-40 text-paper-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-24 px-5 pt-16 sm:px-8 lg:px-12 xl:px-16">
        {/* Demo com step + state */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h1 className="text-3xl">PlatformDemo</h1>
            <Segmented value={step} options={STEPS} labels={STEP_NAMES} onChange={setStep} />
            <Segmented value={state} options={STATES} onChange={setState} />
          </div>
          <MacBook className="mx-auto max-w-[900px]" label={SCREEN_LABELS[step]}>
            <PlatformDemo step={step} state={state} />
          </MacBook>
        </section>

        {/* Hero */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">HeroScreen</h2>
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
          <MacBook className="mx-auto max-w-[1080px]" label={SCREEN_LABELS.hero}>
            <HeroScreen key={heroKey} play={heroPlay} />
          </MacBook>
        </section>

        {/* Telas isoladas */}
        <section className="flex flex-col gap-8">
          <div className="dark flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">Telas A–D isoladas</h2>
            <Segmented value={single} options={STATES} onChange={setSingle} />
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <MacBook label={SCREEN_LABELS[0]}>
              <ScreenConversa state={single} />
            </MacBook>
            <MacBook label={SCREEN_LABELS[1]}>
              <ScreenOportunidades state={single} />
            </MacBook>
            <MacBook label={SCREEN_LABELS[2]}>
              <ScreenDetalhe state={single} />
            </MacBook>
            <MacBook label={SCREEN_LABELS[3]}>
              <ScreenAbordagem state={single} />
            </MacBook>
          </div>
        </section>

        {/* Painéis mobile */}
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl">PlatformPanel (mobile, toca ao entrar na viewport)</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s} className="mx-auto w-full max-w-[360px]">
                <PlatformPanel step={s} />
              </div>
            ))}
          </div>
        </section>

        {/* Seção 2 */}
        <section className="flex flex-col gap-8">
          <div className="dark">
            <ScrollReveal className="font-heading text-4xl font-light tracking-display md:text-[3.5rem]" emphasisFrom={3}>
              Mais dados não resolvem. Clareza resolve.
            </ScrollReveal>
          </div>
          <NoiseList className="mx-auto w-full max-w-[720px]" />
        </section>

        {/* Seção 3 */}
        <section className="-mx-5 flex flex-col gap-8 bg-paper-100 px-5 py-16 text-navy-900 sm:-mx-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-3xl">Mini-UIs</h2>
            <Segmented
              value={miniState ?? "auto"}
              options={["auto", ...STATES]}
              onChange={(v) => setMiniState(v === "auto" ? undefined : (v as ScreenState))}
            />
            <CopyButton value="Mensagem de teste" />
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[MiniConversa, MiniLista, MiniAbordagem].map((Mini, i) => (
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
