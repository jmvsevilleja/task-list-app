# Task List App

![Task List App Screenshot](/screenshot.png)
A full-stack task management application built with modern web technologies.

## Technologies

### Frontend (Web)

- React 18
- TypeScript
- Apollo Client
- React Router v6
- Tailwind CSS
- Shadcn/UI Components
- Zod (Form Validation)
- React Hook Form
- Lucide React Icons
- Sonner (Toast Notifications)

### Backend (API)

- Node.js
- Express
- GraphQL
- Apollo Server
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Bcrypt (Password Hashing)

## Features

- User Authentication (Login/Register)
- Task Management (Create, Read, Update, Delete)
- Form Validation
- Toast Notifications
- Protected Routes
- Dark/Light Theme Support

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Mysql
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/task-list-app.git
cd task-list-app
```

2. Install API dependencies

```bash
cd api
npm install
```

3. Install Web dependencies

```bash
cd web
npm install
```

4. Set up environment variables

- Create .env file in the api directory
- Create .env file in the web directory

5. Run database migrations

```bash
cd api
npx prisma migrate dev
```

Note: For production environments, always use `migrate deploy` instead of `migrate dev`.

6. Start the development servers

API:

```bash
cd api
npm run dev
```

Web:

```bash
cd web
npm run dev
```

7. Run the tests

```bash
cd api
npm test
```

## Project Structure

task-list-app/
├── api/ # Backend API
│ ├── prisma/ # Database schema and migrations
│ ├── src/ # Source files
│ └── package.json # API dependencies
│
└── web/ # Frontend application
├── public/ # Static files
├── src/ # Source files
└── package.json # Web dependencies
