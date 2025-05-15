import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(email: string, password: string, name: string) {
    const passwordHash = await this.hashPassword(password);

    const user = this.userRepo.create({
      email,
      name,
      password: passwordHash
    });

    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async findById(id: string) {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    payload: {
      email?: string;
      password?: string;
      name?: string;
    },
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return null;

    if (payload.email) user.email = payload.email;
    if (payload.name) user.name = payload.name;
    if (payload.password) {
      user.password = await this.hashPassword(payload.password);
    }

    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return null;
    return await this.userRepo.remove(user);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
