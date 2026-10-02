"use client"

import { useState } from "react"
import { BuildingIcon, FileTextIcon, MessageCircleIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "line"] as const
const orientations = ["horizontal", "vertical"] as const

const panels = [
  { value: "contexto", label: "Contexto", icon: BuildingIcon, body: "Expansão regional recente no Sudeste e diretoria comercial identificada." },
  { value: "conversas", label: "Conversas", icon: MessageCircleIcon, body: "Nenhuma conversa ainda. A fynd pode preparar o primeiro contato." },
  { value: "propostas", label: "Propostas", icon: FileTextIcon, body: "1 proposta em rascunho, atualizada hoje." },
]

export default function TabsPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")
  const [icons, setIcons] = useState(false)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Navigation"
        title="Tabs"
        description="Alterna entre painéis de conteúdo relacionado sem sair da página. Na tela de uma empresa: contexto, conversas, propostas."
        source="src/components/ui/tabs.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlToggle label="ícones" checked={icons} onChange={setIcons} />
            </>
          }
          previewClassName="block"
          preview={
            <Tabs key={orientation} defaultValue="contexto" orientation={orientation} className="mx-auto max-w-lg">
              <TabsList variant={variant}>
                {panels.map((p) => (
                  <TabsTrigger key={p.value} value={p.value}>
                    {icons && <p.icon />}
                    {p.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {panels.map((p) => (
                <TabsContent key={p.value} value={p.value}>
                  <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </TabsContent>
              ))}
            </Tabs>
          }
          code={`<Tabs defaultValue="contexto"${orientation !== "horizontal" ? ` orientation="${orientation}"` : ""}>
  <TabsList${variant !== "default" ? ` variant="${variant}"` : ""}>
    <TabsTrigger value="contexto">${icons ? "<BuildingIcon />" : ""}Contexto</TabsTrigger>
    <TabsTrigger value="conversas">${icons ? "<MessageCircleIcon />" : ""}Conversas</TabsTrigger>
    <TabsTrigger value="propostas">${icons ? "<FileTextIcon />" : ""}Propostas</TabsTrigger>
  </TabsList>
  <TabsContent value="contexto">…</TabsContent>
  …
</Tabs>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Em um cartão"
          description="Tabs line no cabeçalho, com contagem em badge."
          previewClassName="block bg-background"
          code={`<TabsList variant="line">
  <TabsTrigger value="todas">Todas <Badge variant="secondary">12</Badge></TabsTrigger>
  …
</TabsList>`}
        >
          <Card className="mx-auto max-w-lg">
            <Tabs defaultValue="todas">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Oportunidades</CardTitle>
                <CardDescription>Perfil Indústria Sudeste</CardDescription>
                <TabsList variant="line" className="mt-2">
                  <TabsTrigger value="todas">
                    Todas <Badge variant="secondary">12</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="prioridade">
                    Prioridade <Badge variant="signal">3</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="descartadas">Descartadas</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="todas" className="text-sm text-muted-foreground">12 empresas com aderência acima de 60%.</TabsContent>
                <TabsContent value="prioridade" className="text-sm text-muted-foreground">3 empresas com aderência acima de 90%.</TabsContent>
                <TabsContent value="descartadas" className="text-sm text-muted-foreground">Nada descartado nesta semana.</TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`}
          usageCode={`<Tabs defaultValue="a">\n  <TabsList>\n    <TabsTrigger value="a">A</TabsTrigger>\n    <TabsTrigger value="b">B</TabsTrigger>\n  </TabsList>\n  <TabsContent value="a">…</TabsContent>\n  <TabsContent value="b">…</TabsContent>\n</Tabs>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Tabs"
          rows={[
            { prop: "value · onValueChange", type: "any", description: "Aba ativa (controlada)." },
            { prop: "defaultValue", type: "any", description: "Aba inicial." },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção da lista e das setas do teclado." },
          ]}
        />
        <PropsTable component="TabsList" rows={[{ prop: "variant", type: '"default" | "line"', default: '"default"', description: "Pílula sobre fundo ou sublinhado." }]} />
        <PropsTable component="TabsTrigger · TabsContent" rows={[{ prop: "value", type: "any", description: "Liga gatilho e painel. Obrigatório." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">tablist</code>, <code className="font-mono text-sm">tab</code> e <code className="font-mono text-sm">tabpanel</code> ligados por ARIA.</>,
            <>A lista é uma parada de <Kbd>Tab</Kbd>; <Kbd>←</Kbd> <Kbd>→</Kbd> (ou <Kbd>↑</Kbd> <Kbd>↓</Kbd> na vertical) trocam de aba.</>,
            <>Não use abas para passos sequenciais — para isso há o Questionnaire.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
