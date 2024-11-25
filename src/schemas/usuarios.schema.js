import { z } from "zod";

export const createUserSchema = z.object({
  fullname: z
    .string({
      message: "Fullname must be a string",
    })
    .min(3, {
      message: "Fullname must be at least 3 characters",
    })
    .max(100, {
      message: "Fullname must be at most 100 characters",
    }),

  email: z
    .string({
      message: "Email must be a string",
    })
    .email({
      message: "Email must be a valid email",
    })
    .max(100, {
      message: "Email must be at most 100 characters",
    }),

  password: z
    .string({
      message: "Password must be a string",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(64, {
      message: "Password must be at most 64 characters",
    }),

  role: z
    .enum(['user'], {
      message: "Role must be 'user'",
    })
    .default('user'),

});
