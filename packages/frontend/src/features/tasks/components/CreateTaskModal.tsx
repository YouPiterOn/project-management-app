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

interface CreateTaskModalProps {
  projectId: string;
  onSuccess: () => void;
}

export function CreateTaskModal({ projectId, onSuccess }: CreateTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [assigneeId, setAssigneeId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateTaskFormValues) =>
      tasksClient.create({
        title: data.title,
        description: data.description,
        projectId,
        assigneeId: assigneeId || undefined,
      }),
    onSuccess: () => {
      onSuccess();
      setIsOpen(false);
      reset();
      setAssigneeId(null);
    },
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New Task</Button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-background p-6 rounded-xl shadow-lg w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>New Task</h2>
            <form onSubmit={handleSubmit(values => mutate(values))} className='space-y-4'>
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

              {error && (
                <p className='text-sm text-destructive text-center'>
                  {error instanceof Error ? error.message : 'An unexpected error occurred.'}
                </p>
              )}

              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                    setAssigneeId(null);
                  }}
                  variant='outline'
                >
                  Cancel
                </Button>
                <Button type='submit'>{isPending ? 'Creating...' : 'Create'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
