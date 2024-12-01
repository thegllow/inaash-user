"use client"
import CountDown from "@/components/common/count-down"
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal"
import { useCourseStore } from "../store/course-store-provider"
import { timeToSeconds } from "../utils/time-to-seconds"
import { AnswerQuestion, TVariables } from "../types/answer-question"
import useMutation from "@/hooks/use-mutation"
import { answerQuestion } from "../utils/answer-question"
import { useParams } from "next/navigation"
import { shuffleArray } from "../utils/shuffle-array"
import React, { HTMLAttributes, useMemo } from "react"
import { cn } from "@/lib/cn"

const Answer: React.FC<HTMLAttributes<HTMLDivElement> & { answer: string }> = ({
  answer,
  className,
  children,
  ...props
}) => {
  return (
    answer && (
      <div
        className={cn(
          "text-light w-full cursor-pointer rounded-md bg-[#292929] p-5 text-center text-xs/relaxed font-normal text-white hover:bg-[#363636e8]",
          className,
        )}
        {...props}>
        {answer}
      </div>
    )
  )
}

const QuestionModal = () => {
  const { course_id } = useParams() as { course_id: string }
  const { current, questions, timeout, updateVideoStatus, next } = useCourseStore((state) => ({
    current: state.currentQuestion,
    questions: state.questionsMap,
    timeout: state.removeCurrentQuestion,
    next: state.removeCurrentQuestion,
    updateVideoStatus: state.updateVideoStatus,
  }))
  const question = questions.get(current)

  type TError = unknown

  const { mutate, error, isLoading, isError } = useMutation<AnswerQuestion["data"], TError, TVariables>(
    answerQuestion,
    {
      onSuccess(data) {
        updateVideoStatus({
          correctlyAnsweredQuestions: data.video.correct_answers,
          hearts: data.video.hearts,
          answerRate: data.video.answer_average,
          progress: data.video.progress,
        })
        next()
      },
    },
  )

  const answersArray = useMemo(() => shuffleArray(["a", "b", "c", "d"] as const), [question?.id])
  const handleAnswering = (answer: string) => {
    mutate({
      video_id: course_id,
      question_id: question!.id,
      answer,
      answer_time: "00:00:50",
    })
  }
  const date = useMemo(() => Date.now() + timeToSeconds(question?.allowed_time || "0") * 1000, [question?.id])

  if (!question) return
  return (
    <Modal
      size="md"
      classNames={{
        base: "px-4 py-9 bg-[#0a090970] backdrop-blur-2xl shadow-none rounded-xl",
        closeButton: "hidden",
      }}
      isOpen={!!current}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="space-y-8 p-0 shadow-none">
              <p className="text-center text-2xl text-white">{question.question}</p>
              <div className="flex flex-col gap-2">
                {answersArray.map((key) => {
                  return (
                    <Answer
                      onClick={() => {
                        if (isLoading) return
                        handleAnswering(`answer_${key}`)
                      }}
                      key={key}
                      answer={question[`answers_${key}`]}
                    />
                  )
                })}
              </div>
              <div>
                <CountDown
                  key={question.appears_at}
                  onComplete={timeout}
                  alert
                  className="rounded-full"
                  date={date}
                  result={<div></div>}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default QuestionModal
