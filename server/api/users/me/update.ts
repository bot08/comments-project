import {connectToDatabase} from '~/server/utils/db';
import {H3Event, defineEventHandler, createError} from 'h3';
import {authorize} from "~/server/utils/token";
import {UpdateUserSchema} from "~/server/validator/user";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const user = await authorize(event.headers);

    // Get user id.
    const user_id = getRouterParam(event, 'user_id');

    // Check request validation.
    if (!user_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

    // Get body data.
    const {data, success, error} = await readValidatedBody(event, body => UpdateUserSchema.safeParse(body));

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

    // Compare password.
    const isPasswordValid = await bcrypt.compare(data.current_password, user.password);
    if (!isPasswordValid) {
        throw createError({
            statusCode: 401,
            message: 'Invalid credentials.',
        });
    }

    let changes = 0

    if (!!data.password) {
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            changes++;
            user.password = await bcrypt.hash(data.password, 10);
        }
    }

    if (!!data.email && user.email !== data.email) {
        changes++;
        user.email = data.email;
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

    try {
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