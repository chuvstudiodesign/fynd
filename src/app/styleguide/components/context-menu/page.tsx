"use client"

import { useState } from "react"
import { CopyIcon, MessageCircleIcon, PinIcon, Trash2Icon, UserPlusIcon } from "lucide-react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { OpportunityCard } from "@/components/opportunity-card"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function ContextMenuPage() {
  const [shortcuts, setShortcuts] = useState(true)
  const [pinned, setPinned] = useState(true)
  const [status, setStatus] = useState("prioridade")
  const [last, setLast] = useState<string | null>(null)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Context Menu"
        description="Menu que abre com o botão direito (ou toque longo). Atalho para quem já conhece a interface — nunca o único caminho para uma ação."
        source="src/components/ui/context-menu.tsx"
      />

      <DocSection title="Playground" description="Clique com o botão direito na área tracejada.">
        <Playground
          controls={<ControlToggle label="atalhos" checked={shortcuts} onChange={setShortcuts} />}
          preview={
            <div className="flex flex-col items-center gap-3">
              <ContextMenu>
                <ContextMenuTrigger className="flex h-40 w-80 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                  Clique com o botão direito
                </ContextMenuTrigger>
                <ContextMenuContent className="w-56">
                  <ContextMenuItem onClick={() => setLast("Iniciar conversa")}>
                    <MessageCircleIcon />
                    Iniciar conversa
                    {shortcuts && <ContextMenuShortcut>⌘E</ContextMenuShortcut>}
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => setLast("Copiar CNPJ")}>
                    <CopyIcon />
                    Copiar CNPJ
                    {shortcuts && <ContextMenuShortcut>⌘C</ContextMenuShortcut>}
                  </ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>
                      <UserPlusIcon />
                      Atribuir a
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      {["Mariana", "Lucas", "Time comercial"].map((p) => (
                        <ContextMenuItem key={p} onClick={() => setLast(`Atribuído a ${p}`)}>
                          {p}
                        </ContextMenuItem>
                      ))}
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuSeparator />
                  <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
                    Fixar no topo
                  </ContextMenuCheckboxItem>
                  <ContextMenuSeparator />
                  <ContextMenuGroup>
                    <ContextMenuLabel>Status</ContextMenuLabel>
                    <ContextMenuRadioGroup value={status} onValueChange={setStatus}>
                      <ContextMenuRadioItem value="prioridade">Prioridade</ContextMenuRadioItem>
                      <ContextMenuRadioItem value="analise">Em análise</ContextMenuRadioItem>
                      <ContextMenuRadioItem value="descartada">Descartada</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                  </ContextMenuGroup>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive" onClick={() => setLast("Removida")}>
                    <Trash2Icon />
                    Remover da lista
                    {shortcuts && <ContextMenuShortcut>⌫</ContextMenuShortcut>}
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {last ?? "—"} · fixado: {pinned ? "sim" : "não"} · status: {status}
              </span>
            </div>
          }
          code={`<ContextMenu>
  <ContextMenuTrigger>…</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      <MessageCircleIcon />
      Iniciar conversa${shortcuts ? "\n      <ContextMenuShortcut>⌘E</ContextMenuShortcut>" : ""}
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>Atribuir a</ContextMenuSubTrigger>
      <ContextMenuSubContent>…</ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>Fixar no topo</ContextMenuCheckboxItem>
    <ContextMenuRadioGroup value={status} onValueChange={setStatus}>
      <ContextMenuRadioItem value="prioridade">Prioridade</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Remover da lista</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Em uma linha de oportunidade"
          description="O menu contextual repete ações que também existem em botões visíveis."
          previewClassName="block"
          code={`<ContextMenu>
  <ContextMenuTrigger render={<div />}>
    <OpportunityCard company="Empresa Exemplo" … />
  </ContextMenuTrigger>
  <ContextMenuContent>…</ContextMenuContent>
</ContextMenu>`}
        >
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            {[
              { company: "Empresa Exemplo", meta: "Indústria · 320 pessoas", fit: 92 },
              { company: "Alfa Embalagens", meta: "Indústria · 410 pessoas", fit: 84 },
            ].map((o, i) => (
              <ContextMenu key={o.company}>
                <ContextMenuTrigger render={<div />}>
                  <OpportunityCard {...o} active={i === 0} />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-52">
                  <ContextMenuItem>
                    <MessageCircleIcon />
                    Iniciar conversa
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <PinIcon />
                    Fixar
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <Trash2Icon />
                    Descartar
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"`}
          usageCode={`<ContextMenu>
  <ContextMenuTrigger>Área</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="ContextMenu"
          rows={[{ prop: "onOpenChange", type: "(open: boolean) => void", description: "Chamado ao abrir ou fechar." }]}
        />
        <PropsTable
          component="ContextMenuItem"
          rows={[
            { prop: "variant", type: '"default" | "destructive"', default: '"default"', description: "destructive pinta de vermelho." },
            { prop: "inset", type: "boolean", default: "false", description: "Recuo para alinhar com itens que têm ícone." },
            { prop: "disabled", type: "boolean", default: "false", description: "Item indisponível." },
            { prop: "onClick", type: "() => void", description: "Ação do item." },
          ]}
        />
        <PropsTable
          component="ContextMenuCheckboxItem · ContextMenuRadioGroup"
          rows={[
            { prop: "checked · onCheckedChange", type: "boolean", description: "Estado do item de marcar." },
            { prop: "value · onValueChange", type: "string", description: "Valor do grupo de rádio." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Abre com clique direito, toque longo ou <Kbd>Shift</Kbd>+<Kbd>F10</Kbd> com o foco no gatilho.</>,
            <>Usa <code className="font-mono text-sm">role=&quot;menu&quot;</code>: <Kbd>↑</Kbd> <Kbd>↓</Kbd> navegam, <Kbd>→</Kbd> abre submenus, <Kbd>Esc</Kbd> fecha.</>,
            <>O menu contextual é invisível até ser acionado: toda ação dele precisa existir também em um botão ou menu visível.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
