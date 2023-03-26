# Ferry Reservation App

Taking inspriation (and frustration) from the Government of NL's ferry services, our group has decided to create a ferry reservation web application. It allows users to view the ferry schedule much easier and enables the additional reservation functionality. The app allows users to search for their desired crossing, make a booking, as well as check the status of their booking. In the next iteration, the app will include email reservation confirmation, and cancelling bookings. 

**FOR DEMO: SAMPLE DATA ONLY INCLUDES CROSSINGS ON MAY 1 2023, and MAY 6, 2023**

## Docs

Project documentation and design processes can be found in the [docs](./docs/) folder (see Table of Contents below for details and links). We created this library to track design decisions/processes, justifications for certain design choices, and miscellaneous project documentation. We have broken the docs into two sections: Docs for Dr. Vardy, and Docs for the Devs. Docs for Dr. Vardy consists of docs that we felt were relevant to the course and would help contextualize our design decisions. It is certainly not required reading, but we thought it would be nice to have in case you are curious. Docs for Devs consists of useful links, troubleshooting help, and documentation from the planning phase. 

### Docs for Dr. Vardy

| Link | Description |
| --- | --- |
| [Current Database](docs/database-tables.md) | The format of the desired/current database tables. |
| [Use Cases](docs/use-cases.md) | Use cases from project proposal. Initial cases have been implemented successfully. |
| [ORM](docs/orm.md) | What is an ORM? Why are we using an ORM? |
| [Demo Screenshots](docs/demo.md) | Demo screenshots in case the app does not launch. |

### Docs for Devs

| Link | Description |
| --- | --- |
| [Sample Stacks](docs/sample-stack.md) | We kept a note of the stacks we came up with during brainstorming. |
| [Current Stack Setup](docs/cole-stack-setup-steps.md) | Detailed steps taken during initial setup of the current stack. |
| [Code Formatting](docs/code-formatting.md) | We used a Python code formatter to ensure consistent .py file code styling. |
| [Middleware](docs/middleware.md) | CORSMiddleware was used to make cross-origin requests. |
| [Backend](docs/backend.md) | Additional notes for backend setup and troubleshooting. |
| [Vercel and Next.js](docs/vercel-nextjs.md) | Future deployment with Vercel and more Next.js info. |
| [Ideas](docs/ideas.md) | List of unfiltered new feature ideas we could implement after the course is over. |
| [Reading List](docs/reading-list.md) | Useful links for future/past work |

## How to run

To run the application, two terminal instances will be needed; one for the backend, and one for the frontend.

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
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
