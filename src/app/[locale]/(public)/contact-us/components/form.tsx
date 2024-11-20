"use client"
import Button from "@/components/ui/button"
import InaashApi from "@/services/inaash"
import { ErrorResponse } from "@/types"
import { contactSchema } from "@/validation/contact-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input, Textarea } from "@nextui-org/input"
import { Tab, Tabs } from "@nextui-org/tabs"
import axios from "axios"
import { useTranslations } from "next-intl"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

type Props = {}

const type = ["Inquiry", "Complaint", "Suggestion"] as const

const ContactForm = (props: Props) => {
  const t = useTranslations("contact-us.form")
  const { control, ...form } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: "Inquiry",
      name: "",
      email: "",
      message: "",
      subject: "",
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await InaashApi.post("/guest/contacts", data)
      console.log("🚀 ~ onSubmit ~ response:", response)
      form.reset()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const responseError = error.response.data as ErrorResponse<z.infer<typeof contactSchema>>
        form.setError("root", { message: responseError.message })
        if (responseError.errors) {
          for (let key in responseError.errors) {
            form.setError(key as keyof typeof responseError.errors, {
              message: responseError.errors![key as keyof typeof responseError.errors]![0],
            })
          }
        }

        return
      }

      form.setError("root", { message: t("errors.serverError") })
    }
  })
  return (
    <form onSubmit={onSubmit} className="block space-y-5 md:space-y-10">
      <div className="flex flex-col gap-4">
        <label className="text-sm text-default-500">{t("type-label")}</label>

        <Controller
          control={control}
          name="type"
          render={({ field }) => {
            return (
              <Tabs
                {...field}
                onSelectionChange={(key) => field.onChange(key as keyof typeof type)}
                color="primary"
                variant={"underlined"}
                aria-label="Tabs variants">
                {type.map((element) => {
                  return (
                    <Tab
                      key={element}
                      value={element}
                      className="text-lg"
                      // @ts-ignore
                      title={t(`tabs.${element.toLocaleLowerCase()}`)}
                    />
                  )
                })}
              </Tabs>
            )
          }}
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/2">
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <Input
                  radius="md"
                  type="text"
                  label={t("email-input-label")}
                  labelPlacement={"outside"}
                  classNames={{
                    label: "text-xs !text-default-500",
                  }}
                  placeholder={t("email-input-placeholder")}
                  {...field}
                  isInvalid={!!form.formState.errors.email?.message}
                  errorMessage={
                    form.formState.errors.email?.message
                      ? t(`errors.${form.formState.errors.email?.message as "required"}`)
                      : null
                  }
                />
              )
            }}
          />
        </div>
        <div className="md:w-1/2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => {
              return (
                <Input
                  radius="md"
                  type="text"
                  label={t("name-input-label")}
                  labelPlacement={"outside"}
                  classNames={{
                    label: "text-xs !text-default-500",
                  }}
                  placeholder={t("name-input-placeholder")}
                  {...field}
                  isInvalid={!!form.formState.errors.name?.message}
                  errorMessage={
                    form.formState.errors.name?.message
                      ? t(`errors.${form.formState.errors.name?.message as "required"}`)
                      : null
                  }
                />
              )
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/2">
          <Controller
            control={control}
            name="message"
            render={({ field }) => {
              return (
                <Textarea
                  minRows={5}
                  radius="md"
                  type="text"
                  label={t("message-input-label")}
                  labelPlacement={"outside"}
                  classNames={{
                    label: "text-xs !text-default-500",
                  }}
                  placeholder={t("message-input-placeholder")}
                  {...field}
                  isInvalid={!!form.formState.errors.message?.message}
                  errorMessage={
                    form.formState.errors.message?.message
                      ? t(`errors.${form.formState.errors.message?.message as "required"}`)
                      : null
                  }
                />
              )
            }}
          />
        </div>
        <div className="md:w-1/2">
          <Controller
            control={control}
            name="subject"
            render={({ field }) => {
              return (
                <Input
                  radius="md"
                  type="text"
                  label={t("subject-input-label")}
                  labelPlacement={"outside"}
                  classNames={{
                    label: "text-xs !text-default-500",
                  }}
                  placeholder={t("subject-input-placeholder")}
                  {...field}
                  isInvalid={!!form.formState.errors.subject?.message}
                  errorMessage={
                    form.formState.errors.subject?.message
                      ? t(`errors.${form.formState.errors.subject?.message as "required"}`)
                      : null
                  }
                />
              )
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button isLoading={form.formState.isSubmitting} type="submit" className="mx-auto max-w-sm">
          {t("submit-button")}
        </Button>
        {form.formState.errors.root ? (
          <p className="text-sm font-semibold text-danger-500">{form.formState.errors.root.message}</p>
        ) : (
          ""
        )}
        {form.formState.isSubmitSuccessful ? (
          <p className="text-sm font-semibold text-success-500">{t("success")}</p>
        ) : (
          ""
        )}
      </div>
    </form>
  )
}

export default ContactForm
