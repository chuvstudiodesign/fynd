"use client"

import { useState } from "react"
import { ArrowRightIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"
import { ControlSegment, ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "signal", "secondary", "outline", "ghost", "link", "destructive"] as const
const sizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const
const iconPositions = ["nenhum", "início", "fim"] as const

export default function ButtonPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("default")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [iconPos, setIconPos] = useState<(typeof iconPositions)[number]>("fim")
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState("Ver contexto")

  const [saving, setSaving] = useState(false)
  function simulate() {
    setSaving(true)
    setTimeout(() => setSaving(false), 1800)
  }

  const props = `${variant !== "default" ? ` variant="${variant}"` : ""}${size !== "default" ? ` size="${size}"` : ""}${loading ? " loading" : ""}${disabled ? " disabled" : ""}`
  const code = `<${loading ? "LoadingButton" : "Button"}${props}>${iconPos === "início" ? `\n  <PlusIcon data-icon="inline-start" />` : ""}${iconPos !== "nenhum" ? "\n  " : ""}${label}${iconPos === "fim" ? `\n  <ArrowRightIcon data-icon="inline-end" />` : ""}${iconPos !== "nenhum" ? "\n" : ""}</${loading ? "LoadingButton" : "Button"}>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Button"
        description="A ação. Em pílula, como no Figma. A primária é azul profundo; signal (ciano) é para a ação mais importante da tela — no máximo uma por vez."
        source={["src/components/ui/button.tsx", "src/components/loading-button.tsx"]}
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="ícone" value={iconPos} options={iconPositions} onChange={setIconPos} />
              <ControlToggle label="loading" checked={loading} onChange={setLoading} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
              <ControlText label="texto" value={label} onChange={setLabel} />
            </>
          }
          preview={
            <LoadingButton variant={variant} size={size} loading={loading} disabled={disabled}>
              {iconPos === "início" && !loading && <PlusIcon data-icon="inline-start" />}
              {label}
              {iconPos === "fim" && <ArrowRightIcon data-icon="inline-end" />}
            </LoadingButton>
          }
          code={code}
        />
      </DocSection>

      <DocSection title="Variantes" description="signal é extensão da fynd. destructive é tingido para não competir com a ação primária.">
        <Example code={variants.map((v) => `<Button variant="${v}">${v}</Button>`).join("\n")}>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Example>
      </DocSection>

      <DocSection title="Tamanhos" description="Altura de 28 a 48px. default (40px) é o padrão de interface; lg (48px) é para chamadas em landing pages.">
        <div className="grid gap-8">
          <Example code={sizes.map((s) => `<Button size="${s}">${s}</Button>`).join("\n")}>
            {sizes.map((s) => (
              <Button key={s} size={s}>
                {s}
              </Button>
            ))}
          </Example>
          <Example
            title="Só ícone"
            description="Sempre com aria-label."
            code={iconSizes.map((s) => `<Button size="${s}" variant="outline" aria-label="Buscar"><SearchIcon /></Button>`).join("\n")}
          >
            {iconSizes.map((s) => (
              <Button key={s} size={s} variant="outline" aria-label="Buscar">
                <SearchIcon />
              </Button>
            ))}
          </Example>
        </div>
      </DocSection>

      <DocSection title="Estados">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Hover, focus e active"
            description={"Passe o mouse, use Tab para ver o anel de foco e clique para o leve deslocamento."}
            code={`<Button>Padrão</Button>`}
          >
            <Button>Padrão</Button>
            <Button variant="signal">Signal</Button>
            <Button variant="outline">Outline</Button>
          </Example>
          <Example title="Desabilitado" code={`<Button disabled>Indisponível</Button>`}>
            <Button disabled>Indisponível</Button>
            <Button variant="outline" disabled>
              Indisponível
            </Button>
          </Example>
          <Example
            title="Carregando"
            description="LoadingButton desabilita, mostra o spinner e marca aria-busy."
            code={`<LoadingButton loading={saving} loadingText="Salvando…" onClick={salvar}>
  Salvar perfil
</LoadingButton>`}
          >
            <LoadingButton loading={saving} loadingText="Salvando…" onClick={simulate}>
              Salvar perfil
            </LoadingButton>
            <LoadingButton variant="outline" loading>
              Carregando
            </LoadingButton>
          </Example>
          <Example
            title="Com ícones"
            code={`<Button><PlusIcon data-icon="inline-start" />Nova lista</Button>
<Button variant="signal">Iniciar conversa<ArrowRightIcon data-icon="inline-end" /></Button>`}
          >
            <Button>
              <PlusIcon data-icon="inline-start" />
              Nova lista
            </Button>
            <Button variant="signal">
              Iniciar conversa
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button variant="destructive">
              <Trash2Icon data-icon="inline-start" />
              Remover
            </Button>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Como link" description="render mantém o estilo e troca o elemento. Use para navegação.">
        <Example code={`<Button render={<a href="/contato" />} nativeButton={false}>Fale com a gente</Button>`}>
          <Button render={<a href="#" />} nativeButton={false}>
            Fale com a gente
          </Button>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/loading-button"`}
          usageCode={`<Button variant="signal" size="lg">
  Iniciar conversa
  <ArrowRightIcon data-icon="inline-end" />
</Button>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Button"
          rows={[
            { prop: "variant", type: '"default" | "signal" | "secondary" | "outline" | "ghost" | "link" | "destructive"', default: '"default"', description: "Estilo e hierarquia." },
            { prop: "size", type: '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"', default: '"default"', description: "Altura e espaçamento." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o botão." },
            { prop: "render", type: "ReactElement", description: "Renderiza como outro elemento (p. ex. <a />). Combine com nativeButton={false}." },
            { prop: "nativeButton", type: "boolean", default: "true", description: "false quando render não é um <button>." },
          ]}
        />
        <PropsTable
          component="LoadingButton"
          rows={[
            { prop: "loading", type: "boolean", default: "false", description: "Mostra o spinner, desabilita e define aria-busy." },
            { prop: "loadingText", type: "ReactNode", description: "Texto alternativo enquanto carrega." },
            { prop: "…props", type: "ButtonProps", description: "Todas as props do Button." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Elemento <code className="font-mono text-sm">button</code> nativo: <Kbd>Enter</Kbd> e <Kbd>Espaço</Kbd> ativam; foco visível com anel de 3px na cor ring.</>,
            <>Botões só com ícone precisam de <code className="font-mono text-sm">aria-label</code>.</>,
            <>Rótulos dizem a ação (“Salvar perfil”), não “OK” ou “Clique aqui”.</>,
            <>Para navegar entre páginas, use <code className="font-mono text-sm">render={"{<a />}"}</code> ou Link — não um botão com onClick.</>,
            <>Contraste: azul profundo sobre papel ≈ 15:1; texto escuro sobre ciano ≈ 9:1.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
