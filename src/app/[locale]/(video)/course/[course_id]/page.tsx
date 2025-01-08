"use client"
import dynamic from "next/dynamic"
import QuestionModal from "./components/question-modal"
const VideoPlayer = dynamic(async () => import("./components/video-player"), { ssr: false })

const Page = () => {
  return (
    <div className="h-[100lvh] w-full">
      <VideoPlayer />
      <QuestionModal />
    </div>
  )
}

export default Page
