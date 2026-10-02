"use client"

import { useRef } from "react"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { NoiseListV3 } from "@/components/site/platform-v3"
import { gsap, MQ, SplitText, useGSAP, type MQConditions } from "@/components/site/motion/gsap"
import { Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"

const PAINS = [
  {
    title: "Mailing comprado, contato frio",
    text: "Você compra uma lista, liga para metade dela e descobre que a empresa mudou, fechou ou nunca teve perfil. Quem atende não estava esperando você.",
  },
  {
    title: "Sem estrutura para prospectar",
    text: "Abrir um canal de prospecção ativa pede contratar, treinar e montar um processo. Numa empresa pequena, isso trava antes de começar.",
  },
  {
    title: "Formulário que ninguém sabe responder",
    text: "Setor, porte, cargo, persona, dor. Pedem que você descreva o seu cliente ideal antes de mostrar qualquer resultado, e quase ninguém sabe isso de cabeça.",
  },
]

export function ProblemSectionV3() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const litRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const title = titleRef.current
      const listWrap = listRef.current
      const mm = gsap.matchMedia()

      mm.add(MQ, (ctx) => {
        const { full, compact, reduce } = ctx.conditions as MQConditions
        const lit = litRef.current
        const others = listWrap ? gsap.utils.toArray<HTMLElement>("[data-noise-row]", listWrap) : []
        const bar = lit?.querySelector<HTMLElement>("[data-slot=opportunity-card-signal]") ?? null

        if (reduce || (!full && !compact)) {
          // Estado final, sem ScrollTrigger: 5 linhas apagadas, a iluminada em destaque.
          gsap.set(others, { opacity: 0.35 })
          return
        }

        // Título lido por palavra conforme o scroll.
        if (title) {
          SplitText.create(title, {
            type: "words",
            aria: "auto",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.15 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: title, start: "top 80%", end: "top 35%", scrub: 0.6 },
                }
              ),
          })
        }

        // Lista cinza → uma linha iluminada.
        if (lit && listWrap && others.length) {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: listWrap, start: "top 75%", end: "center 45%", scrub: 0.6 },
          })
          tl.fromTo(others, { opacity: 0.9 }, { opacity: 0.35, duration: 1 }, 0)
          tl.fromTo(lit, { opacity: 0.9, x: 0 }, { opacity: 1, x: 4, duration: 1 / 3 }, 2 / 3)
          if (bar) tl.fromTo(bar, { scaleY: 0, transformOrigin: "50% 50%" }, { scaleY: 1, duration: 1 / 3 }, 2 / 3)
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} data-theme="dark" className={cn("bg-navy-900", sectionY)}>
      <SiteContainer>
        <div className="dark text-foreground">
          <div className={siteGrid}>
            <div className="col-span-full lg:col-span-8">
              <Reveal>
                <Text variant="eyebrow">O DIA A DIA DE QUEM VENDE</Text>
              </Reveal>
              <Text
                ref={titleRef}
                variant="h1"
                render={<h2 />}
                className="mt-4 max-w-[22ch] lg:mt-5"
              >
                Mais lista não resolve. Interesse resolve.
              </Text>
              <Reveal className="mt-5 md:mt-6">
                <Text variant="lead" className="max-w-[36rem]">
                  Encontrar empresas com perfil é metade do trabalho. A outra metade é descobrir quem quer conversar, e é aí que a
                  prospecção trava.
                </Text>
              </Reveal>
            </div>
          </div>

          <RevealGroup gap={0.1} amount={0.25} className="mt-12 grid gap-10 md:mt-16 lg:mt-20 lg:grid-cols-3 lg:gap-8">
            {PAINS.map((pain, i) => (
              <RevealItem key={pain.title} className="border-t border-border pt-6">
                <Text variant="eyebrow">{String(i + 1).padStart(2, "0")}</Text>
                <Text variant="h4" render={<h3 />} className="mt-3 text-foreground">
                  {pain.title}
                </Text>
                <Text className="mt-3 max-w-[36rem] text-steel-300">{pain.text}</Text>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Fora do `.dark`: a linha iluminada é um card de interessado no tema claro. */}
        <div className={cn(siteGrid, "mt-16 md:mt-20 lg:mt-24")}>
          <div ref={listRef} className="col-span-full lg:col-span-8 lg:col-start-3" aria-hidden="true">
            <NoiseListV3 litRef={litRef} />
          </div>
        </div>

        <Reveal y={12} className="dark mt-16 text-center text-foreground">
          <Text variant="h3" render={<p />} className="mx-auto max-w-[22ch] text-balance">
            Menos lista fria. Mais empresas interessadas.
          </Text>
        </Reveal>
      </SiteContainer>
    </section>
  )
}
