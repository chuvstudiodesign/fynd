"use client"

import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const modes = ["único", "intervalo"] as const
const orientations = ["horizontal", "vertical"] as const

export default function SliderPage() {
  const [mode, setMode] = useState<(typeof modes)[number]>("único")
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")
  const [disabled, setDisabled] = useState(false)
  const [single, setSingle] = useState(80)
  const [range, setRange] = useState<number[]>([200, 500])

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Slider"
        description="Escolha de valor ou intervalo arrastando. Bom para critérios aproximados do perfil ideal: aderência mínima, faixa de porte."
        source="src/components/ui/slider.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="modo" value={mode} options={modes} onChange={setMode} />
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className={orientation === "vertical" ? "flex h-56 items-center gap-6" : "flex w-full max-w-sm flex-col gap-4"}>
              {mode === "único" ? (
                <Slider
                  value={[single]}
                  onValueChange={(v) => setSingle(Array.isArray(v) ? v[0] : v)}
                  max={100}
                  step={1}
                  orientation={orientation}
                  disabled={disabled}
                  aria-label="Aderência mínima"
                />
              ) : (
                <Slider
                  value={range}
                  onValueChange={(v) => setRange(Array.isArray(v) ? [...v] : [v])}
                  min={0}
                  max={1000}
                  step={10}
                  minStepsBetweenValues={5}
                  orientation={orientation}
                  disabled={disabled}
                  aria-label="Faixa de pessoas"
                />
              )}
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {mode === "único" ? `${single}%` : `${range[0]}–${range[1]} pessoas`}
              </span>
            </div>
          }
          code={
            mode === "único"
              ? `<Slider value={[valor]} onValueChange={([v]) => setValor(v)} max={100}${orientation === "vertical" ? ' orientation="vertical"' : ""}${disabled ? " disabled" : ""} />`
              : `<Slider value={faixa} onValueChange={setFaixa} min={0} max={1000} step={10} minStepsBetweenValues={5}${orientation === "vertical" ? ' orientation="vertical"' : ""}${disabled ? " disabled" : ""} />`
          }
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Em um Field"
          previewClassName="block"
          code={`<Field>
  <FieldLabel>Aderência mínima · {valor}%</FieldLabel>
  <Slider value={[valor]} onValueChange={…} max={100} step={5} />
  <FieldDescription>…</FieldDescription>
</Field>`}
        >
          <Field className="mx-auto max-w-sm">
            <div className="flex items-center justify-between">
              <FieldLabel>Aderência mínima</FieldLabel>
              <span className="font-mono text-sm tabular-nums">{single}%</span>
            </div>
            <Slider value={[single]} onValueChange={(v) => setSingle(Array.isArray(v) ? v[0] : v)} max={100} step={5} aria-label="Aderência mínima" />
            <FieldDescription>Só empresas acima deste valor entram na lista.</FieldDescription>
          </Field>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Slider } from "@/components/ui/slider"`} usageCode={`<Slider defaultValue={[50]} max={100} step={1} />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Slider"
          rows={[
            { prop: "value · onValueChange", type: "number[]", description: "Valor(es) controlado(s). Dois valores = intervalo." },
            { prop: "defaultValue", type: "number[]", description: "Valor inicial." },
            { prop: "min · max · step", type: "number", default: "0 · 100 · 1", description: "Faixa e incremento." },
            { prop: "minStepsBetweenValues", type: "number", default: "0", description: "Distância mínima entre as alças do intervalo." },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Cada alça é um <code className="font-mono text-sm">slider</code> com <code className="font-mono text-sm">aria-valuenow</code>; dê nome com <code className="font-mono text-sm">aria-label</code>.</>,
            <><Kbd>←</Kbd> <Kbd>→</Kbd> mudam de um passo; <Kbd>PageUp</Kbd>/<Kbd>PageDown</Kbd> de dez; <Kbd>Home</Kbd>/<Kbd>End</Kbd> vão aos extremos.</>,
            <>Mostre o valor em texto ao lado — arrastar sem ver o número é impreciso.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
