import { cn } from "@/lib/utils"
import { CompanyAvatar } from "@/components/company-avatar"

interface OpportunityCardProps extends Omit<React.ComponentProps<"button">, "children"> {
  company: string
  /** Linha de contexto, p. ex. "Indústria · 320 pessoas" */
  meta: string
  /** Aderência ao perfil ideal, de 0 a 100 */
  fit: number
  /** Item em foco: recebe a barra de sinal (ciano) à esquerda */
  active?: boolean
  showAvatar?: boolean
  /**
   * Conteúdo do número de aderência. Padrão: `${fit}%`.
   * Útil para animar a contagem (p. ex. um `<CountUp>` seguido de "%").
   */
  fitLabel?: React.ReactNode
  /**
   * Escala inicial da barra de aderência (0 a 1). Padrão: `fit / 100`.
   * Use 0 para partir da barra vazia e animar `scaleX` até `fit / 100`.
   */
  barScale?: number
}

/**
 * Linha de oportunidade da lista priorizada (Figma → "30 / Interface — desktop").
 * Composta a partir de Card + CompanyAvatar. O ciano aparece só no item ativo.
 *
 * Ganchos para animação (sem mudar o visual):
 * - `[data-slot=opportunity-card-signal]`: barra ciano de 5px (span real, anima `scaleY`/`opacity`).
 * - `[data-slot=opportunity-card-fit]`: número de aderência.
 * - `[data-slot=opportunity-card-bar]`: preenchimento da barra, em `scaleX` (origin left).
 */
export function OpportunityCard({
  company,
  meta,
  fit,
  active = false,
  showAvatar = false,
  fitLabel,
  barScale,
  className,
  ...props
}: OpportunityCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(fit)))
  const scale = barScale ?? pct / 100
  return (
    <button
      type="button"
      data-slot="opportunity-card"
      data-active={active || undefined}
      aria-pressed={active}
      className={cn(
        "group/opportunity relative flex w-full items-center gap-4 overflow-hidden rounded-lg border bg-card px-5 py-4 text-left transition-colors outline-none",
        "hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50",
        "data-active:border-transparent data-active:bg-navy-50 dark:data-active:bg-secondary",
        className
      )}
      {...props}
    >
      <span
        data-slot="opportunity-card-signal"
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[5px] bg-signal opacity-0 group-data-active/opportunity:opacity-100"
      />
      {showAvatar && <CompanyAvatar name={company} size="lg" />}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold group-not-data-active/opportunity:text-foreground/85">
          {company}
        </span>
        <span className="truncate text-sm text-muted-foreground">{meta}</span>
      </span>
      <span className="flex shrink-0 items-center gap-3">
        <span
          data-slot="opportunity-card-fit"
          aria-hidden="true"
          className="font-mono text-base font-medium text-muted-foreground tabular-nums group-data-active/opportunity:text-foreground"
        >
          {fitLabel ?? `${pct}%`}
        </span>
        <span className="relative h-1.5 w-12 overflow-hidden rounded-full bg-steel-500/25" aria-hidden="true">
          <span
            data-slot="opportunity-card-bar"
            className="absolute inset-0 origin-left rounded-full bg-steel-500 group-data-active/opportunity:bg-navy-600 dark:bg-steel-300 dark:group-data-active/opportunity:bg-signal"
            style={{ transform: `scaleX(${scale})` }}
          />
        </span>
      </span>
      <span className="sr-only">{`Aderência de ${pct}% ao perfil ideal`}</span>
    </button>
  )
}
