"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <div className={cn("group/code relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-navy-900 p-4 font-mono text-[0.8125rem] leading-relaxed text-paper-50 dark:bg-navy-950 dark:ring-1 dark:ring-steel-500/30">
        <code>{code.trim()}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copiado" : "Copiar código"}
        className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-md text-steel-300 opacity-0 transition-opacity group-hover/code:opacity-100 hover:bg-white/10 hover:text-paper-50 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-signal-400"
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </button>
    </div>
  )
}
