// Source: https://mongoosejs.com/docs/lambda.html#using-code%3Emongoose.connect()%3C/code%3E

import mongoose from 'mongoose';

const runtimeConfig = useRuntimeConfig();

let connection: mongoose.Mongoose | null = null

export async function connectToDatabase(): Promise<mongoose.Mongoose> {
    if (connection) {
        return connection
    }

    try {
        connection = await mongoose.connect(runtimeConfig.mongodbUri)
    } catch (err) {
        console.error(err)

        throw createError({
            statusCode: 500,
            message: 'Database connection failed.',
        })
    }

    return connection!;
}