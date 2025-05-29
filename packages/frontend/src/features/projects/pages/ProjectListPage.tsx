import { useQuery } from "@tanstack/react-query";
import { ProjectList } from "../components/ProjectList";
import { Button } from "../../../shared/components/Button";
import { projectsClient } from "../clients/projectsClient";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { useProjectsQuery } from "../hooks/useProjectsQuery";
import { useSearchParams } from "react-router";
import { useCallback } from "react";
import { Select } from "../../../shared/components/Select";
import { ProjectSearchBar } from "../components/ProjectSearchBar";


export function ProjectListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useProjectsQuery(searchParams);
  const { page, pageSize } = query;


  const goToPage = useCallback((newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);


  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects', query],
    queryFn: () => projectsClient.getPaginated(query),
  });

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
        <CreateProjectModal />
      </div>
      <div className="flex flex-col items-center gap-6 mb-8 md:flex-row">
        <div className="flex-1 w-full md:w-auto">
          <ProjectSearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>

        <div className="flex flex-row gap-6 flex-1 w-full md:w-auto">
          <Select
            value={searchParams.get('sortBy') || 'createdAt'}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('sortBy', e.target.value);
              setSearchParams(newParams);
            }}
          >
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
            <option value="title">Title</option>
          </Select>

          <Select
            value={searchParams.get('sortOrder') || 'ASC'}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('sortOrder', e.target.value);
              setSearchParams(newParams);
            }}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </Select>
        </div>
      </div>
      <ProjectList
        data={data}
        isLoading={isLoading}
        isError={isError}
        pageSize={pageSize}
      />
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          onClick={() => goToPage(Math.max(page - 1, 1))}
          disabled={!data || data.currentPage <= 1}
          size="sm"
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {data?.currentPage ?? '-'} of {data?.totalPages ?? '-'}
        </span>

        <Button
          onClick={() => goToPage(Math.min(page + 1, data?.totalPages ?? page))}
          disabled={!data || data.currentPage >= data.totalPages}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
