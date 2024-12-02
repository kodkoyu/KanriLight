import { Schema, Types } from 'mongoose';
import { Status } from '../../shared/constants/status.enum';

export abstract class BaseEntity {
    id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    status: Status.Active | Status.Passive | Status.Deleted = Status.Active;

    constructor() {
        this.id = new Types.ObjectId();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.status = Status.Active;
    }
}