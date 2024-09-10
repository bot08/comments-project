// server/api/comments/[site_code].ts
import connectToDatabase from '~/server/utils/db';
import Comment, { IComment } from '~/server/models/Comment';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  await connectToDatabase();
  
  const { site_code } = event.context.params;
  
  const comments: IComment[] = await Comment.find({ site_code });
  
  return comments;
});
