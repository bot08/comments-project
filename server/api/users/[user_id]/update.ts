import {connectToDatabase} from '~/server/utils/db';
import {H3Event, defineEventHandler, createError} from 'h3';
import {authorize} from "~/server/utils/token";
import {User} from "~/server/models/User";
import {UpdateUserByAdminSchema} from "~/server/validator/user";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const currentUser = await authorize(event.headers);

    // Get user id.
    const user_id = getRouterParam(event, 'user_id');

    // Check request validation.
    if (!user_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

    // Check if user is admin.
    if (currentUser.role !== 'admin') {
        throw createError({
            statusCode: 403,
            message: 'Forbidden.',
        });
    }

    // Get body data.
    const {data, success, error} = await readValidatedBody(event, body => UpdateUserByAdminSchema.safeParse(body));

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

    try {
        // Find user.
        const user = await User.findOne({_id: user_id});

        if (!user) {
            return createError({
                statusCode: 404,
                message: 'User not found.',
            });
        }

        let changes = 0

        if (!!data.isActive && user.isActive !== data.isActive) {
            changes++;
            user.isActive = data.isActive;
        }

        if (!!data.role && user.role !== data.role) {
            changes++;
            user.role = data.role;
        }

        if (!!data.name && user.name !== data.name) {
            changes++;
            user.name = data.name;
        }

        if (changes === 0) {
            // Return no changes response.
            return {
                message: 'No changes made.',
            };
        }

        // Save user.
        await user.save();

        // Return success response.
        return {
            message: 'User updated successfully',
        };

    } catch (err) {
        console.error(err);

        throw createError({
            statusCode: 500,
            message: 'Internal server error.',
        });
    }
});