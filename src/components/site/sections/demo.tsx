"use client"

import { useCallback, useRef, useState } from "react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { PlatformDemo, PlatformPanel } from "@/components/site/platform"
import { gsap, MQ, useGSAP, type MQConditions } from "@/components/site/motion/gsap"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS, CTA_LABEL } from "./anchors"

type Step = 0 | 1 | 2 | 3
type ScreenState = "idle" | "play" | "final"

const STEPS = [
  {
    short: "Conversa",
    label: "01 / 04 · CONVERSA",
    title: "Comece pelo seu cliente ideal",
    text: "Explique quem você quer atender, do seu jeito. A fynd transforma a conversa em critérios claros que você pode ajustar.",
    screenLabel:
      "Tela de conversa da fynd: a Camila descreve o cliente ideal e a fynd devolve os critérios de setor, região, porte e sinal.",
  },
  {
    short: "Prioridades",
    label: "02 / 04 · PRIORIDADES",
    title: "As empresas certas, na ordem certa",
    text: "A fynd cruza o seu perfil com bases empresariais e coloca no topo as empresas com maior potencial.",
    screenLabel:
      "Tela de oportunidades da fynd: empresas ordenadas por aderência ao perfil Indústria Sudeste, com Serra Azul Alimentos no topo, com 92%.",
  },
  {
    short: "Contexto",
    label: "03 / 04 · CONTEXTO",
    title: "Saiba por que antes de ligar",
    text: "Cada empresa mostra os critérios que atende, os sinais encontrados e a fonte de cada dado. Você investe a ligação com segurança.",
    screenLabel:
      "Detalhe da Serra Azul Alimentos na fynd: dados cadastrais, critérios atendidos, sinais de contexto e a fonte de cada dado.",
  },
  {
    short: "Abordagem",
    label: "04 / 04 · ABORDAGEM",
    title: "Um primeiro contato que faz sentido",
    text: "Receba uma sugestão de mensagem a partir do contexto da empresa. Você revisa, ajusta e envia pelo seu canal.",
    screenLabel:
      "Sugestão de primeiro contato da fynd para a Serra Azul Alimentos, com o ponto de conexão destacado: a nova filial.",
  },
] as const

/*
 * Os dois modos são renderizados e o CSS mostra um deles, sem esperar a hidratação (CLS 0).
 * A media query é a mesma do `MQ.full` do GSAP; só nela existe o pin.
 */
const SHOW_WHEN_PINNED =
  "hidden [@media(min-width:1024px)_and_(min-height:680px)_and_(prefers-reduced-motion:no-preference)]:block"
const HIDE_WHEN_PINNED =
  "[@media(min-width:1024px)_and_(min-height:680px)_and_(prefers-reduced-motion:no-preference)]:hidden"

export function DemoSection() {
  return (
    <section id={ANCHORS.demo} data-theme="dark" className="bg-navy-900">
      <SiteContainer className="dark pt-24 pb-16 text-center text-foreground md:pt-32 lg:pt-40 lg:pb-20">
        <RevealGroup className="mx-auto flex max-w-3xl flex-col items-center">
          <RevealItem y={16} duration={0.7}>
            <Text variant="eyebrow">NA PRÁTICA</Text>
          </RevealItem>
          <RevealItem y={16} duration={0.7}>
            <Text variant="h1" render={<h2 />} className="mx-auto mt-4 max-w-[22ch] lg:mt-5">
              Uma manhã de prospecção em quatro telas.
            </Text>
          </RevealItem>
          <RevealItem y={16} duration={0.7}>
            <Text variant="lead" className="mx-auto mt-5 max-w-[36rem] md:mt-6">
              Acompanhe a Camila, da Lumi Embalagens, encontrando as próximas contas para o time.
            </Text>
          </RevealItem>
        </RevealGroup>
      </SiteContainer>

      <div className={SHOW_WHEN_PINNED}>
        <PinnedDemo />
      </div>
      <div className={HIDE_WHEN_PINNED}>
        <StackedDemo />
      </div>

      <SiteContainer className="dark pt-16 pb-24 text-center text-foreground md:pb-32 lg:pt-20 lg:pb-40">
        <Reveal y={24} duration={0.8} className="flex flex-col items-center gap-8">
          <Text variant="h3" render={<p />} className="mx-auto max-w-[22ch] text-balance">
            Pronto para ver isso com o seu cliente ideal?
          </Text>
          <a href={`#${ANCHORS.access}`} className={buttonVariants({ variant: "default", size: "lg" })}>
            {CTA_LABEL}
          </a>
        </Reveal>
      </SiteContainer>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: palco fixo por ~300vh, a timeline define `step` e `state`. */
/* ------------------------------------------------------------------ */

function PinnedDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const macRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const stepRef = useRef<Step>(0)
  const startedRef = useRef(false)
  const playedRef = useRef(new Set<Step>())
  const [view, setView] = useState<{ step: Step; state: ScreenState }>({ step: 0, state: "idle" })

  /**
   * Cada tela toca uma vez por carregamento; ao voltar, aparece no estado final.
   * Exceção (04-motion §5): a reordenação da etapa 2 toca de novo quando se desce da etapa 1.
   */
  const goTo = useCallback((next: Step) => {
    if (startedRef.current && next === stepRef.current) return
    const prev = stepRef.current
    stepRef.current = next
    startedRef.current = true
    let state: ScreenState = "final"
    if (!playedRef.current.has(next)) {
      playedRef.current.add(next)
      state = "play"
    } else if (next === 1 && prev === 0) {
      state = "play"
    }
    setView({ step: next, state })
  }, [])

  useGSAP(
    () => {
      const stage = stageRef.current
      const mac = macRef.current
      if (!stage || !mac) return
      const mm = gsap.matchMedia()

      mm.add(MQ, (ctx) => {
        const { full } = ctx.conditions as MQConditions
        if (!full) return

        const texts = gsap.utils.toArray<HTMLElement>("[data-demo-text]", stage)
        const fills = gsap.utils.toArray<HTMLElement>("[data-demo-fill]", stage)
        // A tela troca junto com a entrada do novo texto (0.12 antes do label), e não depois dele.
        const stepFromProgress = (p: number) => Math.min(3, Math.max(0, Math.floor(p * 4 + 0.12))) as Step

        gsap.set(texts.slice(1), { autoAlpha: 0, y: 12 })
        gsap.set(texts[0], { autoAlpha: 1, y: 0 })
        gsap.set(fills, { scaleY: 0, transformOrigin: "50% 0%" })

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            pin: true,
            start: "top top",
            end: () => "+=" + window.innerHeight * 3,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // Scroll livre dentro de cada etapa; só ajusta quando para no meio de uma troca de texto
            // (o último quarto de cada etapa). "labelsDirectional" pulava etapas inteiras a cada giro da roda.
            snap: {
              snapTo: (p: number) => {
                const pos = p * 4
                const local = pos - Math.floor(pos)
                return local > 0.74 ? Math.min(1, Math.ceil(pos) / 4) : p
              },
              // Sem inércia: a velocidade projetada (medida na timeline com scrub) fazia um clique de roda pular etapas.
              inertia: false,
              duration: { min: 0.2, max: 0.5 },
              delay: 0.15,
              ease: "power1.inOut",
            },
            onToggle: (self) => {
              if (self.isActive && !startedRef.current) goTo(stepFromProgress(self.progress))
            },
            onUpdate: (self) => {
              if (!startedRef.current) return
              const next = stepFromProgress(self.progress)
              if (next !== stepRef.current) goTo(next)
            },
          },
        })

        // Sai um texto, depois entra o outro, e a troca termina no label: no ponto de snap nunca há dois textos sobrepostos.
        const swap = (from: number, to: number, at: number) => {
          tl.to(texts[from], { autoAlpha: 0, y: -12, duration: 0.12, ease: "power2.in" }, at - 0.24)
          tl.fromTo(texts[to], { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, at - 0.12)
        }

        tl.addLabel("step1", 0)
        tl.to(fills[0], { scaleY: 1, duration: 0.85 }, 0)
        swap(0, 1, 1)
        tl.addLabel("step2", 1)
        tl.to(fills[1], { scaleY: 1, duration: 0.85 }, 1)
        swap(1, 2, 2)
        tl.addLabel("step3", 2)
        tl.to(fills[2], { scaleY: 1, duration: 0.85 }, 2)
        swap(2, 3, 3)
        tl.addLabel("step4", 3)
        tl.to(fills[3], { scaleY: 1, duration: 0.85 }, 3)
        // Respiro final: o pin não solta em cima da última troca.
        tl.to({}, { duration: 0.15 }, 3.85)
        tl.addLabel("end", 4)
        tlRef.current = tl

        // Entrada do MacBook antes do pin (criada depois do pin, para medir com o espaçador).
        gsap.fromTo(
          mac,
          { y: 48, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: stage, start: "top 90%", end: "top top", scrub: 0.6 },
          }
        )

        return () => {
          tlRef.current = null
        }
      })
    },
    { scope: stageRef, dependencies: [goTo] }
  )

  const jumpTo = (i: number) => {
    const st = tlRef.current?.scrollTrigger
    if (!st) return
    window.scrollTo({ top: st.labelToScroll(`step${i + 1}`), behavior: "smooth" })
  }

  const { step, state } = view
  const current = STEPS[step]

  return (
    <div ref={stageRef} className="h-svh">
      <SiteContainer className="grid h-full grid-cols-12 content-center items-end gap-8 pt-16">
        <div className="dark col-span-4 pb-4 text-foreground">
          <ol className="flex flex-col gap-1" aria-label="Etapas da demonstração">
            {STEPS.map((s, i) => {
              const isActive = i === step
              return (
                <li key={s.short}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`Etapa ${i + 1} de 4: ${s.short}`}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group/step flex w-full items-stretch gap-4 rounded-sm py-1.5 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      "font-mono text-xs font-medium tracking-label uppercase transition-colors duration-200",
                      isActive ? "text-paper-50" : "text-steel-400 hover:text-steel-300"
                    )}
                  >
                    <span aria-hidden="true" className="relative w-0.5 shrink-0 overflow-hidden rounded-full bg-steel-700">
                      <span data-demo-fill className="absolute inset-0 origin-top bg-paper-50" />
                    </span>
                    <span className="py-1">
                      {i + 1} {s.short}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <p className="sr-only" aria-live="polite">
            {state !== "idle" ? `Etapa ${step + 1} de 4: ${current.title}` : ""}
          </p>

          <div className="mt-12 grid">
            {STEPS.map((s, i) => {
              const isActive = i === step
              return (
                <div
                  key={s.label}
                  data-demo-text
                  aria-hidden={!isActive || undefined}
                  inert={!isActive}
                  className="[grid-area:1/1]"
                >
                  <Text variant="eyebrow">{s.label}</Text>
                  <Text variant="h3" className="mt-4 text-foreground">
                    {s.title}
                  </Text>
                  <Text className="mt-4 max-w-[28ch] text-steel-300">{s.text}</Text>
                </div>
              )
            })}
          </div>
        </div>

        <div className="col-span-8">
          <div ref={macRef} className="mx-auto w-full max-w-[min(100%,calc((100svh-10rem)*1.45))] will-change-transform">
            <MacBook label={current.screenLabel}>
              <PlatformDemo step={step} state={state} />
            </MacBook>
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile, notebook baixo e movimento reduzido: etapas empilhadas.     */
/* ------------------------------------------------------------------ */

function StackedDemo() {
  return (
    <SiteContainer className="space-y-24">
      {STEPS.map((s, i) => (
        <Reveal key={s.label} y={16} duration={0.7} amount={0.15} className={cn(siteGrid, "gap-y-8 lg:items-center")}>
          <div className="dark col-span-full text-foreground lg:col-span-4">
            <div aria-hidden="true" className="mb-6 flex gap-1.5">
              {STEPS.map((_, j) => (
                <span key={j} className={cn("h-0.5 w-6 rounded-full", j === i ? "bg-paper-50" : "bg-steel-700")} />
              ))}
            </div>
            <Text variant="eyebrow">{s.label}</Text>
            <Text variant="h3" className="mt-4 text-foreground">
              {s.title}
            </Text>
            <Text className="mt-4 max-w-[36rem] text-steel-300">{s.text}</Text>
          </div>

          {/* O PlatformPanel já traz o poço de tela (barra + borda) e o role="img" com o aria-label da etapa. */}
          <div className="col-span-full lg:col-span-8">
            <PlatformPanel step={i as Step} />
          </div>
        </Reveal>
      ))}
    </SiteContainer>
  )
}
