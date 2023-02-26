"""
CREATE, READ, UPDATE, DELETE functions for the API to use on the database
"""

from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime


def get_crossings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing).offset(skip).limit(limit).all()


def get_schedules(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Schedule).offset(skip).limit(limit).all()

def get_schedules_date(db: Session, start_time: str, end_time: str, skip: int = 0, limit: int = 100):
    print(models.Schedule.time)
    return db.query(models.Schedule).filter((models.Schedule.time >= datetime.strptime(start_time, '%a %b %d %Y')),(models.Schedule.time < datetime.strptime(end_time, '%a %b %d %Y'))).offset(skip).limit(limit).all()

def get_ports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()


def get_port(db: Session, port_id: str):
    return db.query(models.Port).filter(models.Port.port_id == port_id).first()


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
