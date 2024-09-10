// server/api/users/login.ts
import connectToDatabase from '~/server/utils/db';
import User from '~/server/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { H3Event, defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();

  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found.' });
  }

  if (!user.isActive) {
    throw createError({ statusCode: 403, message: 'User account is not active.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1d' }
  );

  user.auth_token = token;
  await user.save();

  return { message: 'Login successful', token };
});