import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be 8 character long"),
});
export const userRegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4, "Name must be at least 4 characters long"),
  phoneNumber: z
    .string()
    .regex(
      /^01\d{9}$/,
      "Phone number must start with 01 and be exactly 11 digits"
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
