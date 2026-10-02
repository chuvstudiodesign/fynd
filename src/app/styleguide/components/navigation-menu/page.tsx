"use client"

import { useState } from "react"
import { BuildingIcon, FileTextIcon, MessageCircleIcon, SparklesIcon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Wordmark } from "@/components/brand/wordmark"
import { Button } from "@/components/ui/button"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const aligns = ["start", "center", "end"] as const

const produto = [
  { icon: SparklesIcon, title: "Perfil ideal", desc: "Descreva seu cliente em uma conversa." },
  { icon: BuildingIcon, title: "Oportunidades", desc: "Empresas priorizadas por aderência." },
  { icon: MessageCircleIcon, title: "Primeiro contato", desc: "Contexto para iniciar a conversa." },
]
const recursos = [
  { title: "Como funciona", desc: "Do perfil à lista priorizada." },
  { title: "Fontes de dados", desc: "Receita Federal e base própria." },
  { title: "Casos de uso", desc: "Times B2B que geram pipeline." },
  { title: "Central de ajuda", desc: "Guias e perguntas frequentes." },
]

function SiteNav({ align }: { align: (typeof aligns)[number] }) {
  return (
    <NavigationMenu align={align}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Produto</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[26rem] gap-1 p-2">
              {produto.map((p) => (
                <li key={p.title}>
                  <NavigationMenuLink href="#" className="items-start gap-3 p-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <p.icon className="size-4" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-muted-foreground">{p.desc}</span>
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[34rem] grid-cols-[12rem_1fr] gap-2 p-2">
              <NavigationMenuLink
                href="#"
                className="flex-col items-start justify-end gap-1 rounded-lg bg-navy-900 p-4 text-paper-50 hover:bg-navy-800 focus:bg-navy-800"
              >
                <FileTextIcon className="size-5 text-signal-400" />
                <span className="font-heading text-lg font-light">Manifesto</span>
                <span className="text-xs text-steel-300">Ilumine as oportunidades certas.</span>
              </NavigationMenuLink>
              <ul className="grid gap-1">
                {recursos.map((r) => (
                  <li key={r.title}>
                    <NavigationMenuLink href="#" className="flex-col items-start gap-0.5">
                      <span className="font-semibold">{r.title}</span>
                      <span className="text-muted-foreground">{r.desc}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Preços
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default function NavigationMenuPage() {
  const [align, setAlign] = useState<(typeof aligns)[number]>("start")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Navigation Menu"
        description="Navegação principal do site com painéis que se abrem ao passar o mouse ou clicar. É a barra do topo do site da fynd."
        source="src/components/ui/navigation-menu.tsx"
      />

      <DocSection title="Playground" description="Passe o mouse em Produto e Recursos. O painel anima de um para o outro.">
        <Playground
          controls={<ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />}
          previewClassName="block min-h-96 p-0"
          preview={
            <header className="flex items-center justify-between gap-6 border-b bg-background px-6 py-3">
              <Wordmark className="h-6 w-auto" />
              <SiteNav align={align} />
              <Button size="sm" variant="signal">
                Encontre o próximo sinal
              </Button>
            </header>
          }
          code={`<NavigationMenu${align !== "start" ? ` align="${align}"` : ""}>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produto</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[26rem] gap-1 p-2">
          <li><NavigationMenuLink href="/perfil-ideal">…</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/precos" className={navigationMenuTriggerStyle()}>Preços</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        />
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"`}
          usageCode={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produto</NavigationMenuTrigger>
      <NavigationMenuContent>…links…</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        />
        <p className="text-sm text-muted-foreground">
          Com o Next.js, use <code className="font-mono">{'render={<Link href="…" />}'}</code> no NavigationMenuLink para navegação no cliente.
        </p>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="NavigationMenu"
          rows={[
            { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento do painel em relação ao gatilho." },
            { prop: "value · onValueChange", type: "string", description: "Item aberto (controlado)." },
            { prop: "delay · closeDelay", type: "number", description: "Espera (ms) para abrir e fechar no hover." },
          ]}
        />
        <PropsTable
          component="NavigationMenuLink"
          rows={[
            { prop: "href", type: "string", description: "Destino." },
            { prop: "active", type: "boolean", description: "Marca a página atual (aria-current)." },
            { prop: "render", type: "ReactElement", description: "Renderiza como <Link /> do Next.js." },
          ]}
        />
        <PropsTable
          component="navigationMenuTriggerStyle()"
          rows={[{ prop: "retorno", type: "string", description: "Classes para um link de topo com a mesma aparência de um gatilho." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Renderiza <code className="font-mono text-sm">nav</code>; gatilhos têm <code className="font-mono text-sm">aria-expanded</code> e controlam o painel.</>,
            <><Kbd>Tab</Kbd> percorre os itens de topo; <Kbd>Enter</Kbd>/<Kbd>Espaço</Kbd> ou <Kbd>↓</Kbd> abrem o painel; <Kbd>Esc</Kbd> fecha e devolve o foco.</>,
            <>Marque a página atual com <code className="font-mono text-sm">active</code> no link.</>,
            <>No mobile, troque por um Drawer com a mesma lista de links.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
