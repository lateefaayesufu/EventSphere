# EventSphere

EventSphere is a full-stack event management platform with a React frontend and a Node.js/Express.js backend.

## Live Version

-   **Frontend:** [https://eventspheres.vercel.app](https://eventspheres.vercel.app)
-   **Backend:** [https://eventsphere-txk2.onrender.com/](https://eventsphere-txk2.onrender.com/)
-   **API Docs:** [https://eventsphere-txk2.onrender.com/api-docs](https://eventsphere-txk2.onrender.com/api-docs)

## Project Structure

The repository is a monorepo divided into two main parts:

-   **`backend/`**: Contains the Node.js/Express.js server, API logic, and database schema.
-   **`frontend/`**: Contains the React application.

## Prerequisites

You will need Node.js and a package manager (`npm`, `yarn`, or `pnpm`) installed on your system.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd EventSphere
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Development

To run the development servers, you will need to run the `dev` command in both the `backend` and `frontend` directories.

### Backend

To start the development server with hot-reloading, run the following command in the `backend/` directory:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Frontend

To start the development server, run the following command in the `frontend/` directory:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Build

### Backend

To compile the TypeScript code to JavaScript, run the following command in the `backend/` directory:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Frontend

To build the project for production, run the following command in the `frontend/` directory:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

ADMIN USER DETAILS: 
For development and testing purposes, an administrator account is created. The details for this user are as follows:

{ 
id: 'e292f1e7-20ce-4555-828f-b011dd1c75dc', 
fullName: 'Admin User', 
email: 'admin@example.com', 
contactNumber: '00000000000', 
username: 'admin', 
password: 'adminpassword',
 role: 'ADMIN', 
createdAt: 2025-09-12T10:57:50.555Z,
 updatedAt: 2025-09-12T10:57:50.555Z 
}

Note: These details are for a pre-configured account used in the system's setup.

