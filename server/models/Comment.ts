// server/models/Comment.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
  user_id: mongoose.Schema.Types.ObjectId;
  name: string;
  comment: string;
  rating?: number;
  parent_id?: mongoose.Schema.Types.ObjectId;
  site_code: string;
  created_at: Date;
}

const CommentSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, default: null },
  parent_id: { type: Schema.Types.ObjectId, default: null },
  site_code: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;
