import { CommonStatus } from '$types/enum';
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  avatar: string;
  description: string;
  status: CommonStatus;
  createdBy: string;
  updateAt: number;
  createdAt: number;
  postCount: number;
}

export const CategorySchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  description: { type: String },
  status: { type: Number, default: CommonStatus.ACTIVE, required: true },
  updateAt: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  postCount: { type: Number, default: 0 },
});

CategorySchema.pre('save', function (next) {
  (this as any).updateAt = Date.now();
  next();
});

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
