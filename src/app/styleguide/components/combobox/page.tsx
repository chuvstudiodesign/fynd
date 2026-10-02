"use client"

import { Fragment, useState } from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, Kbd, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sectors = ["Indústria", "Serviços", "Varejo", "Tecnologia", "Agronegócio", "Saúde", "Logística", "Educação", "Construção"]

const regions = [
  { value: "Sudeste", items: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Espírito Santo"] },
  { value: "Sul", items: ["Paraná", "Santa Catarina", "Rio Grande do Sul"] },
  { value: "Nordeste", items: ["Bahia", "Pernambuco", "Ceará"] },
]

function MultiSectors({ disabled = false }: { disabled?: boolean }) {
  const anchor = useComboboxAnchor()
  return (
    <Combobox multiple autoHighlight items={sectors} defaultValue={["Indústria", "Logística"]} disabled={disabled}>
      <ComboboxChips ref={anchor} className="w-full max-w-sm">
        <ComboboxValue>
          {(values: string[]) => (
            <Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={values.length ? "" : "Adicionar setor"} disabled={disabled} />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Nenhum setor encontrado.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default function ComboboxPage() {
  const [showClear, setShowClear] = useState(true)
  const [showTrigger, setShowTrigger] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [value, setValue] = useState<string | null>("Indústria")

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Forms"
        title="Combobox"
        description="Campo de texto com lista filtrável. Para escolher entre muitas opções — setor, região, empresa — digitando para encontrar."
        source="src/components/ui/combobox.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlToggle label="showTrigger" checked={showTrigger} onChange={setShowTrigger} />
              <ControlToggle label="showClear" checked={showClear} onChange={setShowClear} />
              <ControlToggle label="disabled" checked={disabled} onChange={setDisabled} />
            </>
          }
          preview={
            <div className="flex w-full max-w-xs flex-col items-center gap-3">
              <Combobox items={sectors} value={value} onValueChange={(v: string | null) => setValue(v)} disabled={disabled}>
                <ComboboxInput placeholder="Escolha um setor" showTrigger={showTrigger} showClear={showClear} disabled={disabled} className="w-full" />
                <ComboboxContent>
                  <ComboboxEmpty>Nenhum setor encontrado.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
                valor: {value ?? "—"}
              </span>
            </div>
          }
          code={`<Combobox items={setores} value={value} onValueChange={setValue}${disabled ? " disabled" : ""}>
  <ComboboxInput placeholder="Escolha um setor"${!showTrigger ? " showTrigger={false}" : ""}${showClear ? " showClear" : ""} />
  <ComboboxContent>
    <ComboboxEmpty>Nenhum setor encontrado.</ComboboxEmpty>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8">
          <Example
            title="Seleção múltipla"
            description="ComboboxChips mostra cada escolha como uma pílula removível."
            code={`const anchor = useComboboxAnchor()

<Combobox multiple autoHighlight items={setores} defaultValue={["Indústria"]}>
  <ComboboxChips ref={anchor}>
    <ComboboxValue>
      {(values) => (
        <>
          {values.map((v) => <ComboboxChip key={v}>{v}</ComboboxChip>)}
          <ComboboxChipsInput />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent anchor={anchor}>…</ComboboxContent>
</Combobox>`}
          >
            <MultiSectors />
          </Example>

          <Example
            title="Com grupos"
            description="Itens agrupados por região, com rótulo e separador."
            code={`<Combobox items={regioes}>
  <ComboboxInput placeholder="Escolha um estado" />
  <ComboboxContent>
    <ComboboxList>
      {(group) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
          </ComboboxCollection>
          <ComboboxSeparator />
        </ComboboxGroup>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
          >
            <Combobox items={regions}>
              <ComboboxInput placeholder="Escolha um estado" className="w-full max-w-xs" />
              <ComboboxContent>
                <ComboboxEmpty>Nenhum estado encontrado.</ComboboxEmpty>
                <ComboboxList>
                  {(group: (typeof regions)[number]) => (
                    <ComboboxGroup key={group.value} items={group.items}>
                      <ComboboxLabel>{group.value}</ComboboxLabel>
                      <ComboboxCollection>
                        {(item: string) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                      <ComboboxSeparator />
                    </ComboboxGroup>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Example>

          <Example title="Desabilitado" code={`<Combobox multiple disabled …>…</Combobox>`}>
            <MultiSectors disabled />
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"`}
          usageCode={`<Combobox items={["Indústria", "Serviços", "Varejo"]}>
  <ComboboxInput placeholder="Escolha um setor" />
  <ComboboxContent>
    <ComboboxEmpty>Nada encontrado.</ComboboxEmpty>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Combobox"
          rows={[
            { prop: "items", type: "T[] | Group[]", description: "Lista de opções; ComboboxList recebe cada item por render prop." },
            { prop: "value · defaultValue", type: "T | T[] | null", description: "Valor selecionado (controlado / inicial)." },
            { prop: "onValueChange", type: "(value) => void", description: "Chamado ao selecionar." },
            { prop: "multiple", type: "boolean", default: "false", description: "Permite várias escolhas (use com ComboboxChips)." },
            { prop: "autoHighlight", type: "boolean", default: "false", description: "Destaca o primeiro resultado ao digitar." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o campo." },
          ]}
        />
        <PropsTable
          component="ComboboxInput"
          rows={[
            { prop: "showTrigger", type: "boolean", default: "true", description: "Mostra a seta que abre a lista." },
            { prop: "showClear", type: "boolean", default: "false", description: "Mostra o botão de limpar quando há valor." },
            { prop: "placeholder", type: "string", description: "Texto de ajuda." },
          ]}
        />
        <PropsTable
          component="ComboboxContent"
          rows={[
            { prop: "side · align", type: "string", default: '"bottom" · "start"', description: "Posição da lista em relação ao campo." },
            { prop: "anchor", type: "Ref", description: "Elemento de referência (use useComboboxAnchor com chips)." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>O campo tem <code className="font-mono text-sm">role=&quot;combobox&quot;</code> com <code className="font-mono text-sm">aria-expanded</code>, e a lista é um <code className="font-mono text-sm">listbox</code>.</>,
            <><Kbd>↓</Kbd> abre e percorre, <Kbd>Enter</Kbd> seleciona, <Kbd>Esc</Kbd> fecha; <Kbd>Backspace</Kbd> num campo vazio remove o último chip.</>,
            <>Associe um rótulo visível ao campo (<code className="font-mono text-sm">Label</code> ou <code className="font-mono text-sm">aria-label</code>) — placeholder não é rótulo.</>,
            <>A mensagem de ComboboxEmpty é anunciada quando não há resultados.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
