"use client"

import { useState } from "react"
import { CheckIcon } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar"
import { CompanyAvatar } from "@/components/company-avatar"
import { FChama } from "@/components/brand/f-chama"
import { ControlSegment, ControlText, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["sm", "default", "lg", "xl"] as const
const companies = ["Empresa Exemplo", "Alfa Embalagens", "Norte Metais", "Vale Plásticos", "Rio Componentes"]

export default function AvatarPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("lg")
  const [name, setName] = useState("Alfa Embalagens")
  const [signal, setSignal] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Data"
        title="Avatar"
        description="Identifica uma pessoa ou empresa com imagem ou iniciais. O CompanyAvatar da fynd gera iniciais e uma cor estável a partir do nome e pode marcar um sinal prioritário."
        source={["src/components/ui/avatar.tsx", "src/components/company-avatar.tsx"]}
      />

      <DocSection title="Playground" description="CompanyAvatar: a cor do fallback é derivada do nome, então a mesma empresa sempre tem a mesma cor.">
        <Playground
          controls={
            <>
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlText label="name" value={name} onChange={setName} />
              <ControlToggle label="signal" checked={signal} onChange={setSignal} />
            </>
          }
          preview={<CompanyAvatar name={name || "?"} size={size} signal={signal} />}
          code={`<CompanyAvatar name="${name}"${size !== "default" ? ` size="${size}"` : ""}${signal ? " signal" : ""} />`}
        />
      </DocSection>

      <DocSection title="Tamanhos" description="xl é uma extensão da fynd para cabeçalhos de perfil.">
        <Example code={sizes.map((s) => `<Avatar size="${s}">…</Avatar>`).join("\n")}>
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <CompanyAvatar name="Empresa Exemplo" size={s} />
              <code className="font-mono text-xs text-muted-foreground">{s}</code>
            </div>
          ))}
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Imagem com fallback"
            description="Se a imagem falhar, as iniciais aparecem no lugar."
            code={`{/* Marca: f-chama sobre azul profundo */}
<Avatar size="xl" className="bg-navy-900 text-paper-50">
  <span className="flex size-full items-center justify-center">
    <FChama className="h-8 w-auto" />
  </span>
</Avatar>

{/* Imagem quebrada → iniciais */}
<Avatar size="xl">
  <AvatarImage src="/imagem-inexistente.png" alt="Diretoria comercial" />
  <AvatarFallback>DC</AvatarFallback>
</Avatar>`}
          >
            <Avatar size="xl" className="bg-navy-900 text-paper-50">
              <span className="flex size-full items-center justify-center">
                <FChama className="h-8 w-auto" />
              </span>
            </Avatar>
            <Avatar size="xl">
              <AvatarImage src="/imagem-inexistente.png" alt="Diretoria comercial" />
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
          </Example>

          <Example
            title="Badge"
            description="AvatarBadge sinaliza estado. Ciano = sinal prioritário."
            code={`<Avatar>
  <AvatarFallback>AE</AvatarFallback>
  <AvatarBadge className="bg-signal" />
</Avatar>`}
          >
            <CompanyAvatar name="Alfa Embalagens" size="lg" signal />
            <Avatar size="lg">
              <AvatarFallback>NM</AvatarFallback>
              <AvatarBadge className="bg-success">
                <CheckIcon />
              </AvatarBadge>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>VP</AvatarFallback>
              <AvatarBadge className="bg-steel-400" />
            </Avatar>
          </Example>

          <Example
            title="Grupo"
            description="AvatarGroup sobrepõe avatares; AvatarGroupCount resume o excedente."
            code={`<AvatarGroup>
  <CompanyAvatar name="Empresa Exemplo" />
  …
  <AvatarGroupCount>+8</AvatarGroupCount>
</AvatarGroup>`}
          >
            <AvatarGroup>
              {companies.slice(0, 4).map((c) => (
                <CompanyAvatar key={c} name={c} size="lg" />
              ))}
              <AvatarGroupCount>+8</AvatarGroupCount>
            </AvatarGroup>
          </Example>

          <Example
            title="Em uma lista"
            description="Como aparece na lista de oportunidades."
            previewClassName="flex-col items-stretch"
            code={`<CompanyAvatar name={empresa.nome} signal={empresa.aderencia > 90} />`}
          >
            {companies.slice(0, 3).map((c, i) => (
              <div key={c} className="flex items-center gap-3">
                <CompanyAvatar name={c} signal={i === 0} />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold">{c}</span>
                  <span className="text-xs text-muted-foreground">Indústria · {[320, 410, 260][i]} pessoas</span>
                </div>
                <span className="font-mono text-sm text-muted-foreground">{[92, 84, 77][i]}%</span>
              </div>
            ))}
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CompanyAvatar } from "@/components/company-avatar"`}
          usageCode={`<Avatar>
  <AvatarImage src={pessoa.foto} alt={pessoa.nome} />
  <AvatarFallback>MP</AvatarFallback>
</Avatar>

<CompanyAvatar name="Alfa Embalagens" signal />`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Avatar"
          rows={[{ prop: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "24, 32, 40 ou 56px. xl é extensão da fynd." }]}
        />
        <PropsTable
          component="AvatarImage"
          rows={[
            { prop: "src", type: "string", description: "URL da imagem." },
            { prop: "alt", type: "string", description: "Nome da pessoa ou empresa." },
          ]}
        />
        <PropsTable
          component="CompanyAvatar"
          rows={[
            { prop: "name", type: "string", description: "Nome usado para iniciais, cor e texto alternativo. Obrigatório." },
            { prop: "src", type: "string", description: "Imagem opcional; cai nas iniciais se falhar." },
            { prop: "signal", type: "boolean", default: "false", description: "Mostra o ponto ciano de sinal prioritário." },
            { prop: "size", type: '"sm" | "default" | "lg" | "xl"', default: '"default"', description: "Repassado ao Avatar." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>AvatarImage sempre com <code className="font-mono text-sm">alt</code>. Se o nome já aparece ao lado, use <code className="font-mono text-sm">alt=&quot;&quot;</code> para não repetir.</>,
            <>As iniciais são texto real e são lidas pelo leitor de tela; mantenha o nome completo visível por perto.</>,
            <>O badge de sinal tem <code className="font-mono text-sm">aria-label</code>. Badges só de cor precisam de texto equivalente em outro lugar.</>,
            <>Todas as combinações de fundo e iniciais do CompanyAvatar têm contraste ≥ 4,5:1 nos dois temas.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
