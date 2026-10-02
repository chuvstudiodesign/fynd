"use client"

import { useState } from "react"
import { MessageCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { OpportunityCard } from "@/components/opportunity-card"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const directions = ["down", "up", "left", "right"] as const

function ContextBody() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      {[
        ["Por que agora", "Expansão regional recente"],
        ["Aderência", "92% ao perfil ideal"],
        ["Quem procurar", "Diretoria comercial"],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1">
          <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">{k}</span>
          <span className="text-base font-medium">{v}</span>
        </div>
      ))}
    </div>
  )
}

export default function DrawerPage() {
  const [direction, setDirection] = useState<(typeof directions)[number]>("down")
  const [handle, setHandle] = useState(true)
  const [modal, setModal] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Drawer"
        description="Painel que desliza de uma borda da tela e pode ser arrastado para fechar. No celular, substitui o Dialog; no desktop, serve como painel lateral de contexto."
        source="src/components/ui/drawer.tsx"
      />

      <DocSection title="Playground" description="Abra e arraste o painel na direção da borda para fechar.">
        <Playground
          controls={
            <>
              <ControlSegment label="swipeDirection" value={direction} options={directions} onChange={setDirection} />
              <ControlToggle label="showSwipeHandle" checked={handle} onChange={setHandle} />
              <ControlToggle label="modal" checked={modal} onChange={setModal} />
            </>
          }
          preview={
            <Drawer key={`${direction}-${modal}`} swipeDirection={direction} showSwipeHandle={handle} modal={modal}>
              <DrawerTrigger render={<Button />}>Ver contexto</DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto flex w-full max-w-md flex-col">
                  <DrawerHeader className="text-left!">
                    <Badge variant="label" className="mb-2">
                      Contexto
                    </Badge>
                    <DrawerTitle>Empresa Exemplo</DrawerTitle>
                    <DrawerDescription>Indústria · 320 pessoas · São Paulo</DrawerDescription>
                  </DrawerHeader>
                  <ContextBody />
                  <DrawerFooter>
                    <Button variant="signal">
                      <MessageCircleIcon data-icon="inline-start" />
                      Iniciar conversa
                    </Button>
                    <DrawerClose render={<Button variant="outline" />}>Fechar</DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          }
          code={`<Drawer swipeDirection="${direction}"${handle ? " showSwipeHandle" : ""}${modal ? "" : " modal={false}"}>
  <DrawerTrigger render={<Button />}>Ver contexto</DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-md">
      <DrawerHeader>
        <DrawerTitle>Empresa Exemplo</DrawerTitle>
        <DrawerDescription>Indústria · 320 pessoas · São Paulo</DrawerDescription>
      </DrawerHeader>
      …
      <DrawerFooter>
        <Button variant="signal">Iniciar conversa</Button>
        <DrawerClose render={<Button variant="outline" />}>Fechar</DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Painel lateral de contexto"
            description="Da direita, a partir de uma linha da lista — como na tela de interface."
            previewClassName="block"
            code={`<Drawer swipeDirection="right">
  <DrawerTrigger render={<OpportunityCard … />} />
  <DrawerContent>…</DrawerContent>
</Drawer>`}
          >
            <Drawer swipeDirection="right">
              <DrawerTrigger
                nativeButton={false}
                render={<div className="w-full" />}
              >
                <OpportunityCard company="Empresa Exemplo" meta="Indústria · 320 pessoas" fit={92} active />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Empresa Exemplo</DrawerTitle>
                  <DrawerDescription>Indústria · 320 pessoas</DrawerDescription>
                </DrawerHeader>
                <ContextBody />
                <DrawerFooter>
                  <Button variant="signal">Iniciar conversa</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Example>
          <Example
            title="Pontos de encaixe"
            description="snapPoints param em alturas intermediárias antes de abrir tudo."
            code={`<Drawer snapPoints={[0.4, 1]} showSwipeHandle>…</Drawer>`}
          >
            <Drawer snapPoints={[0.4, 1]} showSwipeHandle>
              <DrawerTrigger render={<Button variant="outline" />}>Abrir em 40%</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="mx-auto w-full max-w-xl text-left!">
                  <DrawerTitle>Oportunidades da semana</DrawerTitle>
                  <DrawerDescription>Arraste para cima para ver todas.</DrawerDescription>
                </DrawerHeader>
                <div className="mx-auto flex w-full max-w-xl flex-col gap-3 overflow-y-auto px-6 py-4">
                  {["Empresa Exemplo", "Alfa Embalagens", "Norte Metais", "Vale Plásticos", "Rio Componentes", "Serra Logística"].map((c, i) => (
                    <OpportunityCard key={c} company={c} meta="Indústria" fit={92 - i * 5} active={i === 0} />
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"`}
          usageCode={`<Drawer>
  <DrawerTrigger render={<Button />}>Abrir</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Descrição</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" />}>Fechar</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Drawer"
          rows={[
            { prop: "swipeDirection", type: '"down" | "up" | "left" | "right"', default: '"down"', description: "Borda de onde o painel sai e direção do gesto para fechar." },
            { prop: "showSwipeHandle", type: "boolean", default: "false", description: "Mostra a alça de arraste." },
            { prop: "snapPoints", type: "(number | string)[]", description: "Alturas de parada (0–1 ou px)." },
            { prop: "modal", type: "boolean", default: "true", description: "Com overlay e foco preso." },
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
          ]}
        />
        <PropsTable
          component="DrawerTrigger · DrawerClose"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza como outro elemento, p. ex. <Button />." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Comporta-se como um diálogo: <code className="font-mono text-sm">role=&quot;dialog&quot;</code>, foco preso e devolvido ao gatilho.</>,
            <>Arrastar é opcional: <Kbd>Esc</Kbd> e um botão “Fechar” visível precisam estar sempre disponíveis.</>,
            <>A alça de arraste é decorativa (<code className="font-mono text-sm">aria-hidden</code>).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
