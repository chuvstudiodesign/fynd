"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Wordmark } from "@/components/brand/wordmark"
import { navigation } from "./navigation"
import { ThemeToggle } from "./theme-toggle"

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed */}
      <aside className="fixed top-0 left-0 flex h-screen w-64 flex-col gap-8 overflow-y-auto border-r border-sidebar-border bg-sidebar p-6 text-sidebar-foreground">
        <Link href="/styleguide" className="flex flex-col gap-2">
          <Wordmark className="h-8 w-auto self-start" />
          <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">
            Design System
          </span>
        </Link>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 font-mono text-[0.6875rem] font-medium tracking-label text-muted-foreground uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        pathname === item.href
                          ? "bg-sidebar-primary font-semibold text-sidebar-primary-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {section.items.length === 0 && (
                  <li className="px-3 py-2 text-sm text-muted-foreground">Em breve</li>
                )}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main content - offset by sidebar width */}
      <main className="ml-64 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
