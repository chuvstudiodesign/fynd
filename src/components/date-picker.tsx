"use client"

import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formatDate = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })

type Common = {
  placeholder?: string
  disabled?: boolean
  /** Datas indisponíveis (Matcher do react-day-picker) */
  disabledDays?: React.ComponentProps<typeof Calendar>["disabled"]
  /** Mostra um botão para limpar a data */
  clearable?: boolean
  className?: string
  "aria-label"?: string
}

/** Campo de data: botão em pílula que abre o Calendar em um Popover. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Escolha uma data",
  disabled,
  disabledDays,
  clearable = false,
  className,
  ...aria
}: Common & { value?: Date; onChange?: (date: Date | undefined) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn("relative inline-flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              disabled={disabled}
              data-empty={!value || undefined}
              className="w-full min-w-56 justify-start font-normal data-empty:text-muted-foreground"
              {...aria}
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {value ? formatDate(value) : placeholder}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange?.(d)
              setOpen(false)
            }}
            disabled={disabledDays}
            defaultMonth={value}
          />
        </PopoverContent>
      </Popover>
      {clearable && value && !disabled && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-1/2 right-2 -translate-y-1/2"
          onClick={() => onChange?.(undefined)}
          aria-label="Limpar data"
        >
          <XIcon />
        </Button>
      )}
    </div>
  )
}

/** Intervalo de datas: dois meses lado a lado. */
export function DateRangePicker({
  value,
  onChange,
  placeholder = "Escolha um período",
  disabled,
  disabledDays,
  numberOfMonths = 2,
  className,
  ...aria
}: Common & { value?: DateRange; onChange?: (range: DateRange | undefined) => void; numberOfMonths?: number }) {
  const label = value?.from
    ? value.to
      ? `${formatDate(value.from)} – ${formatDate(value.to)}`
      : formatDate(value.from)
    : placeholder
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            data-empty={!value?.from || undefined}
            className={cn("min-w-72 justify-start font-normal data-empty:text-muted-foreground", className)}
            {...aria}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {label}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={numberOfMonths}
          disabled={disabledDays}
          defaultMonth={value?.from}
        />
      </PopoverContent>
    </Popover>
  )
}
