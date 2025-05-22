import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { getConfigOrError } from 'src/common/utils/config.utils';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: getConfigOrError(this.configService, 'DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
