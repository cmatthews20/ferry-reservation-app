'''
This is the main API file for back-end endpoint management.
FastAPI is a modern, high-performance web framework for building APIs with Python.
We are using FastAPI to build the backend of our application to make calls to and from the database.
Doing this allows us to read and write to the database and helps the front-end components use the data 
in the SQLite database.
'''
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello there - Ferry Reservation API is UP"}
