"use client"

import { useState } from "react"
import { BoldIcon, BookmarkIcon, ItalicIcon, PinIcon, SparklesIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "outline"] as const
const sizes = ["sm", "default", "lg"] as const

export default function TogglePage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("outline")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [disabled, setDisabled] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Toggle"
        description="Botão de dois estados — ligado ou desligado. Para ações que marcam algo: fixar uma empresa, destacar sinais, favoritar."
        source="src/components/ui/toggle.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <Toggle variant={variant} size={size} disabled={disabled} pressed={pressed} onPressedChange={setPressed} aria-label="Fixar empresa">
                <PinIcon />
                {pressed ? "Fixada" : "Fixar"}
              </Toggle>
              <span className="font-mono text-xs text-muted-foreground">pressed: {String(pressed)}</span>
            </div>
          }
          code={`<Toggle${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""} pressed={pressed} onPressedChange={setPressed}${disabled ? " disabled" : ""}>
  <PinIcon />
  Fixar
</Toggle>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example title="Só ícone" description="Sempre com aria-label." code={`<Toggle aria-label="Negrito"><BoldIcon /></Toggle>`}>
            <Toggle aria-label="Negrito">
              <BoldIcon />
            </Toggle>
            <Toggle aria-label="Itálico" defaultPressed>
              <ItalicIcon />
            </Toggle>
            <Toggle variant="outline" aria-label="Salvar">
              <BookmarkIcon />
            </Toggle>
          </Example>
          <Example
            title="Destacar sinais"
            description="Estado ligado com cor de sinal — só para o toggle mais importante da tela."
            code={`<Toggle variant="outline" className="data-pressed:border-signal data-pressed:bg-signal/15">…</Toggle>`}
          >
            <Toggle variant="outline" defaultPressed className="data-pressed:border-signal data-pressed:bg-signal/15 data-pressed:text-foreground">
              <SparklesIcon />
              Destacar sinais
            </Toggle>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Toggle } from "@/components/ui/toggle"`} usageCode={`<Toggle aria-label="Fixar"><PinIcon /></Toggle>`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Toggle"
          rows={[
            { prop: "pressed · onPressedChange", type: "boolean", description: "Estado controlado." },
            { prop: "defaultPressed", type: "boolean", default: "false", description: "Estado inicial." },
            { prop: "variant", type: '"default" | "outline"', default: '"default"', description: "Sem borda ou com borda." },
            { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "32, 40 ou 48px." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>É um <code className="font-mono text-sm">button</code> com <code className="font-mono text-sm">aria-pressed</code>; <Kbd>Espaço</Kbd> ou <Kbd>Enter</Kbd> alternam.</>,
            <>O rótulo não muda com o estado (“Fixar”); o leitor anuncia “pressionado”. Mudar o texto visível é opcional.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
