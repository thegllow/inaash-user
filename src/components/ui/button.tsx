import React from "react"
import { ButtonProps, Button as NextUiButton } from "@nextui-org/button"

import { cn } from "@/lib/cn"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Comp({ className, ...props }, ref) {
  return (
    <NextUiButton
      size="lg"
      fullWidth
      radius="md"
      color="primary"
      className={cn("font-semibold text-black", className)}
      {...props}
      ref={ref}
    />
  )
})

export default Button
