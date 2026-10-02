"use client"

import { useState } from "react"
import { ThumbsUpIcon } from "lucide-react"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"
import { CompanyAvatar } from "@/components/company-avatar"
import { FChama } from "@/components/brand/f-chama"
import { ControlSegment, ControlText, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const
const aligns = ["start", "end"] as const

function FyndMark() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-paper-50 ring-1 ring-foreground/10">
      <FChama className="h-4.5 w-auto" aria-hidden="true" />
    </span>
  )
}

export default function BubblePage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("secondary")
  const [align, setAlign] = useState<(typeof aligns)[number]>("start")
  const [text, setText] = useState("Encontrei 12 empresas com aderência acima de 80% ao seu perfil.")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Bubble"
        description="Balão de mensagem para a conversa em que o cliente descreve o perfil ideal. A pessoa fala em azul profundo; a fynd responde em superfície neutra."
        source="src/components/ui/bubble.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
              <ControlText label="texto" value={text} onChange={setText} />
            </>
          }
          previewClassName="block"
          preview={
            <div className="mx-auto flex w-full max-w-md flex-col">
              <Bubble variant={variant} align={align}>
                <BubbleContent>{text}</BubbleContent>
              </Bubble>
            </div>
          }
          code={`<Bubble${variant !== "default" ? ` variant="${variant}"` : ""}${align !== "start" ? ` align="${align}"` : ""}>
  <BubbleContent>${text}</BubbleContent>
</Bubble>`}
        />
      </DocSection>

      <DocSection title="Variantes">
        <Example previewClassName="block" code={variants.map((v) => `<Bubble variant="${v}">…</Bubble>`).join("\n")}>
          <div className="mx-auto flex max-w-md flex-col gap-4">
            {variants.map((v) => (
              <Bubble key={v} variant={v} align={v === "default" || v === "tinted" ? "end" : "start"}>
                <BubbleContent>
                  <span className="font-mono text-xs opacity-70">{v}</span> —{" "}
                  {v === "default"
                    ? "a mensagem da pessoa."
                    : v === "secondary"
                      ? "a resposta da fynd."
                      : v === "muted"
                        ? "notas de sistema discretas."
                        : v === "tinted"
                          ? "um tom suave do primário."
                          : v === "outline"
                            ? "moldura com borda."
                            : v === "ghost"
                              ? "texto longo sem moldura, em largura total."
                              : "erro ou ação que falhou."}
                </BubbleContent>
              </Bubble>
            ))}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Conversa de perfil ideal"
            description="BubbleGroup agrupa mensagens seguidas do mesmo autor."
            previewClassName="block bg-background"
            code={`<div className="flex gap-3">
  <FyndMark />
  <BubbleGroup>
    <Bubble variant="secondary"><BubbleContent>…</BubbleContent></Bubble>
    <Bubble variant="secondary"><BubbleContent>…</BubbleContent></Bubble>
  </BubbleGroup>
</div>
<Bubble align="end"><BubbleContent>…</BubbleContent></Bubble>`}
          >
            <div className="mx-auto flex max-w-lg flex-col gap-6">
              <div className="flex items-end gap-3">
                <FyndMark />
                <BubbleGroup className="flex-1">
                  <Bubble variant="secondary">
                    <BubbleContent>Olá! Me conte quem é o seu cliente ideal.</BubbleContent>
                  </Bubble>
                  <Bubble variant="secondary">
                    <BubbleContent>Setor, porte e região já me ajudam a começar.</BubbleContent>
                  </Bubble>
                </BubbleGroup>
              </div>
              <div className="flex items-end justify-end gap-3">
                <BubbleGroup className="flex-1">
                  <Bubble align="end">
                    <BubbleContent>Indústrias de 200 a 500 pessoas no Sudeste.</BubbleContent>
                  </Bubble>
                </BubbleGroup>
                <CompanyAvatar name="Mariana Pillati" />
              </div>
              <div className="flex items-end gap-3">
                <FyndMark />
                <Bubble variant="secondary">
                  <BubbleContent>
                    Encontrei <strong>12 empresas</strong> com aderência acima de 80%. A mais forte é a Empresa Exemplo, com
                    expansão regional recente.
                  </BubbleContent>
                  <BubbleReactions>
                    <ThumbsUpIcon className="size-3.5" aria-label="Curtido" />
                  </BubbleReactions>
                </Bubble>
              </div>
            </div>
          </Example>

          <Example
            title="Sugestões clicáveis"
            description='render={<button />} transforma o balão em ação.'
            code={`<Bubble variant="outline" align="end">
  <BubbleContent render={<button type="button" />}>Refinar por faturamento</BubbleContent>
</Bubble>`}
            previewClassName="block"
          >
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {["Refinar por faturamento", "Mostrar só quem cresceu este ano", "Ver as 3 mais aderentes"].map((s) => (
                <Bubble key={s} variant="outline" align="end">
                  <BubbleContent render={<button type="button" />}>{s}</BubbleContent>
                </Bubble>
              ))}
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"`}
          usageCode={`<BubbleGroup>
  <Bubble variant="secondary">
    <BubbleContent>Resposta da fynd</BubbleContent>
  </Bubble>
  <Bubble align="end">
    <BubbleContent>Mensagem da pessoa</BubbleContent>
  </Bubble>
</BubbleGroup>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Bubble"
          rows={[
            { prop: "variant", type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"', default: '"default"', description: "Superfície do balão." },
            { prop: "align", type: '"start" | "end"', default: '"start"', description: "end alinha à direita (mensagens da própria pessoa)." },
          ]}
        />
        <PropsTable
          component="BubbleContent"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza como botão ou link, mantendo o estilo." }]}
        />
        <PropsTable
          component="BubbleReactions"
          rows={[
            { prop: "side", type: '"top" | "bottom"', default: '"bottom"', description: "Borda onde as reações ficam." },
            { prop: "align", type: '"start" | "end"', default: '"end"', description: "Canto das reações." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Use uma lista ou <code className="font-mono text-sm">role=&quot;log&quot;</code> com <code className="font-mono text-sm">aria-live=&quot;polite&quot;</code> no contêiner da conversa para anunciar novas mensagens.</>,
            <>Alinhamento e cor não bastam para indicar o autor: inclua avatar ou nome acessível (texto oculto “fynd disse:”).</>,
            <>Balões clicáveis devem ser <code className="font-mono text-sm">button</code> ou <code className="font-mono text-sm">a</code> via <code className="font-mono text-sm">render</code>, para receber foco e teclado.</>,
            <>Reações só com ícone precisam de <code className="font-mono text-sm">aria-label</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
