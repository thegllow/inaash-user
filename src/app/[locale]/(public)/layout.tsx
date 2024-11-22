import Header from "@/components/common/header"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">{children}</main>
    </div>
  )
}
