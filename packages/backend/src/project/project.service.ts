import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { PaginationQueryOptions } from 'src/common/types/pagination-query-options.type';
import { ProjectNotFoundException } from 'src/common/exceptions/not-found.exceptions';
import { UserService } from 'src/user/user.service';
import { ResponsePaginatedProjectsDto } from './dto/response-paginated-projects.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    private userService: UserService,
  ) {}

  async create(title: string, description: string, ownerId: string) {
    const project = this.projectRepo.create({
      title,
      description,
      ownerId,
    });

    return await this.projectRepo.save(project);
  }

  async findById(id: string) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (project === null) throw new ProjectNotFoundException(id);

    return project;
  }

  async patch(
    id: string,
    payload: {
      title?: string;
      description?: string;
      ownerId?: string;
    },
  ) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });
    if (project === null) throw new ProjectNotFoundException(id);

    if (payload.title !== undefined) project.title = payload.title;
    if (payload.description !== undefined) project.description = payload.description;
    if (payload.ownerId !== undefined) {
      project.owner = await this.userService.findById(payload.ownerId);
    }

    return await this.projectRepo.save(project);
  }

  async put(
    id: string,
    payload: {
      title: string;
      description: string;
      ownerId: string;
    },
  ) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });
    if (project === null) throw new ProjectNotFoundException(id);

    project.title = payload.title;
    project.description = payload.description;
    project.owner = await this.userService.findById(payload.ownerId);

    return await this.projectRepo.save(project);
  }

  async remove(id: string) {
    const project = await this.projectRepo.findOneBy({ id });

    if (project === null) throw new ProjectNotFoundException(id);

    return await this.projectRepo.remove(project);
  }

  async getPaginated(options: PaginationQueryOptions<Project> = {}) {
    const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC', filters = {} } = options;

    const skip = (page - 1) * pageSize;

    const [projects, totalItems] = await this.projectRepo.findAndCount({
      select: ['id', 'title', 'description', 'ownerId'],
      where: filters,
      skip,
      take: pageSize,
      order: { [sortBy]: sortOrder },
    });

    return {
      items: projects,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    } as ResponsePaginatedProjectsDto;
  }

  async isOwner(projectId: string, ownerId: string) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      select: ['id', 'ownerId'],
    });

    if (project === null) throw new ProjectNotFoundException(projectId);

    return project.ownerId === ownerId;
  }
}
