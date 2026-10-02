"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const slides = [
  { src: "/brand/slides/capa.jpg", alt: "Capa: Conceito, Marca e Identidade Visual" },
  { src: "/brand/slides/luz-revela-caminhos.jpg", alt: "Luz revela caminhos" },
  { src: "/brand/slides/origem-chama.jpg", alt: "A origem é uma chama" },
  { src: "/brand/slides/ciano-e-luz.jpg", alt: "Ciano é luz" },
  { src: "/brand/slides/ambiente.jpg", alt: "A marca orienta nos detalhes" },
]

const orientations = ["horizontal", "vertical"] as const
const perView = ["1", "2", "3"] as const

function Dots({ api }: { api: CarouselApi }) {
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())
    }
    const frame = requestAnimationFrame(update)
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      cancelAnimationFrame(frame)
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  return (
    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Slides">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === current}
          aria-label={`Ir para o slide ${i + 1}`}
          onClick={() => api?.scrollTo(i)}
          className={cn(
            "h-1.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
            i === current ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25 hover:bg-foreground/40"
          )}
        />
      ))}
      <span className="ml-3 font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </span>
    </div>
  )
}

export default function CarouselPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")
  const [items, setItems] = useState<(typeof perView)[number]>("1")
  const [loop, setLoop] = useState(false)
  const [api, setApi] = useState<CarouselApi>()

  const basis = items === "1" ? "" : items === "2" ? "basis-1/2" : "basis-1/3"
  const vertical = orientation === "vertical"

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Carousel"
        description="Sequência de conteúdos navegável por arraste, setas ou teclado. Aqui com os slides da apresentação de marca."
        source="src/components/ui/carousel.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlSegment label="itens por vez" value={items} options={perView} onChange={setItems} />
              <ControlToggle label="loop" checked={loop} onChange={setLoop} />
            </>
          }
          preview={
            <div className={cn("w-full px-12", vertical ? "max-w-md py-12" : "max-w-2xl")}>
              <Carousel
                key={`${orientation}-${items}-${loop}`}
                orientation={orientation}
                opts={{ loop, align: "start" }}
                className="w-full"
              >
                <CarouselContent className={vertical ? "-mt-4 h-72" : undefined}>
                  {slides.map((s) => (
                    <CarouselItem key={s.src} className={cn(basis, vertical && "pt-4")}>
                      <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-900">
                        <Image src={s.src} alt={s.alt} fill sizes="640px" className="object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          }
          code={`<Carousel${vertical ? ' orientation="vertical"' : ""} opts={{ align: "start"${loop ? ", loop: true" : ""} }}>
  <CarouselContent${vertical ? ' className="-mt-4 h-72"' : ""}>
    {slides.map((s) => (
      <CarouselItem key={s.src}${basis || vertical ? ` className="${[basis, vertical ? "pt-4" : ""].filter(Boolean).join(" ")}"` : ""}>
        <Image src={s.src} alt={s.alt} … />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Com indicadores (API)"
            description="setApi expõe a instância do Embla para montar pontos e contador."
            previewClassName="block"
            code={`const [api, setApi] = useState<CarouselApi>()

<Carousel setApi={setApi}>…</Carousel>
<Dots api={api} />  // usa api.selectedScrollSnap() e api.on("select")`}
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                  {slides.map((s) => (
                    <CarouselItem key={s.src}>
                      <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-900">
                        <Image src={s.src} alt={s.alt} fill sizes="672px" className="object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <Dots api={api} />
            </div>
          </Example>

          <Example
            title="Cartões de mensagem"
            description="Itens de texto com basis parcial deixam o próximo aparecer."
            previewClassName="block"
            code={`<CarouselItem className="basis-4/5 md:basis-1/3">…</CarouselItem>`}
          >
            <div className="mx-auto max-w-3xl px-12">
              <Carousel opts={{ align: "start" }}>
                <CarouselContent>
                  {[
                    ["Clareza em meio ao volume", "Dados só têm valor quando ajudam alguém a decidir onde agir."],
                    ["Um caminho mais próximo", "O ponto de partida é uma conversa sobre o cliente ideal."],
                    ["Inteligência que orienta", "A tecnologia organiza critérios para apoiar decisões humanas."],
                    ["Oportunidade com contexto", "Priorizar empresas que façam sentido para a conversa."],
                  ].map(([t, d], i) => (
                    <CarouselItem key={t} className="basis-4/5 md:basis-1/3">
                      <div className="flex h-full flex-col gap-3 rounded-xl border bg-card p-5">
                        <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                        <span className="font-heading text-lg">{t}</span>
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"`}
          usageCode={`<Carousel>
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Carousel"
          rows={[
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Eixo de rolagem." },
            { prop: "opts", type: "EmblaOptionsType", description: "Opções do Embla: loop, align, dragFree, slidesToScroll…" },
            { prop: "plugins", type: "EmblaPluginType[]", description: "Plugins do Embla (autoplay, etc.)." },
            { prop: "setApi", type: "(api: CarouselApi) => void", description: "Recebe a instância para controle externo." },
          ]}
        />
        <PropsTable
          component="CarouselItem"
          rows={[{ prop: "className", type: "string", description: 'Use basis-* para itens por vez (p. ex. "basis-1/3").' }]}
        />
        <PropsTable
          component="CarouselPrevious · CarouselNext"
          rows={[
            { prop: "variant", type: "Button variant", default: '"outline"', description: "Estilo das setas." },
            { prop: "size", type: "Button size", default: '"icon-sm"', description: "Tamanho das setas." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O contêiner tem <code className="font-mono text-sm">role=&quot;region&quot;</code> e <code className="font-mono text-sm">aria-roledescription=&quot;carousel&quot;</code>; cada item é um <code className="font-mono text-sm">group</code> “slide”.</>,
            <>Com o foco no carrossel, <Kbd>←</Kbd> e <Kbd>→</Kbd> navegam.</>,
            <>As setas têm rótulo acessível e ficam desabilitadas nas pontas quando não há loop.</>,
            <>Evite autoplay. Se usar, pause no hover/foco e ofereça um botão de pausa.</>,
            <>Todo slide com imagem precisa de <code className="font-mono text-sm">alt</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
