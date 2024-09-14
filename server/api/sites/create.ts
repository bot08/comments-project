import { connectToDatabase } from '~/server/utils/db';
import {H3Event, defineEventHandler, readValidatedBody, createError} from 'h3';
import { authorize } from "~/server/utils/token";
import {CreateSiteSchema} from "~/server/validator/sites";
import {Site} from "~/server/models/Site";
import mongoose from "mongoose";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Authorize user.
    const user = await authorize(event.headers);

    // Read body.
    const { data, success, error } = await readValidatedBody(event, body => CreateSiteSchema.safeParse(body));

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

    // Create new site.
    const site = new Site({
        id: new mongoose.Types.ObjectId(),
        name: data.name,
        url: data.url,
        owner: user._id,
    });

    // Save site.
    try {
        await site.save();
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Failed to create site.',
        });
    }

    // Return success response.
    return {
        message: 'Site created successfully'
    };
});