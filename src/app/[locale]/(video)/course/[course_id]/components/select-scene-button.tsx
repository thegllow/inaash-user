import { Button } from "@nextui-org/button"
import { ChevronDown } from "lucide-react"
import React from "react"

type Props = {
  children: String
}

const SelectSceneButton = (props: Props) => {
  return (
    <Button size="sm" radius="md" variant="bordered" color="primary" className="border-2 px-4 py-2">
      <div className="flex items-center gap-7">
        <span className="block ps-2 text-sm">{props.children}</span>
        <ChevronDown />
      </div>
    </Button>
  )
}

export default SelectSceneButton
