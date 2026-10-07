"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { Text, textVariants } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { LoadingButton } from "@/components/loading-button"
import { EASE_IN_OUT, EASE_OUT } from "@/components/site/motion/gsap"
import { cn } from "@/lib/utils"
import { ANCHORS_V5 } from "./anchors-v5"

/*
 * Questionário de validação da v5 (02-copy-v5 §9, 03-design-v5 §7). Quatro etapas, uma por vez, na própria
 * página. Rótulos e opções são os do material da cliente, sem alteração. Só a etapa 1 valida.
 */

/* ---------- Perguntas (texto literal do material) ---------- */

const PROSPECCAO_OPTIONS = ["Sim", "Às vezes", "Não"] as const
const INVESTIMENTO_ATUAL_OPTIONS = [
  "Até R$ 1.000",
  "R$ 1.000–3.000",
  "R$ 3.000–5.000",
  "R$ 5.000–10.000",
  "Mais de R$ 10.000",
  "Não sei informar",
] as const
const INVESTIMENTO_DESEJADO_OPTIONS = [
  "Até R$ 500",
  "R$ 500–1.000",
  "R$ 1.000–2.000",
  "R$ 2.000–3.000",
  "R$ 3.000–5.000",
  "Mais de R$ 5.000",
  "Não contrataria nesse modelo",
] as const
const MODELO_COBRANCA_OPTIONS = [
  "Mensalidade fixa",
  "Mensalidade menor + valor por oportunidade",
  "Pagamento por oportunidade qualificada",
  "Pagamento apenas quando virar venda",
  "Outro",
] as const
const PILOTO_OPTIONS = ["Sim", "Talvez", "Não"] as const

/** Respostas do questionário, na ordem das 11 perguntas. Escolhas não respondidas chegam como `null`; textos, como "". */
export type ValidationAnswersV5 = {
  /** 1. Nome (obrigatório) */
  nome: string
  /** 2. Empresa (obrigatório) */
  empresa: string
  /** 3. E-mail ou WhatsApp (obrigatório) */
  contato: string
  /** 4. Como sua empresa gera novos clientes B2B hoje? */
  comoGeraClientes: string
  /** 5. Vocês fazem prospecção ativa? */
  prospeccaoAtiva: (typeof PROSPECCAO_OPTIONS)[number] | null
  /** 6. Qual é hoje a maior dificuldade para gerar novas oportunidades? */
  maiorDificuldade: string
  /** 7. Quanto aproximadamente sua empresa investe por mês em geração de novos clientes? */
  investimentoAtual: (typeof INVESTIMENTO_ATUAL_OPTIONS)[number] | null
  /** 8. Por uma solução que encontra, aborda e entrega oportunidades qualificadas, qual investimento mensal faria sentido? */
  investimentoDesejado: (typeof INVESTIMENTO_DESEJADO_OPTIONS)[number] | null
  /** 9. Qual modelo de cobrança você preferiria? */
  modeloCobranca: (typeof MODELO_COBRANCA_OPTIONS)[number] | null
  /** 10. Qual seria sua maior preocupação em contratar a fynd? */
  maiorPreocupacao: string
  /** 11. Se estivesse disponível hoje, você participaria de um piloto? */
  participariaPiloto: (typeof PILOTO_OPTIONS)[number] | null
}

/**
 * ============================================================================================
 * PONTO ÚNICO DE INTEGRAÇÃO DO QUESTIONÁRIO
 * ============================================================================================
 * Hoje o envio é SIMULADO: nada é gravado nem enviado a lugar nenhum. Para ligar a coleta real
 * (Tally, Typeform, planilha, CRM, Route Handler próprio…), troque só o corpo desta função.
 * - Recebe o objeto de respostas já com os textos aparados (`trim`).
 * - Deve resolver quando o registro for confirmado e rejeitar (throw) em caso de falha: o formulário
 *   mostra o erro de envio e mantém as respostas.
 * [validar o destino das respostas antes de divulgar a URL: 02-copy-v5, pendência 1]
 *
 * TODO(bloqueante, 09-revisao-marca-v5 B2): NÃO DIVULGAR A URL (/ e /v5) ANTES DE LIGAR ESTA FUNÇÃO A UM
 * DESTINO REAL. Enquanto o corpo abaixo for só a espera simulada, quem responder vê "Interesse registrado."
 * e "Vamos falar com você pelo contato informado.", mas nenhuma resposta é gravada. Até lá, a página
 * circula só internamente e para a cliente. O destino ainda não foi definido (pendência 1 do copy).
 */
export async function submitValidationV5(answers: ValidationAnswersV5): Promise<void> {
  void answers
  await new Promise<void>((resolve) => window.setTimeout(resolve, 1200))
}

/* ---------- Etapas ---------- */

const STEPS = [
  { title: "Contato", help: "Para a gente saber com quem falar." },
  { title: "Como vocês vendem hoje", help: "Respostas curtas já ajudam." },
  {
    title: "Investimento e modelo",
    help: "Não é uma proposta de preço. O modelo ainda não está definido, e suas respostas ajudam a desenhá-lo.",
  },
  { title: "Piloto", help: "Última etapa." },
] as const
const LAST_STEP = STEPS.length - 1
const TEXT_LIMIT = 600
/** O contador só aparece perto do limite, para não pesar em respostas curtas. */
const COUNTER_FROM = 500

/* ---------- Validação (só a etapa 1) ---------- */

type RequiredName = "nome" | "empresa" | "contato"
type TextName = "comoGeraClientes" | "maiorDificuldade" | "maiorPreocupacao"
type Errors = Partial<Record<RequiredName, string>>

const REQUIRED: RequiredName[] = ["nome", "empresa", "contato"]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const MSG = {
  nome: "Informe o seu nome.",
  empresa: "Informe o nome da empresa.",
  contato: "Informe um e-mail ou um WhatsApp para a gente falar com você.",
  contatoInvalido: "Confira o contato. Use um e-mail completo ou um WhatsApp com DDD.",
}

function validate(name: RequiredName, value: string): string | undefined {
  const v = value.trim()
  if (!v) return MSG[name]
  if (name === "contato") {
    const isEmail = EMAIL_RE.test(v)
    // WhatsApp com DDD: 10 dígitos ou mais, sem letras nem "@".
    const isPhone = !/[a-z@]/i.test(v) && v.replace(/\D/g, "").length >= 10
    if (!isEmail && !isPhone) return MSG.contatoInvalido
  }
  return undefined
}

function validateAll(values: ValidationAnswersV5): Errors {
  const errors: Errors = {}
  for (const name of REQUIRED) {
    const e = validate(name, values[name])
    if (e) errors[name] = e
  }
  return errors
}

/* ---------- Estilo dos campos ---------- */

/**
 * No card navy-800 a borda do token `--input` escuro dá 1,8:1. Só neste formulário a borda usa steel-400:
 * 3,7:1 sobre o card e cerca de 3,1:1 sobre o fundo do próprio campo (WCAG 1.4.11). O token global não muda.
 */
const FIELD_BORDER = "border-steel-400"
/** Campo com erro: a borda `destructive` cheia (o padrão escuro do `Input` usa 50%, abaixo de 3:1). */
const FIELD_INVALID = "dark:aria-invalid:border-destructive"
const LEGEND = "mb-2 text-sm leading-snug font-medium text-paper-50"
const OPTION_BASE =
  "relative flex cursor-pointer items-center border text-sm text-paper-50 transition-colors duration-150 motion-reduce:transition-none has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"

function Optional() {
  return <span className="font-normal text-muted-foreground">opcional</span>
}

type ChoiceProps<T extends string> = {
  legend: string
  name: string
  options: readonly T[]
  value: T | null
  onChange: (value: T | null) => void
}

/**
 * Rádio nativo. Clicar de novo na opção marcada desmarca: a pergunta é opcional e a pessoa pode desistir da resposta.
 * Pelo teclado, Espaço na opção marcada faz o mesmo (o navegador não dispara `click` num rádio já marcado; QA M1).
 * Enter num rádio não faz nada: sem isso, a submissão implícita do <form> avançava a etapa e, na última,
 * enviava o questionário sem passar pelo botão (QA M2).
 */
function radioProps<T extends string>({ name, value, onChange }: ChoiceProps<T>, option: T) {
  return {
    type: "radio" as const,
    name,
    value: option,
    checked: value === option,
    onChange: () => onChange(option),
    onClick: () => {
      if (value === option) onChange(null)
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") event.preventDefault()
      if (event.key === " " && value === option) {
        event.preventDefault()
        onChange(null)
      }
    },
    className: "peer sr-only",
  }
}

/** Grupo de opção em pílulas, para 3 respostas curtas. A seleção é dada por inversão e ícone, não só por cor. */
function Pills<T extends string>(props: ChoiceProps<T>) {
  const legendId = useId()
  return (
    <fieldset role="radiogroup" aria-labelledby={legendId} className="min-w-0">
      <legend id={legendId} className={LEGEND}>
        {props.legend} <Optional />
      </legend>
      <div className="flex flex-wrap gap-2">
        {props.options.map((option) => (
          <label
            key={option}
            className={cn(
              OPTION_BASE,
              FIELD_BORDER,
              "h-11 gap-1.5 rounded-full px-5 font-medium not-has-[:checked]:hover:bg-paper-50/10 has-[:checked]:border-paper-50 has-[:checked]:bg-paper-50 has-[:checked]:text-navy-900"
            )}
          >
            <input {...radioProps(props, option)} />
            <CheckIcon aria-hidden="true" className="hidden size-3.5 peer-checked:block" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Lista de rádio, uma opção por linha: rótulos longos, que precisam ser lidos e comparados. */
function RadioList<T extends string>(props: ChoiceProps<T>) {
  const legendId = useId()
  return (
    <fieldset role="radiogroup" aria-labelledby={legendId} className="min-w-0">
      <legend id={legendId} className={LEGEND}>
        {props.legend} <Optional />
      </legend>
      <div className="flex flex-col gap-2">
        {props.options.map((option) => (
          <label
            key={option}
            className={cn(
              OPTION_BASE,
              FIELD_BORDER,
              "min-h-12 gap-3 rounded-lg px-4 py-2 not-has-[:checked]:hover:bg-paper-50/5 has-[:checked]:border-paper-50 has-[:checked]:bg-paper-50/10"
            )}
          >
            <input {...radioProps(props, option)} />
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center rounded-full border border-steel-300 after:size-2 after:rounded-full after:bg-paper-50 after:opacity-0 peer-checked:border-paper-50 peer-checked:after:opacity-100"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const EMPTY: ValidationAnswersV5 = {
  nome: "",
  empresa: "",
  contato: "",
  comoGeraClientes: "",
  prospeccaoAtiva: null,
  maiorDificuldade: "",
  investimentoAtual: null,
  investimentoDesejado: null,
  modeloCobranca: null,
  maiorPreocupacao: "",
  participariaPiloto: null,
}

export function ValidationFormV5() {
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`
  const reduce = useReducedMotion()

  const [values, setValues] = useState<ValidationAnswersV5>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [errorSummary, setErrorSummary] = useState("")
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const focusLegend = useRef(false)

  // Os CTAs da página apontam para `#testar`: além da rolagem nativa, o foco vai para o título do questionário.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link || link.hash !== `#${ANCHORS_V5.access}` || link.pathname !== window.location.pathname) return
      // Depois da navegação por fragmento, que tira o foco do elemento ativo.
      window.setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 0)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Com `mode="wait"` a etapa nova só monta depois da saída da anterior: o foco muda quando a legenda existe.
  const legendRef = useCallback(
    (el: HTMLLegendElement | null) => {
      if (!el || !focusLegend.current) return
      focusLegend.current = false
      el.focus({ preventScroll: true })
      const card = cardRef.current
      if (!card) return
      const { top } = card.getBoundingClientRect()
      if (top < 0 || top > window.innerHeight) {
        card.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" })
      }
    },
    [reduce]
  )
  const successTitleRef = useCallback((el: HTMLParagraphElement | null) => {
    el?.focus()
  }, [])

  const set = <K extends keyof ValidationAnswersV5>(name: K, value: ValidationAnswersV5[K]) =>
    setValues((v) => ({ ...v, [name]: value }))

  const setRequired = (name: RequiredName, value: string) => {
    set(name, value)
    // Depois da primeira tentativa, a validação acompanha a digitação.
    if (attempted) setErrors((e) => ({ ...e, [name]: validate(name, value) }))
  }

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1)
    focusLegend.current = true
    setStep(next)
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    if (step === 0) {
      setAttempted(true)
      const next = validateAll(values)
      setErrors(next)
      const invalid = REQUIRED.filter((n) => next[n])
      if (invalid.length) {
        // "Falta preencher" só quando todos os campos apontados estão vazios; preenchido e inválido pede "Confira".
        const verb = invalid.every((n) => !values[n].trim()) ? "Falta preencher" : "Confira"
        setErrorSummary(invalid.length === 1 ? `${verb} 1 campo para continuar.` : `${verb} ${invalid.length} campos para continuar.`)
        document.getElementById(id(invalid[0]))?.focus()
        return
      }
      setErrorSummary("")
    }

    if (step < LAST_STEP) {
      goTo(step + 1)
      return
    }

    setStatus("sending")
    try {
      await submitValidationV5({
        ...values,
        nome: values.nome.trim(),
        empresa: values.empresa.trim(),
        contato: values.contato.trim(),
        comoGeraClientes: values.comoGeraClientes.trim(),
        maiorDificuldade: values.maiorDificuldade.trim(),
        maiorPreocupacao: values.maiorPreocupacao.trim(),
      })
      setLockedHeight(cardRef.current?.offsetHeight ?? null)
      setStatus("success")
    } catch {
      setStatus("error")
      // QA I4: o botão de envio não perde o foco durante o envio (ver `focusableWhenDisabled`). Se mesmo assim o foco
      // tiver caído no <body>, ele volta para o botão, que agora diz "Tentar de novo".
      const focused = document.activeElement
      if (!focused || focused === document.body) submitRef.current?.focus()
    }
  }

  /* ---------- Campos ---------- */

  const renderError = (name: RequiredName) => (
    <AnimatePresence initial={false}>
      {errors[name] && (
        <motion.p
          key={errors[name]}
          id={id(`${name}-error`)}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: EASE_OUT }}
          className="text-sm text-destructive"
        >
          {errors[name]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  const requiredField = (
    name: RequiredName,
    label: string,
    placeholder: string,
    props?: React.ComponentProps<typeof Input>,
    help?: string
  ) => (
    <Field data-invalid={errors[name] ? true : undefined}>
      <FieldLabel htmlFor={id(name)} className="text-paper-50">
        {label}
      </FieldLabel>
      <Input
        id={id(name)}
        name={name}
        placeholder={placeholder}
        className={cn("h-11", FIELD_BORDER, FIELD_INVALID)}
        required
        value={values[name]}
        onChange={(e) => setRequired(name, e.target.value)}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={[errors[name] && id(`${name}-error`), help && id(`${name}-help`)].filter(Boolean).join(" ") || undefined}
        {...props}
      />
      {renderError(name)}
      {help && <FieldDescription id={id(`${name}-help`)}>{help}</FieldDescription>}
    </Field>
  )

  const longField = (name: TextName, label: string, placeholder: string, rows: number) => {
    const length = values[name].length
    const counter = length >= COUNTER_FROM
    return (
      <Field>
        <FieldLabel htmlFor={id(name)} className="text-paper-50">
          <span>
            {label} <Optional />
          </span>
        </FieldLabel>
        <Textarea
          id={id(name)}
          name={name}
          rows={rows}
          maxLength={TEXT_LIMIT}
          placeholder={placeholder}
          className={cn(rows > 2 ? "min-h-24" : "min-h-[4.25rem]", FIELD_BORDER)}
          value={values[name]}
          onChange={(e) => set(name, e.target.value)}
          aria-describedby={counter ? id(`${name}-count`) : undefined}
        />
        {counter && (
          <FieldDescription id={id(`${name}-count`)} className="tabular-nums">
            {length} de {TEXT_LIMIT} caracteres
          </FieldDescription>
        )}
      </Field>
    )
  }

  const selectField = <K extends "investimentoAtual" | "investimentoDesejado">(
    name: K,
    label: string,
    options: readonly NonNullable<ValidationAnswersV5[K]>[],
    help?: string
  ) => (
    <Field>
      <FieldLabel htmlFor={id(name)} className="text-paper-50">
        <span>
          {label} <Optional />
        </span>
      </FieldLabel>
      {/* A borda e a altura vão por seletor descendente: o `NativeSelect` só repassa `className` ao invólucro. */}
      <NativeSelect
        id={id(name)}
        name={name}
        className="w-full [&_select]:h-11 [&_select]:border-steel-400"
        value={values[name] ?? ""}
        onChange={(e) => set(name, (options.find((o) => o === e.target.value) ?? null) as ValidationAnswersV5[K])}
        aria-describedby={help ? id(`${name}-help`) : undefined}
      >
        {/* Nenhuma faixa vem marcada: a primeira entrada é neutra. */}
        <NativeSelectOption value="">Selecione</NativeSelectOption>
        {options.map((option) => (
          <NativeSelectOption key={option} value={option}>
            {option}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      {help && <FieldDescription id={id(`${name}-help`)}>{help}</FieldDescription>}
    </Field>
  )

  const stepFields = [
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {requiredField("nome", "Nome", "Seu nome", { autoComplete: "name" })}
        {requiredField("empresa", "Empresa", "Nome da empresa", { autoComplete: "organization" })}
      </div>
      {requiredField("contato", "E-mail ou WhatsApp", "voce@suaempresa.com.br ou (11) 90000-0000", undefined, "Um dos dois basta.")}
    </>,
    <>
      {longField(
        "comoGeraClientes",
        "Como sua empresa gera novos clientes B2B hoje?",
        "Ex.: indicações, feiras, ligações do time comercial, anúncios",
        2
      )}
      <Pills
        legend="Vocês fazem prospecção ativa?"
        name="prospeccaoAtiva"
        options={PROSPECCAO_OPTIONS}
        value={values.prospeccaoAtiva}
        onChange={(v) => set("prospeccaoAtiva", v)}
      />
      {longField(
        "maiorDificuldade",
        "Qual é hoje a maior dificuldade para gerar novas oportunidades?",
        "Ex.: achar o contato certo, falta de tempo, poucas respostas",
        2
      )}
    </>,
    <>
      {selectField(
        "investimentoAtual",
        "Quanto aproximadamente sua empresa investe por mês em geração de novos clientes?",
        INVESTIMENTO_ATUAL_OPTIONS,
        "Some pessoas, ferramentas e mídia. Vale uma estimativa."
      )}
      {selectField(
        "investimentoDesejado",
        "Por uma solução que encontra, aborda e entrega oportunidades qualificadas, qual investimento mensal faria sentido?",
        INVESTIMENTO_DESEJADO_OPTIONS
      )}
      <RadioList
        legend="Qual modelo de cobrança você preferiria?"
        name="modeloCobranca"
        options={MODELO_COBRANCA_OPTIONS}
        value={values.modeloCobranca}
        onChange={(v) => set("modeloCobranca", v)}
      />
    </>,
    <>
      {longField(
        "maiorPreocupacao",
        "Qual seria sua maior preocupação em contratar a fynd?",
        "Ex.: como a minha empresa seria apresentada, qualidade das oportunidades, custo",
        3
      )}
      <Pills
        legend="Se estivesse disponível hoje, você participaria de um piloto?"
        name="participariaPiloto"
        options={PILOTO_OPTIONS}
        value={values.participariaPiloto}
        onChange={(v) => set("participariaPiloto", v)}
      />
    </>,
  ]

  const sending = status === "sending"
  const current = STEPS[step]
  const stepLabel = `Etapa ${step + 1} de ${STEPS.length}`

  return (
    <div
      ref={cardRef}
      style={lockedHeight ? { minHeight: lockedHeight } : undefined}
      className="flex scroll-mt-20 flex-col rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-8"
    >
      {/* Regiões vivas sempre montadas: os anúncios não dependem da troca animada do conteúdo. */}
      <p className="sr-only" role="status">
        {status === "success" ? "Interesse registrado. Obrigado." : `${stepLabel}: ${current.title}`}
      </p>
      <p className="sr-only" role="alert">
        {errorSummary}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status !== "success" ? (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_IN_OUT }}
            aria-label="Questionário de interesse em testar a fynd"
            aria-busy={sending || undefined}
            className="flex flex-col"
          >
            {/* O título do questionário é maior que o da etapa (revisão de marca M8). */}
            <h3 ref={titleRef} tabIndex={-1} className={cn(textVariants({ variant: "h3" }), "rounded-sm outline-none")}>
              Conte um pouco sobre sua empresa
            </h3>
            <p className="mt-2 text-sm leading-normal text-muted-foreground">
              Queremos validar isso com empresas reais. Responda o que souber: só a etapa de contato é obrigatória.
            </p>

            {/* Progresso: texto real + 4 barras neutras (sem ciano). Não é clicável. */}
            <p className="mt-6 font-mono text-[0.6875rem] font-medium tracking-label text-steel-300 uppercase tabular-nums">{stepLabel}</p>
            <div aria-hidden="true" className="mt-3 grid grid-cols-4 gap-1.5">
              {STEPS.map((s, i) => (
                <span key={s.title} className="relative h-1 overflow-hidden rounded-full bg-steel-400">
                  <motion.span
                    initial={false}
                    animate={{ scaleX: i <= step ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: EASE_OUT }}
                    className="absolute inset-0 origin-left rounded-full bg-paper-50"
                  />
                </span>
              ))}
            </div>

            {/* Sem altura mínima: com o título do questionário no card, os 25rem do design levavam a seção a ~990px (meta ~860). */}
            <div>
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.fieldset
                  key={step}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : 8 * d }),
                    center: { opacity: 1, x: 0, transition: { duration: reduce ? 0.1 : 0.25, ease: EASE_OUT } },
                    exit: (d: number) => ({
                      opacity: 0,
                      x: reduce ? 0 : -8 * d,
                      transition: { duration: reduce ? 0.1 : 0.15, ease: EASE_IN_OUT },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="mt-6 min-w-0"
                >
                  <legend ref={legendRef} tabIndex={-1} className={cn(textVariants({ variant: "h4" }), "rounded-sm outline-none")}>
                    {current.title}
                  </legend>
                  <p className="mt-2 text-sm leading-normal text-muted-foreground">{current.help}</p>
                  <div className="mt-6 flex flex-col gap-5">{stepFields[step]}</div>
                </motion.fieldset>
              </AnimatePresence>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-6 text-sm text-destructive">
                Não foi possível enviar agora. Suas respostas continuam aqui. Tente de novo em instantes.
              </p>
            )}

            <div className={cn("flex items-center justify-between gap-3", status === "error" ? "mt-4" : "mt-8")}>
              {step > 0 ? (
                <Button type="button" variant="ghost" size="lg" className="px-5" disabled={sending} onClick={() => goTo(step - 1)}>
                  Voltar
                </Button>
              ) : (
                <span />
              )}
              {step < LAST_STEP ? (
                <Button key="continuar" type="submit" size="lg" className="max-sm:flex-1">
                  Continuar
                  <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
                </Button>
              ) : (
                // Único ciano preenchido do site, só na última etapa.
                // QA I4: durante o envio o botão fica `aria-disabled`, e não `disabled`, para o foco não cair no <body>.
                <LoadingButton
                  key="enviar"
                  ref={submitRef}
                  type="submit"
                  variant="signal"
                  size="lg"
                  className="max-sm:flex-1 aria-disabled:cursor-default aria-disabled:opacity-50"
                  focusableWhenDisabled
                  loading={sending}
                  loadingText="Enviando…"
                >
                  {status === "error" ? "Tentar de novo" : "Enviar interesse"}
                </LoadingButton>
              )}
            </div>
            {/* Versão reduzida (revisão de marca I3): sem "só" e sem "Não compartilhamos seus dados.", que são
                compromissos sem política de privacidade. A frase inteira do copy volta com o aval da cliente. [validar] */}
            <p className="mt-4 text-xs leading-normal text-muted-foreground">
              Usamos suas respostas para avaliar o piloto e falar com você.
            </p>
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
              Interesse registrado.
            </Text>
            <Text className="max-w-[36rem] text-muted-foreground">
              {values.participariaPiloto === "Não"
                ? `Obrigado, ${values.nome.trim()}. Suas respostas ajudam a acertar a proposta. Se mudar de ideia sobre o piloto, é só nos chamar.`
                : `Obrigado, ${values.nome.trim()}. Estamos conversando com as empresas interessadas e selecionando as primeiras para o piloto. Vamos falar com você pelo contato informado.`}
            </Text>
            <a
              href={`#${ANCHORS_V5.top}`}
              className="inline-flex min-h-10 items-center rounded-sm text-sm font-semibold text-foreground underline underline-offset-4 outline-none hover:text-steel-300 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Voltar ao início
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
