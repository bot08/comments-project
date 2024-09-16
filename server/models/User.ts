import mongoose, {Schema, Document, Model} from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'moderator' | 'owner' | 'admin';
  isActive: boolean;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      'moderator', // Site moderator.
      'owner', // Site owner.
      'admin', // Admin.
    ],
    default: 'owner',
  },
  isActive: { // User is active or not.
    type: Boolean,
    default: true,
  },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);