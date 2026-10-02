"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { OpportunityCard } from "@/components/opportunity-card"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-card px-5 py-4">
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
      <Skeleton className="h-4 w-10" />
      <Skeleton className="h-1.5 w-12 rounded-full" />
    </div>
  )
}

const rows = [
  { company: "Empresa Exemplo", meta: "Indústria · 320 pessoas", fit: 92 },
  { company: "Alfa Embalagens", meta: "Indústria · 410 pessoas", fit: 84 },
  { company: "Norte Metais", meta: "Indústria · 260 pessoas", fit: 77 },
]

export default function SkeletonPage() {
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    if (reload === 0) return
    const id = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(id)
  }, [reload])

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Skeleton"
        description="Esboço do conteúdo enquanto ele carrega. Reproduz a forma do que vem — a pessoa entende a página antes dos dados chegarem."
        source="src/components/ui/skeleton.tsx"
      />

      <DocSection title="Playground" description="Alterne o carregamento ou simule uma busca.">
        <Playground
          controls={
            <>
              <ControlToggle label="carregando" checked={loading} onChange={setLoading} />
              <div className="flex flex-col justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setLoading(true)
                    setReload((r) => r + 1)
                  }}
                >
                  Simular busca
                </Button>
              </div>
            </>
          }
          previewClassName="block bg-background"
          preview={
            <div className="mx-auto flex max-w-xl flex-col gap-3" aria-busy={loading} aria-live="polite">
              {loading ? (
                <>
                  <span className="sr-only">Carregando oportunidades…</span>
                  {rows.map((r) => (
                    <RowSkeleton key={r.company} />
                  ))}
                </>
              ) : (
                rows.map((r, i) => <OpportunityCard key={r.company} {...r} active={i === 0} />)
              )}
            </div>
          }
          code={`{loading ? (
  <div className="flex items-center gap-4 rounded-lg border px-5 py-4">
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-28" />
    </div>
    <Skeleton className="h-4 w-10" />
  </div>
) : (
  <OpportunityCard … />
)}`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example title="Cartão" code={`<Card>\n  <CardHeader><Skeleton className="h-5 w-2/3" />…</CardHeader>\n</Card>`}>
            <Card className="w-full max-w-sm">
              <CardHeader className="gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-7 w-2/3" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="mt-3 h-10 w-32 rounded-full" />
              </CardContent>
            </Card>
          </Example>
          <Example title="Perfil" code={`<Skeleton className="size-12 rounded-full" />\n<Skeleton className="h-4 w-40" />`}>
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Skeleton } from "@/components/ui/skeleton"`} usageCode={`<Skeleton className="h-4 w-40" />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable component="Skeleton" rows={[{ prop: "className", type: "string", description: "Defina largura, altura e raio para imitar o conteúdo final." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O skeleton é só visual. Marque a região com <code className="font-mono text-sm">aria-busy</code> e inclua um texto oculto (“Carregando oportunidades…”).</>,
            <>A animação de pulso respeita <code className="font-mono text-sm">prefers-reduced-motion</code> no Tailwind (<code className="font-mono text-sm">motion-safe</code>) se você precisar desligá-la.</>,
            <>Mantenha o skeleton com o mesmo tamanho do conteúdo final para evitar saltos de layout.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
