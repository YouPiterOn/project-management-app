import { User } from './entities/user.entity';

export function withoutPassword(user: User) {
  const { password: _password, ...data } = user;
  return data;
}
