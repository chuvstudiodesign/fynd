"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["size-3", "size-4", "size-6", "size-8"] as const
const colors = ["atual", "muted", "signal"] as const

export default function SpinnerPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("size-6")
  const [color, setColor] = useState<(typeof colors)[number]>("atual")

  const colorClass = color === "muted" ? "text-muted-foreground" : color === "signal" ? "text-signal" : ""

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Spinner"
        description="Indicador de carregamento indeterminado. Para esperas curtas; quando o progresso é conhecido, use Progress; quando a forma do conteúdo é conhecida, Skeleton."
        source="src/components/ui/spinner.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="tamanho" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="cor" value={color} options={colors} onChange={setColor} />
            </>
          }
          preview={<Spinner className={`${size} ${colorClass}`} />}
          code={`<Spinner className="${[size, colorClass].filter(Boolean).join(" ")}" />`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Em outros componentes"
          code={`<Button disabled><Spinner data-icon="inline-start" />Buscando…</Button>
<Badge variant="secondary"><Spinner />Sincronizando</Badge>
<InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon>`}
        >
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Buscando…
          </Button>
          <Badge variant="secondary">
            <Spinner />
            Sincronizando
          </Badge>
          <InputGroup className="w-60">
            <InputGroupInput defaultValue="Alfa Emb" aria-label="Buscar empresa" />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Spinner } from "@/components/ui/spinner"`} usageCode={`<Spinner />\n<Spinner className="size-8 text-muted-foreground" />`} />
        <p className="text-sm text-muted-foreground">Para botões que carregam, prefira o LoadingButton (página Button).</p>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Spinner"
          rows={[
            { prop: "className", type: "string", description: "Tamanho (size-*) e cor (text-*). Herda a cor do texto." },
            { prop: "aria-label", type: "string", default: '"Carregando"', description: "Texto anunciado." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Tem <code className="font-mono text-sm">role=&quot;status&quot;</code> e rótulo “Carregando”; mude o <code className="font-mono text-sm">aria-label</code> para algo específico (“Buscando empresas”).</>,
            <>Dentro de um botão que já diz “Buscando…”, esconda o spinner do leitor com <code className="font-mono text-sm">aria-hidden</code> para não repetir.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
