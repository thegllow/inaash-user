import React, { memo, useCallback, useEffect, useState } from "react"
import { Chip } from "@nextui-org/chip"
import { Timer } from "lucide-react"
import ReactCountdown, { CountdownRendererFn, zeroPad } from "react-countdown"

type Props = {
  date: number
  result: React.ReactNode
}

const Countdown = ({ date, result }: Props) => {
  const renderer: CountdownRendererFn = useCallback(
    ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return result
      } else {
        // Render a countdown
        return (
          <Chip className="rounded-lg" size="lg" color="primary" variant="bordered">
            <div className="flex items-center gap-3">
              <Timer className="size-5" strokeWidth={1.4} />
              <span>{zeroPad(seconds)}</span>
            </div>
          </Chip>
        )
      }
    },
    [result],
  )

  const [server, setServer] = useState(true)
  useEffect(() => {
    if (typeof window !== "undefined") setServer(false)
  }, [])
  if (server) return null
  return (
    <div dir="ltr" className="flex items-center justify-center">
      <ReactCountdown date={date} renderer={renderer} />
    </div>
  )
}

export default memo(Countdown)
