import {IUser, User} from "~/server/models/User";
import jwt from "jsonwebtoken";
import {createError} from "h3";

const runtimeConfig = useRuntimeConfig();

/**
 * Generates a JSON Web Token from a user, with an expiration time of 1 day.
 *
 * @param {IUser} user - The user to generate the token for.
 * @param {jwt.SignOptions} [opts] - Additional options to sign the token with.
 * @returns {string} The generated token.
 */
export const generateToken = (user: IUser, opts?: jwt.SignOptions): string => {
    return jwt.sign(
{ userId: user._id },
        runtimeConfig.jwtSecret,
        {
            expiresIn: '1d',
            ...opts,
        },
    );
}

/**
 * Parses a JSON Web Token and returns its contents.
 *
 * @param {string} token - The JSON Web Token to parse.
 * @returns {{ userId: string }} The contents of the token.
 */
export const parseToken = (token: string) => {
    try {
        return jwt.verify(token, runtimeConfig.jwtSecret) as { userId: string };
    } catch (err) {
        // Errors: https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#errors--codes

        throw createError({
            statusCode: 401,
            message: 'Invalid token.',
        });
    }
}

export const authorize = async (headers: Headers): Promise<IUser> => {
    const authHeader = headers.get('Authorization');
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Authorization header is missing.' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        throw createError({ statusCode: 403, message: 'Forbidden.' });
    }

    const decoded = parseToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
        throw createError({ statusCode: 403, message: 'Forbidden.' });
    }

    return user;
}