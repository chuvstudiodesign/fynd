"use client"

import { useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Label, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const weekly = [
  { semana: "S1", oportunidades: 42, conversas: 8 },
  { semana: "S2", oportunidades: 55, conversas: 11 },
  { semana: "S3", oportunidades: 48, conversas: 12 },
  { semana: "S4", oportunidades: 71, conversas: 15 },
  { semana: "S5", oportunidades: 66, conversas: 18 },
  { semana: "S6", oportunidades: 89, conversas: 22 },
  { semana: "S7", oportunidades: 94, conversas: 24 },
  { semana: "S8", oportunidades: 108, conversas: 29 },
]

const weeklyConfig = {
  oportunidades: { label: "Oportunidades", color: "var(--chart-1)" },
  conversas: { label: "Conversas", color: "var(--chart-2)" },
} satisfies ChartConfig

// Distribuição de aderência — como no slide "A marca orienta nos detalhes"
const fit = [
  { faixa: "50", empresas: 12 },
  { faixa: "55", empresas: 18 },
  { faixa: "60", empresas: 9 },
  { faixa: "65", empresas: 22 },
  { faixa: "70", empresas: 16 },
  { faixa: "75", empresas: 27 },
  { faixa: "80", empresas: 14 },
  { faixa: "85", empresas: 31 },
  { faixa: "90", empresas: 11 },
  { faixa: "95", empresas: 19 },
]
const fitConfig = { empresas: { label: "Empresas", color: "var(--chart-3)" } } satisfies ChartConfig

const sectors = [
  { setor: "industria", empresas: 48, fill: "var(--color-industria)" },
  { setor: "servicos", empresas: 27, fill: "var(--color-servicos)" },
  { setor: "varejo", empresas: 16, fill: "var(--color-varejo)" },
  { setor: "tecnologia", empresas: 12, fill: "var(--color-tecnologia)" },
  { setor: "outros", empresas: 7, fill: "var(--color-outros)" },
]
const sectorConfig = {
  empresas: { label: "Empresas" },
  industria: { label: "Indústria", color: "var(--chart-1)" },
  servicos: { label: "Serviços", color: "var(--chart-3)" },
  varejo: { label: "Varejo", color: "var(--chart-2)" },
  tecnologia: { label: "Tecnologia", color: "var(--chart-4)" },
  outros: { label: "Outros", color: "var(--chart-5)" },
} satisfies ChartConfig

const types = ["area", "bar", "line"] as const
const indicators = ["dot", "line", "dashed"] as const

export default function ChartPage() {
  const [type, setType] = useState<(typeof types)[number]>("area")
  const [indicator, setIndicator] = useState<(typeof indicators)[number]>("dot")
  const [grid, setGrid] = useState(true)
  const [legend, setLegend] = useState(true)

  const total = sectors.reduce((a, s) => a + s.empresas, 0)

  const chartBody = (
    <>
      {grid && <CartesianGrid vertical={false} />}
      <XAxis dataKey="semana" tickLine={false} axisLine={false} tickMargin={8} />
      <YAxis tickLine={false} axisLine={false} width={32} />
      <ChartTooltip cursor={type === "bar"} content={<ChartTooltipContent indicator={indicator} />} />
      {legend && <ChartLegend content={<ChartLegendContent />} />}
    </>
  )

  const Tag = type === "area" ? "AreaChart" : type === "bar" ? "BarChart" : "LineChart"
  const series =
    type === "area"
      ? `  <Area dataKey="oportunidades" type="monotone" fill="var(--color-oportunidades)" fillOpacity={0.15} stroke="var(--color-oportunidades)" />
  <Area dataKey="conversas" type="monotone" fill="var(--color-conversas)" fillOpacity={0.25} stroke="var(--color-conversas)" />`
      : type === "bar"
        ? `  <Bar dataKey="oportunidades" fill="var(--color-oportunidades)" radius={4} />
  <Bar dataKey="conversas" fill="var(--color-conversas)" radius={4} />`
        : `  <Line dataKey="oportunidades" type="monotone" stroke="var(--color-oportunidades)" strokeWidth={2} dot={false} />
  <Line dataKey="conversas" type="monotone" stroke="var(--color-conversas)" strokeWidth={2} dot={false} />`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Chart"
        description="Gráficos com Recharts e as cores de gráfico do sistema (--chart-1 a --chart-5). Azul profundo carrega o dado principal; o ciano destaca só o ponto que importa."
        source="src/components/ui/chart.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="tipo" value={type} options={types} onChange={setType} />
              <ControlSegment label="tooltip indicator" value={indicator} options={indicators} onChange={setIndicator} />
              <ControlToggle label="grid" checked={grid} onChange={setGrid} />
              <ControlToggle label="legend" checked={legend} onChange={setLegend} />
            </>
          }
          previewClassName="block"
          preview={
            <ChartContainer config={weeklyConfig} className="h-72 w-full">
              {type === "area" ? (
                <AreaChart data={weekly} margin={{ left: 0, right: 8 }}>
                  {chartBody}
                  <Area dataKey="oportunidades" type="monotone" fill="var(--color-oportunidades)" fillOpacity={0.15} stroke="var(--color-oportunidades)" strokeWidth={2} />
                  <Area dataKey="conversas" type="monotone" fill="var(--color-conversas)" fillOpacity={0.25} stroke="var(--color-conversas)" strokeWidth={2} />
                </AreaChart>
              ) : type === "bar" ? (
                <BarChart data={weekly} margin={{ left: 0, right: 8 }}>
                  {chartBody}
                  <Bar dataKey="oportunidades" fill="var(--color-oportunidades)" radius={4} />
                  <Bar dataKey="conversas" fill="var(--color-conversas)" radius={4} />
                </BarChart>
              ) : (
                <LineChart data={weekly} margin={{ left: 0, right: 8 }}>
                  {chartBody}
                  <Line dataKey="oportunidades" type="monotone" stroke="var(--color-oportunidades)" strokeWidth={2} dot={false} />
                  <Line dataKey="conversas" type="monotone" stroke="var(--color-conversas)" strokeWidth={2} dot={false} />
                </LineChart>
              )}
            </ChartContainer>
          }
          code={`const chartConfig = {
  oportunidades: { label: "Oportunidades", color: "var(--chart-1)" },
  conversas: { label: "Conversas", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-72 w-full">
  <${Tag} data={data}>${grid ? "\n    <CartesianGrid vertical={false} />" : ""}
    <XAxis dataKey="semana" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent indicator="${indicator}" />} />${legend ? "\n    <ChartLegend content={<ChartLegendContent />} />" : ""}
  ${series.replace(/\n/g, "\n  ")}
  </${Tag}>
</ChartContainer>`}
        />
      </DocSection>

      <DocSection title="Paleta de gráficos" description="Tokens --chart-1 a --chart-5 trocam de valor no tema escuro. Referencie sempre pela variável.">
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col gap-2">
              <div className="h-12 rounded-lg ring-1 ring-foreground/10" style={{ background: `var(--chart-${n})` }} />
              <code className="font-mono text-xs">--chart-{n}</code>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Destaque com sinal"
            description="Um único valor em ciano; o resto na cor de série. Como no Figma."
            previewClassName="block"
            code={`<Bar dataKey="empresas" radius={3}>
  {data.map((d, i) => (
    <Cell key={d.faixa} fill={i === destaque ? "var(--signal)" : "var(--color-empresas)"} />
  ))}
</Bar>`}
          >
            <Card className="w-full">
              <CardHeader>
                <CardDescription className="font-mono text-xs tracking-label uppercase">Aderência média</CardDescription>
                <CardTitle className="text-4xl font-light">78%</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={fitConfig} className="h-40 w-full">
                  <BarChart data={fit} margin={{ left: 0, right: 0, top: 4 }}>
                    <XAxis dataKey="faixa" tickLine={false} axisLine={false} tickMargin={6} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="empresas" radius={3}>
                      {fit.map((d) => (
                        <Cell key={d.faixa} fill={d.faixa === "85" ? "var(--signal)" : "var(--color-empresas)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </Example>

          <Example
            title="Rosca com total"
            description="Label no centro com o total; legenda abaixo."
            previewClassName="block"
            code={`<PieChart>
  <Pie data={data} dataKey="empresas" nameKey="setor" innerRadius={60}>
    <Label content={…total…} />
  </Pie>
  <ChartLegend content={<ChartLegendContent nameKey="setor" />} />
</PieChart>`}
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Empresas por setor</CardTitle>
                <CardDescription>Aderência acima de 70%</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={sectorConfig} className="mx-auto aspect-square h-64">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="setor" />} />
                    <Pie data={sectors} dataKey="empresas" nameKey="setor" innerRadius={62} strokeWidth={4} stroke="var(--card)">
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground font-heading text-3xl font-light">
                                  {total}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 22} className="fill-muted-foreground text-xs">
                                  empresas
                                </tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="setor" />} className="flex-wrap gap-2" />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"`}
          usageCode={`const chartConfig = {
  oportunidades: { label: "Oportunidades", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-64 w-full">
  <BarChart data={data}>
    <XAxis dataKey="semana" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="oportunidades" fill="var(--color-oportunidades)" radius={4} />
  </BarChart>
</ChartContainer>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="ChartContainer"
          rows={[
            { prop: "config", type: "ChartConfig", description: "Mapa série → { label, color | theme, icon }. Gera as variáveis --color-<série>." },
            { prop: "className", type: "string", description: "Defina a altura (h-64) ou aspect-*. Padrão: aspect-video." },
            { prop: "children", type: "Recharts chart", description: "Um gráfico do Recharts (BarChart, AreaChart, …)." },
          ]}
        />
        <PropsTable
          component="ChartTooltipContent"
          rows={[
            { prop: "indicator", type: '"dot" | "line" | "dashed"', default: '"dot"', description: "Marcador de cor de cada série." },
            { prop: "hideLabel", type: "boolean", default: "false", description: "Oculta o rótulo (p. ex. a semana)." },
            { prop: "hideIndicator", type: "boolean", default: "false", description: "Oculta o marcador de cor." },
            { prop: "nameKey · labelKey", type: "string", description: "Campos usados para nome e rótulo." },
            { prop: "formatter · labelFormatter", type: "function", description: "Formata valores e rótulos." },
          ]}
        />
        <PropsTable
          component="ChartLegendContent"
          rows={[
            { prop: "nameKey", type: "string", description: "Campo do dado usado como nome da legenda." },
            { prop: "hideIcon", type: "boolean", default: "false", description: "Oculta o ícone/cor." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Recharts adiciona navegação por teclado (<code className="font-mono text-sm">accessibilityLayer</code>): setas percorrem os pontos com tooltip.</>,
            <>Sempre dê um título visível e um resumo em texto do que o gráfico mostra (“Oportunidades cresceram 157% em 8 semanas”).</>,
            <>Não dependa só da cor: use rótulos, legenda e, quando possível, padrões ou ordem diferentes.</>,
            <>Para dados críticos, ofereça também uma tabela.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
