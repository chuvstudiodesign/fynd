import { cn } from "@/lib/utils"

/** Wrapper único de largura do site (03-design §1.1). Nenhuma seção inventa a própria largura. */
export function SiteContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16", className)} {...props} />
}

/** Grade de 4/8/12 colunas com os gutters do design. */
export const siteGrid = "grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-6 lg:grid-cols-12 xl:gap-8"

/** Padding vertical padrão de seção. */
export const sectionY = "py-24 md:py-32 lg:py-40"
