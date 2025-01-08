"use client"
import { Link } from "@/lib/i18n/navigation"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { UserCircle2 } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { parseAsBoolean, useQueryState } from "nuqs"
import ChangeLanguage from "./change-language"

type Props = {}
export function UserDropdown() {
  const t = useTranslations("profile.dropdown")

  const [_, seChangeLang] = useQueryState("change_lang", parseAsBoolean.withDefault(false))
  const handleChangeLang = () => {
    seChangeLang(true)
  }

  return (
    <div className="flex items-center lg:gap-4">
      <Dropdown radius="sm" className="relative z-10" placement="bottom-start">
        <DropdownTrigger>
          <Button radius="full" variant="light" isIconOnly color={"primary"} aria-label="user">
            <UserCircle2 />
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="text-foreground" aria-label="User Actions" variant="flat">
          <DropdownItem as={Link} href={"/profile"} key="profile">
            {t("profile")}
          </DropdownItem>
          <DropdownItem key="lang" onClick={handleChangeLang}>
            {t("change-lang")}
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              signOut()
            }}
            key="signout"
            className="text-danger"
            color="danger">
            {t("logout")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ChangeLanguage />
    </div>
  )
}

const UserButton = (props: Props) => {
  const clientSession = useSession()
  const isAuthenticated = clientSession.status === "authenticated"

  if (isAuthenticated) return <UserDropdown />
  return (
    <Button
      as={Link}
      radius="full"
      href={"/login"}
      variant="light"
      isIconOnly
      color={"default"}
      aria-label="user">
      <UserCircle2 />
    </Button>
  )
}

export default UserButton
