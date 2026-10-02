import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Sora } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

// Sora — títulos e ideias
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

// Manrope — leitura e interface
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// IBM Plex Mono — dados e rótulos
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/*
 * URL pública do site. [validar domínio] `fynd.com.br` depende da validação de INPI e domínio,
 * então a base vem do ambiente: NEXT_PUBLIC_SITE_URL, ou o domínio de produção da Vercel, ou o dev local.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3210")

// SEO e compartilhamento (docs/site/02-copy.md). A imagem OG é `opengraph-image.tsx` e o ícone, `icon.svg`.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "fynd · Saiba para quem vender agora",
  description:
    "Descreva o seu cliente ideal numa conversa. A fynd encontra as empresas com maior potencial, mostra por que cada uma importa e sugere o primeiro contato.",
  openGraph: {
    title: "fynd · Saiba para quem vender agora",
    description:
      "Menos lista fria. Mais clareza para vender. Empresas priorizadas para o seu perfil de cliente ideal, com contexto e uma sugestão de abordagem.",
    siteName: "fynd",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "fynd · Saiba para quem vender agora",
    description:
      "Menos lista fria. Mais clareza para vender. Empresas priorizadas para o seu perfil de cliente ideal, com contexto e uma sugestão de abordagem.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${manrope.variable} ${plexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Toaster>{children}</Toaster>
      </body>
    </html>
  );
}
