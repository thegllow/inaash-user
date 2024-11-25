import { Button } from "@nextui-org/button"
import { ChevronDown } from "lucide-react"
import React from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal"
import { useVideos } from "../context/courses-context"
import { Card } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Link } from "@/lib/i18n/navigation"

type Props = {
  children: String
}

const ChangeProgramButton = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [videos] = useVideos()
  return (
    <>
      <Button onClick={onOpen} size="sm" radius="md" variant="bordered" color="primary" className="border-2 px-4 py-2">
        <div className="flex items-center gap-7">
          <span className="block ps-2 text-sm">{props.children}</span>
          <ChevronDown />
        </div>
      </Button>
      <Modal
        closeButton={null}
        placement="bottom"
        size="xl"
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
          }
        }}
        classNames={{
          base: "p-0 bg-transparent",
          closeButton: "hidden",
        }}

        isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex w-full  items-center justify-center gap-4 flex-row">
                  {videos.map(course => {
                    return <Card
                      shadow={"none"}
                      key={course.id}
                      isPressable
                      as={Link}
                      href={`/course/${course.id}`}

                      radius="lg"
                      className="max-w-[390px] flex-grow border-none lg:w-1/2">
                      <Image
                        alt="first-course"
                        className="h-full w-full object-cover"
                        src={course.logo}
                        removeWrapper
                      />
                    </Card>
                  })}
                </div>

              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ChangeProgramButton
