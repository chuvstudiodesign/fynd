"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { ArrowUpIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { CompanyAvatar } from "@/components/company-avatar"
import { TextType } from "@/components/site/reactbits/text-type"
import { CriterionChip, FyndAvatar } from "@/components/site/platform/screen-conversa"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import { CAMILA_SELLS, FUNNEL, INFERRED_CRITERIA, SEARCH, USER_V3, type ScreenState } from "./data-v3"

const BUBBLE_TEXT = "text-[15px] leading-relaxed px-4 py-2.5"

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 1 (conversa "o que você vende"), sem o shell. */
export function ConversaV3Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <ConversaV3Body key={key} state={state} layout={layout} />
}

function ConversaV3Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"

  // Mesma coreografia da v1 (04-motion.md §5.1), com a continuação da fynd separada dos chips (cerca de 5,2 s)
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
      ["[data-a=ask]", up(), { at: 4.0, duration: 0.4, delay: stagger(0.06), ease: EASE_OUT }],
      ["[data-a=search]", { scale: [1, 0.97, 1] }, { at: 4.6, duration: 0.2 }],
      ["[data-a=result]", up(), { at: 4.8, duration: 0.4, ease: EASE_OUT }],
    ]
    return seq
  })

  const bubbleHidden = pre(hidden, { y: 8 })
  const text = canvas ? BUBBLE_TEXT : "px-3 py-2 text-sm"

  return (
    <div ref={scope} data-slot="screen-conversa-v3" className="flex h-full flex-col">
      {canvas && (
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-10">
          <h3 className="font-heading text-lg font-normal">Nova busca</h3>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <CompanyAvatar name={USER_V3.name} size="sm" />
            {USER_V3.name}
          </span>
        </div>
      )}

      {/* Thread */}
      <div className={cn("flex min-h-0 flex-1 flex-col justify-end", canvas ? "px-10 py-5" : "px-4 pt-4 pb-3")}>
        <div className={cn("mx-auto flex w-full flex-col", canvas ? "max-w-[780px] gap-4" : "gap-3")}>
          {/* Mensagem da Camila: o produto, não o ICP */}
          <Message align="end" data-a="camila" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar>
                <CompanyAvatar name={USER_V3.name} />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="default" className={canvas ? "max-w-[78%]" : "max-w-[90%]"}>
                <BubbleContent className={text}>{CAMILA_SELLS}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* Resposta da fynd + critérios inferidos */}
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
                  <BubbleContent className={cn(text, "flex flex-col", canvas ? "gap-3" : "gap-2.5")}>
                    <span>Entendi. Pelo que você vende, estas empresas costumam ter fit:</span>
                    <span className={cn("flex flex-wrap", canvas ? "gap-2" : "gap-1.5")}>
                      {INFERRED_CRITERIA.map((c) => (
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

          {/* Continuação + botões */}
          <Message>
            {canvas && <MessageAvatar className="invisible" />}
            <MessageContent className="gap-2.5">
              <Bubble variant="secondary" data-a="ask" style={bubbleHidden} className={canvas ? "max-w-[86%]" : "max-w-full"}>
                <BubbleContent className={text}>
                  Empresas em expansão costumam precisar de mais embalagem. Quer ajustar algo antes de eu buscar?
                </BubbleContent>
              </Bubble>
              <div className="flex flex-wrap gap-2">
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

          {/* Resultado: ponte para a tela 2 */}
          <Message data-a="result" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar className="self-start">
                <FyndAvatar />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="secondary" className={canvas ? "max-w-[86%]" : "max-w-full"}>
                <BubbleContent className={text}>
                  Encontrei {FUNNEL.fit} empresas com fit. O primeiro contato começa por {FUNNEL.contacted} delas, e você é
                  avisada quando alguém demonstrar interesse. Salvei como &ldquo;{SEARCH}&rdquo;.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>

      {/* Campo de entrada */}
      <div className={cn("shrink-0", canvas ? "px-10 pb-5" : "border-t border-border px-4 py-3")}>
        <div className={cn("mx-auto w-full", canvas && "max-w-[780px]")}>
          <div
            className={cn(
              "relative flex items-start gap-3 rounded-2xl border border-input bg-card",
              canvas ? "h-[84px] p-3 pl-4" : "h-[68px] p-2.5 pl-3.5"
            )}
          >
            <div className={cn("relative min-w-0 flex-1 leading-relaxed", canvas ? "pt-0.5 text-[15px]" : "text-sm")}>
              <span data-a="placeholder" className="absolute inset-x-0 top-0 text-muted-foreground">
                Conte o que a sua empresa vende…
              </span>
              {hidden && (
                <span data-a="typed" style={{ opacity: 0 }} className="relative block">
                  <TextType
                    text={CAMILA_SELLS}
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
            Não precisa saber o seu cliente ideal. A fynd sugere, você ajusta.
          </p>
        </div>
      </div>
    </div>
  )
}
