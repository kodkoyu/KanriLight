import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RefreshUserQuery } from '../refresh-user.query';
import { UserDomainService } from '../../../../domain/services/user.domain-service';
import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@QueryHandler(RefreshUserQuery)
export class RefreshUserHandler implements IQueryHandler<RefreshUserQuery> {
  constructor(
    private readonly userDomainService: UserDomainService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async execute(query: RefreshUserQuery): Promise<any> {
    const { refreshToken } = query;
    const userAgent = this.request.headers['user-agent'] || 'Unknown';
    const tokens = await this.userDomainService.refresh(refreshToken, userAgent);
    return {
      message: 'Tokens refreshed successfully',
      ...tokens,
    };
  }
}