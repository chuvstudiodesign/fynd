"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Proporções do 03-design.md §3.2, relativas à largura da tampa (W).
 * O componente ocupa a largura da base (112% de W), então W = 100cqw / 1.12.
 * Todas as medidas abaixo estão em `cqw` do container do MacBook (largura da base).
 */
const W = 100 / 1.12 // largura da tampa em cqw
const w = (pctOfLid: number) => `${((pctOfLid / 100) * W).toFixed(4)}cqw`

const CANVAS_W = 1280
const CANVAS_H = 800

export interface MacBookProps {
  /** Conteúdo da tela, desenhado num canvas fixo de 1280×800 e reduzido para caber. */
  children: React.ReactNode
  /** Largura do MacBook (a base inteira). Ex.: `max-w-[1080px]`. */
  className?: string
  /** Elemento da tampa (moldura + tela). O GSAP do hero anima `rotateX`/`scale`/`y` nele. */
  lidRef?: React.Ref<HTMLDivElement>
  /** Descrição do que a tela mostra. Vira `role="img"` + `aria-label` na moldura. */
  label?: string
}

/**
 * Mockup de MacBook feito só com CSS. A tela é um canvas de 1280×800 escalado por ResizeObserver
 * (`--screen-scale`), então a composição e as coordenadas do motion são as mesmas em qualquer tamanho.
 * O conteúdo da tela é decorativo (`inert` + `aria-hidden`).
 *
 * Tema: a interface dentro da tela usa o tema claro. Não coloque o MacBook dentro de um wrapper `.dark`.
 */
export function MacBook({ children, className, lidRef, label }: MacBookProps) {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const screen = screenRef.current
    if (!screen) return
    const apply = (width: number) => screen.style.setProperty("--screen-scale", String(width / CANVAS_W))
    // clientWidth ignora transforms (a tampa pode estar com scale do GSAP)
    apply(screen.clientWidth)
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width))
    ro.observe(screen)
    if (process.env.NODE_ENV !== "production" && screen.closest(".dark")) {
      console.warn("[MacBook] está dentro de um `.dark`: a tela da plataforma precisa ficar fora do wrapper escuro.")
    }
    return () => ro.disconnect()
  }, [])

  return (
    <div
      data-slot="macbook"
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn("@container/macbook relative w-full [perspective:1600px]", className)}
    >
      {/* Tampa: moldura navy-950, aresta steel-600 */}
      <div
        ref={lidRef}
        data-slot="macbook-lid"
        className="relative mx-auto origin-bottom border border-steel-600 bg-navy-950"
        style={{
          width: `${W}cqw`,
          padding: `${w(2.8)} ${w(2.2)} ${w(3.2)}`,
          borderRadius: `${w(2.2)} ${w(2.2)} ${w(0.8)} ${w(0.8)}`,
        }}
      >
        {/* Tela 16:10 */}
        <div
          ref={screenRef}
          data-slot="macbook-screen"
          className="relative aspect-[16/10] w-full overflow-hidden bg-paper-100"
          style={{ borderRadius: `${w(0.9)} ${w(0.9)} 0 0` }}
        >
          <div
            inert
            aria-hidden="true"
            data-slot="macbook-canvas"
            className="absolute top-0 left-0 origin-top-left"
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: "scale(var(--screen-scale, 0))",
            }}
          >
            {children}
          </div>
        </div>

        {/* Notch, por cima do app, com a câmera */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-center bg-navy-950"
          style={{
            top: w(2.8),
            width: w(8),
            height: w(1.6),
            borderRadius: `0 0 ${w(0.6)} ${w(0.6)}`,
          }}
        >
          <span className="rounded-full bg-steel-800" style={{ width: w(0.55), height: w(0.55) }} />
        </div>
      </div>

      {/* Base (deck): único gradiente permitido, steel-200 → steel-400 */}
      <div
        aria-hidden="true"
        data-slot="macbook-base"
        className="relative mx-auto w-full rounded-b-[40%_100%] bg-linear-to-b from-steel-200 to-steel-400"
        style={{ height: w(2.2) }}
      >
        {/* Recorte de abertura */}
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full bg-steel-500"
          style={{ width: w(14), height: "40%" }}
        />
      </div>

      {/* Sombra de contato */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 rounded-[50%] bg-navy-950/70 blur-xl"
        style={{ width: "90%", height: w(3), bottom: `calc(${w(3)} * -0.5)` }}
      />
    </div>
  )
}
