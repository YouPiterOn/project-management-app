import { z, type ZodTypeAny } from 'zod';

export const errorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  timestamp: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const emptySchema = z.any().transform(() => undefined);

export const createPaginatedSchema = <T extends ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    totalItems: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    pageSize: z.number(),
  });
