// server/api/users/update.ts
import connectToDatabase from '~/server/utils/db';
import {User} from '~/server/models/User';
import { H3Event, defineEventHandler, readBody, createError } from 'h3';
import {parseToken} from "~/server/utils/token";

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();

  const authHeader = event.headers.get('Authorization');
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Authorization header is missing.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw createError({ statusCode: 401, message: 'Token is missing.' });
  }

  const decoded = parseToken(token);

  const { name, email, site_code, isActive, role } = await readBody(event);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found.' });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (site_code) user.site_code = site_code;
  if (typeof isActive === 'boolean') user.isActive = isActive;
  if (role && (role === 'user' || role === 'admin')) user.role = role;

  await user.save();

  return { message: 'User updated successfully' };
});