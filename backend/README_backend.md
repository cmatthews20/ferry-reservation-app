##Backend Setup (Umama):

- Run the following to set up FastAPI and Uvicorn (to run server)
`python -m pip install fastapi uvicorn[standard]`

*Troubleshooting: Can try `pip install --user uvicorn` when error thrown for uvicorn module not found*

- To run the server - go to the backend directory and run the following code (since api.py has the api, we use api:app):
`python -m uvicorn api:app --reload`
