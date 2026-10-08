"use client"

import { useRef } from "react"
import { motion, stagger, type AnimationSequence } from "motion/react"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { CompanyAvatar } from "@/components/company-avatar"
import { ACTIVE_V5, InterestSeal, sealSequence } from "@/components/site/platform-v5"
import { EASE_OUT, pre, useEffectiveState, useInViewState, useScreenSequence } from "@/components/site/platform/playback"
import { REVEAL_ATTR, Reveal, RevealGroup, itemVariants } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { headToBodyV5 } from "./anchors-v5"

/**
 * Lista × oportunidade (02-copy-v5 §4, 03-design-v5 §3 e §9).
 * Campo escuro que emenda na demo (sem padding inferior). O card "hoje" é uma planilha apagada e
 * estática; o card da oportunidade é a única superfície clara e leva o único ciano da dobra (o selo).
 * O `dark` vai no cabeçalho e no card "hoje", não na grade: o card claro fica fora do escopo escuro.
 * Sem aderência, sem % e sem botões: aqui a oportunidade é um objeto entregue, não uma tela.
 */

/** Largura das barras da planilha, por linha e coluna. Decorativa: sem nome de empresa e sem número. */
const SHEET = [
  ["w-1/2", "w-4/5", "w-2/5", "w-3/5"],
  ["w-1/2", "w-3/5", "w-3/5", "w-2/5"],
  ["w-1/2", "w-4/5", "w-1/5", "w-3/5"],
  ["w-1/2", "w-2/5", "w-2/5", "w-2/5"],
  ["w-1/2", "w-3/5", "w-3/5", "w-1/5"],
] as const
/** As linhas perdem opacidade em degraus. v9: as 5 linhas e as 4 colunas em todas as larguras, como no desktop. */
const SHEET_ROW = [
  "opacity-100",
  "opacity-80",
  "opacity-60",
  "opacity-40",
  "opacity-20",
] as const

const TITLE_LINE = itemVariants(16, 0, 0.7)

const S = ACTIVE_V5
/** O que a empresa aceitou (02-copy-v5 §4). Na tela do produto, "próximo passo" é a ação do cliente. */
const NEXT_STEP_ACCEPTED = "Receber as amostras e marcar uma reunião"

const ROWS = [
  { label: "Contato", value: S.contact, detail: S.role },
  { label: "Necessidade identificada", value: S.interest },
  { label: "Interesse demonstrado", value: S.status },
  { label: "Próximo passo aceito", value: NEXT_STEP_ACCEPTED },
] as const

export function OpportunitySectionV9() {
  return (
    <section data-theme="dark" className="bg-navy-900 pt-20 md:pt-24 lg:pt-32">
      <SiteContainer>
        <RevealGroup gap={0.12} amount={0.4} className="dark text-foreground">
          <h2 className="text-center font-heading text-4xl leading-[1.08] font-light tracking-display text-balance md:text-[3.5rem]">
            {/* <span>, e não o RevealItem (div): o título precisa de conteúdo de frase. */}
            <motion.span {...REVEAL_ATTR} variants={TITLE_LINE} className="block text-steel-300">
              Não queremos entregar uma lista.
            </motion.span>{" "}
            <motion.span {...REVEAL_ATTR} variants={TITLE_LINE} className="block text-paper-50">
              Queremos entregar uma oportunidade.
            </motion.span>
          </h2>
        </RevealGroup>

        <div
          role="group"
          aria-label="Comparação: hoje, uma planilha com 5.000 empresas para a equipe trabalhar. Com a fynd, uma oportunidade com empresa, contato, necessidade identificada, interesse demonstrado e próximo passo aceito."
          className={cn(siteGrid, "items-stretch", headToBodyV5)}
        >
          {/* Hoje: nada anima aqui dentro. A planilha não rola, não pisca e não se preenche. */}
          <Reveal y={16} duration={0.7} className="dark col-span-full text-foreground sm:col-span-3 lg:col-span-5">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-navy-800/60 p-6 lg:p-8">
              <Text variant="eyebrow" className="text-steel-300">
                HOJE
              </Text>
              <p className="mt-6">
                <span className="block font-heading text-6xl leading-none font-light tracking-display text-steel-300 tabular-nums">
                  5.000
                </span>
                <span className="mt-3 block text-lg text-paper-50">empresas em uma planilha</span>
              </p>
              <div aria-hidden="true" className="mt-6 overflow-hidden rounded-lg border border-border">
                {SHEET.map((row, r) => (
                  <div
                    key={r}
                    className={cn(
                      "grid grid-cols-4 divide-x divide-border border-border [&:not(:first-child)]:border-t",
                      SHEET_ROW[r]
                    )}
                  >
                    {row.map((width, c) => (
                      <div key={c} className="px-3 py-2.5">
                        <span className={cn("block h-1.5 rounded-full bg-steel-500/40", width)} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-auto pt-6 text-sm leading-[1.6] text-steel-300">
                Sua equipe ainda precisa descobrir quem abordar, localizar contatos, enviar mensagens, insistir e
                qualificar.
              </p>
            </div>
          </Reveal>

          <Reveal y={24} duration={0.8} delay={0.15} className="col-span-full sm:col-span-5 lg:col-span-7">
            <OpportunityCard />
          </Reveal>
        </div>
      </SiteContainer>
    </section>
  )
}

/** As linhas entram uma a uma e o selo acende por último, uma vez. Com movimento reduzido, tudo já visível. */
function OpportunityCard() {
  const ref = useRef<HTMLElement>(null)
  const state = useEffectiveState(useInViewState(ref, undefined, { delay: 0.4, amount: 0.3 }))
  const hidden = state !== "final"
  const scope = useScreenSequence(state, () => {
    const seq: AnimationSequence = [
      ["[data-a=row]", { opacity: [0, 1], y: [4, 0] }, { at: 0, duration: 0.45, delay: stagger(0.06), ease: EASE_OUT }],
      ...sealSequence(0.6),
    ]
    return seq
  })

  return (
    <article ref={ref} className="h-full rounded-2xl bg-paper-50 p-6 text-navy-900 shadow-lg lg:p-8">
      <div ref={scope}>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          {/* "Com a fynd" em caixa normal; só o rótulo sem a marca vai em mono caixa alta. */}
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm font-semibold">Com a fynd</span>
            <Text variant="eyebrow">NOVA OPORTUNIDADE</Text>
          </p>
          {/* O selo desenha o rótulo em duas camadas (neutra e ciano): para o leitor de tela, uma leitura só. */}
          <span>
            <span aria-hidden="true" className="flex">
              <InterestSeal label="Interessada" signal hidden={hidden} />
            </span>
            <span className="sr-only">Interessada</span>
          </span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <CompanyAvatar name={S.company} aria-hidden="true" className="size-10" />
          <div className="min-w-0">
            <Text variant="h3" render={<h3 />}>
              {S.company}
            </Text>
            <p className="text-sm text-muted-foreground">{S.meta}</p>
          </div>
        </div>

        <dl className="mt-6">
          {ROWS.map((row) => (
            <div
              key={row.label}
              {...REVEAL_ATTR}
              data-a="row"
              style={pre(hidden, { y: 4 })}
              className="grid grid-cols-1 gap-1 border-t border-border py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-4"
            >
              <dt className="font-mono text-[0.6875rem] leading-5 tracking-label text-muted-foreground uppercase">
                {row.label}
              </dt>
              <dd className="text-base font-medium">
                {row.value}
                {"detail" in row && (
                  <span className="block text-sm font-normal text-muted-foreground">{row.detail}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
