"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import {
  A11yNotes,
  DocSection,
  Example,
  Kbd,
  PageHeader,
  PropsTable,
  ShowcasePage,
  Usage,
} from "../../_kit/showcase"

const faq = [
  {
    value: "como-funciona",
    q: "Como a fynd encontra as empresas certas?",
    a: "Você descreve o seu perfil de cliente ideal em uma conversa. A fynd cruza esse perfil com bases empresariais e prioriza as empresas com maior potencial de compra.",
  },
  {
    value: "dados",
    q: "De onde vêm os dados?",
    a: "De uma base organizada de CNPJs da Receita Federal e de uma base própria de contas corporativas, com critérios de qualidade e contexto.",
  },
  {
    value: "contato",
    q: "A fynd faz o contato por mim?",
    a: "A fynd apoia o contato inicial com contexto para a conversa. A decisão de abordar continua com o seu time comercial.",
  },
]

const variants = ["default", "card", "contained"] as const

export default function AccordionPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [multiple, setMultiple] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const code = `<Accordion${variant !== "default" ? ` variant="${variant}"` : ""}${multiple ? " multiple" : ""}${disabled ? " disabled" : ""} defaultValue={["como-funciona"]}>
  <AccordionItem value="como-funciona">
    <AccordionTrigger>Como a fynd encontra as empresas certas?</AccordionTrigger>
    <AccordionContent>
      Você descreve o seu perfil de cliente ideal em uma conversa…
    </AccordionContent>
  </AccordionItem>
  {/* … */}
</Accordion>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Accordion"
        description="Seções empilhadas que revelam conteúdo sob demanda. Ideal para FAQ, detalhes de uma oportunidade e filtros avançados — mostra o essencial e deixa o resto a um clique."
        source="src/components/ui/accordion.tsx"
      />

      <DocSection title="Playground" description="Ajuste as props e veja o resultado e o código.">
        <Playground
          previewClassName="items-start"
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlToggle label="multiple" checked={multiple} onChange={setMultiple} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <Accordion
              key={`${variant}-${multiple}`}
              variant={variant}
              multiple={multiple}
              disabled={disabled}
              defaultValue={["como-funciona"]}
              className="max-w-xl"
            >
              {faq.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          }
          code={code}
        />
      </DocSection>

      <DocSection title="Variantes" description="Três formas de agrupar os itens, todas usando os tokens de borda e cartão.">
        <div className="grid gap-8">
          {variants.map((v) => (
            <Example
              key={v}
              title={v}
              description={
                v === "default"
                  ? "Divisórias simples. Para texto corrido e FAQ em página."
                  : v === "card"
                    ? "Cada item é um cartão. Para listas com peso visual próprio."
                    : "Um contêiner único. Para painéis e barras laterais."
              }
              previewClassName="items-start bg-background"
              code={`<Accordion variant="${v}">…</Accordion>`}
            >
              <Accordion variant={v} defaultValue={["dados"]} className="max-w-xl">
                {faq.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Example>
          ))}
        </div>
      </DocSection>

      <DocSection title="Estados">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Múltiplos abertos"
            description="Com multiple, vários itens ficam abertos ao mesmo tempo."
            previewClassName="items-start"
            code={`<Accordion multiple defaultValue={["a", "b"]}>…</Accordion>`}
          >
            <Accordion multiple defaultValue={["como-funciona", "dados"]}>
              {faq.slice(0, 2).map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Example>
          <Example
            title="Item desabilitado"
            description="disabled em um AccordionItem bloqueia só aquele item."
            previewClassName="items-start"
            code={`<AccordionItem value="contato" disabled>…</AccordionItem>`}
          >
            <Accordion>
              {faq.map((item) => (
                <AccordionItem key={item.value} value={item.value} disabled={item.value === "contato"}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"`}
          usageCode={`<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta</AccordionTrigger>
    <AccordionContent>Resposta</AccordionContent>
  </AccordionItem>
</Accordion>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Accordion"
          rows={[
            { prop: "variant", type: '"default" | "card" | "contained"', default: '"default"', description: "Estilo de agrupamento dos itens (extensão da fynd)." },
            { prop: "multiple", type: "boolean", default: "false", description: "Permite mais de um item aberto ao mesmo tempo." },
            { prop: "defaultValue", type: "any[]", description: "Itens abertos inicialmente (não controlado)." },
            { prop: "value", type: "any[]", description: "Itens abertos (controlado)." },
            { prop: "onValueChange", type: "(value: any[]) => void", description: "Chamado quando itens abrem ou fecham." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita todo o accordion." },
            { prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Define as setas usadas na navegação por teclado." },
            { prop: "loopFocus", type: "boolean", default: "true", description: "O foco volta ao início ao passar do último item." },
          ]}
        />
        <PropsTable
          component="AccordionItem"
          rows={[
            { prop: "value", type: "any", description: "Identificador do item, usado em value/defaultValue." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita apenas este item." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Cada gatilho é um <code className="font-mono text-sm">button</code> dentro de um heading, com <code className="font-mono text-sm">aria-expanded</code> e <code className="font-mono text-sm">aria-controls</code> apontando para o painel.</>,
            <><Kbd>Tab</Kbd> move entre gatilhos; <Kbd>Enter</Kbd> ou <Kbd>Espaço</Kbd> abre e fecha.</>,
            <><Kbd>↓</Kbd> <Kbd>↑</Kbd> navegam entre gatilhos; <Kbd>Home</Kbd> e <Kbd>End</Kbd> vão ao primeiro e ao último.</>,
            <>Mantenha o texto do gatilho como uma pergunta ou rótulo completo: ele é o que o leitor de tela anuncia.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
