import { ApiProperty } from '@nestjs/swagger';

export class ResponseAuthDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
