import { NotFoundException } from "@nestjs/common";

export class ProjectNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(id ? `Project not found by id ${id}` : 'Project not found');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(id?: string) {
    super(id ? `User not found by id ${id}` : 'User not found');
  }
}