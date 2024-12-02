import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): any {
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userRoles = user?.roles || [];

        const hasPermission = requiredPermissions.some((permission) => userRoles.includes(permission));

        if (!hasPermission) {
            throw new UnauthorizedException('You do not have permission to access this resource');
        }

        return next.handle();
    }
}