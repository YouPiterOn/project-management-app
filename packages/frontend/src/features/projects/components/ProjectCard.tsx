import { Link } from "react-router";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
}

export function ProjectCard({ id, title, description }: ProjectCardProps) {
  const shortDescription =
    description.length > 50 ? description.slice(0, 47) + "..." : description;

  return (
    <Link
      to={`/projects/${id}`}
      className="bg-background text-foreground border-2 border-foreground rounded-xl shadow-sm p-6 flex flex-col justify-between transition hover:shadow-md"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1 group-hover:underline underline-offset-4 transition">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {shortDescription}
        </p>
      </div>
      <div className="mt-auto pt-4 text-sm font-medium text-foreground underline-offset-4 hover:underline">
        View Project →
      </div>
    </Link>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="border-2 border-muted-foreground/40 rounded-xl shadow-sm p-6 flex flex-col justify-between animate-pulse bg-muted">
      <div className="mb-4 space-y-2">
        <div className="h-5 w-3/4 bg-muted-foreground/40 rounded" />
        <div className="h-4 w-full bg-muted-foreground/30 rounded" />
        <div className="h-4 w-5/6 bg-muted-foreground/30 rounded" />
      </div>
      <div className="h-8 w-24 bg-muted-foreground/20 rounded mt-auto pt-4" />
    </div>
  );
}