"use client"

import React, { ElementRef, useRef } from "react"
import PostSendOTP from "@/services/helpers/post-send-opt"
import phoneNumberSchema from "@/validation/phone-number"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@nextui-org/input"
import { useTranslations } from "next-intl"
import { parseAsInteger, parseAsIsoDate, parseAsString, useQueryState, useQueryStates } from "nuqs"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import Button from "@/components/ui/button"

type Props = {}

const SendOTP = (props: Props) => {
  const t = useTranslations("login.send-opt")

  const form = useForm({
    resolver: zodResolver(
      z.object({
        mobile: phoneNumberSchema,
      }),
    ),
    defaultValues: {
      mobile: "",
    },
  })

  const [_, setQueries] = useQueryStates({ mobile: parseAsString.withDefault(""), date: parseAsInteger })
  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await PostSendOTP(data)
      console.log("🚀 ~ onSubmit ~ response:", response)
      setQueries({ mobile: data.mobile, date: Date.now() })
    } catch (error) {
      form.setError("root", { message: "serverError" })
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-20">
      <div>
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        <p className="text-sm text-default-500">{t("description")}</p>
      </div>
      <Controller
        control={form.control}
        name="mobile"
        render={({ field }) => {
          return (
            <Input
              radius="md"
              size="lg"
              type="text"
              label={t("input-label")}
              labelPlacement={"outside"}
              placeholder={t("input-placeholder")}
              {...field}
              isInvalid={!!form.formState.errors.mobile?.message}
              errorMessage={
                form.formState.errors.mobile?.message
                  ? t(`errors.${form.formState.errors.mobile?.message as "required"}`)
                  : null
              }
            />
          )
        }}
      />

      <div>
        <Button isLoading={form.formState.isSubmitting} type="submit">
          {t("button")}
        </Button>
        {form.formState.errors.root ? (
          <p className="mt-3 text-sm font-semibold text-danger">{t("errors.serverError")}</p>
        ) : (
          ""
        )}
      </div>
    </form>
  )
}

export default SendOTP