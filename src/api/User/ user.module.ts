import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { UserWriteRepository } from '../../persistence/repositories/users/user.write.repository';
import { UserReadRepository } from '../../persistence/repositories/users/user.read.repository';
import { CreateUserHandler } from '../../application/commands/users/handlers/create-user.handler';
import { DeleteUserHandler } from '../../application/commands/users/handlers/delete-user.handler';
import { UpdateUserHandler } from '../../application/commands/users/handlers/update-user.handler';
import { GetUserHandler } from '../../application/queries/users/handlers/get-user.handler';
import { ListUsersHandler } from '../../application/queries/users/handlers/list-users.handler';

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers: [
        UserWriteRepository,
        UserReadRepository,
        CreateUserHandler,
        DeleteUserHandler,
        UpdateUserHandler,
        GetUserHandler,
        ListUsersHandler,
    ],
})
export class UserModule { }