"use client"
import useForceLandscape from "@/hooks/use-force-landscape"
import { useOrientation } from "@mantine/hooks"
import React from "react"

type Props = {
  children: React.ReactNode
}

const ForceLandscape = (props: Props) => {
  const { angle, type } = useOrientation()
  const isLandscape = useForceLandscape()
  if (!isLandscape)
    return (
      <div className="text-4xl text-white">
        {type}, {angle}
      </div>
    )
  return props.children
}

export default ForceLandscape
