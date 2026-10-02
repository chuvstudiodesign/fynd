"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ControlSegment, ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const types = ["text", "email", "password", "number", "search", "tel", "url"] as const

export default function InputPage() {
  const [type, setType] = useState<(typeof types)[number]>("text")
  const [placeholder, setPlaceholder] = useState("Empresa Exemplo")
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Input"
        description="Campo de texto de uma linha. Em pílula, como o “Buscar empresa” do Figma. Sempre dentro de um Field com rótulo."
        source="src/components/ui/input.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="type" value={type} options={types} onChange={setType} />
              <ControlText label="placeholder" value={placeholder} onChange={setPlaceholder} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
              <ControlToggle label="aria-invalid" checked={invalid} onChange={setInvalid} />
            </>
          }
          preview={
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={invalid || undefined}
              aria-label="Exemplo de campo"
              className="max-w-sm"
            />
          }
          code={`<Input type="${type}" placeholder="${placeholder}"${disabled ? " disabled" : ""}${invalid ? " aria-invalid" : ""} />`}
        />
      </DocSection>

      <DocSection title="Estados">
        <Example code={`<Input />\n<Input defaultValue="…" />\n<Input disabled />\n<Input aria-invalid />\n<Input readOnly />\n<Input type="file" />`}>
          <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <Input aria-label="Vazio" placeholder="Vazio" />
          <Input aria-label="Preenchido" defaultValue="Alfa Embalagens" />
          <Input aria-label="Desabilitado" placeholder="Desabilitado" disabled />
          <Input aria-label="Inválido" defaultValue="nome@" aria-invalid />
          <Input aria-label="Somente leitura" defaultValue="00.000.000/0001-00" readOnly />
          <Input aria-label="Arquivo" type="file" />
          </div>
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Com Field"
            description="Rótulo, descrição e erro."
            previewClassName="block"
            code={`<Field data-invalid>
  <FieldLabel htmlFor="cnpj">CNPJ</FieldLabel>
  <Input id="cnpj" aria-invalid />
  <FieldError>CNPJ inválido.</FieldError>
</Field>`}
          >
            <div className="flex flex-col gap-6">
              <Field>
                <FieldLabel htmlFor="in-site">Site da empresa</FieldLabel>
                <Input id="in-site" type="url" placeholder="https://" />
                <FieldDescription>Usamos o site para enriquecer o contexto.</FieldDescription>
              </Field>
              <Field data-invalid>
                <FieldLabel htmlFor="in-cnpj">CNPJ</FieldLabel>
                <Input id="in-cnpj" defaultValue="00.000.000/0001" aria-invalid />
                <FieldError>O CNPJ tem 14 dígitos. Confira os números.</FieldError>
              </Field>
            </div>
          </Example>
          <Example
            title="Tamanhos"
            description="Ajuste com className quando o contexto pedir."
            previewClassName="flex-col items-stretch"
            code={`<Input className="h-8 text-sm" />\n<Input />\n<Input className="h-12 px-5 text-base" />`}
          >
            <Input aria-label="Pequeno" placeholder="h-8" className="h-8 text-sm" />
            <Input aria-label="Padrão" placeholder="Padrão (40px)" />
            <Input aria-label="Grande" placeholder="h-12 — landing pages" className="h-12 px-5 text-base" />
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Input } from "@/components/ui/input"`} usageCode={`<Input type="email" placeholder="nome@empresa.com.br" />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Input"
          rows={[
            { prop: "type", type: "string", default: '"text"', description: "Qualquer tipo nativo: email, password, number, file…" },
            { prop: "aria-invalid", type: "boolean", description: "Borda e anel de erro." },
            { prop: "…props", type: 'React.ComponentProps<"input">', description: "Todas as props nativas de input." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Todo campo precisa de rótulo visível (FieldLabel). Placeholder some ao digitar e não substitui o rótulo.</>,
            <>Use o <code className="font-mono text-sm">type</code> certo: o teclado do celular muda (e-mail, número, telefone).</>,
            <>Adicione <code className="font-mono text-sm">autoComplete</code> em dados pessoais (name, email, organization).</>,
            <>Borda e texto têm contraste ≥ 3:1 com o fundo; o foco mostra um anel de 3px.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
