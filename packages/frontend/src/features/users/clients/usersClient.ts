import { apiFetch } from "../../../shared/clients/apiClient";
import { toURLSearchParams } from "../../../shared/utils";
import { paginatedUsersSchema, type PaginatedUsers, type UsersQuery } from "../schemas";

async function getPaginated(query: UsersQuery): Promise<PaginatedUsers> {
  const params = toURLSearchParams(query).toString();

  return apiFetch(`/users?${params}`, paginatedUsersSchema);
}

export const usersClient = {
  getPaginated,
}