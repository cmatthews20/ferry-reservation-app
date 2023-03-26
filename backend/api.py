"""
This is the main API file for back-end endpoint management.
"""

from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas, models
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    crossings_table = models.Crossing.get_table(db, skip=skip, limit=limit)
    if crossings_table == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return crossings_table


@app.get("/crossings/{crossing_id}", response_model=List[schemas.Crossing])
def get_crossings_row(crossing_id: str, db: Session = Depends(get_db)):
    crossing = models.Crossing.get_row(db, crossing_id=crossing_id)
    if crossing == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return crossing


@app.get("/schedules", response_model=List[schemas.Schedule])
def get_schedule(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    schedule_table = models.Schedule.get_table(db, skip=skip, limit=limit)
    if schedule_table == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return schedule_table


@app.get("/schedules/{start_time}/{end_time}/{departure_Port}/{arrival_Port}")
def read_schedules_date(
    start_time: str,
    end_time: str,
    departure_Port: str,
    arrival_Port: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    schedules = models.Schedule.get_data(
        db,
        start_time=start_time,
        end_time=end_time,
        departure_Port=departure_Port,
        arrival_Port=arrival_Port,
        skip=skip,
        limit=limit,
    )
    return schedules


@app.get("/ports", response_model=List[schemas.Port])
def get_ports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ports_table = models.Port.get_table(db, skip=skip, limit=limit)
    return ports_table

@app.get("/port/{port_id}", response_model=List[schemas.Port])
def get_port(port_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    port = models.Port.get_row(db, port_id=port_id)
    if port == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return port

# TODO: change this to /arrival_port/
@app.get("/ports/{port_id}")
def read_port(
    port_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    port = models.Crossing.get_arrival_port(db, port_id=port_id, skip=skip, limit=limit)
    if port == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return port


@app.get("/entities", response_model=List[schemas.Entity])
def get_entities(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    entities_table = models.Entity.get_table(db, skip=skip, limit=limit)
    return entities_table


@app.get("/prices", response_model=List[schemas.Price])
def get_prices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prices_table = models.Price.get_table(db, skip=skip, limit=limit)
    return prices_table


@app.get("/bookings", response_model=List[schemas.Booking])
def get_bookings(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    bookings_table = models.Booking.get_table(db, skip=skip, limit=limit)
    if bookings_table == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return bookings_table


@app.get("/bookings/{booking_id}", response_model=List[schemas.Booking])
def get_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = models.Booking.get_row(db, booking_id=booking_id)
    if booking == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return booking


@app.post("/bookings", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return models.Booking.create_row(db=db, booking=booking)


@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = models.Booking.get_row(db, booking_id=booking_id)
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    else:
        models.Booking.delete_by_id(db, booking_id)
        return {"message": "Booking deleted"}


@app.get("/ferries", response_model=List[schemas.Ferry])
def get_ferries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ferries_table = models.Ferry.get_table(db, skip=skip, limit=limit)
    return ferries_table


@app.get("/users", response_model=List[schemas.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users_table = models.User.get_table(db, skip=skip, limit=limit)
    return users_table


@app.get("/booking_data/{booking_Id}")
def get_booking_data(booking_Id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    booking_data = models.Booking.booking_data(db, booking_Id=booking_Id, skip=skip, limit=limit)
    return booking_data
