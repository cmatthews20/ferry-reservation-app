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
import uuid


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


@app.get("/arrival_ports/{port_id}")
def read_port(
    port_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    port = models.Crossing.get_arrival_port(db, port_id=port_id, skip=skip, limit=limit)
    if port == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return port


@app.get("/booking_data/{booking_Id}")
def get_booking_data(
    booking_Id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    booking_data = models.Booking.get_data(
        db, booking_Id=booking_Id, skip=skip, limit=limit
    )
    return booking_data


@app.post("/create_booking")
def create_booking(
    schedule_id: str,
    name: str,
    email: str,
    phone: str,
    vehicle_id: str,
    passengers: str = "0",
    db: Session = Depends(get_db),
):
    user_id = models.User.get_user_by_email(email, db)

    if user_id is None:
        unique_number = str(uuid.uuid4().int)[:4]
        user_id = f"U{unique_number}"
        while not models.User.is_code_unique(user_id, db):
            unique_number = str(uuid.uuid4().int)[:4]
            user_id = f"U{unique_number}"

        try:
            models.User.create_row(
                db, user_id=user_id, name=name, email=email, phone=phone
            )
        except Exception as e:
            raise e

    unique_number = str(uuid.uuid4().int)[:4]
    booking_id = f"B{unique_number}"
    while not models.Booking.is_code_unique(booking_id, db):
        unique_number = str(uuid.uuid4().int)[:4]
        booking_id = f"B{unique_number}"

    try:
        models.Booking.create_booking(
            db=db,
            booking_id=booking_id,
            user_id=user_id,
            schedule_id=schedule_id,
            vehicle_id=vehicle_id,
            passengers=passengers,
        )
    except Exception as e:
        raise e

    try:
        models.Schedule.update_passengers(
            db=db, schedule_id=schedule_id, passengers=int(passengers)
        )
    except Exception as e:
        raise e

    if (vehicle_id == "Yes"):
        try:
            models.Schedule.update_vehicles(db=db, schedule_id=schedule_id)
        except Exception as e:
            raise e

    return {
        "user_id": user_id,
        "name I got": name,
        "email": email,
        "phone": phone,
        "booking_id": booking_id,
        "schedule_id": schedule_id,
        "vehicle_id": vehicle_id,
        "passengers": passengers,
    }
