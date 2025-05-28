import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserPaginationQueryDto } from './dto/user-pagination-query.dto';
import { UserPatchDto } from './dto/user-patch.dto';
import { UserPutDto } from './dto/user-put.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { ResponsePaginatedUsersDto } from './dto/response-paginated-users.dto';
import { withoutPassword } from './user.util';

@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponsePaginatedUsersDto })
  async getPaginated(
    @Query() baseQuery: UserPaginationQueryDto,
  ) {
    return (await this.userService.getPaginated(baseQuery)) as ResponsePaginatedUsersDto;
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findById(id);

    return withoutPassword(user) as ResponseUserDto;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async patch(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserPatchDto) {
    const user = await this.userService.patch(id, body);

    return withoutPassword(user) as ResponseUserDto;
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async put(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserPutDto) {
    const user = await this.userService.put(id, body);

    return withoutPassword(user) as ResponseUserDto;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.remove(id);

    return withoutPassword(user) as ResponseUserDto;
  }
}
