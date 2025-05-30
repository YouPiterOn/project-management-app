import { PlusCircle, ListTodo } from 'lucide-react';
import { LinkButton } from '../components/Button';

export function HomePage() {
  return (
    <div className="w-full max-w-5xl">
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">Project Management App</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Organize your projects and tasks in one place
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-xl shadow-sm p-6 bg-background flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Manage Projects</h3>
            <p className="text-sm text-muted-foreground mb-4">Create and organize your projects</p>
            <p className="mb-6">Create new projects and track progress all in one place.</p>
          </div>
          <div className="flex flex-col gap-2">
            <LinkButton to="/projects">
              <div className="flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                View Projects
              </div>
            </LinkButton>
            <LinkButton to="/projects/new" variant="outline">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Create Project
              </div>
            </LinkButton>
          </div>
        </div>

        <div className="border rounded-xl shadow-sm p-6 bg-background flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Track Tasks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Organize tasks within your projects
            </p>
            <p className="mb-6">
              Create tasks, assign them to team members, and update their status as work progresses.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <LinkButton to="/dashboard">
              <div className="flex items-center gap-2">
                <ListTodo className="h-5 w-5" />
                My Dashboard
              </div>
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
