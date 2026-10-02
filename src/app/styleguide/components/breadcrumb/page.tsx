"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { SlashIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const separators = ["chevron", "slash", "ponto"] as const
const trail = ["Início", "Oportunidades", "Indústria", "Alfa Embalagens"]

function Sep({ kind }: { kind: (typeof separators)[number] }) {
  if (kind === "slash") return <BreadcrumbSeparator><SlashIcon /></BreadcrumbSeparator>
  if (kind === "ponto") return <BreadcrumbSeparator>·</BreadcrumbSeparator>
  return <BreadcrumbSeparator />
}

export default function BreadcrumbPage_() {
  const [separator, setSeparator] = useState<(typeof separators)[number]>("chevron")
  const [collapsed, setCollapsed] = useState(false)

  const items = collapsed ? [trail[0], "…", trail[trail.length - 1]] : trail
  const sepCode = separator === "slash" ? "<BreadcrumbSeparator><SlashIcon /></BreadcrumbSeparator>" : separator === "ponto" ? "<BreadcrumbSeparator>·</BreadcrumbSeparator>" : "<BreadcrumbSeparator />"
  const code = `<Breadcrumb>
  <BreadcrumbList>
${items
  .map((item, i) => {
    const last = i === items.length - 1
    const el = item === "…" ? "<BreadcrumbEllipsis />" : last ? `<BreadcrumbPage>${item}</BreadcrumbPage>` : `<BreadcrumbLink render={<Link href="#" />}>${item}</BreadcrumbLink>`
    return `    <BreadcrumbItem>${el}</BreadcrumbItem>${last ? "" : `\n    ${sepCode}`}`
  })
  .join("\n")}
  </BreadcrumbList>
</Breadcrumb>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Breadcrumb"
        description="Mostra onde a pessoa está na hierarquia e oferece um caminho de volta. Útil em telas de detalhe, como o contexto de uma empresa."
        source="src/components/ui/breadcrumb.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="separador" value={separator} options={separators} onChange={setSeparator} />
              <ControlToggle label="recolhido" checked={collapsed} onChange={setCollapsed} />
            </>
          }
          preview={
            <Breadcrumb>
              <BreadcrumbList>
                {items.map((item, i) => {
                  const last = i === items.length - 1
                  return (
                    <Fragment key={item}>
                      <BreadcrumbItem>
                        {item === "…" ? (
                          <BreadcrumbEllipsis />
                        ) : last ? (
                          <BreadcrumbPage>{item}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink render={<Link href="#" />}>{item}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!last && <Sep kind={separator} />}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          }
          code={code}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="No cabeçalho de uma página"
            description="Breadcrumb acima do título, em texto pequeno e cinza azulado."
            previewClassName="block"
            code={`<Breadcrumb>…</Breadcrumb>\n<h1>Alfa Embalagens</h1>`}
          >
            <div className="flex flex-col gap-3">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href="#" />}>Oportunidades</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Alfa Embalagens</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h2 className="text-4xl">Alfa Embalagens</h2>
              <p className="text-muted-foreground">Indústria · 410 pessoas · 84% ao perfil ideal</p>
            </div>
          </Example>
          <Example
            title="Rótulo mono"
            description="Variação editorial, como os cabeçalhos dos slides."
            code={`<BreadcrumbList className="font-mono text-xs tracking-label uppercase">…</BreadcrumbList>`}
          >
            <Breadcrumb>
              <BreadcrumbList className="font-mono text-xs tracking-label uppercase">
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="#" />}>Marca</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="#" />}>Cor</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Ciano é luz</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
          usageCode={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<Link href="/oportunidades" />}>Oportunidades</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Alfa Embalagens</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="BreadcrumbLink"
          rows={[
            { prop: "href", type: "string", description: "Destino do link (quando renderiza <a>)." },
            { prop: "render", type: "ReactElement", description: 'Use render={<Link href="…" />} para navegação do Next.js.' },
          ]}
        />
        <PropsTable
          component="BreadcrumbSeparator"
          rows={[{ prop: "children", type: "ReactNode", default: "<ChevronRightIcon />", description: "Troca o separador." }]}
        />
        <PropsTable
          component="Breadcrumb · BreadcrumbList · BreadcrumbItem · BreadcrumbPage · BreadcrumbEllipsis"
          rows={[{ prop: "…props", type: "props nativas", description: "nav, ol, li e span, respectivamente." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O contêiner é um <code className="font-mono text-sm">nav</code> com <code className="font-mono text-sm">aria-label=&quot;breadcrumb&quot;</code> e uma lista ordenada.</>,
            <>A página atual usa <code className="font-mono text-sm">aria-current=&quot;page&quot;</code> e não é clicável.</>,
            <>Separadores são <code className="font-mono text-sm">aria-hidden</code>; o leitor de tela anuncia só os níveis.</>,
            <>A reticência tem texto oculto “Mais”; se ela abrir um menu, transforme-a em botão com rótulo.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
