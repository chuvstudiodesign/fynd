import { Fragment } from "react"
import {
  BellIcon,
  BuildingIcon,
  ChevronsUpDownIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
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
import { FUNNEL, SEARCH, SEARCHES, USER_V3 } from "./data-v3"

// Cópia v3 de platform/shell.tsx: "Produto" passa a contar o funil e "Perfis ideais" vira "Buscas"
// (02-copy-v3, "Elementos comuns"). "Listas salvas" sai porque contradiz "não é mailing".
export type PlatformNavV3 = "Visão geral" | "Interessados" | "Primeiro contato" | "Empresas com fit"

const NAV: { title: PlatformNavV3; icon: typeof BuildingIcon; badge?: string }[] = [
  { title: "Visão geral", icon: LayoutDashboardIcon },
  { title: "Interessados", icon: HandshakeIcon, badge: String(FUNNEL.interested) },
  { title: "Primeiro contato", icon: SendIcon, badge: String(FUNNEL.contacted) },
  { title: "Empresas com fit", icon: BuildingIcon, badge: String(FUNNEL.fit) },
]

export interface PlatformShellV3Props {
  /** Item ativo da navegação. `null` para nenhum (a conversa de nova busca). */
  active: PlatformNavV3 | null
  /** Trilha do topo, do mais geral ao atual. Ex.: ["Buscas", "Embalagens flexíveis"]. */
  breadcrumb: string[]
  /** Busca destacada na sidebar. Padrão: "Embalagens flexíveis". `null` para nenhuma. */
  activeSearch?: string | null
  children: React.ReactNode
  className?: string
}

/**
 * App shell estático da fynd v3 (sem SidebarProvider), desenhado para o canvas de 1280×800.
 * Sempre no tema claro: não coloque dentro de um wrapper `.dark`.
 */
export function PlatformShellV3({ active, breadcrumb, activeSearch = SEARCH, children, className }: PlatformShellV3Props) {
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
            <span className="text-xs font-medium text-muted-foreground">Buscas</span>
            <span title="Nova busca" className="flex size-5 items-center justify-center rounded-md text-muted-foreground">
              <PlusIcon className="size-3.5" />
              <span className="sr-only">Nova busca</span>
            </span>
          </div>
          {SEARCHES.map((search) => {
            const isActive = search === activeSearch
            return (
              <span
                key={search}
                data-active={isActive || undefined}
                className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-sidebar-foreground/85 data-active:font-semibold data-active:text-sidebar-foreground"
              >
                <span
                  className={cn("size-2 shrink-0 rounded-full", isActive ? "bg-navy-600" : "border border-steel-300")}
                />
                <span className="truncate">{search}</span>
              </span>
            )
          })}
        </div>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
            <CompanyAvatar name={USER_V3.name} />
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{USER_V3.name}</span>
              <span className="truncate text-xs text-muted-foreground">{USER_V3.role}</span>
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
