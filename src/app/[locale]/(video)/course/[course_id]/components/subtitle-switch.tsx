import { Switch, SwitchProps, useSwitch } from "@nextui-org/switch"
import { VisuallyHidden } from "@react-aria/visually-hidden"
import { SubtitlesIcon } from "lucide-react"

const SubTitleSwitch = (props: SwitchProps) => {
  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props)

  return (
    <div className="shrink-0">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "h-8 w-8",
              "flex items-center justify-center",
              "rounded-sm bg-transparent text-foreground group-data-[selected=true]:bg-transparent group-data-[selected=true]:text-primary",
            ],
          })}>
          <SubtitlesIcon className="size-7 shrink-0" strokeWidth={1.2} />
        </div>
      </Component>
    </div>
  )
}

export default SubTitleSwitch
