"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const modes = ["single", "range", "multiple"] as const
const captions = ["label", "dropdown"] as const

const fmt = (d?: Date) => (d ? d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "—")

export default function CalendarPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>("single")
  const [caption, setCaption] = useState<(typeof captions)[number]>("label")
  const [twoMonths, setTwoMonths] = useState(false)
  const [weekNumbers, setWeekNumbers] = useState(false)

  const [single, setSingle] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = new Date()
    const to = new Date()
    to.setDate(from.getDate() + 6)
    return { from, to }
  })
  const [multiple, setMultiple] = useState<Date[] | undefined>([])

  const common = {
    captionLayout: caption,
    numberOfMonths: twoMonths ? 2 : 1,
    showWeekNumber: weekNumbers,
    className: "rounded-xl border",
  } as const

  const value =
    mode === "single"
      ? fmt(single)
      : mode === "range"
        ? `${fmt(range?.from)} → ${fmt(range?.to)}`
        : `${multiple?.length ?? 0} datas`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Calendar"
        description="Seleção de datas para agendar a primeira conversa ou filtrar sinais por período. Em português por padrão, com dias em pílula como o restante do sistema."
        source="src/components/ui/calendar.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="mode" value={mode} options={modes} onChange={setMode} />
              <ControlSegment label="captionLayout" value={caption} options={captions} onChange={setCaption} />
              <ControlToggle label="2 meses" checked={twoMonths} onChange={setTwoMonths} />
              <ControlToggle label="nº semana" checked={weekNumbers} onChange={setWeekNumbers} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              {mode === "single" && <Calendar mode="single" selected={single} onSelect={setSingle} {...common} />}
              {mode === "range" && <Calendar mode="range" selected={range} onSelect={setRange} {...common} />}
              {mode === "multiple" && <Calendar mode="multiple" selected={multiple} onSelect={setMultiple} {...common} />}
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {value}
              </span>
            </div>
          }
          code={`const [date, setDate] = useState<${mode === "single" ? "Date" : mode === "range" ? "DateRange" : "Date[]"}>()

<Calendar
  mode="${mode}"
  selected={date}
  onSelect={setDate}${caption !== "label" ? `\n  captionLayout="${caption}"` : ""}${twoMonths ? "\n  numberOfMonths={2}" : ""}${weekNumbers ? "\n  showWeekNumber" : ""}
  className="rounded-xl border"
/>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Dias indisponíveis"
            description="disabled bloqueia fins de semana e datas passadas."
            code={`<Calendar
  mode="single"
  disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
/>`}
          >
            <Calendar mode="single" disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]} className="rounded-xl border" />
          </Example>
          <Example
            title="Dentro de um Card"
            description="Em cards, o fundo do calendário fica transparente."
            code={`<Card>
  <CardContent>
    <Calendar mode="single" … />
  </CardContent>
</Card>`}
          >
            <Card className="w-fit">
              <CardContent>
                <Calendar mode="single" selected={single} onSelect={setSingle} />
              </CardContent>
            </Card>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Calendar } from "@/components/ui/calendar"`}
          usageCode={`const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border" />`}
        />
      </DocSection>

      <DocSection title="Props" description="Calendar repassa todas as props do DayPicker (react-day-picker v10). As principais:">
        <PropsTable
          component="Calendar"
          rows={[
            { prop: "mode", type: '"single" | "multiple" | "range"', description: "Tipo de seleção." },
            { prop: "selected", type: "Date | Date[] | DateRange", description: "Valor selecionado (controlado)." },
            { prop: "onSelect", type: "(value) => void", description: "Chamado ao selecionar." },
            { prop: "locale", type: "Locale", default: "ptBR", description: "Idioma. A fynd usa português por padrão." },
            { prop: "captionLayout", type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"', default: '"label"', description: "Cabeçalho do mês." },
            { prop: "numberOfMonths", type: "number", default: "1", description: "Quantos meses exibir." },
            { prop: "disabled", type: "Matcher | Matcher[]", description: "Datas indisponíveis." },
            { prop: "showOutsideDays", type: "boolean", default: "true", description: "Mostra dias do mês vizinho." },
            { prop: "showWeekNumber", type: "boolean", default: "false", description: "Exibe o número da semana." },
            { prop: "buttonVariant", type: "Button variant", default: '"ghost"', description: "Variante das setas de navegação." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>A grade usa <code className="font-mono text-sm">role=&quot;grid&quot;</code>; cada dia é um botão com a data completa no nome acessível.</>,
            <><Kbd>←</Kbd> <Kbd>→</Kbd> mudam o dia, <Kbd>↑</Kbd> <Kbd>↓</Kbd> a semana; <Kbd>PageUp</Kbd> <Kbd>PageDown</Kbd> o mês; <Kbd>Home</Kbd> <Kbd>End</Kbd> o início e o fim da semana.</>,
            <>Dias desabilitados recebem <code className="font-mono text-sm">aria-disabled</code> e não podem ser focados.</>,
            <>Mostre a data escolhida em texto fora do calendário para confirmação.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
