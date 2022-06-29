import { CommonStatus } from '$types/enum';
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  _id: Schema.Types.ObjectId | string;
  category: Schema.Types.ObjectId | string;
  name: string;
  avatar: string;
  location: string;
  area: string;
  design: string;
  year: string;
  description: string;
  status: CommonStatus;
  updateAt: number;
  createdAt: number;
  payload: { [key: string]: any };
  images: { priority: number; url: string }[];
  createdBy: number;
}

export const PostSchema = new Schema({
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  name: { type: String },
  isDefault: { type: Number, default: CommonStatus.INACTIVE, required: false },
  avatar: { type: String },
  location: { type: String },
  area: { type: String },
  design: { type: String },
  year: { type: String },
  description: { type: String },
  status: { type: Number, default: CommonStatus.ACTIVE, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  updateAt: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
  payload: { type: mongoose.Schema.Types.Mixed },
  images: [{ priority: { type: Number, default: 0 }, url: { type: String, required: true } }],
  videos: [{ url: { type: String, required: false } }],
});

PostSchema.pre('save', function (next) {
  (this as any).updateAt = Date.now();
  next();
});

export const PostModel = mongoose.model<IPost>('Post', PostSchema);
