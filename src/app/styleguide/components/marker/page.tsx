"use client"

import { useState } from "react"
import { CheckCircle2Icon, SparklesIcon } from "lucide-react"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "separator", "border"] as const
const icons = ["spinner", "sinal", "concluído", "nenhum"] as const

export default function MarkerPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [icon, setIcon] = useState<(typeof icons)[number]>("spinner")
  const [status, setStatus] = useState(true)

  const iconNode =
    icon === "spinner" ? <Spinner /> : icon === "sinal" ? <SparklesIcon /> : icon === "concluído" ? <CheckCircle2Icon /> : null
  const text = icon === "spinner" ? "Cruzando com o perfil ideal…" : icon === "sinal" ? "3 novos sinais" : icon === "concluído" ? "12 empresas encontradas" : "Hoje"

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Marker"
        description="Anotação discreta dentro de um fluxo — um status, um divisor de data, um “pensando…”. Na conversa de perfil ideal, marca o que a fynd está fazendo."
        source="src/components/ui/marker.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="ícone" value={icon} options={icons} onChange={setIcon} />
              <ControlToggle label='role="status"' checked={status} onChange={setStatus} />
            </>
          }
          preview={
            <div className="w-full max-w-md">
              <Marker variant={variant} role={status ? "status" : undefined}>
                {iconNode && <MarkerIcon>{iconNode}</MarkerIcon>}
                <MarkerContent>{text}</MarkerContent>
              </Marker>
            </div>
          }
          code={`<Marker${variant !== "default" ? ` variant="${variant}"` : ""}${status ? ' role="status"' : ""}>${iconNode ? `\n  <MarkerIcon>${icon === "spinner" ? "<Spinner />" : icon === "sinal" ? "<SparklesIcon />" : "<CheckCircle2Icon />"}</MarkerIcon>` : ""}
  <MarkerContent>${text}</MarkerContent>
</Marker>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Divisor de data"
            description='variant="separator" centraliza entre linhas.'
            previewClassName="block"
            code={`<Marker variant="separator">\n  <MarkerContent>Hoje</MarkerContent>\n</Marker>`}
          >
            <div className="flex flex-col gap-4 text-sm">
              <p className="text-muted-foreground">…mensagens de ontem</p>
              <Marker variant="separator">
                <MarkerContent>Hoje</MarkerContent>
              </Marker>
              <p>Indústrias de 200 a 500 pessoas no Sudeste.</p>
            </div>
          </Example>
          <Example
            title="Etapas da busca"
            description="Uma sequência de markers mostra o progresso."
            previewClassName="block"
            code={`<Marker><MarkerIcon><CheckCircle2Icon /></MarkerIcon><MarkerContent>…</MarkerContent></Marker>`}
          >
            <div className="flex flex-col gap-3">
              <Marker>
                <MarkerIcon>
                  <CheckCircle2Icon className="text-success" />
                </MarkerIcon>
                <MarkerContent>Perfil ideal entendido</MarkerContent>
              </Marker>
              <Marker>
                <MarkerIcon>
                  <CheckCircle2Icon className="text-success" />
                </MarkerIcon>
                <MarkerContent>1,2 mi de CNPJs filtrados</MarkerContent>
              </Marker>
              <Marker role="status">
                <MarkerIcon>
                  <Spinner />
                </MarkerIcon>
                <MarkerContent className="shimmer">Priorizando por aderência…</MarkerContent>
              </Marker>
            </div>
          </Example>
          <Example
            title="Cabeçalho de seção"
            description='variant="border" separa blocos.'
            previewClassName="block"
            code={`<Marker variant="border"><MarkerContent>Fontes consultadas</MarkerContent></Marker>`}
          >
            <Marker variant="border">
              <MarkerContent>
                Fontes consultadas · <a href="#">ver detalhes</a>
              </MarkerContent>
            </Marker>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"`}
          usageCode={`<Marker role="status">\n  <MarkerIcon><Spinner /></MarkerIcon>\n  <MarkerContent>Pensando…</MarkerContent>\n</Marker>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Marker"
          rows={[
            { prop: "variant", type: '"default" | "separator" | "border"', default: '"default"', description: "Linha simples, divisor centralizado ou com borda inferior." },
            { prop: "render", type: "ReactElement", description: "Renderiza como outro elemento (p. ex. <li />)." },
            { prop: "role", type: "string", description: 'Use "status" para estados que mudam, e o leitor anuncia.' },
          ]}
        />
        <PropsTable component="MarkerIcon · MarkerContent" rows={[{ prop: "…props", type: 'React.ComponentProps<"span">', description: "MarkerIcon é aria-hidden." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Para estados temporários (“Pensando…”), use <code className="font-mono text-sm">role=&quot;status&quot;</code> — o texto é anunciado sem roubar o foco.</>,
            <>O ícone é decorativo; o texto do MarkerContent precisa bastar.</>,
            <>Divisores de data são texto real: o leitor de tela lê “Hoje” entre as mensagens.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
