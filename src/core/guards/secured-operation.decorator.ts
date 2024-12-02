import { SetMetadata } from '@nestjs/common';
export const SecuredOperation = (...permissions: string[]) => SetMetadata('permissions', permissions);