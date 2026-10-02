"use client"

import { motion, stagger, type Variants } from "motion/react"
import { EASE_OUT } from "./gsap"

type RevealProps = React.ComponentProps<typeof motion.div> & {
  /** Deslocamento inicial em px (24 para blocos, 16 para cabeçalhos, 8 para itens pequenos) */
  y?: number
  x?: number
  delay?: number
  duration?: number
  amount?: number
}

/**
 * O Motion serializa o `initial` no HTML (`style="opacity:0"`). Todo elemento que entra com fade
 * leva `data-reveal`: o `globals.css` o mantém visível até a hidratação (e sempre, sem JS).
 * Quem marca a hidratação é o `MotionProvider` (`<html data-hydrated>`).
 */
export const REVEAL_ATTR = { "data-reveal": "" } as const

/** Entrada simples por `whileInView`: opacidade + deslocamento, uma vez só. */
export function Reveal({ y = 16, x = 0, delay = 0, duration = 0.7, amount = 0.3, ...props }: RevealProps) {
  return (
    <motion.div
      {...REVEAL_ATTR}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...props}
    />
  )
}

const groupVariants = (gap: number, startDelay: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: stagger(gap, { startDelay }) } },
})

type RevealGroupProps = React.ComponentProps<typeof motion.div> & {
  gap?: number
  startDelay?: number
  amount?: number
  /** Dispara na montagem em vez de esperar a viewport */
  onMount?: boolean
}

/** Grupo com entrada escalonada. Os filhos usam `RevealItem`. */
export function RevealGroup({ gap = 0.08, startDelay = 0, amount = 0.3, onMount = false, ...props }: RevealGroupProps) {
  return (
    <motion.div
      variants={groupVariants(gap, startDelay)}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
      {...props}
    />
  )
}

export const itemVariants = (y = 24, x = 0, duration = 0.8, fade = true): Variants => ({
  hidden: { opacity: fade ? 0 : 1, y, x },
  show: { opacity: 1, y: 0, x: 0, transition: { duration, ease: EASE_OUT } },
})

type RevealItemProps = React.ComponentProps<typeof motion.div> & {
  y?: number
  x?: number
  duration?: number
  /** false = só translada (para o H1 do hero, que é LCP e nunca começa invisível) */
  fade?: boolean
}

export function RevealItem({ y = 24, x = 0, duration = 0.8, fade = true, ...props }: RevealItemProps) {
  return <motion.div {...(fade ? REVEAL_ATTR : {})} variants={itemVariants(y, x, duration, fade)} {...props} />
}

export function RevealListItem({ y = 24, x = 0, duration = 0.8, ...props }: Omit<React.ComponentProps<typeof motion.li>, "variants"> & { y?: number; x?: number; duration?: number }) {
  return <motion.li {...REVEAL_ATTR} variants={itemVariants(y, x, duration)} {...props} />
}
