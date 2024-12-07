"use client"
import React from "react"
import dynamic from "next/dynamic"
import { parseAsNumberLiteral, useQueryState } from "nuqs"
import Rating from "./rating"
import UserInfo from "./user-info"
import Certificate from "./certificate"

type Props = {}

const Render = (props: Props) => {
  const [step] = useQueryState("step", parseAsNumberLiteral([1, 2, 3]).withDefault(1))

  switch (step) {
    case 1:
      return <Rating />
    case 2:
      return <UserInfo />
    case 3:
      return <Certificate />
  }

  //  return <div></div>
}

export default Render
