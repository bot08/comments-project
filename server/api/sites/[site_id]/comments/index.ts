import { connectToDatabase } from '~/server/utils/db';
import { H3Event, defineEventHandler, createError } from 'h3';
import {getPaginate} from "~/server/utils/paginate";
import {Comment} from "~/server/models/Comment";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    const site_id = getRouterParam(event, 'site_id')

    // Check request validation.
    if (!site_id) {
        throw createError({
            statusCode: 400,
            message: 'Bad request.',
        });
    }

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

    const filters : any = {
        site: site_id,
    }

    const query = getQuery(event)

    if (query.branch) {
        if (Array.isArray(query.branch)) {
            filters.branch = query.branch[0]
        } else {
            filters.branch = query.branch
        }
    }

    try {
        // Find comments.
        const sites = await Comment.find(filters)
            .limit(data.limit)
            .skip(data.limit * (data.page - 1))

        return {
            data: sites
        }

    } catch (err) {
        console.error(err)

        throw createError({
            statusCode: 500,
            message: 'Failed to fetch comments.',
        });
    }
});