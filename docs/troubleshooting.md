# Start-up Troubleshooting

Error: `ModuleNotFoundError: No module named 'fastapi'`

Try: `pip install fastapi uvicorn`

#

Error: `uvicorn module not found`

Try: `pip install --user uvicorn`

#

If the app still does not run after installing the requirements file, you may need to run the following command to set up FastAPI and Uvicorn (to run server)

`python -m pip install fastapi uvicorn[standard]`
