import React, { memo, useCallback, useEffect, useState } from "react"
import { Chip } from "@nextui-org/chip"
import { Timer } from "lucide-react"
import ReactCountdown, { CountdownRendererFn, zeroPad } from "react-countdown"
import { cn } from "@/lib/cn"

type Props = {
  date: number
  result: React.ReactNode
  alert?: boolean
  onComplete?: () => void
  className?: string
}

const Countdown = ({ date, result, alert, onComplete, className }: Props) => {
  const renderer: CountdownRendererFn = useCallback(
    ({ seconds, minutes, completed }) => {
      if (completed) {
        // Render a completed state
        onComplete?.()
        return result
      } else {
        // Render a countdown
        const timeInSec = seconds + minutes * 60
        return (
          <Chip
            className={cn("rounded-lg border-1.5", className)}
            size="lg"
            color={alert ? (timeInSec <= 10 ? "danger" : "primary") : "primary"}
            variant="bordered">
            <div className="flex items-center gap-3">
              <Timer className="size-5" strokeWidth={1.4} />
              <span>{zeroPad(timeInSec)}</span>
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
