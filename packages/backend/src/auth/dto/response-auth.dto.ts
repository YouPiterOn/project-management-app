import { ApiProperty } from "@nestjs/swagger";

class AuthUser {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}

export class ResponseAuthDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty({ type: AuthUser })
  user: AuthUser;
}