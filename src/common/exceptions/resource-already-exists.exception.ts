import { ConflictException } from '@nestjs/common';

export class ResourceAlreadyExistsException extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}
