// server/api/users/post.ts
import connectToDatabase from '~/server/utils/db';
import User, { IUser } from '~/server/models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { H3Event, defineEventHandler, readBody, createError } from 'h3';

const generateAuthToken = (user: IUser): string => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1d' }
  );
};

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();

  // Чтение тела запроса
  const { name, email, password, site_code } = await readBody(event);

  // Проверка обязательных полей
  if (!name || !email || !password || !site_code) {
    throw createError({ statusCode: 400, message: 'All fields are required.' });
  }

  // Проверка существующего пользователя
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError({ statusCode: 400, message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password: hashedPassword,
    site_code,
    auth_token: '', // Временно пустое значение токена
  });

  user.auth_token = generateAuthToken(user);

  await user.save();

  return { message: 'User created successfully' };
});
