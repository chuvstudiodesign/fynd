"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sides = ["right", "left", "top", "bottom"] as const

export default function SheetPage() {
  const [side, setSide] = useState<(typeof sides)[number]>("right")
  const [closeButton, setCloseButton] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Overlay"
        title="Sheet"
        description="Painel que entra por uma borda da tela para uma tarefa lateral — editar o perfil ideal, ver filtros, abrir detalhes — sem perder a página de vista. Diferente do Drawer, não é arrastável."
        source="src/components/ui/sheet.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="side" value={side} options={sides} onChange={setSide} />
              <ControlToggle label="showCloseButton" checked={closeButton} onChange={setCloseButton} />
            </>
          }
          preview={
            <Sheet>
              <SheetTrigger render={<Button />}>Editar perfil ideal</SheetTrigger>
              <SheetContent side={side} showCloseButton={closeButton}>
                <SheetHeader>
                  <SheetTitle>Perfil ideal</SheetTitle>
                  <SheetDescription>Ajuste os critérios. A lista será recalculada ao salvar.</SheetDescription>
                </SheetHeader>
                <FieldGroup className="px-6">
                  <Field>
                    <FieldLabel htmlFor="sh-nome">Nome</FieldLabel>
                    <Input id="sh-nome" defaultValue="Indústria Sudeste" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sh-setor">Setor</FieldLabel>
                    <NativeSelect id="sh-setor" className="w-full">
                      <NativeSelectOption>Indústria</NativeSelectOption>
                      <NativeSelectOption>Serviços</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </FieldGroup>
                <SheetFooter>
                  <Button>Salvar perfil</Button>
                  <SheetClose render={<Button variant="outline" />}>Cancelar</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          }
          code={`<Sheet>
  <SheetTrigger render={<Button />}>Editar perfil ideal</SheetTrigger>
  <SheetContent side="${side}"${closeButton ? "" : " showCloseButton={false}"}>
    <SheetHeader>
      <SheetTitle>Perfil ideal</SheetTitle>
      <SheetDescription>…</SheetDescription>
    </SheetHeader>
    …
    <SheetFooter>
      <Button>Salvar perfil</Button>
      <SheetClose render={<Button variant="outline" />}>Cancelar</SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
        />
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`}
          usageCode={`<Sheet>\n  <SheetTrigger render={<Button />}>Abrir</SheetTrigger>\n  <SheetContent>\n    <SheetHeader><SheetTitle>Título</SheetTitle></SheetHeader>\n  </SheetContent>\n</Sheet>`}
        />
        <p className="text-sm text-muted-foreground">
          Sheet ou Drawer? Sheet para painéis de desktop (formulários, filtros). Drawer quando o gesto de arrastar importa — especialmente no celular.
        </p>
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Sheet"
          rows={[
            { prop: "open · onOpenChange", type: "boolean", description: "Estado controlado." },
            { prop: "modal", type: "boolean", default: "true", description: "Overlay e foco preso." },
          ]}
        />
        <PropsTable
          component="SheetContent"
          rows={[
            { prop: "side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Borda de entrada." },
            { prop: "showCloseButton", type: "boolean", default: "true", description: "X no canto (rótulo oculto “Fechar”)." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>É um diálogo: <code className="font-mono text-sm">role=&quot;dialog&quot;</code>, foco preso e devolvido ao gatilho.</>,
            <><Kbd>Esc</Kbd> e clique fora fecham. SheetTitle é obrigatório para o nome acessível (use sr-only se não quiser mostrar).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
