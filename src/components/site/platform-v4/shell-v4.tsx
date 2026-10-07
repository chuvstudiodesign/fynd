import { Fragment } from "react"
import {
  BellIcon,
  ChevronsUpDownIcon,
  HandshakeIcon,
  MessageSquareTextIcon,
  PlusIcon,
  SearchIcon,
  TargetIcon,
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
import { FUNNEL_V4, PRODUCT, USER_V4 } from "./data-v4"

// Cópia v4 de platform-v3/shell-v3.tsx (02-copy-v4, "Shell v4"): três itens que espelham a demo
// (Seu produto · Fit · Interessados), um produto ativo e nada de "Primeiro contato", "Buscas" ou "Visão geral".
export type PlatformNavV4 = "Seu produto" | "Fit" | "Interessados"

const NAV: { title: PlatformNavV4; icon: typeof TargetIcon; badge?: string }[] = [
  { title: "Seu produto", icon: MessageSquareTextIcon },
  { title: "Fit", icon: TargetIcon, badge: FUNNEL_V4.profile.toLocaleString("pt-BR") },
  { title: "Interessados", icon: HandshakeIcon, badge: String(FUNNEL_V4.interested) },
]

export interface PlatformShellV4Props {
  /** Item ativo da navegação. */
  active: PlatformNavV4
  /** Trilha do topo, do mais geral ao atual. */
  breadcrumb: string[]
  children: React.ReactNode
  className?: string
}

/**
 * App shell estático da fynd v4 (sem SidebarProvider), desenhado para o canvas de 1280×800.
 * Sempre no tema claro: não coloque dentro de um wrapper `.dark`.
 */
export function PlatformShellV4({ active, breadcrumb, children, className }: PlatformShellV4Props) {
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
          <span className="px-2.5 pb-1.5 text-xs font-medium text-muted-foreground">O que você vende</span>
          <span
            data-active
            className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm font-semibold text-sidebar-foreground"
          >
            <span className="size-2 shrink-0 rounded-full bg-navy-600" />
            <span className="truncate">{PRODUCT}</span>
          </span>
          <span className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted-foreground">
            <PlusIcon className="size-3.5 shrink-0" />
            <span className="truncate">Novo produto</span>
          </span>
        </div>

        <div className="mt-auto border-t border-sidebar-border p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
            <CompanyAvatar name={USER_V4.name} />
            <span className="flex min-w-0 flex-1 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{USER_V4.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {USER_V4.role} · {USER_V4.company}
              </span>
            </span>
            <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
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
              <span className="flex-1 truncate pr-4 pl-1.5 text-sm text-muted-foreground">Buscar interessado</span>
            </InputGroup>
            <span
              title="Nova empresa interessada"
              className="relative flex size-9 items-center justify-center rounded-full text-foreground/80"
            >
              <BellIcon className="size-4" strokeWidth={1.75} />
              <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-navy-900 font-mono text-[10px] font-semibold text-paper-50 tabular-nums">
                1
              </span>
              <span className="sr-only">Notificações</span>
            </span>
          </div>
        </header>
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
