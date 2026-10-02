import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  /** Mostra o spinner, desabilita o botão e anuncia o estado */
  loading?: boolean
  /** Texto exibido enquanto carrega (padrão: o próprio children) */
  loadingText?: React.ReactNode
}

/** Button com estado de carregamento. Mantém a largura estável trocando só o ícone inicial. */
export function LoadingButton({ loading = false, loadingText, disabled, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <Spinner data-icon="inline-start" aria-hidden="true" />}
      {loading && loadingText ? loadingText : children}
    </Button>
  )
}
