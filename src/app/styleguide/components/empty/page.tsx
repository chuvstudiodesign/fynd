"use client"

import { useState } from "react"
import { PlusIcon, SearchXIcon, SparklesIcon, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FChama } from "@/components/brand/f-chama"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const medias = ["icon", "marca", "nenhuma"] as const

export default function EmptyPage() {
  const [media, setMedia] = useState<(typeof medias)[number]>("icon")
  const [border, setBorder] = useState(true)
  const [actions, setActions] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Empty"
        description="Estado vazio: explica por que não há nada aqui e qual é o próximo passo. Na fynd, é um convite — “nenhum sinal ainda” — e nunca um beco sem saída."
        source="src/components/ui/empty.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="media" value={media} options={medias} onChange={setMedia} />
              <ControlToggle label="borda" checked={border} onChange={setBorder} />
              <ControlToggle label="ações" checked={actions} onChange={setActions} />
            </>
          }
          preview={
            <Empty className={border ? "max-w-lg border" : "max-w-lg"}>
              <EmptyHeader>
                {media === "icon" && (
                  <EmptyMedia variant="icon">
                    <SparklesIcon />
                  </EmptyMedia>
                )}
                {media === "marca" && (
                  <EmptyMedia className="flex size-14 items-center justify-center rounded-full bg-navy-900 text-paper-50">
                    <FChama className="h-7 w-auto" aria-hidden="true" />
                  </EmptyMedia>
                )}
                <EmptyTitle>Nenhum sinal por aqui ainda.</EmptyTitle>
                <EmptyDescription>Ajuste o perfil ideal para revelar novas empresas.</EmptyDescription>
              </EmptyHeader>
              {actions && (
                <EmptyContent className="flex-row justify-center">
                  <Button>Ajustar perfil</Button>
                  <Button variant="ghost">Saiba mais</Button>
                </EmptyContent>
              )}
            </Empty>
          }
          code={`<Empty${border ? ' className="border"' : ""}>
  <EmptyHeader>${media === "icon" ? `\n    <EmptyMedia variant="icon"><SparklesIcon /></EmptyMedia>` : media === "marca" ? `\n    <EmptyMedia className="size-14 rounded-full bg-navy-900 text-paper-50"><FChama /></EmptyMedia>` : ""}
    <EmptyTitle>Nenhum sinal por aqui ainda.</EmptyTitle>
    <EmptyDescription>Ajuste o perfil ideal para revelar novas empresas.</EmptyDescription>
  </EmptyHeader>${actions ? `\n  <EmptyContent className="flex-row justify-center">\n    <Button>Ajustar perfil</Button>\n    <Button variant="ghost">Saiba mais</Button>\n  </EmptyContent>` : ""}
</Empty>`}
        />
      </DocSection>

      <DocSection title="Exemplos" description="Cada vazio tem uma causa diferente — e uma saída diferente.">
        <div className="grid gap-8 md:grid-cols-3">
          <Example
            title="Primeiro uso"
            previewClassName="p-4"
            code={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><PlusIcon /></EmptyMedia>
    <EmptyTitle>Comece pelo cliente ideal</EmptyTitle>
    <EmptyDescription>…</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><Button variant="signal">Descrever perfil</Button></EmptyContent>
</Empty>`}
          >
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <PlusIcon />
                </EmptyMedia>
                <EmptyTitle>Comece pelo cliente ideal</EmptyTitle>
                <EmptyDescription>Conte em uma conversa quem você quer encontrar.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="signal">Descrever perfil</Button>
              </EmptyContent>
            </Empty>
          </Example>
          <Example
            title="Sem resultados"
            previewClassName="p-4"
            code={`<EmptyMedia variant="icon"><SearchXIcon /></EmptyMedia>
<EmptyTitle>Nenhuma empresa encontrada</EmptyTitle>`}
          >
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchXIcon />
                </EmptyMedia>
                <EmptyTitle>Nenhuma empresa encontrada</EmptyTitle>
                <EmptyDescription>Tente remover um filtro ou ampliar a região.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">Limpar filtros</Button>
              </EmptyContent>
            </Empty>
          </Example>
          <Example
            title="Área de envio"
            previewClassName="p-4"
            code={`<Empty className="border">
  …
  <EmptyContent><Button variant="outline"><UploadIcon />Enviar CSV</Button></EmptyContent>
</Empty>`}
          >
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UploadIcon />
                </EmptyMedia>
                <EmptyTitle>Importe sua lista</EmptyTitle>
                <EmptyDescription>Arraste um CSV com CNPJs ou clique para enviar.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline">
                  <UploadIcon data-icon="inline-start" />
                  Enviar CSV
                </Button>
              </EmptyContent>
            </Empty>
          </Example>
        </div>
        <Example
          title="No campo de marca"
          description="Como no slide “A marca orienta nos detalhes”: fundo azul profundo, ação em outline."
          previewClassName="p-0"
          code={`<Empty className="rounded-none bg-navy-900 text-paper-50">…</Empty>`}
        >
          <Empty className="rounded-none bg-navy-900 py-16 text-paper-50">
            <EmptyHeader>
              <EmptyTitle className="text-paper-50">Nenhum sinal por aqui ainda.</EmptyTitle>
              <EmptyDescription className="text-steel-300">Ajuste o perfil para revelar novas empresas.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" className="border-signal-400/60 bg-transparent text-signal-300 hover:bg-signal-400/10 hover:text-signal-200 dark:bg-transparent">
                Ajustar perfil
              </Button>
            </EmptyContent>
          </Empty>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"`}
          usageCode={`<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><SparklesIcon /></EmptyMedia>
    <EmptyTitle>Nada por aqui</EmptyTitle>
    <EmptyDescription>Explique o motivo e o próximo passo.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent><Button>Ação</Button></EmptyContent>
</Empty>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="EmptyMedia"
          rows={[{ prop: "variant", type: '"default" | "icon"', default: '"default"', description: "icon põe o ícone num círculo de 48px; default aceita ilustração livre." }]}
        />
        <PropsTable
          component="Empty · EmptyHeader · EmptyTitle · EmptyDescription · EmptyContent"
          rows={[{ prop: "…props", type: 'React.ComponentProps<"div">', description: 'Use className="border" no Empty para a borda tracejada.' }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O título é texto em <code className="font-mono text-sm">div</code>; se o vazio é o conteúdo principal da página, coloque um heading real dentro dele.</>,
            <>Quando o vazio aparece após uma busca, anuncie com <code className="font-mono text-sm">aria-live=&quot;polite&quot;</code> no contêiner de resultados.</>,
            <>Ícones são decorativos; o texto precisa explicar sozinho.</>,
            <>Ciano como texto só sobre o fundo azul profundo — nunca sobre papel claro.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
