"use client"

import { useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Checkbox } from "@/components/ui/checkbox"
import { DirectionProvider } from "@/components/ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const dirs = ["ltr", "rtl"] as const

export default function DirectionPage() {
  const [dir, setDir] = useState<(typeof dirs)[number]>("rtl")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Utilities"
        title="Direction"
        description="Provedor que informa a direção do texto aos componentes do Base UI. A fynd é em português (esquerda → direita); este componente só é necessário se o produto ganhar idiomas da direita para a esquerda, como árabe ou hebraico."
        source="src/components/ui/direction.tsx"
      />

      <DocSection
        title="Playground"
        description="Alterne a direção. Layout (via atributo dir), navegação por teclado, submenus e setas se espelham juntos."
      >
        <Playground
          controls={<ControlSegment label="direction" value={dir} options={dirs} onChange={setDir} />}
          previewClassName="block"
          preview={
            <DirectionProvider direction={dir}>
              <div dir={dir} className="mx-auto flex max-w-md flex-col gap-6">
                <ButtonGroup>
                  <Button variant="outline">Semana</Button>
                  <Button variant="outline">Mês</Button>
                  <Button variant="outline">Trimestre</Button>
                </ButtonGroup>
                <Label className="gap-2">
                  <Checkbox defaultChecked />
                  Receber novos sinais
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="secondary" className="self-start" />}>Ações</DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Iniciar conversa</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Atribuir a</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Mariana</DropdownMenuItem>
                        <DropdownMenuItem>Lucas</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Accordion variant="contained" defaultValue={["a"]}>
                  <AccordionItem value="a">
                    <AccordionTrigger>Como a fynd encontra as empresas certas?</AccordionTrigger>
                    <AccordionContent>Cruzando o seu perfil de cliente ideal com bases empresariais.</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button className="self-start">
                  Ver contexto
                  <ArrowRightIcon data-icon="inline-end" className="rtl:rotate-180" />
                </Button>
              </div>
            </DirectionProvider>
          }
          code={`<DirectionProvider direction="${dir}">
  <div dir="${dir}">
    {/* componentes */}
  </div>
</DirectionProvider>`}
        />
      </DocSection>

      <DocSection title="Na aplicação">
        <Usage
          importCode={`import { DirectionProvider } from "@/components/ui/direction"`}
          usageCode={`// app/layout.tsx — defina dir no <html> e no provedor
export default function RootLayout({ children }) {
  const dir = "rtl" // derive do idioma
  return (
    <html lang="ar" dir={dir}>
      <body>
        <DirectionProvider direction={dir}>{children}</DirectionProvider>
      </body>
    </html>
  )
}`}
        />
        <div className="flex max-w-2xl flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Por que os dois?</strong> O atributo <code className="font-mono">dir</code> espelha o layout
            (CSS, flex, texto). O <code className="font-mono">DirectionProvider</code> informa o JavaScript dos componentes — qual seta abre
            submenus, para que lado o carrossel e os sliders andam.
          </p>
          <p>
            Ícones direcionais (setas) precisam de <code className="font-mono">rtl:rotate-180</code>. Prefira classes lógicas do Tailwind
            (<code className="font-mono">ms-*</code>, <code className="font-mono">pe-*</code>, <code className="font-mono">start-*</code>) em vez
            de <code className="font-mono">ml-*</code>/<code className="font-mono">left-*</code>.
          </p>
        </div>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="DirectionProvider"
          rows={[
            { prop: "direction", type: '"ltr" | "rtl"', default: '"ltr"', description: "Direção lida pelos componentes do Base UI." },
            { prop: "children", type: "ReactNode", description: "Árvore que herda a direção." },
          ]}
        />
        <PropsTable
          component="useDirection()"
          rows={[{ prop: "retorno", type: '"ltr" | "rtl"', description: "Lê a direção atual dentro de um componente próprio." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Sempre defina <code className="font-mono text-sm">lang</code> e <code className="font-mono text-sm">dir</code> no <code className="font-mono text-sm">html</code>: leitores de tela usam os dois.</>,
            <>Em RTL, as setas do teclado se invertem em menus e carrosséis — o provedor cuida disso.</>,
            <>Números, CNPJs e e-mails continuam LTR dentro de texto RTL; use <code className="font-mono text-sm">dir=&quot;ltr&quot;</code> ou <code className="font-mono text-sm">{"<bdi>"}</code> neles.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
