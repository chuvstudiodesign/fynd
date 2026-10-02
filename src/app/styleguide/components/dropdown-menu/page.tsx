"use client"

import { useState } from "react"
import {
  ChevronDownIcon,
  CopyIcon,
  LogOutIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  Trash2Icon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CompanyAvatar } from "@/components/company-avatar"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sides = ["bottom", "top", "left", "right"] as const
const aligns = ["start", "center", "end"] as const

export default function DropdownMenuPage() {
  const [side, setSide] = useState<(typeof sides)[number]>("bottom")
  const [align, setAlign] = useState<(typeof aligns)[number]>("start")
  const [icons, setIcons] = useState(true)
  const [last, setLast] = useState<string | null>(null)

  const [cols, setCols] = useState({ setor: true, porte: true, regiao: false })
  const [order, setOrder] = useState("aderencia")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Dropdown Menu"
        description="Lista de ações ou opções que abre a partir de um botão. Mantém a interface limpa escondendo ações secundárias até serem necessárias."
        source="src/components/ui/dropdown-menu.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="side" value={side} options={sides} onChange={setSide} />
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
              <ControlToggle label="ícones" checked={icons} onChange={setIcons} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" />}>
                  Ações
                  <ChevronDownIcon data-icon="inline-end" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side={side} align={align} className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Empresa Exemplo</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setLast("Iniciar conversa")}>
                      {icons && <MessageCircleIcon />}
                      Iniciar conversa
                      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLast("Copiar CNPJ")}>
                      {icons && <CopyIcon />}
                      Copiar CNPJ
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        {icons && <UserPlusIcon />}
                        Atribuir a
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {["Mariana", "Lucas", "Time comercial"].map((p) => (
                          <DropdownMenuItem key={p} onClick={() => setLast(`Atribuído a ${p}`)}>
                            {p}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    {icons && <SettingsIcon />}
                    Editar critérios (em breve)
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => setLast("Descartada")}>
                    {icons && <Trash2Icon />}
                    Descartar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {last ?? "—"}
              </span>
            </div>
          }
          code={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Ações <ChevronDownIcon data-icon="inline-end" />
  </DropdownMenuTrigger>
  <DropdownMenuContent side="${side}" align="${align}">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Empresa Exemplo</DropdownMenuLabel>
      <DropdownMenuItem>${icons ? "<MessageCircleIcon />" : ""}Iniciar conversa</DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Atribuir a</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>…</DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">${icons ? "<Trash2Icon />" : ""}Descartar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-3">
          <Example
            title="Checkbox e rádio"
            description="Preferências de visualização."
            code={`<DropdownMenuCheckboxItem checked={cols.setor} onCheckedChange={…}>Setor</DropdownMenuCheckboxItem>
<DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
  <DropdownMenuRadioItem value="aderencia">Aderência</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>Visualização</DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Colunas</DropdownMenuLabel>
                  {(Object.keys(cols) as (keyof typeof cols)[]).map((k) => (
                    <DropdownMenuCheckboxItem key={k} checked={cols[k]} onCheckedChange={(v) => setCols((c) => ({ ...c, [k]: !!v }))}>
                      {k === "setor" ? "Setor" : k === "porte" ? "Porte" : "Região"}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
                    <DropdownMenuRadioItem value="aderencia">Aderência</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="porte">Porte</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Example>

          <Example
            title="Menu de linha"
            description="Botão de ícone com rótulo acessível."
            code={`<DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Ações para Empresa Exemplo" />}>
  <MoreHorizontalIcon />
</DropdownMenuTrigger>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Ações para Empresa Exemplo" />}>
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver contexto</DropdownMenuItem>
                <DropdownMenuItem>Iniciar conversa</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Descartar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Example>

          <Example
            title="Menu de conta"
            description="Avatar como gatilho."
            code={`<DropdownMenuTrigger render={<button aria-label="Conta" />}>
  <CompanyAvatar name="Mariana Pillati" />
</DropdownMenuTrigger>`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger render={<button type="button" aria-label="Conta" className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50" />}>
                <CompanyAvatar name="Mariana Pillati" size="lg" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">Mariana Pillati</span>
                    <span className="font-normal">mariana@empresa.com.br</span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`}
          usageCode={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Abrir</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Ação</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="DropdownMenuContent"
          rows={[
            { prop: "side", type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: "Lado em que o menu abre." },
            { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento em relação ao gatilho." },
            { prop: "sideOffset · alignOffset", type: "number", description: "Deslocamentos em px." },
          ]}
        />
        <PropsTable
          component="DropdownMenuItem"
          rows={[
            { prop: "variant", type: '"default" | "destructive"', default: '"default"', description: "destructive pinta de vermelho." },
            { prop: "inset", type: "boolean", default: "false", description: "Recuo para alinhar com itens com ícone." },
            { prop: "disabled", type: "boolean", default: "false", description: "Item indisponível." },
            { prop: "onClick", type: "() => void", description: "Ação do item (fecha o menu)." },
          ]}
        />
        <PropsTable
          component="DropdownMenuCheckboxItem · DropdownMenuRadioGroup"
          rows={[
            { prop: "checked · onCheckedChange", type: "boolean", description: "Estado do item de marcar." },
            { prop: "value · onValueChange", type: "string", description: "Valor do grupo de rádio." },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          No Base UI, <code className="font-mono">DropdownMenuLabel</code> precisa estar dentro de um{" "}
          <code className="font-mono">DropdownMenuGroup</code>.
        </p>
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Gatilho com <code className="font-mono text-sm">aria-haspopup=&quot;menu&quot;</code> e <code className="font-mono text-sm">aria-expanded</code>; o menu tem <code className="font-mono text-sm">role=&quot;menu&quot;</code>.</>,
            <><Kbd>Enter</Kbd>, <Kbd>Espaço</Kbd> ou <Kbd>↓</Kbd> abrem; <Kbd>↑</Kbd> <Kbd>↓</Kbd> navegam; <Kbd>→</Kbd> abre submenu; <Kbd>Esc</Kbd> fecha e devolve o foco.</>,
            <>Digitar a primeira letra pula para o item correspondente.</>,
            <>Gatilhos só com ícone precisam de <code className="font-mono text-sm">aria-label</code> específico (“Ações para Empresa Exemplo”).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
