"use client"

// Adaptado de React Bits (reactbits.dev), MIT + Commons Clause, © David Haz
// Reescrito com useGSAP (escopo próprio: não mata os ScrollTriggers de outras seções),
// HTML válido (spans dentro do título), sem rotação e sem blur, só opacidade,
// tipografia do design system e `gsap.matchMedia` para movimento reduzido.

import { useRef, type ElementType } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export interface ScrollRevealProps {
  /** A frase. Só texto: ela é quebrada em palavras. */
  children: string
  /** Elemento do título. Padrão `h2`. */
  as?: ElementType
  className?: string
  /** Opacidade inicial de cada palavra. Padrão 0.15. */
  baseOpacity?: number
  /** Início e fim do scrub (sintaxe do ScrollTrigger). */
  start?: string
  end?: string
  /** Suavização do scrub. Padrão 0.6. */
  scrub?: number
  /** Stagger entre palavras dentro do tween. Padrão 0.1. */
  stagger?: number
  /**
   * Índice da primeira palavra "de chegada" (p. ex. "Clareza resolve."). Essas palavras ficam em
   * `muted-foreground` durante o scrub e passam a `foreground` quando ele termina.
   */
  emphasisFrom?: number
}

export function ScrollReveal({
  children,
  as = "h2",
  className,
  baseOpacity = 0.15,
  start = "top 80%",
  end = "top 35%",
  scrub = 0.6,
  stagger = 0.1,
  emphasisFrom,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const words = children.split(/\s+/).filter(Boolean)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = el.querySelectorAll<HTMLElement>("[data-word]")
        el.dataset.revealed = "false"
        gsap.fromTo(
          targets,
          { opacity: baseOpacity },
          {
            opacity: 1,
            ease: "none",
            stagger,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              onLeave: () => (el.dataset.revealed = "true"),
              onEnterBack: () => (el.dataset.revealed = "false"),
            },
          }
        )
        return () => {
          el.dataset.revealed = "true"
        }
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [children, baseOpacity, start, end, scrub, stagger] }
  )

  const Tag = as
  return (
    <Tag ref={ref} aria-label={children} data-revealed="true" className={cn("group/reveal", className)}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span
            data-word=""
            className={cn(
              "inline-block",
              emphasisFrom !== undefined &&
                i >= emphasisFrom &&
                "text-muted-foreground transition-colors duration-300 group-data-[revealed=true]/reveal:text-foreground"
            )}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  )
}
