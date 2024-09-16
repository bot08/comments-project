import {connectToDatabase} from '~/server/utils/db';
import {Comment, IComment} from '~/server/models/Comment';
import {H3Event} from 'h3';
import mongoose from 'mongoose';
import {CreateCommentSchema} from "~/server/validator/comment";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Get site id.
    const site_id = getRouterParam(event, 'site_id')

    // Check request validation.
    if (!site_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

    const {data, success, error} = await readValidatedBody(event, body => CreateCommentSchema.safeParse(body));

    if (!success) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
            data: {
                errors: error?.issues,
            },
        });
    }

    const newComment: IComment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        name: data.name,
        content: data.content,
        site: site_id,
        branch: data.branch,
    });

    // Save comment.
    try {
        await newComment.save();

        return {
            message: 'Comment added successfully',
        };
    } catch (err) {
        console.error(err);

        throw createError({
            statusCode: 500,
            message: 'Internal server error.',
        });
    }
});
