"use client"

import { useState } from "react"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["default", "sm"] as const

export default function SwitchPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [checked, setChecked] = useState(true)
  const [disabled, setDisabled] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Switch"
        description="Liga e desliga algo que tem efeito imediato — uma preferência, um alerta. Se a mudança só vale ao salvar um formulário, use Checkbox."
        source="src/components/ui/switch.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlToggle label="checked" checked={checked} onChange={setChecked} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <Label className="gap-3 text-base font-normal">
              <Switch size={size} checked={checked} onCheckedChange={setChecked} disabled={disabled} />
              Alertas de novos sinais {checked ? "ativos" : "desativados"}
            </Label>
          }
          code={`<Label>
  <Switch${size !== "default" ? ` size="${size}"` : ""} checked={checked} onCheckedChange={setChecked}${disabled ? " disabled" : ""} />
  Alertas de novos sinais
</Label>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Lista de preferências"
          description="Field horizontal com título e descrição."
          previewClassName="block"
          code={`<Field orientation="horizontal">
  <FieldContent>
    <FieldLabel htmlFor="alertas">Alertas por e-mail</FieldLabel>
    <FieldDescription>…</FieldDescription>
  </FieldContent>
  <Switch id="alertas" />
</Field>`}
        >
          <FieldGroup className="mx-auto max-w-md">
            {[
              { id: "sw-email", t: "Alertas por e-mail", d: "Quando surgir uma empresa com aderência acima de 90%.", on: true },
              { id: "sw-resumo", t: "Resumo semanal", d: "As oportunidades da semana, toda segunda.", on: true },
              { id: "sw-beta", t: "Sinais experimentais", d: "Detecção de expansão por notícias. Em teste.", on: false },
            ].map((o) => (
              <Field key={o.id} orientation="horizontal">
                <FieldContent>
                  <FieldLabel htmlFor={o.id}>
                    <FieldTitle>{o.t}</FieldTitle>
                  </FieldLabel>
                  <FieldDescription>{o.d}</FieldDescription>
                </FieldContent>
                <Switch id={o.id} defaultChecked={o.on} />
              </Field>
            ))}
          </FieldGroup>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Switch } from "@/components/ui/switch"`} usageCode={`<Label>\n  <Switch defaultChecked />\n  Modo escuro\n</Label>`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Switch"
          rows={[
            { prop: "checked · onCheckedChange", type: "boolean", description: "Estado controlado." },
            { prop: "defaultChecked", type: "boolean", default: "false", description: "Estado inicial." },
            { prop: "size", type: '"default" | "sm"', default: '"default"', description: "Tamanho." },
            { prop: "disabled · name · required", type: "—", description: "Props de formulário." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">role=&quot;switch&quot;</code> com <code className="font-mono text-sm">aria-checked</code>; <Kbd>Espaço</Kbd> alterna.</>,
            <>O rótulo descreve o que é ligado (“Alertas por e-mail”), não o estado — o estado é anunciado.</>,
            <>A mudança deve acontecer na hora; se precisar confirmar, é um Checkbox dentro de formulário.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
