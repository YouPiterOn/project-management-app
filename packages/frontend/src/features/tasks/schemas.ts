import { z } from 'zod';
import { createPaginatedSchema } from '../../shared/schemas';

export const paginatedTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['todo', 'in_progress', 'done']),
  assignee: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});
export type PaginatedTask = z.infer<typeof paginatedTaskSchema>;

export const paginatedTasksSchema = createPaginatedSchema(paginatedTaskSchema);
export type PaginatedTasks = z.infer<typeof paginatedTasksSchema>;

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['todo', 'in_progress', 'done']),
  assigneeId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Task = z.infer<typeof taskSchema>;

export const createTaskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});
export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;

export const createTaskSchema = createTaskFormSchema.merge(
  z.object({
    projectId: z.string().uuid(),
    assigneeId: z.string().uuid().optional(),
  }),
);
export type CreateTaskValues = z.infer<typeof createTaskSchema>;

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export const taskPaginationQuerySchema = z.object({
  sortBy: z.enum(['title', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).optional().default('ASC'),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
});

export const taskFiltersSchema = z.object({
  projectId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  title: z.string().optional(),
});

export const tasksQuerySchema = taskPaginationQuerySchema.merge(taskFiltersSchema);
export type TasksQuery = z.infer<typeof tasksQuerySchema>;
