"use client"

import { useState } from "react"
import { ExternalLinkIcon } from "lucide-react"
import { ControlSegment } from "../../_kit/controls"
import { CodeBlock } from "../../_kit/code-block"
import { useIsDark } from "../../_kit/use-is-dark"
import { A11yNotes, DocSection, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["sidebar", "floating", "inset"] as const
const collapsibles = ["icon", "offcanvas", "none"] as const
const sides = ["left", "right"] as const

export default function SidebarPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("sidebar")
  const [collapsible, setCollapsible] = useState<(typeof collapsibles)[number]>("icon")
  const [side, setSide] = useState<(typeof sides)[number]>("left")
  const dark = useIsDark()

  const src = `/demos/sidebar?variant=${variant}&collapsible=${collapsible}&side=${side}&theme=${dark ? "dark" : "light"}`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Sidebar"
        description="Estrutura do aplicativo: navegação lateral recolhível, grupos, badges, conta e área de conteúdo. A demonstração abaixo é a tela de oportunidades da fynd, baseada no conceito de interface do Figma."
        source="src/components/ui/sidebar.tsx"
      />

      <DocSection
        title="Playground"
        description="A demo roda em uma página própria (/demos/sidebar), porque a sidebar ocupa a tela inteira. Use o botão do cabeçalho ou ⌘B para recolher."
      >
        <div className="overflow-hidden rounded-xl border">
          <div className="flex flex-wrap items-end gap-6 border-b bg-background px-6 py-4">
            <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
            <ControlSegment label="collapsible" value={collapsible} options={collapsibles} onChange={setCollapsible} />
            <ControlSegment label="side" value={side} options={sides} onChange={setSide} />
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:underline dark:text-navy-200"
            >
              Abrir em tela cheia
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>
          <iframe key={src} src={src} title="Demonstração da Sidebar da fynd" className="h-[40rem] w-full bg-background" />
          <CodeBlock
            className="border-t [&_pre]:rounded-none"
            code={`<SidebarProvider>
  <Sidebar variant="${variant}" collapsible="${collapsible}"${side !== "left" ? ` side="${side}"` : ""}>
    <SidebarHeader>…marca…</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Produto</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Oportunidades">
                <BuildingIcon /><span>Oportunidades</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>12</SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>…conta…</SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <header><SidebarTrigger /> …</header>
    …conteúdo…
  </SidebarInset>
</SidebarProvider>`}
          />
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"`}
          usageCode={`// app/(app)/layout.tsx
export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="SidebarProvider"
          rows={[
            { prop: "defaultOpen", type: "boolean", default: "true", description: "Estado inicial (é salvo em cookie: sidebar_state)." },
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
          ]}
        />
        <PropsTable
          component="Sidebar"
          rows={[
            { prop: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "Colada à borda, flutuante com cantos, ou com o conteúdo como cartão." },
            { prop: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "Some por completo, vira trilho de ícones, ou é fixa." },
            { prop: "side", type: '"left" | "right"', default: '"left"', description: "Lado da tela." },
          ]}
        />
        <PropsTable
          component="SidebarMenuButton"
          rows={[
            { prop: "isActive", type: "boolean", default: "false", description: "Página atual." },
            { prop: "tooltip", type: "string | TooltipContent props", description: "Mostrado quando a sidebar está recolhida em ícones." },
            { prop: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Altura do item." },
            { prop: "render", type: "ReactElement", description: 'Use render={<Link href="…" />} para navegação.' },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Hook: <code className="font-mono">useSidebar()</code> expõe <code className="font-mono">state</code>, <code className="font-mono">open</code>,{" "}
          <code className="font-mono">toggleSidebar()</code> e <code className="font-mono">isMobile</code>. No mobile, a sidebar vira um Sheet.
        </p>
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O SidebarTrigger tem rótulo “Alternar barra lateral”; <Kbd>⌘</Kbd>+<Kbd>B</Kbd> (ou Ctrl+B) alterna.</>,
            <>Recolhida em ícones, cada item mostra o nome em tooltip — passe sempre a prop <code className="font-mono text-sm">tooltip</code>.</>,
            <>Marque a página atual com <code className="font-mono text-sm">isActive</code> e, em links, <code className="font-mono text-sm">aria-current=&quot;page&quot;</code>.</>,
            <>No mobile, vira um diálogo (Sheet) com título oculto “Barra lateral”.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
