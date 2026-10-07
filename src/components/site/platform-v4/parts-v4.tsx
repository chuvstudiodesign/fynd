import { FileTextIcon, Link2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { pre } from "@/components/site/platform/playback"

// Reaproveitados sem cópia (03-design-v4 §9): selo de interesse com a camada ciano e a sequência de "acender".
export { InterestSeal, sealSequence } from "@/components/site/platform-v3/parts-v3"
export { FyndAvatar } from "@/components/site/platform/screen-conversa"

/** Chip de anexo (site ou PDF). Ícones de link e de PDF, sem barra de upload. */
export function AttachmentChip({
  kind,
  name,
  meta,
  size = "md",
  className,
  ...props
}: { kind: "link" | "pdf"; name: string; meta?: string; size?: "sm" | "md" } & React.ComponentProps<"span">) {
  const Icon = kind === "link" ? Link2Icon : FileTextIcon
  return (
    <Badge
      variant="outline"
      className={cn(
        "max-w-full bg-card font-normal text-foreground",
        size === "md" ? "h-7 gap-1.5 px-3 text-[13px] [&>svg]:size-3.5!" : "h-6 gap-1 px-2.5 text-xs",
        className
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="text-muted-foreground" />
      <span className="truncate">{name}</span>
      {meta && <span className="text-muted-foreground">· {meta}</span>}
    </Badge>
  )
}

/**
 * Barra neutra de 4px (aderência ou recorte de volume). Nunca ciano, nunca semáforo.
 * `[data-a=<anim>]` anima `scaleX` de 0 até `value`.
 */
export function NeutralBar({
  value,
  hidden,
  anim,
  strong = true,
  className,
}: {
  /** 0 a 1. */
  value: number
  hidden: boolean
  anim?: string
  strong?: boolean
  className?: string
}) {
  return (
    <span aria-hidden="true" className={cn("relative block h-1 overflow-hidden rounded-full bg-navy-100", className)}>
      <span
        data-a={anim}
        className={cn("absolute inset-0 origin-left rounded-full", strong ? "bg-navy-600" : "bg-navy-300")}
        style={{ transform: `scaleX(${hidden ? 0 : value})` }}
      />
    </span>
  )
}

/** Estilo inicial dos itens que sobem (atalho de `pre`). */
export const up = (hidden: boolean, y = 8) => pre(hidden, { y })
