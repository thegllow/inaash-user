"use client"
import { cn } from "@/lib/cn"
import { Card } from "@nextui-org/card"
import { Progress } from "@nextui-org/progress"
import { useTranslations } from "next-intl"
import { parseAsNumberLiteral, useQueryState } from "nuqs"
const Stepper = () => {
  const [step] = useQueryState("step", parseAsNumberLiteral([1, 2, 3]).withDefault(1))

  const t = useTranslations("rating.stepper")
  return (
    <Card
      dir="ltr"
      shadow="none"
      className="mx-auto mb-5 max-w-md rounded-xl bg-[#0A090959] px-5 py-8 backdrop-blur-xl">
      <div dir="ltr" className="relative mb-6 px-8">
        <Progress size="sm" value={step === 1 ? 0 : step === 2 ? 50 : 100} color="primary" />

        <p
          className={cn(
            "absolute -top-2 left-6 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-black duration-300",
            step >= 1 && "origin-center scale-125",
          )}>
          {step >= 1 && 1}
        </p>
        <p
          className={cn(
            "absolute -top-2 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs text-black duration-300",
            step >= 2 && "origin-center scale-110",
          )}>
          {" "}
          {step >= 2 && 2}
        </p>
        <p
          className={cn(
            "absolute -top-2 right-6 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-black duration-300",
            step >= 3 && "origin-center scale-110",
          )}>
          {step >= 3 && 3}
        </p>
      </div>
      <div className="grid w-full grid-cols-3">
        <p className={cn("text-sm text-default-500", step === 1 && "text-white")}>{t("first")}</p>
        <p className={cn("text-sm text-default-500", "text-center", step === 2 && "text-white")}>
          {t("second")}
        </p>
        <p className={cn("text-sm text-default-500", "text-end", step === 3 && "text-white")}>{t("third")}</p>
      </div>
    </Card>
  )
}

export default Stepper
