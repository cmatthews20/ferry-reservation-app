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
from email_server import send_email


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


@app.get("/send_email")
def send_booking(
    email: str,
    name: str,
    booking_id: str,
    arrive_port: str,
    depart_port: str,
    time: str,
    passengers: str,
    vehicle: str,
):
    send_email(
        email,
        name,
        booking_id,
        arrive_port,
        depart_port,
        time,
        passengers,
        vehicle,
    )
    return {"message": "Email sent successfully"}


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


@app.get("/port_name/{port_id}")
def get_port_name(port_id: str, db: Session = Depends(get_db)):
    name = models.Port.get_row(db, port_id=port_id)
    if name == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return name.port_name


@app.get("/arrival_ports/{port_id}")
def read_port(
    port_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    port = models.Crossing.get_arrival_port(db, port_id=port_id, skip=skip, limit=limit)
    if port == []:
        raise HTTPException(status_code=404, detail="Empty response")
    return port


@app.get("/booking_data/{booking_Id}/{email}")
def get_booking_data(
    booking_Id: str,
    email: str,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    booking_data = models.Booking.get_data(
        db, booking_Id=booking_Id, email=email, skip=skip, limit=limit
    )
    return booking_data


@app.post("/create_booking")
def create_booking(
    schedule_id: str,
    name: str,
    email: str,
    phone: str,
    vehicle_id: str,
    additional_passengers: str,
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

    if vehicle_id == "":
        vehicle_id = "No"

    passengers = 1
    if not (additional_passengers == "" or additional_passengers == "0"):
        passengers += int(additional_passengers)

    try:
        models.Booking.create_booking(
            db=db,
            booking_id=booking_id,
            user_id=user_id,
            schedule_id=schedule_id,
            vehicle_id=vehicle_id,
            passengers=str(passengers),
        )
    except Exception as e:
        raise e

    try:
        models.Schedule.update_passengers(
            db=db, schedule_id=schedule_id, total_passengers=passengers
        )
    except Exception as e:
        raise e

    if vehicle_id == "Yes":
        try:
            models.Schedule.update_vehicles(db=db, schedule_id=schedule_id)
        except Exception as e:
            raise e

    return {
        "user_id": user_id,
        "name": name,
        "email": email,
        "phone": phone,
        "booking_id": booking_id,
        "schedule_id": schedule_id,
        "vehicle_id": vehicle_id,
        "passengers": passengers,
    }


@app.delete("/cancel_booking/{booking_id}")
def cancel_booking(booking_id: str, db: Session = Depends(get_db)):
    row = models.Booking.get_row(db=db, booking_id=booking_id)
    if row:
        if row.passengers != "0":
            print(f"DELETE {row.passengers} PASSENGERS")
            models.Schedule.decrease_passengers(
                db, schedule_id=row.schedule_id, total_passengers=int(row.passengers)
            )
        if row.vehicle_id == "Yes":
            print("DECREASE VEHICLE OCCUPIED BY 1")
            models.Schedule.decrease_vehicles(db, schedule_id=row.schedule_id)
        models.Booking.delete_by_id(db, booking_id=booking_id)

    return row
