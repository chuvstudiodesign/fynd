"use client"

import { useState } from "react"
import Image from "next/image"
import { FileSpreadsheetIcon, FileTextIcon, ImageIcon, RotateCwIcon, TriangleAlertIcon, XIcon } from "lucide-react"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment"
import { Spinner } from "@/components/ui/spinner"
import { ControlSegment, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const states = ["idle", "uploading", "processing", "error", "done"] as const
const sizes = ["default", "sm", "xs"] as const
const orientations = ["horizontal", "vertical"] as const
type State = (typeof states)[number]

const descriptions: Record<State, string> = {
  idle: "Arraste um arquivo ou clique para enviar",
  uploading: "Enviando · 64%",
  processing: "Cruzando com o perfil ideal…",
  error: "Formato não suportado",
  done: "CSV · 18 KB",
}

function MediaFor({ state }: { state: State }) {
  if (state === "uploading" || state === "processing") return <Spinner />
  if (state === "error") return <TriangleAlertIcon />
  return <FileSpreadsheetIcon />
}

export default function AttachmentPage() {
  const [state, setState] = useState<State>("done")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [orientation, setOrientation] = useState<(typeof orientations)[number]>("horizontal")

  const mediaCode =
    state === "uploading" || state === "processing" ? "<Spinner />" : state === "error" ? "<TriangleAlertIcon />" : "<FileSpreadsheetIcon />"
  const code = `<Attachment state="${state}"${size !== "default" ? ` size="${size}"` : ""}${orientation !== "horizontal" ? ` orientation="${orientation}"` : ""}>
  <AttachmentMedia>${mediaCode}</AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>lista-prospects.csv</AttachmentTitle>
    <AttachmentDescription>${descriptions[state]}</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remover lista-prospects.csv">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Attachment"
        description="Representa um arquivo anexado: listas de prospects, propostas e imagens. Mostra nome, tipo e o estado do envio — de ocioso a pronto."
        source="src/components/ui/attachment.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="state" value={state} options={states} onChange={setState} />
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="orientation" value={orientation} options={orientations} onChange={setOrientation} />
            </>
          }
          preview={
            <Attachment state={state} size={size} orientation={orientation} className={orientation === "horizontal" ? "w-80" : undefined}>
              <AttachmentMedia>
                <MediaFor state={state} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>lista-prospects.csv</AttachmentTitle>
                <AttachmentDescription>{descriptions[state]}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remover lista-prospects.csv">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          }
          code={code}
        />
      </DocSection>

      <DocSection title="Estados" description="O estado muda borda, mídia e texto. uploading e processing aplicam um brilho (shimmer) no título.">
        <Example code={`<Attachment state="uploading">…</Attachment>`}>
          <div className="flex w-full max-w-md flex-col gap-3">
          {states.map((s) => (
            <Attachment key={s} state={s} className="w-full">
              <AttachmentMedia>
                <MediaFor state={s} />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>{s === "idle" ? "Enviar lista" : "lista-prospects.csv"}</AttachmentTitle>
                <AttachmentDescription>{descriptions[s]}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                {s === "error" ? (
                  <AttachmentAction aria-label="Tentar novamente">
                    <RotateCwIcon />
                  </AttachmentAction>
                ) : s !== "idle" ? (
                  <AttachmentAction aria-label="Remover">
                    <XIcon />
                  </AttachmentAction>
                ) : null}
              </AttachmentActions>
            </Attachment>
          ))}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Imagens · vertical"
            description='AttachmentMedia variant="image" recorta a imagem em quadrado.'
            code={`<Attachment orientation="vertical">
  <AttachmentMedia variant="image">
    <Image src="/brand/slides/capa.jpg" alt="" fill />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>capa.jpg</AttachmentTitle>
    <AttachmentDescription>JPG · 54 KB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`}
          >
            {[
              { src: "/brand/slides/capa.jpg", name: "capa.jpg", meta: "JPG · 54 KB", state: "done" as const },
              { src: "/brand/slides/origem-chama.jpg", name: "chama.jpg", meta: "JPG · 50 KB", state: "done" as const },
              { src: "/brand/slides/ciano-e-luz.jpg", name: "ciano.jpg", meta: "Enviando…", state: "uploading" as const },
            ].map((f) => (
              <Attachment key={f.name} orientation="vertical" state={f.state}>
                <AttachmentMedia variant="image">
                  <Image src={f.src} alt="" width={240} height={240} />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{f.name}</AttachmentTitle>
                  <AttachmentDescription>{f.meta}</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction variant="secondary" aria-label={`Remover ${f.name}`}>
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </Example>

          <Example
            title="Grupo com rolagem"
            description="AttachmentGroup rola na horizontal com encaixe e esmaecimento nas bordas."
            previewClassName="block"
            code={`<AttachmentGroup>\n  <Attachment>…</Attachment>\n  <Attachment>…</Attachment>\n</AttachmentGroup>`}
          >
            <AttachmentGroup>
              {[
                { icon: FileTextIcon, name: "proposta-comercial.pdf", meta: "PDF · 2,4 MB" },
                { icon: FileSpreadsheetIcon, name: "lista-prospects.csv", meta: "CSV · 18 KB" },
                { icon: ImageIcon, name: "logo-cliente.png", meta: "PNG · 120 KB" },
                { icon: FileTextIcon, name: "perfil-ideal.docx", meta: "DOCX · 48 KB" },
                { icon: FileSpreadsheetIcon, name: "base-cnpj.xlsx", meta: "XLSX · 1,1 MB" },
              ].map((f) => (
                <Attachment key={f.name}>
                  <AttachmentMedia>
                    <f.icon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{f.name}</AttachmentTitle>
                    <AttachmentDescription>{f.meta}</AttachmentDescription>
                  </AttachmentContent>
                </Attachment>
              ))}
            </AttachmentGroup>
          </Example>

          <Example
            title="Clicável"
            description="AttachmentTrigger cobre o cartão inteiro para abrir o arquivo; as ações continuam clicáveis por cima."
            code={`<Attachment>
  <AttachmentTrigger aria-label="Abrir proposta-comercial.pdf" onClick={…} />
  …
</Attachment>`}
          >
            <Attachment className="w-80">
              <AttachmentTrigger aria-label="Abrir proposta-comercial.pdf" onClick={() => {}} />
              <AttachmentMedia>
                <FileTextIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>proposta-comercial.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2,4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label="Remover proposta-comercial.pdf">
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"`}
          usageCode={`<Attachment state="done">
  <AttachmentMedia><FileTextIcon /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>proposta.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2,4 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Attachment"
          rows={[
            { prop: "state", type: '"idle" | "uploading" | "processing" | "error" | "done"', default: '"done"', description: "Estado do envio. idle usa borda tracejada; error tinge de vermelho." },
            { prop: "size", type: '"default" | "sm" | "xs"', default: '"default"', description: "Densidade do cartão." },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "vertical coloca a mídia em cima, como miniatura." },
          ]}
        />
        <PropsTable
          component="AttachmentMedia"
          rows={[{ prop: "variant", type: '"icon" | "image"', default: '"icon"', description: "image recorta o conteúdo em quadrado e esmaece enquanto envia." }]}
        />
        <PropsTable
          component="AttachmentAction"
          rows={[
            { prop: "variant", type: "Button variant", default: '"ghost"', description: "Variante do botão de ação." },
            { prop: "size", type: "Button size", default: '"icon-xs"', description: "Tamanho do botão." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Toda AttachmentAction é só ícone: sempre passe <code className="font-mono text-sm">aria-label</code> com o nome do arquivo (“Remover proposta.pdf”).</>,
            <>AttachmentTrigger precisa de <code className="font-mono text-sm">aria-label</code> descrevendo o que abre.</>,
            <>O Spinner tem <code className="font-mono text-sm">role=&quot;status&quot;</code>; descreva o progresso em texto na AttachmentDescription.</>,
            <>Erros precisam de texto, não só da cor vermelha.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
