import { NotFoundException } from '@nestjs/common';

export class UserDeletedException extends NotFoundException {
  constructor(message: string = 'The user has been deleted.') {
    super(message);
  }
}
