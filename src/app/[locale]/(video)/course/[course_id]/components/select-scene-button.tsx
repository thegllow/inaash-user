import { cn } from "@/lib/cn"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal"
import { ChevronUp } from "lucide-react"
import { useVideos } from "../context/courses-context"
type Props = {
  children: String
}

const SelectSceneButton = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { currentVideo } = useVideos()
  return (
    <>
      <Button
        onClick={onOpen}
        size="sm" radius="md" variant="bordered" color="primary" className="border-2 px-4 py-2">
        <div className="flex items-center gap-7">
          <span className="block ps-2 text-sm">{props.children}</span>
          <ChevronUp className={cn(" duration-150", isOpen && 'rotate-180')} />

        </div>
      </Button>
      <Modal
        closeButton={null}
        placement="bottom"
        size="5xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        classNames={{
          base: "p-0 bg-transparent",
          closeButton: "hidden",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  asdjf;las
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SelectSceneButton
