import { Model, Document } from 'mongoose';

export abstract class ReadRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findAll(filter: object = {}, page: number = 1, pageSize: number = 10): Promise<T[]> {
    const skip = (page - 1) * pageSize;
    return this.model.find(filter).skip(skip).limit(pageSize).exec();
  }

  async findOne(filter: object): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async count(filter: object = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async exists(filter: object = {}): Promise<boolean> {
    const result = await this.model.exists(filter).exec();
    return result !== null;
  }
}