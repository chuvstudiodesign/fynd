"use client"

import { useState } from "react"
import { ArrowUpIcon, CommandIcon, CornerDownLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { ControlText, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function KbdPage() {
  const [keys, setKeys] = useState("⌘ K")
  const parts = keys.split(/\s+/).filter(Boolean)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Utilities"
        title="Kbd"
        description="Representa uma tecla ou combinação. Em mono, com a base mais grossa de uma tecla física — para atalhos em menus, dicas e documentação."
        source="src/components/ui/kbd.tsx"
      />

      <DocSection title="Playground" description="Separe as teclas por espaço.">
        <Playground
          controls={<ControlText label="teclas" value={keys} onChange={setKeys} />}
          preview={
            parts.length > 1 ? (
              <KbdGroup>
                {parts.map((k, i) => (
                  <Kbd key={i}>{k}</Kbd>
                ))}
              </KbdGroup>
            ) : (
              <Kbd>{parts[0] ?? "?"}</Kbd>
            )
          }
          code={parts.length > 1 ? `<KbdGroup>\n${parts.map((k) => `  <Kbd>${k}</Kbd>`).join("\n")}\n</KbdGroup>` : `<Kbd>${parts[0] ?? ""}</Kbd>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-3">
          <Example title="Teclas e ícones" code={`<Kbd><CommandIcon /></Kbd>\n<Kbd>Esc</Kbd>\n<Kbd><CornerDownLeftIcon /></Kbd>`}>
            <Kbd>
              <CommandIcon className="size-3" />
            </Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>
              <ArrowUpIcon className="size-3" />
            </Kbd>
            <Kbd>
              <CornerDownLeftIcon className="size-3" />
            </Kbd>
          </Example>
          <Example title="Em texto" code={`<p>Aperte <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup> para buscar.</p>`}>
            <p className="text-sm text-muted-foreground">
              Aperte{" "}
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>{" "}
              para buscar uma empresa.
            </p>
          </Example>
          <Example title="Em um botão" code={`<Button variant="outline">Salvar <Kbd>⌘S</Kbd></Button>`}>
            <Button variant="outline">
              Salvar perfil
              <Kbd>⌘S</Kbd>
            </Button>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage importCode={`import { Kbd, KbdGroup } from "@/components/ui/kbd"`} usageCode={`<KbdGroup>\n  <Kbd>Ctrl</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>`} />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Kbd · KbdGroup"
          rows={[{ prop: "…props", type: 'React.ComponentProps<"kbd"> · <"div">', description: "Sem props próprias. Ícones dentro de Kbd são dimensionados automaticamente." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Usa o elemento <code className="font-mono text-sm">kbd</code>, que leitores de tela reconhecem como entrada de teclado.</>,
            <>Símbolos como ⌘ e ⇧ podem ser lidos de forma estranha; quando o atalho for importante, escreva também por extenso (“Command K”) em texto oculto.</>,
            <>Mostre o atalho do sistema certo: ⌘ no Mac, Ctrl no Windows.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
