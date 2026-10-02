"use client"

import { useEffect } from "react"
import { MotionConfig } from "motion/react"
import { ScrollTrigger, EASE_OUT } from "./gsap"

/**
 * Provider de movimento só da landing: Motion respeita a preferência do sistema
 * e o ScrollTrigger remede as posições depois que as fontes carregam.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Libera os estados iniciais das entradas (ver `[data-reveal]` no globals.css).
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "")
    return () => document.documentElement.removeAttribute("data-hydrated")
  }, [])

  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener("load", onLoad)
    return () => {
      cancelled = true
      window.removeEventListener("load", onLoad)
    }
  }, [])

  return (
    <>
      {/* Sem JS nenhuma animação toca: as telas da plataforma aparecem no estado em que vieram do servidor, visíveis. */}
      <noscript>
        <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT, duration: 0.7 }}>
        {children}
      </MotionConfig>
    </>
  )
}
