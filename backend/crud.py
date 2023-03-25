"""
CREATE, READ, UPDATE, DELETE functions for the API to use on the database
"""
from sqlalchemy.sql import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
import models, schemas
from datetime import datetime


def get_crossings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing).offset(skip).limit(limit).all()


def get_schedules(db: Session, skip: int = 0, limit: int = 100):
     return db.query(models.Schedule).offset(skip).limit(limit).all()

def get_schedules_data(db: Session, start_time: str, end_time: str, departure_Port: str, arrival_Port: str, skip: int = 0, limit: int = 100):
    return db.query(models.Ferry.ferry_name,models.Schedule.time,models.Ferry.passenger_capacity,models.Ferry.vehicle_capacity,models.Crossing.depart_port,models.Crossing.arrive_port,models.Port.port_name).join(models.Schedule,models.Schedule.ferry_id==models.Ferry.ferry_id).join(models.Crossing,models.Schedule.crossing_id==models.Crossing.crossing_id).join(models.Port,models.Port.port_id==models.Crossing.depart_port).filter((models.Schedule.time >= datetime.strptime(start_time, '%a %b %d %Y')),(models.Schedule.time < datetime.strptime(end_time, '%a %b %d %Y')),(models.Crossing.depart_port== departure_Port),(models.Crossing.arrive_port== arrival_Port)).offset(skip).limit(limit).all()


def get_ports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()

def get_arrivalport(db: Session, port_id: str, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing, models.Port).join(models.Port, models.Crossing.arrive_port==models.Port.port_id).filter(models.Crossing.depart_port == port_id).all()


def get_entities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entity).offset(skip).limit(limit).all()


def get_entity(db: Session, entity_id: str):
    return db.query(models.Entity).filter(models.Entity.entity_id == entity_id).first()


def get_prices(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Price).offset(skip).limit(limit).all()


def get_bookings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).offset(skip).limit(limit).all()


def get_booking(db: Session, booking_id: str):
    return (
        db.query(models.Booking).filter(models.Booking.booking_id == booking_id).all()
    )


def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(
        booking_id=booking.booking_id,
        user_id=booking.user_id,
        schedule_id=booking.schedule_id,
        vehicle_id=booking.vehicle_id,
        passengers=booking.passengers,
    )

    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking


def get_ferries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ferry).offset(skip).limit(limit).all()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()
