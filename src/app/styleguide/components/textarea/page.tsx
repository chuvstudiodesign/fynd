"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function TextareaPage() {
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [text, setText] = useState("")
  const max = 280

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Textarea"
        description="Texto longo, em várias linhas. Cresce com o conteúdo (field-sizing) até onde você limitar. Cantos de 12px — a pílula não funciona em várias linhas."
        source="src/components/ui/textarea.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
              <ControlToggle label="aria-invalid" checked={invalid} onChange={setInvalid} />
            </>
          }
          preview={
            <Textarea
              placeholder="Descreva seu cliente ideal…"
              aria-label="Descrição do cliente ideal"
              disabled={disabled}
              aria-invalid={invalid || undefined}
              className="max-h-48 max-w-md"
            />
          }
          code={`<Textarea placeholder="Descreva seu cliente ideal…"${disabled ? " disabled" : ""}${invalid ? " aria-invalid" : ""} className="max-h-48" />`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Com contador"
          description="Field + contagem de caracteres anunciada."
          previewClassName="block"
          code={`<Field data-invalid={texto.length > max}>
  <FieldLabel htmlFor="nota">Nota para o time</FieldLabel>
  <Textarea id="nota" value={texto} onChange={…} aria-describedby="nota-contador" />
  <FieldDescription id="nota-contador">{texto.length}/{max}</FieldDescription>
</Field>`}
        >
          <Field data-invalid={text.length > max || undefined} className="mx-auto max-w-md">
            <FieldLabel htmlFor="ta-nota">Nota para o time</FieldLabel>
            <Textarea
              id="ta-nota"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Por que esta empresa é prioridade?"
              aria-invalid={text.length > max || undefined}
              aria-describedby="ta-contador"
              className="min-h-24"
            />
            <div className="flex items-center justify-between">
              {text.length > max ? <FieldError>Encurte a nota em {text.length - max} caracteres.</FieldError> : <span />}
              <FieldDescription id="ta-contador" className="font-mono text-xs tabular-nums" aria-live="polite">
                {text.length}/{max}
              </FieldDescription>
            </div>
          </Field>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Textarea } from "@/components/ui/textarea"`} usageCode={`<Textarea placeholder="Escreva…" />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Textarea"
          rows={[
            { prop: "…props", type: 'React.ComponentProps<"textarea">', description: "Props nativas: rows, maxLength, value, onChange…" },
            { prop: "className", type: "string", description: "Limite a altura com max-h-* — o campo cresce até lá e depois rola." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Precisa de rótulo (FieldLabel com htmlFor ou <code className="font-mono text-sm">aria-label</code>).</>,
            <>Ligue contadores e dicas com <code className="font-mono text-sm">aria-describedby</code>.</>,
            <>Não bloqueie a digitação no limite; mostre o excesso e explique como corrigir.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
