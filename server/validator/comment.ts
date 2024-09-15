import {z} from "zod";

export const CreateCommentSchema = z.object({
    name: z.string().min(3),
    content: z.string(),
    branch: z.string().url(),
});