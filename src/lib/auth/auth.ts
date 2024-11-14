import InaashApi from "@/services/inaash"
import { User as ApiUserType, LoginResponse } from "@/services/types/login"
import type { DefaultSession, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ApiUserType & { token: string } & DefaultSession["user"]
  }

  interface User extends ApiUserType {
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends ApiUserType {
    token: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},

      // @ts-ignore
      async authorize(credentials, req) {
        const { phonenumber, country_code, otp } = credentials as {
          phonenumber: string
          country_code: string
          otp: string
        }
        const response = await InaashApi.post<LoginResponse>("/user/otpVerify", {
          phonenumber,

          otp,
        })

        const user = { ...response.data.data.item, token: response.data.data.token }

        // If no error and we have user data, return it
        if (user) {
          return { ...user }
        }
        if (!user) return null
      },
    }),
  ],
  callbacks: {
    async jwt({ trigger, token, user }) {
      // if (trigger === "update") {
      //   try {
      //     const me = await getMe()
      //     token.user = me.data.data.user
      //     return token
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
}
