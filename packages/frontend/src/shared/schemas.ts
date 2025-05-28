import { z } from 'zod';

export const errorResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  timestamp: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export const emptySchema = z.any().transform(() => undefined);