import { HTMLAttributes } from "react"
import { AnswerStatus } from "../store/course-store"
import { cn } from "@/lib/cn"
import { motion } from "framer-motion"
import { GreenHeart, RedHeart } from "./icons"

const Answer: React.FC<
  HTMLAttributes<HTMLDivElement> & {
    answer: string
    isLoading: boolean
    status: AnswerStatus
  }
> = ({ answer, className, children, isLoading, status, ...props }) => {
  return (
    answer && (
      <div
        className={cn(
          "text-light relative w-full cursor-pointer rounded-md bg-[#292929] p-5 text-center text-xs/relaxed font-normal text-white hover:bg-[#363636e8]",
          isLoading ? "pointer-events-none opacity-60" : "",
          status === "correct" ? "!bg-[#1AD14545]" : "",
          status === "wrong" ? "!bg-[#F322613B]" : "",
        )}
        {...props}>
        {answer}
        {status === "correct" && (
          <motion.div
            className="absolute end-0 top-0"
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: -40,
            }}>
            <GreenHeart />
          </motion.div>
        )}
        {status === "wrong" && (
          <motion.div
            className="absolute end-0 top-0"
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: 1,
              y: -40,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
            }}>
            <RedHeart />
          </motion.div>
        )}
      </div>
    )
  )
}

export default Answer
