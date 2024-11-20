"use client"
import { Input } from "@nextui-org/input"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema } from "@/validation/update-profile-schema"
import { useTranslations } from "next-intl"
import Button from "@/components/ui/button"
import { Link } from "@/lib/i18n/navigation"
import { useUser } from "../context/user-context"
import InaashApi from "@/services/inaash"
import axios from "axios"
import { ErrorResponse, SuccessResponse } from "@/types"
import { z } from "zod"
import { DevTool } from "@hookform/devtools"
import { User } from "../../types"

const EditProfileForm = () => {
  const [user, setUser] = useUser()
  const t = useTranslations("profile")
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: user.email || "",
      first_name: user.first_name || " ",
      last_name: user.last_name || " ",
    },
  })
  console.log("🚀 ~ EditProfileForm ~ form:", form.formState.errors)

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await InaashApi.put<SuccessResponse<User>>(`/user/users/${user.id}`, data)
      setUser(response.data.data.item)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const responseError = error.response.data as ErrorResponse<z.infer<typeof updateProfileSchema>>
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
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 py-4 md:flex-row">
        <Controller
          control={form.control}
          name="first_name"
          render={({ field }) => {
            return (
              <Input
                classNames={{
                  label: "text-xs !text-default-500",
                }}
                radius="sm"
                className="rounded"
                labelPlacement="outside"
                label={t("first_name")}
                {...field}
                placeholder={t("first_name-input-placeholder")}
                isInvalid={!!form.formState.errors.first_name?.message}
                errorMessage={
                  form.formState.errors.first_name?.message
                    ? t(`errors.${form.formState.errors.first_name?.message as "required"}`)
                    : null
                }
              />
            )
          }}
        />
        <Controller
          control={form.control}
          name="last_name"
          render={({ field }) => {
            return (
              <Input
                classNames={{
                  label: "text-xs !text-default-500",
                }}
                radius="sm"
                className="rounded"
                labelPlacement="outside"
                label={t("last_name")}
                {...field}
                placeholder={t("last_name-input-placeholder")}
                isInvalid={!!form.formState.errors.last_name?.message}
                errorMessage={
                  form.formState.errors.last_name?.message
                    ? t(`errors.${form.formState.errors.last_name?.message as "required"}`)
                    : null
                }
              />
            )
          }}
        />
      </div>
      <div className="flex flex-col gap-4 py-4 md:flex-row">
        <div className="md:w-1/2">
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <Input
                  classNames={{
                    label: "text-xs !text-default-500",
                  }}
                  radius="sm"
                  type="email"
                  className="rounded"
                  labelPlacement="outside"
                  label={t("email")}
                  {...field}
                  placeholder={t("email-input-placeholder")}
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
        <div className="relative md:w-1/2">
          <Input
            classNames={{
              label: "text-xs !text-default-500 ",
            }}
            readOnly
            radius="sm"
            className="rounded"
            labelPlacement="outside"
            label={t("mobile")}
            value={user.mobile}
          />
          <Link
            className="absolute top-0 w-fit text-xs text-primary ltr:right-0 rtl:left-1"
            href={`/profile/${user.id}/update-phone-number`}>
            {t("change-mobile-button")}
          </Link>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center gap-4">
        <Button isLoading={form.formState.isSubmitting} type="submit" className="mx-auto max-w-sm">
          {t("save-button")}
        </Button>
        {form.formState.isSubmitSuccessful ? (
          <p className="text-sm font-semibold text-success-500">{t("success")}</p>
        ) : (
          ""
        )}
      </div>
      <DevTool control={form.control} />
    </form>
  )
}

export default EditProfileForm
