"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { Label } from "@/components/ui/label"
import { DatePicker, DateRangePicker } from "@/components/date-picker"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const modes = ["data", "período"] as const

export default function DatePickerPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>("data")
  const [clearable, setClearable] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [weekdays, setWeekdays] = useState(false)

  const [date, setDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  const [meeting, setMeeting] = useState<Date | undefined>()
  const [tomorrow] = useState(() => new Date(Date.now() + 86_400_000))

  const disabledDays = weekdays ? [{ dayOfWeek: [0, 6] }] : undefined

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Date Picker"
        description="Campo que abre um calendário. Composição da fynd de Popover + Calendar + Button, para agendar a conversa ou filtrar por período."
        source={["src/components/date-picker.tsx", "src/components/ui/calendar.tsx", "src/components/ui/popover.tsx"]}
      />

      <DocSection title="Playground">
        <Playground
          previewClassName="min-h-40"
          controls={
            <>
              <ControlSegment label="modo" value={mode} options={modes} onChange={setMode} />
              <ControlToggle label="clearable" checked={clearable} onChange={setClearable} />
              <ControlToggle label="só dias úteis" checked={weekdays} onChange={setWeekdays} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            mode === "data" ? (
              <DatePicker value={date} onChange={setDate} clearable={clearable} disabled={disabled} disabledDays={disabledDays} />
            ) : (
              <DateRangePicker value={range} onChange={setRange} disabled={disabled} disabledDays={disabledDays} />
            )
          }
          code={
            mode === "data"
              ? `const [date, setDate] = useState<Date>()

<DatePicker value={date} onChange={setDate}${clearable ? " clearable" : ""}${disabled ? " disabled" : ""}${weekdays ? "\n  disabledDays={[{ dayOfWeek: [0, 6] }]}" : ""} />`
              : `const [range, setRange] = useState<DateRange>()

<DateRangePicker value={range} onChange={setRange}${disabled ? " disabled" : ""}${weekdays ? "\n  disabledDays={[{ dayOfWeek: [0, 6] }]}" : ""} />`
          }
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Com rótulo"
            description="Agendar a primeira conversa, a partir de amanhã."
            previewClassName="flex-col items-start"
            code={`<Label htmlFor="reuniao">Data da conversa</Label>
<DatePicker aria-label="Data da conversa" disabledDays={{ before: amanha }} … />`}
          >
            <div className="flex flex-col gap-2">
              <Label>Data da conversa</Label>
              <DatePicker
                value={meeting}
                onChange={setMeeting}
                aria-label="Data da conversa"
                disabledDays={{ before: tomorrow }}
                placeholder="Escolha um dia"
              />
              <span className="text-sm text-muted-foreground">Enviaremos o contexto da empresa um dia antes.</span>
            </div>
          </Example>
          <Example
            title="Período de sinais"
            description="Filtrar oportunidades por intervalo."
            code={`<DateRangePicker value={range} onChange={setRange} numberOfMonths={2} />`}
          >
            <DateRangePicker value={range} onChange={setRange} />
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { DatePicker, DateRangePicker } from "@/components/date-picker"`}
          usageCode={`const [date, setDate] = useState<Date>()

<DatePicker value={date} onChange={setDate} />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="DatePicker"
          rows={[
            { prop: "value", type: "Date", description: "Data selecionada." },
            { prop: "onChange", type: "(date?: Date) => void", description: "Chamado ao escolher (fecha o popover)." },
            { prop: "placeholder", type: "string", default: '"Escolha uma data"', description: "Texto quando vazio." },
            { prop: "clearable", type: "boolean", default: "false", description: "Botão para limpar a data." },
            { prop: "disabledDays", type: "Matcher | Matcher[]", description: "Datas indisponíveis (react-day-picker)." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o campo." },
          ]}
        />
        <PropsTable
          component="DateRangePicker"
          rows={[
            { prop: "value", type: "DateRange", description: "{ from, to }." },
            { prop: "onChange", type: "(range?: DateRange) => void", description: "Chamado a cada clique." },
            { prop: "numberOfMonths", type: "number", default: "2", description: "Meses exibidos." },
            { prop: "placeholder · disabledDays · disabled", type: "—", description: "Iguais ao DatePicker." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O gatilho é um botão com <code className="font-mono text-sm">aria-haspopup</code> e <code className="font-mono text-sm">aria-expanded</code>; passe <code className="font-mono text-sm">aria-label</code> quando o rótulo visível não estiver ligado a ele.</>,
            <>Ao abrir, o foco vai para o calendário: <Kbd>←</Kbd> <Kbd>→</Kbd> <Kbd>↑</Kbd> <Kbd>↓</Kbd> navegam, <Kbd>Enter</Kbd> escolhe, <Kbd>Esc</Kbd> fecha e devolve o foco.</>,
            <>A data escolhida aparece por extenso no botão (“02 de out. de 2026”), sem ambiguidade de formato.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
