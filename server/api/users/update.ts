import {connectToDatabase} from '~/server/utils/db';
import { H3Event, defineEventHandler, readBody, createError } from 'h3';
import {authorize} from "~/server/utils/token";

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();

  const { name, email, site_code, isActive, role } = await readBody(event);

  const user = await authorize(event.headers);

  if (name) user.name = name;
  if (email) user.email = email;
  if (site_code) user.site_code = site_code;
  if (typeof isActive === 'boolean') user.isActive = isActive;
  if (role && (role === 'user' || role === 'admin')) user.role = role;

  await user.save();

  return { message: 'User updated successfully' };
});