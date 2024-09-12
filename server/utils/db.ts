import mongoose from 'mongoose';

const runtimeConfig = useRuntimeConfig();

let connection: mongoose.Mongoose | null = null

async function connectToDatabase(): Promise<mongoose.Mongoose> {
    if (connection) {
        return connection
    }

    // TODO: Handle connection error.
    connection = await mongoose.connect(runtimeConfig.mongodbUri)

    return connection!;
}

export default connectToDatabase;