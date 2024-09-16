import {z} from 'zod'

export const paginateSchema = z.object({
    page: z.number().min(1),
    limit: z.number().min(1).max(50),
})