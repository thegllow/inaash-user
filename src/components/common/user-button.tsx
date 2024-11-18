"use client"
import { Link } from "@/lib/i18n/navigation"
import { Button } from "@nextui-org/button"
import { UserCircle2 } from "lucide-react"
import { useSession } from "next-auth/react"

type Props = {}

const UserButton = (props: Props) => {
  const clientSession = useSession()
  if (clientSession.status === "authenticated") {
    return (
      <Button
        as={Link}
        radius="full"
        href="/profile"
        variant="light"
        isIconOnly
        color="primary"
        aria-label="user">
        <UserCircle2 />
      </Button>
    )
  }
}

export default UserButton
