"use client"

import { useState } from "react"
import { CheckIcon, SparklesIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ControlSegment, ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "secondary", "outline", "ghost", "signal", "success", "warning", "info", "destructive", "label", "link"] as const
type Variant = (typeof variants)[number]

export default function BadgePage() {
  const [variant, setVariant] = useState<Variant>("signal")
  const [text, setText] = useState("Novo sinal")
  const [icon, setIcon] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Badge"
        description="Rótulo curto para status, categoria ou contagem. Na fynd, o badge signal (ciano) marca só o que é prioridade — use com parcimônia."
        source="src/components/ui/badge.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlToggle label="ícone" checked={icon} onChange={setIcon} />
              <ControlText label="texto" value={text} onChange={setText} />
            </>
          }
          preview={
            <Badge variant={variant}>
              {icon && <SparklesIcon data-icon="inline-start" />}
              {text}
            </Badge>
          }
          code={`<Badge${variant !== "default" ? ` variant="${variant}"` : ""}>${icon ? `\n  <SparklesIcon data-icon="inline-start" />\n  ` : ""}${text}${icon ? "\n" : ""}</Badge>`}
        />
      </DocSection>

      <DocSection title="Variantes" description="signal, success, warning, info e label são extensões da fynd.">
        <Example code={variants.map((v) => `<Badge variant="${v}">${v}</Badge>`).join("\n")}>
          {variants.map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Status de oportunidade"
            code={`<Badge variant="success"><CheckIcon data-icon="inline-start" />Qualificada</Badge>`}
          >
            <Badge variant="signal">Prioridade</Badge>
            <Badge variant="success">
              <CheckIcon data-icon="inline-start" />
              Qualificada
            </Badge>
            <Badge variant="info">Em análise</Badge>
            <Badge variant="warning">Revisar contato</Badge>
            <Badge variant="destructive">Descartada</Badge>
          </Example>
          <Example
            title="Rótulo (label)"
            description="Mono em caixa alta, como as etiquetas do Figma."
            code={`<Badge variant="label">Conceito de aplicação</Badge>`}
          >
            <Badge variant="label">Conceito de aplicação</Badge>
            <Badge variant="label">Beta</Badge>
          </Example>
          <Example
            title="Filtros removíveis"
            description="Critérios do perfil ideal com botão de remover."
            code={`<Badge variant="outline">
  Indústria
  <button aria-label="Remover filtro Indústria"><XIcon /></button>
</Badge>`}
          >
            {["Indústria", "200–500 pessoas", "Sudeste"].map((f) => (
              <Badge key={f} variant="outline" className="h-6 pr-1">
                {f}
                <button
                  type="button"
                  aria-label={`Remover filtro ${f}`}
                  className="flex size-4 items-center justify-center rounded-full hover:bg-muted"
                >
                  <XIcon />
                </button>
              </Badge>
            ))}
          </Example>
          <Example
            title="Como link"
            description="render transforma o badge em âncora mantendo o estilo."
            code={`<Badge render={<a href="#" />} variant="secondary">Ver todas</Badge>`}
          >
            <Badge render={<a href="#" />} variant="secondary">
              Ver todas
            </Badge>
            <Badge render={<a href="#" />} variant="link">
              Saiba mais
            </Badge>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Badge } from "@/components/ui/badge"`}
          usageCode={`<Badge variant="success">Qualificada</Badge>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Badge"
          rows={[
            {
              prop: "variant",
              type: '"default" | "secondary" | "outline" | "ghost" | "signal" | "success" | "warning" | "info" | "destructive" | "label" | "link"',
              default: '"default"',
              description: "Estilo e função do rótulo.",
            },
            { prop: "render", type: "ReactElement", description: "Renderiza como outro elemento (p. ex. <a />)." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>É um <code className="font-mono text-sm">span</code> sem papel próprio: o texto precisa bastar sozinho. Não use só a cor para indicar status.</>,
            <>Botões dentro do badge (remover filtro) precisam de <code className="font-mono text-sm">aria-label</code> com o nome do filtro.</>,
            <>Para contagens que mudam, envolva com uma região <code className="font-mono text-sm">aria-live=&quot;polite&quot;</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
