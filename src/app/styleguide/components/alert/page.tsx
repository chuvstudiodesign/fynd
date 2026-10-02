"use client"

import { useState } from "react"
import { CheckCircle2Icon, InfoIcon, TriangleAlertIcon, XCircleIcon, SparklesIcon } from "lucide-react"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ControlSegment, ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "info", "success", "warning", "destructive"] as const
type Variant = (typeof variants)[number]

const icons: Record<Variant, React.ElementType> = {
  default: SparklesIcon,
  info: InfoIcon,
  success: CheckCircle2Icon,
  warning: TriangleAlertIcon,
  destructive: XCircleIcon,
}

const iconNames: Record<Variant, string> = {
  default: "SparklesIcon",
  info: "InfoIcon",
  success: "CheckCircle2Icon",
  warning: "TriangleAlertIcon",
  destructive: "XCircleIcon",
}

const samples: Record<Variant, { title: string; description: string }> = {
  default: { title: "Novo sinal encontrado", description: "3 empresas passaram a combinar com o seu perfil ideal esta semana." },
  info: { title: "Base atualizada", description: "Novos CNPJs da Receita Federal foram cruzados com o seu perfil." },
  success: { title: "Perfil salvo", description: "12 empresas com aderência acima de 80%." },
  warning: { title: "Contato incompleto", description: "Revise o responsável antes de iniciar a conversa." },
  destructive: { title: "Falha na importação", description: "O arquivo não segue o formato esperado." },
}

export default function AlertPage() {
  const [variant, setVariant] = useState<Variant>("info")
  const [withIcon, setWithIcon] = useState(true)
  const [withAction, setWithAction] = useState(false)
  const [title, setTitle] = useState(samples.info.title)

  const Icon = icons[variant]
  const code = `<Alert${variant !== "default" ? ` variant="${variant}"` : ""}>${withIcon ? `\n  <${iconNames[variant]} />` : ""}
  <AlertTitle>${title}</AlertTitle>
  <AlertDescription>${samples[variant].description}</AlertDescription>${withAction ? `\n  <AlertAction>\n    <Button size="xs" variant="outline">Ver</Button>\n  </AlertAction>` : ""}
</Alert>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Feedback"
        title="Alert"
        description="Mensagem em linha que chama atenção sem interromper. Cada variante tem uma função: informar, confirmar, alertar ou apontar um erro."
        source="src/components/ui/alert.tsx"
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
                  setTitle(samples[v].title)
                }}
              />
              <ControlToggle label="ícone" checked={withIcon} onChange={setWithIcon} />
              <ControlToggle label="ação" checked={withAction} onChange={setWithAction} />
              <ControlText label="título" value={title} onChange={setTitle} />
            </>
          }
          preview={
            <Alert variant={variant} className="max-w-lg">
              {withIcon && <Icon />}
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{samples[variant].description}</AlertDescription>
              {withAction && (
                <AlertAction>
                  <Button size="xs" variant="outline">
                    Ver
                  </Button>
                </AlertAction>
              )}
            </Alert>
          }
          code={code}
        />
      </DocSection>

      <DocSection
        title="Variantes"
        description="info, success e warning são extensões da fynd sobre os tokens semânticos. O ciano não é usado em alertas: sinal é reservado para prioridade, não para feedback."
      >
        <Example
          previewClassName="flex-col items-stretch"
          code={variants
            .map((v) => `<Alert${v !== "default" ? ` variant="${v}"` : ""}>\n  <${iconNames[v]} />\n  <AlertTitle>…</AlertTitle>\n  <AlertDescription>…</AlertDescription>\n</Alert>`)
            .join("\n\n")}
        >
          {variants.map((v) => {
            const I = icons[v]
            return (
              <Alert key={v} variant={v}>
                <I />
                <AlertTitle>{samples[v].title}</AlertTitle>
                <AlertDescription>{samples[v].description}</AlertDescription>
              </Alert>
            )
          })}
        </Example>
      </DocSection>

      <DocSection title="Composição">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Só título"
            description="Para mensagens curtas, dispense a descrição."
            code={`<Alert variant="success">\n  <CheckCircle2Icon />\n  <AlertTitle>Conversa iniciada</AlertTitle>\n</Alert>`}
          >
            <Alert variant="success">
              <CheckCircle2Icon />
              <AlertTitle>Conversa iniciada</AlertTitle>
            </Alert>
          </Example>
          <Example
            title="Com ação"
            description="AlertAction fixa um botão no canto superior direito."
            code={`<Alert>\n  <SparklesIcon />\n  <AlertTitle>Novo sinal encontrado</AlertTitle>\n  <AlertDescription>…</AlertDescription>\n  <AlertAction>\n    <Button size="xs" variant="outline">Ver</Button>\n  </AlertAction>\n</Alert>`}
          >
            <Alert>
              <SparklesIcon />
              <AlertTitle>Novo sinal encontrado</AlertTitle>
              <AlertDescription>3 empresas passaram a combinar com o seu perfil.</AlertDescription>
              <AlertAction>
                <Button size="xs" variant="outline">
                  Ver
                </Button>
              </AlertAction>
            </Alert>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"`}
          usageCode={`<Alert variant="info">
  <InfoIcon />
  <AlertTitle>Base atualizada</AlertTitle>
  <AlertDescription>Novos CNPJs foram cruzados com o seu perfil.</AlertDescription>
</Alert>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Alert"
          rows={[
            { prop: "variant", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "Função da mensagem. info, success e warning são extensões da fynd." },
            { prop: "className", type: "string", description: "Classes extras para o contêiner." },
          ]}
        />
        <PropsTable
          component="AlertTitle · AlertDescription · AlertAction"
          rows={[
            { prop: "…props", type: 'React.ComponentProps<"div">', description: "Aceitam todas as props de div. Um svg como filho direto do Alert vira o ícone." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O contêiner tem <code className="font-mono text-sm">role=&quot;alert&quot;</code>: leitores de tela anunciam o conteúdo assim que ele aparece. Use para mensagens importantes, não para texto estático decorativo.</>,
            <>Nunca dependa só da cor: o ícone e o título precisam comunicar a função (sucesso, atenção, erro).</>,
            <>Contraste de texto de cada variante é ≥ 4,5:1 sobre o fundo tingido, nos dois temas.</>,
            <>Ações dentro do alerta devem ter rótulo claro; evite “Clique aqui”.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
