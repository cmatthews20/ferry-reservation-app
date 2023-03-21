# Ferry Reservation App

# TODO

//TODO: Finish instructions for running project and dependency installation
//TODO: Update requirements.txt file for `pip install -r /path/to/requirements.txt`, and installation requirements

## How to run

To run the application, 2 terminals will be needed; one for the backend, and one for the frontend.

### Backend

1. Navigate to the `backend` folder: 

```bash
cd backend
```

2. Install dependencies:

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

2. install the frontend dependencies from `package.json`

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

# Docs

Project documentation and design processes can be found in the [docs](./docs/) folder (see table of contents below for details and links). We created this library to track design decisions/processes, justifications for certain design choices, and miscellaneous project documentation.

| Link | Description |
| --- | --- |
| [Current Stack Setup](docs/cole-stack-setup-steps.md) | _ |
| [Current Database](docs/database-tables.md) | _ |
| [Next.js Autogenerated README](docs/nextjs-default.md) | _ |
| [Sample Stacks](docs/sample-stack.md) | _ |
