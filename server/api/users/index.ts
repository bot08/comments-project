import { connectToDatabase } from '~/server/utils/db';
import { H3Event, defineEventHandler, createError } from 'h3';
import { authorize } from "~/server/utils/token";

import {User} from "~/server/models/User";
import {getPaginate} from "~/server/utils/paginate";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    await authorize(event.headers);

    // Get paginate opts.
    const {data, success, error} = getPaginate(event)

    // Check request validation.
    if (!success) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
            data: {
                errors: error?.issues,
            }
        });
    }

    try {
        // Find users.
        const users = await User.find()
            .limit(data.limit)
            .skip(data.limit * (data.page - 1))
            .select({password: 0});

        // Return success response.
        return {
            data: users,
        };

    } catch (err) {
        console.error(err)

        throw createError({
            statusCode: 500,
            message: 'Failed to fetch users.',
        });
    }
});