import type { PaginatedProjects } from "../schemas"
import { ProjectCard, ProjectCardSkeleton } from "./ProjectCard";

interface ProjectListProps {
  data?: PaginatedProjects;
  isLoading: boolean;
  isError: boolean;
  pageSize: number;
}

export function ProjectList({ data, isLoading, isError, pageSize }: ProjectListProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: pageSize }).map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    )
  }

  if (isError || !data) {
    return <p className="text-destructive">Failed to load projects.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.items.map((project, i) => (
        <ProjectCard
          key={i}
          {...project}
        />
      ))}
    </div>
  )
}