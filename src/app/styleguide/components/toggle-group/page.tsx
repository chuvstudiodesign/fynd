"use client"

import { useState } from "react"
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, LayoutGridIcon, ListIcon, Rows3Icon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "outline"] as const
const sizes = ["sm", "default", "lg"] as const
const spacings = ["0", "1", "2"] as const

export default function ToggleGroupPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("outline")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [spacing, setSpacing] = useState<(typeof spacings)[number]>("0")
  const [multiple, setMultiple] = useState(false)
  const [value, setValue] = useState<string[]>(["lista"])

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Toggle Group"
        description="Conjunto de toggles relacionados. Escolha única (como uma alternância de visualização) ou múltipla (como filtros rápidos)."
        source="src/components/ui/toggle-group.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="spacing" value={spacing} options={spacings} onChange={setSpacing} />
              <ControlToggle label="multiple" checked={multiple} onChange={(m) => { setMultiple(m); setValue(m ? value : value.slice(0, 1)) }} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <ToggleGroup
                variant={variant}
                size={size}
                spacing={Number(spacing)}
                multiple={multiple}
                value={value}
                onValueChange={(v) => setValue(v as string[])}
                aria-label="Visualização"
              >
                <ToggleGroupItem value="lista" aria-label="Lista">
                  <ListIcon />
                  Lista
                </ToggleGroupItem>
                <ToggleGroupItem value="grade" aria-label="Grade">
                  <LayoutGridIcon />
                  Grade
                </ToggleGroupItem>
                <ToggleGroupItem value="compacta" aria-label="Compacta">
                  <Rows3Icon />
                  Compacta
                </ToggleGroupItem>
              </ToggleGroup>
              <span className="font-mono text-xs text-muted-foreground">value: [{value.join(", ")}]</span>
            </div>
          }
          code={`<ToggleGroup${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""} spacing={${spacing}}${multiple ? " multiple" : ""} value={value} onValueChange={setValue}>
  <ToggleGroupItem value="lista"><ListIcon />Lista</ToggleGroupItem>
  <ToggleGroupItem value="grade"><LayoutGridIcon />Grade</ToggleGroupItem>
  <ToggleGroupItem value="compacta"><Rows3Icon />Compacta</ToggleGroupItem>
</ToggleGroup>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Filtros rápidos (múltiplo)"
            code={`<ToggleGroup multiple spacing={2} variant="outline" size="sm">…</ToggleGroup>`}
          >
            <ToggleGroup multiple spacing={2} variant="outline" size="sm" defaultValue={["sp", "mg"]} aria-label="Estados">
              {["SP", "RJ", "MG", "PR", "SC"].map((uf) => (
                <ToggleGroupItem key={uf} value={uf.toLowerCase()} className="font-mono">
                  {uf}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Example>
          <Example title="Só ícones" code={`<ToggleGroup defaultValue={["esquerda"]}>…</ToggleGroup>`}>
            <ToggleGroup defaultValue={["esquerda"]} aria-label="Alinhamento">
              <ToggleGroupItem value="esquerda" aria-label="Alinhar à esquerda">
                <AlignLeftIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="centro" aria-label="Centralizar">
                <AlignCenterIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="direita" aria-label="Alinhar à direita">
                <AlignRightIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}
          usageCode={`<ToggleGroup defaultValue={["a"]}>\n  <ToggleGroupItem value="a">A</ToggleGroupItem>\n  <ToggleGroupItem value="b">B</ToggleGroupItem>\n</ToggleGroup>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="ToggleGroup"
          rows={[
            { prop: "value · onValueChange", type: "string[]", description: "Itens ligados (sempre uma lista, mesmo em escolha única)." },
            { prop: "defaultValue", type: "string[]", description: "Valor inicial." },
            { prop: "multiple", type: "boolean", default: "false", description: "Permite vários ligados." },
            { prop: "variant · size", type: "Toggle", default: '"default" · "default"', description: "Repassados aos itens." },
            { prop: "spacing", type: "number", default: "2", description: "Espaço entre itens (unidades do Tailwind). 0 = colados, pontas em pílula." },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção e setas do teclado." },
          ]}
        />
        <PropsTable component="ToggleGroupItem" rows={[{ prop: "value", type: "string", description: "Valor do item. Obrigatório." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O grupo é uma parada de <Kbd>Tab</Kbd>; <Kbd>←</Kbd> <Kbd>→</Kbd> movem entre itens; <Kbd>Espaço</Kbd> alterna.</>,
            <>Dê nome ao grupo com <code className="font-mono text-sm">aria-label</code> e rótulo a cada item só com ícone.</>,
            <>Cada item expõe <code className="font-mono text-sm">aria-pressed</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
