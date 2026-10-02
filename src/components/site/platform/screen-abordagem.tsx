"use client"

import { useState } from "react"
import { stagger, type AnimationSequence } from "motion/react"
import { CheckIcon, InfoIcon, PencilLineIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { CompanyAvatar } from "@/components/company-avatar"
import { CopyButton } from "@/components/site/cult/copy-button"
import { ACTIVE_COMPANY, EMAIL_PLAIN, EMAIL_SUBJECT, PROFILE, USER, type ScreenState } from "./data"
import { EASE_IN_OUT, EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence, useTimeline } from "./playback"
import { PlatformShell } from "./shell"
import type { ScreenLayout } from "./screen-oportunidades"

const TONES = ["Direto", "Consultivo", "Próximo"] as const

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-medium text-muted-foreground">{children}</span>
}

/**
 * Parágrafo com o ponto de conexão em negrito navy-900 sobre `signal-100` (o único ciano da etapa).
 * `tone="neutral"` troca o fundo por `navy-50`: usado nos recortes da seção 3, onde o ciano da dobra é a barra do Serra Azul.
 * O fundo fica numa camada idêntica por baixo do texto e é revelado com `clip-path: inset()`,
 * da esquerda para a direita, sem cortar o texto. Funciona em qualquer largura (inclusive com quebra de linha).
 */
export function HighlightParagraph({
  before,
  mark,
  after,
  hidden,
  tone = "signal",
  className,
  style,
  ...props
}: {
  before: React.ReactNode
  mark: React.ReactNode
  after: React.ReactNode
  hidden: boolean
  tone?: "signal" | "neutral"
} & React.ComponentProps<"p">) {
  return (
    <p className={cn("relative", className)} style={style} {...props}>
      <span
        data-a="mark-bg"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-transparent select-none"
        style={{ clipPath: hidden ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)" }}
      >
        {before}
        <mark className={cn("rounded-[3px] box-decoration-clone", tone === "signal" ? "bg-signal-100" : "bg-navy-50", "px-0.5 font-semibold text-transparent")}>{mark}</mark>
        {after}
      </span>
      <span className="relative">
        {before}
        <mark className="bg-transparent px-0.5 font-semibold text-navy-900">{mark}</mark>
        {after}
      </span>
    </p>
  )
}

/** Conteúdo da tela D (sem o shell). */
export function AbordagemContent({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <AbordagemBody key={key} state={state} layout={layout} />
}

function AbordagemBody({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"
  const itemW = canvas ? 112 : 84
  const [copied, setCopied] = useState(false)

  useTimeline(playing, [
    [2.2, () => setCopied(true)],
    [3.8, () => setCopied(false)],
  ])

  // 04-motion.md §5.4 (cerca de 1,9 s) + fechamento opcional do §5.5 (Copiar + toast interno)
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=head]", { opacity: [0, 1], y: [8, 0] }, { at: 0, duration: 0.4, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=tone-pill]", { x: [0, itemW + 4] }, { at: 0.2, duration: 0.4, ease: EASE_IN_OUT }],
      ["[data-a=para]", { opacity: [0, 1] }, { at: 0.4, duration: 0.5, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=mark-bg]", { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, { at: 0.95, duration: 0.6, ease: EASE_OUT }],
      ["[data-a=label]", { opacity: [0, 1], x: [-6, 0] }, { at: 1.45, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=foot]", { opacity: [0, 1], y: [4, 0] }, { at: 1.6, duration: 0.3, ease: EASE_OUT }],
      ["[data-slot=copy-button]", { scale: [1, 0.97, 1] }, { at: 2.05, duration: 0.2 }],
      ["[data-a=toast]", { opacity: [0, 1], y: [8, 0] }, { at: 2.2, duration: 0.3, ease: EASE_OUT }],
      ["[data-a=toast]", { opacity: [1, 0] }, { at: 3.8, duration: 0.3, ease: EASE_OUT }],
    ]
    return seq
  })

  const head = pre(hidden, { y: 8 })
  const para = pre(hidden)

  const label = (
    <Badge data-a="label" variant="label" style={pre(hidden, { x: -6 })} className={canvas ? "" : "-mt-1"}>
      Ponto de conexão: nova filial
    </Badge>
  )

  return (
    <div ref={scope} data-slot="screen-abordagem" className={cn("relative flex h-full flex-col", canvas ? "px-10 py-7" : "p-4")}>
      <div className={cn("mx-auto flex w-full flex-col", canvas && "max-w-[920px]")}>
        {/* Título + destinatário */}
        <div data-a="head" style={head} className="flex flex-col gap-1.5">
          <h3 className={cn("font-heading font-light tracking-display", canvas ? "text-[1.75rem] leading-tight" : "text-lg font-normal")}>
            Sugestão de primeiro contato
          </h3>
          <span className={cn("flex items-center gap-2 text-muted-foreground", canvas ? "text-sm" : "text-xs")}>
            <span className="font-medium text-foreground">Para:</span>
            <CompanyAvatar name={ACTIVE_COMPANY} size="sm" />
            {ACTIVE_COMPANY} · Compras
          </span>
        </div>

        {/* Seletores */}
        <div data-a="head" style={head} className={cn("flex flex-wrap items-end gap-x-8 gap-y-3", canvas ? "mt-5" : "mt-3.5")}>
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Canal</FieldLabel>
            <ToggleGroup size="sm" spacing={1} value={["email"]} className="rounded-full border border-input p-[3px]">
              <ToggleGroupItem value="email" tabIndex={-1} className="px-4">
                E-mail
              </ToggleGroupItem>
              {/* [validar canais disponíveis no MVP]: até lá, só o e-mail aparece (09-revisao-marca B3). */}
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Tom</FieldLabel>
            <ToggleGroup size="sm" spacing={1} value={["Consultivo"]} className="relative rounded-full border border-input p-[3px]">
              <span
                data-a="tone-pill"
                aria-hidden="true"
                className="absolute top-[3px] left-[3px] h-8 rounded-full bg-muted"
                style={{ width: itemW, transform: `translateX(${hidden ? 0 : itemW + 4}px)` }}
              />
              {TONES.map((tone) => (
                <ToggleGroupItem
                  key={tone}
                  value={tone}
                  tabIndex={-1}
                  className="relative z-10 aria-pressed:bg-transparent data-[state=on]:bg-transparent"
                  style={{ width: itemW }}
                >
                  {tone}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Rascunho */}
        <div className={cn("grid items-start", canvas ? "mt-5 grid-cols-[minmax(0,1fr)_232px] gap-5" : "mt-3.5")}>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div
              data-a="para"
              style={para}
              className={cn("flex items-baseline gap-3 border-b border-border", canvas ? "px-5 py-3 text-sm" : "px-3.5 py-2.5 text-[13px]")}
            >
              <span className="shrink-0 text-muted-foreground">Assunto</span>
              <span className="min-w-0 font-semibold">{EMAIL_SUBJECT}</span>
            </div>
            <div className={cn("flex flex-col", canvas ? "gap-3 px-5 py-4 text-[15px] leading-relaxed" : "gap-2.5 px-3.5 py-3 text-sm leading-relaxed")}>
              <p data-a="para" style={para}>
                Olá, [nome],
              </p>
              <HighlightParagraph
                data-a="para"
                style={para}
                hidden={hidden}
                before="Vi que a Serra Azul "
                mark="abriu uma unidade em Uberlândia neste ano"
                after=". Expansões assim costumam pedir mais volume de embalagem e entregas mais rápidas na nova região."
              />
              {!canvas && <div>{label}</div>}
              <p data-a="para" style={para}>
                Sou da Lumi Embalagens. Atendemos indústrias de alimentos em SP e MG com embalagens flexíveis para biscoitos e snacks.
              </p>
              <p data-a="para" style={para}>
                Faz sentido conversarmos 15 minutos na próxima semana sobre como vocês vão abastecer a nova unidade?
              </p>
              <p data-a="para" style={para}>
                Abraço,
                <br />
                {USER.name}
                <br />
                {USER.company}
              </p>
            </div>
            <div
              data-a="foot"
              style={pre(hidden, { y: 4 })}
              className={cn("flex flex-wrap items-center gap-2 border-t border-border", canvas ? "px-5 py-3" : "px-3.5 py-2.5")}
            >
              <CopyButton value={`${EMAIL_SUBJECT}\n\n${EMAIL_PLAIN}`} copied={copied} notify={false} tabIndex={-1} />
              <Button variant="outline" size="sm" tabIndex={-1}>
                <PencilLineIcon />
                Ajustar
              </Button>
            </div>
          </div>

          {/* Etiqueta ao lado do trecho (canvas) */}
          {canvas && <div className="pt-[98px]">{label}</div>}
        </div>

        <p
          data-a="foot"
          style={pre(hidden, { y: 4 })}
          className={cn("flex items-center gap-1.5 text-muted-foreground", canvas ? "mt-3 text-[13px]" : "mt-2.5 text-xs")}
        >
          <InfoIcon className="size-3.5 shrink-0" />
          Você revisa antes de enviar. A fynd não envia mensagens por você.
        </p>
      </div>

      {/* Toast interno (só durante o play) */}
      {playing && (
        <div
          data-a="toast"
          style={{ opacity: 0 }}
          className={cn(
            "absolute flex items-center gap-2 rounded-lg border border-border bg-popover px-4 py-3 text-sm font-medium text-popover-foreground shadow-lg",
            canvas ? "right-10 bottom-8" : "right-3 bottom-3"
          )}
        >
          <CheckIcon className="size-4 text-success" />
          Mensagem copiada.
        </div>
      )}
    </div>
  )
}

/** Tela D completa (shell + rascunho), para o canvas de 1280×800. */
export function ScreenAbordagem({ state }: { state: ScreenState }) {
  return (
    <PlatformShell active="Oportunidades" breadcrumb={["Perfis ideais", PROFILE, ACTIVE_COMPANY]}>
      <AbordagemContent state={state} />
    </PlatformShell>
  )
}
