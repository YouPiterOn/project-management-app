import { User } from 'lucide-react';
import { Link } from 'react-router';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  owner: {
    id: string;
    name: string;
  };
}

export function ProjectCard({ id, title, description, owner }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${id}`}
      className="group bg-background text-foreground border-2 border-foreground rounded-xl shadow-sm px-6 py-3 flex flex-col justify-between transition hover:shadow-md"
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1 group-hover:underline transition underline-offset-4">
          {title}
        </h2>
        <p className="max-w-full text-sm text-muted-foreground overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
      <div className="flex flex-row items-center gap-1">
        <User className="h-4 w-4" />
        <h3 className="text-md">{owner.name}</h3>
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
