import {connectToDatabase} from '~/server/utils/db';
import {User} from '~/server/models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import {H3Event, defineEventHandler, readValidatedBody, createError} from 'h3';
import {RegisterRequestSchema} from "~/server/validator/auth";

export default defineEventHandler(async (event: H3Event) => {
    await connectToDatabase();

    // Read body.
    const {data, success, error} = await readValidatedBody(event, body => RegisterRequestSchema.safeParse(body));

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

    const {name, email, password} = data;

    // Check if user already exists.
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw createError({
            statusCode: 409,
            message: 'User already exists.',
        });
    }

    // Hash password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user.
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        password: hashedPassword,
    });

    await user.save();

    // Return success response.
    return {
        message: 'User created successfully'
    };
});
