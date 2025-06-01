import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { TaskService } from '../task.service';
import { ProjectService } from 'src/project/project.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

/**
 * Allows access to endpoint only to task assignee, project owner, or any user of specified roles
 */
@Injectable()
export class TaskGuard implements CanActivate {
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
    let assigneeId: string | undefined | null;

    projectId = body.projectId;
    assigneeId = body.assigneeId;

    if ((!projectId || assigneeId === undefined) && params.id) {
      const task = await this.taskService.findById(params.id);
      projectId = task.projectId;
      assigneeId = task.assigneeId;
    }

    if (!projectId) {
      throw new ForbiddenException('Project ID could not be determined');
    }

    const isOwner = await this.projectService.isOwner(projectId, user.sub);
    const isAssignee = assigneeId === user.sub;

    if (isOwner || isAssignee) {
      return true;
    }

    throw new ForbiddenException('Access denied: not project owner or task assignee');
  }
}
