import {connectToDatabase} from '~/server/utils/db';
import {H3Event, defineEventHandler} from 'h3';
import {authorize} from "~/server/utils/token";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const user = await authorize(event.headers);

    // Return user.
    return {
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role
        },
    };
});