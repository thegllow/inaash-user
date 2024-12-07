"use client"
import Button from "@/components/ui/button"
import { useRouter } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { ErrorResponse, SuccessResponse } from "@/types"
import { User } from "@/types/login"
import { updateProfileSchema } from "@/validation/update-profile-schema"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const UserInfo = () => {
  const session = useSession()
  const user = session.data?.user
  const t = useTranslations("complete-profile")
  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: "",
      first_name: " ",
      last_name: " ",
    },
  })

  const Router = useRouter()
  const { course_id } = useParams() as { course_id: string }

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await InaashApi.put<SuccessResponse<User>>(`/user/users/${user!.id}`, data)
      Router.push(`/certificate/${course_id}/claim/preview`)
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
    <Card shadow={"none"} className="w-full max-w-sm border-none bg-[#0A090959] backdrop-blur-md">
      <CardBody className="~p-4/8 rtl:text-right">
        <form onSubmit={onSubmit}>
          <div className="mb-3 space-y-1 rounded-t-lg">
            <h1 className="~text-xl/2xl">{t("title")}</h1>
            <p className="text-sm text-default-500">{t("description")}</p>
          </div>
          <div className="flex flex-col gap-4 py-4">
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

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Button
              size="md"
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="mx-auto max-w-sm">
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
      </CardBody>
    </Card>
  )
}

export default UserInfo
