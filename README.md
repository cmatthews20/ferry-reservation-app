# Ferry Reservation App

## TODO

//TODO: Finish instructions for running project and dependency installation

//TODO: Update requirements.txt file for `pip install -r /path/to/requirements.txt`, and installation requirements

## How to run

To run the application, 2 terminals will be needed; one for the backend, and one for the frontend.

### Backend

1. Navigate to the `backend` folder: 

```bash
cd backend
```

2. Install backend dependencies:

```bash
pip install -r requirements.txt
```

3. Run the API with Uvicorn:

```bash
uvicorn api:app --reload
```

### Frontend

1. Navigate to the `frontend` folder: 

```bash
cd frontend
```

2. Install frontend dependencies from `package.json`

```bash
npm i
```

3. Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Docs

Project documentation and design processes can be found in the [docs](./docs/) folder (see table of contents below for details and links). We created this library to track design decisions/processes, justifications for certain design choices, and miscellaneous project documentation.

| Link | Description |
| --- | --- |
| [Sample Stacks](docs/sample-stack.md) | We kept a note of the stacks we came up with during brainstorming. |
| [Current Stack Setup](docs/cole-stack-setup-steps.md) | Detailed steps taken during initial setup of the current stack. |
| [Current Database](docs/database-tables.md) | The format of the current database tables. |
| [ORM](docs/orm.md) | What is an ORM? Why are we using an ORM? |
| [Code Formatting](docs/code-formatting.md) | We used a Python code formatter to ensure consistent .py file code styling. |
| [Middleware](docs/middleware.md) | CORSMiddleware was used to make cross-origin requests. |
| [Backend](docs/backend.md) | Additional notes for backend setup and troubleshooting. |
| [Vercel and Next.js](docs/vercel-nextjs.md) | Future deployment with Vercel and more Next.js info. |
