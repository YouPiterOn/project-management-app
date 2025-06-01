import z from "zod";
import { createPaginatedSchema } from "../../shared/schemas";

export const paginatedUsersSchema = createPaginatedSchema(
  z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.string(),
  }),
);
export type PaginatedUsers = z.infer<typeof paginatedUsersSchema>;

export const userPaginationQuerySchema = z.object({
  sortBy: z.enum(['email', 'name', 'role']).optional().default('email'),
  sortOrder: z.enum(['ASC', 'DESC']).optional().default('ASC'),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(6),
});

export const userFiltersSchema = z.object({
  email: z.string().optional(),
});

export const usersQuerySchema = userPaginationQuerySchema.merge(userFiltersSchema);
export type UsersQuery = z.infer<typeof usersQuerySchema>;