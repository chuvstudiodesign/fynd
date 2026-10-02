"use client"

import { useState } from "react"
import { FilterIcon, InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sides = ["bottom", "top", "left", "right"] as const
const aligns = ["start", "center", "end"] as const

export default function PopoverPage() {
  const [side, setSide] = useState<(typeof sides)[number]>("bottom")
  const [align, setAlign] = useState<(typeof aligns)[number]>("center")
  const [open, setOpen] = useState(false)
  const [min, setMin] = useState("200")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Popover"
        description="Painel flutuante ancorado a um botão, para conteúdo interativo leve: um filtro, uma explicação, um mini-formulário. Não bloqueia a página."
        source="src/components/ui/popover.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="side" value={side} options={sides} onChange={setSide} />
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
            </>
          }
          preview={
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                <InfoIcon data-icon="inline-start" />
                Como calculamos a aderência?
              </PopoverTrigger>
              <PopoverContent side={side} align={align} className="w-80">
                <PopoverHeader>
                  <PopoverTitle>Aderência ao perfil ideal</PopoverTitle>
                  <PopoverDescription>
                    Setor, porte, região e sinais recentes são comparados ao perfil que você descreveu. O resultado vai de 0 a 100%.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          }
          code={`<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Como calculamos a aderência?</PopoverTrigger>
  <PopoverContent side="${side}" align="${align}" className="w-80">
    <PopoverHeader>
      <PopoverTitle>Aderência ao perfil ideal</PopoverTitle>
      <PopoverDescription>…</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Filtro rápido"
          description="Mini-formulário controlado; fecha ao aplicar."
          code={`const [open, setOpen] = useState(false)

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger render={<Button variant="outline" />}><FilterIcon />Filtros</PopoverTrigger>
  <PopoverContent align="start" className="w-72">
    …campos…
    <Button onClick={() => setOpen(false)}>Aplicar</Button>
  </PopoverContent>
</Popover>`}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger render={<Button variant="outline" />}>
              <FilterIcon data-icon="inline-start" />
              Filtros
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 gap-4 p-4">
              <PopoverHeader>
                <PopoverTitle>Refinar oportunidades</PopoverTitle>
              </PopoverHeader>
              <Field>
                <FieldLabel htmlFor="pp-setor">Setor</FieldLabel>
                <NativeSelect id="pp-setor" className="w-full" size="sm">
                  <NativeSelectOption>Indústria</NativeSelectOption>
                  <NativeSelectOption>Serviços</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel htmlFor="pp-min">Pessoas (mínimo)</FieldLabel>
                <Input id="pp-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} className="h-8" />
              </Field>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setMin("200")}>
                  Limpar
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Aplicar
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"`}
          usageCode={`<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Abrir</PopoverTrigger>
  <PopoverContent>Conteúdo</PopoverContent>
</Popover>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Popover"
          rows={[
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
            { prop: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial." },
            { prop: "modal", type: "boolean", default: "false", description: "true prende o foco dentro do popover." },
          ]}
        />
        <PropsTable
          component="PopoverContent"
          rows={[
            { prop: "side", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: "Lado em que abre (troca sozinho se faltar espaço)." },
            { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alinhamento." },
            { prop: "sideOffset · alignOffset", type: "number", default: "4 · 0", description: "Deslocamentos em px." },
          ]}
        />
        <PropsTable
          component="PopoverHeader · PopoverTitle · PopoverDescription"
          rows={[{ prop: "…props", type: "props nativas", description: "Título e descrição dão nome acessível ao painel." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O gatilho tem <code className="font-mono text-sm">aria-expanded</code> e <code className="font-mono text-sm">aria-haspopup=&quot;dialog&quot;</code>; o foco vai para o painel ao abrir.</>,
            <><Kbd>Esc</Kbd> ou clicar fora fecha e devolve o foco ao gatilho.</>,
            <>Use PopoverTitle para dar nome ao painel. Conteúdo só informativo, sem interação, cabe melhor em Tooltip ou Hover Card.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
