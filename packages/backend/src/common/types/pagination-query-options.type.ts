type Primitive = string | number | boolean | Date;

type Filterable<T> = Partial<{
  [K in keyof T]: T[K] extends Primitive | null | undefined
    ? Exclude<T[K], null | undefined>
    : never;
}>;

export type PaginationQueryOptions<T> = {
  page?: number;
  pageSize?: number;
  sortBy?: keyof T;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Filterable<T>;
};
