"use client"

import { useState } from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutGridIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const orientations = ["horizontal", "vertical"] as const
const variants = ["outline", "secondary", "default"] as const
const sizes = ["sm", "default", "lg"] as const

export default function ButtonGroupPage() {
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")
  const [variant, setVariant] = useState<(typeof variants)[number]>("outline")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [view, setView] = useState<"lista" | "grade">("lista")
  const [count, setCount] = useState(3)

  const btn = `variant="${variant}"${size !== "default" ? ` size="${size}"` : ""}`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Button Group"
        description="Agrupa ações relacionadas em um só bloco: alternar visualizações, paginar, ajustar quantidades. As pontas mantêm a pílula da marca."
        source="src/components/ui/button-group.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
              <ControlSegment label="variant (botões)" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="size (botões)" value={size} options={sizes} onChange={setSize} />
            </>
          }
          preview={
            <ButtonGroup orientation={orientation}>
              <Button variant={variant} size={size}>
                Semana
              </Button>
              <Button variant={variant} size={size}>
                Mês
              </Button>
              <Button variant={variant} size={size}>
                Trimestre
              </Button>
            </ButtonGroup>
          }
          code={`<ButtonGroup${orientation !== "horizontal" ? ` orientation="${orientation}"` : ""}>
  <Button ${btn}>Semana</Button>
  <Button ${btn}>Mês</Button>
  <Button ${btn}>Trimestre</Button>
</ButtonGroup>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Alternar visualização"
            description="aria-pressed indica o estado de cada opção."
            code={`<ButtonGroup aria-label="Visualização">
  <Button variant={view === "lista" ? "secondary" : "outline"} aria-pressed={view === "lista"}>…</Button>
  <Button variant={view === "grade" ? "secondary" : "outline"} aria-pressed={view === "grade"}>…</Button>
</ButtonGroup>`}
          >
            <ButtonGroup aria-label="Visualização">
              <Button variant={view === "lista" ? "secondary" : "outline"} aria-pressed={view === "lista"} onClick={() => setView("lista")}>
                <ListIcon data-icon="inline-start" />
                Lista
              </Button>
              <Button variant={view === "grade" ? "secondary" : "outline"} aria-pressed={view === "grade"} onClick={() => setView("grade")}>
                <LayoutGridIcon data-icon="inline-start" />
                Grade
              </Button>
            </ButtonGroup>
          </Example>

          <Example
            title="Contador"
            description="ButtonGroupText mostra um valor entre ações."
            code={`<ButtonGroup>
  <Button variant="outline" size="icon" aria-label="Diminuir"><MinusIcon /></Button>
  <ButtonGroupText>{count} contatos</ButtonGroupText>
  <Button variant="outline" size="icon" aria-label="Aumentar"><PlusIcon /></Button>
</ButtonGroup>`}
          >
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="Diminuir" onClick={() => setCount((c) => Math.max(0, c - 1))}>
                <MinusIcon />
              </Button>
              <ButtonGroupText aria-live="polite">{count} contatos</ButtonGroupText>
              <Button variant="outline" size="icon" aria-label="Aumentar" onClick={() => setCount((c) => c + 1)}>
                <PlusIcon />
              </Button>
            </ButtonGroup>
          </Example>

          <Example
            title="Ação dividida"
            description="Ação principal + menu de opções, separados por ButtonGroupSeparator."
            code={`<ButtonGroup>
  <Button>Iniciar conversa</Button>
  <ButtonGroupSeparator />
  <Button size="icon" aria-label="Mais opções"><ChevronDownIcon /></Button>
</ButtonGroup>`}
          >
            <ButtonGroup>
              <Button>Iniciar conversa</Button>
              <ButtonGroupSeparator className="bg-primary-foreground/25" />
              <Button size="icon" aria-label="Mais opções">
                <ChevronDownIcon />
              </Button>
            </ButtonGroup>
          </Example>

          <Example
            title="Paginação"
            code={`<ButtonGroup aria-label="Paginação">
  <Button variant="outline" size="icon" aria-label="Anterior"><ChevronLeftIcon /></Button>
  <Button variant="outline">1</Button>
  …
</ButtonGroup>`}
          >
            <ButtonGroup aria-label="Paginação">
              <Button variant="outline" size="icon" aria-label="Página anterior">
                <ChevronLeftIcon />
              </Button>
              <Button variant="secondary" aria-current="page">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline" size="icon" aria-label="Próxima página">
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>
          </Example>

          <Example
            title="Com campo de busca"
            description="Inputs dentro do grupo ocupam o espaço restante."
            code={`<ButtonGroup className="w-full">
  <input … />
  <Button variant="outline" size="icon" aria-label="Buscar"><SearchIcon /></Button>
</ButtonGroup>`}
          >
            <ButtonGroup className="w-full max-w-sm">
              <input
                data-slot="input"
                aria-label="Buscar empresa"
                placeholder="Buscar empresa"
                className="h-10 min-w-0 rounded-l-full border border-input bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <Button variant="outline" size="icon" aria-label="Buscar">
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </Example>

          <Example
            title="Vertical"
            code={`<ButtonGroup orientation="vertical">…</ButtonGroup>`}
          >
            <ButtonGroup orientation="vertical" aria-label="Zoom">
              <Button variant="outline" size="icon" aria-label="Aproximar">
                <PlusIcon />
              </Button>
              <Button variant="outline" size="icon" aria-label="Afastar">
                <MinusIcon />
              </Button>
            </ButtonGroup>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"`}
          usageCode={`<ButtonGroup aria-label="Período">
  <Button variant="outline">Semana</Button>
  <Button variant="outline">Mês</Button>
</ButtonGroup>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="ButtonGroup"
          rows={[
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção do agrupamento. As pontas ficam em pílula." },
            { prop: "aria-label", type: "string", description: "Nome do grupo, anunciado pelo leitor de tela." },
          ]}
        />
        <PropsTable
          component="ButtonGroupText"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza como outro elemento (p. ex. <label />)." }]}
        />
        <PropsTable
          component="ButtonGroupSeparator"
          rows={[{ prop: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Direção da linha divisória." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O contêiner tem <code className="font-mono text-sm">role=&quot;group&quot;</code>; dê um <code className="font-mono text-sm">aria-label</code> que descreva o conjunto.</>,
            <>Em alternâncias, use <code className="font-mono text-sm">aria-pressed</code> em cada botão para comunicar qual está ativo.</>,
            <>Cada botão continua sendo uma parada de Tab. Para seleção única com setas, prefira um Radio Group ou Toggle Group.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
