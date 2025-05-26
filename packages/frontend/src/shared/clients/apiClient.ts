import type { ZodSchema } from 'zod';
import { errorResponseSchema } from '../schemas';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

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

  let json: unknown;

  try {
    json = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    } else {
      throw new Error('Unknown type of response');
    }
  }

  if (!res.ok) {
    try {
      const error = errorResponseSchema.parse(json);
      console.error(`${error.timestamp} Error ${error.statusCode}: ${error.message}`);
      throw new Error(error.message);
    } catch {
      throw new Error('An unknown error occurred');
    }
  }

  return schema.parse(json);
}
