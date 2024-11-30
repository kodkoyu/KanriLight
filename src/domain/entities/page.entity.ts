import { Schema, model, Document } from 'mongoose';
import { BaseEntity } from './base.entity';

export interface Page extends BaseEntity {
  title: string;
  workspaceId: string;
  content: string;
}

const PageSchema = new Schema<Page>({
  title: { type: String, required: true },
  workspaceId: { type: String, required: true },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PageModel = model<Page>('Page', PageSchema);