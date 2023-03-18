"""
CREATE, READ, UPDATE, DELETE functions for the API to use on the database
"""

from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime


def read_crossings_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing).offset(skip).limit(limit).all()


def read_crossing_by_id(db: Session, crossing_id: str):
    return (
        db.query(models.Crossing)
        .filter(models.Crossing.crossing_id == crossing_id)
        .all()
    )


def read_schedule_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Schedule).offset(skip).limit(limit).all()

def get_schedules_date(db: Session, start_time: str, end_time: str, skip: int = 0, limit: int = 100):
    print(models.Schedule.time)
    return db.query(models.Schedule).filter((models.Schedule.time >= datetime.strptime(start_time, '%a %b %d %Y')),(models.Schedule.time < datetime.strptime(end_time, '%a %b %d %Y'))).offset(skip).limit(limit).all()

def read_ports_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()


def read_port_by_id(db: Session, port_id: str):
    return db.query(models.Port).filter(models.Port.port_id == port_id).first()


def read_entities_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entity).offset(skip).limit(limit).all()


def read_entity_by_id(db: Session, entity_id: str):
    return db.query(models.Entity).filter(models.Entity.entity_id == entity_id).all()


def read_prices_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Price).offset(skip).limit(limit).all()


def read_bookings_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).offset(skip).limit(limit).all()


def read_booking_by_id(db: Session, booking_id: str):
    return (
        db.query(models.Booking).filter(models.Booking.booking_id == booking_id).all()
    )


def create_booking(db: Session, booking: schemas.BookingCreate):
    new_booking = models.Booking(
        booking_id=booking.booking_id,
        user_id=booking.user_id,
        schedule_id=booking.schedule_id,
        vehicle_id=booking.vehicle_id,
        passengers=booking.passengers,
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


def delete_booking_by_id(db: Session, booking_id: str):
    booking = (
        db.query(models.Booking).filter(models.Booking.booking_id == booking_id).first()
    )
    db.delete(booking)
    db.commit()
    return


def read_ferries_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ferry).offset(skip).limit(limit).all()


def read_users_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()
