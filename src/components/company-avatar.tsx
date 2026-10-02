import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Tons da marca para o fallback. O ciano fica de fora: é reservado ao sinal.
const tints = [
  "bg-navy-100 text-navy-800 dark:bg-navy-700 dark:text-navy-50",
  "bg-steel-100 text-steel-700 dark:bg-steel-700 dark:text-steel-50",
  "bg-paper-200 text-paper-800 dark:bg-paper-700 dark:text-paper-50",
  "bg-navy-200 text-navy-900 dark:bg-navy-600 dark:text-navy-50",
  "bg-steel-200 text-steel-800 dark:bg-steel-600 dark:text-steel-50",
] as const

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return "?"
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

function tintFor(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return tints[Math.abs(hash) % tints.length]
}

interface CompanyAvatarProps extends Omit<React.ComponentProps<typeof Avatar>, "children"> {
  /** Nome da empresa ou pessoa; gera as iniciais e a cor do fallback */
  name: string
  src?: string
  /** Marca a empresa como sinal prioritário (ponto ciano) */
  signal?: boolean
}

/** Avatar com iniciais e cor estável por nome. Use em listas de empresas e contatos. */
export function CompanyAvatar({ name, src, signal = false, className, ...props }: CompanyAvatarProps) {
  return (
    <Avatar className={className} {...props}>
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback className={cn(tintFor(name))}>{getInitials(name)}</AvatarFallback>
      {signal && <AvatarBadge className="bg-signal" aria-label="Sinal prioritário" />}
    </Avatar>
  )
}
