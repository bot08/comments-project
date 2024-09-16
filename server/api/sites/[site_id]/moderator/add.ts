import {connectToDatabase} from '~/server/utils/db';
import {H3Event, defineEventHandler, readValidatedBody, createError} from 'h3';
import {authorize} from "~/server/utils/token";
import {AddModeratorSchema} from "~/server/validator/sites";
import {Site} from "~/server/models/Site";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const user = await authorize(event.headers);

    // Get site_id.
    const site_id = getRouterParam(event, 'site_id')

    // Check site_id.
    if (!site_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

    // Read body.
    const {data, success, error} = await readValidatedBody(event, body => AddModeratorSchema.safeParse(body));

    // Check request validation.
    if (!success) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
            data: {
                errors: error?.issues,
            },
        });
    }

    // Update site.
    try {
        const site = await Site.findOneAndUpdate(
            {
                _id: site_id,
                owner: user,
            }, {
                $addToSet: {
                    moderators: data.id
                }
            },
            {
                new: false
            },
        );

        // Check if site exists.
        if (!site) {
            return {
                statusCode: 404,
                message: 'Site not found.',
            };
        }

    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to create site.',
        });
    }

    return {
        message: 'Moderator added successfully'
    };
});