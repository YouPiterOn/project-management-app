import type { ZodSchema } from 'zod';
import { errorResponseSchema, type ErrorResponse } from '../schemas';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export class ApiError extends Error implements ErrorResponse {
  constructor({
    statusCode,
    message,
    timestamp,
  }: {
    statusCode: number;
    message?: string;
    timestamp?: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = timestamp || Date.now().toString();
    this.name = 'ApiError';
  }

  statusCode: number;
  timestamp: string;
}

export async function apiFetch<T>(
  url: string,
  schema: ZodSchema<T>,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(API_BASE + url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    credentials: 'include',
    ...options,
  });

  const json = await res.json().catch(() => {
    throw new ApiError({ statusCode: res.status, message: 'Unknown type of response' });
  });

  if (!res.ok) {
    const error = errorResponseSchema.parse(json);
    console.error(`${error.timestamp} Error ${error.statusCode}: ${error.message}`);
    throw new ApiError(error);
  }

  return schema.parse(json);
}
