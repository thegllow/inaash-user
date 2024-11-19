import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type ErrorResponse<T> = {
  message: string
  errors?: {
    [key in keyof T]?: string[]
  }
}
