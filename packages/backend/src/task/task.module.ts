import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule, ProjectModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
