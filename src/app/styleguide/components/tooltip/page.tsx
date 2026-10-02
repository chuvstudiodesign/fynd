"use client"

import { useState } from "react"
import { CopyIcon, InfoIcon, PinIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sides = ["top", "right", "bottom", "left"] as const

export default function TooltipPage() {
  const [side, setSide] = useState<(typeof sides)[number]>("top")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Tooltip"
        description="Dica curta ao passar o mouse ou focar um elemento. Nomeia botões de ícone e mostra atalhos. Só texto — para conteúdo rico, use Hover Card ou Popover."
        source="src/components/ui/tooltip.tsx"
      />

      <DocSection title="Playground" description="Passe o mouse ou foque com Tab.">
        <Playground
          controls={<ControlSegment label="side" value={side} options={sides} onChange={setSide} />}
          preview={
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Fixar empresa" />}>
                <PinIcon />
              </TooltipTrigger>
              <TooltipContent side={side}>Fixar empresa</TooltipContent>
            </Tooltip>
          }
          code={`<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Fixar empresa" />}>
    <PinIcon />
  </TooltipTrigger>
  <TooltipContent side="${side}">Fixar empresa</TooltipContent>
</Tooltip>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Barra de ações com atalhos"
            description="TooltipProvider compartilha o atraso: depois do primeiro, os vizinhos abrem na hora."
            code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button … />}><CopyIcon /></TooltipTrigger>
    <TooltipContent>Copiar CNPJ <Kbd>⌘C</Kbd></TooltipContent>
  </Tooltip>
  …
</TooltipProvider>`}
          >
            <TooltipProvider>
              <ButtonGroup>
                {[
                  { icon: CopyIcon, label: "Copiar CNPJ", kbd: "⌘C" },
                  { icon: PinIcon, label: "Fixar", kbd: "P" },
                  { icon: Trash2Icon, label: "Descartar", kbd: "⌫" },
                ].map((a) => (
                  <Tooltip key={a.label}>
                    <TooltipTrigger render={<Button variant="outline" size="icon" aria-label={a.label} />}>
                      <a.icon />
                    </TooltipTrigger>
                    <TooltipContent>
                      {a.label} <Kbd>{a.kbd}</Kbd>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </TooltipProvider>
          </Example>
          <Example title="Explicação curta" code={`<TooltipContent className="max-w-56">…</TooltipContent>`}>
            <span className="flex items-center gap-1.5 text-sm">
              Aderência
              <Tooltip>
                <TooltipTrigger render={<button type="button" aria-label="O que é aderência?" className="rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring" />}>
                  <InfoIcon className="size-4" />
                </TooltipTrigger>
                <TooltipContent className="max-w-56">Quanto a empresa combina com o seu perfil de cliente ideal, de 0 a 100%.</TooltipContent>
              </Tooltip>
            </span>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"`}
          usageCode={`<Tooltip>\n  <TooltipTrigger render={<Button size="icon" aria-label="Copiar" />}><CopyIcon /></TooltipTrigger>\n  <TooltipContent>Copiar</TooltipContent>\n</Tooltip>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="TooltipProvider"
          rows={[
            { prop: "delay", type: "number", default: "0", description: "Atraso (ms) para abrir." },
            { prop: "closeDelay", type: "number", description: "Atraso para fechar." },
          ]}
        />
        <PropsTable
          component="TooltipContent"
          rows={[
            { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Lado (troca sozinho se faltar espaço)." },
            { prop: "align · sideOffset", type: "string · number", description: "Alinhamento e distância." },
          ]}
        />
        <PropsTable component="TooltipTrigger" rows={[{ prop: "render", type: "ReactElement", description: "O elemento que recebe a dica (normalmente um Button)." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Abre com hover e com foco de teclado; <kbd className="font-mono text-sm">Esc</kbd> fecha.</>,
            <>A dica é descrição complementar. Botões de ícone precisam do próprio <code className="font-mono text-sm">aria-label</code>.</>,
            <>Não ponha conteúdo essencial ou interativo no tooltip — no toque ele não aparece.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
