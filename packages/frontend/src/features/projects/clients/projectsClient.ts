import { apiFetch } from '../../../shared/clients/apiClient';
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

export const projectsClient = {
  getPaginated,
  getByIdWithTasks,
  create,
};
