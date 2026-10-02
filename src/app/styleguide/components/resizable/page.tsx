"use client"

import { useState } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { OpportunityCard } from "@/components/opportunity-card"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const orientations = ["horizontal", "vertical"] as const

function Pane({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`flex h-full items-center justify-center p-6 ${className ?? ""}`}>
      <span className="font-mono text-xs tracking-label text-muted-foreground uppercase">{label}</span>
    </div>
  )
}

export default function ResizablePage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")
  const [withHandle, setWithHandle] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Resizable"
        description="Painéis que a pessoa redimensiona arrastando o divisor. Para telas de trabalho: a lista de oportunidades de um lado, o contexto da empresa do outro."
        source="src/components/ui/resizable.tsx"
      />

      <DocSection title="Playground" description="Arraste o divisor, ou foque nele com Tab e use as setas.">
        <Playground
          controls={
            <>
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlToggle label="withHandle" checked={withHandle} onChange={setWithHandle} />
            </>
          }
          previewClassName="block"
          preview={
            <ResizablePanelGroup key={orientation} orientation={orientation} className="min-h-64 rounded-xl border bg-background">
              <ResizablePanel defaultSize="40%" minSize="20%">
                <Pane label="Lista" />
              </ResizablePanel>
              <ResizableHandle withHandle={withHandle} />
              <ResizablePanel defaultSize="60%" minSize="30%">
                <Pane label="Contexto" className="bg-muted/40" />
              </ResizablePanel>
            </ResizablePanelGroup>
          }
          code={`<ResizablePanelGroup orientation="${orientation}">
  <ResizablePanel defaultSize="40%" minSize="20%">Lista</ResizablePanel>
  <ResizableHandle${withHandle ? " withHandle" : ""} />
  <ResizablePanel defaultSize="60%" minSize="30%">Contexto</ResizablePanel>
</ResizablePanelGroup>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Lista + contexto"
          description="Painéis aninhados: lista à esquerda; contexto e notas empilhados à direita."
          previewClassName="block"
          code={`<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize="55%">…lista…</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="45%">
    <ResizablePanelGroup orientation="vertical">
      <ResizablePanel defaultSize="65%">…contexto…</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="35%">…notas…</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
        >
          <ResizablePanelGroup orientation="horizontal" className="h-96 rounded-xl border bg-background">
            <ResizablePanel defaultSize="55%" minSize="35%">
              <div className="flex h-full flex-col gap-3 overflow-auto p-4">
                {[
                  { company: "Empresa Exemplo", meta: "Indústria · 320 pessoas", fit: 92 },
                  { company: "Alfa Embalagens", meta: "Indústria · 410 pessoas", fit: 84 },
                  { company: "Norte Metais", meta: "Indústria · 260 pessoas", fit: 77 },
                ].map((o, i) => (
                  <OpportunityCard key={o.company} {...o} active={i === 0} />
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="45%" minSize="25%">
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize="65%">
                  <div className="flex h-full flex-col gap-3 p-5">
                    <span className="font-mono text-xs tracking-label text-navy-600 uppercase dark:text-steel-300">Contexto</span>
                    <span className="font-heading text-2xl">Empresa Exemplo</span>
                    <span className="text-sm text-muted-foreground">Expansão regional recente · diretoria comercial identificada.</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize="35%">
                  <div className="h-full p-5 text-sm text-muted-foreground">Notas da equipe…</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`}
          usageCode={`<ResizablePanelGroup orientation="horizontal">\n  <ResizablePanel>A</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel>B</ResizablePanel>\n</ResizablePanelGroup>`}
        />
      </DocSection>

      <DocSection title="Props" description="Usa react-resizable-panels v4.">
        <PropsTable
          component="ResizablePanelGroup"
          rows={[
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção dos painéis." },
            { prop: "onLayoutChange", type: "(layout) => void", description: "Chamado ao redimensionar (para salvar o layout)." },
          ]}
        />
        <PropsTable
          component="ResizablePanel"
          rows={[
            { prop: "defaultSize", type: "number | string", description: 'Atenção: número = pixels; string sem unidade ou com "%" = percentual. Ex.: "40%".' },
            { prop: "minSize · maxSize", type: "number | string", description: "Limites (mesmas regras de unidade)." },
            { prop: "collapsible · collapsedSize", type: "boolean · number | string", description: "Permite recolher abaixo do mínimo." },
          ]}
        />
        <PropsTable component="ResizableHandle" rows={[{ prop: "withHandle", type: "boolean", default: "false", description: "Mostra a alça visível no divisor." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O divisor é um <code className="font-mono text-sm">separator</code> focável com <code className="font-mono text-sm">aria-valuenow</code>.</>,
            <>Com foco no divisor, <Kbd>←</Kbd> <Kbd>→</Kbd> (ou <Kbd>↑</Kbd> <Kbd>↓</Kbd>) redimensionam; <Kbd>Home</Kbd>/<Kbd>End</Kbd> vão aos limites.</>,
            <>No mobile, prefira empilhar os painéis em vez de exigir arraste.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
