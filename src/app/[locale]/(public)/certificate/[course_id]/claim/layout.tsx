import Stepper from "./components/stepper"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stepper />
      <section className="relative flex h-full items-center justify-center gap-4 ~/md:~py-8/10">
        {children}
      </section>
    </>
  )
}
