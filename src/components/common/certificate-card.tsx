/* eslint-disable @next/next/no-img-element */
import { logo } from "@/assets"
import { gmail, linkedin, twitter, whatsapp } from "@/assets/icons"
import { Button } from "@nextui-org/button"
import { Card } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"

const ShareSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-foreground">
      <h1 className="text-3xl font-bold">شارك نجاحك!</h1>
      <Card className="w-full max-w-md rounded-lg bg-gray-900 p-6">
        <div className="flex items-center space-x-4">
          <img src={logo.src} alt="Inaash Logo" className="h-12 w-12" />
          <h2 className="text-xl font-bold text-primary">حصلت على %100</h2>
        </div>
        <p className="mt-2 text-gray-400">برنامج التوعية التفاعلية للطوارئ الصحية</p>
        <div className="mt-4 flex items-center justify-between">
          <Button as="a" href="#" variant="flat" className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            شارك النتيجة
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="light">
              <img className="size-6" src={twitter.src} alt="share to x" />
            </Button>
            <Button variant="light">
              <img className="size-6" src={linkedin.src} alt="share to linkedin" />
            </Button>
          </div>
        </div>
      </Card>
      <Divider />
      <div className="mt-4 flex flex-col items-center space-x-4 text-xl">
        <p>شارك إنعاش مع الآخرين</p>
        <div className="flex gap-4"></div>
        <Button>
          <img className="size-6" src={whatsapp.src} alt="share to whatsapp" />
        </Button>
        <Button>
          <img className="size-6" src={gmail.src} alt="share to gmail" />
        </Button>
      </div>
    </div>
  )
}

export default ShareSuccess
