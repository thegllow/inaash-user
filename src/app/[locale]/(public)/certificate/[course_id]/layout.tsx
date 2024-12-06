export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">{children}</main>
    </>
  )
}
