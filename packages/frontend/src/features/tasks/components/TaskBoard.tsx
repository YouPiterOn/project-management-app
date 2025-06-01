import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { TaskColumn } from './TaskColumn';
import { TaskCard, TaskCardSkeleton } from './TaskCard';
import type { PaginatedTask, TaskStatus } from '../schemas';
import { useMemo, useState } from 'react';
import { filterTasks } from '../utils';
import type { TaskToEdit } from '../types';
import { EditTaskModal } from './EditTaskModal';
import { useQueryClient } from '@tanstack/react-query';

interface TaskBoardProps {
  tasks?: PaginatedTask[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  isError: boolean;
  isLoading: boolean;
  currentUserId?: string;
  projectOwnerId?: string;
}

export default function TaskBoard({
  tasks,
  onStatusChange,
  isError,
  isLoading,
  currentUserId,
  projectOwnerId,
}: TaskBoardProps) {
  const queryClient = useQueryClient();

  const [taskToEdit, setTaskToEdit] = useState<TaskToEdit | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onStatusChange(taskId, status);
    }
  };

  const { todoTasks, inProgressTasks, doneTasks } = useMemo(() => filterTasks(tasks), [tasks]);

  if (isError) {
    return (
      <div className="text-destructive text-sm">Failed to load tasks. Please try again later.</div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          icon={<AlertCircle className="h-5 w-5" />}
          count={todoTasks.length}
          onDrop={e => handleDrop(e, 'todo')}
        >
          {isLoading ? (
            <TaskCardSkeleton />
          ) : (
            todoTasks.map(task => (
              <TaskCard
                key={task.id}
                editable={
                  currentUserId
                    ? task.assignee?.id === currentUserId || projectOwnerId === currentUserId
                    : false
                }
                onDragStart={e => handleDragStart(e, task.id)}
                onTitleClick={() => setTaskToEdit(task)}
                title={task.title}
                description={task.description}
                assignee={task.assignee}
              />
            ))
          )}
        </TaskColumn>

        <TaskColumn
          title="In Progress"
          icon={<Clock className="h-5 w-5" />}
          count={inProgressTasks.length}
          onDrop={e => handleDrop(e, 'in_progress')}
        >
          {isLoading ? (
            <TaskCardSkeleton />
          ) : (
            inProgressTasks.map(task => (
              <TaskCard
                key={task.id}
                editable={
                  currentUserId
                    ? task.assignee?.id === currentUserId || projectOwnerId === currentUserId
                    : false
                }
                onDragStart={e => handleDragStart(e, task.id)}
                onTitleClick={() => setTaskToEdit(task)}
                title={task.title}
                description={task.description}
                assignee={task.assignee}
              />
            ))
          )}
        </TaskColumn>

        <TaskColumn
          title="Done"
          icon={<CheckCircle2 className="h-5 w-5" />}
          count={doneTasks.length}
          onDrop={e => handleDrop(e, 'done')}
        >
          {isLoading ? (
            <TaskCardSkeleton />
          ) : (
            doneTasks.map(task => (
              <TaskCard
                key={task.id}
                editable={
                  currentUserId
                    ? task.assignee?.id === currentUserId || projectOwnerId === currentUserId
                    : false
                }
                onDragStart={e => handleDragStart(e, task.id)}
                onTitleClick={() => setTaskToEdit(task)}
                title={task.title}
                description={task.description}
                assignee={task.assignee}
              />
            ))
          )}
        </TaskColumn>
      </div>

      {taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onSuccess={() => {
            queryClient.invalidateQueries();
            setTaskToEdit(null);
          }}
          onCancel={() => setTaskToEdit(null)}
        />
      )}
    </div>
  );
}
