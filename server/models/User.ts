// server/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  site_code: string;
  auth_token: string;
  role: 'user' | 'admin';
  isActive: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  site_code: { type: String, required: true },
  auth_token: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<IUser>('User', UserSchema);