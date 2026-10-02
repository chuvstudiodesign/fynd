import type { Metadata } from "next"
import { AppShellDemo } from "./app-shell-demo"

export const metadata: Metadata = { title: "Sidebar · demo" }

// Demo isolada (sem o layout do styleguide), exibida em iframe na página do Sidebar
export default async function SidebarDemoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const pick = <T extends string>(v: unknown, opts: readonly T[], d: T): T => (opts.includes(v as T) ? (v as T) : d)
  return (
    <AppShellDemo
      variant={pick(sp.variant, ["sidebar", "floating", "inset"] as const, "sidebar")}
      collapsible={pick(sp.collapsible, ["offcanvas", "icon", "none"] as const, "icon")}
      side={pick(sp.side, ["left", "right"] as const, "left")}
      dark={sp.theme === "dark"}
    />
  )
}
