import { CommonStatus } from '$types/enum';
import mongoose, { Schema, Document } from 'mongoose';

export interface ISponsor extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  avatar: string;
  status: CommonStatus;
  updateAt: number;
  createdAt: number;
  createdBy: number;
}

export const SponsorSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  status: { type: Number, default: CommonStatus.ACTIVE, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  updateAt: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
});

SponsorSchema.pre('save', function (next) {
  (this as any).updateAt = Date.now();
  next();
});

export const SponsorModel = mongoose.model<ISponsor>('Sponsor', SponsorSchema);
