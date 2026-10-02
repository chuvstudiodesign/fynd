import { cn } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"
import { CodeBlock } from "./code-block"

export function PageHeader({
  category,
  title,
  description,
  source,
}: {
  category: string
  title: string
  description: string
  /** Caminho(s) do componente no projeto */
  source: string | string[]
}) {
  const sources = Array.isArray(source) ? source : [source]
  return (
    <header className="flex flex-col gap-4 pb-12">
      <span className="font-mono text-xs font-medium tracking-label text-muted-foreground uppercase">
        {category}
      </span>
      <h1 className="text-5xl">{title}</h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((s) => (
          <code key={s} className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            {s}
          </code>
        ))}
      </div>
    </header>
  )
}

export function DocSection({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-6 border-t border-border py-12", className)}>
      <div className="flex max-w-2xl flex-col gap-2">
        <h2 className="text-3xl">{title}</h2>
        {description && <p className="leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}

/** Pré-visualização ao vivo + código de exemplo */
export function Example({
  title,
  description,
  code,
  children,
  previewClassName,
}: {
  title?: string
  description?: string
  code?: string
  children: React.ReactNode
  previewClassName?: string
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="font-sans text-sm font-semibold tracking-normal">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="overflow-hidden rounded-xl border border-border">
        <div
          className={cn(
            "flex min-h-40 flex-wrap items-center justify-center gap-4 bg-card p-10",
            previewClassName
          )}
        >
          {children}
        </div>
        {code && (
          <details className="group/details border-t border-border bg-background">
            <summary className="cursor-pointer list-none px-4 py-2.5 font-mono text-xs tracking-label text-muted-foreground uppercase select-none hover:text-foreground [&::-webkit-details-marker]:hidden">
              <span className="group-open/details:hidden">Ver código</span>
              <span className="hidden group-open/details:inline">Ocultar código</span>
            </summary>
            <CodeBlock code={code} className="px-4 pb-4 [&_pre]:rounded-lg" />
          </details>
        )}
      </div>
    </div>
  )
}

export function Usage({ importCode, usageCode }: { importCode: string; usageCode: string }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-sm font-semibold tracking-normal">Import</h3>
        <CodeBlock code={importCode} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-sm font-semibold tracking-normal">Uso básico</h3>
        <CodeBlock code={usageCode} />
      </div>
    </div>
  )
}

export interface PropRow {
  prop: string
  type: string
  default?: string
  description: string
}

export function PropsTable({ component, rows }: { component?: string; rows: PropRow[] }) {
  return (
    <div className="flex flex-col gap-2">
      {component && <h3 className="font-mono text-sm font-medium">{`<${component} />`}</h3>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60">
            <tr>
              {["Prop", "Tipo", "Padrão", "Descrição"].map((h) => (
                <th key={h} className="px-4 py-2.5 font-mono text-[0.6875rem] font-medium tracking-label text-muted-foreground uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.prop} className="align-top">
                <td className="px-4 py-3 font-mono text-xs font-medium whitespace-nowrap">{r.prop}</td>
                <td className="px-4 py-3 font-mono text-xs text-navy-600 dark:text-navy-200">{r.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.default ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function A11yNotes({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-navy-600 dark:bg-signal-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Tecla — usa o Kbd do design system */
export { Kbd }

export function ShowcasePage({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex max-w-5xl flex-col px-12 py-16">{children}</div>
}
