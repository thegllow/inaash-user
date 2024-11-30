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
    <div className="h-screen w-full">
      <VideoPlayer src="https://vz-61460180-4fe.b-cdn.net/5a86f5c6-c235-45da-907d-c084d9e5f0e0/playlist.m3u8" />
      <QuestionModal />
    </div>
  )
}

export default Page
