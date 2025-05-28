import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../shared/clients/apiClient";
import { paginatedProjectsSchema, type PaginatedProjects } from "../schemas";
import { ProjectList } from "../components/ProjectList";
import { useState } from "react";
import { Button } from "../../../shared/components/Button";

async function fetchProjects(page: number, pageSize: number): Promise<PaginatedProjects> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  }).toString();

  return apiFetch(`/projects?${params}`, paginatedProjectsSchema);
}

export function ProjectListPage() {
  const [page, setPage] = useState(1);
  const [pageSize, _setPageSize] = useState(6);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page, pageSize),
    
  });

  return (
    <div className="w-full max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Projects</h1>
        <p style={{ color: 'var(--color-muted-foreground)' }}>
          View and manage your existing projects
        </p>
      </div>
      <ProjectList
        data={data}
        isLoading={isLoading}
        isError={isError}
        pageSize={pageSize}
      />
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={!data || data.currentPage <= 1}
          size="sm"
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {data?.currentPage ?? '-'} of {data?.totalPages ?? '-'}
        </span>

        <Button
          onClick={() => setPage((p) => Math.min(p + 1, data?.totalPages ?? p))}
          disabled={!data || data.currentPage >= data.totalPages}
          size="sm"
        >
          Next
        </Button>
      </div>

    </div>
  );
}
