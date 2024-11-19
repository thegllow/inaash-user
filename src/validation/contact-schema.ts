import { z } from "zod"

export const contactSchema = z.object({
  type: z.enum(["inquiry", "complaint", "suggestion"]),
  email: z.string({ required_error: "required" }).min(1, "required").email({ message: "invalidEmail" }),
  name: z.string({ required_error: "required" }).min(1, "required"),
  message: z.string({ required_error: "required" }).min(1, "required"),
  subject: z.string({ required_error: "required" }).min(1, "required"),
})
