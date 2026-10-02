import { Fragment } from "react"
import {
  BellIcon,
  BuildingIcon,
  ChevronsUpDownIcon,
  LayoutDashboardIcon,
  ListIcon,
  MessageCircleIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/brand/wordmark"
import { CompanyAvatar } from "@/components/company-avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { PROFILE, USER } from "./data"

// "Listas salvas" no lugar de "Propostas": a fynd não gera propostas (09-revisao-marca B3).
export type PlatformNav = "Visão geral" | "Oportunidades" | "Conversas" | "Listas salvas"

const NAV: { title: PlatformNav; icon: typeof BuildingIcon; badge?: string }[] = [
  { title: "Visão geral", icon: LayoutDashboardIcon },
  { title: "Oportunidades", icon: BuildingIcon, badge: "12" },
  { title: "Conversas", icon: MessageCircleIcon, badge: "3" },
  { title: "Listas salvas", icon: ListIcon },
]

const PROFILES = [PROFILE, "Cosméticos SP", "Food service Sul"]

export interface PlatformShellProps {
  /** Item ativo da navegação. */
  active: PlatformNav
  /** Trilha do topo, do mais geral ao atual. Ex.: ["Perfis ideais", "Indústria Sudeste"]. */
  breadcrumb: string[]
  /** Perfil ideal destacado na sidebar. Padrão: "Indústria Sudeste". `null` para nenhum. */
  activeProfile?: string | null
  children: React.ReactNode
  className?: string
}

/**
 * App shell estático da fynd (sem SidebarProvider), desenhado para o canvas de 1280×800.
 * Sempre no tema claro: não coloque dentro de um wrapper `.dark`.
 */
export function PlatformShell({ active, breadcrumb, activeProfile = PROFILE, children, className }: PlatformShellProps) {
  return (
    <div
      data-slot="platform-shell"
      className={cn("flex size-full overflow-hidden bg-background font-sans text-foreground antialiased", className)}
    >
      {/* Sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex h-14 items-center px-5">
          <Wordmark className="h-[22px] w-auto text-navy-900" />
        </div>

        <nav className="flex flex-col gap-0.5 px-3 pt-3">
          <span className="px-2.5 pb-1.5 text-xs font-medium text-muted-foreground">Produto</span>
          {NAV.map((item) => {
            const isActive = item.title === active
            return (
              <span
                key={item.title}
                data-active={isActive || undefined}
                className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-sidebar-foreground/85 data-active:bg-sidebar-accent data-active:font-semibold data-active:text-sidebar-accent-foreground"
              >
                <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">{item.badge}</span>
                )}
              </span>
            )
          })}
        </nav>

        <div className="flex flex-col gap-0.5 px-3 pt-6">
          <div className="flex items-center justify-between px-2.5 pb-1.5">
            <span className="text-xs font-medium text-muted-foreground">Perfis ideais</span>
            <span title="Novo perfil" className="flex size-5 items-center justify-center rounded-md text-muted-foreground">
              <PlusIcon className="size-3.5" />
              <span className="sr-only">Novo perfil</span>
            </span>
          </div>
          {PROFILES.map((profile) => {
            const isActive = profile === activeProfile
            return (
              <span
                key={profile}
                data-active={isActive || undefined}
                className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-sidebar-foreground/85 data-active:font-semibold data-active:text-sidebar-foreground"
              >
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    isActive ? "bg-navy-600" : "border border-steel-300"
                  )}
                />
                <span className="truncate">{profile}</span>
              </span>
            )
          })}
        </div>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
            <CompanyAvatar name={USER.name} />
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{USER.name}</span>
              <span className="truncate text-xs text-muted-foreground">{USER.role}</span>
            </span>
            <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
          </div>
        </div>
      </aside>

      {/* Área principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border px-8">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              {breadcrumb.map((item, i) => {
                const last = i === breadcrumb.length - 1
                return (
                  <Fragment key={item}>
                    <BreadcrumbItem>
                      {last ? <BreadcrumbPage>{item}</BreadcrumbPage> : <span>{item}</span>}
                    </BreadcrumbItem>
                    {!last && <BreadcrumbSeparator />}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <InputGroup className="h-9 w-64 bg-card">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <span className="flex-1 truncate pr-4 pl-1.5 text-sm text-muted-foreground">Buscar empresa ou CNPJ</span>
            </InputGroup>
            <span className="relative flex size-9 items-center justify-center rounded-full text-foreground/80">
              <BellIcon className="size-4" strokeWidth={1.75} />
              <span className="sr-only">Notificações</span>
            </span>
          </div>
        </header>
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
