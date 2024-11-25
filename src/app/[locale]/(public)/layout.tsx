import Header from "@/components/common/header"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      {children}
    </div>
  )
}
