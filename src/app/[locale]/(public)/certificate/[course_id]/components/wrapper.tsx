"use client"

import { useSearchParams } from "next/navigation"

import First from "./fist"
const Steps = {
  first: First,
  second: First,
}

const Wrapper = () => {
  const searchParams = useSearchParams()
  const activeStep = searchParams.get("step") || "first"
  const Step = Steps[activeStep as keyof typeof Steps]

  return <Step />
}

export default Wrapper
