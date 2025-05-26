import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TaskService } from '../task.service';
import { ProjectService } from 'src/project/project.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

@Injectable()
export class TaskProjectOwnerOrRolesGuard implements CanActivate {
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const { user, params, body } = request;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (requiredRoles && requiredRoles.includes(user.role)) {
      return true;
    }

    let projectId: string | undefined;

    if (body.projectId) {
      projectId = body.projectId;
    } else if (params.id) {
      const task = await this.taskService.findById(params.id);
      projectId = task.projectId;
    }

    if (!projectId) {
      throw new ForbiddenException('Unable to resolve project ID from task');
    }

    const isOwner = await this.projectService.isOwner(projectId, user.id);
    if (!isOwner) {
      throw new ForbiddenException('User does not own the related project');
    }

    return true;
  }
}
