import { cn } from "@/lib/cn"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal"
import { ChevronUp, TriangleAlert } from "lucide-react"
import { useVideos } from "../context/courses-context"
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { useTranslations } from "next-intl"
type Props = {
  children: String
}

const SelectSceneButton = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { currentVideo } = useVideos()
  const scenes = currentVideo.video.scenes

  const t = useTranslations("course.course-footer")
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
          base: "p-0 bg-transparent shadow-none",
          closeButton: "hidden",
          body: "!p-0 shadow-none",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Card
                  radius="md"
                  shadow="none"
                  className="mx-auto mb-7 max-w-sm bg-[#362b2bdc] backdrop-blur-md">
                  <div className="flex items-end gap-4 p-4 text-foreground">
                    <TriangleAlert className="text-foreground" />
                    <p className="text-sm">{t("select-scene-warning")}</p>
                  </div>
                </Card>
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  {scenes.map((scene) => {
                    return (
                      <Card
                        shadow={"none"}
                        key={scene.id}
                        isPressable
                        radius="md"
                        className="w-full max-w-[390px] flex-grow border-none">
                        <Image
                          alt="first-course"
                          className="h-full w-full object-cover"
                          src={scene.logo}
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
    </>
  )
}

export default SelectSceneButton
