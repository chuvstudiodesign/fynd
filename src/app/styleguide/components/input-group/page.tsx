"use client"

import { useState } from "react"
import { ArrowUpIcon, AtSignIcon, CopyIcon, EyeIcon, EyeOffIcon, InfoIcon, SearchIcon } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Spinner } from "@/components/ui/spinner"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const addons = ["ícone", "texto", "botão", "nenhum"] as const
const aligns = ["inline-start", "inline-end"] as const

export default function InputGroupPage() {
  const [addon, setAddon] = useState<(typeof addons)[number]>("ícone")
  const [align, setAlign] = useState<(typeof aligns)[number]>("inline-start")
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState("")

  const addonNode =
    addon === "ícone" ? <SearchIcon /> : addon === "texto" ? <InputGroupText>https://</InputGroupText> : addon === "botão" ? <InputGroupButton>Buscar</InputGroupButton> : null
  const addonCode =
    addon === "ícone" ? "<SearchIcon />" : addon === "texto" ? "<InputGroupText>https://</InputGroupText>" : addon === "botão" ? "<InputGroupButton>Buscar</InputGroupButton>" : ""

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Input Group"
        description="Campo com complementos: ícone, prefixo, botão, contador ou atalho. Tudo dentro da mesma pílula, com um único anel de foco."
        source="src/components/ui/input-group.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="addon" value={addon} options={addons} onChange={setAddon} />
              <ControlSegment label="align" value={align} options={aligns} onChange={setAlign} />
              <ControlToggle label="carregando" checked={loading} onChange={setLoading} />
            </>
          }
          preview={
            <InputGroup className="max-w-sm">
              <InputGroupInput placeholder="Buscar empresa" aria-label="Buscar empresa" />
              {addonNode && <InputGroupAddon align={align}>{addonNode}</InputGroupAddon>}
              {loading && (
                <InputGroupAddon align="inline-end">
                  <Spinner />
                </InputGroupAddon>
              )}
            </InputGroup>
          }
          code={`<InputGroup>
  <InputGroupInput placeholder="Buscar empresa" />${addonCode ? `\n  <InputGroupAddon align="${align}">${addonCode}</InputGroupAddon>` : ""}${loading ? `\n  <InputGroupAddon align="inline-end"><Spinner /></InputGroupAddon>` : ""}
</InputGroup>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Busca com atalho"
            code={`<InputGroup>
  <InputGroupInput placeholder="Buscar…" />
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
  <InputGroupAddon align="inline-end"><Kbd>⌘K</Kbd></InputGroupAddon>
</InputGroup>`}
          >
            <InputGroup>
              <InputGroupInput placeholder="Buscar empresa ou ação…" aria-label="Buscar" />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>⌘K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example
            title="Senha com mostrar/ocultar"
            code={`<InputGroupButton size="icon-xs" aria-label={show ? "Ocultar senha" : "Mostrar senha"} onClick={…}>
  {show ? <EyeOffIcon /> : <EyeIcon />}
</InputGroupButton>`}
          >
            <InputGroup>
              <InputGroupInput type={show ? "text" : "password"} defaultValue="fynd2026" aria-label="Senha" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" aria-label={show ? "Ocultar senha" : "Mostrar senha"} onClick={() => setShow((s) => !s)}>
                  {show ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example
            title="Prefixo e ação"
            code={`<InputGroupAddon><AtSignIcon /></InputGroupAddon>
<InputGroupAddon align="inline-end">
  <InputGroupButton size="icon-xs" aria-label="Copiar"><CopyIcon /></InputGroupButton>
</InputGroupAddon>`}
          >
            <InputGroup>
              <InputGroupAddon>
                <AtSignIcon />
              </InputGroupAddon>
              <InputGroupInput defaultValue="mariana.pillati" aria-label="Usuário" readOnly />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-xs" aria-label="Copiar usuário">
                  <CopyIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Example>

          <Example
            title="Com dica"
            code={`<InputGroupAddon align="inline-end"><InfoIcon /></InputGroupAddon>`}
          >
            <InputGroup>
              <InputGroupInput placeholder="Faturamento anual" aria-label="Faturamento anual" inputMode="numeric" />
              <InputGroupAddon>
                <InputGroupText>R$</InputGroupText>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupText>mi</InputGroupText>
                <InfoIcon aria-label="Valor em milhões" />
              </InputGroupAddon>
            </InputGroup>
          </Example>
        </div>
        <Example
          title="Caixa de conversa"
          description="Textarea com barra de ações abaixo (block-end). É o compositor da conversa de perfil ideal."
          previewClassName="block"
          code={`<InputGroup>
  <InputGroupTextarea placeholder="Descreva seu cliente ideal…" />
  <InputGroupAddon align="block-end">
    <InputGroupText>{msg.length}/500</InputGroupText>
    <InputGroupButton variant="default" size="icon-sm" className="ml-auto" aria-label="Enviar">
      <ArrowUpIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`}
        >
          <InputGroup className="mx-auto max-w-xl">
            <InputGroupTextarea
              placeholder="Descreva seu cliente ideal: setor, porte, região…"
              aria-label="Mensagem"
              value={msg}
              maxLength={500}
              onChange={(e) => setMsg(e.target.value)}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="font-mono text-xs">{msg.length}/500</InputGroupText>
              <InputGroupButton variant="default" size="icon-sm" className="ml-auto rounded-full" aria-label="Enviar" disabled={!msg.trim()}>
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"`}
          usageCode={`<InputGroup>
  <InputGroupInput placeholder="Buscar" />
  <InputGroupAddon><SearchIcon /></InputGroupAddon>
</InputGroup>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="InputGroupAddon"
          rows={[{ prop: "align", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', default: '"inline-start"', description: "Posição do complemento. block-* coloca acima/abaixo (use com textarea)." }]}
        />
        <PropsTable
          component="InputGroupButton"
          rows={[
            { prop: "size", type: '"xs" | "sm" | "icon-xs" | "icon-sm"', default: '"xs"', description: "Tamanho do botão interno." },
            { prop: "variant", type: "Button variant", default: '"ghost"', description: "Estilo do botão." },
          ]}
        />
        <PropsTable
          component="InputGroupInput · InputGroupTextarea · InputGroupText"
          rows={[{ prop: "…props", type: "props nativas", description: "Input e textarea sem borda própria; InputGroupText é texto de apoio." }]}
        />
        <p className="text-sm text-muted-foreground">
          A ordem no JSX não importa: o <code className="font-mono">align</code> do addon define a posição visual. Com textarea ou addons
          block-*, o grupo troca a pílula por cantos de 12px.
        </p>
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O input precisa de rótulo próprio (FieldLabel ou <code className="font-mono text-sm">aria-label</code>) — ícones não rotulam.</>,
            <>Botões só com ícone dentro do grupo precisam de <code className="font-mono text-sm">aria-label</code> que mude com o estado (“Mostrar/Ocultar senha”).</>,
            <>Clicar em qualquer parte do grupo foca o campo; o anel de foco envolve o grupo inteiro.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
