import type { AnimationSequence } from "motion/react"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { EASE_OUT, pre } from "@/components/site/platform/playback"

/** Rótulo mono de seção dentro das telas (sem "fynd": é caixa alta por CSS). */
export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h4 className={cn("font-mono text-xs font-medium tracking-label text-muted-foreground uppercase", className)}>
      {children}
    </h4>
  )
}

/**
 * Selo de interesse ("Demonstrou interesse" ou "Interessada").
 * - `signal`: o ciano da tela. Fica numa camada por cima do selo neutro e "acende" na sequência
 *   (`[data-a=seal-on]`: opacity/scale; `[data-a=seal-pulse]`: anel que se expande e some uma vez).
 * - sem `signal`: o mesmo selo em neutro (navy-50), para os demais itens.
 * `hidden` = antes do estado final: o ciano começa apagado.
 */
export function InterestSeal({
  label = "Demonstrou interesse",
  signal = false,
  hidden = false,
  size = "md",
  className,
}: {
  label?: string
  signal?: boolean
  hidden?: boolean
  size?: "sm" | "md"
  className?: string
}) {
  const sizing = size === "md" ? "h-6 gap-1 px-2.5 text-xs" : "h-5 gap-1 px-2 text-[11px]"
  const neutral = (
    <Badge className={cn(sizing, "bg-navy-50 font-semibold text-navy-700")}>
      <CheckIcon strokeWidth={2.5} />
      {label}
    </Badge>
  )
  if (!signal) return <span className={cn("inline-flex", className)}>{neutral}</span>
  return (
    <span className={cn("relative inline-flex", className)}>
      {neutral}
      <span
        data-a="seal-pulse"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-4xl border-2 border-signal"
        style={{ opacity: 0 }}
      />
      <Badge
        data-a="seal-on"
        variant="signal"
        className={cn(sizing, "absolute inset-0 w-full font-semibold")}
        style={pre(hidden, { scale: 0.92 })}
      >
        <CheckIcon strokeWidth={2.5} />
        {label}
      </Badge>
    </span>
  )
}

/** Sequência do selo ciano acendendo (para usar dentro de um `AnimationSequence`). */
export function sealSequence(at: number, scope = ""): AnimationSequence {
  const s = scope ? `${scope} ` : ""
  return [
    [`${s}[data-a=seal-on]`, { opacity: [0, 1], scale: [0.92, 1] }, { at, duration: 0.45, ease: EASE_OUT }],
    [`${s}[data-a=seal-pulse]`, { opacity: [0, 0.7, 0], scale: [1, 1, 1.35] }, { at: at + 0.1, duration: 0.9, times: [0, 0.05, 1], ease: EASE_OUT }],
  ]
}
