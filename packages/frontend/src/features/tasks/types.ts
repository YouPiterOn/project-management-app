import type { TaskStatus } from './schemas';

export interface TaskToEdit {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
