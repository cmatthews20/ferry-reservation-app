## Backend Setup (Umama):

- Run the following to set up FastAPI and Uvicorn (to run server)

`python -m pip install fastapi uvicorn[standard]`

*Troubleshooting: Can try `pip install --user uvicorn` when error thrown for uvicorn module not found*

- To run the server - go to the backend directory and run the following code (since api.py has the api, we use api:app):

`python -m uvicorn api:app --reload`

- Note: The command `uvicorn api:app` refers to:
    - api: the file api.py (the Python "module").
    - app: the object created inside of api.py with the line app = FastAPI().
    - --reload: make the server restart after code changes. Only use for development.

### Database Set-up
- Created sample data in CSV format and imported it in to the created table using DB Browser for SQLite
- Sample data can be used by all aspects of the application to simulate real-life application
