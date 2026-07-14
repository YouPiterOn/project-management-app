# User Story Mapping

## Activities

- Access the application securely
- Manage projects
- Manage project tasks
- Track personal work
- Monitor project progress

## Steps

- Sign in to the application
- View available projects
- Search for a project
- Create a project
- Edit project details
- Delete a project
- Create a task
- Assign a task to a team member
- Edit task details
- Update task progress
- View assigned tasks on a personal Kanban board
- View all project tasks on a project Kanban board

## Release 1
As a user, I want to authenticate with the application so that only authorized users can access projects and tasks.
As a user, I want to view a searchable list of projects so that I can quickly find the project I need to work on.
As a user, I want to create, edit, and delete projects so that I can organize work effectively.
As a user, I want to create tasks and assign them to team members so that responsibilities are clearly distributed.
As a user, I want to view a personal dashboard with a Kanban board of my assigned tasks so that I can easily track my own work.
As a user, I want to open a task in a modal window and edit its details so that I can keep task information up to date.
As a user, I want to update a task's progress so that its current completion status is accurately reflected.
As a user, I want to view a project's Kanban board so that I can monitor the progress of all tasks within that project.

## Release 2
As a user, I want to add due dates to tasks so that upcoming work can be planned and prioritized.
As a user, I want to set task priorities so that the most important work is easy to identify.
As a user, I want to comment on tasks so that team members can discuss work in context.
As a user, I want to receive notifications when tasks are assigned to me or updated so that I can respond to changes quickly.
As a user, I want to filter project tasks by assignee, status, priority, and due date so that I can focus on the work that matters most.
As a user, I want to invite team members to a project so that the right people can collaborate on shared work.
As a user, I want to see the members of a project so that I understand who is involved and responsible for the work.
As a user, I want to view overdue tasks on my dashboard so that I can address delayed work first.

# Stories

### Secure User Authentication
As a user, I want to authenticate with the application so that only authorized users can access projects and tasks.

Acceptance Criteria:
- Given I am not signed in, when I open the application, then I am prompted to sign in before accessing project or task data.
- Given I enter valid credentials, when I submit the sign-in form, then I am authenticated and taken to the application.
- Given I enter invalid credentials, when I submit the sign-in form, then I see an error message and remain unauthenticated.
- Given I am signed in, when I sign out, then I can no longer access protected project or task pages.

Functional Test Case:
- Test case description: Verify that a user can sign in with valid credentials and access protected project and task pages.
- Prerequisites: The application is running, the user account exists, and the user is not signed in.
- Test steps:
  1. Open the application.
  2. Enter valid email and password.
  3. Submit the sign-in form.
  4. Open the projects page.
  5. Sign out from the application.
  6. Try to open the projects page again.
- Test data: Email: `user@example.com`; Password: `Password123`.
- Expected Result: The user is signed in and can access the projects page; after signing out, the user is redirected to sign in before accessing protected pages.
- Priority: High

### Searchable Project List
As a user, I want to view a searchable list of projects so that I can quickly find the project I need to work on.

Acceptance Criteria:
- Given I am signed in, when I open the projects page, then I see a list of projects I can access.
- Given projects are available, when I enter a search term, then the list only shows projects matching that term.
- Given no projects match my search, when the filtered results are shown, then I see an empty state message.
- Given I select a project from the list, when the project opens, then I can view that project's details and tasks.

Functional Test Case:
- Test case description: Verify that a signed-in user can search the project list and open a matching project.
- Prerequisites: The user is signed in and has access to multiple projects.
- Test steps:
  1. Open the projects page.
  2. Confirm that the project list is displayed.
  3. Enter a project name in the search field.
  4. Review the filtered search results.
  5. Select a matching project.
  6. Enter a search term that does not match any project.
- Test data: Existing project: `Website Redesign`; Non-matching search term: `No Matching Project`.
- Expected Result: Matching projects are displayed for the valid search term, the selected project opens successfully, and an empty state message is shown for the non-matching search term.
- Priority: High

### Project Management
As a user, I want to create, edit, and delete projects so that I can organize work effectively.

Acceptance Criteria:
- Given I am signed in, when I create a project with valid details, then the project is saved and appears in the project list.
- Given I am viewing an existing project, when I update its details, then the changes are saved and displayed.
- Given I choose to delete a project, when I confirm the deletion, then the project is removed from the project list.
- Given required project details are missing, when I try to save the project, then I see validation feedback.

Functional Test Case:
- Test case description: Verify that a signed-in user can create, edit, and delete a project.
- Prerequisites: The user is signed in and has permission to manage projects.
- Test steps:
  1. Open the projects page.
  2. Create a new project with valid details.
  3. Confirm that the project appears in the project list.
  4. Open the project and update its details.
  5. Save the changes.
  6. Delete the project and confirm the deletion.
  7. Try to create a project without required details.
- Test data: Project name: `Mobile App Launch`; Updated project name: `Mobile App Launch Plan`; Empty project name for validation check.
- Expected Result: The project is created, updated details are saved and displayed, the project is removed after deletion, and validation feedback is shown when required details are missing.
- Priority: High

### Task Assignment
As a user, I want to create tasks and assign them to team members so that responsibilities are clearly distributed.

Acceptance Criteria:
- Given I am viewing a project, when I create a task with valid details, then the task is added to that project.
- Given team members are available, when I assign a task to a member, then that member is shown as the task assignee.
- Given a task has an assignee, when the task appears on boards or task lists, then the assignee is visible.
- Given required task details are missing, when I try to save the task, then I see validation feedback.

Functional Test Case:
- Test case description: Verify that a user can create a task and assign it to a team member.
- Prerequisites: The user is signed in, a project exists, and at least one team member is available for assignment.
- Test steps:
  1. Open an existing project.
  2. Create a new task with valid details.
  3. Select a team member as the assignee.
  4. Save the task.
  5. Confirm that the task appears in the project task list or board.
  6. Try to create another task without required details.
- Test data: Project: `Website Redesign`; Task title: `Create homepage wireframe`; Assignee: `Alex Johnson`; Empty task title for validation check.
- Expected Result: The task is created under the selected project, the selected team member is displayed as the assignee, and validation feedback is shown when required task details are missing.
- Priority: High

### Personal Task Dashboard
As a user, I want to view a personal dashboard with a Kanban board of my assigned tasks so that I can easily track my own work.

Acceptance Criteria:
- Given I am signed in, when I open my dashboard, then I see tasks assigned to me.
- Given my assigned tasks have different statuses, when the dashboard loads, then tasks are grouped into Kanban columns by status.
- Given I have no assigned tasks, when I open my dashboard, then I see an empty state message.
- Given a task appears on my dashboard, when I select it, then I can view its details.

Functional Test Case:
- Test case description: Verify that a signed-in user can view assigned tasks grouped by status on the personal Kanban dashboard.
- Prerequisites: The user is signed in and has assigned tasks with different statuses.
- Test steps:
  1. Open the personal dashboard.
  2. Review the Kanban board columns.
  3. Confirm that assigned tasks appear in the correct status columns.
  4. Select an assigned task.
  5. Review the task details.
  6. Sign in as a user with no assigned tasks and open the dashboard.
- Test data: User with tasks: `user@example.com`; Task statuses: `To Do`, `In Progress`, `Done`; User without tasks: `empty.user@example.com`.
- Expected Result: Assigned tasks are displayed in the correct Kanban columns, selected task details are shown, and an empty state message is displayed for a user with no assigned tasks.
- Priority: High
