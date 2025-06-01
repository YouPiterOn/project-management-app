import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksClient } from '../../tasks/clients/tasksClient';
import TaskBoard from '../../tasks/components/TaskBoard';
import { type TaskStatus } from '../../tasks/schemas';
import { useParams } from 'react-router';
import { useAuth } from '../../auth/contexts/AuthContext';
import { projectsClient } from '../clients/projectsClient';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectWithTasks', projectId],
    queryFn: () => projectsClient.getByIdWithTasks(projectId!),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      tasksClient.patchStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectWithTasks', projectId] });
    },
  });

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-row justify-between"></div>
      <TaskBoard
        isLoading={isLoading}
        isError={isError}
        tasks={data?.tasks}
        onStatusChange={(taskId, newStatus) => {
          updateStatusMutation.mutate({ taskId, status: newStatus });
        }}
        currentUserId={user?.id}
        projectOwnerId={data?.id}
      />
    </div>
  );
}
