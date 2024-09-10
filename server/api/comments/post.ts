// server/api/comments/post.ts
import connectToDatabase from '~/server/utils/db';
import Comment, { IComment } from '~/server/models/Comment';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();
  
  const { user_id, name, comment, rating, parent_id, site_code } = await readBody(event);

  if (!user_id || !name || !comment || !site_code) {
    throw createError({ statusCode: 400, message: 'User ID, name, comment, and site code are required.' });
  }
  
  const newComment: IComment = new Comment({
    user_id,
    name,
    comment,
    rating,
    parent_id,
    site_code
  });
  
  await newComment.save();
  
  return { message: 'Comment added successfully' };
});
