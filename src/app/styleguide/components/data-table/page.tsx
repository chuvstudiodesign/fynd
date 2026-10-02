"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CompanyAvatar } from "@/components/company-avatar"
import { DataTable, DataTableColumnHeader, selectColumn } from "@/components/data-table"
import { ControlSegment, ControlToggle } from "../../_kit/controls"
import { CodeBlock } from "../../_kit/code-block"
import { A11yNotes, DocSection, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

type Status = "prioridade" | "qualificada" | "analise" | "descartada"
type Opportunity = { id: string; empresa: string; setor: string; pessoas: number; regiao: string; aderencia: number; status: Status }

const data: Opportunity[] = [
  { id: "1", empresa: "Empresa Exemplo", setor: "Indústria", pessoas: 320, regiao: "SP", aderencia: 92, status: "prioridade" },
  { id: "2", empresa: "Alfa Embalagens", setor: "Indústria", pessoas: 410, regiao: "MG", aderencia: 84, status: "qualificada" },
  { id: "3", empresa: "Norte Metais", setor: "Indústria", pessoas: 260, regiao: "RJ", aderencia: 77, status: "qualificada" },
  { id: "4", empresa: "Vale Plásticos", setor: "Indústria", pessoas: 230, regiao: "SP", aderencia: 71, status: "analise" },
  { id: "5", empresa: "Rio Componentes", setor: "Indústria", pessoas: 480, regiao: "RJ", aderencia: 64, status: "analise" },
  { id: "6", empresa: "Serra Logística", setor: "Logística", pessoas: 350, regiao: "PR", aderencia: 81, status: "qualificada" },
  { id: "7", empresa: "Horizonte Têxtil", setor: "Indústria", pessoas: 290, regiao: "SC", aderencia: 58, status: "descartada" },
  { id: "8", empresa: "Prisma Serviços", setor: "Serviços", pessoas: 210, regiao: "SP", aderencia: 88, status: "prioridade" },
  { id: "9", empresa: "Delta Alimentos", setor: "Indústria", pessoas: 460, regiao: "MG", aderencia: 69, status: "analise" },
  { id: "10", empresa: "Aurora Química", setor: "Indústria", pessoas: 380, regiao: "SP", aderencia: 90, status: "prioridade" },
  { id: "11", empresa: "Costa Madeiras", setor: "Indústria", pessoas: 240, regiao: "ES", aderencia: 62, status: "descartada" },
  { id: "12", empresa: "Lumen Energia", setor: "Serviços", pessoas: 300, regiao: "SP", aderencia: 79, status: "qualificada" },
]

const statusBadge: Record<Status, { label: string; variant: "signal" | "success" | "info" | "destructive" }> = {
  prioridade: { label: "Prioridade", variant: "signal" },
  qualificada: { label: "Qualificada", variant: "success" },
  analise: { label: "Em análise", variant: "info" },
  descartada: { label: "Descartada", variant: "destructive" },
}

function buildColumns(selectable: boolean): ColumnDef<Opportunity>[] {
  const cols: ColumnDef<Opportunity>[] = [
    {
      accessorKey: "empresa",
      meta: { label: "Empresa" },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <CompanyAvatar name={row.original.empresa} size="sm" />
          <span className="font-semibold">{row.original.empresa}</span>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "setor",
      meta: { label: "Setor" },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Setor" />,
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.setor}</span>,
    },
    {
      accessorKey: "pessoas",
      meta: { label: "Pessoas" },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Pessoas" />,
      cell: ({ row }) => <span className="font-mono tabular-nums">{row.original.pessoas}</span>,
    },
    {
      accessorKey: "regiao",
      meta: { label: "UF" },
      header: "UF",
      cell: ({ row }) => <span className="font-mono text-muted-foreground">{row.original.regiao}</span>,
      enableSorting: false,
    },
    {
      accessorKey: "aderencia",
      meta: { label: "Aderência" },
      header: ({ column }) => <DataTableColumnHeader column={column} title="Aderência" />,
      cell: ({ row }) => {
        const v = row.original.aderencia
        return (
          <div className="flex items-center gap-3">
            <span className="w-9 font-mono font-medium tabular-nums">{v}%</span>
            <span className="relative h-1.5 w-14 overflow-hidden rounded-full bg-steel-500/20" aria-hidden="true">
              <span className="absolute inset-y-0 left-0 rounded-full bg-navy-600 dark:bg-steel-300" style={{ width: `${v}%` }} />
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      meta: { label: "Status" },
      header: "Status",
      cell: ({ row }) => {
        const s = statusBadge[row.original.status]
        return <Badge variant={s.variant}>{s.label}</Badge>
      },
      enableSorting: false,
    },
    {
      id: "acoes",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Ações para ${row.original.empresa}`} />}>
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver contexto</DropdownMenuItem>
            <DropdownMenuItem>Iniciar conversa</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Descartar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  return selectable ? [selectColumn<Opportunity>(), ...cols] : cols
}

const pageSizes = ["5", "8", "12"] as const

export default function DataTablePage() {
  const [selectable, setSelectable] = useState(true)
  const [search, setSearch] = useState(true)
  const [columnToggle, setColumnToggle] = useState(true)
  const [pageSize, setPageSize] = useState<(typeof pageSizes)[number]>("5")
  const [empty, setEmpty] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Data Table"
        description="A lista de oportunidades em formato de tabela: busca, ordenação, paginação, seleção e colunas configuráveis. Composição da fynd sobre Table (shadcn) e TanStack Table."
        source={["src/components/data-table.tsx", "src/components/ui/table.tsx"]}
      />

      <DocSection title="Playground" description="Ordene clicando nos cabeçalhos, busque por empresa, selecione linhas e oculte colunas.">
        <div className="overflow-hidden rounded-xl border">
          <div className="flex flex-wrap gap-6 border-b bg-background px-6 py-4">
            <ControlToggle label="seleção" checked={selectable} onChange={setSelectable} />
            <ControlToggle label="busca" checked={search} onChange={setSearch} />
            <ControlToggle label="colunas" checked={columnToggle} onChange={setColumnToggle} />
            <ControlSegment label="pageSize" value={pageSize} options={pageSizes} onChange={setPageSize} />
            <ControlToggle label="sem dados" checked={empty} onChange={setEmpty} />
          </div>
          <div className="bg-background p-6">
            <DataTable
              key={`${selectable}-${pageSize}`}
              columns={buildColumns(selectable)}
              data={empty ? [] : data}
              filterColumn={search ? "empresa" : undefined}
              filterPlaceholder="Buscar empresa"
              pageSize={Number(pageSize)}
              columnToggle={columnToggle}
              emptyMessage="Nenhuma oportunidade encontrada."
            />
          </div>
        </div>
      </DocSection>

      <DocSection title="Definindo colunas">
        <CodeBlock
          code={`const columns: ColumnDef<Oportunidade>[] = [
  selectColumn<Oportunidade>(),
  {
    accessorKey: "empresa",
    meta: { label: "Empresa" },            // nome no menu "Colunas"
    header: ({ column }) => <DataTableColumnHeader column={column} title="Empresa" />,
    cell: ({ row }) => <span className="font-semibold">{row.original.empresa}</span>,
    enableHiding: false,
  },
  {
    accessorKey: "aderencia",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aderência" />,
    cell: ({ row }) => <span className="font-mono">{row.original.aderencia}%</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge variant="success">…</Badge>,
    enableSorting: false,
  },
]

<DataTable columns={columns} data={data} filterColumn="empresa" filterPlaceholder="Buscar empresa" />`}
        />
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import type { ColumnDef } from "@tanstack/react-table"
import { DataTable, DataTableColumnHeader, selectColumn } from "@/components/data-table"`}
          usageCode={`<DataTable columns={columns} data={data} filterColumn="empresa" pageSize={10} />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="DataTable"
          rows={[
            { prop: "columns", type: "ColumnDef<TData>[]", description: "Definição das colunas (TanStack Table v8)." },
            { prop: "data", type: "TData[]", description: "Linhas." },
            { prop: "filterColumn", type: "string", description: "id da coluna usada pela busca. Omitido: sem busca." },
            { prop: "filterPlaceholder", type: "string", default: '"Filtrar…"', description: "Texto e rótulo acessível da busca." },
            { prop: "pageSize", type: "number", default: "5", description: "Linhas por página." },
            { prop: "columnToggle", type: "boolean", default: "true", description: "Mostra o menu para ocultar colunas." },
            { prop: "emptyMessage", type: "ReactNode", default: '"Nenhum resultado."', description: "Conteúdo quando não há linhas." },
          ]}
        />
        <PropsTable
          component="DataTableColumnHeader · selectColumn()"
          rows={[
            { prop: "column · title", type: "Column · string", description: "Cabeçalho que alterna a ordenação e mostra a seta." },
            { prop: "selectColumn<T>()", type: "ColumnDef<T>", description: "Coluna pronta de checkboxes (página atual)." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Usa <code className="font-mono text-sm">table</code> semântico; colunas ordenadas recebem <code className="font-mono text-sm">aria-sort</code>.</>,
            <>Botões de ordenação, checkboxes e ações por linha têm rótulos (“Ordenar por Empresa”, “Ações para Alfa Embalagens”).</>,
            <>A contagem de resultados e seleção fica em uma região <code className="font-mono text-sm">aria-live</code>.</>,
            <>Em telas estreitas a tabela rola na horizontal; considere uma lista de cartões (OpportunityCard) no mobile.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
