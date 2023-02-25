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
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/crossings", response_model=List[schemas.Crossing])
def read_crossings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    crossings = crud.get_crossings(db, skip=skip, limit=limit)
    return crossings


@app.get("/schedules", response_model=List[schemas.Schedule])
def read_schedules(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    schedules = crud.get_schedules(db, skip=skip, limit=limit)
    return schedules


@app.get("/ports", response_model=List[schemas.Port])
def read_ports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ports = crud.get_ports(db, skip=skip, limit=limit)
    return ports


@app.get("/ports/{port_id}", response_model=schemas.Port)
def read_port(port_id: str, db: Session = Depends(get_db)):
    port = crud.get_port(db, port_id=port_id)
    if port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return port


@app.get("/entities", response_model=List[schemas.Entity])
def read_entities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    entities = crud.get_entities(db, skip=skip, limit=limit)
    return entities


@app.get("/prices", response_model=List[schemas.Price])
def read_prices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prices = crud.get_prices(db, skip=skip, limit=limit)
    return prices


@app.get("/bookings", response_model=List[schemas.Booking])
def read_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings = crud.get_bookings(db, skip=skip, limit=limit)
    return bookings


@app.get("/bookings/{booking_id}", response_model=List[schemas.Booking])
def read_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = crud.get_booking(db, booking_id=booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@app.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db=db, booking=booking)


@app.get("/ferries", response_model=List[schemas.Ferry])
def read_ferries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ferries = crud.get_ferries(db, skip=skip, limit=limit)
    return ferries


@app.get("/users", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users
