import { useEffect, useState } from "react"

const useForceLandscape = (): boolean => {
  const [isLandscape, setIsLandscape] = useState<boolean>(true)

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    // Check initial orientation
    handleResize()

    // Add event listener for resizing
    window.addEventListener("resize", handleResize)

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isLandscape
}

export default useForceLandscape
