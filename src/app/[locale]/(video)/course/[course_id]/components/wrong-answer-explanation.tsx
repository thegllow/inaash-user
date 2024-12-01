"use client"
import { Question } from "@/types/video"
import { useTranslations } from "next-intl"
import React from "react"

type Props = {
  question: Question
  answer: string
}
const listen = ""

const WrongAnswerExplanation = (props: Props) => {
  const t = useTranslations("course.wrong-answer-modal")
  return (
    <div>
      <div>
        <h4>{t("title")}</h4>
        <p>{t("description")}</p>
      </div>
    </div>
  )
}

export default WrongAnswerExplanation
