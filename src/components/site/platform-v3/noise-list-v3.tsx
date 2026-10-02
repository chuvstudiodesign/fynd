import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { INTEREST_STATUS, INTERESTED } from "./data-v3"
import { InterestCardV3 } from "./interest-card-v3"

/**
 * Cópia v3 do `NoiseList` (platform/noise-list.tsx, que segue intacto na v1/v2).
 * A diferença: a linha iluminada mostra uma empresa *interessada* (estado "Pediu amostras"), não o fit %
 * com barra (09-revisao-marca-v3 P2.1). As linhas genéricas também perdem o par número + barra.
 * Mesmos ganchos: `data-noise-row` nas linhas genéricas, `data-noise-lit` (+ `litRef`) na iluminada,
 * e a barra ciano em `[data-slot=opportunity-card-signal]`.
 * Ilustrativa (`aria-hidden`). Não coloque dentro de `.dark`: a linha iluminada é do tema claro.
 */

/** Larguras (nome, contexto, estado) de cada linha genérica, para não parecer carimbo. */
const ROWS = [
  ["w-[46%]", "w-[30%]", "w-20"],
  ["w-[38%]", "w-[34%]", "w-16"],
  null, // linha iluminada
  ["w-[52%]", "w-[26%]", "w-24"],
  ["w-[41%]", "w-[31%]", "w-[4.5rem]"],
  ["w-[48%]", "w-[28%]", "w-20"],
] as const

const LIT = INTERESTED[0]

export interface NoiseListV3Props {
  litRef?: React.Ref<HTMLDivElement>
  className?: string
}

export function NoiseListV3({ litRef, className }: NoiseListV3Props) {
  return (
    <div data-slot="noise-list-v3" aria-hidden="true" className={cn("flex flex-col gap-2", className)}>
      {ROWS.map((row, i) =>
        row ? (
          <div
            key={i}
            data-noise-row=""
            className="flex items-center gap-4 rounded-lg border border-steel-700 bg-steel-800 px-5 py-4"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="flex h-6 items-center">
                <Skeleton className={cn("h-3 animate-none rounded-full bg-steel-700", row[0])} />
              </span>
              <span className="flex h-5 items-center">
                <Skeleton className={cn("h-2.5 animate-none rounded-full bg-steel-700/70", row[1])} />
              </span>
            </span>
            <Skeleton className={cn("h-6 shrink-0 animate-none rounded-full bg-steel-700", row[2])} />
          </div>
        ) : (
          <div key={i} ref={litRef} data-noise-lit="" className="font-sans text-foreground">
            <InterestCardV3 company={LIT.company} meta={LIT.meta} status={INTEREST_STATUS[LIT.company]} active />
          </div>
        )
      )}
    </div>
  )
}
