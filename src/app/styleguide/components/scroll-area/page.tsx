"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const companies = Array.from({ length: 30 }, (_, i) => `Empresa ${String(i + 1).padStart(2, "0")} · ${["Indústria", "Serviços", "Varejo"][i % 3]}`)
const heights = ["h-48", "h-72", "h-96"] as const

const slides = [
  { src: "/brand/slides/capa.jpg", t: "Capa" },
  { src: "/brand/slides/luz-revela-caminhos.jpg", t: "Luz revela caminhos" },
  { src: "/brand/slides/origem-chama.jpg", t: "A origem é uma chama" },
  { src: "/brand/slides/ciano-e-luz.jpg", t: "Ciano é luz" },
  { src: "/brand/slides/ambiente.jpg", t: "A marca orienta" },
]

export default function ScrollAreaPage() {
  const [height, setHeight] = useState<(typeof heights)[number]>("h-72")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Scroll Area"
        description="Área rolável com barra de rolagem fina e consistente entre navegadores. Para listas longas dentro de painéis e cartões."
        source="src/components/ui/scroll-area.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={<ControlSegment label="altura" value={height} options={heights} onChange={setHeight} />}
          preview={
            <ScrollArea className={`${height} w-64 rounded-xl border bg-background`}>
              <div className="p-4">
                <h4 className="mb-4 font-mono text-xs tracking-label text-muted-foreground uppercase">30 empresas</h4>
                {companies.map((c, i) => (
                  <Fragment key={c}>
                    <div className="text-sm">{c}</div>
                    {i < companies.length - 1 && <Separator className="my-2" />}
                  </Fragment>
                ))}
              </div>
            </ScrollArea>
          }
          code={`<ScrollArea className="${height} w-64 rounded-xl border">
  <div className="p-4">…</div>
</ScrollArea>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Horizontal"
          description="Adicione <ScrollBar orientation=&quot;horizontal&quot; />."
          previewClassName="block"
          code={`<ScrollArea className="w-full whitespace-nowrap">
  <div className="flex w-max gap-4 p-4">…</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
        >
          <ScrollArea className="w-full rounded-xl border bg-background whitespace-nowrap">
            <div className="flex w-max gap-4 p-4">
              {slides.map((s) => (
                <figure key={s.src} className="shrink-0">
                  <div className="overflow-hidden rounded-lg">
                    <Image src={s.src} alt={s.t} width={288} height={162} className="aspect-video h-40 w-auto object-cover" />
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">{s.t}</figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`} usageCode={`<ScrollArea className="h-72">\n  …conteúdo longo…\n</ScrollArea>`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="ScrollArea"
          rows={[{ prop: "className", type: "string", description: "Defina altura (vertical) ou largura (horizontal) para limitar a área." }]}
        />
        <PropsTable component="ScrollBar" rows={[{ prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Barra extra para rolagem horizontal." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Usa rolagem nativa por baixo: roda do mouse, trackpad, toque e teclado funcionam.</>,
            <>O viewport é focável quando há o que rolar, para quem navega só com teclado.</>,
            <>Evite áreas roláveis aninhadas — prenda a rolagem a um só nível por tela.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
