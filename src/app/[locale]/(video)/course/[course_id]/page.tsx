"use client"
import dynamic from "next/dynamic"
import QuestionModal from "./components/question-modal"
const CustomJOYRIDE = dynamic(async () => (await import("./tour/tour")).CustomJOYRIDE, { ssr: false })
const VideoPlayer = dynamic(async () => import("./components/video-player"), { ssr: false })

const Page = () => {
  return (
    <div className="h-[100lvh] w-full">
      <VideoPlayer />
      <QuestionModal />
      <CustomJOYRIDE />
    </div>
  )
}

export default Page
