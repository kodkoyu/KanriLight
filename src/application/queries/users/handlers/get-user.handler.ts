import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { UserReadRepository } from '../../../../persistence/repositories/users/user.read.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userReadRepo: UserReadRepository) {}

  async execute(query: GetUserQuery): Promise<any> {
    const { userId } = query;

    const user = await this.userReadRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}