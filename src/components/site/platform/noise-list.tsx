import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { OpportunityCard } from "@/components/opportunity-card"
import { OPPORTUNITIES } from "./data"

/** Larguras (nome, contexto) de cada linha genérica, para não parecer carimbo. */
const ROWS = [
  ["w-[46%]", "w-[30%]"],
  ["w-[38%]", "w-[34%]"],
  null, // linha iluminada
  ["w-[52%]", "w-[26%]"],
  ["w-[41%]", "w-[31%]"],
  ["w-[48%]", "w-[28%]"],
] as const

const LIT = OPPORTUNITIES[0]

export interface NoiseListProps {
  /** Wrapper da linha iluminada (3ª). Dentro dela, a barra ciano é `[data-slot=opportunity-card-signal]`. */
  litRef?: React.Ref<HTMLDivElement>
  className?: string
}

/**
 * Contraste da seção 2: 5 linhas genéricas (skeletons escuros, estáticos) + 1 `OpportunityCard` ativo claro.
 * Renderiza no estado final (5 linhas e a linha acesa, todas visíveis); o scrub é do GSAP da seção.
 * Ganchos: cada linha genérica tem `data-noise-row`; a iluminada tem `data-noise-lit` (e recebe `litRef`).
 * É ilustrativa (`aria-hidden`): o sentido está no texto da seção.
 * Não coloque dentro de um wrapper `.dark`: a linha iluminada é do tema claro.
 */
export function NoiseList({ litRef, className }: NoiseListProps) {
  return (
    <div data-slot="noise-list" aria-hidden="true" className={cn("flex flex-col gap-2", className)}>
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
            <span className="flex shrink-0 items-center gap-3">
              <Skeleton className="h-3 w-8 animate-none rounded-full bg-steel-700" />
              <Skeleton className="h-1.5 w-12 animate-none rounded-full bg-steel-700" />
            </span>
          </div>
        ) : (
          <div key={i} ref={litRef} data-noise-lit="" className="font-sans text-foreground">
            <OpportunityCard
              tabIndex={-1}
              company={LIT.company}
              meta={LIT.meta}
              fit={LIT.fit}
              active
              className="pointer-events-none"
            />
          </div>
        )
      )}
    </div>
  )
}
