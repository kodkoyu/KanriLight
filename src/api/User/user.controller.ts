import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/users/create-user.command';
import { DeleteUserCommand } from '../../application/commands/users/delete-user.command';
import { UpdateUserCommand } from '../../application/commands/users/update-user.command';
import { GetUserQuery } from '../../application/queries/users/get-user.query';
import { ListUsersQuery } from '../../application/queries/users/list-users.query';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    async createUser(@Body() body: { name: string; email: string; password: string; roles: string[] }) {
        const { name, email, password, roles } = body;
        return this.commandBus.execute(new CreateUserCommand(name, email, password, roles));
    }

    @Get()
    async listUsers(@Query('page') page: number, @Query('pageSize') pageSize: number) {
        return this.queryBus.execute(new ListUsersQuery(page, pageSize));
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.queryBus.execute(new GetUserQuery(id));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: { name?: string; email?: string; roles?: string[] }) {
        const { name, email, roles } = body;
        return this.commandBus.execute(new UpdateUserCommand(id, name, email, roles));
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.commandBus.execute(new DeleteUserCommand(id));
    }
}