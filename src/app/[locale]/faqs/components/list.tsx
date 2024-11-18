"use client"
import React from "react"
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Minus, Plus } from "lucide-react"

type Props = {}

const Icon = () => {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full border ~size-9/12">
      <Plus className="text-primary ~size-4/6 group-data-[open=true]:hidden" />
      <Minus className="hidden text-primary ~size-4/6 group-data-[open=true]:block" />
    </div>
  )
}

const List = (props: Props) => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

  return (
    <div className="~px-5/16">
      <Accordion
        itemClasses={{
          indicator: "group",
        }}
        showDivider={false}
        disableIndicatorAnimation>
        <AccordionItem key="anchor" aria-label="Anchor" indicator={<Icon />} title="Anchor">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="moon" aria-label="Moon" indicator={<Icon />} title="Moon">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="sun" aria-label="Sun" indicator={<Icon />} title="Sun">
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default List
