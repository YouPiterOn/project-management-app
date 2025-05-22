import { Body, Controller, Delete, Get, HttpCode, Patch, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserData } from "src/common/decorators/user-data.decorator";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { UserPutDto } from "./dto/user-put.dto";
import { UserPatchDto } from "./dto/user-patch.dto";
import { ResponseUserDto } from "./dto/response-user.dto";

@Controller('me')
@ApiBearerAuth()
export class MeController {
  constructor(private userService: UserService) { }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async get(@UserData('sub') userId: string) {
    const user = await this.userService.findById(userId);

    const {
      password,
      ...data
    } = user;
    return data as ResponseUserDto;
  }

  @Patch()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async patch(@UserData('sub') userId: string, @Body() body: UserPatchDto) {
    const user = await this.userService.patch(userId, body);

    const {
      password,
      ...data
    } = user;
    return data as ResponseUserDto;
  }

  @Put()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async put(@UserData('sub') userId: string, @Body() body: UserPutDto) {
    const user = await this.userService.put(userId, body);

    const {
      password,
      ...data
    } = user;
    return data as ResponseUserDto;
  }

  @Delete()
  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  async delete(@UserData('sub') userId: string) {
    const user = await this.userService.remove(userId);

    const {
      password,
      ...data
    } = user;

    return data as ResponseUserDto;
  }
}