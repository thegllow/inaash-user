import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"
import InaashApi from "@/services/inaash"
import { UserResponse } from "../types"
import { UserProvider } from "./context/user-context"

export default async function Layout(
  props: {
    children: React.ReactNode
    params: Promise<{
      user_id: string
      locale: string
    }>
  }
) {
  const params = await props.params;

  const {
    user_id,
    locale
  } = params;

  const {
    children
  } = props;

  const session = await auth()
  if (!session || session.user.id != user_id) redirect({ href: "/login", locale })

  const response = await InaashApi.get<UserResponse>(`/user/users/${user_id}`)
  const user = response.data.data.item
  return (
    <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
      <UserProvider user={user}>{children}</UserProvider>
    </section>
  )
}
