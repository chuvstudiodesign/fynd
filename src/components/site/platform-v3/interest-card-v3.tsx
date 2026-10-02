import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InterestCardV3Props extends Omit<React.ComponentProps<"div">, "children"> {
  company: string
  /** Linha de contexto, p. ex. "Alimentos · Jundiaí, SP · 320 pessoas" */
  meta: string
  /** Estado de interesse curto, p. ex. "Pediu amostras" */
  status: string
  /** Item em foco: recebe a barra de sinal (ciano) à esquerda */
  active?: boolean
}

/**
 * Linha de uma empresa interessada (v3). Mesmo desenho do `OpportunityCard`, mas no lugar do fit % e da
 * barra de aderência mostra o estado de interesse ("Pediu amostras"). Não é interativa.
 * O ciano é só a barra de sinal do item ativo; o estado fica em neutro.
 *
 * Gancho de animação compatível com o `OpportunityCard`:
 * - `[data-slot=opportunity-card-signal]`: barra ciano de 5px (anima `scaleY`/`opacity`).
 */
export function InterestCardV3({ company, meta, status, active = false, className, ...props }: InterestCardV3Props) {
  return (
    <div
      data-slot="interest-card-v3"
      data-active={active || undefined}
      className={cn(
        "group/interest relative flex w-full items-center gap-4 overflow-hidden rounded-lg border bg-card px-5 py-4 text-left",
        // Em telas estreitas o estado desce para baixo do nome, para o nome não truncar.
        "max-sm:flex-col max-sm:items-start max-sm:gap-2.5 max-sm:px-4",
        "data-active:border-transparent data-active:bg-navy-50",
        className
      )}
      {...props}
    >
      <span
        data-slot="opportunity-card-signal"
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[5px] bg-signal opacity-0 group-data-active/interest:opacity-100"
      />
      <span className="flex w-full min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold group-not-data-active/interest:text-foreground/85">
          {company}
        </span>
        <span className="truncate text-sm text-muted-foreground">{meta}</span>
      </span>
      <span
        data-slot="interest-card-status"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground",
          "group-data-active/interest:border-navy-200 group-data-active/interest:bg-paper-50 group-data-active/interest:text-foreground"
        )}
      >
        <CheckIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
        {status}
      </span>
      <span className="sr-only">{`Demonstrou interesse: ${status}`}</span>
    </div>
  )
}
