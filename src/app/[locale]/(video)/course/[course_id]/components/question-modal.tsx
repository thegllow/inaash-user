"use client"
import CountDown from "@/components/common/count-down"
import useMutation from "@/hooks/use-mutation"
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal"
import { AnimatePresence, motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { ComponentRef, useEffect, useMemo, useRef, useState } from "react"
import type ReactCountdown from "react-countdown"
import { useVideos } from "../context/courses-context"
import { useCourseStore } from "../store/course-store-provider"
import { AnswerQuestion, TVariables } from "../types/answer-question"
import { answerQuestion } from "../utils/answer-question"
import { formatTime } from "../utils/format-time"
import { shuffleArray } from "../utils/shuffle-array"
import { timeToSeconds } from "../utils/time-to-seconds"
import Answer from "./answer"
import WrongAnswerExplanation from "./wrong-answer-explanation"
import { useTimeout } from "@mantine/hooks"

const QuestionModal = () => {
  // state
  const session = useSession()
  const { course_id } = useParams() as { course_id: string }
  const { currentVideo } = useVideos()
  const hasPassedCourse = currentVideo.certificate_qr_code ? true : false
  const {
    currentQuestion: current,
    questionsMap: questions,
    selectedAnswer,
    answerStatus,
    setSelectedAnswer,
    updateVideoStatus,
    removeCurrentQuestion: next,
    setAnswerStatus,
    showExplanation,
    setShowExplanation,
  } = useCourseStore((state) => state)
  const question = questions.get(current)

  // counter
  const countDownRef = useRef<ReactCountdown | null>(null)
  // const [isTimeOut, setIsTimeOut] = useState(false)
  const [counter, setCounter] = useState(0)

  const timeoutAudioRef = useRef<ComponentRef<"audio">>(null)
  const timeoutDate = useMemo(
    () => Date.now() + timeToSeconds(question?.allowed_time || "0") * 1000,
    [question?.id, counter, question?.allowed_time],
  )

  // answering question

  type TError = unknown
  const handleAnsweringQuestionOnWithCertificate = async (data: TVariables) => {
    return { is_correct: data.answer === `answer_a` }
  }

  const { mutate, isLoading, isSuccess } = useMutation<
    AnswerQuestion["data"] | { is_correct: boolean },
    TError,
    TVariables
    //? if course has been passed no need to do a server request to check {{a}} is always right
  >(
    hasPassedCourse
      ? handleAnsweringQuestionOnWithCertificate
      : async (variables) => {
          setAnswerStatus(variables.answer === `answer_a` ? "correct" : "wrong")

          return await answerQuestion(variables)
        },
    {
      // onMutate(variables) {
      // handling playing timeout audio
      // if (!variables.answer) {
      // setIsTimeOut(true)
      //   timeoutAudioRef.current?.play()
      // }
      // },
      onSuccess(data, variables) {
        console.log("🚀 ~ onSuccess ~ data:", data)
        if (!hasPassedCourse) {
          let result = data as AnswerQuestion["data"]
          updateVideoStatus({
            correctlyAnsweredQuestions: result.video.correct_answers,
            hearts: result.video.hearts,
            answerRate: result.video.answer_average,
            progress: result.video.progress,
          })
        }

        // setAnswerStatus(variables.answer ? (data.is_correct ? "correct" : "wrong") : "timeout")
        setAnswerStatus(data.is_correct ? "correct" : "wrong")
      },
    },
  )
  // closing question modal 3 sec after answering
  useEffect(() => {
    if (!isSuccess) return
    let timer: NodeJS.Timeout
    if (answerStatus === "correct") {
      timer = setTimeout(() => {
        next()
      }, 500)
    }

    if (answerStatus === "wrong") {
      timer = setTimeout(() => {
        setShowExplanation(true)
      }, 500)
    }
    // if (answerStatus === "timeout") {
    //   next()
    // }

    return () => {
      clearTimeout(timer)
    }
  }, [isSuccess, answerStatus, next, setShowExplanation])

  // handling answering
  const handleAnswering = (answer: string) => {
    setSelectedAnswer(answer)
    countDownRef.current?.api?.pause()
    const timeInSec = (Date.now() + timeToSeconds(question?.allowed_time || "0") * 1000 - timeoutDate) / 1000
    mutate({
      video_id: course_id,
      question_id: question!.id,
      answer,
      answer_time: formatTime(timeInSec),
    })
  }

  // handling timeout
  const handleTimeout = () => {
    if (!question) return
    setCounter((pre) => ++pre)
    // mutate({
    //   video_id: course_id,
    //   question_id: question!.id,
    //   answer: null,
    //   answer_time: question!.allowed_time,
    // })
  }

  useEffect(() => {
    let timer = setTimeout(
      () => {
        timeoutAudioRef.current?.play()
      },
      timeToSeconds(question?.allowed_time || "0") * 1000 - 5000,
    )

    return () => {
      clearTimeout(timer)
    }
  }, [question?.id, question?.allowed_time, counter])

  // useTimeout(
  //   () => {
  //     timeoutAudioRef.current?.play()
  //   },
  //   timeToSeconds(question?.allowed_time || "0") * 1000 - 5000,
  //   {
  //     autoInvoke: true,
  //   },
  // )

  // useEffect(() => {
  //   if (isTimeOut && answerStatus === "pending") {
  //     console.log("🚀 ~ useEffect ~ isTimeOut", isTimeOut)
  //     handleTimeout()
  //   }
  // }, [isTimeOut])

  // shuffle answer in production
  const shuffledAnswers = useMemo(() => {
    return process.env.NODE_ENV === "development"
      ? (["a", "b", "c", "d"] as const)
      : shuffleArray(["a", "b", "c", "d"] as const)
  }, [question?.id])

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
                    {shuffledAnswers.map((key) => {
                      return (
                        <Answer
                          status={`answer_${key}` === selectedAnswer ? answerStatus : "pending"}
                          isLoading={isLoading}
                          // isDisabled={isTimeOut}
                          onClick={() => {
                            // if (isLoading || answerStatus !== "pending" || isTimeOut) return
                            if (isLoading || answerStatus !== "pending") return
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
                      key={question?.appears_at + "" + counter}
                      alert
                      onComplete={() => {
                        // if (answerStatus === "pending") setIsTimeOut(true)
                        if (answerStatus === "pending") handleTimeout()
                      }}
                      className="rounded-full"
                      date={timeoutDate}
                      result={
                        <div>
                          <p className="text-danger">00:00</p>
                        </div>
                      }
                    />
                    <audio
                      ref={timeoutAudioRef}
                      // onEnded={(e) => {
                      //   setIsTimeOut(false)
                      // }}
                      src={session.data?.user.timeout_audio}
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
