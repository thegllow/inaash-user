import { getLocaleFromUrl } from "@/utils/get-locale"
import axios from "axios"
import { type Session } from "next-auth"
import { getSession } from "next-auth/react"
import { getLocale } from "next-intl/server"

const baseURL = "https://api.inaash.edu.sa"

// Create an Axios instance
const InaashApi = axios.create({
  baseURL: baseURL,
})
// Create an Axios instance
export const InaashApiGuest = axios.create({
  baseURL: baseURL + "/guest",
})

// Add a request interceptor to include the authentication token
InaashApi.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.baseURL, config.url, config.data)
    let session: null | Session = null
    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-language"] = locale

      // Server-side
      const { auth } = await import("@/lib/auth/auth")
      session = await auth()
    } else {
      // Client-side
      session = await getSession()
      const locale = getLocaleFromUrl()
      // if (!config.data.headers["Accept-language"]) {
      config.headers["Accept-language"] = locale
      // }
    }

    if (session && session?.user?.token) {
      config.headers["Authorization"] = `Bearer ${session.user.token}`
    }

    return config
  },
  async (error) => {
    return Promise.reject(error)
  },
)

// Add a request interceptor to include the authentication token
InaashApiGuest.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.baseURL, config.url, config.data)
    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-language"] = locale
    } else {
      const locale = getLocaleFromUrl()
      // if (!config.data.headers["Accept-language"]) {
      config.headers["Accept-language"] = locale
      // }
    }

    return config
  },
  async (error) => {
    // Do something with request error

    return Promise.reject(error)
  },
)

export default InaashApi
