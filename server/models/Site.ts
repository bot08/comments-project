import mongoose, {Document, Model, Schema} from "mongoose";
import {IUser} from "~/server/models/User";

export interface ISite extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  url: string;
  owner: IUser;
  moderators: Array<IUser>;
}

const SiteSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moderators: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  }
});

export const Site: Model<ISite> = mongoose.model<ISite>('Site', SiteSchema);