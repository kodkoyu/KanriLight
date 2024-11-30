import { Model, Document, HydratedDocument } from 'mongoose';

export class WriteRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  async createMany(data: Partial<T>[]): Promise<HydratedDocument<T>[]> {
    return this.model.insertMany(data) as Promise<HydratedDocument<T>[]>;
  }

  async update(id: string, data: Partial<T>): Promise<HydratedDocument<T> | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}