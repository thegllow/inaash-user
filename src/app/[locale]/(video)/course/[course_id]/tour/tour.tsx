/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/button"
import { useTranslations } from "next-intl"
import { ComponentRef, useEffect, useRef, useState } from "react"
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers, TooltipRenderProps } from "react-joyride"
import allSteps from "./steps"
import useForceLandscape from "@/hooks/use-force-landscape"

function Tooltip({ helpers, step, tooltipProps }: TooltipRenderProps & { helpers: StoreHelpers }) {
  const t = useTranslations("tour")

  const data = step.data as {
    icon: string
    index: number
  }

  return (
    <>
      <div
        {...tooltipProps}
        className="flex w-[100vw] !max-w-80 flex-col gap-8 rounded-lg bg-[#241c1c] p-4 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-[#120A09] [box-shadow:_7px_4px_16px_#30ACFF17]">
            <img alt="icon" src={data.icon} />
          </div>

          <div className="flex items-center gap-1">
            {Array(7)
              .fill("")
              .map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i + 1 == data.index ? "bg-primary" : "bg-default-500"}`}
                />
              ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{t(`steps.${step.title as "step1"}.title`)}</p>
          <p className="text-sm text-default-500">{t(`steps.${step.title as "step1"}.content`)}</p>
        </div>
        <div className="flex justify-between gap-4 px-4">
          <Button
            onPress={() => {
              helpers.skip()
              window.localStorage.setItem("inaash-tour-completed", "true")
            }}
            radius="md"
            size="sm"
            variant="bordered"
            color="primary"
            fullWidth>
            {t("buttons.skip")}
          </Button>

          <Button
            onPress={(e) => {
              helpers.next()
            }}
            radius="md"
            color="primary"
            size="sm"
            fullWidth>
            {t("buttons.next")}
          </Button>
        </div>
      </div>
    </>
  )
}
export function CustomJOYRIDE() {
  const [run, setRun] = useState(false)

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const options: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (options.includes(status)) {
      setRun(false)
      if (typeof window !== "undefined") {
        window.localStorage.setItem("inaash-tour-completed", "true")
      }
    }
  }

  const helpers = useRef<StoreHelpers>(null)

  const setHelpers = (storeHelpers: StoreHelpers) => {
    helpers.current = storeHelpers
  }

  const isLandscape = useForceLandscape()
  useEffect(() => {
    if (typeof window !== "undefined" && isLandscape) {
      if (!window.localStorage.getItem("inaash-tour-completed")) {
        window.innerWidth > window.innerHeight ? setRun(true) : null
      }
    }
  }, [isLandscape])

  return (
    <div>
      <Joyride
        callback={handleJoyrideCallback}
        run={run}
        getHelpers={setHelpers}
        continuous
        scrollToFirstStep
        showSkipButton
        disableOverlayClose
        steps={allSteps}
        styles={{
          spotlight: {
            transition: "all 0.3s ease-in-out", // Smooth spotlight transition
          },
          options: {
            arrowColor: "#241c1c",
            zIndex: 2000000,
          },
          overlay: {
            backgroundColor: "#030303D4",
          },
        }}
        tooltipComponent={(props) => <Tooltip {...props} helpers={helpers.current!} />}
      />
    </div>
  )
}
