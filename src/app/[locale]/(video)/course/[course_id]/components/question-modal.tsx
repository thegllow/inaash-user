import { Modal, ModalBody, ModalContent } from "@nextui-org/modal"
import React from "react"

type Props = {}

const QuestionModal = (props: Props) => {
  return (
    <Modal
      classNames={{
        base: "p-0 bg-transparent",
        closeButton: "hidden",
      }}
      isOpen={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default QuestionModal
