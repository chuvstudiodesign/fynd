import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Escala tipográfica da fynd (Figma → "Tipografia de sistema").
 * Sora para títulos e ideias, Manrope para leitura, IBM Plex Mono para dados e rótulos.
 */
const textVariants = cva("", {
  variants: {
    variant: {
      display: "font-heading text-5xl leading-[1.04] font-light tracking-display text-balance md:text-7xl",
      h1: "font-heading text-4xl leading-[1.08] font-light tracking-display text-balance md:text-[3.5rem]",
      h2: "font-heading text-3xl leading-[1.1] font-light tracking-display text-balance md:text-[2.5rem]",
      h3: "font-heading text-2xl leading-[1.2] font-normal tracking-tight md:text-[1.75rem]",
      h4: "font-heading text-xl leading-[1.3] font-normal",
      lead: "text-lg leading-[1.55] text-muted-foreground md:text-[1.375rem]",
      p: "text-base leading-[1.6] [&:not(:first-child)]:mt-4",
      large: "text-lg font-semibold",
      small: "text-sm leading-normal font-medium",
      muted: "text-sm text-muted-foreground",
      eyebrow: "font-mono text-xs font-medium tracking-label text-muted-foreground uppercase",
      data: "font-mono font-medium tabular-nums",
      blockquote: "border-l-2 border-signal pl-6 font-heading text-xl leading-snug font-light",
      list: "my-4 ml-6 list-disc text-base leading-[1.6] [&>li]:mt-2",
      code: "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em]",
    },
  },
  defaultVariants: { variant: "p" },
})

type Variant = NonNullable<VariantProps<typeof textVariants>["variant"]>

const defaultTag: Record<Variant, keyof React.JSX.IntrinsicElements> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  p: "p",
  large: "div",
  small: "small",
  muted: "p",
  eyebrow: "span",
  data: "span",
  blockquote: "blockquote",
  list: "ul",
  code: "code",
}

/**
 * Texto com o papel tipográfico certo. O elemento HTML segue o papel (h1, p, blockquote…),
 * mas pode ser trocado com `render` — p. ex. um h2 com cara de display.
 */
function Text({
  variant = "p",
  className,
  render,
  ...props
}: useRender.ComponentProps<"p"> & VariantProps<typeof textVariants>) {
  const v = (variant ?? "p") as Variant
  return useRender({
    defaultTagName: defaultTag[v] as "p",
    props: mergeProps<"p">({ className: cn(textVariants({ variant: v }), className) }, props),
    render,
    state: { slot: "text", variant: v },
  })
}

export { Text, textVariants }
