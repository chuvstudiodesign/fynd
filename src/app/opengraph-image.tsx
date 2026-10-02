import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

/*
 * Imagem de compartilhamento (02-copy §SEO, 09-revisao-marca B1): wordmark + título do hero da v3 sobre navy-900.
 * Sem ciano e sem o `f`-chama. As cores repetem os tokens de `globals.css` (o Satori não lê CSS variables).
 */
export const alt = "fynd · Você vende, a gente encontra."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const NAVY_900 = "#0b1f32"
const NAVY_700 = "#214467"
const PAPER_50 = "#f8f7f3"
const STEEL_300 = "#9fb0c0"
const STEEL_400 = "#7a8ea1"

export default async function Image() {
  const [soraLight, plexMonoMedium] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Sora-Light.ttf")),
    readFile(join(process.cwd(), "src/app/_og/IBMPlexMono-Medium.ttf")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: NAVY_900,
          color: PAPER_50,
        }}
      >
        {/* Wordmark oficial (mesmos paths de src/components/brand/wordmark.tsx) */}
        <svg width="112" height="60" viewBox="0 0 900 482.445" fill="none">
          <path
            d="M151.761 0.000705922V68.3679C132.598 68.7435 100.107 80.4654 99.8944 131.802H155.655L155.603 131.715H238.416L327.661 281.694C371.262 233.667 343.607 158.107 323.693 125.501H417.183L309.605 365.166C265.101 458.516 211.591 485.801 180.256 482.125V412.54C252.486 431.318 283.616 388.782 292.316 365.166L248.168 287.273L155.71 131.895V157.584H99.8932V232.292L99.5731 232.501V380.233H27.855V157.584H0V131.802H27.855V131.715H58.6283C51.5874 116.841 47.0651 99.5006 47.0651 79.6699C47.0651 13.8155 113.752 0.503837 151.621 0.0145891V0C151.667 5.9313e-09 151.714 0.00066033 151.761 0.000705922Z"
            fill={PAPER_50}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M900 380.233H828.282V340.589C807.774 361.135 776.302 380.233 733.66 380.233C667.025 380.233 652.586 317.869 651.604 280.825H651.547V380.233H579.829V212.483L579.807 212.111C578.807 196.254 568.023 165.264 532.444 165.264C503.924 165.264 492.416 185.177 488.901 201.246V380.232H417.183V125.501H488.901V164.282C506.058 143.328 536.272 120.531 579.829 120.531C631.848 120.531 647.447 164.01 650.787 196.329L651.547 231.432H651.596C652.505 194.428 666.838 131.715 733.66 131.715C776.302 131.715 807.774 150.813 828.282 171.358V38.5203H900V380.233ZM787.912 182.971C734.559 182.971 722.4 214.642 722.011 233.296H721.985V278.651H722.011C722.4 297.305 734.559 328.976 787.912 328.976C807.843 328.976 820.516 320.475 828.282 309.665V202.282C820.516 191.472 807.843 182.971 787.912 182.971Z"
            fill={PAPER_50}
          />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Plex Mono",
              fontSize: 22,
              letterSpacing: "0.12em",
              color: STEEL_400,
            }}
          >
            PROSPECÇÃO B2B COM CONTEXTO
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Sora",
              fontWeight: 300,
              fontSize: 96,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 900,
            }}
          >
            Você vende, a gente encontra.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${NAVY_700}`,
            paddingTop: 28,
            fontFamily: "Sora",
            fontSize: 26,
            color: STEEL_300,
          }}
        >
          Não é mailing nem lista fria. Quem fecha é você.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: soraLight, style: "normal", weight: 300 },
        { name: "Plex Mono", data: plexMonoMedium, style: "normal", weight: 500 },
      ],
    }
  )
}
