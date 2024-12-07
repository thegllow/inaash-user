import { auth } from "@/lib/auth/auth"
import { redirect } from "@/lib/i18n/navigation"

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string; course_id: string }
}) {
  const session = await auth()
  if (!session)
    return redirect({
      href: {
        pathname: "/login",
        query: {
          callbackUrl: `/certificate/${params.course_id}`,
        },
      },
      locale: params.locale,
    })
  return (
    <>
      <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">{children}</main>
    </>
  )
}
