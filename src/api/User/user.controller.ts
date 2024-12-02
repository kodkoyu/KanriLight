import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../../application/commands/users/register-user.command';
import { LoginUserQuery } from '../../application/queries/users/login-user.query';
import { RefreshUserQuery } from '../../application/queries/users/refresh-user.query';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;
    return this.commandBus.execute(new RegisterUserCommand(name, email, password));
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.queryBus.execute(new LoginUserQuery(email, password));
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const { refreshToken } = body;
    return this.queryBus.execute(new RefreshUserQuery(refreshToken));
  }
}