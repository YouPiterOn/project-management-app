import { Role } from "src/common/enums/role.enum";

export class MeDto {
	id: string;
	email: string;
	name: string;
	role: Role;
}
