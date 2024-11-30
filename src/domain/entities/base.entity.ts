import { Schema, Types } from 'mongoose';

export abstract class BaseEntity {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this._id = new Types.ObjectId();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}