import { CommonStatus } from '$types/enum';
import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  avatar: string;
  description: string;
  status: CommonStatus;
  updateAt: number;
  createdAt: number;
  createdBy: number;
}

export const AboutSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  description: { type: String },
  status: { type: Number, default: CommonStatus.ACTIVE, required: true },
  updateAt: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
});

AboutSchema.pre('save', function (next) {
  this.updateAt = Date.now();
  next();
});

export const AboutModel = mongoose.model<IAbout>('About', AboutSchema);
