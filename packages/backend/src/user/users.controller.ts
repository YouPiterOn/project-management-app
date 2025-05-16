import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { PaginatedUsersDto } from './dto/paginated-users.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UserService) { }

  @Get()
  async getPaginatedUsers(
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ) {
    return await this.userService.getPaginated({ page, pageSize }) as PaginatedUsersDto;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    const {
      password,
      createdAt,
      updatedAt,
      ...data
    } = user;

    return data as UserDto;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(id, body);
    if (!user) throw new NotFoundException('User not found');

    const {
      password,
      createdAt,
      updatedAt,
      ...data
    } = user;

    return data as UserDto;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    if (!user) throw new NotFoundException('User not found');

    const {
      password,
      createdAt,
      updatedAt,
      ...data
    } = user;
    
    return data as UserDto;
  }
}
