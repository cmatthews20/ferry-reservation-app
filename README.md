# Ferry Reservation App

Taking inspiration (and frustration) from the Government of NL's ferry services, we (@cmatthews20, @Mepha89, @ShairYousuf) decided to create a ferry reservation and live alert web application. It allows users to view the ferry schedule much easier and enables additional reservation functionality. The app allows users to search for their desired crossing, make a booking, check the status of their booking, and cancel their booking. The app will also send an email confirmation when the user makes a booking. 

**FOR DEMO PURPOSES: SAMPLE DATA ONLY INCLUDES CROSSINGS ON MAY 1 2023, and MAY 6, 2023, FROM BELL ISLAND TO PORTUGAL COVE**

## Docs

Project documentation and design processes can be found in the [docs](./docs/) folder (see Table of Contents below for details and links). We created the docs to track design decisions/processes, justifications for certain design choices, and miscellaneous project documentation. We have broken the docs into two sections: Docs for Design, and Docs for Devs. Docs for Design consists of docs that we felt were technically relevant and would help contextualize our design decisions. Docs for Devs consists of useful links, troubleshooting help, and documentation from the planning phase. 

### Docs for Design

| Link | Description |
| --- | --- |
| [Troubleshooting](docs/troubleshooting.md) | Common error codes upon app startup and some possible fixes. |
| [Database Viewers](docs/database-viewers.md) | How to view the database if desired. |
| [Current Database](docs/database-tables.md) | The format of the desired/current database tables. |
| [Use Cases](docs/use-cases.md) | Use cases from project proposal. Final cases have been implemented successfully. |
| [ORM](docs/orm.md) | Why are we using an ORM? |
| [Demo Screenshots](docs/demo.md) | Demo screenshots in case the app does not launch. |

### Docs for Devs

| Link | Description |
| --- | --- |
| [Sample Stacks](docs/sample-stack.md) | We kept a note of the stacks we came up with during brainstorming. |
| [Current Stack Setup](docs/stack-setup-steps.md) | Detailed steps taken during initial setup of the current stack. |
| [Code Formatting](docs/code-formatting.md) | We used a Python code formatter to ensure consistent .py file code styling. |
| [Middleware](docs/middleware.md) | CORSMiddleware was used to make cross-origin requests. |
| [Backend](docs/backend.md) | Additional notes for backend setup and info. |
| [Vercel and Next.js](docs/vercel-nextjs.md) | Future deployment with Vercel and more Next.js info. |
| [Ideas and TODO](docs/ideas.md) | TODO list and unfiltered feature ideas we could implement in the future. |
| [Reading List](docs/reading-list.md) | Useful links for future/past work |

## How to run

To run the application, two terminal instances will be needed; one for the backend, and one for the frontend.

### Backend

If pip is not installed on your machine, follow [this](https://pip.pypa.io/en/stable/installation/) tutorial to install it.

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
python -m uvicorn api:app --reload
#or
uvicorn api:app --reload
```

4. (OPTIONAL) Go to the following endpoints to view the API documentation:

```bash
#For readable documentation
http://127.0.0.1:8000/redoc

#For testing
http://127.0.0.1:8000/docs
```

### Frontend

If npm is not installed on your machine, follow [this](https://phoenixnap.com/kb/install-node-js-npm-on-windows) tutorial to install it.

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
