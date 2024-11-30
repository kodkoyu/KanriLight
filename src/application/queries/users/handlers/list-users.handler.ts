import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from '../list-users.query';
import { UserReadRepository } from '../../../../persistence/repositories/users/user.read.repository';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly userReadRepo: UserReadRepository) {}

  async execute(query: ListUsersQuery): Promise<any> {
    const { page, pageSize } = query;

    const users = await this.userReadRepo.findAll({}, page, pageSize);
    const totalRecords = await this.userReadRepo.count();

    return {
      users,
      pagination: {
        page,
        pageSize,
        totalRecords,
      },
    };
  }
}