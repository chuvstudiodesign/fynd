"use client"

import { useEffect, useSyncExternalStore } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "fynd-styleguide-theme"

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

const isDarkNow = () => document.documentElement.classList.contains("dark")

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDarkNow, () => false)

  // Restaura a preferência salva
  useEffect(() => {
    try {
      document.documentElement.classList.toggle("dark", localStorage.getItem(STORAGE_KEY) === "dark")
    } catch {}
  }, [])

  function toggle() {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light")
    } catch {}
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} className="w-full">
      {dark ? <SunIcon data-icon="inline-start" /> : <MoonIcon data-icon="inline-start" />}
      {dark ? "Tema claro" : "Tema escuro"}
    </Button>
  )
}
