"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sectors = ["Indústria", "Serviços", "Varejo", "Tecnologia"]

export default function CheckboxPage() {
  const [checked, setChecked] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [invalid, setInvalid] = useState(false)

  const [selected, setSelected] = useState<string[]>(["Indústria"])
  const all = selected.length === sectors.length
  const some = selected.length > 0 && !all

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Checkbox"
        description="Liga e desliga uma opção independente, ou várias de uma lista. Na fynd, é como a pessoa escolhe os critérios do perfil de cliente ideal."
        source="src/components/ui/checkbox.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="checked" checked={checked} onChange={setChecked} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
              <ControlToggle label="aria-invalid" checked={invalid} onChange={setInvalid} />
            </>
          }
          preview={
            <Label className="gap-3 text-base">
              <Checkbox
                checked={checked}
                onCheckedChange={setChecked}
                disabled={disabled}
                aria-invalid={invalid || undefined}
              />
              Receber novos sinais por e-mail
            </Label>
          }
          code={`<Label>
  <Checkbox${checked ? " checked" : ""}${disabled ? " disabled" : ""}${invalid ? " aria-invalid" : ""} onCheckedChange={setChecked} />
  Receber novos sinais por e-mail
</Label>`}
        />
      </DocSection>

      <DocSection title="Estados">
        <Example code={`<Checkbox />\n<Checkbox defaultChecked />\n<Checkbox indeterminate />\n<Checkbox disabled />\n<Checkbox defaultChecked disabled />\n<Checkbox aria-invalid />`}>
          {[
            { label: "Desmarcado", props: {} },
            { label: "Marcado", props: { defaultChecked: true } },
            { label: "Indeterminado", props: { indeterminate: true } },
            { label: "Desabilitado", props: { disabled: true } },
            { label: "Marcado e desabilitado", props: { defaultChecked: true, disabled: true } },
            { label: "Inválido", props: { "aria-invalid": true } },
          ].map((s) => (
            <Label key={s.label} className="gap-2">
              <Checkbox {...s.props} />
              {s.label}
            </Label>
          ))}
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Lista com “selecionar todos”"
            description="O item pai fica indeterminado quando só parte da lista está marcada."
            previewClassName="flex-col items-start"
            code={`<Checkbox
  checked={all}
  indeterminate={some}
  onCheckedChange={(v) => setSelected(v ? sectors : [])}
/>`}
          >
            <Label className="gap-3 font-semibold">
              <Checkbox
                checked={all}
                indeterminate={some}
                onCheckedChange={(v) => setSelected(v ? sectors : [])}
              />
              Todos os setores
            </Label>
            <div className="flex flex-col gap-3 border-l pl-5">
              {sectors.map((s) => (
                <Label key={s} className="gap-3">
                  <Checkbox
                    checked={selected.includes(s)}
                    onCheckedChange={(v) => setSelected((prev) => (v ? [...prev, s] : prev.filter((x) => x !== s)))}
                  />
                  {s}
                </Label>
              ))}
            </div>
          </Example>

          <Example
            title="Com descrição"
            description="Texto de apoio abaixo do rótulo."
            previewClassName="flex-col items-start"
            code={`<div className="flex items-start gap-3">
  <Checkbox id="expansao" defaultChecked />
  <div className="grid gap-1">
    <Label htmlFor="expansao">Priorizar empresas em expansão</Label>
    <p className="text-sm text-muted-foreground">…</p>
  </div>
</div>`}
          >
            {[
              { id: "expansao", title: "Priorizar empresas em expansão", desc: "Sinais de novas filiais, contratações e investimentos recentes.", on: true },
              { id: "contato", title: "Só com contato verificado", desc: "Oculta empresas sem um responsável comercial identificado.", on: false },
            ].map((o) => (
              <label key={o.id} className="flex max-w-sm cursor-pointer items-start gap-3">
                <Checkbox defaultChecked={o.on} className="mt-0.5" />
                <span className="grid gap-1">
                  <span className="text-sm font-semibold">{o.title}</span>
                  <span className="text-sm text-muted-foreground">{o.desc}</span>
                </span>
              </label>
            ))}
          </Example>

          <Example
            title="Cartão selecionável"
            description="O cartão inteiro vira alvo de clique."
            previewClassName="flex-col items-stretch"
            code={`<label className="flex items-start gap-3 rounded-xl border p-4 has-data-checked:border-navy-600 has-data-checked:bg-accent">
  <Checkbox />
  …
</label>`}
          >
            {["Sudeste", "Sul"].map((r, i) => (
              <label
                key={r}
                className="flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4 transition-colors has-data-checked:border-navy-600 has-data-checked:bg-accent dark:has-data-checked:border-navy-300"
              >
                <Checkbox defaultChecked={i === 0} className="mt-0.5" />
                <span className="grid gap-1">
                  <span className="text-sm font-semibold">{r}</span>
                  <span className="text-sm text-muted-foreground">{i === 0 ? "1.240 empresas no perfil" : "610 empresas no perfil"}</span>
                </span>
              </label>
            ))}
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`}
          usageCode={`<Label>
  <Checkbox defaultChecked />
  Aceito os termos
</Label>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Checkbox"
          rows={[
            { prop: "checked", type: "boolean", description: "Estado marcado (controlado)." },
            { prop: "defaultChecked", type: "boolean", default: "false", description: "Estado inicial (não controlado)." },
            { prop: "onCheckedChange", type: "(checked: boolean) => void", description: "Chamado ao marcar ou desmarcar." },
            { prop: "indeterminate", type: "boolean", default: "false", description: "Estado misto, para listas parcialmente marcadas." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita a interação." },
            { prop: "name · value", type: "string", description: "Enviados com o formulário." },
            { prop: "required", type: "boolean", default: "false", description: "Obrigatório no formulário." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Usa <code className="font-mono text-sm">role=&quot;checkbox&quot;</code> com <code className="font-mono text-sm">aria-checked</code> (<code className="font-mono text-sm">mixed</code> no indeterminado).</>,
            <><Kbd>Espaço</Kbd> alterna. <Kbd>Tab</Kbd> move entre caixas.</>,
            <>Sempre associe um rótulo: envolva em <code className="font-mono text-sm">{"<Label>"}</code> ou use <code className="font-mono text-sm">aria-label</code>. O rótulo também amplia a área de clique.</>,
            <>Agrupe listas relacionadas em <code className="font-mono text-sm">fieldset</code> com <code className="font-mono text-sm">legend</code>.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
