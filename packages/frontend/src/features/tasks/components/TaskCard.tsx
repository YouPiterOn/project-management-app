import { User } from 'lucide-react';
import { Link } from 'react-router';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
  } | null;
  draggable?: boolean;
  onDragStart: (e: React.DragEvent) => void;
}

export function TaskCard({
  id,
  title,
  description,
  assignee,
  draggable = false,
  onDragStart,
}: TaskCardProps) {
  return (
    <div
      className={`bg-background border rounded-lg p-4 shadow-sm ${draggable && 'cursor-grab active:cursor-grabbing'}`}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start mb-2">
        <Link to={`/tasks/${id}`} className="font-medium text-foreground">
          {title}
        </Link>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{assignee?.name || ' - '}</span>
        </div>
      </div>
    </div>
  );
}

export function TaskCardSkeleton() {
  return (
    <div className="bg-muted border rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-2">
        <div className="h-4 w-2/3 bg-muted-foreground/40 rounded" />
      </div>

      <div className="h-3 w-full bg-muted-foreground/30 rounded mb-1" />
      <div className="h-3 w-5/6 bg-muted-foreground/30 rounded mb-3" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted-foreground/40 rounded-full" />
          <div className="h-3 w-8 bg-muted-foreground/30 rounded" />
        </div>
      </div>
    </div>
  );
}
