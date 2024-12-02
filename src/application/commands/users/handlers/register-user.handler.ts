import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';
import { UserDomainService } from '../../../../domain/services/user.domain-service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: RegisterUserCommand): Promise<any> {
    const { name, email, password } = command;
    const tokens = await this.userDomainService.register({ name, email, password });
    return {
      message: 'User registered successfully',
      ...tokens,
    };
  }
}