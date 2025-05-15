import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MeDto } from './dto/me.dto';
import { UserData } from 'src/common/decorators/user-data.decorator';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('me')
	async getProfile(@UserData('sub') userId: string) {
		const user = await this.userService.findById(userId);

		if (!user) throw new Error('User not found');

		const {
			password,
			createdAt,
			updatedAt,
			...data
		} = user;
		return data as MeDto;
	}
}
