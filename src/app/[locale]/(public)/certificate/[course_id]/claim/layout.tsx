import Stepper from "./components/stepper"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stepper />
      {children}
    </>
  )
}
