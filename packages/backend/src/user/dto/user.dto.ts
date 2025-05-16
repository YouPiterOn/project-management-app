import { Role } from "src/common/enums/role.enum";

export class UserDto {
	id: string;
	email: string;
	name: string;
	role: Role;
}
