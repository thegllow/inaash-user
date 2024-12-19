import { getUserVideo } from "@/app/[locale]/(video)/course/[course_id]/get-user-video"
import Certificate from "@/components/common/certificate"
import { Card } from "@nextui-org/card"

export const dynamic = "force-dynamic"
const Page = async ({ params }: { params: { course_id: string } }) => {
  const video = await getUserVideo(params.course_id)
  return (
    <Card
      shadow={"none"}
      className="mx-auto mb-20 flex h-full w-full max-w-3xl shrink-0 items-center justify-center gap-4 rounded-xl bg-[#0A090959] p-1 ~/md:~py-8/10">
      <Certificate certificate_qr_code={video.certificate_number!} />
    </Card>
  )
}

export default Page
