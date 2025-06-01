# Project Management App

- Create and manage projects

- Assign tasks to team members

- Track progress and completion status

## Features

- User authentication and role-based access

- Create, edit, and delete projects

- Create tasks and assign them to other users

- Track task progress

- REST API and responsive frontend

## [Backend readme](packages/backend/README.md)

## Quick Start with [Docker](https://www.docker.com/products/docker-desktop/)

1. Clone the repository

  ```
  git clone https://github.com/YouPiterOn/project-management-app.git
  cd project-management-app
  ```

2. Start the app with Docker Compose

  ```
  docker-compose up --build
  ```

3. Visit the app

  ```
  http://localhost/
  ```

## Dev Start

1. Setup backend by instruction in [readme](packages/backend/README.md)

2. Run monorepo in root with yarn

  ```
  yarn run dev
  ```

3. Visit the app on `http://localhost:5173/`