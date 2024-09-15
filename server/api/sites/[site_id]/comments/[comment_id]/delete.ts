import {connectToDatabase} from '~/server/utils/db';
import {Comment} from '~/server/models/Comment';
import {H3Event} from 'h3';
import {Site} from "~/server/models/Site";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const user = await authorize(event.headers);

    // Get site id and comment id.
    const site_id = getRouterParam(event, 'site_id')
    const comment_id = getRouterParam(event, 'comment_id')

    // Check request validation.
    if (!site_id || !comment_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

    // Check if user is moderator.
    try {
        const site = await Site.findOne({
            _id: site_id,
            moderators: user,
        });

        if (!site) {
            return createError({
                statusCode: 403,
                message: 'Forbidden.',
            });
        }
    } catch (err) {
        console.error(err);

        throw createError({
            statusCode: 500,
            message: 'Internal server error.',
        });
    }

    // Delete comment.
    try {
        const comment = await Comment.findOneAndDelete({
            _id: comment_id,
            site: site_id,
        })

        if (!comment) {
            return createError({
                statusCode: 404,
                message: 'Comment not found.',
            });
        }

        // Return success message.
        return {message: 'Comment deleted successfully'};
    } catch (err) {
        console.error(err);

        throw createError({
            statusCode: 500,
            message: 'Internal server error.',
        });
    }
});
