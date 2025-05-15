import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Public } from "./common/decorators/public.decorator";

@Controller()
export class AppController {
  @Get()
  @Public()
  @HttpCode(200)
  getRoot(): string {
    return 'OK';
  }
}