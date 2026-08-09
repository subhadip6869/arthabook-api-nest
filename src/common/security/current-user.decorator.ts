import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { FirebaseUserPrincipal } from './firebase-user-principal';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): FirebaseUserPrincipal => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
