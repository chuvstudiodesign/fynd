"use client"

import { motion, stagger, type Variants } from "motion/react"
import { ArrowRightIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { INTEREST_STATUS, InterestCardV3 } from "@/components/site/platform-v3"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { REVEAL_ATTR, Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"

/**
 * Itens `[validar]` desta seção (02-copy-v3 §5). Só renderizam depois de confirmados;
 * sem eles o layout fecha sem espaço vazio.
 */
const LGPD_LINE: string | null = null // "Trabalhamos com dados empresariais e seguimos a LGPD no tratamento das informações." [validar redação com jurídico, agora também sobre o primeiro contato]

const PROOFS = [
  {
    // [receita-federal-removido 2026-10-01] original: "CNPJs da Receita Federal, organizados"
    title: "Bases empresariais, organizadas",
    // [receita-federal-removido 2026-10-01] original: "Os dados cadastrais oficiais (CNAE, porte, situação, endereço e filiais) chegam limpos e prontos para cruzar com o que você vende."
    text: "Os dados cadastrais (CNAE, porte, situação, endereço e filiais) chegam limpos e prontos para cruzar com o que você vende.",
  },
  {
    title: "Base própria de contas corporativas",
    // [validar o que a base contém]
    // [receita-federal-removido 2026-10-01] original: "Informações que complementam o cadastro público e ajudam a entender o porte e o momento de cada empresa."
    text: "Informações que complementam os dados cadastrais e ajudam a entender o porte e o momento de cada empresa.",
  },
  {
    title: "Fit que você consegue explicar",
    text: "Cada empresa interessada mostra por que tem fit e de onde veio cada dado. Você entra na conversa sabendo com quem está falando.",
  },
]

const SOURCES = [
  { label: "O que você vende", tag: "Você" },
  // [receita-federal-removido 2026-10-01] original: { label: "Receita Federal", tag: "Fonte" }
  { label: "Bases empresariais", tag: "Fonte" },
  { label: "Base fynd", tag: "Fonte" }, // nunca em Badge label/eyebrow: contém "fynd"
]

/** Etapas intermediárias do diagrama: as bases encontram o fit; o primeiro contato separa os interessados. */
const STAGES = ["Empresas com fit", "Primeiro contato"]

// Só interessadas: a Laticínios Vale Verde (v2) sai porque respondeu sem interesse.
// Cada linha mostra o estado de interesse, não o fit % (09-revisao-marca-v3 P2.1), na ordem da tela 4 (mais recentes).
const LIST = [
  { company: "Serra Azul Alimentos", meta: "Alimentos · Jundiaí, SP · 320 pessoas", active: true },
  { company: "Bem Natural Cosméticos", meta: "Cosméticos · Contagem, MG · 410 pessoas" },
  { company: "Casa Doce Biscoitos", meta: "Alimentos · Vila Velha, ES · 230 pessoas" },
]

/* Sequência do diagrama: nós → conectores (+0,2 s) → fit → primeiro contato → interessados. */
const diagram: Variants = { hidden: {}, show: {} }
const node: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.08 } }),
}
const connector: Variants = {
  hidden: { pathLength: 0 },
  show: (i: number) => ({ pathLength: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.36 + 0.2 + i * 0.06 } }),
}
const stage: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT, delay: 1 + i * 0.2 } }),
}
const stem: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.4, ease: EASE_OUT, delay: 1.45 } },
}
const result: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 1.7 } },
}
const resultRows: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06, { startDelay: 1.9 }) } },
}
const resultRow: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
}

/* Conectores convergindo dos 3 nós (x = 1/6, 3/6, 5/6) para o centro da lista. */
const PATHS = ["M50 0 C50 40 150 30 150 72", "M150 0 L150 72", "M250 0 C250 40 150 30 150 72"]

function DataDiagram() {
  return (
    <motion.figure
      variants={diagram}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full"
    >
      <figcaption className="sr-only">
        {/* [receita-federal-removido 2026-10-01] original: "O que você vende + Receita Federal + Base fynd → …" */}
        O que você vende + Bases empresariais + Base fynd → Empresas com fit → Primeiro contato → Interessados
      </figcaption>
      <div aria-hidden="true" inert>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {SOURCES.map((s, i) => (
            <motion.div
              key={s.label}
              {...REVEAL_ATTR}
              custom={i}
              variants={node}
              className="flex min-h-20 flex-col items-start justify-between gap-2 rounded-xl border border-border bg-paper-50 p-3 sm:p-4"
            >
              <Badge variant="label">{s.tag}</Badge>
              <span className="text-sm font-semibold text-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <svg viewBox="0 0 300 72" preserveAspectRatio="none" className="block h-14 w-full sm:h-16" fill="none">
          {PATHS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              custom={i}
              variants={connector}
              stroke="var(--navy-300)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="flex items-center justify-center gap-2">
          {STAGES.map((label, i) => (
            <motion.span key={label} {...REVEAL_ATTR} custom={i} variants={stage} className="flex items-center gap-2">
              {i > 0 && <ArrowRightIcon className="size-3.5 text-navy-300" />}
              <span className="rounded-full border border-border bg-paper-50 px-3 py-1.5 text-xs font-medium text-foreground">
                {label}
              </span>
            </motion.span>
          ))}
        </div>

        <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="block h-6 w-full" fill="none">
          <motion.path d="M150 0 L150 24" variants={stem} stroke="var(--navy-300)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>

        <motion.div {...REVEAL_ATTR} variants={result} className="rounded-xl border border-border bg-paper-50 p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-foreground">Interessados</span>
            <span className="font-mono text-xs text-muted-foreground">Embalagens flexíveis</span>
          </div>
          <motion.ul variants={resultRows} className="mt-4 flex flex-col gap-2">
            {LIST.map((row) => (
              <motion.li key={row.company} {...REVEAL_ATTR} variants={resultRow}>
                <InterestCardV3
                  company={row.company}
                  meta={row.meta}
                  status={INTEREST_STATUS[row.company]}
                  active={row.active}
                />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.figure>
  )
}

export function DataSectionV3() {
  return (
    <section id={ANCHORS.data} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionY)}>
      <SiteContainer>
        <div className={cn(siteGrid, "gap-y-16 lg:items-center")}>
          <RevealGroup className="col-span-full lg:col-span-5">
            <RevealItem y={16} duration={0.7}>
              <Text variant="eyebrow">DADOS</Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                Não é mailing. Só chega quem tem interesse.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="lead" className="mt-5 max-w-[36rem] md:mt-6">
                As bases servem para encontrar as empresas com fit. O primeiro contato serve para descobrir quem quer conversar.
                Você recebe só o segundo grupo.
              </Text>
            </RevealItem>
          </RevealGroup>
          <div className="col-span-full sm:col-span-6 sm:col-start-2 lg:col-span-6 lg:col-start-7">
            <DataDiagram />
          </div>
        </div>

        <RevealGroup gap={0.1} amount={0.25} className="mt-16 grid gap-10 md:mt-20 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {PROOFS.map((p, i) => (
            <RevealItem key={p.title} className="border-t border-border pt-6">
              <Text variant="eyebrow">{String(i + 1).padStart(2, "0")}</Text>
              <Text variant="h4" render={<h3 />} className="mt-3">
                {p.title}
              </Text>
              <Text className="mt-3 max-w-[36rem] text-muted-foreground">{p.text}</Text>
            </RevealItem>
          ))}
        </RevealGroup>

        {LGPD_LINE && (
          <Reveal y={0} duration={0.6} className="mt-12">
            <p className="max-w-[36rem] text-sm text-muted-foreground lg:max-w-[48rem]">{LGPD_LINE}</p>
          </Reveal>
        )}
      </SiteContainer>
    </section>
  )
}
