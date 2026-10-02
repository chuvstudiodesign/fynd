"use client"

import { useState } from "react"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function MenubarPage() {
  const [shortcuts, setShortcuts] = useState(true)
  const [compact, setCompact] = useState(false)
  const [signals, setSignals] = useState(true)
  const [context, setContext] = useState(true)
  const [order, setOrder] = useState("aderencia")
  const [last, setLast] = useState<string | null>(null)

  const act = (label: string) => () => setLast(label)
  const sc = (keys: string) => (shortcuts ? <MenubarShortcut>{keys}</MenubarShortcut> : null)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Menubar"
        description="Barra de menus persistente, como a de aplicativos de desktop. Útil para ferramentas densas — o editor de propostas ou a área de análise — onde há muitas ações organizadas por categoria."
        source="src/components/ui/menubar.tsx"
      />

      <DocSection title="Playground" description="Abra um menu e use ← → para passar aos vizinhos.">
        <Playground
          controls={
            <>
              <ControlToggle label="atalhos" checked={shortcuts} onChange={setShortcuts} />
              <ControlToggle label="denso" checked={compact} onChange={setCompact} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <Menubar className={compact ? "h-8" : undefined}>
                <MenubarMenu>
                  <MenubarTrigger>Arquivo</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={act("Nova busca")}>
                      Nova busca {sc("⌘N")}
                    </MenubarItem>
                    <MenubarItem onClick={act("Importar lista")}>
                      Importar lista… {sc("⌘I")}
                    </MenubarItem>
                    <MenubarSub>
                      <MenubarSubTrigger>Exportar</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={act("Exportar CSV")}>CSV</MenubarItem>
                        <MenubarItem onClick={act("Exportar PDF")}>PDF</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem onClick={act("Imprimir")}>
                      Imprimir {sc("⌘P")}
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Editar</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={act("Desfazer")}>
                      Desfazer {sc("⌘Z")}
                    </MenubarItem>
                    <MenubarItem onClick={act("Refazer")}>
                      Refazer {sc("⇧⌘Z")}
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={act("Editar perfil ideal")}>Editar perfil ideal…</MenubarItem>
                    <MenubarItem variant="destructive" onClick={act("Limpar filtros")}>
                      Limpar filtros
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Exibir</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem checked={signals} onCheckedChange={setSignals}>
                      Destacar sinais
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem checked={context} onCheckedChange={setContext}>
                      Painel de contexto
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarGroup>
                      <MenubarLabel>Ordenar por</MenubarLabel>
                      <MenubarRadioGroup value={order} onValueChange={setOrder}>
                        <MenubarRadioItem value="aderencia">Aderência</MenubarRadioItem>
                        <MenubarRadioItem value="porte">Porte</MenubarRadioItem>
                        <MenubarRadioItem value="recentes">Mais recentes</MenubarRadioItem>
                      </MenubarRadioGroup>
                    </MenubarGroup>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Ajuda</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={act("Atalhos")}>
                      Atalhos de teclado {sc("?")}
                    </MenubarItem>
                    <MenubarItem onClick={act("Falar com suporte")}>Falar com o suporte</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {last ?? "—"} · sinais: {signals ? "on" : "off"} · contexto: {context ? "on" : "off"} · ordem: {order}
              </span>
            </div>
          }
          code={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Nova busca${shortcuts ? " <MenubarShortcut>⌘N</MenubarShortcut>" : ""}</MenubarItem>
      <MenubarSub>
        <MenubarSubTrigger>Exportar</MenubarSubTrigger>
        <MenubarSubContent>…</MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Exibir</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked={signals} onCheckedChange={setSignals}>Destacar sinais</MenubarCheckboxItem>
      <MenubarGroup>
        <MenubarLabel>Ordenar por</MenubarLabel>
        <MenubarRadioGroup value={order} onValueChange={setOrder}>…</MenubarRadioGroup>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"`}
          usageCode={`<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
        />
      </DocSection>

      <DocSection title="Props" description="Os itens seguem a mesma API do Dropdown Menu.">
        <PropsTable
          component="MenubarContent"
          rows={[
            { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento sob o gatilho." },
            { prop: "sideOffset · alignOffset", type: "number", default: "8 · -4", description: "Deslocamentos em px." },
          ]}
        />
        <PropsTable
          component="MenubarItem"
          rows={[
            { prop: "variant", type: '"default" | "destructive"', default: '"default"', description: "destructive pinta de vermelho." },
            { prop: "inset", type: "boolean", default: "false", description: "Recuo para alinhar com itens com ícone." },
            { prop: "disabled", type: "boolean", default: "false", description: "Item indisponível." },
          ]}
        />
        <PropsTable
          component="MenubarCheckboxItem · MenubarRadioGroup · MenubarRadioItem"
          rows={[
            { prop: "checked · onCheckedChange", type: "boolean", description: "Estado do item de marcar." },
            { prop: "value · onValueChange", type: "string", description: "Valor do grupo de rádio." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">role=&quot;menubar&quot;</code> com gatilhos <code className="font-mono text-sm">menuitem</code>. Só o gatilho ativo está na ordem do <Kbd>Tab</Kbd>.</>,
            <><Kbd>←</Kbd> <Kbd>→</Kbd> passam de um menu para outro (com o menu aberto, abre o vizinho); <Kbd>↓</Kbd> entra no menu; <Kbd>Esc</Kbd> fecha.</>,
            <>Atalhos exibidos precisam funcionar de verdade — registre-os no app, o MenubarShortcut é só visual.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
