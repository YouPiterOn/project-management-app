import { projectsQuerySchema, type ProjectsQuery } from '../schemas';

export function useProjectsQuery(searchParams: URLSearchParams): ProjectsQuery {
  const queryObject = Object.fromEntries(searchParams.entries());
  return projectsQuerySchema.parse(queryObject);
}
