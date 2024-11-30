import { Schema, model, Document, HydratedDocument } from 'mongoose';
import { BaseEntity } from './base.entity';

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

export type UserDocument = HydratedDocument<User>;

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = model<UserDocument>('User', UserSchema);