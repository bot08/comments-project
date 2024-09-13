import {connectToDatabase} from '~/server/utils/db';
import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';
import { H3Event, defineEventHandler, readValidatedBody, createError } from 'h3';
import { generateToken } from "~/server/utils/token";
import { LoginRequestSchema } from "~/server/validator/auth";

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();

  // Read body.
  const { data, success, error } = await readValidatedBody(event, body => LoginRequestSchema.safeParse(body));

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

  // Check if user exists.
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found.',
    });
  }

  // Check if user account is not active.
  if (!user.isActive) {
    throw createError({
      statusCode: 403,
      message: 'User account is not active.',
    });
  }

  // Compare password.
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials.',
    });
  }

  // Generate access token.
  const accessToken = generateToken(user);

  // Return success response.
  return {
      message: 'Login successful',
      data: {
        access_token: accessToken,
      },
  };
});