"""
This is the main API file for back-end endpoint management.
FastAPI is a modern, high-performance web framework for building APIs with Python.
We are using FastAPI to build the backend of our application to make calls to and from the database.
Doing this allows us to read and write to the database and helps the front-end components use the data 
in the SQLite database.
"""

from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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


@app.get("/")
async def root():
    return {"message": "Hello there - Ferry Reservation API is UP"}


@app.get("/crossings", response_model=List[schemas.Crossing])
def get_crossings_table(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    crossings_table = crud.read_crossings_table(db, skip=skip, limit=limit)
    if crossings_table == []:
        raise HTTPException(status_code=404, detail="Crossings table is empty")
    return crossings_table


@app.get("/crossings/{crossing_id}", response_model=List[schemas.Crossing])
def get_crossings_row(crossing_id: str, db: Session = Depends(get_db)):
    crossing = crud.read_crossing_by_id(db, crossing_id=crossing_id)
    if crossing is None:
        raise HTTPException(status_code=404, detail="Crossing not found")
    return crossing


@app.get("/schedules", response_model=List[schemas.Schedule])
def get_schedule(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    schedule_table = crud.read_schedule_table(db, skip=skip, limit=limit)
    if schedule_table == []:
        raise HTTPException(status_code=404, detail="Schedule table is empty")
    return schedule_table

@app.get("/schedules/{start_time}/{end_time}", response_model=List[schemas.Schedule])
def read_schedules_date(start_time: str , end_time: str,skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    schedules = crud.get_schedules_date(db,start_time=start_time, end_time=end_time, skip=skip, limit=limit)
    return schedules

@app.get("/ports", response_model=List[schemas.Port])
def get_ports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ports_table = crud.read_ports_table(db, skip=skip, limit=limit)
    return ports_table


@app.get("/ports/{port_id}", response_model=List[schemas.Port])
def get_port(port_id: str, db: Session = Depends(get_db)):
    port = crud.read_port_by_id(db, port_id=port_id)
    if port is None:
        raise HTTPException(status_code=404, detail="Port not found")
    return port


@app.get("/entities", response_model=List[schemas.Entity])
def get_entities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    entities_table = crud.read_entities_table(db, skip=skip, limit=limit)
    return entities_table


@app.get("/prices", response_model=List[schemas.Price])
def get_prices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prices_table = crud.read_prices_table(db, skip=skip, limit=limit)
    return prices_table


@app.get("/bookings", response_model=List[schemas.Booking])
def get_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings_table = crud.read_bookings_table(db, skip=skip, limit=limit)
    if bookings_table == []:
        raise HTTPException(status_code=404, detail="Booking table is empty")
    return bookings_table


@app.get("/bookings/{booking_id}", response_model=List[schemas.Booking])
def get_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = crud.read_booking_by_id(db, booking_id=booking_id)
    if booking == []:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@app.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db=db, booking=booking)


@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = crud.read_booking_by_id(db, booking_id=booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    else:
        crud.delete_booking_by_id(db, booking_id)
        return {"message": "Booking deleted"}


@app.get("/ferries", response_model=List[schemas.Ferry])
def get_ferries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ferries_table = crud.read_ferries_table(db, skip=skip, limit=limit)
    return ferries_table


@app.get("/users", response_model=List[schemas.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users_table = crud.read_users_table(db, skip=skip, limit=limit)
    return users_table
