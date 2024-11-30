import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { UserWriteRepository } from '../../../../persistence/repositories/users/user.write.repository';
import { UserReadRepository } from '../../../../persistence/repositories/users/user.read.repository';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userWriteRepo: UserWriteRepository,
    private readonly userReadRepo: UserReadRepository,
  ) {}

  async execute(command: DeleteUserCommand): Promise<{ success: boolean }> {
    const { userId } = command;

    const user = await this.userReadRepo.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userWriteRepo.delete(userId);
    return { success: true };
  }
}