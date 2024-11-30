import { Schema, model, Document } from 'mongoose';
import { BaseEntity } from './base.entity';

export enum BlockType {
    TEXT = 'text',
    LIST = 'list',
    IMAGE = 'image',
    VIDEO = 'video',
    CODE = 'code',
}

export interface Block extends BaseEntity {
    pageId: string;
    type: BlockType;
    content: any;
    order: number;
}

const BlockSchema = new Schema<Block>({
    pageId: { type: String, required: true },
    type: { type: String, enum: Object.values(BlockType), required: true },
    content: { type: Schema.Types.Mixed },
    order: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const BlockModel = model<Block>('Block', BlockSchema);