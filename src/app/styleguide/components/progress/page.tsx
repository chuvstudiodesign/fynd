"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "signal", "success", "warning", "destructive"] as const

export default function ProgressPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [value, setValue] = useState(64)
  const [label, setLabel] = useState(true)
  const [indeterminate, setIndeterminate] = useState(false)

  const [running, setRunning] = useState(false)
  const [upload, setUpload] = useState(0)
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setUpload((u) => {
        if (u >= 100) {
          setRunning(false)
          return 100
        }
        return Math.min(100, u + 7)
      })
    }, 180)
    return () => clearInterval(id)
  }, [running])

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Progress"
        description="Barra de progresso de uma tarefa ou de uma medida. Na fynd, também representa aderência ao perfil ideal — como a barrinha ao lado de cada empresa no Figma."
        source="src/components/ui/progress.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlToggle label="rótulo" checked={label} onChange={setLabel} />
              <ControlToggle label="indeterminado" checked={indeterminate} onChange={setIndeterminate} />
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">value · {value}</span>
                <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(Number(e.target.value))} className="h-8 accent-navy-600" />
              </label>
            </>
          }
          preview={
            <Progress value={indeterminate ? null : value} variant={variant} className="w-full max-w-sm" aria-label={label ? undefined : "Aderência"}>
              {label && (
                <>
                  <ProgressLabel>Aderência ao perfil</ProgressLabel>
                  <ProgressValue />
                </>
              )}
            </Progress>
          }
          code={`<Progress value={${indeterminate ? "null" : value}}${variant !== "default" ? ` variant="${variant}"` : ""}>${label ? "\n  <ProgressLabel>Aderência ao perfil</ProgressLabel>\n  <ProgressValue />\n" : ""}</Progress>`}
        />
      </DocSection>

      <DocSection title="Variantes" description="variant é extensão da fynd. signal (ciano) só para o destaque da tela — como a empresa ativa.">
        <Example code={variants.map((v) => `<Progress value={…} variant="${v}" />`).join("\n")}>
          <div className="flex w-full max-w-md flex-col gap-4">
          {variants.map((v, i) => (
            <Progress key={v} value={[64, 92, 100, 45, 18][i]} variant={v}>
              <ProgressLabel className="font-mono text-xs font-normal text-muted-foreground">{v}</ProgressLabel>
              <ProgressValue className="text-xs" />
            </Progress>
          ))}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Envio de arquivo"
            description="Progresso real de uma tarefa."
            previewClassName="flex-col items-stretch"
            code={`<Progress value={upload} variant={upload === 100 ? "success" : "default"}>
  <ProgressLabel>lista-prospects.csv</ProgressLabel>
  <ProgressValue />
</Progress>`}
          >
            <Progress value={upload} variant={upload === 100 ? "success" : "default"}>
              <ProgressLabel>lista-prospects.csv</ProgressLabel>
              <ProgressValue />
            </Progress>
            <Button
              size="sm"
              variant="outline"
              className="self-start"
              onClick={() => {
                setUpload(0)
                setRunning(true)
              }}
              disabled={running}
            >
              {upload === 100 ? "Enviar de novo" : running ? "Enviando…" : "Simular envio"}
            </Button>
          </Example>
          <Example
            title="Aderência na lista"
            description="Barra curta ao lado do número, como no Figma."
            previewClassName="flex-col items-stretch"
            code={`<Progress value={92} variant="signal" className="w-14" aria-label="Aderência de 92%" />`}
          >
            {[
              ["Empresa Exemplo", 92, true],
              ["Alfa Embalagens", 84, false],
              ["Norte Metais", 77, false],
            ].map(([name, v, active]) => (
              <div key={String(name)} className="flex items-center gap-4 text-sm">
                <span className="flex-1 font-semibold">{name}</span>
                <span className="font-mono tabular-nums">{v}%</span>
                <Progress value={Number(v)} variant={active ? "signal" : "default"} className="w-14" aria-label={`Aderência de ${v}%`} />
              </div>
            ))}
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"`}
          usageCode={`<Progress value={64}>\n  <ProgressLabel>Carregando</ProgressLabel>\n  <ProgressValue />\n</Progress>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Progress"
          rows={[
            { prop: "value", type: "number | null", description: "0–100. null = indeterminado." },
            { prop: "variant", type: '"default" | "signal" | "success" | "warning" | "destructive"', default: '"default"', description: "Cor do indicador (extensão da fynd)." },
            { prop: "min · max", type: "number", default: "0 · 100", description: "Faixa do valor." },
            { prop: "format", type: "Intl.NumberFormatOptions", description: "Formato do ProgressValue." },
            { prop: "children", type: "ReactNode", description: "ProgressLabel e ProgressValue, exibidos acima da barra." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">role=&quot;progressbar&quot;</code> com <code className="font-mono text-sm">aria-valuenow</code>, min e max; ProgressLabel dá o nome.</>,
            <>Sem rótulo visível, passe <code className="font-mono text-sm">aria-label</code> (“Aderência de 92%”).</>,
            <>A cor não carrega o significado sozinha: mostre o número ao lado.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
