type Primitive = string | number | boolean | Date | undefined;

type Filterable<T> = Partial<{
  [K in keyof T]: T[K] extends Primitive ? T[K] : never;
}>;

export type PaginationQueryOptions<T> = {
  page?: number;
  pageSize?: number;
  sortBy?: keyof T;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Filterable<T>;
};
