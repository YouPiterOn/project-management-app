import type { PaginatedTask } from './schemas';

export function filterTasks(tasks?: PaginatedTask[]): {
  todoTasks: PaginatedTask[];
  inProgressTasks: PaginatedTask[];
  doneTasks: PaginatedTask[];
} {
  const todoTasks: PaginatedTask[] = [];
  const inProgressTasks: PaginatedTask[] = [];
  const doneTasks: PaginatedTask[] = [];

  if (tasks === undefined) return { todoTasks, inProgressTasks, doneTasks };

  for (const task of tasks) {
    switch (task.status) {
      case 'todo':
        todoTasks.push(task);
        break;
      case 'in_progress':
        inProgressTasks.push(task);
        break;
      case 'done':
        doneTasks.push(task);
        break;
    }
  }

  return { todoTasks, inProgressTasks, doneTasks };
}
