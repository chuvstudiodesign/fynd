"use client"

import { useState } from "react"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const regions = [
  { value: "sudeste", label: "Sudeste" },
  { value: "sul", label: "Sul" },
  { value: "nordeste", label: "Nordeste" },
  { value: "brasil", label: "Todo o Brasil" },
]
const orientations = ["vertical", "horizontal"] as const

export default function RadioGroupPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("vertical")
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState("sudeste")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Radio Group"
        description="Escolha única entre poucas opções visíveis ao mesmo tempo. Para muitas opções, use Select ou Combobox."
        source="src/components/ui/radio-group.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <RadioGroup
                value={value}
                onValueChange={(v) => setValue(v as string)}
                disabled={disabled}
                aria-label="Região"
                className={orientation === "horizontal" ? "flex w-auto flex-wrap gap-6" : "w-auto"}
              >
                {regions.map((r) => (
                  <Label key={r.value} className="font-normal">
                    <RadioGroupItem value={r.value} />
                    {r.label}
                  </Label>
                ))}
              </RadioGroup>
              <span className="font-mono text-xs text-muted-foreground">valor: {value}</span>
            </div>
          }
          code={`<RadioGroup value={value} onValueChange={setValue}${disabled ? " disabled" : ""}${orientation === "horizontal" ? ' className="flex gap-6"' : ""}>
  <Label><RadioGroupItem value="sudeste" />Sudeste</Label>
  <Label><RadioGroupItem value="sul" />Sul</Label>
  …
</RadioGroup>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Com descrição"
            previewClassName="block"
            code={`<Field orientation="horizontal">
  <RadioGroupItem value="semanal" id="semanal" />
  <FieldContent>
    <FieldLabel htmlFor="semanal">Semanal</FieldLabel>
    <FieldDescription>…</FieldDescription>
  </FieldContent>
</Field>`}
          >
            <FieldSet>
              <FieldLegend variant="label">Frequência dos alertas</FieldLegend>
              <RadioGroup defaultValue="semanal">
                {[
                  { v: "diario", t: "Diário", d: "Um resumo por dia com novos sinais." },
                  { v: "semanal", t: "Semanal", d: "As oportunidades da semana, toda segunda." },
                  { v: "nunca", t: "Só no app", d: "Sem e-mails." },
                ].map((o) => (
                  <Field key={o.v} orientation="horizontal">
                    <RadioGroupItem value={o.v} id={`rg-${o.v}`} />
                    <FieldContent>
                      <FieldLabel htmlFor={`rg-${o.v}`}>{o.t}</FieldLabel>
                      <FieldDescription>{o.d}</FieldDescription>
                    </FieldContent>
                  </Field>
                ))}
              </RadioGroup>
            </FieldSet>
          </Example>
          <Example
            title="Cartões"
            description="FieldLabel envolvendo o Field vira cartão selecionável."
            previewClassName="block"
            code={`<FieldLabel htmlFor="pro">
  <Field orientation="horizontal">
    <FieldContent><FieldTitle>Pro</FieldTitle>…</FieldContent>
    <RadioGroupItem value="pro" id="pro" />
  </Field>
</FieldLabel>`}
          >
            <RadioGroup defaultValue="media">
              {[
                { v: "pequena", t: "Até 50 pessoas", d: "Decisão rápida, ticket menor." },
                { v: "media", t: "50 a 500 pessoas", d: "O ponto ideal para a maioria dos times." },
                { v: "grande", t: "Mais de 500", d: "Ciclos longos, vários decisores." },
              ].map((o) => (
                <FieldLabel key={o.v} htmlFor={`rgc-${o.v}`}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{o.t}</FieldTitle>
                      <FieldDescription>{o.d}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={o.v} id={`rgc-${o.v}`} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
          usageCode={`<RadioGroup defaultValue="a">\n  <Label><RadioGroupItem value="a" />Opção A</Label>\n  <Label><RadioGroupItem value="b" />Opção B</Label>\n</RadioGroup>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="RadioGroup"
          rows={[
            { prop: "value · onValueChange", type: "any", description: "Valor selecionado (controlado)." },
            { prop: "defaultValue", type: "any", description: "Valor inicial." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o grupo." },
            { prop: "name · required", type: "string · boolean", description: "Para formulários." },
          ]}
        />
        <PropsTable
          component="RadioGroupItem"
          rows={[
            { prop: "value", type: "any", description: "Valor da opção. Obrigatório." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita só esta opção." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">role=&quot;radiogroup&quot;</code> — dê nome com <code className="font-mono text-sm">aria-label</code> ou FieldLegend.</>,
            <>O grupo é uma única parada de <Kbd>Tab</Kbd>; <Kbd>↑</Kbd> <Kbd>↓</Kbd> <Kbd>←</Kbd> <Kbd>→</Kbd> mudam a seleção.</>,
            <>Cada opção precisa de rótulo clicável (Label envolvendo ou FieldLabel com htmlFor).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
