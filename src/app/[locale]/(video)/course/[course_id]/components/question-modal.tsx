"use client"
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal"
import { useCourseStore } from "../store/course-store-provider"
import CountDown from "@/components/common/count-down"
import { timeToSeconds } from "../utils/time-to-seconds"
import { useMemo } from "react"

type Props = {}

const Answer = ({ answer }: { answer: string }) => {
  return (
    answer && (
      <div className="text-light w-full cursor-pointer rounded-md bg-[#292929] p-3 text-center text-sm font-normal text-white">
        {answer}
      </div>
    )
  )
}

const QuestionModal = (props: Props) => {
  const { current, questions, timeout } = useCourseStore((state) => ({
    current: state.currentQuestion,
    questions: state.questionsMap,
    timeout: state.removeCurrentQuestion,
  }))
  const question = questions.get(current)

  if (!question) return
  return (
    <Modal
      classNames={{
        base: "px-6 py-10 bg-[#0a090970] backdrop-blur-2xl shadow-none rounded-xl",
        closeButton: "hidden",
      }}
      isOpen={!!current}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="space-y-9 p-0 shadow-none">
              <p className="text-center text-2xl text-white">{question.question}</p>
              <div className="flex flex-col gap-2">
                <Answer answer={question.answers_a} />
                <Answer answer={question.answers_b} />
                <Answer answer={question.answers_c} />
                <Answer answer={question.answers_d} />
              </div>
              <div>
                <CountDown
                  onComplete={timeout}
                  alert
                  className="rounded-full"
                  date={Date.now() + timeToSeconds(question.allowed_time) * 1000}
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
