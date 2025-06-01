import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { ProjectService } from '../project.service';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private projectService: ProjectService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const { user, params } = request;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (requiredRoles && requiredRoles.includes(user.role)) {
      return true;
    }

    const projectId = params.id;
    if (!projectId) {
      throw new ForbiddenException('Missing project ID for ownership check');
    }

    const isOwner = await this.projectService.isOwner(projectId, user.sub);
    if (!isOwner) {
      throw new ForbiddenException('Not the project owner');
    }

    return true;
  }
}
