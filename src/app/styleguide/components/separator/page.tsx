"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const orientations = ["horizontal", "vertical"] as const

export default function SeparatorPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Separator"
        description="Linha fina que separa grupos de conteúdo. Use com moderação: na fynd, espaço em branco separa primeiro; a linha só entra quando o espaço não basta."
        source="src/components/ui/separator.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={<ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />}
          preview={
            orientation === "horizontal" ? (
              <div className="w-full max-w-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-lg">Empresa Exemplo</span>
                  <span className="text-sm text-muted-foreground">Indústria · 320 pessoas</span>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center gap-4 text-sm">
                  <span>Contexto</span>
                  <Separator orientation="vertical" />
                  <span>Contatos</span>
                  <Separator orientation="vertical" />
                  <span>Notas</span>
                </div>
              </div>
            ) : (
              <div className="flex h-16 items-center gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="font-mono text-2xl">92%</span>
                  <span className="text-muted-foreground">aderência</span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex flex-col">
                  <span className="font-mono text-2xl">320</span>
                  <span className="text-muted-foreground">pessoas</span>
                </div>
              </div>
            )
          }
          code={`<Separator${orientation === "vertical" ? ' orientation="vertical"' : ' className="my-4"'} />`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Com texto"
          description="Para “ou” entre alternativas, use FieldSeparator (Field) ou Marker separator."
          previewClassName="block"
          code={`<div className="flex items-center gap-3">
  <Separator className="flex-1" />
  <span>ou</span>
  <Separator className="flex-1" />
</div>`}
        >
          <div className="mx-auto flex max-w-sm items-center gap-3 text-xs text-muted-foreground uppercase">
            <Separator className="flex-1" />
            <span className="font-mono tracking-label">ou</span>
            <Separator className="flex-1" />
          </div>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Separator } from "@/components/ui/separator"`} usageCode={`<Separator />\n<Separator orientation="vertical" />`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Separator"
          rows={[
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Vertical precisa de um pai com altura." },
            { prop: "decorative", type: "boolean", description: "Quando só visual, é ignorado por leitores de tela." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Tem <code className="font-mono text-sm">role=&quot;separator&quot;</code> com a orientação anunciada.</>,
            <>Se for só decorativo, a estrutura (headings, listas) já deve comunicar a divisão.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
