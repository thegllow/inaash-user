import InaashApi from "@/services/inaash"
import axios from "axios"
import type { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import NextAuth from "next-auth"

import { User as ApiUserType, LoginResponse } from "@/types/login"
import { ErrorResponse } from "@/types"
import { UserResponse } from "@/app/[locale]/(public)/profile/types"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ApiUserType & { token: string } & DefaultSession["user"]
  }

  interface User extends ApiUserType {
    token: string
    timeout_audio: string
  }
}

// declare module "next-auth/jwt" {
//   interface JWT extends ApiUserType {
//     token: string
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      // @ts-ignore
      async authorize(credentials, req) {
        console.log("🚀 ~ authorize ~ credentials:", credentials)
        const { mobile, otp } = credentials as {
          mobile: string
          otp: string
        }
        try {
          const response = await InaashApi.post<LoginResponse>("/guest/user/otpVerify", {
            mobile,
            otp,
          })
          const user = {
            ...response.data.data.item,
            token: response.data.data.token,
            timeout_audio: response.data.data.timeout_audio,
          }
          if (user) {
            return { ...user }
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.data) {
            const responseError = error.response.data as ErrorResponse<{}>
            return {
              error: responseError.message,
            }
          }
        }

        // If no error and we have user data, return it
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if ((user as any)?.error) {
        throw new Error((user as any).error)
      }
      return true
    },
    async jwt({ trigger, token, user, session }) {
      // console.log("🚀 ~ jwt ~ user:", user)
      // console.log("🚀 ~ jwt ~ token:", token)
      // console.log("🚀 ~ jwt ~ trigger:", trigger)
      // console.log("🚀 ~ jwt ~ session:", session)
      // if (trigger === "update" && session.id) {
      //   try {
      //     const response = await InaashApi.get<UserResponse>(`/user/users/${session.id}`)
      //     console.log({ ...response.data.data.item, ...token })
      //     return { ...response.data.data.item, ...token }
      //   } catch (error) {
      //     return { ...user, ...token }
      //   }
      // }

      return { ...user, ...token }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },

  session: {
    strategy: "jwt",
  },
  trustHost: true,
})
