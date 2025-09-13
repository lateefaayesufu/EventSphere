# Repository Guidelines

This document outlines the guidelines for contributing to this project. Please read it carefully before making any contributions.

## Project Structure & Module Organization

The repository is divided into two main parts: `backend` and `frontend`.

-   **`backend/`**: Contains the Node.js/Express.js server, API logic, and database schema.
    -   `backend/src/`: Source code for the backend application.
        -   `controllers/`: API route handlers.
        -   `middlewares/`: Express middleware.
        -   `routes/`: API route definitions.
        -   `utils/`: Utility functions and error handling.
        -   `validation/`: Request validation schemas.
    -   `backend/prisma/`: Prisma schema and database migrations.
-   **`frontend/`**: Contains the React application.
    -   `frontend/src/`: Source code for the frontend application.
        -   `admin/`: Admin panel components and pages.
        -   `assets/`: Static assets like images and icons.
        -   `components/`: Reusable UI components.
        -   `pages/`: Main application pages.
        -   `participant/`: Participant-specific components and pages.
    -   `frontend/public/`: Publicly accessible assets.

## Build, Test, and Development Commands

This project uses `pnpm` for package management. Ensure you have `pnpm` installed globally.

### Backend Commands (in `backend/` directory)

-   `pnpm install`: Install backend dependencies.
-   `pnpm start`: Start the production server.
-   `pnpm dev`: Start the development server with hot-reloading.
-   `pnpm build`: Compile TypeScript to JavaScript.
-   `pnpm generate`: Generate Prisma client.
-   `pnpm migrate`: Run Prisma database migrations.
-   `pnpm reset-dev`: Reset the development database.

### Frontend Commands (in `frontend/` directory)

-   `pnpm install`: Install frontend dependencies.
-   `pnpm dev`: Start the development server.
-   `pnpm build`: Build the project for production.
-   `pnpm lint`: Run ESLint for code linting.
-   `pnpm preview`: Preview the production build locally.

## Coding Style & Naming Conventions

-   **Language**: TypeScript for backend, JavaScript (React) for frontend.
-   **Formatting**: Adhere to the existing code style. The frontend uses ESLint for linting. Please run `pnpm lint` in the `frontend/` directory before committing.
-   **Naming**:
    -   Variables and functions: `camelCase`.
    -   Classes and components: `PascalCase`.
    -   Constants: `UPPER_SNAKE_CASE`.
    -   File names: `kebab-case` for general files, `PascalCase.jsx`/`.tsx` for React components.
-   **Indentation**: Use 4 spaces for indentation.
