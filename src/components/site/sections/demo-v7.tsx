"use client"

import { useCallback, useRef, useState } from "react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { PlatformDemoV5, PlatformPanelV5, SCREEN_LABELS_V5 } from "@/components/site/platform-v5"
import { gsap, ScrollTrigger, useGSAP } from "@/components/site/motion/gsap"
import { Reveal } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V5 as ANCHORS, anchorOffsetV5, CTA_LABEL_V5 as CTA_LABEL } from "./anchors-v5"

type Step = 0 | 1 | 2
type ScreenState = "idle" | "play" | "final"

/*
 * Demo v7 = demo v5 sem a abertura ("Na prática", título, subtítulo e aviso de telas ilustrativas).
 *
 * Demo v5 (02-copy-v5 §5, 03-design-v5 §4 e §9): 3 etapas, Seu produto → Fit → Interessados.
 * Igual à v4 na timeline 0–3, nos labels e no snap. Mudam: o pin (mais curto, para a página caber
 * em ~10.000px; ver `PIN_SCROLL`), a abertura menor (a tese já foi dita na seção anterior), os textos laterais e a saída
 * em uma linha. Os aria-labels das telas vêm da plataforma (SCREEN_LABELS_V5).
 */
const STEPS = [
  {
    short: "Seu produto",
    label: "01 / 03 · SEU PRODUTO",
    title: "Você explica o que vende",
    text: "A Camila manda o CNPJ, o site e o catálogo. A fynd resume o que entendeu e propõe o perfil de quem costuma comprar. Ela aprova, e pronto.",
  },
  {
    short: "Fit",
    label: "02 / 03 · FIT",
    title: "A fynd começa a trabalhar",
    text: "Você vê quantas empresas têm o seu perfil, no Brasil todo. Nenhuma lista para a equipe trabalhar: a fynd aborda e identifica quem tem interesse.",
  },
  {
    short: "Interessados",
    label: "03 / 03 · INTERESSADOS",
    title: "Você recebe a oportunidade",
    text: "Cada empresa chega com contato, necessidade, interesse demonstrado e próximo passo. A partir daqui, a conversa é sua.",
  },
] as const

/*
 * Os dois modos são renderizados e o CSS mostra um deles, sem esperar a hidratação (CLS 0).
 * O pin só existe a partir de 1280px (08-qa-v5 I1): entre 1024 e 1279 a tela dentro do MacBook ficava com
 * ~517px e o texto dela com 5 a 6px. Nessa faixa vale a versão empilhada, com os painéis em tamanho real.
 * `PIN_MQ` (GSAP) e as duas classes abaixo (CSS) precisam dizer a mesma coisa: mude os três juntos.
 */
const PIN_MQ = "(min-width: 1280px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)"
const SHOW_WHEN_PINNED =
  "hidden [@media(min-width:1280px)_and_(min-height:680px)_and_(prefers-reduced-motion:no-preference)]:block"
const HIDE_WHEN_PINNED =
  "[@media(min-width:1280px)_and_(min-height:680px)_and_(prefers-reduced-motion:no-preference)]:hidden"

/**
 * Rolagem fixa do pin, em alturas de viewport. O design pede 2; 1,8 é o corte 1 do 03-design-v5 §0.1,
 * aplicado na etapa 6 porque o eyebrow e a legenda do hero levaram a página para além de 10.000px.
 */
const PIN_SCROLL = 1.8

export function DemoSectionV7() {
  return (
    <section id={ANCHORS.demo} data-theme="dark" className={cn("bg-navy-900", anchorOffsetV5)}>
      <div className={SHOW_WHEN_PINNED}>
        <PinnedDemo />
      </div>
      {/* Sem a abertura da v5, o respiro do topo fica com a versão empilhada (o palco fixo ocupa a tela toda). */}
      <div className={cn(HIDE_WHEN_PINNED, "pt-20 md:pt-24")}>
        <StackedDemo />
      </div>

      {/* Saída compacta: uma linha só em lg. Botão papel, nunca ciano. */}
      <SiteContainer className="dark pt-12 pb-20 text-foreground md:pb-24">
        <Reveal
          y={24}
          duration={0.8}
          className="mx-auto flex max-w-4xl flex-col items-center gap-6 border-t border-border pt-8 text-center lg:flex-row lg:justify-between lg:text-left"
        >
          <Text variant="h4" render={<p />} className="text-balance">
            Quer testar isso com o que a sua empresa vende?
          </Text>
          <a
            href={`#${ANCHORS.access}`}
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "shrink-0 max-sm:w-full")}
          >
            {CTA_LABEL}
          </a>
        </Reveal>
      </SiteContainer>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop largo: palco fixo, a timeline define `step` e `state`.     */
/* ------------------------------------------------------------------ */

function PinnedDemo() {
  const stageRef = useRef<HTMLDivElement>(null)
  const macRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const stepRef = useRef<Step>(0)
  const startedRef = useRef(false)
  const playedRef = useRef(new Set<Step>())
  const [view, setView] = useState<{ step: Step; state: ScreenState }>({ step: 0, state: "idle" })

  /** Cada tela toca uma vez por carregamento; ao voltar, aparece no estado final (sem exceção de replay na v5). */
  const goTo = useCallback((next: Step) => {
    if (startedRef.current && next === stepRef.current) return
    stepRef.current = next
    startedRef.current = true
    const state: ScreenState = playedRef.current.has(next) ? "final" : "play"
    playedRef.current.add(next)
    setView({ step: next, state })
  }, [])

  useGSAP(
    () => {
      const stage = stageRef.current
      const mac = macRef.current
      if (!stage || !mac) return
      const mm = gsap.matchMedia()

      mm.add(PIN_MQ, () => {
        const texts = gsap.utils.toArray<HTMLElement>("[data-demo-text]", stage)
        const fills = gsap.utils.toArray<HTMLElement>("[data-demo-fill]", stage)
        // A tela troca junto com a entrada do novo texto (0.12 antes do label), e não depois dele.
        const stepFromProgress = (p: number) => Math.min(2, Math.max(0, Math.floor(p * 3 + 0.12))) as Step

        gsap.set(texts.slice(1), { autoAlpha: 0, y: 12 })
        gsap.set(texts[0], { autoAlpha: 1, y: 0 })
        gsap.set(fills, { scaleY: 0, transformOrigin: "50% 0%" })

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            pin: true,
            start: "top top",
            end: () => "+=" + window.innerHeight * PIN_SCROLL,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // Scroll livre dentro de cada etapa; só ajusta quando para no meio de uma troca de texto
            // (o último quarto de cada etapa). "labelsDirectional" pulava etapas inteiras a cada giro da roda.
            snap: {
              snapTo: (p: number) => {
                const pos = p * 3
                const local = pos - Math.floor(pos)
                return local > 0.74 ? Math.min(1, Math.ceil(pos) / 3) : p
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
        // Respiro final: o pin não solta em cima do playback final.
        tl.to({}, { duration: 0.15 }, 2.85)
        tl.addLabel("end", 3)
        tlRef.current = tl

        // QA I2: a conversa da etapa 1 leva ~4s para se completar. O playback começa quando o MacBook entra
        // na viewport, e não quando o palco fixa: ao fixar, a tela já está andando (ou pronta).
        // Se a página abrir já além deste ponto, toca a etapa em que o pin estiver.
        ScrollTrigger.create({
          trigger: stage,
          start: "top 60%",
          once: true,
          onEnter: () => {
            if (!startedRef.current) goTo(stepFromProgress(tl.scrollTrigger?.progress ?? 0))
          },
        })

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
      {/* O palco (só em xl, ver `PIN_MQ`) sangra do container (até 100rem) e o texto é uma coluna fixa, para a tela passar de ~900px em 1440×900. */}
      <SiteContainer className="grid h-full grid-cols-[16rem_minmax(0,1fr)] content-center items-end gap-10 pt-16 xl:max-w-[100rem] xl:px-10">
        <div className="dark pb-4 text-foreground">
          <ol className="flex flex-col gap-1" aria-label="Etapas da demonstração">
            {STEPS.map((s, i) => {
              const isActive = i === step
              return (
                <li key={s.short}>
                  <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    // O nome acessível começa pelo texto visível ("1 Seu produto, etapa 1 de 3").
                    aria-label={`${i + 1} ${s.short}, etapa ${i + 1} de 3`}
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

          {/* QA I3: as 3 etapas completas para o leitor de tela, sem depender do scroll do pin. */}
          <ol className="sr-only">
            {STEPS.map((s, i) => (
              <li key={s.label}>
                Etapa {i + 1} de 3, {s.short}: {s.title}. {s.text}
              </li>
            ))}
          </ol>

          <p className="sr-only" aria-live="polite">
            {state !== "idle" ? `Etapa ${step + 1} de 3: ${current.title}` : ""}
          </p>

          <div className="mt-12 grid" aria-hidden="true">
            {STEPS.map((s, i) => {
              const isActive = i === step
              return (
                <div
                  key={s.label}
                  data-demo-text
                  inert={!isActive}
                  // QA M4: antes da hidratação só o primeiro texto aparece; depois o GSAP assume o autoAlpha.
                  className={cn("[grid-area:1/1]", i > 0 && "invisible")}
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

        <div>
          <div ref={macRef} className="mx-auto w-full max-w-[min(100%,calc((100svh-10rem)*1.45))] will-change-transform">
            <MacBook label={SCREEN_LABELS_V5[step]}>
              <PlatformDemoV5 step={step} state={state} />
            </MacBook>
          </div>
        </div>
      </SiteContainer>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Abaixo de 1280px, notebook baixo e movimento reduzido: empilhadas.  */
/* ------------------------------------------------------------------ */

function StackedDemo() {
  return (
    <SiteContainer className="space-y-20">
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

          {/* O PlatformPanelV5 traz o poço de tela e o role="img" com o aria-label da etapa; toca ao entrar na viewport. */}
          <div className="col-span-full lg:col-span-8">
            <PlatformPanelV5 step={i as Step} />
          </div>
        </Reveal>
      ))}
    </SiteContainer>
  )
}
