"use client"

import { useState } from "react"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"
import { CompanyAvatar } from "@/components/company-avatar"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sides = ["bottom", "top", "left", "right"] as const
const aligns = ["start", "center", "end"] as const

function CompanyPreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <CompanyAvatar name="Empresa Exemplo" size="lg" signal />
        <div className="flex flex-col">
          <span className="font-semibold">Empresa Exemplo</span>
          <span className="text-xs text-muted-foreground">Indústria · CNPJ 00.000.000/0001-00</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Fabricante de embalagens com expansão regional recente no Sudeste.</p>
      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><UsersIcon className="size-3.5" />320 pessoas</span>
        <span className="flex items-center gap-2"><MapPinIcon className="size-3.5" />São Paulo, SP</span>
        <span className="flex items-center gap-2"><CalendarIcon className="size-3.5" />Fundada em 2004</span>
      </div>
      <Progress value={92} variant="signal" aria-label="Aderência ao perfil ideal">
        <span className="text-xs font-medium">Aderência</span>
        <span className="ml-auto font-mono text-xs">92%</span>
      </Progress>
    </div>
  )
}

export default function HoverCardPage() {
  const [side, setSide] = useState<(typeof sides)[number]>("bottom")
  const [align, setAlign] = useState<(typeof aligns)[number]>("center")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Hover Card"
        description="Prévia que aparece ao passar o mouse sobre um link. Dá contexto rápido — quem é a empresa, qual a aderência — sem sair da lista."
        source="src/components/ui/hover-card.tsx"
      />

      <DocSection title="Playground" description="Passe o mouse (ou foque com Tab) no nome da empresa.">
        <Playground
          controls={
            <>
              <ControlSegment label="side" value={side} options={sides} onChange={setSide} />
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
            </>
          }
          preview={
            <p className="max-w-md text-center text-base leading-relaxed">
              A oportunidade mais forte desta semana é a{" "}
              <HoverCard>
                <HoverCardTrigger href="#" className="font-semibold text-navy-600 underline decoration-navy-600/30 underline-offset-4 hover:decoration-navy-600 dark:text-navy-200">
                  Empresa Exemplo
                </HoverCardTrigger>
                <HoverCardContent side={side} align={align} className="w-80">
                  <CompanyPreview />
                </HoverCardContent>
              </HoverCard>
              , com sinais de expansão.
            </p>
          }
          code={`<HoverCard>
  <HoverCardTrigger href="/empresas/empresa-exemplo">Empresa Exemplo</HoverCardTrigger>
  <HoverCardContent side="${side}" align="${align}" className="w-80">
    …prévia da empresa…
  </HoverCardContent>
</HoverCard>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Em uma lista"
          description="Nomes de empresas na tabela com prévia ao passar o mouse."
          code={`<HoverCardTrigger delay={300} …>`}
        >
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {["Alfa Embalagens", "Norte Metais", "Vale Plásticos"].map((c) => (
              <HoverCard key={c}>
                <HoverCardTrigger href="#" delay={300} className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                  <Badge variant="outline" className="h-7 gap-2 px-2">
                    <CompanyAvatar name={c} size="sm" />
                    {c}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{c}</span>
                    <span className="text-sm text-muted-foreground">Indústria · Sudeste</span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`}
          usageCode={`<HoverCard>
  <HoverCardTrigger href="/perfil">@mariana</HoverCardTrigger>
  <HoverCardContent>Prévia</HoverCardContent>
</HoverCard>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="HoverCard"
          rows={[
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
            { prop: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial." },
          ]}
        />
        <PropsTable
          component="HoverCardTrigger"
          rows={[
            { prop: "href", type: "string", description: "Renderiza um link (<a>) por padrão." },
            { prop: "delay", type: "number", default: "600", description: "Espera (ms) antes de abrir." },
            { prop: "closeDelay", type: "number", default: "300", description: "Espera (ms) antes de fechar." },
          ]}
        />
        <PropsTable
          component="HoverCardContent"
          rows={[
            { prop: "side", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: "Lado em que abre." },
            { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alinhamento." },
            { prop: "sideOffset · alignOffset", type: "number", default: "4 · 4", description: "Deslocamentos em px." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Abre também quando o link recebe foco pelo teclado.</>,
            <>O conteúdo é complementar: não é anunciado como diálogo e não deve conter a única forma de acessar uma informação ou ação.</>,
            <>No toque não há hover — o link precisa levar a uma página com o mesmo conteúdo.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
