"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpIcon } from "lucide-react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@/components/ui/input-group"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { Spinner } from "@/components/ui/spinner"
import { FChama } from "@/components/brand/f-chama"
import { CompanyAvatar } from "@/components/company-avatar"
import { ControlToggle } from "../../_kit/controls"
import { A11yNotes, DocSection, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"
import { CodeBlock } from "../../_kit/code-block"

type Msg = { id: string; role: "user" | "fynd"; text: string }

const seed: Msg[] = [
  { id: "m1", role: "fynd", text: "Olá! Me conte quem é o seu cliente ideal." },
  { id: "m2", role: "user", text: "Indústrias de 200 a 500 pessoas no Sudeste." },
  {
    id: "m3",
    role: "fynd",
    text: "Encontrei 1.240 empresas nesse recorte. Para priorizar, me diga: o que faz uma empresa estar pronta para comprar de vocês agora?",
  },
  { id: "m4", role: "user", text: "Quando está expandindo — nova filial, contratações na área comercial." },
  {
    id: "m5",
    role: "fynd",
    text: "Perfeito. Cruzei esses sinais e ficaram 12 empresas com aderência acima de 80%.\n\nA mais forte é a Empresa Exemplo (92%): expansão regional recente e diretoria comercial identificada. Depois vêm Alfa Embalagens (84%) e Norte Metais (77%).",
  },
]

const replies = [
  "Posso também filtrar por faturamento. Quer que eu mostre só as que faturam acima de R$ 50 mi?",
  "Pronto: 7 empresas atendem ao novo critério. A Empresa Exemplo continua no topo.",
  "Quando quiser, preparo o contexto para a primeira conversa com a diretoria comercial.",
]

function FyndAvatar() {
  return (
    <MessageAvatar className="size-8 bg-navy-900 text-paper-50">
      <FChama className="h-4 w-auto" aria-hidden="true" />
    </MessageAvatar>
  )
}

export default function MessageScrollerPage() {
  const [autoScroll, setAutoScroll] = useState(true)
  const [messages, setMessages] = useState<Msg[]>(seed)
  const [draft, setDraft] = useState("")
  const [thinking, setThinking] = useState(false)
  const replyIdx = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function send(e: React.FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text || thinking) return
    setMessages((m) => [...m, { id: `u${Date.now()}`, role: "user", text }])
    setDraft("")
    setThinking(true)
    timer.current = setTimeout(() => {
      const reply = replies[replyIdx.current % replies.length]
      replyIdx.current += 1
      setMessages((m) => [...m, { id: `f${Date.now()}`, role: "fynd", text: reply }])
      setThinking(false)
    }, 1400)
  }

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Message Scroller"
        description="A área rolável da conversa. Mantém a última mensagem à vista enquanto novas chegam, respeita quando a pessoa rola para cima e oferece um botão para voltar ao fim."
        source="src/components/ui/message-scroller.tsx"
      />

      <DocSection
        title="Playground"
        description="Mande uma mensagem: a fynd responde depois de um “pensando…”. Role para cima para ver o botão de voltar ao fim."
      >
        <div className="overflow-hidden rounded-xl border">
          <div className="flex flex-wrap gap-6 border-b bg-background px-6 py-4">
            <ControlToggle label="autoScroll" checked={autoScroll} onChange={setAutoScroll} />
          </div>
          <div className="bg-background p-6">
            <Card className="mx-auto h-[34rem] max-w-xl">
              <CardHeader>
                <CardTitle className="text-lg">Perfil de cliente ideal</CardTitle>
                <CardDescription>Conversa com a fynd</CardDescription>
              </CardHeader>
              <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
                <MessageScrollerProvider key={String(autoScroll)} autoScroll={autoScroll}>
                  <MessageScroller>
                    <MessageScrollerViewport aria-label="Conversa com a fynd">
                      <MessageScrollerContent className="p-(--card-spacing)">
                        {messages.map((m) => (
                          <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
                            <Message align={m.role === "user" ? "end" : "start"}>
                              {m.role === "fynd" ? (
                                <FyndAvatar />
                              ) : (
                                <MessageAvatar>
                                  <CompanyAvatar name="Mariana Pillati" />
                                </MessageAvatar>
                              )}
                              <MessageContent>
                                <span className="sr-only">{m.role === "fynd" ? "fynd disse:" : "Você disse:"}</span>
                                <Bubble variant={m.role === "user" ? "default" : "secondary"}>
                                  <BubbleContent className="whitespace-pre-wrap">{m.text}</BubbleContent>
                                </Bubble>
                              </MessageContent>
                            </Message>
                          </MessageScrollerItem>
                        ))}
                        {thinking && (
                          <MessageScrollerItem>
                            <Marker role="status">
                              <MarkerIcon>
                                <Spinner />
                              </MarkerIcon>
                              <MarkerContent className="shimmer">Cruzando com o perfil ideal…</MarkerContent>
                            </Marker>
                          </MessageScrollerItem>
                        )}
                      </MessageScrollerContent>
                    </MessageScrollerViewport>
                    <MessageScrollerButton />
                  </MessageScroller>
                </MessageScrollerProvider>
              </CardContent>
              <CardFooter className="bg-transparent">
                <form onSubmit={send} className="w-full">
                  <InputGroup>
                    <InputGroupTextarea
                      placeholder="Escreva para a fynd…"
                      aria-label="Mensagem"
                      className="h-10 min-h-10"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          e.currentTarget.form?.requestSubmit()
                        }
                      }}
                    />
                    <InputGroupAddon align="block-end" className="p-2">
                      <InputGroupButton
                        type="submit"
                        variant="default"
                        size="icon-sm"
                        className="ml-auto rounded-full"
                        aria-label="Enviar"
                        disabled={!draft.trim() || thinking}
                      >
                        <ArrowUpIcon />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </form>
              </CardFooter>
            </Card>
          </div>
          <CodeBlock
            className="border-t [&_pre]:rounded-none"
            code={`<MessageScrollerProvider${autoScroll ? "" : " autoScroll={false}"}>
  <MessageScroller>
    <MessageScrollerViewport aria-label="Conversa com a fynd">
      <MessageScrollerContent>
        {messages.map((m) => (
          <MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role === "user"}>
            <Message align={m.role === "user" ? "end" : "start"}>…</Message>
          </MessageScrollerItem>
        ))}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>`}
          />
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"`}
          usageCode={`// O pai precisa ter altura definida e overflow-hidden
<div className="h-96 overflow-hidden">
  <MessageScrollerProvider>
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent>…itens…</MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>
  </MessageScrollerProvider>
</div>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="MessageScrollerProvider"
          rows={[
            { prop: "autoScroll", type: "boolean", default: "true", description: "Acompanha o fim enquanto a pessoa estiver lá; para se ela rolar para cima." },
            { prop: "defaultScrollPosition", type: '"end" | "start" | "last-anchor"', default: '"end"', description: "Onde a conversa abre." },
            { prop: "scrollEdgeThreshold", type: "number", description: "Distância (px) considerada “no fim”." },
            { prop: "scrollMargin · scrollPreviousItemPeek", type: "number", description: "Folgas ao rolar até uma âncora." },
          ]}
        />
        <PropsTable
          component="MessageScrollerItem"
          rows={[
            { prop: "messageId", type: "string", description: "Identificador para scrollToMessage()." },
            { prop: "scrollAnchor", type: "boolean", default: "false", description: "Ao chegar, rola até ele (use nas mensagens da pessoa)." },
          ]}
        />
        <PropsTable
          component="MessageScrollerButton"
          rows={[
            { prop: "direction", type: '"end" | "start"', default: '"end"', description: "Para onde o botão leva. Só aparece quando há o que rolar." },
            { prop: "variant · size", type: "Button", default: '"secondary" · "icon-sm"', description: "Estilo do botão." },
          ]}
        />
        <PropsTable
          component="MessageScrollerViewport"
          rows={[
            { prop: "aria-label", type: "string", default: '"Mensagens"', description: "Nome da região rolável." },
            { prop: "preserveScrollOnPrepend", type: "boolean", description: "Mantém a posição ao carregar mensagens antigas no topo." },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Hooks: <code className="font-mono">useMessageScroller()</code> expõe <code className="font-mono">scrollToEnd</code>,{" "}
          <code className="font-mono">scrollToStart</code> e <code className="font-mono">scrollToMessage(id)</code>.
        </p>
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O viewport é uma <code className="font-mono text-sm">region</code> focável com nome, e o conteúdo tem <code className="font-mono text-sm">role=&quot;log&quot;</code>: novas mensagens são anunciadas.</>,
            <>Com o foco na região, as setas e PageUp/PageDown rolam a conversa.</>,
            <>Nunca puxe a pessoa de volta ao fim enquanto ela lê mensagens antigas — o autoScroll já respeita isso.</>,
            <>O botão “Ir para a mensagem mais recente” tem rótulo e só aparece quando necessário.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
