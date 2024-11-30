import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { UserWriteRepository } from '../../../../persistence/repositories/users/user.write.repository';
import { UserReadRepository } from '../../../../persistence/repositories/users/user.read.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly userWriteRepo: UserWriteRepository,
    private readonly userReadRepo: UserReadRepository,
  ) { }

  async execute(command: UpdateUserCommand): Promise<any> {
    const { userId, name, email, roles } = command;

    const user = await this.userReadRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userWriteRepo.update(userId, {
      name,
      email,
      roles,
    });

    return updatedUser;
  }
}