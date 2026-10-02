"use client"

/**
 * Ponto único de entrada do GSAP no site. Os plugins são registrados aqui, uma vez só;
 * importe `gsap`, `ScrollTrigger`, `SplitText` e `useGSAP` sempre deste módulo.
 */
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: "power3.out", duration: 0.8 })

/** Condições de mídia do site (04-motion §1). `full` é o único caso com pin. */
export const MQ = {
  full: "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
  compact: "((max-width: 1023px) or (max-height: 679px)) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const

export type MQConditions = { full: boolean; compact: boolean; reduce: boolean }

/** Curvas do Motion equivalentes aos tokens do GSAP. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
