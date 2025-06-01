import type { ReactNode } from 'react';

interface TaskColumnProps {
  title: string;
  icon: ReactNode;
  count: number;
  children: ReactNode;
  onDrop: (e: React.DragEvent) => void;
}

export function TaskColumn({ title, icon, count, children, onDrop }: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className='flex flex-col md:h-[calc(100vh-240px)] md:min-h-[500px]'
      onDrop={onDrop}
      onDragOver={handleDragOver}
    >
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-2'>
          {icon}
          <h3 className='font-semibold'>{title}</h3>
          <span className='bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full'>
            {count}
          </span>
        </div>
      </div>

      <div className='flex-1 bg-muted/50 rounded-xl p-3 overflow-y-auto'>
        <div className='flex flex-col gap-3'>
          {children}
          <div className='h-2'></div>
        </div>
      </div>
    </div>
  );
}
