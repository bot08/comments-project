import {IUser} from "~/server/models/User";
import jwt from "jsonwebtoken";

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
    return jwt.verify(token, runtimeConfig.jwtSecret) as { userId: string };
}