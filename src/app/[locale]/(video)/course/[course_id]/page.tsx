import dynamic from "next/dynamic"
import QuestionModal from "./components/question-modal"
const VideoPlayer = dynamic(async () => import("./components/video-player"), { ssr: false })

type Props = {
  params: {
    locale: string
    course_id: string
  }
}

const Page = async ({ params }: Props) => {
  return (
    <div className="h-[100lvh] w-full">
      <VideoPlayer />
      <QuestionModal />
    </div>
  )
}

export default Page
