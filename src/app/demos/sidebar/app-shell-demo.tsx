"use client"

import { useEffect, useState } from "react"
import {
  BellIcon,
  BuildingIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MessageCircleIcon,
  PlusIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Wordmark } from "@/components/brand/wordmark"
import { FChama } from "@/components/brand/f-chama"
import { CompanyAvatar } from "@/components/company-avatar"
import { OpportunityCard } from "@/components/opportunity-card"

const nav = [
  { title: "Visão geral", icon: LayoutDashboardIcon },
  { title: "Oportunidades", icon: BuildingIcon, badge: "12" },
  { title: "Conversas", icon: MessageCircleIcon, badge: "3" },
  { title: "Propostas", icon: FileTextIcon },
]
const perfis = ["Indústria Sudeste", "Serviços B2B", "Logística Sul"]
const lista = [
  { company: "Empresa Exemplo", meta: "Indústria · 320 pessoas", fit: 92 },
  { company: "Alfa Embalagens", meta: "Indústria · 410 pessoas", fit: 84 },
  { company: "Norte Metais", meta: "Indústria · 260 pessoas", fit: 77 },
  { company: "Vale Plásticos", meta: "Indústria · 230 pessoas", fit: 71 },
  { company: "Rio Componentes", meta: "Indústria · 480 pessoas", fit: 64 },
]

export function AppShellDemo({
  variant,
  collapsible,
  side,
  dark,
}: {
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  side: "left" | "right"
  dark: boolean
}) {
  const [active, setActive] = useState("Oportunidades")
  const [selected, setSelected] = useState(0)

  // O tema da demo acompanha o styleguide (passado pela URL do iframe)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <SidebarProvider className={collapsible === "none" ? "h-svh" : undefined}>
      <Sidebar variant={variant} collapsible={collapsible} side={side}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="fynd">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-paper-50 dark:bg-paper-50 dark:text-navy-900">
                  <FChama className="h-4.5! w-auto!" aria-hidden="true" />
                </span>
                <Wordmark className="h-5! w-auto!" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Produto</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active === item.title}
                      tooltip={item.title}
                      onClick={() => setActive(item.title)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Perfis ideais</SidebarGroupLabel>
            <SidebarGroupAction title="Novo perfil">
              <PlusIcon />
              <span className="sr-only">Novo perfil</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {perfis.map((p, i) => (
                  <SidebarMenuItem key={p}>
                    <SidebarMenuButton tooltip={p} size="sm">
                      <SparklesIcon className={i === 0 ? "text-signal" : undefined} />
                      <span>{p}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger render={<SidebarMenuButton size="lg" tooltip="Conta" />}>
                  <CompanyAvatar name="Mariana Pillati" />
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate font-semibold">Mariana Pillati</span>
                    <span className="truncate text-xs text-muted-foreground">Diretora comercial</span>
                  </span>
                  <ChevronsUpDownIcon className="ml-auto" />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>mariana@empresa.com.br</DropdownMenuLabel>
                  </DropdownMenuGroup>
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
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        {collapsible !== "none" && <SidebarRail />}
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Indústria Sudeste</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{active}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <button
            type="button"
            aria-label="Notificações"
            className="ml-auto flex size-9 items-center justify-center rounded-full hover:bg-muted"
          >
            <BellIcon className="size-4" />
          </button>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs tracking-label text-muted-foreground uppercase">Oportunidades da semana</span>
            <h1 className="text-3xl">Encontre o próximo sinal.</h1>
          </div>
          <div className="flex max-w-2xl flex-col gap-3">
            {lista.map((o, i) => (
              <OpportunityCard key={o.company} {...o} active={i === selected} onClick={() => setSelected(i)} />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
