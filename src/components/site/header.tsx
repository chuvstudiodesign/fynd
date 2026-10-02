"use client"

import { useEffect, useRef, useState } from "react"
import { motion, stagger, useReducedMotion } from "motion/react"
import { Wordmark } from "@/components/brand/wordmark"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SiteContainer } from "@/components/site/sections/site-container"
import { ANCHORS, CTA_LABEL, NAV_LINKS } from "@/components/site/sections/anchors"
import { EASE_OUT } from "@/components/site/motion/gsap"

type Theme = "dark" | "light"

/** Linha de leitura do tema: o meio da faixa de 64px do header. */
const PROBE_Y = 32

function readState() {
  const sections = document.querySelectorAll<HTMLElement>("[data-theme]")
  let theme: Theme = "dark"
  for (const s of sections) {
    const r = s.getBoundingClientRect()
    if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
      theme = s.dataset.theme === "light" ? "light" : "dark"
      break
    }
  }

  const center = window.innerHeight / 2
  let active: string | null = null
  for (const { id } of NAV_LINKS) {
    const el = document.getElementById(id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= center && r.bottom > center) active = id
  }

  const access = document.getElementById(ANCHORS.access)
  let accessInView = false
  if (access) {
    const r = access.getBoundingClientRect()
    accessInView = r.top < window.innerHeight * 0.6 && r.bottom > PROBE_Y * 2
  }

  return { theme, active, accessInView, scrolled: window.scrollY > 8 }
}

export function SiteHeader() {
  const [state, setState] = useState({ theme: "dark" as Theme, active: null as string | null, accessInView: false, scrolled: false })
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingHash = useRef<string | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const next = readState()
      setState((prev) =>
        prev.theme === next.theme && prev.active === next.active && prev.accessInView === next.accessInView && prev.scrolled === next.scrolled
          ? prev
          : next
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const { theme, active, accessInView, scrolled } = state

  return (
    <>
      <a
        href="#conteudo"
        className={cn(
          buttonVariants({ variant: "default" }),
          "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-5 focus:z-[60]"
        )}
      >
        Pular para o conteúdo
      </a>
      <header
        data-scrolled={scrolled || undefined}
        className={cn(
          "group/header fixed inset-x-0 top-0 z-50 h-16 text-foreground transition-colors duration-200 motion-reduce:transition-none",
          theme === "dark" && "dark"
        )}
      >
        {/* Camada de vidro: só a opacidade anima, o blur é fixo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-border bg-background/80 opacity-0 backdrop-blur-md transition-[opacity,background-color,border-color] duration-300 ease-out group-data-scrolled/header:opacity-100 motion-reduce:transition-none"
        />
        <SiteContainer className="relative flex h-full items-center justify-between gap-6">
          <a href={`#${ANCHORS.top}`} aria-label="fynd, voltar ao início" className="inline-flex min-h-10 items-center rounded-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Wordmark aria-hidden="true" className="h-6 w-auto" />
          </a>

          <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative rounded-sm py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                        "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 motion-reduce:after:transition-none",
                        isActive && "text-foreground after:scale-x-100"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <motion.a
              href={`#${ANCHORS.access}`}
              whileHover={{ scale: 1.02 }} // o MotionConfig (reducedMotion="user") já anula o scale; condicionar aqui gerava tabIndex diferente na hidratação
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              aria-hidden={accessInView || undefined}
              tabIndex={accessInView ? -1 : undefined}
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "hidden transition-[opacity,background-color,color] duration-200 sm:inline-flex max-md:h-10 max-md:px-4",
                accessInView && "pointer-events-none opacity-0"
              )}
            >
              {CTA_LABEL}
            </motion.a>

            <Sheet
              open={menuOpen}
              onOpenChange={setMenuOpen}
              onOpenChangeComplete={(open) => {
                if (open || !pendingHash.current) return
                const target = document.getElementById(pendingHash.current)
                pendingHash.current = null
                target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
              }}
            >
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu" />}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                  <path d="M4 9h16M4 15h16" />
                </svg>
              </SheetTrigger>
              <SheetContent
                side="top"
                showCloseButton={false}
                className="dark h-dvh gap-0 data-[side=top]:h-dvh border-0 bg-navy-900 text-foreground shadow-lg"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SiteContainer className="flex h-16 shrink-0 items-center justify-between">
                  <a
                    href={`#${ANCHORS.top}`}
                    aria-label="fynd, voltar ao início"
                    onClick={(e) => {
                      e.preventDefault()
                      pendingHash.current = ANCHORS.top
                      setMenuOpen(false)
                    }}
                    className="inline-flex min-h-10 items-center rounded-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Wordmark aria-hidden="true" className="h-6 w-auto" />
                  </a>
                  <SheetClose render={<Button variant="ghost" size="icon" aria-label="Fechar menu" />}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </SheetClose>
                </SiteContainer>
                <SiteContainer className="flex flex-1 flex-col justify-between pt-24 pb-10">
                  <motion.ul
                    className="flex flex-col gap-6"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { delayChildren: stagger(0.05, { startDelay: 0.1 }) } } }}
                  >
                    {NAV_LINKS.map((link) => (
                      <motion.li
                        key={link.id}
                        variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } } }}
                      >
                        <a
                          href={`#${link.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            pendingHash.current = link.id
                            setMenuOpen(false)
                          }}
                          className="rounded-sm font-heading text-3xl leading-[1.1] font-light tracking-display text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <a
                    href={`#${ANCHORS.access}`}
                    onClick={(e) => {
                      e.preventDefault()
                      pendingHash.current = ANCHORS.access
                      setMenuOpen(false)
                    }}
                    className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full")}
                  >
                    {CTA_LABEL}
                  </a>
                </SiteContainer>
              </SheetContent>
            </Sheet>
          </div>
        </SiteContainer>
      </header>
    </>
  )
}
