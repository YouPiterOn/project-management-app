import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksClient } from '../../tasks/clients/tasksClient';
import TaskBoard from '../../tasks/components/TaskBoard';
import { type TaskStatus } from '../../tasks/schemas';
import { useNavigate, useParams } from 'react-router';
import { projectsClient } from '../clients/projectsClient';
import { CreateTaskModal } from '../../tasks/components/CreateTaskModal';
import { useAuth } from '../../auth/hooks/useAuth';
import { Button } from '../../../shared/components/Button';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  if (projectId === undefined) throw new Error('Use page only in context with projectId param.');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectWithTasks', projectId],
    queryFn: () => projectsClient.getByIdWithTasks(projectId),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      tasksClient.patchStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectWithTasks', projectId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => projectsClient.remove(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/projects');
    },
  });

  return (
    <div className='w-full max-w-5xl'>
      <div className='flex flex-row justify-between mb-4'>
        <h1 className='text-3xl font-bold tracking-tight mb-2'>
          {isLoading ? 'Loading...' : isError ? 'Error' : data?.title}
        </h1>
        {!isLoading && !isError && data?.owner.id === user?.id && (
          <CreateTaskModal
            projectId={projectId}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['projectWithTasks', projectId] });
            }}
          />
        )}
      </div>
      <TaskBoard
        isLoading={isLoading}
        isError={isError}
        tasks={data?.tasks}
        onStatusChange={(taskId, newStatus) => {
          updateStatusMutation.mutate({ taskId, status: newStatus });
        }}
        currentUserId={user?.id}
        projectOwnerId={data?.owner.id}
      />
      {!isLoading && !isError && (
        <div className='mt-4'>
          <div className='flex flex-row justify-between mb-2'>
            <h3 className='text-xl font-bold tracking-tight'>Description:</h3>
            <Button
              type='button'
              variant='destructive'
              size='sm'
              onClick={() => deleteMutation.mutate()}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
          <p className='text-base text-muted-foreground break-words whitespace-pre-wrap'>
            {data?.description}
          </p>
        </div>
      )}
    </div>
  );
}
