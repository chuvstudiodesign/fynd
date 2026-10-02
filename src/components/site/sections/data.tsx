"use client"

import { motion, stagger, type Variants } from "motion/react"
import { Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { OpportunityCard } from "@/components/opportunity-card"
import { EASE_OUT } from "@/components/site/motion/gsap"
import { REVEAL_ATTR, Reveal, RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, sectionY, siteGrid } from "./site-container"
import { ANCHORS } from "./anchors"

/**
 * Itens `[validar]` desta seção (02-copy §5). Só renderizam depois de confirmados;
 * sem eles o layout fecha sem espaço vazio.
 */
const LGPD_LINE: string | null = null // "Trabalhamos com dados empresariais e seguimos a LGPD no tratamento das informações." [validar redação com jurídico]

const PROOFS = [
  {
    // [receita-federal-removido 2026-10-01] original: title "CNPJs da Receita Federal, organizados" / text "Os dados cadastrais oficiais (CNAE, porte, situação, endereço e filiais)…"
    title: "Dados cadastrais organizados",
    text: "Setor, porte, situação, endereço e filiais chegam limpos e prontos para filtrar, sem planilha.",
  },
  {
    title: "Base própria de contas corporativas",
    // [validar o que a base contém]
    text: "Informações sobre as empresas que complementam os dados cadastrais e ajudam a entender o porte e o momento de cada conta.",
  },
  {
    title: "Critério que você consegue explicar",
    text: "Cada empresa mostra quais critérios atende e por que subiu na lista. Seu time sabe por que está ligando.",
  },
]

const SOURCES = [
  { label: "Seu perfil ideal", tag: "Você" },
  // [receita-federal-removido 2026-10-01] original: { label: "Receita Federal", tag: "Fonte" }
  { label: "Bases empresariais", tag: "Fonte" },
  { label: "Base fynd", tag: "Fonte" }, // nunca em Badge label/eyebrow: contém "fynd"
]

const LIST = [
  { company: "Serra Azul Alimentos", meta: "Alimentos · Jundiaí, SP · 320 pessoas", fit: 92, active: true },
  { company: "Bem Natural Cosméticos", meta: "Cosméticos · Contagem, MG · 410 pessoas", fit: 84 },
  { company: "Laticínios Vale Verde", meta: "Alimentos · Juiz de Fora, MG · 260 pessoas", fit: 77 },
]

/* Sequência do diagrama: nós → conectores (+0,2 s) → lista priorizada. */
const diagram: Variants = { hidden: {}, show: {} }
const node: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.08 } }),
}
const connector: Variants = {
  hidden: { pathLength: 0 },
  show: (i: number) => ({ pathLength: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.36 + 0.2 + i * 0.06 } }),
}
const result: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT, delay: 1.25 } },
}
const resultRows: Variants = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.06, { startDelay: 1.45 }) } },
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
      <figcaption className="sr-only">Seu perfil ideal + Bases empresariais + Base fynd → Lista priorizada</figcaption>
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

        <motion.div {...REVEAL_ATTR} variants={result} className="rounded-xl border border-border bg-paper-50 p-4 shadow-lg sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-foreground">Lista priorizada</span>
            <span className="font-mono text-xs text-muted-foreground">Indústria Sudeste</span>
          </div>
          <motion.ul variants={resultRows} className="mt-4 flex flex-col gap-2">
            {LIST.map((row) => (
              <motion.li key={row.company} {...REVEAL_ATTR} variants={resultRow}>
                <OpportunityCard company={row.company} meta={row.meta} fit={row.fit} active={row.active} tabIndex={-1} />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.figure>
  )
}

export function DataSection() {
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
                Dados empresariais, organizados para vender.
              </Text>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <Text variant="lead" className="mt-5 max-w-[36rem] md:mt-6">
                Toda prioridade tem fonte e critério. Você vê de onde veio cada informação.
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
