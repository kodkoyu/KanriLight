import { Model } from 'mongoose';
import { WriteRepository } from '../base/write.repository';
import { UserDocument, UserModel } from '../../../domain/entities/user.entity';

export class UserWriteRepository extends WriteRepository<UserDocument> {
  constructor(protected readonly model: Model<UserDocument> = UserModel) {
    super(model);
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<UserDocument | null> {
    return this.update(userId, { password: hashedPassword });
  }

  async addRole(userId: string, role: string): Promise<UserDocument | null> {
    const user = await this.model.findById(userId).exec();
    if (!user) {
      return null;
    }
    user.roles.push(role);
    return user.save();
  }
}