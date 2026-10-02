"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

export default function DialogPage() {
  const [closeButton, setCloseButton] = useState(true)
  const [footerClose, setFooterClose] = useState(false)
  const [open, setOpen] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [name, setName] = useState("Indústria Sudeste")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Dialog"
        description="Janela modal para uma tarefa curta sem sair da página: salvar um perfil, editar critérios, ver detalhes. Fecha com Esc, clique fora ou no X."
        source="src/components/ui/dialog.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="showCloseButton" checked={closeButton} onChange={setCloseButton} />
              <ControlToggle label="footer close" checked={footerClose} onChange={setFooterClose} />
            </>
          }
          preview={
            <div className="flex flex-col items-center gap-3">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<Button />}>Salvar perfil ideal</DialogTrigger>
                <DialogContent showCloseButton={closeButton}>
                  <DialogHeader>
                    <DialogTitle>Salvar perfil ideal</DialogTitle>
                    <DialogDescription>Dê um nome para encontrar este perfil depois.</DialogDescription>
                  </DialogHeader>
                  <form
                    id="salvar-perfil"
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSaved(name)
                      setOpen(false)
                    }}
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="perfil-nome">Nome do perfil</Label>
                      <Input id="perfil-nome" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <Label className="gap-2 font-normal">
                      <Checkbox defaultChecked />
                      Avisar quando surgirem novas empresas
                    </Label>
                  </form>
                  <DialogFooter showCloseButton={footerClose}>
                    <Button type="submit" form="salvar-perfil">
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                {saved ? `salvo: ${saved}` : "—"}
              </span>
            </div>
          }
          code={`<Dialog>
  <DialogTrigger render={<Button />}>Salvar perfil ideal</DialogTrigger>
  <DialogContent${closeButton ? "" : " showCloseButton={false}"}>
    <DialogHeader>
      <DialogTitle>Salvar perfil ideal</DialogTitle>
      <DialogDescription>Dê um nome para encontrar este perfil depois.</DialogDescription>
    </DialogHeader>
    <form id="salvar-perfil" onSubmit={…}>…</form>
    <DialogFooter${footerClose ? " showCloseButton" : ""}>
      <Button type="submit" form="salvar-perfil">Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Conteúdo longo"
            description="O corpo rola; cabeçalho e rodapé ficam fixos."
            code={`<DialogContent className="max-h-[80vh] grid-rows-[auto_1fr_auto]">
  <DialogHeader>…</DialogHeader>
  <div className="-mx-6 overflow-y-auto px-6">…</div>
  <DialogFooter>…</DialogFooter>
</DialogContent>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Ver critérios</DialogTrigger>
              <DialogContent className="max-h-[80vh] grid-rows-[auto_1fr_auto]">
                <DialogHeader>
                  <DialogTitle>Como calculamos a aderência</DialogTitle>
                  <DialogDescription>Os critérios que pesam na prioridade de cada empresa.</DialogDescription>
                </DialogHeader>
                <div className="-mx-6 flex flex-col gap-4 overflow-y-auto px-6 text-sm leading-relaxed text-muted-foreground">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <p key={i}>
                      <strong className="text-foreground">Critério {i + 1}.</strong> Setor, porte, região e sinais recentes são
                      comparados ao perfil ideal que você descreveu. Cada critério tem um peso, e a soma gera a aderência de 0 a 100.
                    </p>
                  ))}
                </div>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
          </Example>
          <Example
            title="Fechar programaticamente"
            description="DialogClose envolve qualquer botão que deve fechar."
            code={`<DialogFooter>
  <DialogClose render={<Button variant="outline" />}>Agora não</DialogClose>
  <DialogClose render={<Button variant="signal" />}>Entendi</DialogClose>
</DialogFooter>`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant="signal" />}>Novidade</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novos sinais disponíveis</DialogTitle>
                  <DialogDescription>
                    Agora a fynd também detecta expansão regional e novas filiais nas empresas do seu perfil.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Agora não</DialogClose>
                  <DialogClose render={<Button variant="signal" />}>Entendi</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`}
          usageCode={`<Dialog>
  <DialogTrigger render={<Button />}>Abrir</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    …
    <DialogFooter showCloseButton />
  </DialogContent>
</Dialog>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Dialog"
          rows={[
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
            { prop: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial." },
            { prop: "modal", type: "boolean", default: "true", description: "Bloqueia a página por trás." },
          ]}
        />
        <PropsTable
          component="DialogContent"
          rows={[{ prop: "showCloseButton", type: "boolean", default: "true", description: "Mostra o X no canto superior direito." }]}
        />
        <PropsTable
          component="DialogFooter"
          rows={[{ prop: "showCloseButton", type: "boolean", default: "false", description: "Adiciona um botão “Fechar” em outline." }]}
        />
        <PropsTable
          component="DialogTrigger · DialogClose"
          rows={[{ prop: "render", type: "ReactElement", description: "Renderiza como outro elemento, p. ex. <Button />." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <><code className="font-mono text-sm">role=&quot;dialog&quot;</code> com <code className="font-mono text-sm">aria-modal</code>, ligado ao título e à descrição.</>,
            <>O foco entra no diálogo ao abrir, fica preso nele e volta ao gatilho ao fechar.</>,
            <><Kbd>Esc</Kbd> fecha. Para confirmações destrutivas que não podem ser dispensadas, use Alert Dialog.</>,
            <>O X tem rótulo oculto “Fechar”.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
