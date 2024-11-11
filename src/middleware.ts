import createMiddleware from "next-intl/middleware"

import { routing } from "./lib/i18n/navigation"
import { LOCALES } from "./config"

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(${LOCALES.join('|')})/:path*`],
}
