import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskNotFoundException } from 'src/common/exceptions/not-found.exceptions';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';
import { PaginationQueryOptions } from 'src/common/types/pagination-query-options.type';
import { TaskStatus } from './enums/task-status.enum';
import { ResponsePaginatedTasksDto } from './dto/response-paginated-tasks.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private userService: UserService,
    private projectService: ProjectService,
  ) {}

  async create(
    title: string,
    description: string,
    projectId: string,
    assigneeId?: string | null,
    status: TaskStatus = TaskStatus.TODO,
  ) {
    await this.projectService.findById(projectId);

    const task = this.taskRepo.create({
      title,
      description,
      projectId,
      assigneeId,
      status,
    });

    return await this.taskRepo.save(task);
  }

  async findById(id: string) {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (task === null) throw new TaskNotFoundException(id);

    return task;
  }

  async patch(
    id: string,
    payload: {
      title?: string;
      description?: string;
      status?: TaskStatus;
      assigneeId?: string | null;
    },
  ) {
    const task = await this.findById(id);

    if (payload.title !== undefined) task.title = payload.title;
    if (payload.description !== undefined) task.description = payload.description;
    if (payload.status !== undefined) task.status = payload.status;

    if (payload.assigneeId !== undefined) {
      if (payload.assigneeId !== null) {
        const assignee = await this.userService.findById(payload.assigneeId);
        if (assignee !== null) task.assigneeId = assignee.id;
      } else {
        task.assigneeId = null;
      }
    }

    return await this.taskRepo.save(task);
  }

  async put(
    id: string,
    payload: {
      title: string;
      description: string;
      status: TaskStatus;
      assigneeId: string | null;
    },
  ) {
    const task = await this.findById(id);

    task.title = payload.title;
    task.description = payload.description;
    task.status = payload.status;

    if (payload.assigneeId !== null) {
      const assignee = await this.userService.findById(payload.assigneeId);
      task.assigneeId = assignee ? assignee.id : null;
    } else {
      task.assigneeId = null;
    }

    return await this.taskRepo.save(task);
  }

  async remove(id: string) {
    const task = await this.findById(id);
    return await this.taskRepo.remove(task);
  }

  async getPaginated(options: PaginationQueryOptions<Task> = {}) {
    const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC', filters = {} } = options;

    const skip = (page - 1) * pageSize;

    const [tasks, totalItems] = await this.taskRepo.findAndCount({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        assignee: {
          id: true,
          name: true,
        },
      },
      relations: {
        assignee: true,
      },
      where: filters,
      skip,
      take: pageSize,
      order: { [sortBy]: sortOrder },
    });

    return {
      items: tasks,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    } as ResponsePaginatedTasksDto;
  }
}
