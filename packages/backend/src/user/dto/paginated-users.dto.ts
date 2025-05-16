import { PaginationDto } from "src/common/dto/pagination.dto";
import { UserDto } from "./user.dto";

export class PaginatedUsersDto extends PaginationDto {
  users: UserDto[];
}