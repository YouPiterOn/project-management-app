import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { TaskProjectOwnerOrRolesGuard } from './guards/task-project-owner-or-roles.guard';
import { TaskPaginationQueryDto } from './dto/task-pagination-query.dto';
import { TaskFiltersDto } from './dto/task-filters.dto';
import { ResponsePaginatedTasksDto } from './dto/response-paginated-tasks.dto';
import { ResponseTaskDto } from './dto/response-task.dto';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskPatchDto } from './dto/task-patch.dto';
import { TaskPutDto } from './dto/task-put.dto';

@Controller('tasks')
@ApiBearerAuth()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponsePaginatedTasksDto })
  async getPaginated(
    @Query(new ValidationPipe({ transform: true })) baseQuery: TaskPaginationQueryDto,
    @Query(new ValidationPipe({ transform: true })) filters: TaskFiltersDto,
  ) {
    return await this.taskService.getPaginated({
      ...baseQuery,
      filters,
    }) as ResponsePaginatedTasksDto;
  }

  @Post()
  @UseGuards(TaskProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponseTaskDto })
  async create(@Body() body: TaskCreateDto) {
    const { title, description, projectId, assigneeId, status } = body;
    return await this.taskService.create(title, description, projectId, assigneeId, status) as ResponseTaskDto;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseTaskDto })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.findById(id) as ResponseTaskDto;
  }

  @Patch(':id')
  @UseGuards(TaskProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseTaskDto })
  async patch(@Param('id', ParseUUIDPipe) id: string, @Body() body: TaskPatchDto) {
    return await this.taskService.patch(id, body) as ResponseTaskDto;
  }

  @Put(':id')
  @UseGuards(TaskProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseTaskDto })
  async put(@Param('id', ParseUUIDPipe) id: string, @Body() body: TaskPutDto) {
    return await this.taskService.put(id, body) as ResponseTaskDto;
  }

  @Delete(':id')
  @UseGuards(TaskProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseTaskDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.taskService.remove(id) as ResponseTaskDto;
  }
}
