"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["default", "sm"] as const

export default function NativeSelectPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [value, setValue] = useState("industria")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Native Select"
        description="O select nativo do navegador, estilizado como pílula. Leve e confiável — no celular abre o seletor do sistema. Para busca na lista, use Combobox."
        source="src/components/ui/native-select.tsx"
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
              <NativeSelect
                size={size}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={disabled}
                aria-invalid={invalid || undefined}
                aria-label="Setor"
                className="w-56"
              >
                <NativeSelectOption value="industria">Indústria</NativeSelectOption>
                <NativeSelectOption value="servicos">Serviços</NativeSelectOption>
                <NativeSelectOption value="varejo">Varejo</NativeSelectOption>
                <NativeSelectOption value="tecnologia">Tecnologia</NativeSelectOption>
              </NativeSelect>
              <span className="font-mono text-xs text-muted-foreground">valor: {value}</span>
            </div>
          }
          code={`<NativeSelect${size !== "default" ? ` size="${size}"` : ""} value={value} onChange={(e) => setValue(e.target.value)}${disabled ? " disabled" : ""}${invalid ? " aria-invalid" : ""}>
  <NativeSelectOption value="industria">Indústria</NativeSelectOption>
  <NativeSelectOption value="servicos">Serviços</NativeSelectOption>
  …
</NativeSelect>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Com grupos"
            code={`<NativeSelect>
  <NativeSelectOptGroup label="Sudeste">
    <NativeSelectOption>São Paulo</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>`}
          >
            <NativeSelect aria-label="Estado" defaultValue="" className="w-56">
              <NativeSelectOption value="" disabled>
                Escolha um estado
              </NativeSelectOption>
              <NativeSelectOptGroup label="Sudeste">
                <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
                <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
                <NativeSelectOption value="mg">Minas Gerais</NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Sul">
                <NativeSelectOption value="pr">Paraná</NativeSelectOption>
                <NativeSelectOption value="sc">Santa Catarina</NativeSelectOption>
              </NativeSelectOptGroup>
            </NativeSelect>
          </Example>
          <Example
            title="Em um Field"
            previewClassName="block"
            code={`<Field>
  <FieldLabel htmlFor="porte">Porte</FieldLabel>
  <NativeSelect id="porte" className="w-full">…</NativeSelect>
  <FieldDescription>…</FieldDescription>
</Field>`}
          >
            <Field>
              <FieldLabel htmlFor="ns-porte">Porte</FieldLabel>
              <NativeSelect id="ns-porte" defaultValue="200-500" className="w-full">
                <NativeSelectOption value="50-200">50–200 pessoas</NativeSelectOption>
                <NativeSelectOption value="200-500">200–500 pessoas</NativeSelectOption>
                <NativeSelectOption value="500+">Mais de 500</NativeSelectOption>
              </NativeSelect>
              <FieldDescription>Número aproximado de funcionários.</FieldDescription>
            </Field>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"`}
          usageCode={`<NativeSelect defaultValue="industria">\n  <NativeSelectOption value="industria">Indústria</NativeSelectOption>\n</NativeSelect>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="NativeSelect"
          rows={[
            { prop: "size", type: '"default" | "sm"', default: '"default"', description: "40px ou 32px de altura." },
            { prop: "className", type: "string", description: "Aplicado ao contêiner (use para largura: w-full, w-56)." },
            { prop: "…props", type: 'React.ComponentProps<"select">', description: "value, onChange, disabled, name, required…" },
          ]}
        />
        <PropsTable component="NativeSelectOption · NativeSelectOptGroup" rows={[{ prop: "…props", type: "option · optgroup", description: "Props nativas." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>É um <code className="font-mono text-sm">select</code> nativo: teclado, leitor de tela e seletor do celular funcionam sem nada extra.</>,
            <>Precisa de rótulo (FieldLabel com htmlFor, ou <code className="font-mono text-sm">aria-label</code>).</>,
            <>Para “escolha uma opção”, use uma opção vazia <code className="font-mono text-sm">disabled</code> como primeira.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
