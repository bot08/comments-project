import mongoose, {Document, Model, Schema} from 'mongoose';
import {ISite} from "~/server/models/Site";

export interface IComment extends Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    content: string;
    branch: string;
    site: ISite;
    created_at: Date;
}

const CommentSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    site: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Site',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
