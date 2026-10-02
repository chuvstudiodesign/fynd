"use client"

import { useState } from "react"
import { Trash2Icon, MessageCircleIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["default", "sm"] as const
const intents = ["confirmar", "destrutivo"] as const

export default function AlertDialogPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [intent, setIntent] = useState<(typeof intents)[number]>("confirmar")
  const [media, setMedia] = useState(true)
  const [log, setLog] = useState<string | null>(null)

  const destructive = intent === "destrutivo"
  const title = destructive ? "Descartar esta oportunidade?" : "Iniciar conversa com Empresa Exemplo?"
  const description = destructive
    ? "Ela sai da sua lista de prioridades. Você pode recuperá-la em Descartadas por 30 dias."
    : "A fynd vai preparar o contexto para o primeiro contato com a diretoria comercial."
  const action = destructive ? "Descartar" : "Iniciar conversa"

  const code = `<AlertDialog>
  <AlertDialogTrigger render={<Button${destructive ? ' variant="outline"' : ""} />}>
    ${destructive ? "Descartar" : "Iniciar conversa"}
  </AlertDialogTrigger>
  <AlertDialogContent${size !== "default" ? ` size="${size}"` : ""}>
    <AlertDialogHeader>${media ? `\n      <AlertDialogMedia${destructive ? ' className="bg-destructive/10 text-destructive"' : ""}>\n        <${destructive ? "Trash2Icon" : "MessageCircleIcon"} />\n      </AlertDialogMedia>` : ""}
      <AlertDialogTitle>${title}</AlertDialogTitle>
      <AlertDialogDescription>${description}</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction${destructive ? ' variant="destructive"' : ""}>${action}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Alert Dialog"
        description="Diálogo modal que interrompe o fluxo para pedir uma confirmação importante. Não fecha ao clicar fora: a pessoa precisa escolher uma das ações."
        source="src/components/ui/alert-dialog.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="intenção" value={intent} options={intents} onChange={setIntent} />
              <ControlToggle label="media" checked={media} onChange={setMedia} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant={destructive ? "outline" : "default"} />}>
                  {destructive ? "Descartar" : "Iniciar conversa"}
                </AlertDialogTrigger>
                <AlertDialogContent size={size}>
                  <AlertDialogHeader>
                    {media && (
                      <AlertDialogMedia className={destructive ? "bg-destructive/10 text-destructive" : undefined}>
                        {destructive ? <Trash2Icon /> : <MessageCircleIcon />}
                      </AlertDialogMedia>
                    )}
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setLog("Cancelado")}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      variant={destructive ? "destructive" : "default"}
                      onClick={() => setLog(`Confirmado: ${action}`)}
                    >
                      {action}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {log ?? "Clique para abrir"}
              </span>
            </div>
          }
          code={code}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Confirmação"
            description="Ação primária em azul profundo; cancelar sempre em outline."
            code={`<AlertDialogFooter>\n  <AlertDialogCancel>Cancelar</AlertDialogCancel>\n  <AlertDialogAction>Salvar perfil</AlertDialogAction>\n</AlertDialogFooter>`}
          >
            <AlertDialog>
              <AlertDialogTrigger render={<Button />}>Salvar perfil ideal</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Salvar novo perfil ideal?</AlertDialogTitle>
                  <AlertDialogDescription>
                    As prioridades da semana serão recalculadas a partir destes critérios.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Salvar perfil</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Example>
          <Example
            title="Destrutivo · size sm"
            description="Compacto e centralizado, com botões lado a lado."
            code={`<AlertDialogContent size="sm">\n  …\n  <AlertDialogAction variant="destructive">Remover</AlertDialogAction>\n</AlertDialogContent>`}
          >
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>Remover lista</AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Remover lista?</AlertDialogTitle>
                  <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction variant="destructive">Remover</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"`}
          usageCode={`<AlertDialog>
  <AlertDialogTrigger render={<Button />}>Abrir</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>Explique a consequência.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="AlertDialog"
          rows={[
            { prop: "open", type: "boolean", description: "Estado aberto (controlado)." },
            { prop: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial (não controlado)." },
            { prop: "onOpenChange", type: "(open: boolean) => void", description: "Chamado ao abrir ou fechar." },
          ]}
        />
        <PropsTable
          component="AlertDialogTrigger"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza o gatilho como outro elemento, p. ex. <Button />." }]}
        />
        <PropsTable
          component="AlertDialogContent"
          rows={[{ prop: "size", type: '"default" | "sm"', default: '"default"', description: "default alinha à esquerda (até 448px); sm centraliza e empilha as ações em grade." }]}
        />
        <PropsTable
          component="AlertDialogAction · AlertDialogCancel"
          rows={[
            { prop: "variant", type: "Button variant", default: 'Action: "default" · Cancel: "outline"', description: "Qualquer variante do Button." },
            { prop: "size", type: "Button size", default: '"default"', description: "Qualquer tamanho do Button." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Usa <code className="font-mono text-sm">role=&quot;alertdialog&quot;</code>, com título e descrição ligados por <code className="font-mono text-sm">aria-labelledby</code> e <code className="font-mono text-sm">aria-describedby</code>.</>,
            <>O foco fica preso no diálogo enquanto ele está aberto e volta ao gatilho ao fechar.</>,
            <><Kbd>Esc</Kbd> fecha como “Cancelar”. Clicar fora não fecha — a escolha é explícita.</>,
            <>Escreva o título como pergunta e deixe o rótulo da ação dizer o que acontece (“Descartar”, não “OK”).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
