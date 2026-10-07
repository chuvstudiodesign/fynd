"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "./site-container"
import { ANCHORS_V4, headToBodyV4, sectionYV4 } from "./anchors-v4"

/**
 * Para quem, compacta (02-copy-v4 §6, 03-design-v4 §6). Duas colunas de uma frase, sem cards e sem
 * checklists, e os chips de público do escopo. Sem ciano. Depoimento e experiência continuam desligados.
 */
const COLUMNS = [
  {
    label: "Quem vende sozinho",
    title: "Teste sem contratar ninguém.",
    text: "Os interessados chegam para você mesmo atender. Não precisa de um time de prospecção para começar.",
  },
  {
    label: "Quem lidera um time",
    title: "Seu time só com quem quer conversar.",
    text: "Menos horas em contato frio, mais tempo para fechar.",
  },
]

const AUDIENCE = [
  "Consultorias",
  "Contabilidades",
  "Crédito empresarial",
  "Benefícios corporativos",
  "Software houses",
  "SaaS B2B",
  "Serviços empresariais",
  "Imobiliário",
  "Clínicas e grupos de saúde",
  "Escritórios especializados",
  "Vendas consultivas",
]

/** No mobile (< sm), os chips passam de 4 linhas em 375px: mostramos os 8 primeiros e um "Ver todos" (03-design-v4 §6). */
const MOBILE_VISIBLE = 8

export function AudienceSectionV4() {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const labelId = useId()
  const firstHiddenRef = useRef<HTMLLIElement>(null)
  const focusAfterExpand = useRef(false)

  // QA I6: o botão sai da página ao expandir; o foco vai para o primeiro chip revelado, e não para o <body>.
  useEffect(() => {
    if (!expanded || !focusAfterExpand.current) return
    focusAfterExpand.current = false
    firstHiddenRef.current?.focus()
  }, [expanded])

  return (
    <section id={ANCHORS_V4.audience} data-theme="light" className="bg-paper-50 text-foreground">
      <SiteContainer>
        <div className={cn("border-t border-border", sectionYV4)}>
          <RevealGroup className={cn(siteGrid, "items-end")}>
            <div className="col-span-full lg:col-span-6">
              <RevealItem y={16} duration={0.7}>
                <Text variant="eyebrow">PARA QUEM</Text>
              </RevealItem>
              <RevealItem y={16} duration={0.7}>
                <Text variant="h1" render={<h2 />} className="mt-4 max-w-[22ch] lg:mt-5">
                  Para vender mais sem montar estrutura.
                </Text>
              </RevealItem>
            </div>
            <RevealItem y={16} duration={0.7} className="col-span-full sm:col-span-6 lg:col-span-5 lg:col-start-8">
              <Text variant="lead" className="max-w-[36rem]">
                Para PMEs B2B em que cada cliente novo vale uma boa conversa.
              </Text>
            </RevealItem>
          </RevealGroup>

          <RevealGroup gap={0.1} amount={0.25} className={cn("grid gap-10 lg:grid-cols-2 lg:gap-8", headToBodyV4)}>
            {COLUMNS.map((col) => (
              <RevealItem key={col.title} y={16} duration={0.7} className="border-t border-border pt-6">
                <p className="text-sm font-semibold text-foreground">{col.label}</p>
                <Text variant="h3" render={<h3 />} className="mt-3">
                  {col.title}
                </Text>
                <Text className="mt-3 max-w-[36rem] text-muted-foreground">{col.text}</Text>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-12">
            <RevealItem y={16} duration={0.7}>
              <p id={labelId} className="text-sm font-semibold text-foreground">
                Feito para
              </p>
            </RevealItem>
            <RevealItem y={16} duration={0.7}>
              <ul id={listId} aria-labelledby={labelId} className="mt-4 flex flex-wrap gap-2">
                {AUDIENCE.map((item, i) => (
                  <li
                    key={item}
                    ref={i === MOBILE_VISIBLE ? firstHiddenRef : undefined}
                    tabIndex={i === MOBILE_VISIBLE ? -1 : undefined}
                    className={cn("rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50", !expanded && i >= MOBILE_VISIBLE && "max-sm:hidden")}
                  >
                    <Badge variant="outline" className="h-8 px-3.5 text-sm">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
              {!expanded && (
                <Button
                  variant="ghost"
                  size="xs"
                  aria-controls={listId}
                  aria-expanded={false}
                  onClick={() => {
                    focusAfterExpand.current = true
                    setExpanded(true)
                  }}
                  className="mt-3 sm:hidden"
                >
                  Ver todos
                </Button>
              )}
            </RevealItem>
          </RevealGroup>
        </div>
      </SiteContainer>
    </section>
  )
}
