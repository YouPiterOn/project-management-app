import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  ownerId: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export const paginatedProjectsSchema = z.object({
  items: z.array(projectSchema),
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
});

export type PaginatedProjects = z.infer<typeof paginatedProjectsSchema>;
