import { z } from "zod"

const phoneNumberSchema = z
  .string({ required_error: "required" })
  .min(1, { message: "required" })
  .regex(/^\+?[0-9]{7,15}$/, "invalidPhoneNumber")

export default phoneNumberSchema
