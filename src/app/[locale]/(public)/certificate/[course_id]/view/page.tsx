import Certificate from "@/components/common/certificate"
import { Card } from "@nextui-org/card"

const Page = async ({ params }: { params: { course_id: string } }) => {
  return (
    <Card
      shadow={"none"}
      className="mx-auto mb-20 flex h-full w-full max-w-3xl shrink-0 items-center justify-center gap-4 rounded-xl bg-[#0A090959] p-1 ~/md:~py-8/10">
      <Certificate course_id={params.course_id} />
    </Card>
  )
}

export default Page
