import mongoose, { Schema, Document } from 'mongoose';

export interface IConfig extends Document {
  _id: Schema.Types.ObjectId | string;
  key: string;
  value: { [key: string]: any };
}

export const ConfigSchema = new Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
});

ConfigSchema.pre('save', function (next) {
  (this as any).updateAt = Date.now();
  next();
});

export const ConfigModel = mongoose.model<IConfig>('Config', ConfigSchema);
