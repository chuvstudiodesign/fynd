"use client"

import { useState } from "react"
import { Text } from "@/components/typography"
import { ControlSegment, ControlText, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["display", "h1", "h2", "h3", "h4", "lead", "p", "large", "small", "muted", "eyebrow", "data", "blockquote"] as const
type V = (typeof variants)[number]

const samples: Record<V, string> = {
  display: "Ilumine as oportunidades certas.",
  h1: "Encontre o próximo sinal.",
  h2: "Clareza em meio ao volume",
  h3: "Oportunidades da semana",
  h4: "Empresa Exemplo",
  lead: "Empresas priorizadas a partir do seu perfil de cliente ideal, com contexto para iniciar uma conversa comercial relevante.",
  p: "A fynd cruza o perfil de cliente ideal com bases empresariais e apoia o contato inicial, para que o time comercial priorize oportunidades mais qualificadas.",
  large: "12 empresas encontradas",
  small: "Indústria · 320 pessoas",
  muted: "Atualizado há 2 horas",
  eyebrow: "Aderência ao perfil",
  data: "92%",
  blockquote: "Mais dados não resolvem uma operação comercial; clareza sobre onde agir resolve.",
}

const specs: Record<V, string> = {
  display: "Sora Light · 48→72 · h1",
  h1: "Sora Light · 36→56 · h1",
  h2: "Sora Light · 30→40 · h2",
  h3: "Sora Regular · 24→28 · h3",
  h4: "Sora Regular · 20 · h4",
  lead: "Manrope · 18→22 · p",
  p: "Manrope · 16/1.6 · p",
  large: "Manrope SemiBold · 18 · div",
  small: "Manrope Medium · 14 · small",
  muted: "Manrope · 14 · p",
  eyebrow: "Plex Mono · 12 · caixa alta · span",
  data: "Plex Mono · tabular · span",
  blockquote: "Sora Light · 20 · borda ciano · blockquote",
}

export default function TypographyPage() {
  const [variant, setVariant] = useState<V>("h1")
  const [text, setText] = useState(samples.h1)

  return (
    <ShowcasePage>
      <PageHeader
        category="Foundation · Typography"
        title="Typography"
        description="A escala tipográfica da fynd como componente. Sora para títulos e ideias, Manrope para leitura e interface, IBM Plex Mono para dados e rótulos. O shadcn não tem este componente pronto — ele foi criado para a fynd."
        source="src/components/typography.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment
                label="variant"
                value={variant}
                options={variants}
                onChange={(v) => {
                  setVariant(v)
                  setText(samples[v])
                }}
              />
              <ControlText label="texto" value={text} onChange={setText} />
            </>
          }
          previewClassName="block"
          preview={
            <div className="mx-auto max-w-2xl">
              <Text variant={variant}>{text}</Text>
            </div>
          }
          code={`<Text variant="${variant}">${text}</Text>`}
        />
      </DocSection>

      <DocSection title="Escala">
        <div className="flex flex-col divide-y divide-border rounded-xl border bg-card">
          {variants.map((v) => (
            <div key={v} className="grid grid-cols-[9rem_1fr] items-baseline gap-6 px-6 py-5">
              <div className="flex flex-col gap-1">
                <code className="font-mono text-sm font-medium">{v}</code>
                <span className="font-mono text-[0.625rem] text-muted-foreground">{specs[v]}</span>
              </div>
              <Text variant={v} className="mt-0!">
                {samples[v]}
              </Text>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Exemplos">
        <Example
          title="Composição editorial"
          description="Como os papéis se combinam numa seção de página."
          previewClassName="block"
          code={`<Text variant="eyebrow">Posicionamento</Text>
<Text variant="h2">Menos lista fria. Mais clareza para vender.</Text>
<Text variant="lead">…</Text>
<Text>…</Text>
<Text variant="list" render={<ul />}><li>…</li></Text>
<Text variant="blockquote">…</Text>`}
        >
          <article className="mx-auto flex max-w-2xl flex-col gap-4">
            <Text variant="eyebrow">Posicionamento</Text>
            <Text variant="h2">Menos lista fria. Mais clareza para vender.</Text>
            <Text variant="lead">
              A fynd ilumina oportunidades comerciais dentro de dados empresariais, ajudando times B2B a encontrar empresas com maior potencial de
              compra.
            </Text>
            <Text>
              Em vez de começar por listas frias e configurações demoradas, ela começa por uma conversa clara e aponta o próximo caminho. Use{" "}
              <Text variant="code">{"<Text variant=\"code\">"}</Text> para trechos técnicos no meio do texto.
            </Text>
            <Text variant="list">
              <li>Clareza antes de volume</li>
              <li>Inteligência aplicável</li>
              <li>Confiança nos dados</li>
            </Text>
            <Text variant="blockquote">Mais dados não resolvem uma operação comercial; clareza sobre onde agir resolve.</Text>
          </article>
        </Example>
        <Example
          title="Trocar o elemento"
          description="render muda a tag HTML sem mudar o visual — um h2 com cara de display, por exemplo."
          previewClassName="block"
          code={`<Text variant="display" render={<h2 />}>…</Text>`}
        >
          <Text variant="display" render={<h2 />} className="text-center">
            fynd.
          </Text>
        </Example>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Text, textVariants } from "@/components/typography"`}
          usageCode={`<Text variant="h1">Título</Text>
<Text variant="lead">Chamada</Text>
<Text>Parágrafo</Text>

// Só as classes, em outro componente:
<span className={textVariants({ variant: "eyebrow" })}>Rótulo</span>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Text"
          rows={[
            { prop: "variant", type: variants.map((v) => `"${v}"`).join(" | ") + ' | "list" | "code"', default: '"p"', description: "Papel tipográfico. Define estilo e a tag HTML padrão." },
            { prop: "render", type: "ReactElement", description: "Troca a tag mantendo o estilo (hierarquia semântica ≠ visual)." },
            { prop: "className", type: "string", description: "Ajustes pontuais." },
          ]}
        />
        <PropsTable component="textVariants()" rows={[{ prop: "{ variant }", type: "cva", description: "Retorna as classes, para aplicar a outros elementos." }]} />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>A tag padrão segue o papel (h1…h4, p, blockquote, ul). Mantenha a ordem dos headings sem pular níveis — use <code className="font-mono text-sm">render</code> quando o visual e a hierarquia divergirem.</>,
            <>Corpo em 16px com entrelinha 1,6; texto de apoio em cinza azulado com contraste ≥ 4,5:1.</>,
            <>Um único <code className="font-mono text-sm">h1</code> por página.</>,
            <>Ciano só como detalhe (a borda do blockquote), nunca como cor de texto sobre fundo claro.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
