import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserWriteRepository } from '../../../../persistence/repositories/users/user.write.repository';
import { UserReadRepository } from '../../../../persistence/repositories/users/user.read.repository';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private readonly userWriteRepo: UserWriteRepository,
        private readonly userReadRepo: UserReadRepository,
    ) { }
    async execute(command: CreateUserCommand): Promise<any> {
        const { name, email, password, roles } = command;

        const existingUser = await this.userReadRepo.findOne({ email });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userWriteRepo.create({
            name,
            email,
            password: hashedPassword,
            roles,
        });

        return user;
    }
}