"use client"

import React from "react"
import { firstCourse, secondCourse } from "@/assets"
import { Card } from "@nextui-org/card"
import { Image } from "@nextui-org/image"

type Props = {}

const ChooseCourse = (props: Props) => {
  return (
    <div className="flex gap-4">
      <Card isPressable radius="lg" className="w-1/2 max-w-[400px] border-none">
        <Image alt="first-course" className="object-cover" src={firstCourse.src} removeWrapper />
      </Card>
      <Card isPressable radius="lg" className="w-1/2 max-w-[400px] border-none">
        <Image alt="second-course" className="object-cover" src={secondCourse.src} removeWrapper />
      </Card>
    </div>
  )
}

export default ChooseCourse
