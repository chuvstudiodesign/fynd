"use client"

import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

/** Controle segmentado para o playground */
export function ControlSegment<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">{label}</span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              value === o ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ControlToggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer flex-col gap-1.5">
      <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">{label}</span>
      <span className="flex h-8 items-center">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative h-5 w-9 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
            checked ? "bg-primary" : "bg-input"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 size-4 rounded-full bg-background transition-transform",
              checked && "translate-x-4"
            )}
          />
        </button>
      </span>
    </label>
  )
}

export function ControlText({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 rounded-full border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  )
}

/** Playground: controles + preview + código gerado */
export function Playground({
  controls,
  preview,
  code,
  previewClassName,
}: {
  controls: React.ReactNode
  preview: React.ReactNode
  code: string
  previewClassName?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex flex-wrap gap-6 border-b border-border bg-background px-6 py-4">{controls}</div>
      <div className={cn("flex min-h-56 items-center justify-center bg-card p-10", previewClassName)}>{preview}</div>
      <CodeBlock code={code} className="border-t border-border [&_pre]:rounded-none" />
    </div>
  )
}
