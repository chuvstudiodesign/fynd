"use client"

import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { MiniContaV5, MiniEncontraV5, MiniFechaV5 } from "@/components/site/platform-v5"
import { RevealGroup, RevealItem } from "@/components/site/motion/reveal"
import { SiteContainer } from "./site-container"
import { ANCHORS_V5, anchorOffsetV5, headToBodyV5, sectionYV5 } from "./anchors-v5"

/**
 * Como funciona v6 = v5 sem a faixa "Por trás de cada oportunidade" (entender → entregar).
 *
 * Como funciona, 3 passos (02-copy-v5 §3, 03-design-v5 §2).
 * O rótulo mono do card é só o índice: o nome do passo é o título, em caixa normal
 * ("A fynd trabalha" não pode virar caixa alta). Os `aria-label`s dos recortes são os do copy.
 */
const STEPS = [
  {
    index: "01",
    title: "Você explica",
    text: "Conte o que sua empresa vende e quem costuma comprar.",
    Mini: MiniContaV5,
    miniLabel: "Exemplo: a Camila explica o que a Lumi Embalagens vende e anexa o site e o catálogo.",
  },
  {
    index: "02",
    title: "A fynd trabalha",
    text: "Entende seu negócio, encontra empresas, aborda e identifica interesse.",
    Mini: MiniEncontraV5,
    miniLabel: "Exemplo: 4.860 empresas com o perfil da Lumi, das quais 12 se mostraram interessadas.",
  },
  {
    index: "03",
    title: "Você vende",
    text: "Seu time recebe as oportunidades que merecem uma conversa comercial.",
    Mini: MiniFechaV5,
    miniLabel: "Exemplo: a Serra Azul Alimentos pediu amostras. Contato: Renata Moraes, gerente de compras.",
  },
]

export function HowItWorksSectionV6() {
  return (
    <section id={ANCHORS_V5.howItWorks} data-theme="light" className={cn("bg-paper-100 text-foreground", sectionYV5, anchorOffsetV5)}>
      <SiteContainer>
        {/* Sem subtítulo: os três passos respondem à pergunta do título (02-copy-v5 §3). */}
        <RevealGroup>
          <RevealItem y={16} duration={0.7}>
            <Text variant="eyebrow">ZERO SETUP</Text>
          </RevealItem>
          <RevealItem y={16} duration={0.7}>
            <Text variant="h1" render={<h2 />} className="mt-4 max-w-[20ch] lg:mt-5">
              E se o processo fosse muito mais simples?
            </Text>
          </RevealItem>
        </RevealGroup>

        <RevealGroup gap={0.1} className={cn("grid gap-4 sm:gap-6 lg:grid-cols-3 xl:gap-8", headToBodyV5)}>
          {STEPS.map(({ index, title, text, Mini, miniLabel }) => (
            <RevealItem key={index} className="h-full min-w-0">
              <article className="grid h-full gap-6 rounded-xl border border-border bg-paper-50 p-6 transition-transform duration-200 ease-out sm:grid-cols-2 sm:items-center md:p-8 lg:grid-cols-1 [&>*]:min-w-0 lg:content-start lg:items-start [@media(pointer:fine)]:motion-safe:hover:-translate-y-1">
                {/* O mini é decorativo (aria-hidden); o exemplo chega ao leitor de tela pelo label do copy. */}
                <div role="img" aria-label={miniLabel}>
                  <div inert aria-hidden="true">
                    <Mini />
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs font-medium tracking-label text-muted-foreground tabular-nums">
                    {index}
                  </span>
                  <Text variant="h3" render={<h3 />} className="mt-3">
                    {title}
                  </Text>
                  <Text className="mt-3 text-muted-foreground">{text}</Text>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

      </SiteContainer>
    </section>
  )
}
