"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronsUpDownIcon, FolderIcon, FileTextIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const panelAnim =
  "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"

export default function CollapsiblePage() {
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Collapsible"
        description="Mostra e esconde um único bloco de conteúdo. É o primitivo por trás do Accordion — use quando só há uma seção ou quando o gatilho tem um formato próprio."
        source="src/components/ui/collapsible.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="open" checked={open} onChange={setOpen} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          previewClassName="items-start"
          preview={
            <Collapsible open={open} onOpenChange={setOpen} disabled={disabled} className="w-full max-w-sm">
              <div className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3">
                <span className="text-sm font-semibold">3 critérios do perfil ideal</span>
                <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Mostrar critérios" />}>
                  <ChevronsUpDownIcon />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className={panelAnim}>
                <ul className="mt-2 flex flex-col gap-2">
                  {["Indústria", "200–500 pessoas", "Sudeste"].map((c) => (
                    <li key={c} className="rounded-xl border px-4 py-2.5 font-mono text-sm">
                      {c}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          }
          code={`<Collapsible open={open} onOpenChange={setOpen}${disabled ? " disabled" : ""}>
  <div className="flex items-center justify-between …">
    <span>3 critérios do perfil ideal</span>
    <CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Mostrar critérios" />}>
      <ChevronsUpDownIcon />
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Filtros avançados"
            description="Um link de texto que revela mais opções."
            previewClassName="items-start"
            code={`<Collapsible>
  <CollapsibleTrigger render={<Button variant="link" />}>
    Filtros avançados <ChevronDownIcon />
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
          >
            <Collapsible className="w-full">
              <CollapsibleTrigger
                render={<Button variant="link" className="group/trigger px-0" />}
              >
                Filtros avançados
                <ChevronDownIcon data-icon="inline-end" className="transition-transform group-data-panel-open/trigger:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className={panelAnim}>
                <div className="mt-2 grid gap-2 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
                  <span>Faturamento anual · acima de R$ 50 mi</span>
                  <span>Cresceu nos últimos 12 meses</span>
                  <span>Tem diretoria comercial identificada</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Example>

          <Example
            title="Árvore de arquivos"
            description="Collapsibles aninhados."
            previewClassName="items-start"
            code={`<Collapsible defaultOpen>
  <CollapsibleTrigger>Propostas</CollapsibleTrigger>
  <CollapsibleContent>
    <Collapsible>…</Collapsible>
  </CollapsibleContent>
</Collapsible>`}
          >
            <div className="w-full max-w-xs text-sm">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-medium hover:bg-muted">
                  <FolderIcon className="size-4 text-navy-600 dark:text-navy-300" />
                  Propostas
                </CollapsibleTrigger>
                <CollapsibleContent className={panelAnim}>
                  <div className="ml-4 border-l pl-2">
                    <Collapsible>
                      <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-medium hover:bg-muted">
                        <FolderIcon className="size-4 text-navy-600 dark:text-navy-300" />
                        2026
                      </CollapsibleTrigger>
                      <CollapsibleContent className={panelAnim}>
                        <div className="ml-4 border-l pl-2">
                          {["empresa-exemplo.pdf", "alfa-embalagens.pdf"].map((f) => (
                            <div key={f} className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
                              <FileTextIcon className="size-4" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-muted-foreground">
                      <FileTextIcon className="size-4" />
                      modelo.docx
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`}
          usageCode={`<Collapsible>
  <CollapsibleTrigger>Ver mais</CollapsibleTrigger>
  <CollapsibleContent>Conteúdo escondido</CollapsibleContent>
</Collapsible>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Collapsible"
          rows={[
            { prop: "open", type: "boolean", description: "Estado aberto (controlado)." },
            { prop: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial (não controlado)." },
            { prop: "onOpenChange", type: "(open: boolean) => void", description: "Chamado ao abrir ou fechar." },
            { prop: "disabled", type: "boolean", default: "false", description: "Bloqueia o gatilho." },
          ]}
        />
        <PropsTable
          component="CollapsibleTrigger"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza o gatilho como outro elemento, p. ex. <Button />." }]}
        />
        <PropsTable
          component="CollapsibleContent"
          rows={[
            { prop: "keepMounted", type: "boolean", default: "false", description: "Mantém o conteúdo no DOM quando fechado." },
            { prop: "hiddenUntilFound", type: "boolean", default: "false", description: "Permite que a busca do navegador (Ctrl+F) abra o painel." },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Animação: o painel expõe <code className="font-mono">--collapsible-panel-height</code>. Use{" "}
          <code className="font-mono">h-(--collapsible-panel-height) data-starting-style:h-0 data-ending-style:h-0</code> com uma transição de altura.
        </p>
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O gatilho é um <code className="font-mono text-sm">button</code> com <code className="font-mono text-sm">aria-expanded</code> e <code className="font-mono text-sm">aria-controls</code>.</>,
            <><Kbd>Enter</Kbd> e <Kbd>Espaço</Kbd> alternam o painel.</>,
            <>Gatilhos só com ícone precisam de <code className="font-mono text-sm">aria-label</code> que diga o que será mostrado.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
