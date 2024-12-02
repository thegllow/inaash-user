"use client"
import CountDown from "@/components/common/count-down"
import useMutation from "@/hooks/use-mutation"
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import type ReactCountdown from "react-countdown"
import { useCourseStore } from "../store/course-store-provider"
import { AnswerQuestion, TVariables } from "../types/answer-question"
import { answerQuestion } from "../utils/answer-question"
import { formatTime } from "../utils/format-time"
import { shuffleArray } from "../utils/shuffle-array"
import { timeToSeconds } from "../utils/time-to-seconds"
import Answer from "./answer"
import WrongAnswerExplanation from "./wrong-answer-explanation"
import { AnimatePresence, motion } from "framer-motion"
import { Question } from "@/types/video"

const QuestionModal = () => {
  // state
  const { course_id } = useParams() as { course_id: string }
  const {
    current,
    questions,
    selectedAnswer,
    answerStatus,
    setSelectedAnswer,
    timeout,
    updateVideoStatus,
    next,
    setAnswerStatus,
    showExplanation,
    setShowExplanation,
  } = useCourseStore((state) => ({
    current: state.currentQuestion,
    questions: state.questionsMap,
    timeout: state.removeCurrentQuestion,
    next: state.removeCurrentQuestion,
    updateVideoStatus: state.updateVideoStatus,
    selectedAnswer: state.selectedAnswer,
    setSelectedAnswer: state.setSelectedAnswer,
    answerStatus: state.answerStatus,
    setAnswerStatus: state.setAnswerStatus,
    showExplanation: state.showExplanation,
    setShowExplanation: state.setShowExplanation,
  }))
  const question = questions.get(current)

  // counter
  const countDownRef = useRef<ReactCountdown | null>(null)
  const date = useMemo(() => Date.now() + timeToSeconds(question?.allowed_time || "0") * 1000, [question?.id])

  // answering question
  type TError = unknown

  const { mutate, data, error, isLoading, isError, isSuccess } = useMutation<
    AnswerQuestion["data"],
    TError,
    TVariables
  >(answerQuestion, {
    onSuccess(data) {
      updateVideoStatus({
        correctlyAnsweredQuestions: data.video.correct_answers,
        hearts: data.video.hearts,
        answerRate: data.video.answer_average,
        progress: data.video.progress,
      })
      setAnswerStatus(data.is_correct ? "correct" : "wrong")
    },
  })

  useEffect(() => {
    if (!isSuccess) return
    if (answerStatus === "correct") {
      const timer = setTimeout(() => {
        next()
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }

    if (answerStatus === "wrong") {
      const timer = setTimeout(() => {
        setShowExplanation(true)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isSuccess, answerStatus, next])

  const answersArray = useMemo(() => {
    return process.env.NODE_ENV === "development"
      ? (["a", "b", "c", "d"] as const)
      : shuffleArray(["a", "b", "c", "d"] as const)
  }, [question?.id])

  const handleAnswering = (answer: string) => {
    setSelectedAnswer(answer)
    countDownRef.current?.api?.stop()
    const timeInSec = (Date.now() + timeToSeconds(question?.allowed_time || "0") * 1000 - date) / 1000
    mutate({
      video_id: course_id,
      question_id: question!.id,
      answer,
      answer_time: formatTime(timeInSec),
    })
  }

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      size="lg"
      classNames={{
        base: "~md/lg:~px-2/4 ~md/lg:~py-5/9 bg-[#0a090970] backdrop-blur-2xl shadow-none rounded-xl overflow-hidden duration-300",
        closeButton: "hidden",
      }}
      isOpen={!!question}>
      <ModalContent className="overflow-hidden duration-300">
        {(onClose) => (
          <AnimatePresence mode="wait">
            {showExplanation ? (
              <motion.div
                key="explanation"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}>
                <ModalBody className="p-0 shadow-none ~md/lg:~space-y-6/8">
                  <WrongAnswerExplanation question={question!} answer="answer_b" />
                </ModalBody>
              </motion.div>
            ) : (
              <motion.div key="question" exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
                <ModalBody className="p-0 shadow-none ~md/lg:~space-y-6/8">
                  <p className="text-center text-2xl text-white">{question?.question}</p>
                  <div className="flex flex-col gap-2">
                    {answersArray.map((key) => {
                      return (
                        <Answer
                          status={`answer_${key}` === selectedAnswer ? answerStatus : "notAnswered"}
                          isLoading={isLoading}
                          onClick={() => {
                            if (isLoading || answerStatus !== "notAnswered") return
                            handleAnswering(`answer_${key}`)
                          }}
                          key={key}
                          answer={question![`answers_${key}`]}
                        />
                      )
                    })}
                  </div>
                  <div>
                    <CountDown
                      ref={countDownRef}
                      key={question?.appears_at}
                      onComplete={timeout}
                      alert
                      className="rounded-full"
                      date={date}
                      result={<div></div>}
                    />
                  </div>
                </ModalBody>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </ModalContent>
    </Modal>
  )
}

export default QuestionModal
