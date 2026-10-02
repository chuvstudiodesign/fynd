"use client"

import { useState } from "react"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const ratios = { "16/9": 16 / 9, "4/3": 4 / 3, "1/1": 1, "3/4": 3 / 4, "21/9": 21 / 9 } as const
type RatioKey = keyof typeof ratios
const ratioKeys = Object.keys(ratios) as RatioKey[]

export default function AspectRatioPage() {
  const [ratio, setRatio] = useState<RatioKey>("16/9")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Aspect Ratio"
        description="Reserva a proporção de uma mídia antes de ela carregar. Evita saltos de layout em imagens, vídeos e capas de apresentação."
        source="src/components/ui/aspect-ratio.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={<ControlSegment label="ratio" value={ratio} options={ratioKeys} onChange={setRatio} />}
          preview={
            <div className="w-full max-w-md">
              <AspectRatio ratio={ratios[ratio]} className="overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/brand/slides/capa.jpg"
                  alt="Capa da apresentação de marca da fynd"
                  fill
                  sizes="448px"
                  className="object-cover"
                />
              </AspectRatio>
            </div>
          }
          code={`<AspectRatio ratio={${ratio}} className="overflow-hidden rounded-xl bg-muted">
  <Image src="/brand/slides/capa.jpg" alt="…" fill className="object-cover" />
</AspectRatio>`}
        />
      </DocSection>

      <DocSection title="Proporções comuns">
        <Example
          previewClassName="grid grid-cols-2 gap-6 md:grid-cols-4 items-start"
          code={`<AspectRatio ratio={16 / 9}>…</AspectRatio>
<AspectRatio ratio={4 / 3}>…</AspectRatio>
<AspectRatio ratio={1}>…</AspectRatio>
<AspectRatio ratio={3 / 4}>…</AspectRatio>`}
        >
          {(["16/9", "4/3", "1/1", "3/4"] as RatioKey[]).map((r) => (
            <div key={r} className="flex flex-col gap-2">
              <AspectRatio ratio={ratios[r]} className="overflow-hidden rounded-lg bg-muted">
                <Image
                  src="/brand/slides/luz-revela-caminhos.jpg"
                  alt="Slide ‘Luz revela caminhos’"
                  fill
                  sizes="220px"
                  className="object-cover object-right"
                />
              </AspectRatio>
              <code className="font-mono text-xs text-muted-foreground">{r}</code>
            </div>
          ))}
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Placeholder de mídia"
            description="Sem imagem, a caixa já ocupa o espaço final."
            code={`<AspectRatio ratio={16 / 9} className="rounded-xl bg-navy-900">\n  <div className="flex size-full items-center justify-center">…</div>\n</AspectRatio>`}
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="rounded-xl bg-navy-900">
                <div className="flex size-full flex-col items-center justify-center gap-2 text-steel-300">
                  <span className="size-2 rounded-full bg-signal-400" />
                  <span className="font-mono text-xs tracking-label uppercase">Vídeo em breve</span>
                </div>
              </AspectRatio>
            </div>
          </Example>
          <Example
            title="Vídeo / iframe"
            description="Qualquer filho com position absolute e tamanho total se encaixa."
            code={`<AspectRatio ratio={16 / 9}>\n  <iframe className="absolute inset-0 size-full" … />\n</AspectRatio>`}
          >
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
                <Image src="/brand/slides/origem-chama.jpg" alt="Slide ‘A origem é uma chama’" fill sizes="400px" className="object-cover" />
              </AspectRatio>
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { AspectRatio } from "@/components/ui/aspect-ratio"`}
          usageCode={`<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
  <Image src="…" alt="…" fill className="object-cover" />
</AspectRatio>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="AspectRatio"
          rows={[
            { prop: "ratio", type: "number", description: "Largura ÷ altura. Obrigatório. Ex.: 16 / 9." },
            { prop: "…props", type: 'React.ComponentProps<"div">', description: "Props de div. Use className para raio, fundo e overflow." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>É só um contêiner de layout, sem papel semântico. A acessibilidade vem do conteúdo.</>,
            <>Toda imagem informativa precisa de <code className="font-mono text-sm">alt</code> descritivo; imagens decorativas usam <code className="font-mono text-sm">alt=&quot;&quot;</code>.</>,
            <>Iframes precisam de <code className="font-mono text-sm">title</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
