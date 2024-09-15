import { z } from 'zod'

export const UpdateUserByAdminSchema = z.object({
    name: z.string().min(3).optional(),
    isActive: z.boolean().optional(),
    role: z.enum(['owner', 'admin']).optional(),
});

export const UpdateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(32).optional(),
    current_password: z.string().min(6).max(32),
});