"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowUpIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { Wordmark } from "@/components/brand/wordmark"
import { CompanyAvatar } from "@/components/company-avatar"
import { TextType } from "@/components/site/reactbits/text-type"
import { CAMILA_MESSAGE, CHAT_CRITERIA, PROFILE, USER, type ScreenState } from "./data"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "./playback"
import { PlatformShell } from "./shell"
import type { ScreenLayout } from "./screen-oportunidades"

/** Avatar da fynd no chat (wordmark, sem o símbolo). */
export function FyndAvatar({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-paper-50", className)}>
      <Wordmark className="h-2.5 w-auto" title="fynd" />
    </span>
  )
}

/** Chip "Rótulo: valor" de critério extraído. O ciano fica só no chip de sinal. */
export function CriterionChip({
  label,
  value,
  signal,
  size = "md",
  ...props
}: { label?: string; value: string; signal?: boolean; size?: "sm" | "md" } & React.ComponentProps<"span">) {
  return (
    <Badge
      variant={signal ? "signal" : "outline"}
      className={cn(!signal && "bg-card",size === "md" ? "h-8 gap-1.5 px-3.5 text-sm" : "h-6 gap-1 px-2.5 text-xs")}
      {...props}
    >
      {label && <span className="font-normal">{label}:</span>}
      <span className="font-semibold">{value}</span>
    </Badge>
  )
}

const BUBBLE_TEXT = "text-[15px] leading-relaxed px-4 py-2.5"

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela B (sem o shell). */
export function ConversaContent({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <ConversaBody key={key} state={state} layout={layout} />
}

function ConversaBody({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"

  // 04-motion.md §5.1 (cerca de 4,9 s)
  const scope = useScreenSequence(state, () => {
    const up = (y = 8) => ({ opacity: [0, 1], y: [y, 0] })
    const seq: AnimationSequence = [
      ["[data-a=placeholder]", { opacity: [1, 0] }, { at: 0, duration: 0.15 }],
      ["[data-a=typed]", { opacity: [0, 1] }, { at: 0, duration: 0.01 }],
      ["[data-a=send]", { scale: [1, 0.94, 1] }, { at: 1.85, duration: 0.2 }],
      ["[data-a=typed]", { opacity: [1, 0] }, { at: 1.95, duration: 0.15 }],
      ["[data-a=placeholder]", { opacity: [0, 1] }, { at: 1.95, duration: 0.15 }],
      ["[data-a=camila]", up(), { at: 1.95, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=dots]", { opacity: [0, 1, 1, 0] }, { at: 2.45, duration: 0.6, times: [0, 0.15, 0.85, 1] }],
      ["[data-a=dot]", { opacity: [0.3, 1, 0.3, 1, 0.3] }, { at: 2.45, duration: 0.6, delay: stagger(0.08) }],
      ["[data-a=fynd]", up(), { at: 3.05, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=chip]", { opacity: [0, 1], scale: [0.96, 1], y: [4, 0] }, { at: 3.35, duration: 0.45, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=ask]", up(), { at: 3.95, duration: 0.4, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=search]", { scale: [1, 0.97, 1] }, { at: 4.35, duration: 0.2 }],
      ["[data-a=result]", up(), { at: 4.55, duration: 0.4, ease: EASE_OUT }],
    ]
    return seq
  })

  const bubbleHidden = pre(hidden, { y: 8 })

  return (
    <div ref={scope} data-slot="screen-conversa" className="flex h-full flex-col">
      {canvas && (
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-10">
          <h3 className="font-heading text-lg font-normal">Novo perfil ideal</h3>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <CompanyAvatar name={USER.name} size="sm" />
            {USER.name}
          </span>
        </div>
      )}

      {/* Thread */}
      <div className={cn("flex min-h-0 flex-1 flex-col justify-end", canvas ? "px-10 py-6" : "px-4 pt-4 pb-3")}>
        <div className={cn("mx-auto flex w-full flex-col", canvas ? "max-w-[760px] gap-5" : "gap-3.5")}>
          {/* Mensagem da Camila */}
          <Message align="end" data-a="camila" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar>
                <CompanyAvatar name={USER.name} />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="default" className={canvas ? "max-w-[78%]" : "max-w-[88%]"}>
                <BubbleContent className={canvas ? BUBBLE_TEXT : "px-3 py-2 text-sm"}>{CAMILA_MESSAGE}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* Resposta da fynd + chips */}
          <div className="relative">
            {hidden && (
              <div
                data-a="dots"
                style={{ opacity: 0 }}
                className="absolute top-0 left-0 flex items-center gap-2"
                aria-hidden="true"
              >
                {canvas && <FyndAvatar />}
                <span className="flex h-9 items-center gap-1 rounded-xl bg-secondary px-3.5">
                  <span data-a="dot" className="size-1.5 rounded-full bg-steel-500" />
                  <span data-a="dot" className="size-1.5 rounded-full bg-steel-500" />
                  <span data-a="dot" className="size-1.5 rounded-full bg-steel-500" />
                  <span className="sr-only">fynd está escrevendo</span>
                </span>
              </div>
            )}
            <Message data-a="fynd" style={bubbleHidden}>
              {canvas && (
                <MessageAvatar className="self-start">
                  <FyndAvatar />
                </MessageAvatar>
              )}
              <MessageContent>
                <Bubble variant="secondary" className="max-w-full">
                  <BubbleContent className={cn(canvas ? BUBBLE_TEXT : "px-3 py-2 text-sm", "flex flex-col gap-3")}>
                    <span>Entendi. Vou buscar empresas com estes critérios:</span>
                    <span className="flex flex-wrap gap-2">
                      {CHAT_CRITERIA.map((c) => (
                        <CriterionChip
                          key={c.label}
                          data-a="chip"
                          style={pre(hidden, { y: 4, scale: 0.96 })}
                          label={c.label}
                          value={c.value}
                          signal={c.signal}
                          size={canvas ? "md" : "sm"}
                        />
                      ))}
                    </span>
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </div>

          {/* Pergunta + botões */}
          <Message>
            {canvas && <MessageAvatar className="invisible" />}
            <MessageContent className="gap-2.5">
              <Bubble variant="secondary" data-a="ask" style={bubbleHidden}>
                <BubbleContent className={canvas ? BUBBLE_TEXT : "px-3 py-2 text-sm"}>
                  Quer ajustar algo antes de eu buscar?
                </BubbleContent>
              </Bubble>
              <div className="flex gap-2">
                <span data-a="ask" style={bubbleHidden}>
                  <Button data-a="search" size={canvas ? "sm" : "xs"} tabIndex={-1}>
                    <SearchIcon />
                    Buscar empresas
                  </Button>
                </span>
                <span data-a="ask" style={bubbleHidden}>
                  <Button variant="outline" size={canvas ? "sm" : "xs"} tabIndex={-1}>
                    <SlidersHorizontalIcon />
                    Ajustar critérios
                  </Button>
                </span>
              </div>
            </MessageContent>
          </Message>

          {/* Resultado */}
          <Message data-a="result" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar className="self-start">
                <FyndAvatar />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="secondary" className={canvas ? "max-w-[78%]" : "max-w-full"}>
                <BubbleContent className={canvas ? BUBBLE_TEXT : "px-3 py-2 text-sm"}>
                  Encontrei 148 empresas compatíveis e priorizei as 12 com maior aderência. Salvei como &ldquo;{PROFILE}&rdquo;.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>

      {/* Campo de entrada */}
      <div className={cn("shrink-0", canvas ? "px-10 pb-6" : "border-t border-border px-4 py-3")}>
        <div className={cn("mx-auto w-full", canvas && "max-w-[760px]")}>
          <div
            className={cn(
              "relative flex items-start gap-3 rounded-2xl border border-input bg-card",
              canvas ? "h-[92px] p-3 pl-4" : "h-[68px] p-2.5 pl-3.5"
            )}
          >
            <div className={cn("relative min-w-0 flex-1 leading-relaxed", canvas ? "pt-0.5 text-[15px]" : "text-sm")}>
              <span data-a="placeholder" className="absolute inset-x-0 top-0 text-muted-foreground">
                Descreva o seu cliente ideal…
              </span>
              {hidden && (
                <span data-a="typed" style={{ opacity: 0 }} className="relative block">
                  <TextType
                    text={CAMILA_MESSAGE}
                    play={playing}
                    delay={0.15}
                    duration={1.4}
                    hideCursorWhenDone={false}
                    className={canvas ? "" : "line-clamp-2"}
                  />
                </span>
              )}
            </div>
            <Button data-a="send" size="icon-sm" className="self-end" tabIndex={-1}>
              <ArrowUpIcon />
              <span className="sr-only">Enviar</span>
            </Button>
          </div>
          <p className={cn("mt-2 text-muted-foreground", canvas ? "text-[13px]" : "text-xs")}>
            Você pode refinar o perfil a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  )
}

/** Tela B completa (shell + conversa), para o canvas de 1280×800. */
export function ScreenConversa({ state }: { state: ScreenState }) {
  return (
    <PlatformShell active="Conversas" breadcrumb={["Conversas", "Novo perfil ideal"]} activeProfile={null}>
      <ConversaContent state={state} />
    </PlatformShell>
  )
}
