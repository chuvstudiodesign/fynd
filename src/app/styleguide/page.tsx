import {
  ArrowRightIcon,
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Wordmark } from "@/components/brand/wordmark"

type Step = { step: string; hex: string; brand?: string }

const scales: { name: string; token: string; description: string; steps: Step[] }[] = [
  {
    name: "Navy",
    token: "navy",
    description: "Primária. Base de confiança, foco e sofisticação — o campo noturno onde a luz ganha sentido.",
    steps: [
      { step: "50", hex: "#EEF3F8" },
      { step: "100", hex: "#D6E2EE" },
      { step: "200", hex: "#AFC5DB" },
      { step: "300", hex: "#7FA0C1" },
      { step: "400", hex: "#5680A6" },
      { step: "500", hex: "#3A6892" },
      { step: "600", hex: "#2A567F", brand: "Azul estrutural" },
      { step: "700", hex: "#214467" },
      { step: "800", hex: "#1C3550", brand: "Superfície escura" },
      { step: "900", hex: "#0B1F32", brand: "Azul profundo" },
    ],
  },
  {
    name: "Signal",
    token: "signal",
    description: "Ciano é luz: clareza, sinal e prioridade. Uso raro (≈6%) e nunca como texto sobre fundo claro.",
    steps: [
      { step: "50", hex: "#EEFBFD" },
      { step: "100", hex: "#D3F4F8" },
      { step: "200", hex: "#AEE9F1" },
      { step: "300", hex: "#86DDE8" },
      { step: "400", hex: "#5DD1E0", brand: "Ciano" },
      { step: "500", hex: "#36B8C9" },
      { step: "600", hex: "#2493A3" },
      { step: "700", hex: "#1E7582" },
      { step: "800", hex: "#1D5E69" },
      { step: "900", hex: "#1B4E57" },
    ],
  },
  {
    name: "Steel",
    token: "steel",
    description: "Cinza azulado. Texto de apoio, metadados e informação secundária.",
    steps: [
      { step: "50", hex: "#F2F5F7" },
      { step: "100", hex: "#E1E7EC" },
      { step: "200", hex: "#C4D0DA" },
      { step: "300", hex: "#9FB0C0", brand: "Apoio no escuro" },
      { step: "400", hex: "#7A8EA1" },
      { step: "500", hex: "#516578", brand: "Cinza azulado" },
      { step: "600", hex: "#435567" },
      { step: "700", hex: "#364555" },
      { step: "800", hex: "#293542" },
      { step: "900", hex: "#1B2530" },
    ],
  },
  {
    name: "Paper",
    token: "paper",
    description: "Neutros quentes. Superfícies claras, cartões e divisores.",
    steps: [
      { step: "50", hex: "#F8F7F3", brand: "Cartão" },
      { step: "100", hex: "#F3F1EC", brand: "Fundo" },
      { step: "200", hex: "#E9E6DF" },
      { step: "300", hex: "#D5D1C8", brand: "Borda" },
      { step: "400", hex: "#B4AFA4" },
      { step: "500", hex: "#8E897F" },
      { step: "600", hex: "#6C675E" },
      { step: "700", hex: "#4F4B44" },
      { step: "800", hex: "#35322D" },
      { step: "900", hex: "#1F1D1A" },
    ],
  },
]

const themeTokens: { group: string; tokens: [string, string?][] }[] = [
  {
    group: "Base",
    tokens: [
      ["background", "foreground"],
      ["card", "card-foreground"],
      ["popover", "popover-foreground"],
    ],
  },
  {
    group: "Ação",
    tokens: [
      ["primary", "primary-foreground"],
      ["secondary", "secondary-foreground"],
      ["accent", "accent-foreground"],
      ["signal", "signal-foreground"],
    ],
  },
  {
    group: "Apoio",
    tokens: [
      ["muted", "muted-foreground"],
      ["border"],
      ["input"],
      ["ring"],
    ],
  },
]

const semantic = [
  { token: "success", label: "Sucesso" },
  { token: "warning", label: "Atenção" },
  { token: "destructive", label: "Erro" },
  { token: "info", label: "Informação" },
]

const charts = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

const typeScale = [
  { label: "Display", spec: "Sora Light · 72/1.04 · -2.5%", className: "font-heading text-7xl leading-[1.04] font-light tracking-display", sample: "Ilumine as oportunidades certas." },
  { label: "H1", spec: "Sora Light · 56/1.08", className: "font-heading text-[3.5rem] leading-[1.08] font-light tracking-display", sample: "Encontre o próximo sinal." },
  { label: "H2", spec: "Sora Light · 40/1.1", className: "font-heading text-[2.5rem] leading-[1.1] font-light tracking-display", sample: "Clareza em meio ao volume" },
  { label: "H3", spec: "Sora Regular · 28/1.2", className: "font-heading text-[1.75rem] leading-[1.2] font-normal tracking-tight", sample: "Oportunidades da semana" },
  { label: "H4", spec: "Sora Regular · 22/1.3", className: "font-heading text-[1.375rem] leading-[1.3] font-normal", sample: "Empresa Exemplo" },
  { label: "Lead", spec: "Manrope Regular · 22/1.55", className: "text-[1.375rem] leading-[1.55] text-muted-foreground", sample: "Empresas priorizadas a partir do seu perfil de cliente ideal, com contexto para iniciar uma conversa comercial relevante." },
  { label: "Body", spec: "Manrope Regular · 16/1.6", className: "text-base leading-[1.6]", sample: "A fynd cruza o perfil de cliente ideal com bases empresariais e apoia o contato inicial, para que o time comercial priorize oportunidades mais qualificadas." },
  { label: "Small", spec: "Manrope Medium · 14/1.5", className: "text-sm leading-normal font-medium", sample: "Indústria · 320 pessoas" },
  { label: "Label", spec: "IBM Plex Mono Medium · 12 · +12% · caixa alta", className: "font-mono text-xs font-medium tracking-label uppercase text-muted-foreground", sample: "Aderência ao perfil" },
  { label: "Data", spec: "IBM Plex Mono Medium · 20", className: "font-mono text-xl font-medium", sample: "92%" },
]

const radii = [
  { name: "rounded-sm", value: "4.8px" },
  { name: "rounded-md", value: "6.4px" },
  { name: "rounded-lg", value: "8px" },
  { name: "rounded-xl", value: "10px" },
  { name: "rounded-2xl", value: "12px" },
  { name: "rounded-full", value: "pílula" },
]

const shadows = [
  { name: "shadow-none", note: "Padrão da marca (plano)" },
  { name: "shadow-xs", note: "Controles" },
  { name: "shadow-sm", note: "Cartões elevados" },
  { name: "shadow-md", note: "Menus e popovers" },
  { name: "shadow-lg", note: "Diálogos" },
]

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-8 border-t border-border py-16 first:border-t-0 first:pt-0">
      <header className="flex max-w-2xl flex-col gap-3">
        <span className="font-mono text-xs font-medium tracking-label text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h2 className="text-4xl">{title}</h2>
        {description && <p className="text-base leading-relaxed text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  )
}

function TokenSwatch({ token, pair }: { token: string; pair?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-24 items-end rounded-lg p-3 ring-1 ring-foreground/10"
        style={{ background: `var(--${token})`, color: pair ? `var(--${pair})` : undefined }}
      >
        {pair && <span className="font-heading text-2xl font-light">Aa</span>}
      </div>
      <div className="flex flex-col">
        <code className="font-mono text-xs">--{token}</code>
        {pair && <code className="font-mono text-xs text-muted-foreground">--{pair}</code>}
      </div>
    </div>
  )
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-12 py-16">
      {/* Hero */}
      <div className="mb-16 flex flex-col gap-6 overflow-hidden rounded-xl bg-navy-900 p-12 text-paper-50 dark:ring-1 dark:ring-steel-500/45">
        <span className="font-mono text-xs font-medium tracking-label text-steel-300 uppercase">
          Design System · v0.1
        </span>
        <Wordmark className="h-24 w-auto self-start" />
        <p className="max-w-xl text-lg leading-relaxed text-steel-300">
          Tokens de cor, tipografia, raio e sombra da fynd. A base neutra dá leitura, os azuis organizam, e o ciano
          ilumina apenas o que importa.
        </p>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-signal-400" />
          <span className="font-mono text-xs tracking-label text-signal-400 uppercase">Ilumine as oportunidades certas</span>
        </div>
      </div>

      {/* Palette */}
      <Section
        id="cores"
        eyebrow="01 — Cor"
        title="A cor tem função."
        description="Base, estrutura, informação e sinal têm papéis diferentes. A proporção protege o contraste — e a raridade do ciano."
      >
        <div className="flex h-28 overflow-hidden rounded-lg dark:ring-1 dark:ring-steel-500/45">
          <div className="flex flex-[62] items-end bg-navy-900 p-3 font-mono text-xs text-paper-50">62% Base</div>
          <div className="flex flex-[20] items-end bg-navy-600 p-3 font-mono text-xs text-paper-50">20% Estrutura</div>
          <div className="flex flex-[12] items-end bg-steel-500 p-3 font-mono text-xs text-paper-50">12% Info</div>
          <div className="flex flex-[6] items-end bg-signal-400 p-3 font-mono text-xs text-[#171925]">6%</div>
        </div>

        {themeTokens.map((group) => (
          <div key={group.group} className="flex flex-col gap-4">
            <h3 className="font-sans text-sm font-semibold tracking-normal">{group.group}</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {group.tokens.map(([token, pair]) => (
                <TokenSwatch key={token} token={token} pair={pair} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Scales */}
      <Section
        id="escalas"
        eyebrow="02 — Escalas"
        title="Escalas de marca"
        description="Valores crus, de 50 a 900. Os passos marcados vêm direto do Figma; os demais foram interpolados para manter a harmonia. Disponíveis como bg-navy-600, text-steel-500 etc."
      >
        {scales.map((scale) => (
          <div key={scale.name} className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-sans text-sm font-semibold tracking-normal">{scale.name}</h3>
              <p className="text-right text-sm text-muted-foreground">{scale.description}</p>
            </div>
            <div className="grid grid-cols-10 overflow-hidden rounded-lg ring-1 ring-foreground/10">
              {scale.steps.map((s) => (
                <div
                  key={s.step}
                  className="relative flex h-24 flex-col justify-end p-2"
                  style={{ background: `var(--${scale.token}-${s.step})` }}
                >
                  {s.brand && (
                    <span className="absolute top-2 left-2 size-1.5 rounded-full bg-current opacity-70 mix-blend-difference" />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-10 gap-0">
              {scale.steps.map((s) => (
                <div key={s.step} className="flex flex-col px-1">
                  <span className="font-mono text-xs font-medium">{s.step}</span>
                  <span className="font-mono text-[0.625rem] text-muted-foreground">{s.hex}</span>
                  {s.brand && <span className="mt-1 text-[0.6875rem] leading-tight font-semibold">{s.brand}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Semantic */}
      <Section
        id="semanticas"
        eyebrow="03 — Semânticas"
        title="Estados e dados"
        description="Cores de feedback calibradas para o azul da marca, com contraste mínimo de 4,5:1 contra o texto de cada par."
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {semantic.map((s) => (
            <div key={s.token} className="flex flex-col gap-2">
              <div
                className="flex h-24 items-end rounded-lg p-3"
                style={{ background: `var(--${s.token})`, color: `var(--${s.token}-foreground)` }}
              >
                <span className="text-sm font-semibold">{s.label}</span>
              </div>
              <code className="font-mono text-xs">--{s.token}</code>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-sans text-sm font-semibold tracking-normal">Gráficos</h3>
          <div className="grid grid-cols-5 gap-4">
            {charts.map((c) => (
              <div key={c} className="flex flex-col gap-2">
                <div className="h-16 rounded-lg ring-1 ring-foreground/10" style={{ background: `var(--${c})` }} />
                <code className="font-mono text-xs">--{c}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section
        id="tipografia"
        eyebrow="04 — Tipografia"
        title="Clara antes de ser expressiva."
        description="Sora para títulos e ideias, Manrope para leitura e interface, IBM Plex Mono para dados e rótulos. O wordmark é desenho, não fonte — nunca é usado para compor texto."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { family: "Sora", role: "Títulos e ideias", className: "font-heading font-light", token: "font-heading" },
            { family: "Manrope", role: "Leitura e interface", className: "font-sans", token: "font-sans" },
            { family: "IBM Plex Mono", role: "Dados e rótulos", className: "font-mono", token: "font-mono" },
          ].map((f) => (
            <div key={f.family} className="flex items-center gap-6 rounded-lg border border-border bg-card p-6">
              <span className={`${f.className} text-6xl`}>Aa</span>
              <div className="flex flex-col">
                <span className="font-semibold">{f.family}</span>
                <span className="text-sm text-muted-foreground">{f.role}</span>
                <code className="mt-1 font-mono text-xs text-muted-foreground">{f.token}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col divide-y divide-border">
          {typeScale.map((t) => (
            <div key={t.label} className="grid grid-cols-[10rem_1fr] items-baseline gap-8 py-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{t.label}</span>
                <span className="font-mono text-[0.6875rem] text-muted-foreground">{t.spec}</span>
              </div>
              <p className={t.className}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Radius */}
      <Section
        id="raio"
        eyebrow="05 — Forma"
        title="Raio de borda"
        description="Cantos contidos em superfícies (6–10px) e pílula para ações e filtros. Base: --radius = 0.5rem."
      >
        <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col gap-2">
              <div className={`h-20 border border-navy-600/40 bg-navy-50 dark:bg-navy-800 ${r.name}`} />
              <code className="font-mono text-xs">{r.name}</code>
              <span className="font-mono text-[0.625rem] text-muted-foreground">{r.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section
        id="sombras"
        eyebrow="06 — Profundidade"
        title="Sombras"
        description="A fynd é plana: hierarquia vem de contraste e espaço, não de sombra. Sombras sutis ficam reservadas para camadas que flutuam."
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {shadows.map((s) => (
            <div key={s.name} className="flex flex-col gap-3">
              <div className={`h-24 rounded-lg bg-card ${s.name}`} />
              <code className="font-mono text-xs">{s.name}</code>
              <span className="text-xs text-muted-foreground">{s.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Components */}
      <Section
        id="componentes"
        eyebrow="07 — Componentes"
        title="Componentes com os tokens"
        description="Button, Card, Badge, Alert e Radio Group já usando a paleta, as fontes e os raios da fynd."
      >
        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-sm font-semibold tracking-normal">Button</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Ver contexto</Button>
            <Button variant="signal">
              Iniciar conversa
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Remover</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Desabilitado</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-sm font-semibold tracking-normal">Badge</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="signal">Novo sinal</Badge>
            <Badge variant="success">Qualificada</Badge>
            <Badge variant="warning">Revisar</Badge>
            <Badge variant="info">Em análise</Badge>
            <Badge variant="destructive">Descartada</Badge>
            <Badge variant="label">Conceito de aplicação</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-sm font-semibold tracking-normal">Card</h3>
            <Card>
              <CardHeader>
                <span className="font-mono text-xs font-medium tracking-label text-navy-600 uppercase dark:text-steel-300">
                  Oportunidades da semana
                </span>
                <CardTitle className="font-heading text-3xl font-light tracking-display">
                  Encontre o próximo sinal.
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Empresas priorizadas a partir do seu perfil de cliente ideal, com contexto para iniciar uma conversa
                  comercial relevante.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <span className="font-heading text-6xl font-light tracking-display">87%</span>
                <span className="font-mono text-xs tracking-label text-muted-foreground uppercase">
                  Aderência ao perfil · exemplo
                </span>
              </CardContent>
              <CardFooter>
                <Button>Ver contexto</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-sm font-semibold tracking-normal">Radio Group</h3>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl font-normal">Porte da empresa</CardTitle>
                <CardDescription>Refine o perfil de cliente ideal.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="200-500">
                  {[
                    { value: "50-200", label: "50–200 pessoas" },
                    { value: "200-500", label: "200–500 pessoas" },
                    { value: "500+", label: "Mais de 500 pessoas" },
                  ].map((o) => (
                    <div key={o.value} className="flex items-center gap-3">
                      <RadioGroupItem value={o.value} id={`porte-${o.value}`} />
                      <Label htmlFor={`porte-${o.value}`}>{o.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <h3 className="mt-2 font-sans text-sm font-semibold tracking-normal">Alert</h3>
            <div className="flex flex-col gap-3">
              <Alert variant="info">
                <InfoIcon />
                <AlertTitle>Base atualizada</AlertTitle>
                <AlertDescription>Novos CNPJs da Receita Federal foram cruzados com o seu perfil.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <CheckCircle2Icon />
                <AlertTitle>Perfil salvo</AlertTitle>
                <AlertDescription>12 empresas com aderência acima de 80%.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <TriangleAlertIcon />
                <AlertTitle>Contato incompleto</AlertTitle>
                <AlertDescription>Revise o responsável antes de iniciar a conversa.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <XCircleIcon />
                <AlertTitle>Falha na importação</AlertTitle>
                <AlertDescription>O arquivo não segue o formato esperado.</AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
