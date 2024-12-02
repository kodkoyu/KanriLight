import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UserWriteRepository } from '../../persistence/repositories/users/user.write.repository';
import { UserReadRepository } from '../../persistence/repositories/users/user.read.repository';
import { LoginUserHandler } from '../../application/queries/users/handlers/login-user.handler';
import { RegisterUserHandler } from '../../application/commands/users/handlers/register-user.handler';
import { UserDomainService } from '../../domain/services/user.domain-service';
import { AuthService } from '../../core/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from '../../infrastructure/database/redis.repository';
import { RedisService } from '../../infrastructure/database/redis.service';
import { ContextService } from '../../shared/services/context.service';

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [
        UserWriteRepository,
        UserReadRepository,
        AuthService,
        UserDomainService,
        LoginUserHandler,
        RegisterUserHandler,
        JwtService,
        RedisRepository,
        RedisService,
        ContextService
    ],
})
export class UserModule { }