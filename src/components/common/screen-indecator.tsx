import React from "react"

type Props = {}

const ScreenIndicator = (props: Props) => {
  // Render the indicator only in development
  if (process.env.NODE_ENV !== "development") return null
  return (
    <div className="fixed bottom-10 left-10 z-[100] flex size-16 items-center justify-center rounded-full bg-blue-700 text-3xl text-white">
      <span className="md:hidden">sm</span>
      <span className="lg:hidden">md</span>
      <span className="xl:hidden">lg</span>
      <span className="max-xl:hidden">xl</span>
    </div>
  )
}

export default ScreenIndicator
