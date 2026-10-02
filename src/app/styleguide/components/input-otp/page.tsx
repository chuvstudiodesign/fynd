"use client"

import { useState } from "react"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const lengths = ["4", "6", "8"] as const
const patterns = ["dígitos", "letras e dígitos"] as const

export default function InputOTPPage() {
  const [length, setLength] = useState<(typeof lengths)[number]>("6")
  const [pattern, setPattern] = useState<(typeof patterns)[number]>("dígitos")
  const [separator, setSeparator] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState("")

  const [code, setCode] = useState("")
  const wrong = code.length === 6 && code !== "123456"

  const n = Number(length)
  const half = Math.ceil(n / 2)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Input OTP"
        description="Campo de código de uso único, um caractere por casa. Para login sem senha e verificação de e-mail. Aceita colar o código inteiro."
        source="src/components/ui/input-otp.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="maxLength" value={length} options={lengths} onChange={(v) => { setLength(v); setValue("") }} />
              <ControlSegment label="pattern" value={pattern} options={patterns} onChange={setPattern} />
              <ControlToggle label="separador" checked={separator} onChange={setSeparator} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <InputOTP
                key={length}
                maxLength={n}
                value={value}
                onChange={setValue}
                disabled={disabled}
                pattern={pattern === "dígitos" ? REGEXP_ONLY_DIGITS : REGEXP_ONLY_DIGITS_AND_CHARS}
                aria-label="Código de verificação"
              >
                {separator ? (
                  <>
                    <InputOTPGroup>
                      {Array.from({ length: half }).map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {Array.from({ length: n - half }).map((_, i) => (
                        <InputOTPSlot key={i} index={half + i} />
                      ))}
                    </InputOTPGroup>
                  </>
                ) : (
                  <InputOTPGroup>
                    {Array.from({ length: n }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                )}
              </InputOTP>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                valor: {value || "—"}
              </span>
            </div>
          }
          code={`import { ${pattern === "dígitos" ? "REGEXP_ONLY_DIGITS" : "REGEXP_ONLY_DIGITS_AND_CHARS"} } from "input-otp"

<InputOTP maxLength={${n}} value={value} onChange={setValue} pattern={${pattern === "dígitos" ? "REGEXP_ONLY_DIGITS" : "REGEXP_ONLY_DIGITS_AND_CHARS"}}${disabled ? " disabled" : ""}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    …
  </InputOTPGroup>${separator ? "\n  <InputOTPSeparator />\n  <InputOTPGroup>…</InputOTPGroup>" : ""}
</InputOTP>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Verificação com erro"
          description="Digite qualquer código diferente de 123456 para ver o estado de erro."
          previewClassName="block"
          code={`<Field data-invalid={errado}>
  <FieldLabel htmlFor="codigo">Código enviado para mariana@…</FieldLabel>
  <InputOTP id="codigo" maxLength={6} aria-invalid={errado} …>…</InputOTP>
  <FieldError>Código incorreto. Confira o e-mail ou peça um novo.</FieldError>
</Field>`}
        >
          <Field data-invalid={wrong || undefined} className="mx-auto w-fit">
            <FieldLabel htmlFor="otp-code">Código enviado para mariana@empresa.com.br</FieldLabel>
            <InputOTP id="otp-code" maxLength={6} value={code} onChange={setCode} pattern={REGEXP_ONLY_DIGITS} aria-invalid={wrong || undefined}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} aria-invalid={wrong || undefined} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {wrong ? (
              <FieldError>Código incorreto. Confira o e-mail ou peça um novo.</FieldError>
            ) : (
              <FieldDescription>
                {code === "123456" ? "Código confirmado." : "Não recebeu? Reenviar em 30 s."}
              </FieldDescription>
            )}
          </Field>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"`}
          usageCode={`<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        />
      </DocSection>

      <DocSection title="Props" description="InputOTP usa a biblioteca input-otp.">
        <PropsTable
          component="InputOTP"
          rows={[
            { prop: "maxLength", type: "number", description: "Número de caracteres. Obrigatório." },
            { prop: "value · onChange", type: "string", description: "Valor controlado." },
            { prop: "onComplete", type: "(value: string) => void", description: "Chamado ao preencher todas as casas." },
            { prop: "pattern", type: "string (regex)", description: "REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS ou REGEXP_ONLY_DIGITS_AND_CHARS." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o campo." },
          ]}
        />
        <PropsTable component="InputOTPSlot" rows={[{ prop: "index", type: "number", description: "Posição da casa (0 em diante). Obrigatório." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Por baixo há um único <code className="font-mono text-sm">input</code> real; as casas são visuais. Leitores de tela leem um campo só.</>,
            <>Dê um rótulo que diga para onde o código foi enviado.</>,
            <>Colar funciona, e o preenchimento automático do celular (<code className="font-mono text-sm">autoComplete=&quot;one-time-code&quot;</code>) é suportado.</>,
            <>Ofereça reenvio e um caminho alternativo quando o código não chega.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
