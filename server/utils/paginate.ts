import {H3Event} from "h3";
import {paginateSchema} from "~/server/validator/paginate";
import {QueryValue} from "ufo";

const takeQuery = (val : QueryValue | QueryValue[], fallback: string = '0') => {
    if (Array.isArray(val)) {
        return val[0];
    } else if (typeof val === 'string') {
        return val;
    }

    return fallback;
}

export const getPaginate = (event: H3Event) => {
    const query = getQuery(event);

    return paginateSchema.safeParse({
        page: parseInt(takeQuery(query.page, '1'), 10),
        limit: parseInt(takeQuery(query.limit, '2'), 10),
    })
}