"""
This is the main API file for back-end endpoint management.
FastAPI is a modern, high-performance web framework for building APIs with Python.
We are using FastAPI to build the backend of our application to make calls to and from the database.
Doing this allows us to read and write to the database and helps the front-end components use the data 
in the SQLite database.
"""

from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, schemas
from database import SessionLocal


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello there - Ferry Reservation API is UP"}


@app.get("/ports", response_model=List[schemas.Port])
def read_ports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ports = crud.get_ports(db, skip=skip, limit=limit)
    return ports


@app.get("/ports/{port_id}", response_model=schemas.Port)
def read_port(port_id: str, db: Session = Depends(get_db)):
    db_port = crud.get_port(db, port_id=port_id)
    if db_port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return db_port


@app.get("/crossings", response_model=List[schemas.Crossing])
def read_crossings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    crossings = crud.get_crossings(db, skip=skip, limit=limit)
    return crossings


@app.get("/entities", response_model=List[schemas.Entity])
def read_entities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    entities = crud.get_entities(db, skip=skip, limit=limit)
    return entities
