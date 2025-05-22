export type PaginationQueryOptions<T> = {
  page?: number;
  pageSize?: number;
  sortBy?: keyof T;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Partial<Record<keyof T, any>>;
};