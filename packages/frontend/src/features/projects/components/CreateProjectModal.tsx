import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '../../../shared/components/FormField';
import { FormTextarea } from '../../../shared/components/FormTextarea';
import { Button } from '../../../shared/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProjectSchema, type CreateProjectValues } from '../schemas';
import { useMutation } from '@tanstack/react-query';
import { projectsClient } from '../clients/projectsClient';

export function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: CreateProjectValues) => projectsClient.create(data),
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create New Project</Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Project</h2>
            <form onSubmit={handleSubmit(values => mutate(values))} className="space-y-4">
              <FormField
                id="name"
                label="Title"
                type="text"
                error={errors.title}
                register={register('title', { required: 'Title is required' })}
              />

              <FormTextarea
                id="description"
                label="Description"
                rows={4}
                error={errors.description}
                register={register('description')}
              />

              {error && (
                <p className="text-sm text-destructive text-center">
                  {error instanceof Error ? error.message : 'An unexpected error occurred.'}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">{isPending ? 'Creating...' : 'Create'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
