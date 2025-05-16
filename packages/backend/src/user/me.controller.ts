import { Body, Controller, Delete, Get, NotFoundException, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserData } from "src/common/decorators/user-data.decorator";
import { UserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('me')
@ApiBearerAuth()
export class MeController {
  constructor(private userService: UserService) { }

  @Get()
  async getSelf(@UserData('sub') userId: string) {
    const user = await this.userService.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    const {
      password,
      createdAt,
      updatedAt,
      ...data
    } = user;
    return data as UserDto;
  }

  @Put()
  async updateSelf(@UserData('sub') userId: string, @Body() body: UpdateUserDto) {
    const user = await this.userService.update(userId, body);

    if (!user) throw new NotFoundException('User not found');

    const {
      password,
      createdAt,
      updatedAt,
      ...data
    } = user;
    return data as UserDto;
  }

  @Delete()
  async deleteSelf(@UserData('sub') userId: string) {
    const user = await this.userService.remove(userId);
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