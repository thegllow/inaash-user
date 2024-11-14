import React from "react"

import InaashApi from "../inaash"

type Args = {
  mobile: string
}

const PostSendOTP = async (args: Args) => {
  const response = await InaashApi.post("/guest/user/loginRegisterResendOtp", args)
  console.log("🚀 ~ PostSendOTP ~ response:", response)
}

export default PostSendOTP
