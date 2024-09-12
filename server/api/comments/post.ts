// server/api/comments/register.ts
import connectToDatabase from '~/server/utils/db';
import Comment, { IComment } from '~/server/models/Comment';
import { H3Event } from 'h3';
import mongoose from 'mongoose';

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();
  
  const { name, comment, rating, tree, site_code } = await readBody(event);

  if (!name || !comment || !tree || !site_code) {
    throw createError({ statusCode: 400, message: 'User ID, name, comment, and site code are required.' });
  }
  
  const newComment: IComment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    name,
    comment,
    rating,
    tree,
    site_code
  });
  
  await newComment.save();
  
  return { message: 'Comment added successfully' };
});
