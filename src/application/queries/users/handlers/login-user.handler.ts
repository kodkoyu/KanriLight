import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginUserQuery } from '../login-user.query';
import { UserDomainService } from '../../../../domain/services/user.domain-service';
import { ContextService } from '../../../../shared/services/context.service';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery> {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly contextService: ContextService,
  ) {}

  async execute(query: LoginUserQuery): Promise<any> {
    console.log('ContextService in Handler:', this.contextService);
    console.log('User-Agent from ContextService:', this.contextService.getContext('userAgent'));

    const { email, password } = query;

    const userAgent = this.contextService.getContext('userAgent') || 'Unknown';

    const tokens = await this.userDomainService.login({ email, password }, userAgent);

    return {
      message: 'Login successful',
      ...tokens,
    };
  }
}