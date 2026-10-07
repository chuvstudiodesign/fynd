"use client"

import { useCallback, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckIcon } from "lucide-react"
import { Text } from "@/components/typography"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { EASE_IN_OUT, EASE_OUT } from "@/components/site/motion/gsap"
import { ANCHORS_V4 as ANCHORS, CTA_LABEL_V4 as CTA_LABEL } from "./anchors-v4"

/**
 * QA I5: no card navy-800 a borda do token `--input` escuro dá 1,8:1. Aqui (só neste formulário) a borda usa
 * steel-400: 3,7:1 sobre o card e cerca de 3,1:1 sobre o fundo do próprio campo (WCAG 1.4.11). O token global não muda.
 */
const FIELD_BORDER = "border-steel-400"

type FieldName = "nome" | "email" | "empresa" | "cargo" | "vende"
type Values = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>

const REQUIRED: FieldName[] = ["nome", "email", "empresa", "cargo"]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PERSONAL_DOMAINS = /@(gmail|googlemail|hotmail|outlook|live|msn|yahoo|ymail|icloud|me|bol|uol|terra|ig|protonmail|proton)\./i

const MSG = {
  empty: "Preencha este campo.",
  email: "Confira o e-mail. Ex.: voce@suaempresa.com.br",
  personal: "Se puder, use o e-mail da empresa. Ajuda a preparar a demonstração.",
}

function validate(name: FieldName, value: string): string | undefined {
  const v = value.trim()
  if (REQUIRED.includes(name) && !v) return MSG.empty
  if (name === "email" && v && !EMAIL_RE.test(v)) return MSG.email
  return undefined
}

function validateAll(values: Values): Errors {
  const errors: Errors = {}
  for (const name of REQUIRED) {
    const e = validate(name, values[name])
    if (e) errors[name] = e
  }
  return errors
}

/** Envio simulado: a v1 ainda não tem backend (00-briefing, "Fora do escopo"). */
function fakeSubmit() {
  return new Promise<void>((resolve) => window.setTimeout(resolve, 1200))
}

/**
 * Formulário de acesso antecipado da v4: o `AccessFormV3` sem mudança estrutural, com os textos do
 * 02-copy-v4 §7 (rótulo "O que você quer vender?", botão "Garantir minha vaga" e a mensagem de sucesso).
 * O submit `signal` continua sendo o único ciano preenchido do site.
 */
export function AccessFormV4() {
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`
  const [values, setValues] = useState<Values>({ nome: "", email: "", empresa: "", cargo: "", vende: "" })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  // Com `mode="wait"` o bloco de sucesso só monta depois da saída do form: o foco vai para o título quando ele existe.
  const successTitleRef = useCallback((el: HTMLParagraphElement | null) => {
    el?.focus()
  }, [])

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }))
    // Depois da primeira tentativa, a validação acompanha a digitação.
    if (submitted) setErrors((e) => ({ ...e, [name]: validate(name, value) }))
  }

  const onBlur = (name: FieldName) => {
    if (!values[name]) return
    setErrors((e) => ({ ...e, [name]: validate(name, values[name]) }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const next = validateAll(values)
    setErrors(next)
    const first = REQUIRED.find((n) => next[n])
    if (first) {
      document.getElementById(id(first))?.focus()
      return
    }
    setStatus("sending")
    try {
      await fakeSubmit()
      setLockedHeight(cardRef.current?.offsetHeight ?? null)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const personalHint = !errors.email && PERSONAL_DOMAINS.test(values.email.trim())

  const describedBy = (name: FieldName, extra?: string | false) =>
    [errors[name] ? id(`${name}-error`) : null, extra || null].filter(Boolean).join(" ") || undefined

  const renderError = (name: FieldName) => (
    <AnimatePresence initial={false}>
      {errors[name] && (
        <motion.p
          key={errors[name]}
          id={id(`${name}-error`)}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="text-sm text-destructive"
        >
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  const textField = (name: Exclude<FieldName, "vende">, label: string, placeholder: string, props?: React.ComponentProps<typeof Input>) => (
    <Field data-invalid={errors[name] ? true : undefined}>
      <FieldLabel htmlFor={id(name)}>{label}</FieldLabel>
      <Input
        id={id(name)}
        name={name}
        placeholder={placeholder}
        className={FIELD_BORDER}
        required
        value={values[name]}
        onChange={(e) => setField(name, e.target.value)}
        onBlur={() => onBlur(name)}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={describedBy(name, name === "email" && personalHint && id("email-hint"))}
        {...props}
      />
      {renderError(name)}
      {name === "email" && personalHint && (
        <FieldDescription id={id("email-hint")}>{MSG.personal}</FieldDescription>
      )}
    </Field>
  )

  return (
    <div
      ref={cardRef}
      style={lockedHeight ? { minHeight: lockedHeight } : undefined}
      className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground sm:p-8"
    >
      {/* Região viva sempre montada: o anúncio não depende da troca animada do conteúdo. */}
      <p className="sr-only" role="status">
        {status === "success" ? "Pedido recebido." : ""}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {status !== "success" ? (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            aria-label="Pedido de acesso antecipado"
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {textField("nome", "Nome", "Seu nome", { autoComplete: "name" })}
              {textField("email", "E-mail corporativo", "voce@suaempresa.com.br", { type: "email", autoComplete: "email", inputMode: "email" })}
              {textField("empresa", "Empresa", "Nome da empresa", { autoComplete: "organization" })}
              {textField("cargo", "Cargo", "Ex.: Sócia-diretora", { autoComplete: "organization-title" })}
            </div>
            <Field>
              <FieldLabel htmlFor={id("vende")}>
                O que você quer vender? <span className="font-normal text-muted-foreground">(opcional)</span>
              </FieldLabel>
              <Textarea
                id={id("vende")}
                name="vende"
                rows={3}
                className={`min-h-24 ${FIELD_BORDER}`}
                placeholder="Ex.: embalagens flexíveis para indústrias de alimentos"
                value={values.vende}
                onChange={(e) => setField("vende", e.target.value)}
              />
            </Field>

            <div className="mt-1 flex flex-col gap-3">
              <LoadingButton
                type="submit"
                variant="signal"
                size="lg"
                className="w-full"
                loading={status === "sending"}
                loadingText="Enviando…"
              >
                {CTA_LABEL}
              </LoadingButton>
              {status === "error" && (
                <p role="alert" className="text-sm text-destructive">
                  Não conseguimos enviar agora. Tente de novo em instantes.
                </p>
              )}
              {/* [validar com a política de privacidade] */}
              <p className="text-xs text-muted-foreground">Respondemos por e-mail. Sem spam e sem compartilhar seus dados.</p>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            className="flex flex-1 flex-col items-start justify-center gap-4"
          >
            <span className="flex size-12 items-center justify-center rounded-full border border-border text-paper-50">
              <CheckIcon aria-hidden="true" className="size-6" />
            </span>
            <Text ref={successTitleRef} variant="h3" tabIndex={-1} className="outline-none">
              Pedido recebido.
            </Text>
            <Text className="max-w-[36rem] text-muted-foreground">
              Obrigado, {values.nome.trim()}. Vamos falar com você pelo e-mail informado para os próximos passos.
            </Text>
            <a
              href={`#${ANCHORS.top}`}
              className="rounded-sm text-sm font-semibold text-foreground underline underline-offset-4 outline-none hover:text-steel-300 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Voltar ao início
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
