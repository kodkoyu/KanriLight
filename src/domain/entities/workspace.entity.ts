import { Schema, model, Document } from 'mongoose';
import { BaseEntity } from './base.entity';

export interface Workspace extends BaseEntity {
  name: string;
  ownerId: string;
  members: string[];
}

const WorkspaceSchema = new Schema<Workspace>({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const WorkspaceModel = model<Workspace>('Workspace', WorkspaceSchema);