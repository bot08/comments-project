import {z} from 'zod';

export const CreateSiteSchema = z.object({
    name: z.string().min(3),
    url: z.string().url(),
});

export const AddModeratorSchema = z.object({
    id: z.string(),
})


export const RemoveModeratorSchema = z.object({
    id: z.string(),
})