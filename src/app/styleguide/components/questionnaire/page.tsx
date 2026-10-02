"use client"

import { useState } from "react"
import { CheckCircle2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const items = [
  { name: "setor", required: true, choices: [{ value: "industria" }, { value: "servicos" }, { value: "varejo" }] },
  { name: "sinais", choices: [{ value: "expansao" }, { value: "contratacao" }, { value: "investimento" }] },
  { name: "porte", required: true, choices: [{ value: "pequena" }, { value: "media" }, { value: "grande" }] },
] as const

const shortcutsOpts = ["letters", "numbers", "nenhum"] as const

type Result = { setor: string | null; sinais: string[]; porte: string | null }

export default function QuestionnairePage() {
  const [shortcuts, setShortcuts] = useState<(typeof shortcutsOpts)[number]>("letters")
  const [result, setResult] = useState<Result | null>(null)
  const [run, setRun] = useState(0)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setResult({
      setor: (fd.get("setor") as string) ?? null,
      sinais: fd.getAll("sinais") as string[],
      porte: (fd.get("porte") as string) ?? null,
    })
  }

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Questionnaire"
        description="Perguntas uma por vez, com escolhas, resposta livre, pular e voltar. É o formato natural para a fynd entender o perfil de cliente ideal — uma conversa guiada, não um formulário longo."
        source="src/components/ui/questionnaire.tsx"
      />

      <DocSection
        title="Playground"
        description="Responda com o mouse ou pelo teclado: letras/números escolhem, Enter avança, ← volta."
      >
        <Playground
          controls={<ControlSegment label="shortcuts" value={shortcuts} options={shortcutsOpts} onChange={(v) => { setShortcuts(v); setRun((r) => r + 1); setResult(null) }} />}
          previewClassName="block"
          preview={
            <Card className="mx-auto max-w-lg">
              {result ? (
                <CardContent className="flex flex-col items-start gap-4 py-2">
                  <CheckCircle2Icon className="size-6 text-success" />
                  <div className="flex flex-col gap-1">
                    <span className="font-heading text-xl">Perfil salvo.</span>
                    <span className="text-sm text-muted-foreground">
                      Setor: {result.setor ?? "—"} · Sinais: {result.sinais.join(", ") || "pulado"} · Porte: {result.porte ?? "—"}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResult(null)
                      setRun((r) => r + 1)
                    }}
                  >
                    Responder de novo
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader>
                    <span className="font-mono text-xs tracking-label text-navy-600 uppercase dark:text-steel-300">Perfil de cliente ideal</span>
                  </CardHeader>
                  <CardContent>
                    <Questionnaire
                      key={`${shortcuts}-${run}`}
                      defaultItem="setor"
                      items={items}
                      shortcuts={shortcuts === "nenhum" ? undefined : shortcuts}
                      onSubmit={handleSubmit}
                    >
                      <QuestionnaireProgress />
                      <QuestionnaireItem name="setor" required>
                        <QuestionnaireTitle>Em que setor estão seus melhores clientes?</QuestionnaireTitle>
                        <QuestionnaireDescription>Escolha um ou escreva outro.</QuestionnaireDescription>
                        <QuestionnaireChoices>
                          <QuestionnaireChoice value="industria">
                            <span className="font-medium">Indústria</span>
                            <QuestionnaireChoiceDescription>Fábricas, manufatura, transformação.</QuestionnaireChoiceDescription>
                          </QuestionnaireChoice>
                          <QuestionnaireChoice value="servicos">
                            <span className="font-medium">Serviços</span>
                            <QuestionnaireChoiceDescription>Consultorias, agências, saúde, educação.</QuestionnaireChoiceDescription>
                          </QuestionnaireChoice>
                          <QuestionnaireChoice value="varejo">
                            <span className="font-medium">Varejo</span>
                            <QuestionnaireChoiceDescription>Lojas, redes e e-commerce.</QuestionnaireChoiceDescription>
                          </QuestionnaireChoice>
                          <QuestionnaireInput aria-label="Outro setor" placeholder="Outro setor…" />
                        </QuestionnaireChoices>
                        <QuestionnaireError />
                      </QuestionnaireItem>
                      <QuestionnaireItem name="sinais" multiple>
                        <QuestionnaireTitle>Que sinais indicam que uma empresa está pronta para comprar?</QuestionnaireTitle>
                        <QuestionnaireDescription>Marque quantos quiser, ou pule.</QuestionnaireDescription>
                        <QuestionnaireChoices>
                          <QuestionnaireChoice value="expansao">Expansão regional ou nova filial</QuestionnaireChoice>
                          <QuestionnaireChoice value="contratacao">Contratações na área comercial</QuestionnaireChoice>
                          <QuestionnaireChoice value="investimento">Investimento ou rodada recente</QuestionnaireChoice>
                        </QuestionnaireChoices>
                        <QuestionnaireError>Escolha ao menos um sinal ou pule a pergunta.</QuestionnaireError>
                      </QuestionnaireItem>
                      <QuestionnaireItem name="porte" required>
                        <QuestionnaireTitle>Qual o porte ideal?</QuestionnaireTitle>
                        <QuestionnaireChoices>
                          <QuestionnaireChoice value="pequena">Até 50 pessoas</QuestionnaireChoice>
                          <QuestionnaireChoice value="media">50 a 500 pessoas</QuestionnaireChoice>
                          <QuestionnaireChoice value="grande">Mais de 500 pessoas</QuestionnaireChoice>
                        </QuestionnaireChoices>
                        <QuestionnaireError />
                      </QuestionnaireItem>
                      <QuestionnaireActions>
                        <QuestionnairePrevious />
                        <QuestionnaireSkip />
                        <QuestionnaireNext />
                        <QuestionnaireSubmit variant="signal">Salvar perfil</QuestionnaireSubmit>
                      </QuestionnaireActions>
                    </Questionnaire>
                  </CardContent>
                </>
              )}
            </Card>
          }
          code={`const items = [
  { name: "setor", required: true, choices: [{ value: "industria" }, …] },
  { name: "sinais", choices: [{ value: "expansao" }, …] },
  { name: "porte", required: true, choices: [{ value: "pequena" }, …] },
] as const

<Questionnaire defaultItem="setor" items={items}${shortcuts !== "nenhum" ? ` shortcuts="${shortcuts}"` : ""} onSubmit={handleSubmit}>
  <QuestionnaireProgress />
  <QuestionnaireItem name="setor" required>
    <QuestionnaireTitle>Em que setor estão seus melhores clientes?</QuestionnaireTitle>
    <QuestionnaireDescription>Escolha um ou escreva outro.</QuestionnaireDescription>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="industria">
        Indústria
        <QuestionnaireChoiceDescription>…</QuestionnaireChoiceDescription>
      </QuestionnaireChoice>
      <QuestionnaireInput aria-label="Outro setor" placeholder="Outro setor…" />
    </QuestionnaireChoices>
    <QuestionnaireError />
  </QuestionnaireItem>
  <QuestionnaireItem name="sinais" multiple>…</QuestionnaireItem>
  <QuestionnaireItem name="porte" required>…</QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireSkip />
    <QuestionnaireNext />
    <QuestionnaireSubmit variant="signal">Salvar perfil</QuestionnaireSubmit>
  </QuestionnaireActions>
</Questionnaire>

// onSubmit recebe o evento do <form>: use FormData
function handleSubmit(e) {
  e.preventDefault()
  const fd = new FormData(e.currentTarget)
  fd.get("setor"); fd.getAll("sinais"); fd.get("porte")
}`}
        />
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"`}
          usageCode={`<Questionnaire items={[{ name: "q1", required: true, choices: [{ value: "a" }, { value: "b" }] }]} onSubmit={…}>
  <QuestionnaireItem name="q1" required>
    <QuestionnaireTitle>Pergunta</QuestionnaireTitle>
    <QuestionnaireChoices>
      <QuestionnaireChoice value="a">A</QuestionnaireChoice>
      <QuestionnaireChoice value="b">B</QuestionnaireChoice>
    </QuestionnaireChoices>
  </QuestionnaireItem>
  <QuestionnaireActions>
    <QuestionnairePrevious />
    <QuestionnaireNext />
    <QuestionnaireSubmit />
  </QuestionnaireActions>
</Questionnaire>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Questionnaire"
          rows={[
            { prop: "items", type: "{ name, required?, disabled?, choices? }[]", description: "Mapa das perguntas e escolhas (ordem, obrigatoriedade, atalhos)." },
            { prop: "defaultItem · item", type: "string", description: "Pergunta inicial / atual (controlado)." },
            { prop: "onItemChange", type: "(name: string) => void", description: "Chamado ao mudar de pergunta." },
            { prop: "shortcuts", type: '"letters" | "numbers"', description: "Atalhos de teclado para as escolhas (A, B, C… ou 1, 2, 3…)." },
            { prop: "onSubmit", type: "(event: FormEvent) => void", description: "Envio do formulário. Leia com FormData." },
          ]}
        />
        <PropsTable
          component="QuestionnaireItem"
          rows={[
            { prop: "name", type: "string", description: "Nome do campo no FormData. Obrigatório." },
            { prop: "required", type: "boolean", default: "false", description: "Não pode ser pulada." },
            { prop: "multiple", type: "boolean", default: "false", description: "Várias escolhas (checkbox)." },
          ]}
        />
        <PropsTable
          component="QuestionnaireChoice"
          rows={[
            { prop: "value", type: "string", description: "Valor enviado." },
            { prop: "disabled", type: "boolean", default: "false", description: "Escolha indisponível." },
          ]}
        />
        <PropsTable
          component="QuestionnairePrevious · Skip · Next · Submit"
          rows={[
            { prop: "variant · size", type: "Button", description: "Aparência. Cada botão só aparece quando faz sentido." },
            { prop: "children", type: "ReactNode", default: '"Voltar" · "Pular" · "Próxima" · "Enviar"', description: "Rótulo." },
          ]}
        />
        <PropsTable
          component="QuestionnaireProgress · QuestionnaireError"
          rows={[
            { prop: "children", type: "ReactNode", default: '"Pergunta 1 de 3" · "Escolha uma resposta para continuar."', description: "Textos padrão em português (traduzidos na fynd)." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Cada pergunta é um <code className="font-mono text-sm">fieldset</code> com <code className="font-mono text-sm">legend</code>; as escolhas são radios ou checkboxes nativos.</>,
            <>O progresso é um <code className="font-mono text-sm">progressbar</code> com texto (“Pergunta 2 de 3”) anunciado a cada troca.</>,
            <><Kbd>↑</Kbd> <Kbd>↓</Kbd> mudam a escolha, <Kbd>Enter</Kbd> avança, <Kbd>←</Kbd> volta; com shortcuts, <Kbd>A</Kbd>/<Kbd>1</Kbd> escolhem direto.</>,
            <>Erros aparecem com <code className="font-mono text-sm">role=&quot;alert&quot;</code> e o foco volta para a pergunta.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
