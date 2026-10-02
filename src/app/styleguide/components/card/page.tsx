"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRightIcon, MoreHorizontalIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OpportunityCard } from "@/components/opportunity-card"
import { ControlSegment, ControlToggle, Playground } from "../../_kit/controls"
import { A11yNotes, DocSection, Example, PageHeader, PropsTable, ShowcasePage, Usage } from "../../_kit/showcase"

const sizes = ["default", "sm"] as const
const opportunities = [
  { company: "Empresa Exemplo", meta: "Indústria · 320 pessoas", fit: 92 },
  { company: "Alfa Embalagens", meta: "Indústria · 410 pessoas", fit: 84 },
  { company: "Norte Metais", meta: "Indústria · 260 pessoas", fit: 77 },
  { company: "Vale Plásticos", meta: "Indústria · 230 pessoas", fit: 71 },
]

export default function CardPage() {
  const [size, setSize] = useState<(typeof sizes)[number]>("default")
  const [action, setAction] = useState(true)
  const [footer, setFooter] = useState(true)
  const [active, setActive] = useState(0)

  return (
    <ShowcasePage>
      <PageHeader
        category="Components · Layout"
        title="Card"
        description="Superfície que agrupa conteúdo relacionado. Em papel claro sobre o fundo, com borda sutil e sem sombra — a hierarquia vem do contraste e do espaço."
        source={["src/components/ui/card.tsx", "src/components/opportunity-card.tsx"]}
      />

      <DocSection title="Playground">
        <Playground
          controls={
            <>
              <ControlSegment label="size" value={size} options={sizes} onChange={setSize} />
              <ControlToggle label="CardAction" checked={action} onChange={setAction} />
              <ControlToggle label="CardFooter" checked={footer} onChange={setFooter} />
            </>
          }
          previewClassName="bg-background"
          preview={
            <Card size={size} className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Oportunidades da semana</CardTitle>
                <CardDescription>Priorizadas pelo seu perfil ideal.</CardDescription>
                {action && (
                  <CardAction>
                    <Button variant="ghost" size="icon-sm" aria-label="Mais opções">
                      <MoreHorizontalIcon />
                    </Button>
                  </CardAction>
                )}
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <span className="font-heading text-5xl font-light tracking-display">87%</span>
                <span className="font-mono text-xs tracking-label text-muted-foreground uppercase">Aderência média</span>
              </CardContent>
              {footer && (
                <CardFooter>
                  <Button size={size === "sm" ? "sm" : "default"}>Ver contexto</Button>
                </CardFooter>
              )}
            </Card>
          }
          code={`<Card${size !== "default" ? ` size="${size}"` : ""}>
  <CardHeader>
    <CardTitle>Oportunidades da semana</CardTitle>
    <CardDescription>Priorizadas pelo seu perfil ideal.</CardDescription>${action ? `\n    <CardAction>\n      <Button variant="ghost" size="icon-sm" aria-label="Mais opções"><MoreHorizontalIcon /></Button>\n    </CardAction>` : ""}
  </CardHeader>
  <CardContent>…</CardContent>${footer ? `\n  <CardFooter>\n    <Button>Ver contexto</Button>\n  </CardFooter>` : ""}
</Card>`}
        />
      </DocSection>

      <DocSection
        title="OpportunityCard"
        description="Composição da fynd para a lista priorizada, baseada na tela de interface do Figma. Só o item ativo recebe o ciano."
      >
        <Example
          previewClassName="block bg-background"
          code={`<OpportunityCard
  company="Empresa Exemplo"
  meta="Indústria · 320 pessoas"
  fit={92}
  active
  onClick={…}
/>`}
        >
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            {opportunities.map((o, i) => (
              <OpportunityCard key={o.company} {...o} active={i === active} onClick={() => setActive(i)} />
            ))}
          </div>
        </Example>
        <Example
          title="Com avatar"
          previewClassName="block bg-background"
          code={`<OpportunityCard company="Alfa Embalagens" meta="…" fit={84} showAvatar />`}
        >
          <div className="mx-auto flex max-w-xl flex-col gap-3">
            <OpportunityCard {...opportunities[0]} showAvatar active />
            <OpportunityCard {...opportunities[1]} showAvatar />
          </div>
        </Example>
      </DocSection>

      <DocSection title="Exemplos">
        <div className="grid gap-8 md:grid-cols-2">
          <Example
            title="Contexto"
            description="Painel de detalhe com rótulos mono."
            previewClassName="bg-background"
            code={`<Card>
  <CardHeader>
    <Badge variant="label">Contexto</Badge>
    <CardTitle>Empresa Exemplo</CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="signal" className="w-full">Iniciar conversa</Button>
  </CardFooter>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <CardHeader>
                <span className="font-mono text-xs font-medium tracking-label text-navy-600 uppercase dark:text-steel-300">Contexto</span>
                <CardTitle className="text-2xl font-normal">Empresa Exemplo</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {[
                  ["Por que agora", "Expansão regional recente"],
                  ["Aderência", "92% ao perfil ideal"],
                  ["Quem procurar", "Diretoria comercial"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <span className="font-mono text-[0.6875rem] tracking-label text-muted-foreground uppercase">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="signal" className="w-full">
                  Iniciar conversa
                </Button>
              </CardFooter>
            </Card>
          </Example>

          <Example
            title="Com imagem"
            description="Uma imagem como primeiro filho encosta nas bordas."
            previewClassName="bg-background"
            code={`<Card>
  <Image src="…" alt="…" width={640} height={360} />
  <CardHeader>…</CardHeader>
</Card>`}
          >
            <Card className="w-full max-w-sm">
              <Image src="/brand/slides/luz-revela-caminhos.jpg" alt="Slide ‘Luz revela caminhos’" width={640} height={360} />
              <CardHeader>
                <CardTitle>Luz revela caminhos</CardTitle>
                <CardDescription>Em um cenário nebuloso, a luz reduz a incerteza e mostra por onde seguir.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="link" className="px-0">
                  Ler o conceito
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          </Example>

          <Example
            title="Métrica"
            previewClassName="bg-background"
            code={`<Card size="sm">
  <CardHeader>
    <CardDescription>Novas oportunidades</CardDescription>
    <CardTitle className="text-3xl">128</CardTitle>
    <CardAction><Badge variant="success">+18%</Badge></CardAction>
  </CardHeader>
</Card>`}
          >
            <div className="grid w-full grid-cols-2 gap-3">
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Novas oportunidades</CardDescription>
                  <CardTitle className="font-mono text-3xl font-medium">128</CardTitle>
                  <CardAction>
                    <Badge variant="success">+18%</Badge>
                  </CardAction>
                </CardHeader>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardDescription>Conversas iniciadas</CardDescription>
                  <CardTitle className="font-mono text-3xl font-medium">24</CardTitle>
                  <CardAction>
                    <Badge variant="info">7 dias</Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            </div>
          </Example>

          <Example
            title="Destaque em azul profundo"
            description="Para um único bloco de ênfase por tela."
            code={`<Card className="bg-navy-900 text-paper-50 ring-0">…</Card>`}
          >
            <Card className="w-full max-w-sm bg-navy-900 text-paper-50 ring-0 dark:ring-1 dark:ring-steel-500/45">
              <CardHeader>
                <CardDescription className="text-steel-300">fynd</CardDescription>
                <CardTitle className="text-2xl font-light">Menos lista fria. Mais clareza para vender.</CardTitle>
              </CardHeader>
              <CardFooter className="border-steel-500/30 bg-transparent">
                <Button variant="signal">Encontre o próximo sinal</Button>
              </CardFooter>
            </Card>
          </Example>
        </div>
      </DocSection>

      <DocSection title="Uso">
        <Usage
          importCode={`import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OpportunityCard } from "@/components/opportunity-card"`}
          usageCode={`<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>`}
        />
      </DocSection>

      <DocSection title="Props">
        <PropsTable
          component="Card"
          rows={[{ prop: "size", type: '"default" | "sm"', default: '"default"', description: "Espaçamento interno: 16px ou 12px." }]}
        />
        <PropsTable
          component="CardHeader · CardTitle · CardDescription · CardAction · CardContent · CardFooter"
          rows={[{ prop: "…props", type: 'React.ComponentProps<"div">', description: "CardAction fica no canto superior direito do header; CardFooter recebe fundo e borda." }]}
        />
        <PropsTable
          component="OpportunityCard"
          rows={[
            { prop: "company", type: "string", description: "Nome da empresa." },
            { prop: "meta", type: "string", description: "Linha de contexto (setor, porte)." },
            { prop: "fit", type: "number", description: "Aderência de 0 a 100." },
            { prop: "active", type: "boolean", default: "false", description: "Item em foco: barra ciano e aria-pressed." },
            { prop: "showAvatar", type: "boolean", default: "false", description: "Mostra o CompanyAvatar." },
            { prop: "…props", type: 'React.ComponentProps<"button">', description: "onClick e demais props de botão." },
          ]}
        />
      </DocSection>

      <DocSection title="Acessibilidade">
        <A11yNotes
          items={[
            <>Card é uma <code className="font-mono text-sm">div</code>, sem papel próprio, e CardTitle também. Se o título estrutura a página, coloque um heading real dentro dele (<code className="font-mono text-sm">{"<CardTitle><h3>…</h3></CardTitle>"}</code>).</>,
            <>Não torne o card inteiro clicável com várias ações dentro — escolha uma ação principal.</>,
            <>OpportunityCard é um <code className="font-mono text-sm">button</code> com <code className="font-mono text-sm">aria-pressed</code> e anuncia a aderência por extenso (“Aderência de 92% ao perfil ideal”).</>,
          ]}
        />
      </DocSection>
    </ShowcasePage>
  )
}
