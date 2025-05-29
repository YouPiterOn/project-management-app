import { apiFetch } from "../../../shared/clients/apiClient";
import { toURLSearchParams } from "../../../shared/utils";
import { paginatedProjectsSchema, projectSchema, type CreateProjectValues, type PaginatedProjects, type ProjectsQuery as ProjectsQuery } from "../schemas";

async function getPaginated(query: ProjectsQuery): Promise<PaginatedProjects> {
  const params = toURLSearchParams(query).toString();

  return apiFetch(`/projects?${params}`, paginatedProjectsSchema);
}

async function create(data: CreateProjectValues) {
  return apiFetch('/projects', projectSchema, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export const projectsClient = {
  getPaginated,
  create
}