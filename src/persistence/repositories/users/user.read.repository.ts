import { Model } from 'mongoose';
import { ReadRepository } from '../base/read.repository';
import { UserDocument, UserModel } from '../../../domain/entities/user.entity';

export class UserReadRepository extends ReadRepository<UserDocument> {
  constructor(protected readonly model: Model<UserDocument> = UserModel) {
    super(model);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.findOne({ id });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.exists({ email });
  }
}