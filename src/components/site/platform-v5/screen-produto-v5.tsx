"use client"

import { stagger, type AnimationSequence } from "motion/react"
import { CheckIcon, MessageCircleIcon, UserRoundIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "@/components/ui/message"
import { CompanyAvatar } from "@/components/company-avatar"
import { TextType } from "@/components/site/reactbits/text-type"
import { CriterionChip } from "@/components/site/platform/screen-conversa"
import { EASE_OUT, pre, useEffectiveState, useReplayKey, useScreenSequence } from "@/components/site/platform/playback"
import type { ScreenLayout } from "@/components/site/platform/screen-oportunidades"
import {
  ATTACHMENTS,
  BRIDGE_MESSAGE,
  CAMILA_CNPJ,
  CAMILA_PRODUCT,
  FYND_GREETING,
  PROFILE_INTRO,
  PROFILE_V5,
  SPECIALIST,
  UNDERSTOOD,
  UNDERSTOOD_INTRO,
  USER_V5,
  type ScreenState,
} from "./data-v5"
import { AttachmentChip, FyndAvatar } from "./parts-v5"

/* Tempos (s): 04-motion-v5 §1.4, sem o compositor (03-design-v5 §4.3: a tela não é uma conversa aberta).
   A mensagem da Camila é "digitada" dentro do próprio balão, com a largura final reservada (sem reflow). */
const T = {
  greet: 0,
  bubble: 0.1,
  cnpj: 0.15,
  product: 0.75,
  attach: 2.0,
  understood: 3.05,
  chips: 3.3,
  specialist: 3.85,
  bridge: 4.05,
}

interface Props {
  state: ScreenState
  layout?: ScreenLayout
}

/** Conteúdo da tela 1 (Seu produto), sem o shell. */
export function ProdutoV5Content({ state: rawState, layout = "canvas" }: Props) {
  const state = useEffectiveState(rawState)
  const key = useReplayKey(state)
  return <ProdutoV5Body key={key} state={state} layout={layout} />
}

/** Texto digitado com a área final reservada: o fantasma invisível segura a altura e a largura. */
function Typed({ text, play, hidden, delay, duration }: { text: string; play: boolean; hidden: boolean; delay: number; duration: number }) {
  if (!hidden) return <span>{text}</span>
  return (
    <span className="grid">
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {text}
      </span>
      <TextType text={text} play={play} delay={delay} duration={duration} className="[grid-area:1/1]" />
    </span>
  )
}

function ProdutoV5Body({ state, layout = "canvas" }: Props) {
  const hidden = state !== "final"
  const playing = state === "play"
  const canvas = layout === "canvas"

  const scope = useScreenSequence(state, () => {
    const up = (y = 8) => ({ opacity: [0, 1], y: [y, 0] })
    const pop = { opacity: [0, 1], scale: [0.96, 1], y: [4, 0] }
    const seq: AnimationSequence = [
      ["[data-a=greet]", up(), { at: T.greet, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=camila]", up(), { at: T.bubble, duration: 0.3, ease: EASE_OUT }],
      ["[data-a=attach]", pop, { at: T.attach, duration: 0.35, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=understood]", up(), { at: T.understood, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=chip]", pop, { at: T.chips, duration: 0.45, delay: stagger(0.08), ease: EASE_OUT }],
      ["[data-a=specialist]", up(), { at: T.specialist, duration: 0.4, ease: EASE_OUT }],
      ["[data-a=bridge]", up(), { at: T.bridge, duration: 0.4, ease: EASE_OUT }],
    ]
    return seq
  })

  const bubbleHidden = pre(hidden, { y: 8 })
  const text = canvas ? "px-4 py-2.5 text-[15px] leading-relaxed" : "px-3 py-2 text-sm"

  return (
    <div ref={scope} data-slot="screen-produto-v5" className="flex h-full flex-col">
      <div className={cn("flex min-h-0 flex-1 flex-col justify-end", canvas ? "px-10 py-4" : "px-4 py-4")}>
        {/* QA I2: gap-3 e py-4 no canvas dão ~40px de folga a mais; a pergunta do topo não corta se o conteúdo crescer. */}
        <div className={cn("mx-auto flex w-full flex-col", canvas ? "max-w-[800px] gap-3" : "gap-3")}>
          {/* Pergunta da fynd: a essência ("O que você quer vender?") */}
          <Message data-a="greet" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar className="self-start">
                <FyndAvatar />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="secondary" className="max-w-full">
                <BubbleContent className={text}>{FYND_GREETING}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* Mensagem da Camila: CNPJ + o que vende, do jeito dela, e os anexos */}
          <Message align="end">
            {canvas && (
              <MessageAvatar className="self-start">
                <CompanyAvatar name={USER_V5.name} />
              </MessageAvatar>
            )}
            <MessageContent className="items-end gap-2">
              <Bubble
                variant="default"
                data-a="camila"
                style={bubbleHidden}
                className={canvas ? "max-w-[82%]" : "max-w-[92%]"}
              >
                <BubbleContent className={cn(text, "flex flex-col gap-1")}>
                  <span className="font-mono text-[0.92em] tabular-nums">
                    <Typed text={CAMILA_CNPJ} play={playing} hidden={hidden} delay={T.cnpj} duration={0.5} />
                  </span>
                  <span className={canvas ? "" : "line-clamp-3"}>
                    <Typed text={CAMILA_PRODUCT} play={playing} hidden={hidden} delay={T.product} duration={1.2} />
                  </span>
                </BubbleContent>
              </Bubble>
              <div className="flex flex-wrap justify-end gap-1.5">
                {ATTACHMENTS.map((a) => (
                  <AttachmentChip
                    key={a.name}
                    data-a="attach"
                    style={pre(hidden, { y: 4, scale: 0.96 })}
                    kind={a.kind}
                    name={a.name}
                    meta={canvas ? a.meta : undefined}
                    size={canvas ? "md" : "sm"}
                  />
                ))}
              </div>
            </MessageContent>
          </Message>

          {/* O que eu entendi: resumo + perfil proposto (a Camila não descreve cliente ideal) */}
          <Message data-a="understood" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar className="self-start">
                <FyndAvatar />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="secondary" className="max-w-full">
                <BubbleContent className={cn(text, "flex flex-col", canvas ? "gap-2.5" : "gap-2")}>
                  <span className={cn("font-mono font-medium tracking-label text-muted-foreground uppercase", canvas ? "text-[11px]" : "text-[10px]")}>
                    O que eu entendi
                  </span>
                  <span>{UNDERSTOOD_INTRO}</span>
                  <ul className={cn("flex flex-col", canvas ? "gap-1" : "gap-0.5")}>
                    {UNDERSTOOD.map((u) => (
                      <li key={u} className="flex items-start gap-2">
                        <CheckIcon aria-hidden="true" className={cn("shrink-0 text-navy-600", canvas ? "mt-1 size-4" : "mt-0.5 size-3.5")} strokeWidth={2} />
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                  <span className={canvas ? "mt-1" : ""}>{PROFILE_INTRO}</span>
                  <span className={cn("flex flex-wrap", canvas ? "gap-2" : "gap-1.5")}>
                    {PROFILE_V5.map((c) => (
                      <CriterionChip
                        key={c.label}
                        data-a="chip"
                        style={pre(hidden, { y: 4, scale: 0.96 })}
                        label={c.label}
                        value={c.value}
                        size={canvas ? "md" : "sm"}
                        className={canvas ? "h-7 gap-1.5 bg-card px-3 text-[13px]" : "h-6 gap-1 bg-card px-2.5 text-xs"}
                      />
                    ))}
                  </span>
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          {/* Especialista comercial: uma linha de destaque, não é configuração. Sem clique simulado. */}
          <div data-a="specialist" style={bubbleHidden} className={canvas ? "pl-10" : ""}>
            <SpecialistCard canvas={canvas} />
          </div>

          {/* Ponte para a tela 2 */}
          <Message data-a="bridge" style={bubbleHidden}>
            {canvas && (
              <MessageAvatar className="self-start">
                <FyndAvatar />
              </MessageAvatar>
            )}
            <MessageContent>
              <Bubble variant="secondary" className="max-w-full">
                <BubbleContent className={text}>{BRIDGE_MESSAGE}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      </div>
    </div>
  )
}

/**
 * Card do especialista. O selo "Pronto para aprovação" é neutro (02-copy-v5 e 04-motion-v5 §1.4; o briefing
 * reserva o ciano ao selo de interesse e ao ponto do hero). O botão principal é `default` (navy).
 */
function SpecialistCard({ canvas }: { canvas: boolean }) {
  const seal = (
    <Badge variant="secondary" className={cn("font-semibold", canvas ? "h-6 px-2.5 text-xs" : "h-5 px-2 text-[11px]")}>
      {SPECIALIST.seal}
    </Badge>
  )
  if (!canvas) {
    return (
      <div className="flex flex-col gap-2 rounded-xl border border-navy-100 bg-card p-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
            <UserRoundIcon className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1 text-[13px] leading-snug font-semibold">{SPECIALIST.title}</span>
        </div>
        <div>{seal}</div>
        <p className="text-xs leading-snug text-muted-foreground">{SPECIALIST.line}</p>
        <div className="flex flex-wrap gap-1.5">
          <Button size="xs" tabIndex={-1}>
            {SPECIALIST.approve}
          </Button>
          <Button variant="outline" size="xs" tabIndex={-1}>
            <MessageCircleIcon />
            {SPECIALIST.talk}
          </Button>
        </div>
      </div>
    )
  }
  // QA M10: o título ganha a linha inteira (com o selo à direita) e não trunca mais; os botões descem para a linha do texto.
  return (
    <div className="flex items-start gap-3.5 rounded-xl border border-navy-100 bg-card px-5 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-700">
        <UserRoundIcon className="size-4" strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-semibold">{SPECIALIST.title}</span>
          {seal}
        </span>
        <div className="flex items-center gap-4">
          <span className="min-w-0 flex-1 text-[13px] leading-snug text-muted-foreground">{SPECIALIST.line}</span>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button variant="outline" size="sm" tabIndex={-1}>
              <MessageCircleIcon />
              {SPECIALIST.talk}
            </Button>
            <Button size="sm" tabIndex={-1}>
              {SPECIALIST.approve}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
