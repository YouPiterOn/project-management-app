import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from './jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	async signIn(payload: SignInDto) {
		const { email, password } = payload;

		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isValid = await this.userService.comparePassword(
			password,
			user.password,
		);
		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const token = await this.jwtService.sign(
			user.id,
			user.email,
			user.role,
		);
		return {
			accessToken: token,
			user: { id: user.id, email: user.email, name: user.name },
		};
	}

	async signUp(payload: SignUpDto) {
		const { email, password, name } = payload;

		const existing = await this.userService.findByEmail(email);
		if (existing) throw new ConflictException('Email already in use');

		const user = await this.userService.create(email, password, name);

		const token = await this.jwtService.sign(
			user.id,
			user.email,
			user.role,
		);
		return {
			accessToken: token,
			user: { id: user.id, email: user.email, name: user.name },
		};
	}
}
