import { apiFetch } from '../../../shared/clients/apiClient';
import { emptySchema } from '../../../shared/schemas';
import { toURLSearchParams } from '../../../shared/utils';
import {
  paginatedTasksSchema,
  taskSchema,
  type Task,
  type TasksQuery,
  type PaginatedTasks,
  type CreateTaskValues,
  type TaskStatus,
} from '../schemas';

async function getPaginated(query: TasksQuery): Promise<PaginatedTasks> {
  const params = toURLSearchParams(query).toString();
  return apiFetch(`/tasks?${params}`, paginatedTasksSchema);
}

async function create(data: CreateTaskValues): Promise<Task> {
  return apiFetch('/tasks', taskSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function update(
  taskId: string,
  data: {
    title?: string;
    description?: string;
    assigneeId?: string | null;
    status?: TaskStatus;
  },
) {
  return apiFetch(`/tasks/${taskId}`, taskSchema, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

async function remove(taskId: string) {
  return apiFetch(`/tasks/${taskId}`, emptySchema, {
    method: 'DELETE',
  });
}

async function patchStatus(taskId: string, status: TaskStatus): Promise<Task> {
  return apiFetch(`/tasks/${taskId}`, taskSchema, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export const tasksClient = {
  getPaginated,
  create,
  update,
  remove,
  patchStatus,
};
