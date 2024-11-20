import { z } from "zod"

export const updateProfileSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .trim()
    .min(1, "required")
    .email({ message: "invalidEmail" }),
  first_name: z.string({ required_error: "required" }).trim().min(1, "required"),
  last_name: z.string({ required_error: "required" }).trim().min(1, "required"),
})
