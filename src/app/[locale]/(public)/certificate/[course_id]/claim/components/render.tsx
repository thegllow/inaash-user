"use client"
import { parseAsNumberLiteral, useQueryState } from "nuqs"
import Rating from "./rating"
import UserInfo from "./user-info"

type Props = {}

const Render = (props: Props) => {
  const [step] = useQueryState("step", parseAsNumberLiteral([1, 2, 3]).withDefault(1))

  switch (step) {
    case 1:
      return <Rating />
    case 2:
      return <UserInfo />
  }
}

export default Render
