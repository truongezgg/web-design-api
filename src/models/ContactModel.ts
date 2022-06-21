import { CommonStatus, ContactState } from '$types/enum';
import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  _id: Schema.Types.ObjectId | string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  status: CommonStatus;
  state: ContactState;
  updateAt: number;
  createdAt: number;
}

export const ContactSchema = new Schema({
  name: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  description: { type: String },
  status: { type: Number, default: CommonStatus.ACTIVE, required: true },
  state: { type: Number, default: ContactState.PENDING, required: true },
  updateAt: { type: Number, default: Date.now },
  createdAt: { type: Number, default: Date.now },
});

ContactSchema.pre('save', function (next) {
  (this as any).updateAt = Date.now();
  next();
});

export const ContactModel = mongoose.model<IContact>('Contact', ContactSchema);
