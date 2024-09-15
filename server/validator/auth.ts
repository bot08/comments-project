import { z } from 'zod'

export const RegisterRequestSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(32),
})

export const LoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
})