"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sectors = [
  { label: "Escolha um setor", value: null },
  { label: "Indústria", value: "industria" },
  { label: "Serviços", value: "servicos" },
  { label: "Varejo", value: "varejo" },
  { label: "Tecnologia", value: "tecnologia" },
  { label: "Logística", value: "logistica" },
]
const sizes = ["default", "sm"] as const

const orderItems = [
  { label: "Aderência", value: "aderencia" },
  { label: "Porte", value: "porte" },
  { label: "Mais recentes", value: "recentes" },
]

export default function SelectPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [value, setValue] = useState<string | null>("industria")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Select"
        description="Lista de opções com visual da marca, em pílula. Para muitas opções com busca, use Combobox; para máxima simplicidade no celular, Native Select."
        source="src/components/ui/select.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
              <ControlToggle label="aria-invalid" checked={invalid} onChange={setInvalid} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <Select items={sectors} value={value} onValueChange={(v) => setValue(v as string | null)} disabled={disabled}>
                <SelectTrigger size={size} className="w-56" aria-label="Setor" aria-invalid={invalid || undefined}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sectors.map((s) => (
                      <SelectItem key={s.label} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span className="font-mono text-xs text-muted-foreground">valor: {value ?? "null"}</span>
            </div>
          }
          code={`const items = [
  { label: "Escolha um setor", value: null },
  { label: "Indústria", value: "industria" },
  …
]

<Select items={items} value={value} onValueChange={setValue}${disabled ? " disabled" : ""}>
  <SelectTrigger${size !== "default" ? ` size="${size}"` : ""}${invalid ? " aria-invalid" : ""}>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {items.map((i) => <SelectItem key={i.label} value={i.value}>{i.label}</SelectItem>)}
  </SelectContent>
</Select>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Grupos e separador"
            code={`<SelectContent>
  <SelectGroup>
    <SelectLabel>Sudeste</SelectLabel>
    <SelectItem value="sp">São Paulo</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>…</SelectGroup>
</SelectContent>`}
          >
            <Select
              items={[
                { label: "Escolha um estado", value: null },
                { label: "São Paulo", value: "sp" },
                { label: "Rio de Janeiro", value: "rj" },
                { label: "Minas Gerais", value: "mg" },
                { label: "Paraná", value: "pr" },
                { label: "Santa Catarina", value: "sc" },
              ]}
            >
              <SelectTrigger className="w-56" aria-label="Estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sudeste</SelectLabel>
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg">Minas Gerais</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>Sul</SelectLabel>
                  <SelectItem value="pr">Paraná</SelectItem>
                  <SelectItem value="sc">Santa Catarina</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Example>
          <Example
            title="Em um Field"
            previewClassName="block"
            code={`<Field>
  <FieldLabel htmlFor="ordem">Ordenar por</FieldLabel>
  <Select items={items} defaultValue="aderencia">
    <SelectTrigger id="ordem" className="w-full"><SelectValue /></SelectTrigger>
    …
  </Select>
</Field>`}
          >
            <Field>
              <FieldLabel htmlFor="sel-ordem">Ordenar por</FieldLabel>
              <Select items={orderItems} defaultValue="aderencia">
                <SelectTrigger id="sel-ordem" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {orderItems.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>A ordem da lista de oportunidades.</FieldDescription>
            </Field>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`}
          usageCode={`<Select items={items}>\n  <SelectTrigger><SelectValue /></SelectTrigger>\n  <SelectContent>…SelectItem…</SelectContent>\n</Select>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Select"
          rows={[
            { prop: "items", type: "{ label, value }[]", description: "Mapa valor → rótulo; o SelectValue mostra o rótulo do valor escolhido." },
            { prop: "value · onValueChange", type: "any", description: "Valor controlado." },
            { prop: "defaultValue", type: "any", description: "Valor inicial." },
            { prop: "multiple", type: "boolean", default: "false", description: "Seleção múltipla." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita." },
          ]}
        />
        <PropsTable component="SelectTrigger" rows={[{ prop: "size", type: '"default" | "sm"', default: '"default"', description: "40px ou 32px." }]} />
        <PropsTable
          component="SelectContent"
          rows={[
            { prop: "side", type: '"bottom" | "top" | …', default: '"bottom"', description: "Lado em que abre." },
            { prop: "alignItemWithTrigger", type: "boolean", default: "true", description: "Alinha o item selecionado sobre o gatilho, como no macOS." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Gatilho com <code className="font-mono text-sm">role=&quot;combobox&quot;</code>; a lista é um <code className="font-mono text-sm">listbox</code>.</>,
            <><Kbd>Enter</Kbd>, <Kbd>Espaço</Kbd> ou <Kbd>↓</Kbd> abrem; digitar a primeira letra pula para a opção; <Kbd>Esc</Kbd> fecha.</>,
            <>Ligue um rótulo ao gatilho (FieldLabel com htmlFor = id do SelectTrigger, ou aria-label).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
