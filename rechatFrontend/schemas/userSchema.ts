import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type UserType = z.infer<typeof userSchema>;

export const loginUserSchema = z.object({
  //   name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type loginUserType = z.infer<typeof userSchema>;
