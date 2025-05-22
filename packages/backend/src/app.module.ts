import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { APP_FILTER, APP_GUARD, Reflector } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { AtGuard } from "./auth/guards/at.guard";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    DatabaseModule,
		AuthModule,
		UserModule,
		ProjectModule,
		TaskModule
  ],
  controllers: [AppController],
  providers: [
    Reflector,
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule { }