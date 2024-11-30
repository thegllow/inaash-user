"use client"
import React from "react"
import { Accordion, AccordionItem } from "@nextui-org/accordion"
import { Minus, Plus } from "lucide-react"
import { FAQ } from "../types"

type Props = {
  data: FAQ[]
}

const Icon = () => {
  return (
    <div className="flex shrink-0 items-center justify-center rounded-full border ~size-9/12">
      <Plus className="text-primary ~size-4/6 group-data-[open=true]:hidden" />
      <Minus className="hidden text-primary ~size-4/6 group-data-[open=true]:block" />
    </div>
  )
}

const List = (props: Props) => {
  return (
    <div className="~px-5/16 ~pb-4/6">
      <Accordion
        itemClasses={{
          indicator: "group",
        }}
        showDivider={false}
        disableIndicatorAnimation>
        {props.data.map((faq) => {
          return (
            <AccordionItem
              key={faq.id}
              aria-label={faq.title}
              className="text-default-600"
              indicator={<Icon />}
              title={faq.title}>
              {faq.description}
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default List
