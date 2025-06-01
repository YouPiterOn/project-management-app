import { apiFetch } from '../../../shared/clients/apiClient';
import { emptySchema } from '../../../shared/schemas';
import { toURLSearchParams } from '../../../shared/utils';
import {
  createProjectResponseSchema,
  paginatedProjectsSchema,
  projectWithTasksSchema,
  type CreateProjectValues,
  type PaginatedProjects,
  type ProjectsQuery as ProjectsQuery,
  type ProjectWithTasksSchema,
} from '../schemas';

async function getPaginated(query: ProjectsQuery): Promise<PaginatedProjects> {
  const params = toURLSearchParams(query).toString();

  return apiFetch(`/projects?${params}`, paginatedProjectsSchema);
}

async function getByIdWithTasks(id: string): Promise<ProjectWithTasksSchema> {
  const params = toURLSearchParams({
    includeTasks: true,
  }).toString();

  return apiFetch(`/projects/${id}?${params}`, projectWithTasksSchema);
}

async function create(data: CreateProjectValues) {
  return apiFetch('/projects', createProjectResponseSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function remove(projectId: string) {
  return apiFetch(`/projects/${projectId}`, emptySchema, {
    method: 'DELETE',
  });
}

export const projectsClient = {
  getPaginated,
  getByIdWithTasks,
  create,
  remove,
};
