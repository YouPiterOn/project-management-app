import { z } from 'zod';
import { createPaginatedSchema } from '../../shared/schemas';

export const paginatedProjectsSchema = createPaginatedSchema(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    owner: z.object({
      id: z.string(),
      name: z.string()
    }),
  })
);
export type PaginatedProjects = z.infer<typeof paginatedProjectsSchema>;


export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  ownerId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Project = z.infer<typeof projectSchema>;


export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});
export type CreateProjectValues = z.infer<typeof createProjectSchema>;


export const projectPaginationQuerySchema = z.object({
  sortBy: z.enum(['title', 'createdAt', 'updatedAt']).optional().default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).optional().default('ASC'),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(6),
});

export const projectFiltersSchema = z.object({
  ownerId: z.string().uuid().optional(),
  title: z.string().optional()
});

export const projectsQuerySchema = projectPaginationQuerySchema.merge(projectFiltersSchema);
export type ProjectsQuery = z.infer<typeof projectsQuerySchema>;