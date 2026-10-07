"use client"

import { useEffect, useRef, useState } from "react"
import { LayoutGroup, motion, stagger, useReducedMotion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { Wordmark } from "@/components/brand/wordmark"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { SiteContainer } from "@/components/site/sections/site-container"
import { ANCHORS_V5 as ANCHORS, CTA_LABEL_V5 as CTA_LABEL, CTA_SHORT_LABEL_V5 as CTA_SHORT_LABEL, NAV_LINKS_V5 as NAV_LINKS } from "@/components/site/sections/anchors-v5"
import { EASE_OUT } from "@/components/site/motion/gsap"

type Theme = "dark" | "light"

/** Linha de leitura do tema: o meio da cápsula flutuante (topo 12–16px + altura 56–64px). */
const PROBE_Y = 44

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

/**
 * Header v5: o da v4 (visual, estados, tema por `data-theme`, menu mobile e CTA que some no encerramento)
 * com as âncoras e o CTA da v5 (02-copy-v5 §0, 03-design-v5 §8). Sem ciano.
 */
export function SiteHeaderV5() {
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

  // QA M6: com o menu aberto, o conteúdo atrás dele sai da árvore de acessibilidade (a biblioteca não esconde
  // o <main> porque ele tem regiões `aria-live`). Volta antes de o foco ir para a seção de destino.
  useEffect(() => {
    const main = document.getElementById("conteudo")
    if (!main || !menuOpen) return
    main.inert = true
    return () => {
      main.inert = false
    }
  }, [menuOpen])

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
          "group/header fixed inset-x-0 top-0 z-50 pt-3 text-foreground md:pt-4",
          theme === "dark" && "dark"
        )}
      >
        <SiteContainer className="max-w-[76rem]">
          {/* Cápsula flutuante (v2): vidro sempre presente, mais denso depois do primeiro scroll */}
          <div
            className={cn(
              "relative flex h-14 items-center justify-between gap-6 rounded-full border pr-2 pl-5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none md:h-16 md:pl-7",
              "border-paper-50/10 bg-navy-900/35 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--paper-50)_6%,transparent)]",
              "group-data-scrolled/header:bg-navy-900/75 group-data-scrolled/header:shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--paper-50)_6%,transparent),0_16px_40px_-16px_hsl(var(--shadow-color)/0.6)]",
              theme === "light" &&
                "border-paper-300/80 bg-paper-50/60 shadow-none group-data-scrolled/header:bg-paper-50/85 group-data-scrolled/header:shadow-md"
            )}
          >
            <a href={`#${ANCHORS.top}`} aria-label="fynd, voltar ao início" className="inline-flex min-h-10 items-center rounded-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <Wordmark aria-hidden="true" className="h-7 w-auto md:h-8" />
            </a>

            <nav aria-label="Seções da página" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
              <LayoutGroup id="site-nav">
                <ul className="flex items-center gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = active === link.id
                    return (
                      <li key={link.id} className="relative">
                        {/* Indicador que desliza entre os links (Motion layoutId) */}
                        {isActive && (
                          <motion.span
                            layoutId="site-nav-active"
                            aria-hidden="true"
                            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                            className="absolute inset-0 rounded-full bg-foreground/[0.08] ring-1 ring-foreground/10"
                          />
                        )}
                        <a
                          href={`#${link.id}`}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "relative inline-flex h-10 items-center rounded-full px-3 text-sm font-medium lg:px-4 text-muted-foreground transition-colors duration-200 outline-none hover:bg-foreground/[0.05] hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                            isActive && "text-foreground hover:bg-transparent"
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </LayoutGroup>
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
                  buttonVariants({ variant: "default" }),
                  "group/cta hidden h-10 pr-4 pl-5 transition-[opacity,background-color,color] duration-200 sm:inline-flex md:h-11",
                  accessInView && "pointer-events-none opacity-0"
                )}
              >
                {/* Rótulo curto em todas as larguras: o longo não cabe ao lado de três links (03-design-v5 §8). */}
                {CTA_SHORT_LABEL}
                <ArrowRightIcon aria-hidden="true" className="transition-transform duration-200 group-hover/cta:translate-x-0.5 motion-reduce:transition-none" />
              </motion.a>

            <Sheet
              open={menuOpen}
              onOpenChange={setMenuOpen}
              onOpenChangeComplete={(open) => {
                if (open || !pendingHash.current) return
                const hash = pendingHash.current
                const target = document.getElementById(hash)
                pendingHash.current = null
                if (!target) return
                // QA M8: o endereço acompanha a seção (voltar do navegador e link compartilhável), como nos links do desktop.
                if (window.location.hash !== `#${hash}`) window.history.pushState(null, "", `#${hash}`)
                target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
                // QA M5: leva o foco para a seção de destino, para o próximo Tab seguir dali.
                if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
                target.focus({ preventScroll: true })
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
                    <Wordmark aria-hidden="true" className="h-7 w-auto" />
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
          </div>
        </SiteContainer>
      </header>
    </>
  )
}
