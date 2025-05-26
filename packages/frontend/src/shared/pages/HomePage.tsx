import { PlusCircle, ListTodo } from 'lucide-react';
import { LinkButton } from '../components/Button';

export function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="max-w-3xl mx-auto flex flex-col text-center items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Project Management App</h1>
          <p className="text-xl text-gray-500 mb-8">
            Organize your projects and tasks in one place
          </p>

          <div className="flex flex-col min-w-60 gap-4 sm:flex-row sm:justify-between">
            <LinkButton to="/signup" size="lg">
              Sign Up
            </LinkButton>
            <LinkButton to="/signin" size="lg" variant="outline">
              Sign In
            </LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="border rounded-xl shadow-sm p-6 bg-white">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Manage Projects</h2>
              <p className="text-sm text-gray-500">Create and organize your projects</p>
            </div>
            <p className="mb-4">Create new projects, and track progress all in one place.</p>
            <LinkButton to="/projects">
              <div className="flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                View Projects
              </div>
            </LinkButton>
          </div>

          <div className="border rounded-xl shadow-sm p-6 bg-white">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Track Tasks</h2>
              <p className="text-sm text-gray-500">Organize tasks within your projects</p>
            </div>
            <p className="mb-4">
              Create tasks, assign them to team members, and update their status as work progresses.
            </p>
            <LinkButton to="/projects/new">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Create Project
              </div>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
