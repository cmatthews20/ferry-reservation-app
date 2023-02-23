"""
CREATE, READ, UPDATE, DELETE functions for the API to use on the database
"""

from sqlalchemy.orm import Session
import models, schemas


def get_crossings_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing).offset(skip).limit(limit).all()


def get_schedule_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Schedule).offset(skip).limit(limit).all()


def get_ports_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()


def get_port(db: Session, port_id: str):
    return db.query(models.Port).filter(models.Port.port_id == port_id).first()


def get_entities_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entity).offset(skip).limit(limit).all()


def get_entity(db: Session, entity_id: str):
    return db.query(models.Entity).filter(models.Entity.entity_id == entity_id).first()


def get_prices_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Price).offset(skip).limit(limit).all()


def get_bookings_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Booking).offset(skip).limit(limit).all()


def get_booking(db: Session, booking_id: str):
    return (
        db.query(models.Booking).filter(models.Booking.booking_id == booking_id).first()
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


def delete_booking(db: Session, booking_id: str):
    booking = db.query(models.Booking).filter(models.Booking.booking_id == booking_id).first()
    db.delete(booking)
    db.commit()


def get_ferries_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ferry).offset(skip).limit(limit).all()


def get_users_table(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()
