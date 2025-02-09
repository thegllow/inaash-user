import { cn } from "@/lib/cn"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal"
import { ChevronUp, TriangleAlert } from "lucide-react"
import { useVideos } from "../context/courses-context"
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"
import { useTranslations } from "next-intl"
import { useCourseStore } from "../store/course-store-provider"
import { timeToSeconds } from "../utils/time-to-seconds"
import { Scene } from "@/types/video"
type Props = {
  children: String
}

const SelectSceneButton = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { currentVideo } = useVideos()
  const { videoPlayerRef, updateVideoState } = useCourseStore((state) => ({
    videoPlayerRef: state.videoPlayerRef,
    updateVideoState: state.updateVideoStatus,
  }))
  const scenes = currentVideo.video.scenes
  const hasPassedCourse = currentVideo.certificate_number ? true : false

  const handleSelectScene = (scene: Scene) => {
    if (!hasPassedCourse) return
    updateVideoState({ startTime: scene.start_time })
    videoPlayerRef?.seekTo(timeToSeconds(scene.start_time), "seconds")
  }
  const t = useTranslations("course.course-footer")
  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        radius="md"
        variant="bordered"
        color="primary"
        className=" landscape:border-1.5 portrait:border-2 landscape:px-2.5 portrait:px-4 landscape:py-0.5 portrait:py-2" >
        <div className="flex items-center gap-7">
          <span className="block ps-2 landscape:text-[11px] portrait:text-xs ">{props.children}</span>
          <ChevronUp className={cn("duration-150 landscape:text-[10px] portrait:text-xs", isOpen && "rotate-180")} />
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
                  {hasPassedCourse ? null : (
                    <div className="flex items-end gap-4 p-4 text-foreground">
                      <TriangleAlert className="text-foreground" />
                      <p className="text-sm">{t("select-scene-warning")}</p>
                    </div>
                  )}
                </Card>
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  {scenes.map((scene) => {
                    return (
                      <Card
                        shadow={"none"}
                        key={scene.id}
                        isPressable
                        onClick={() => {
                          handleSelectScene(scene)
                        }}
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
