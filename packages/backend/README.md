# Project Management App – Backend

## Features

- **RESTful API** – Clean and well-structured endpoints for interacting with users, projects, and tasks  
- **JWT Authentication** – Secure login and token-based session management  
- **Role-Based Access Control** – Differentiate between regular users, project managers, and admins  
- **Ownership-Based Permissions** – Only owners or assigned users can update their resources  
- **Fancy Swagger Docs** – Fully documented API with interactive UI (available at `/api/swagger`)

## Running the Backend (Node)

1. Clone the repo and navigate into the backend directory:

  ```
  git clone https://github.com/YouPiterOn/project-management-app.git
  cd project-management-app/packages/backend
  ```

2. Install dependencies

  ```
  yarn install
  ```

3. Setup postgres database

3. Create `.env.development` file and fill the fields from default `.env`

4. Run in development mode

  ```
  yarn run dev
  ```

5. Check out swagger on `http://localhost:PORT/swagger`
