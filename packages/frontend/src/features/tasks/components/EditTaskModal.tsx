import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { FormField } from '../../../shared/components/FormField';
import { FormTextarea } from '../../../shared/components/FormTextarea';
import { Button } from '../../../shared/components/Button';

import { createTaskFormSchema, type CreateTaskFormValues } from '../schemas';
import { tasksClient } from '../clients/tasksClient';
import { UserSearchSelect } from '../../users/components/UserSearchSelect';
import { type TaskStatus } from '../schemas';
import type { TaskToEdit } from '../types';
import { Select } from '../../../shared/components/Select';

interface EditTaskModalProps {
  task: TaskToEdit;
  onSuccess: () => void;
  onCancel: () => void;
}

const statusOptions: TaskStatus[] = ['todo', 'in_progress', 'done'];

export function EditTaskModal({ task, onSuccess, onCancel }: EditTaskModalProps) {
  const [assigneeId, setAssigneeId] = useState<string | undefined>(undefined);
  const [newStatus, setNewStatus] = useState<TaskStatus>(task.status);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateTaskFormValues) =>
      tasksClient.update(task.id, {
        title: data.title,
        description: data.description,
        assigneeId: assigneeId || undefined,
        status: newStatus,
      }),
    onSuccess: () => {
      onSuccess();
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => tasksClient.remove(task.id),
    onSuccess: () => {
      onSuccess();
      reset();
    },
  });

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-background p-6 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Edit Task</h2>
        <form
          onSubmit={handleSubmit(values => updateMutation.mutate(values))}
          className='space-y-4'
        >
          <FormField
            id='title'
            label='Title'
            type='text'
            error={errors.title}
            register={register('title')}
          />

          <FormTextarea
            id='description'
            label='Description'
            rows={4}
            error={errors.description}
            register={register('description')}
          />

          <UserSearchSelect onSelect={value => setAssigneeId(value)} />

          <Select
            id='status'
            label='Status'
            value={newStatus}
            onChange={e => setNewStatus(e.target.value as TaskStatus)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </Select>

          {updateMutation.error && (
            <p className='text-sm text-destructive text-center'>
              {updateMutation.error instanceof Error
                ? updateMutation.error.message
                : 'An unexpected error occurred.'}
            </p>
          )}

          {deleteMutation.error && (
            <p className='text-sm text-destructive text-center'>
              {deleteMutation.error instanceof Error
                ? deleteMutation.error.message
                : 'An unexpected error occurred.'}
            </p>
          )}

          <div className='flex flex-row justify-between'>
            <Button type='button' variant='destructive' onClick={() => deleteMutation.mutate()}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
            <div className='flex gap-2'>
              <Button
                type='button'
                onClick={() => {
                  onCancel();
                  reset();
                }}
                variant='outline'
              >
                Cancel
              </Button>
              <Button type='submit'>{updateMutation.isPending ? 'Saving...' : 'Save'}</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
