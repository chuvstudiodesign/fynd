"use client"

// Adaptado de Cult UI (cult-ui.com, nolly-studio/cult-ui), MIT.
// Mudanças: textos em PT-BR, rótulo visível ("Copiar"), sem blur na troca de ícone,
// sem o layout `overlay` (a classe bg-code não existe nos tokens da fynd), estado `copied`
// controlável (para a demonstração dentro do mockup) e toast opcional "Mensagem copiada.".

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

function iconMotion(reduce: boolean) {
  if (reduce) {
    return { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
  }
  return {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function legacyCopyToClipboard(value: string) {
  const textArea = document.createElement("textarea")
  textArea.value = value
  textArea.setAttribute("readonly", "")
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"
  textArea.style.pointerEvents = "none"
  document.body.appendChild(textArea)
  textArea.select()
  textArea.setSelectionRange(0, value.length)
  let ok = false
  try {
    ok = document.execCommand("copy")
  } catch {
    ok = false
  }
  document.body.removeChild(textArea)
  return ok
}

export async function copyToClipboard(value: string) {
  if (typeof window === "undefined" || !value) return false
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return legacyCopyToClipboard(value)
    }
  }
  return legacyCopyToClipboard(value)
}

export interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "value" | "children"> {
  /** Texto copiado. */
  value: string
  /** Rótulo visível. Padrão "Copiar". Use `null` para só o ícone. */
  label?: string | null
  /** Estado controlado (p. ex. disparado pela timeline da demonstração). */
  copied?: boolean
  /** Mostra o toast global "Mensagem copiada." ao copiar. Padrão true. */
  notify?: boolean
}

export function CopyButton({
  value,
  label = "Copiar",
  copied: copiedProp,
  notify = true,
  className,
  variant = "default",
  size = "sm",
  onClick,
  ...props
}: CopyButtonProps) {
  const [copiedState, setCopiedState] = React.useState(false)
  const reduce = !!useReducedMotion()
  const copied = copiedProp ?? copiedState
  const motionProps = iconMotion(reduce)

  React.useEffect(() => {
    if (!copiedState) return
    const timer = window.setTimeout(() => setCopiedState(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copiedState])

  return (
    <Button
      aria-label={copied ? "Mensagem copiada" : "Copiar mensagem"}
      data-copied={copied || undefined}
      data-slot="copy-button"
      variant={variant}
      size={label === null ? "icon-sm" : size}
      className={cn("relative touch-manipulation motion-safe:active:scale-[0.97]", className)}
      onClick={async (event) => {
        onClick?.(event)
        const ok = await copyToClipboard(value)
        if (!ok) return
        setCopiedState(true)
        if (notify) toast.add({ title: "Mensagem copiada." })
      }}
      {...props}
    >
      <span aria-atomic="true" aria-live="polite" className="sr-only">
        {copied ? "Mensagem copiada" : ""}
      </span>
      <span aria-hidden="true" className="relative inline-flex size-4 items-center justify-center">
        <AnimatePresence initial={false} mode="sync">
          <motion.span
            key={copied ? "check" : "copy"}
            className="absolute inset-0 flex items-center justify-center"
            {...motionProps}
          >
            {copied ? <CheckIcon className="size-4" strokeWidth={2} /> : <CopyIcon className="size-4" strokeWidth={2} />}
          </motion.span>
        </AnimatePresence>
      </span>
      {label !== null && <span>{label}</span>}
    </Button>
  )
}
