"use client"

import { useEffect, useState } from "react"
import {
  BuildingIcon,
  FileTextIcon,
  MessageCircleIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

function Palette({ onSelect, withShortcuts = true }: { onSelect?: (v: string) => void; withShortcuts?: boolean }) {
  return (
    <>
      <CommandInput placeholder="Busque uma empresa ou ação…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado.</CommandEmpty>
        <CommandGroup heading="Empresas">
          {["Empresa Exemplo", "Alfa Embalagens", "Norte Metais"].map((c) => (
            <CommandItem key={c} onSelect={() => onSelect?.(c)}>
              <BuildingIcon />
              {c}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem onSelect={() => onSelect?.("Nova busca")}>
            <SparklesIcon />
            Nova busca por perfil ideal
            {withShortcuts && <CommandShortcut>⌘N</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => onSelect?.("Iniciar conversa")}>
            <MessageCircleIcon />
            Iniciar conversa
            {withShortcuts && <CommandShortcut>⌘E</CommandShortcut>}
          </CommandItem>
          <CommandItem onSelect={() => onSelect?.("Gerar proposta")}>
            <FileTextIcon />
            Gerar proposta
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Conta">
          <CommandItem onSelect={() => onSelect?.("Perfil")}>
            <UserIcon />
            Perfil
            {withShortcuts && <CommandShortcut>⌘P</CommandShortcut>}
          </CommandItem>
          <CommandItem disabled>
            <SettingsIcon />
            Configurações (em breve)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

export default function CommandPage() {
  const [shortcuts, setShortcuts] = useState(true)
  const [last, setLast] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Command"
        description="Busca e ações pelo teclado. Uma lista filtrada ao digitar — ideal para a paleta ⌘K que leva a pessoa direto a uma empresa ou ação."
        source="src/components/ui/command.tsx"
      />

      <DocSection title="Playground" description="Digite para filtrar. Use as setas e Enter para escolher.">
        <Playground
          controls={<ControlToggle label="atalhos" checked={shortcuts} onChange={setShortcuts} />}
          preview={
            <div className="flex w-full max-w-md flex-col items-center gap-3">
              <Command className="rounded-xl border shadow-md">
                <Palette onSelect={setLast} withShortcuts={shortcuts} />
              </Command>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {last ? `selecionado: ${last}` : "nada selecionado"}
              </span>
            </div>
          }
          code={`<Command className="rounded-xl border shadow-md">
  <CommandInput placeholder="Busque uma empresa ou ação…" />
  <CommandList>
    <CommandEmpty>Nenhum resultado.</CommandEmpty>
    <CommandGroup heading="Empresas">
      <CommandItem onSelect={…}><BuildingIcon />Empresa Exemplo</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Ações">
      <CommandItem>
        <SparklesIcon />
        Nova busca por perfil ideal${shortcuts ? "\n        <CommandShortcut>⌘N</CommandShortcut>" : ""}
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Paleta ⌘K"
            description="CommandDialog abre a paleta em um modal. Aperte ⌘K (ou Ctrl+K) nesta página."
            code={`const [open, setOpen] = useState(false)

useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKey)
  return () => document.removeEventListener("keydown", onKey)
}, [])

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command>…</Command>
</CommandDialog>`}
          >
            <Button variant="outline" onClick={() => setOpen(true)} className="w-72 justify-between text-muted-foreground">
              <span className="flex items-center gap-2">
                <SearchIcon />
                Buscar…
              </span>
              <kbd className="rounded border bg-muted px-1.5 font-mono text-[0.6875rem]">⌘K</kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command>
                <Palette
                  onSelect={(v) => {
                    setLast(v)
                    setOpen(false)
                  }}
                />
              </Command>
            </CommandDialog>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"`}
          usageCode={`<Command>
  <CommandInput placeholder="Buscar…" />
  <CommandList>
    <CommandEmpty>Nenhum resultado.</CommandEmpty>
    <CommandGroup heading="Sugestões">
      <CommandItem>Nova busca</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        />
      </DocSection>

      <DocSection title="Props" description="Command usa o cmdk. As props principais:">
        <PropsTable
          component="Command"
          rows={[
            { prop: "value · onValueChange", type: "string", description: "Item destacado (controlado)." },
            { prop: "shouldFilter", type: "boolean", default: "true", description: "false para filtrar por conta própria (busca no servidor)." },
            { prop: "filter", type: "(value, search) => number", description: "Função de relevância customizada." },
            { prop: "loop", type: "boolean", default: "false", description: "As setas voltam ao início/fim." },
          ]}
        />
        <PropsTable
          component="CommandItem"
          rows={[
            { prop: "onSelect", type: "(value: string) => void", description: "Chamado com Enter ou clique." },
            { prop: "value", type: "string", description: "Texto usado na busca (padrão: o conteúdo)." },
            { prop: "keywords", type: "string[]", description: "Termos extras para encontrar o item." },
            { prop: "disabled", type: "boolean", default: "false", description: "Não pode ser escolhido." },
          ]}
        />
        <PropsTable
          component="CommandDialog"
          rows={[
            { prop: "open · onOpenChange", type: "boolean", description: "Estado do modal." },
            { prop: "title · description", type: "string", default: '"Paleta de comandos"', description: "Texto oculto para leitores de tela." },
            { prop: "showCloseButton", type: "boolean", default: "false", description: "Mostra o X de fechar." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>A lista é um <code className="font-mono text-sm">listbox</code>; o campo aponta para o item ativo com <code className="font-mono text-sm">aria-activedescendant</code>.</>,
            <><Kbd>↑</Kbd> <Kbd>↓</Kbd> navegam, <Kbd>Enter</Kbd> executa, <Kbd>Esc</Kbd> fecha o diálogo.</>,
            <>CommandDialog tem título e descrição ocultos (“Paleta de comandos”) para contexto no leitor de tela.</>,
            <>Mostre o atalho (⌘K) em algum lugar visível para que ele seja descoberto.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
