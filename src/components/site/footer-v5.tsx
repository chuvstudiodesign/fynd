import { Wordmark } from "@/components/brand/wordmark"
import { Text } from "@/components/typography"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/site/motion/reveal"
import { SiteContainer, siteGrid } from "@/components/site/sections/site-container"
import { ANCHORS_V5 as ANCHORS, CTA_SHORT_LABEL_V5, NAV_LINKS_V5 as NAV_LINKS } from "@/components/site/sections/anchors-v5"

/**
 * Footer da v5: o da v4 com as âncoras, a linha e o rótulo da v5 (02-copy-v5 §10, 03-design-v5 §8).
 *
 * Itens `[validar]` do footer (02-copy-v5 §10). Os links legais só aparecem quando as páginas existirem.
 * O e-mail de contato também fica oculto até a cliente confirmar que a caixa existe (revisão de marca I3):
 * para publicar, troque `null` pelo endereço confirmado (o do copy é "contato@fynd.com.br").
 */
const CONTACT_EMAIL: string | null = null // [validar]
const LEGAL_LINKS: { label: string; href: string }[] = [
  // { label: "Privacidade", href: "/privacidade" }, // [validar se existem]
  // { label: "Termos", href: "/termos" },
]

const footerLinks = [...NAV_LINKS, { id: ANCHORS.access, label: CTA_SHORT_LABEL_V5 }]

/* Alvo de toque de 40px no <a>; o sublinhado fica no <span>, colado ao texto. */
const linkClass =
  "group/footer-link inline-flex min-h-10 items-center rounded-sm text-sm text-muted-foreground outline-none transition-colors duration-200 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
const linkTextClass =
  "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 group-hover/footer-link:after:scale-x-100 motion-reduce:after:transition-none"

export function SiteFooterV5() {
  return (
    <footer data-theme="dark" className="bg-navy-950">
      <div className="dark text-foreground">
        <SiteContainer className="pt-24 pb-10">
          <Reveal y={0} duration={0.6} amount={0.2}>
            <div className={cn(siteGrid, "gap-y-10")}>
              <div className="col-span-full lg:col-span-6">
                <a
                  href={`#${ANCHORS.top}`}
                  aria-label="fynd, voltar ao início"
                  className="inline-flex min-h-10 items-center rounded-sm text-paper-50 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Wordmark aria-hidden="true" className="h-7 w-auto" />
                </a>
                <Text variant="h4" render={<p />} className="mt-5 font-light text-steel-300">
                  Você vende. A fynd encontra.
                </Text>
                {/* Sem a palavra "fynd": o nome fica no wordmark, fora do rótulo em caixa alta. */}
                <p className="mt-4 font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase">
                  Validação de mercado · 2026
                </p>
              </div>
              <nav aria-label="Rodapé" className="col-span-full sm:col-span-4 lg:col-span-3">
                <ul className="-mt-2.5 flex flex-col">
                  {footerLinks.map((link) => (
                    <li key={link.id}>
                      <a href={`#${link.id}`} className={linkClass}>
                        <span className={linkTextClass}>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {CONTACT_EMAIL && (
                <div className="col-span-full -mt-2.5 sm:col-span-4 lg:col-span-3">
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    <span className={linkTextClass}>{CONTACT_EMAIL}</span>
                  </a>
                </div>
              )}
            </div>
            <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              {/* Sem caixa alta: a assinatura `fynd` é sempre minúscula. */}
              <p className="font-mono text-xs text-steel-400">
                © 2026 fynd. Todos os direitos reservados.
              </p>
              {LEGAL_LINKS.length > 0 && (
                <ul className="flex gap-4 font-mono text-xs tracking-label text-steel-400 uppercase">
                  {LEGAL_LINKS.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className={linkClass}>
                        <span className={linkTextClass}>{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </SiteContainer>
      </div>
    </footer>
  )
}
