"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const rows = [
  { empresa: "Empresa Exemplo", uf: "SP", pessoas: 320, aderencia: 92, status: "Prioridade" },
  { empresa: "Alfa Embalagens", uf: "MG", pessoas: 410, aderencia: 84, status: "Qualificada" },
  { empresa: "Norte Metais", uf: "RJ", pessoas: 260, aderencia: 77, status: "Qualificada" },
  { empresa: "Vale Plásticos", uf: "SP", pessoas: 230, aderencia: 71, status: "Em análise" },
]
const badge = { Prioridade: "signal", Qualificada: "success", "Em análise": "info" } as const

export default function TablePage() {
  const [caption, setCaption] = useState(true)
  const [footer, setFooter] = useState(true)
  const [striped, setStriped] = useState(false)

  const media = Math.round(rows.reduce((a, r) => a + r.aderencia, 0) / rows.length)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Table"
        description="Tabela semântica com o estilo do sistema. Para dados estáticos e simples; para ordenar, filtrar e paginar, use o Data Table."
        source="src/components/ui/table.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="caption" checked={caption} onChange={setCaption} />
              <ControlToggle label="footer" checked={footer} onChange={setFooter} />
              <ControlToggle label="listrada" checked={striped} onChange={setStriped} />
            </>
          }
          previewClassName="block"
          preview={
            <div className="overflow-hidden rounded-xl border bg-card">
              <Table>
                {caption && <TableCaption className="pb-4">Oportunidades da semana · perfil Indústria Sudeste</TableCaption>}
                <TableHeader className="bg-muted/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="px-4 font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">Empresa</TableHead>
                    <TableHead className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">UF</TableHead>
                    <TableHead className="text-right font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">Pessoas</TableHead>
                    <TableHead className="text-right font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">Aderência</TableHead>
                    <TableHead className="px-4 font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={striped ? "[&_tr:nth-child(even)]:bg-muted/30" : undefined}>
                  {rows.map((r) => (
                    <TableRow key={r.empresa}>
                      <TableCell className="px-4 font-semibold">{r.empresa}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{r.uf}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{r.pessoas}</TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{r.aderencia}%</TableCell>
                      <TableCell className="px-4">
                        <Badge variant={badge[r.status as keyof typeof badge]}>{r.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {footer && (
                  <TableFooter>
                    <TableRow>
                      <TableCell className="px-4" colSpan={3}>
                        Média
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{media}%</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>
          }
          code={`<Table>${caption ? "\n  <TableCaption>Oportunidades da semana</TableCaption>" : ""}
  <TableHeader>
    <TableRow>
      <TableHead>Empresa</TableHead>
      <TableHead className="text-right">Aderência</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Empresa Exemplo</TableCell>
      <TableCell className="text-right">92%</TableCell>
    </TableRow>
  </TableBody>${footer ? "\n  <TableFooter>\n    <TableRow><TableCell>Média</TableCell><TableCell className=\"text-right\">81%</TableCell></TableRow>\n  </TableFooter>" : ""}
</Table>`}
        />
        <p className="text-sm text-muted-foreground">
          Precisa de busca, ordenação ou seleção? Veja o{" "}
          <Link href="/styleguide/components/data-table" className="font-medium text-navy-600 underline underline-offset-4 dark:text-navy-200">
            Data Table
          </Link>
          .
        </p>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"`}
          usageCode={`<Table>\n  <TableHeader><TableRow><TableHead>Coluna</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>Valor</TableCell></TableRow></TableBody>\n</Table>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Table · TableHeader · TableBody · TableFooter · TableRow · TableHead · TableCell · TableCaption"
          rows={[
            { prop: "…props", type: "props nativas", description: "table, thead, tbody, tfoot, tr, th, td, caption. A Table vem dentro de um contêiner com rolagem horizontal." },
            { prop: "data-state", type: '"selected"', description: "Em TableRow, destaca a linha selecionada." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Elementos de tabela nativos: leitores de tela anunciam linha, coluna e cabeçalho.</>,
            <>Use <code className="font-mono text-sm">TableCaption</code> para dizer do que é a tabela.</>,
            <>Números alinhados à direita e em fonte tabular facilitam comparar valores.</>,
            <>Não use tabela para layout — só para dados tabulares.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
