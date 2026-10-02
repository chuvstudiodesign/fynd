"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MacBook } from "@/components/site/macbook"
import { HeroScreen } from "@/components/site/platform"
import { gsap, MQ, useGSAP, EASE_OUT, type MQConditions } from "@/components/site/motion/gsap"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS, CTA_LABEL } from "./anchors"

const MOCKUP_LABEL =
  "Tela de oportunidades da fynd: lista de empresas ordenadas por aderência ao perfil ideal, com Serra Azul Alimentos no topo, com 92%."

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const macRef = useRef<HTMLDivElement>(null)
  const lidRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const macInView = useInView(macRef, { once: true, amount: 0.2 })
  const [play, setPlay] = useState(false)

  // A cascata dos cards começa 0,6 s depois da entrada do MacBook (0,25 s de atraso + ~0,6 s).
  useEffect(() => {
    if (!macInView) return
    const t = window.setTimeout(() => setPlay(true), reduce ? 0 : 850)
    return () => window.clearTimeout(t)
  }, [macInView, reduce])

  // Scrub da tampa: inclinada → frontal e plana. Só GSAP toca neste nó.
  useGSAP(
    () => {
      const lid = lidRef.current
      const mac = macRef.current
      if (!lid || !mac) return
      const mm = gsap.matchMedia()
      mm.add(MQ, (ctx) => {
        const { full, compact } = ctx.conditions as MQConditions
        if (!full && !compact) {
          gsap.set(lid, { clearProps: "transform" })
          return
        }
        gsap.fromTo(
          lid,
          {
            rotateX: full ? 14 : 8,
            scale: full ? 0.94 : 0.97,
            y: 0,
            transformOrigin: "50% 100%", // a perspectiva (1600px) vem do container do MacBook
            willChange: "transform",
          },
          {
            rotateX: 0,
            scale: 1,
            y: full ? -24 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: mac,
              start: full ? "top 85%" : "top 90%",
              end: full ? "top 25%" : "top 50%",
              scrub: 0.6,
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id={ANCHORS.top}
      data-theme="dark"
      className="relative min-h-[100svh] overflow-x-clip bg-navy-900"
    >
      <SiteContainer className={cn(siteGrid, "pt-[calc(64px+96px)] pb-12 md:pt-[calc(64px+128px)]")}>
        <RevealGroup
          onMount
          gap={0.08}
          startDelay={0.1}
          className="dark col-span-full mx-auto flex max-w-3xl flex-col items-center text-center text-foreground"
        >
          {/* O hero nunca começa invisível (nem antes da hidratação): os itens só transladam. */}
          <RevealItem y={16} fade={false}>
            <Text variant="eyebrow">PROSPECÇÃO B2B COM CONTEXTO</Text>
          </RevealItem>
          {/* H1 é o provável LCP: só translada, nunca começa invisível */}
          <RevealItem y={12} duration={0.9} fade={false} className="mt-4 lg:mt-5">
            <Text variant="display" render={<h1 />} className="mx-auto max-w-[14ch]">
              Saiba para quem vender agora.
            </Text>
          </RevealItem>
          <RevealItem y={16} fade={false} className="mt-5 md:mt-6">
            <Text variant="lead" className="mx-auto max-w-[36rem]">
              Conte quem é o seu cliente ideal. A fynd encontra as empresas com maior potencial de compra, mostra por
              que cada uma faz sentido e sugere o primeiro contato.
            </Text>
          </RevealItem>
          <RevealItem y={16} fade={false} className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
            <a href={`#${ANCHORS.access}`} className={buttonVariants({ variant: "default", size: "lg" })}>
              {CTA_LABEL}
            </a>
            <a href={`#${ANCHORS.demo}`} className={buttonVariants({ variant: "outline", size: "lg" })}>
              Ver como funciona
            </a>
          </RevealItem>
          <RevealItem y={16} fade={false} className="mt-4">
            <p className="text-sm text-muted-foreground">Sem implantação longa. Você começa com uma conversa.</p>
          </RevealItem>
        </RevealGroup>

        {/* Wrapper externo: entrada com Motion (só translada, visível desde o HTML). A tampa (lidRef) é animada só pelo GSAP. */}
        <motion.div
          ref={macRef}
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
          className="col-span-full mt-16 w-full max-md:-mx-[6%] max-md:w-[112%] md:mx-auto md:max-w-[1080px] lg:col-span-10 lg:col-start-2 lg:mt-20"
        >
          <MacBook lidRef={lidRef} label={MOCKUP_LABEL}>
            <HeroScreen play={play} />
          </MacBook>
        </motion.div>
      </SiteContainer>
    </section>
  )
}
