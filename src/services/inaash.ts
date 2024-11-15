import axios from "axios"
import { type Session } from "next-auth"
import { getSession } from "next-auth/react"

const baseURL = "https://api-inaash.glow-host.com"

// Create an Axios instance
const InaashApi = axios.create({
  baseURL: baseURL,
})

// Add a request interceptor to include the authentication token
InaashApi.interceptors.request.use(
  async (config) => {
    let session: null | Session = null
    if (typeof window === "undefined") {
      // Server-side
      const { getServerSession } = await import("next-auth")
      const { authOptions } = await import("@/lib/auth/auth")
      session = await getServerSession(authOptions)
    } else {
      // Client-side
      session = await getSession()
    }

    if (session && session?.user?.token) {
      config.headers["Authorization"] = `Bearer ${session.user.token}`
    }

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default InaashApi
