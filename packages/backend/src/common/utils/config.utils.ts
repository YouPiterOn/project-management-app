import { ConfigService } from '@nestjs/config';

export function getConfigOrError(configService: ConfigService, key: string): string {
  const value = configService.get<string>(key);
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
