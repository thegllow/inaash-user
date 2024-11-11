import { LOCALES } from "@/config"
import { createNavigation } from "next-intl/navigation"

import {defineRouting} from 'next-intl/routing';
export const localePrefix = "always" // Default

export const routing = defineRouting({
  locales: LOCALES,
 
  defaultLocale: LOCALES[0],
  localePrefix:"always"
});
export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales:LOCALES, localePrefix })
