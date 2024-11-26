import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { Card } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal"
import { ChevronUp } from "lucide-react"
import { useVideos } from "../context/courses-context"
import { useState } from "react"
import { useTranslations } from "next-intl"
import MyButton from "@/components/ui/button"
import { Button } from "@nextui-org/button"
import { useParams } from "next/navigation"

type Props = {
  children: String
}

const ChangeProgramButton = (props: Props) => {
  const { course_id } = useParams()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [course, setCourse] = useState("")
  const t = useTranslations("course.course-footer")
  const { videos } = useVideos()
  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        radius="md"
        variant="bordered"
        color="primary"
        className="border-2 px-4 py-2">
        <div className="flex items-center gap-7">
          <span className="block ps-2 text-sm">{props.children}</span>
          <ChevronUp className={cn("duration-150", isOpen && "rotate-180")} />
        </div>
      </Button>
      <Modal
        closeButton={null}
        placement="bottom"
        size="2xl"
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
                  {videos.map((course) => {
                    return (
                      <Card
                        shadow={"none"}
                        key={course.id}
                        isPressable
                        onClick={() => {
                          if (course_id == course.id) {
                            onClose()
                            return
                          }
                          setCourse(course.id)
                        }}
                        radius="lg"
                        className="max-w-[390px] flex-grow border-none lg:w-1/2">
                        <Image
                          alt="first-course"
                          className="h-full w-full object-cover"
                          src={course.logo}
                          removeWrapper
                        />
                      </Card>
                    )
                  })}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        closeButton={null}
        placement="center"
        size="sm"
        classNames={{
          closeButton: "hidden",
          base: "bg-[#0A090959] backdrop-blur-lg",
        }}
        isOpen={!!course}
        onOpenChange={(value) => {
          if (!value) setCourse("")
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="space-y-8 py-4">
                  <p className="text-center text-lg font-medium text-foreground">
                    {t("change-program-confirm-dialog")}
                  </p>
                  <div className="flex items-center justify-center gap-5">
                    <MyButton size="sm" as={Link} href={`/course/${course}`}>
                      {t("change-program-dialog-confirm")}
                    </MyButton>
                    <MyButton
                      onClick={() => {
                        setCourse("")
                      }}
                      size="sm"
                      color="primary"
                      className="text-primary"
                      variant="bordered">
                      {t("change-program-dialog-cancel")}
                    </MyButton>
                  </div>
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
