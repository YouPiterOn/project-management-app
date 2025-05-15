import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER, APP_GUARD, Reflector } from "@nestjs/core";
import { AtGuard } from "./common/guards/at.guard";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { RolesGuard } from "./common/guards/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    DatabaseModule,
		AuthModule,
		UserModule,
  ],
  controllers: [AppController],
  providers: [
    Reflector,
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule { }