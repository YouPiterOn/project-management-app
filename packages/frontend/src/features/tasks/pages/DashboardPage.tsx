import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksClient } from '../../tasks/clients/tasksClient';
import TaskBoard from '../../tasks/components/TaskBoard';
import { type TaskStatus } from '../../tasks/schemas';
import { useAuth } from '../../auth/hooks/useAuth';

export function DashboardPage() {
  const { user } = useAuth();
  if (user === null) throw new Error('Use page only in protected route');

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myTasks', user.id],
    queryFn: () => {
      return tasksClient.getPaginated({
        sortBy: 'createdAt',
        sortOrder: 'ASC',
        page: 1,
        pageSize: 50,
        assigneeId: user.id,
      });
    },
    enabled: !!user?.id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      tasksClient.patchStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myTasks', user.id] });
    },
  });

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Tasks</h1>
      </div>

      <TaskBoard
        isLoading={isLoading}
        isError={isError}
        tasks={data?.items}
        onStatusChange={(taskId, newStatus) => {
          updateStatusMutation.mutate({ taskId, status: newStatus });
        }}
        currentUserId={user?.id}
        projectOwnerId={undefined} // You can omit or handle differently
      />
    </div>
  );
}
