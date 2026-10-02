"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function LabelPage() {
  const [text, setText] = useState("E-mail comercial")
  const [required, setRequired] = useState(true)
  const [disabled, setDisabled] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Label"
        description="Rótulo acessível para um controle de formulário. Nomeia o campo para leitores de tela e amplia a área de clique."
        source="src/components/ui/label.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlText label="texto" value={text} onChange={setText} />
              <ControlToggle label="obrigatório" checked={required} onChange={setRequired} />
              <ControlToggle label="campo desabilitado" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className="flex w-full max-w-sm flex-col gap-2">
              <Label htmlFor="lb-email">
                {text}
                {required && (
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                )}
              </Label>
              <Input id="lb-email" type="email" required={required} disabled={disabled} className="peer" placeholder="nome@empresa.com.br" />
            </div>
          }
          code={`<Label htmlFor="email">
  ${text}${required ? '\n  <span className="text-destructive" aria-hidden="true">*</span>' : ""}
</Label>
<Input id="email" type="email"${required ? " required" : ""}${disabled ? " disabled" : ""} />`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Envolvendo o controle"
            description="Sem htmlFor: o Label contém o controle."
            previewClassName="flex-col items-start"
            code={`<Label>\n  <Checkbox />\n  Aceito receber novidades\n</Label>`}
          >
            <Label>
              <Checkbox />
              Aceito receber novidades da fynd
            </Label>
            <RadioGroup defaultValue="semanal" className="w-auto">
              {["Diário", "Semanal"].map((f) => (
                <Label key={f} className="font-normal">
                  <RadioGroupItem value={f.toLowerCase()} />
                  Resumo {f.toLowerCase()}
                </Label>
              ))}
            </RadioGroup>
          </Example>
          <Example
            title="Com htmlFor"
            description="Label e campo separados, ligados pelo id."
            previewClassName="flex-col items-stretch"
            code={`<Label htmlFor="cnpj">CNPJ</Label>\n<Input id="cnpj" />`}
          >
            <Label htmlFor="lb-cnpj">CNPJ</Label>
            <Input id="lb-cnpj" placeholder="00.000.000/0001-00" />
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Label } from "@/components/ui/label"`} usageCode={`<Label htmlFor="nome">Nome</Label>\n<Input id="nome" />`} />
        <p className="text-sm text-muted-foreground">Em formulários, prefira FieldLabel dentro de Field — ele adiciona os estados de erro e desabilitado.</p>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Label"
          rows={[
            { prop: "htmlFor", type: "string", description: "id do controle que o rótulo nomeia." },
            { prop: "…props", type: 'React.ComponentProps<"label">', description: "Props nativas de label." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Clicar no rótulo foca ou marca o controle — área de toque maior no celular.</>,
            <>O asterisco de obrigatório é <code className="font-mono text-sm">aria-hidden</code>; o <code className="font-mono text-sm">required</code> no campo é o que o leitor anuncia.</>,
            <>Um controle, um rótulo. Não use o mesmo texto para dois campos.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
