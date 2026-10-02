"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const totals = ["5", "12", "40"] as const

/** Páginas visíveis: primeira, última, atual ± 1, com reticências nos saltos */
function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total))
  const sorted = [...set].sort((a, b) => a - b)
  const out: (number | "…")[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…")
    out.push(p)
  })
  return out
}

export default function PaginationPage() {
  const [total, setTotal] = useState<(typeof totals)[number]>("12")
  const [labels, setLabels] = useState(true)
  const [page, setPage] = useState(4)

  const n = Number(total)
  const current = Math.min(page, n)
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.max(1, Math.min(n, p)))
  }

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Pagination"
        description="Navega entre páginas de uma lista longa. Mostra onde a pessoa está e poucos números à volta, com reticências nos saltos."
        source="src/components/ui/pagination.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="total de páginas" value={total} options={totals} onChange={(v) => { setTotal(v); setPage(1) }} />
              <ControlToggle label="texto anterior/próxima" checked={labels} onChange={setLabels} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={go(current - 1)} text={labels ? "Anterior" : ""} aria-disabled={current === 1} className={current === 1 ? "pointer-events-none opacity-50" : undefined} />
                  </PaginationItem>
                  {pageList(current, n).map((p, i) =>
                    p === "…" ? (
                      <PaginationItem key={`e${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink href="#" isActive={p === current} onClick={go(p)}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={go(current + 1)} text={labels ? "Próxima" : ""} aria-disabled={current === n} className={current === n ? "pointer-events-none opacity-50" : undefined} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                página {current} de {n}
              </span>
            </div>
          }
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?p=${Math.max(1, current - 1)}"${labels ? "" : ' text=""'} /></PaginationItem>
${pageList(current, n)
  .map((p) => (p === "…" ? "    <PaginationItem><PaginationEllipsis /></PaginationItem>" : `    <PaginationItem><PaginationLink href="?p=${p}"${p === current ? " isActive" : ""}>${p}</PaginationLink></PaginationItem>`))
  .join("\n")}
    <PaginationItem><PaginationNext href="?p=${Math.min(n, current + 1)}"${labels ? "" : ' text=""'} /></PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Compacta"
          description="Só setas e posição — para painéis estreitos."
          code={`<PaginationPrevious text="" /> <span>4 / 12</span> <PaginationNext text="" />`}
        >
          <Pagination className="w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" text="" onClick={(e) => e.preventDefault()} />
              </PaginationItem>
              <PaginationItem className="px-2 font-mono text-sm text-muted-foreground tabular-nums">4 / 12</PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" text="" onClick={(e) => e.preventDefault()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"`}
          usageCode={`<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?p=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?p=2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="?p=3" /></PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="PaginationLink"
          rows={[
            { prop: "href", type: "string", description: "Destino da página (links reais funcionam sem JavaScript)." },
            { prop: "isActive", type: "boolean", default: "false", description: "Página atual: estilo outline e aria-current=page." },
            { prop: "size", type: "Button size", default: '"icon"', description: "Tamanho do botão." },
          ]}
        />
        <PropsTable
          component="PaginationPrevious · PaginationNext"
          rows={[{ prop: "text", type: "string", default: '"Anterior" · "Próxima"', description: 'Texto ao lado da seta (oculto no mobile). "" deixa só a seta.' }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">nav</code> com <code className="font-mono text-sm">aria-label=&quot;Paginação&quot;</code> e lista de links.</>,
            <>A página atual tem <code className="font-mono text-sm">aria-current=&quot;page&quot;</code>; as setas têm rótulos (“Ir para a próxima página”).</>,
            <>Nas pontas, marque a seta como <code className="font-mono text-sm">aria-disabled</code> em vez de removê-la — o layout não salta.</>,
            <>Use links reais (<code className="font-mono text-sm">?p=2</code>): a página fica compartilhável e funciona sem JavaScript.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
