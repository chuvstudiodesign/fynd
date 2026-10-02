"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { ControlSegment, ControlText, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const types = ["default", "success", "info", "warning", "error", "loading"] as const
type T = (typeof types)[number]

const samples: Record<T, { title: string; description: string }> = {
  default: { title: "Perfil salvo", description: "A lista será recalculada em instantes." },
  success: { title: "Conversa iniciada", description: "Enviamos o contexto para a diretoria comercial." },
  info: { title: "Base atualizada", description: "Novos CNPJs da Receita Federal foram cruzados." },
  warning: { title: "Contato incompleto", description: "Revise o responsável antes de enviar." },
  error: { title: "Falha na importação", description: "O arquivo não segue o formato esperado." },
  loading: { title: "Buscando empresas…", description: "Cruzando com o perfil ideal." },
}

export default function ToastPage() {
  const [type, setType] = useState<T>("success")
  const [title, setTitle] = useState(samples.success.title)

  function show() {
    toast.add({
      title,
      description: samples[type].description,
      type: type === "default" ? undefined : type,
      timeout: type === "loading" ? 3000 : undefined,
    })
  }

  function withUndo() {
    toast.add({
      title: "Empresa descartada",
      description: "Alfa Embalagens saiu da sua lista.",
      actionProps: {
        children: "Desfazer",
        onClick: () => toast.add({ title: "Descarte desfeito", type: "success" }),
      },
    })
  }

  function withPromise() {
    const busca = new Promise<number>((resolve) => setTimeout(() => resolve(12), 1800))
    toast.promise(busca, {
      loading: { title: "Buscando empresas…", description: "Cruzando com o perfil ideal." },
      success: (n) => ({ title: `${n} empresas encontradas`, description: "Aderência acima de 80%." }),
      error: { title: "Não foi possível buscar", description: "Tente de novo em instantes." },
    })
  }

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Toast"
        description="Notificação breve no canto da tela, que some sozinha. Confirma uma ação ou avisa algo que aconteceu em segundo plano — sem interromper."
        source="src/components/ui/toast.tsx"
      />

      <DocSection title="Playground" description="O Toaster já está montado no layout raiz — basta chamar toast.add() de qualquer lugar.">
        <Playground
          controls={
            <>
              <ControlSegment
                label="type"
                value={type}
                options={types}
                onChange={(v) => {
                  setType(v)
                  setTitle(samples[v].title)
                }}
              />
              <ControlText label="título" value={title} onChange={setTitle} />
            </>
          }
          preview={<Button onClick={show}>Mostrar toast</Button>}
          code={`import { toast } from "@/components/ui/toast"

toast.add({
  title: "${title}",
  description: "${samples[type].description}",${type !== "default" ? `\n  type: "${type}",` : ""}
})`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Com ação de desfazer"
            code={`toast.add({
  title: "Empresa descartada",
  actionProps: {
    children: "Desfazer",
    onClick: () => desfazer(),
  },
})`}
          >
            <Button variant="outline" onClick={withUndo}>
              Descartar empresa
            </Button>
          </Example>
          <Example
            title="Promessa"
            description="Carregando → sucesso ou erro, no mesmo toast."
            code={`toast.promise(buscar(), {
  loading: { title: "Buscando empresas…" },
  success: (n) => ({ title: \`\${n} empresas encontradas\` }),
  error: { title: "Não foi possível buscar" },
})`}
          >
            <Button variant="signal" onClick={withPromise}>
              Buscar empresas
            </Button>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Configuração">
        <Usage
          importCode={`// app/layout.tsx — já configurado na fynd
import { Toaster } from "@/components/ui/toast"

<body>
  <Toaster>{children}</Toaster>
</body>`}
          usageCode={`import { toast } from "@/components/ui/toast"

toast.add({ title: "Perfil salvo", type: "success" })`}
        />
      </DocSection>

      <DocSection title="Props" description="Opções de toast.add() (Base UI Toast).">
        <PropsTable
          component="toast.add(options)"
          rows={[
            { prop: "title · description", type: "ReactNode", description: "Conteúdo." },
            { prop: "type", type: '"success" | "info" | "warning" | "error" | "loading"', description: "Define o ícone (com a cor semântica)." },
            { prop: "timeout", type: "number", default: "5000", description: "Tempo até sumir (ms). 0 = não some sozinho." },
            { prop: "priority", type: '"low" | "high"', default: '"low"', description: "high é anunciado imediatamente (assertive)." },
            { prop: "actionProps", type: "button props", description: "Botão de ação (children, onClick)." },
            { prop: "id", type: "string", description: "Reusar um id atualiza o toast existente." },
          ]}
        />
        <PropsTable
          component="toast.*"
          rows={[
            { prop: "promise(p, { loading, success, error })", type: "Promise", description: "Um toast que acompanha a promessa." },
            { prop: "update(id, options)", type: "—", description: "Atualiza um toast." },
            { prop: "close(id?)", type: "—", description: "Fecha um ou todos." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Os toasts vivem numa região <code className="font-mono text-sm">aria-live</code>: são anunciados sem roubar o foco.</>,
            <>O tempo pausa enquanto o mouse ou o foco estão sobre o toast; <kbd className="font-mono text-sm">F6</kbd> leva o foco até a região.</>,
            <>Nunca ponha a única forma de fazer algo dentro de um toast — ele some. “Desfazer” é um atalho, não o caminho principal.</>,
            <>Botão de fechar com rótulo “Fechar notificação”; dá para arrastar para dispensar.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
