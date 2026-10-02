"use client"

import { useState } from "react"
import { CopyIcon, ThumbsUpIcon } from "lucide-react"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message"
import { CompanyAvatar } from "@/components/company-avatar"
import { FChama } from "@/components/brand/f-chama"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const aligns = ["start", "end"] as const

function FyndAvatar() {
  return (
    <MessageAvatar className="size-8 bg-navy-900 text-paper-50">
      <FChama className="h-4 w-auto" aria-hidden="true" />
    </MessageAvatar>
  )
}

export default function MessagePage() {
  const [align, setAlign] = useState<(typeof aligns)[number]>("start")
  const [avatar, setAvatar] = useState(true)
  const [header, setHeader] = useState(true)
  const [footer, setFooter] = useState(true)

  const fromFynd = align === "start"

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Message"
        description="Estrutura de uma mensagem na conversa: avatar, cabeçalho, conteúdo (normalmente Bubbles) e rodapé. O Bubble cuida do balão; o Message cuida de quem fala e do alinhamento."
        source="src/components/ui/message.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
              <ControlToggle label="avatar" checked={avatar} onChange={setAvatar} />
              <ControlToggle label="header" checked={header} onChange={setHeader} />
              <ControlToggle label="footer" checked={footer} onChange={setFooter} />
            </>
          }
          previewClassName="block"
          preview={
            <div className="mx-auto max-w-lg">
              <Message align={align}>
                {avatar &&
                  (fromFynd ? (
                    <FyndAvatar />
                  ) : (
                    <MessageAvatar>
                      <CompanyAvatar name="Mariana Pillati" />
                    </MessageAvatar>
                  ))}
                <MessageContent>
                  {header && <MessageHeader>{fromFynd ? "fynd" : "Mariana"} · 14:32</MessageHeader>}
                  <Bubble variant={fromFynd ? "secondary" : "default"}>
                    <BubbleContent>
                      {fromFynd
                        ? "Encontrei 12 empresas com aderência acima de 80% ao seu perfil."
                        : "Indústrias de 200 a 500 pessoas no Sudeste."}
                    </BubbleContent>
                  </Bubble>
                  {footer && <MessageFooter>{fromFynd ? "Fontes: Receita Federal · base fynd" : "Lida"}</MessageFooter>}
                </MessageContent>
              </Message>
            </div>
          }
          code={`<Message${align !== "start" ? ` align="${align}"` : ""}>${avatar ? "\n  <MessageAvatar>…</MessageAvatar>" : ""}
  <MessageContent>${header ? `\n    <MessageHeader>${fromFynd ? "fynd" : "Mariana"} · 14:32</MessageHeader>` : ""}
    <Bubble variant="${fromFynd ? "secondary" : "default"}">
      <BubbleContent>…</BubbleContent>
    </Bubble>${footer ? "\n    <MessageFooter>…</MessageFooter>" : ""}
  </MessageContent>
</Message>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Conversa completa"
          description="MessageGroup empilha mensagens; várias Bubbles no mesmo MessageContent formam uma sequência do mesmo autor."
          previewClassName="block bg-background"
          code={`<MessageGroup>
  <Message>
    <FyndAvatar />
    <MessageContent>
      <Bubble variant="secondary"><BubbleContent>…</BubbleContent></Bubble>
      <Bubble variant="secondary"><BubbleContent>…</BubbleContent></Bubble>
    </MessageContent>
  </Message>
  <Message align="end">…</Message>
</MessageGroup>`}
        >
          <MessageGroup className="mx-auto max-w-lg gap-6">
            <Message>
              <FyndAvatar />
              <MessageContent>
                <MessageHeader>fynd</MessageHeader>
                <Bubble variant="secondary">
                  <BubbleContent>Olá! Me conte quem é o seu cliente ideal.</BubbleContent>
                </Bubble>
                <Bubble variant="secondary">
                  <BubbleContent>Setor, porte e região já me ajudam a começar.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageAvatar>
                <CompanyAvatar name="Mariana Pillati" />
              </MessageAvatar>
              <MessageContent>
                <Bubble>
                  <BubbleContent>Indústrias de 200 a 500 pessoas no Sudeste.</BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
            <Message>
              <FyndAvatar />
              <MessageContent>
                <Bubble variant="ghost">
                  <BubbleContent>
                    <p>
                      Encontrei <strong>12 empresas</strong>. A mais forte é a Empresa Exemplo — 92% de aderência, com expansão regional
                      recente.
                    </p>
                  </BubbleContent>
                </Bubble>
                <MessageFooter className="gap-1 px-0">
                  <Button variant="ghost" size="icon-xs" aria-label="Copiar resposta">
                    <CopyIcon />
                  </Button>
                  <Button variant="ghost" size="icon-xs" aria-label="Resposta útil">
                    <ThumbsUpIcon />
                  </Button>
                </MessageFooter>
              </MessageContent>
            </Message>
          </MessageGroup>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"`}
          usageCode={`<Message align="end">
  <MessageContent>
    <Bubble><BubbleContent>Olá!</BubbleContent></Bubble>
  </MessageContent>
</Message>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Message"
          rows={[{ prop: "align", type: '"start" | "end"', default: '"start"', description: "end espelha o layout (avatar à direita) para as mensagens da própria pessoa." }]}
        />
        <PropsTable
          component="MessageGroup · MessageAvatar · MessageContent · MessageHeader · MessageFooter"
          rows={[{ prop: "…props", type: 'React.ComponentProps<"div">', description: "Estrutura. O avatar se alinha à última bolha." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Identifique o autor em texto (MessageHeader ou texto oculto) — alinhamento e cor não bastam.</>,
            <>Envolva a conversa em uma região com <code className="font-mono text-sm">role=&quot;log&quot;</code> (o Message Scroller já faz isso).</>,
            <>Ações da mensagem (copiar, curtir) precisam de <code className="font-mono text-sm">aria-label</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
