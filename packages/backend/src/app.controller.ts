import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @HttpCode(200)
  getRoot(): string {
    return 'OK';
  }
}