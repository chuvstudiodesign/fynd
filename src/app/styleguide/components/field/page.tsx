"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const orientations = ["vertical", "horizontal", "responsive"] as const

export default function FieldPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("vertical")
  const [description, setDescription] = useState(true)
  const [invalid, setInvalid] = useState(false)

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const emailError = submitted && !/^\S+@\S+\.\S+$/.test(email) ? [{ message: "Informe um e-mail válido, como nome@empresa.com.br." }] : undefined

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Field"
        description="Estrutura de formulário: rótulo, controle, descrição e erro amarrados com a acessibilidade certa. Use em todo campo — é o que dá consistência aos formulários da fynd."
        source="src/components/ui/field.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlToggle label="descrição" checked={description} onChange={setDescription} />
              <ControlToggle label="inválido" checked={invalid} onChange={setInvalid} />
            </>
          }
          preview={
            <Field orientation={orientation} data-invalid={invalid || undefined} className="max-w-lg">
              <FieldContent>
                <FieldLabel htmlFor="pg-empresa">Nome da empresa</FieldLabel>
                {description && <FieldDescription>Como aparece no CNPJ ou no site.</FieldDescription>}
              </FieldContent>
              <Input id="pg-empresa" placeholder="Empresa Exemplo" aria-invalid={invalid || undefined} />
              {invalid && <FieldError>Este campo é obrigatório.</FieldError>}
            </Field>
          }
          code={`<Field${orientation !== "vertical" ? ` orientation="${orientation}"` : ""}${invalid ? " data-invalid" : ""}>
  <FieldContent>
    <FieldLabel htmlFor="empresa">Nome da empresa</FieldLabel>${description ? "\n    <FieldDescription>Como aparece no CNPJ ou no site.</FieldDescription>" : ""}
  </FieldContent>
  <Input id="empresa"${invalid ? " aria-invalid" : ""} />${invalid ? "\n  <FieldError>Este campo é obrigatório.</FieldError>" : ""}
</Field>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Formulário completo"
            description="FieldSet + FieldLegend agrupam; FieldGroup dá o ritmo vertical; FieldSeparator divide seções."
            previewClassName="block"
            code={`<form>
  <FieldSet>
    <FieldLegend>Perfil de cliente ideal</FieldLegend>
    <FieldDescription>…</FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="setor">Setor</FieldLabel>
        <NativeSelect id="setor">…</NativeSelect>
      </Field>
      <Field data-invalid={!!erro}>
        <FieldLabel htmlFor="email">E-mail para alertas</FieldLabel>
        <Input id="email" aria-invalid={!!erro} />
        <FieldError errors={erros} />
      </Field>
    </FieldGroup>
  </FieldSet>
</form>`}
          >
            <form
              className="mx-auto max-w-md"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Perfil de cliente ideal</FieldLegend>
                  <FieldDescription>A fynd usa estes critérios para priorizar empresas.</FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="f-setor">Setor</FieldLabel>
                      <NativeSelect id="f-setor" className="w-full">
                        <NativeSelectOption>Indústria</NativeSelectOption>
                        <NativeSelectOption>Serviços</NativeSelectOption>
                        <NativeSelectOption>Varejo</NativeSelectOption>
                      </NativeSelect>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="f-porte">Porte mínimo</FieldLabel>
                      <Input id="f-porte" type="number" defaultValue={200} />
                      <FieldDescription>Número de pessoas.</FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                  <FieldLegend variant="label">Região</FieldLegend>
                  <RadioGroup defaultValue="sudeste">
                    {["Sudeste", "Sul", "Todo o Brasil"].map((r) => (
                      <Field key={r} orientation="horizontal">
                        <RadioGroupItem value={r.toLowerCase()} id={`f-${r}`} />
                        <FieldLabel htmlFor={`f-${r}`} className="font-normal">
                          {r}
                        </FieldLabel>
                      </Field>
                    ))}
                  </RadioGroup>
                </FieldSet>
                <FieldSeparator />
                <Field data-invalid={!!emailError || undefined}>
                  <FieldLabel htmlFor="f-email">E-mail para alertas</FieldLabel>
                  <Input
                    id="f-email"
                    type="email"
                    placeholder="nome@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!emailError || undefined}
                  />
                  <FieldError errors={emailError} />
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="f-termos" defaultChecked />
                  <FieldLabel htmlFor="f-termos" className="font-normal">
                    Avisar quando surgirem novas empresas
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Button type="submit">Salvar perfil</Button>
                  <Button type="reset" variant="ghost" onClick={() => { setEmail(""); setSubmitted(false) }}>
                    Limpar
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </Example>

          <Example
            title="Escolha em cartão"
            description="FieldLabel envolvendo um Field vira um cartão clicável; FieldTitle é o título dentro dele."
            previewClassName="block"
            code={`<FieldLabel htmlFor="plano-pro">
  <Field orientation="horizontal">
    <FieldContent>
      <FieldTitle>Pro</FieldTitle>
      <FieldDescription>…</FieldDescription>
    </FieldContent>
    <RadioGroupItem value="pro" id="plano-pro" />
  </Field>
</FieldLabel>`}
          >
            <RadioGroup defaultValue="pro" className="mx-auto max-w-md">
              {[
                { v: "essencial", t: "Essencial", d: "Até 100 empresas priorizadas por mês." },
                { v: "pro", t: "Pro", d: "Até 1.000 empresas e sinais em tempo real." },
              ].map((p) => (
                <FieldLabel key={p.v} htmlFor={`plano-${p.v}`}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{p.t}</FieldTitle>
                      <FieldDescription>{p.d}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={p.v} id={`plano-${p.v}`} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"`}
          usageCode={`<Field data-invalid={!!erro}>
  <FieldLabel htmlFor="nome">Nome</FieldLabel>
  <Input id="nome" aria-invalid={!!erro} />
  <FieldDescription>Texto de apoio.</FieldDescription>
  <FieldError errors={[erro]} />
</Field>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Field"
          rows={[
            { prop: "orientation", type: '"vertical" | "horizontal" | "responsive"', default: '"vertical"', description: "responsive empilha no mobile e alinha lado a lado a partir de md." },
            { prop: "data-invalid", type: "boolean", description: "Pinta rótulo e descrição com a cor de erro." },
            { prop: "data-disabled", type: "boolean", description: "Esmaece o campo." },
          ]}
        />
        <PropsTable
          component="FieldError"
          rows={[
            { prop: "errors", type: "{ message?: string }[]", description: "Lista de erros (compatível com react-hook-form / zod). Vários viram uma lista." },
            { prop: "children", type: "ReactNode", description: "Mensagem direta, no lugar de errors." },
          ]}
        />
        <PropsTable
          component="FieldLegend"
          rows={[{ prop: "variant", type: '"legend" | "label"', default: '"legend"', description: "label deixa a legenda do tamanho de um rótulo." }]}
        />
        <PropsTable
          component="FieldSet · FieldGroup · FieldContent · FieldLabel · FieldTitle · FieldDescription · FieldSeparator"
          rows={[{ prop: "…props", type: "props nativas", description: "fieldset, div, label, p… FieldSeparator aceita children como texto no meio da linha." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Ligue <code className="font-mono text-sm">FieldLabel htmlFor</code> ao <code className="font-mono text-sm">id</code> do controle — é o nome acessível do campo.</>,
            <>Grupos de opções usam <code className="font-mono text-sm">fieldset</code> + <code className="font-mono text-sm">legend</code> (FieldSet/FieldLegend).</>,
            <>FieldError tem <code className="font-mono text-sm">role=&quot;alert&quot;</code>; marque também o controle com <code className="font-mono text-sm">aria-invalid</code>.</>,
            <>Mensagens de erro dizem como corrigir (“Informe um e-mail válido, como…”), não só o que está errado.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
