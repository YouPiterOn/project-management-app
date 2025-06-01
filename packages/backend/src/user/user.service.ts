import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryOptions } from 'src/common/types/pagination-query-options.type';
import { UserNotFoundException } from 'src/common/exceptions/not-found.exceptions';
import { ResponsePaginatedUsersDto } from './dto/response-paginated-users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(email: string, password: string, name: string) {
    const passwordHash = await this.hashPassword(password);

    const user = this.userRepo.create({
      email,
      name,
      password: passwordHash,
    });

    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (user === null) throw new UserNotFoundException(id);

    return user;
  }

  async patch(
    id: string,
    payload: {
      email?: string;
      password?: string;
      name?: string;
    },
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new UserNotFoundException(id);

    if (payload.email) user.email = payload.email;
    if (payload.name) user.name = payload.name;
    if (payload.password) {
      user.password = await this.hashPassword(payload.password);
    }

    return await this.userRepo.save(user);
  }

  async put(
    id: string,
    payload: {
      email: string;
      password: string;
      name: string;
    },
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new UserNotFoundException(id);

    user.email = payload.email;
    user.name = payload.name;
    user.password = await this.hashPassword(payload.password);

    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new UserNotFoundException(id);
    return await this.userRepo.remove(user);
  }

  async getPaginated(options: PaginationQueryOptions<User> = {}) {
    const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC', filters = {} } = options;

    const skip = (page - 1) * pageSize;

    const [users, totalItems] = await this.userRepo.findAndCount({
      select: ['id', 'email', 'name', 'role'],
      where: {
        ...filters,
        email: filters.email ? ILike(`%${filters.email}%`) : undefined,
      },
      skip,
      take: pageSize,
      order: { [sortBy]: sortOrder },
    });

    return {
      items: users,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      currentPage: page,
      pageSize,
    } as ResponsePaginatedUsersDto;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
