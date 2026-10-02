"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import { ChevronRightIcon, FileTextIcon, MessageCircleIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { CompanyAvatar } from "@/components/company-avatar"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const variants = ["default", "outline", "muted"] as const
const sizes = ["default", "sm", "xs"] as const
const medias = ["icon", "avatar", "image", "nenhuma"] as const

export default function ItemPage() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("outline")
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [media, setMedia] = useState<(typeof medias)[number]>("icon")
  const [actions, setActions] = useState(true)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Item"
        description="Linha flexível de conteúdo: mídia, título, descrição e ações. É o bloco para listas de configurações, notificações, arquivos e pessoas."
        source="src/components/ui/item.tsx"
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="variant" value={variant} options={variants} onChange={setVariant} />
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlSegment label="media" value={media} options={medias} onChange={setMedia} />
              <ControlToggle label="ações" checked={actions} onChange={setActions} />
            </>
          }
          preview={
            <Item variant={variant} size={size} className="max-w-lg">
              {media === "icon" && (
                <ItemMedia variant="icon">
                  <SparklesIcon />
                </ItemMedia>
              )}
              {media === "avatar" && (
                <ItemMedia>
                  <CompanyAvatar name="Empresa Exemplo" size="lg" />
                </ItemMedia>
              )}
              {media === "image" && (
                <ItemMedia variant="image">
                  <Image src="/brand/slides/luz-revela-caminhos.jpg" alt="" width={80} height={80} className="object-cover" />
                </ItemMedia>
              )}
              <ItemContent>
                <ItemTitle>3 novos sinais</ItemTitle>
                <ItemDescription>Empresa Exemplo anunciou expansão regional no Sudeste.</ItemDescription>
              </ItemContent>
              {actions && (
                <ItemActions>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </ItemActions>
              )}
            </Item>
          }
          code={`<Item variant="${variant}"${size !== "default" ? ` size="${size}"` : ""}>${media === "icon" ? `\n  <ItemMedia variant="icon"><SparklesIcon /></ItemMedia>` : media === "avatar" ? `\n  <ItemMedia><CompanyAvatar name="Empresa Exemplo" /></ItemMedia>` : media === "image" ? `\n  <ItemMedia variant="image"><Image … /></ItemMedia>` : ""}
  <ItemContent>
    <ItemTitle>3 novos sinais</ItemTitle>
    <ItemDescription>Empresa Exemplo anunciou expansão regional no Sudeste.</ItemDescription>
  </ItemContent>${actions ? `\n  <ItemActions>\n    <Button variant="outline" size="sm">Ver</Button>\n  </ItemActions>` : ""}
</Item>`}
        />
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Lista agrupada"
            description="ItemGroup + ItemSeparator."
            previewClassName="block"
            code={`<ItemGroup>
  <Item role="listitem">…</Item>
  <ItemSeparator />
  <Item role="listitem">…</Item>
</ItemGroup>`}
          >
            <ItemGroup className="rounded-xl border">
              {[
                { name: "Mariana Pillati", role: "Diretora comercial", email: "mariana@…" },
                { name: "Lucas Zerlotini", role: "Design", email: "lucas@…" },
                { name: "Time comercial", role: "5 pessoas", email: "comercial@…" },
              ].map((p, i, arr) => (
                <Fragment key={p.name}>
                  <Item size="sm" role="listitem">
                    <ItemMedia>
                      <CompanyAvatar name={p.name} />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{p.name}</ItemTitle>
                      <ItemDescription>{p.role}</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button variant="ghost" size="icon-sm" aria-label={`Conversar com ${p.name}`}>
                        <MessageCircleIcon />
                      </Button>
                    </ItemActions>
                  </Item>
                  {i < arr.length - 1 && <ItemSeparator />}
                </Fragment>
              ))}
            </ItemGroup>
          </Example>

          <Example
            title="Como link"
            description='render={<a />} torna a linha inteira clicável.'
            previewClassName="flex-col items-stretch"
            code={`<Item variant="outline" render={<a href="/propostas/1" />}>
  …
  <ItemActions><ChevronRightIcon /></ItemActions>
</Item>`}
          >
            {[
              { t: "Proposta — Empresa Exemplo", d: "PDF · atualizada hoje" },
              { t: "Proposta — Alfa Embalagens", d: "PDF · há 3 dias" },
            ].map((f) => (
              <Item key={f.t} variant="outline" render={<a href="#" />}>
                <ItemMedia variant="icon">
                  <FileTextIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{f.t}</ItemTitle>
                  <ItemDescription>{f.d}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
            ))}
          </Example>

          <Example
            title="Com cabeçalho e rodapé"
            description="ItemHeader e ItemFooter ocupam a largura toda."
            previewClassName="block"
            code={`<Item variant="outline">
  <ItemHeader>…</ItemHeader>
  <ItemMedia>…</ItemMedia>
  <ItemContent>…</ItemContent>
  <ItemFooter>…</ItemFooter>
</Item>`}
          >
            <Item variant="outline">
              <ItemHeader>
                <Badge variant="label">Oportunidade</Badge>
                <Badge variant="signal">92%</Badge>
              </ItemHeader>
              <ItemMedia>
                <CompanyAvatar name="Empresa Exemplo" size="lg" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Empresa Exemplo</ItemTitle>
                <ItemDescription>Indústria · 320 pessoas · São Paulo</ItemDescription>
              </ItemContent>
              <ItemFooter>
                <span className="text-xs text-muted-foreground">Sinal detectado há 2 dias</span>
                <Button size="sm" variant="signal">
                  Iniciar conversa
                </Button>
              </ItemFooter>
            </Item>
          </Example>

          <Example
            title="Variante muted"
            description="Para avisos e notas dentro de painéis."
            previewClassName="block"
            code={`<Item variant="muted">…</Item>`}
          >
            <Item variant="muted">
              <ItemMedia variant="icon">
                <ShieldCheckIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Dados de fontes públicas</ItemTitle>
                <ItemDescription>CNPJs da Receita Federal e base própria de contas corporativas.</ItemDescription>
              </ItemContent>
            </Item>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"`}
          usageCode={`<Item variant="outline">
  <ItemMedia variant="icon"><SparklesIcon /></ItemMedia>
  <ItemContent>
    <ItemTitle>Título</ItemTitle>
    <ItemDescription>Descrição</ItemDescription>
  </ItemContent>
  <ItemActions><Button size="sm">Ação</Button></ItemActions>
</Item>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Item"
          rows={[
            { prop: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "Sem borda, com borda ou com fundo." },
            { prop: "size", type: '"default" | "sm" | "xs"', default: '"default"', description: "Densidade." },
            { prop: "render", type: "ReactElement", description: "Renderiza como link ou botão, mantendo o estilo." },
          ]}
        />
        <PropsTable
          component="ItemMedia"
          rows={[{ prop: "variant", type: '"default" | "icon" | "image"', default: '"default"', description: "icon dimensiona ícones; image recorta a imagem." }]}
        />
        <PropsTable
          component="ItemGroup · ItemSeparator · ItemContent · ItemTitle · ItemDescription · ItemActions · ItemHeader · ItemFooter"
          rows={[{ prop: "…props", type: "props nativas", description: "ItemGroup tem role=list; dê role=listitem aos Items." }]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>ItemGroup usa <code className="font-mono text-sm">role=&quot;list&quot;</code>; passe <code className="font-mono text-sm">role=&quot;listitem&quot;</code> em cada Item dentro dele.</>,
            <>Se o Item inteiro for link, evite botões dentro dele — cliques aninhados confundem teclado e leitor de tela.</>,
            <>Ações só com ícone precisam de <code className="font-mono text-sm">aria-label</code> com o nome do item.</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
