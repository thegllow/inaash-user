"use client"

import { Input } from "@nextui-org/input"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from "nuqs"
import React, { useState } from "react"
import OtpInput from "react-otp-input"

import CountDown from "@/components/common/count-down"
import Button from "@/components/ui/button"

import PostSendOTP from "@/services/utils/post-send-opt"
import { ErrorResponse } from "@/types"

type Props = {}

const VerifyOTP = (props: Props) => {
  const t = useTranslations("login.verify-opt")

  // state
  const [{ mobile, date }, setQueries] = useQueryStates({
    mobile: parseAsString,
    date: parseAsInteger,
  })
  const [_, setSuccess] = useQueryState("success")

  // handle change mobile
  const handleChangeMobileNumber = () => {
    setQueries({
      mobile: null,
      date: null,
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [otp, setOtp] = useState("")

  const handleVerifyTOP: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
 
      setIsLoading(true)
      const data = await signIn("credentials", { mobile, otp, redirect: false })
      console.log("🚀 ~ consthandleVerifyTOP:React.FormEventHandler<HTMLFormElement>= ~ data:", data)
      if (data?.error) {
        setError(t(`errors.unauthorized`))
        return
      }

      setSuccess("true")
    } catch (error) {
      console.log("🚀 ~ handleVerifyTOP ~ error:", error)
      setError(t(`errors.serverError`))
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      const response = await PostSendOTP({ mobile: mobile! })
      setQueries(
        {
          date: Date.now(),
        },
        {
          shallow: true,
        },
      )
      console.log("🚀 ~ handleResendCode ~ response:", response)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseError = error.response.data as ErrorResponse<{}>
        setError(responseError.message)
        return
      }
      setError(t("errors.serverError"))
    }
  }
  return (
    <form onSubmit={handleVerifyTOP} className="flex flex-col gap-20">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        <p className="text-sm text-default-500">{t("description")}</p>
      </div>
      <div>
        <p className="mb-4 text-center text-xl">{t("input-label")}</p>

        <div dir="ltr" className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="block w-3"></span>}
            renderInput={(props) => (
              //   @ts-ignore
              <Input
                classNames={{
                  inputWrapper: " w-12",
                }}
                radius="sm"
                size="lg"
                {...props}
              />
            )}
          />
        </div>
        {error ? <p className="mt-3 text-sm font-semibold text-danger">{error}</p> : ""}

        <div className="mt-10">
          <CountDown
            date={(date ? date : Date.now()) + 60000}
            result={
              <p className="cursor-pointer text-secondary underline" onClick={handleResendCode}>
                {t("resend-code")}
              </p>
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button isLoading={isLoading} type="submit">
          {t("button")}
        </Button>

        <Button
          onClick={handleChangeMobileNumber}
          variant="light"
          color="default"
          className="text-default-500 underline">
          {t("change-number-button")}
        </Button>
      </div>
    </form>
  )
}

export default VerifyOTP
