import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  Put,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UserData } from 'src/common/decorators/user-data.decorator';
import { ProjectFiltersDto } from './dto/project-filters.dto';
import { ProjectPaginationQueryDto } from './dto/project-pagination-query.dto';
import { ProjectPatchDto } from './dto/project-patch.dto';
import { ProjectPutDto } from './dto/project-put.dto';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ProjectOwnerOrRolesGuard } from './guards/project-owner-or-roles.guard';
import { ResponseProjectDto } from './dto/response-project.dto';
import { ResponsePaginatedProjectsDto } from './dto/response-paginated-projects.dto';

@Controller('projects')
@ApiBearerAuth()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponsePaginatedProjectsDto })
  async getPaginated(
    @Query(new ValidationPipe({ transform: true })) baseQuery: ProjectPaginationQueryDto,
    @Query(new ValidationPipe({ transform: true })) filters: ProjectFiltersDto,
  ) {
    return await this.projectService.getPaginated({...baseQuery, filters}) as ResponsePaginatedProjectsDto;
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: ResponseProjectDto })
  async create(@UserData('sub') userId: string, @Body() body: ProjectCreateDto) {
    const { title, description } = body;
    return await this.projectService.create(title, description, userId) as ResponseProjectDto;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiCreatedResponse({ type: ResponseProjectDto })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectService.findById(id) as ResponseProjectDto;
  }

  @Patch(':id')
  @UseGuards(ProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiCreatedResponse({ type: ResponseProjectDto })
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ProjectPatchDto,
  ) {
    return await this.projectService.patch(id, body) as ResponseProjectDto;
  }

  @Put(':id')
  @UseGuards(ProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiCreatedResponse({ type: ResponseProjectDto })
  async put(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ProjectPutDto
  ) {
    return await this.projectService.put(id, body) as ResponseProjectDto;
  }

  @Delete(':id')
  @UseGuards(ProjectOwnerOrRolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiCreatedResponse({ type: ResponseProjectDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectService.remove(id) as ResponseProjectDto;
  }
}
