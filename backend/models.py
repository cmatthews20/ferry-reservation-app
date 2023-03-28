"""
Database models/classes (ORM Models) used by SQLAlchemy and CRUD methods.
"""

from sqlalchemy import Column, String, Integer, Float, ForeignKey
from database import BaseClass
from sqlalchemy.orm import Session
from datetime import datetime
import schemas


class Crossing(BaseClass):
    __tablename__ = "crossings"

    crossing_id = Column(String, primary_key=True, index=True)

    depart_port = Column(String, ForeignKey("ports.port_id"))
    arrive_port = Column(String, ForeignKey("ports.port_id"))

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Crossing).offset(skip).limit(limit).all()

    def get_row(db: Session, crossing_id: str):
        return db.query(Crossing).filter(Crossing.crossing_id == crossing_id).all()

    def get_arrival_port(db: Session, port_id: str, skip: int = 0, limit: int = 100):
        return (
            db.query(Crossing, Port)
            .join(Port, Crossing.arrive_port == Port.port_id)
            .filter(Crossing.depart_port == port_id)
            .all()
        )


class Schedule(BaseClass):
    __tablename__ = "schedule"

    schedule_id = Column(String, primary_key=True, index=True)

    crossing_id = Column(String, ForeignKey("crossings.crossing_id"))
    ferry_id = Column(String, ForeignKey("ferries.ferry_id"))
    time = Column(String, index=True)
    seats_occupied = Column(Integer, index=True)
    vehicles_occupied = Column(Integer, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Schedule).offset(skip).limit(limit).all()

    def get_rows_by_date(
        db: Session, start_time: str, end_time: str, skip: int = 0, limit: int = 100
    ):
        return (
            db.query(Schedule)
            .filter(
                (Schedule.time >= datetime.strptime(start_time, "%a %b %d %Y")),
                (Schedule.time < datetime.strptime(end_time, "%a %b %d %Y")),
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_data(
        db: Session,
        start_time: str,
        end_time: str,
        departure_Port: str,
        arrival_Port: str,
        skip: int = 0,
        limit: int = 100,
    ):
        return (
            db.query(
                Schedule.schedule_id,
                Ferry.ferry_name,
                Schedule.time,
                Ferry.passenger_capacity,
                Ferry.vehicle_capacity,
                Crossing.depart_port,
                Crossing.arrive_port,
                Port.port_name,
                Schedule.seats_occupied,
                Schedule.vehicles_occupied,
            )
            .join(Schedule, Schedule.ferry_id == Ferry.ferry_id)
            .join(Crossing, Schedule.crossing_id == Crossing.crossing_id)
            .join(Port, Port.port_id == Crossing.depart_port)
            .filter(
                (Schedule.time >= datetime.strptime(start_time, "%a %b %d %Y")),
                (Schedule.time < datetime.strptime(end_time, "%a %b %d %Y")),
                (Crossing.depart_port == departure_Port),
                (Crossing.arrive_port == arrival_Port),
            )
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_row(db: Session, schedule_id: str):
        return db.query(Schedule).filter(Schedule.schedule_id == schedule_id).all()

    def update_passengers(db: Session, schedule_id: str, total_passengers: int):
        try:
            db.query(Schedule).filter_by(schedule_id=schedule_id).update(
                {Schedule.seats_occupied: Schedule.seats_occupied + total_passengers}
            )
            db.commit()
        except Exception as e:
            raise e

    def update_vehicles(db: Session, schedule_id: str):
        try:
            db.query(Schedule).filter_by(schedule_id=schedule_id).update(
                {Schedule.vehicles_occupied: Schedule.vehicles_occupied + 1}
            )
            db.commit()
        except Exception as e:
            raise e


class Port(BaseClass):
    __tablename__ = "ports"

    port_id = Column(String, primary_key=True, index=True)

    port_name = Column(String, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Port).offset(skip).limit(limit).all()

    def get_row(db: Session, port_id: str):
        return db.query(Port).filter(Port.port_id == port_id).all()


class Entity(BaseClass):
    __tablename__ = "entity"

    entity_id = Column(String, primary_key=True, index=True)

    entity = Column(String, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Entity).offset(skip).limit(limit).all()

    def get_row(db: Session, entity_id: str):
        return db.query(Entity).filter(Entity.entity_id == entity_id).all()


class Price(BaseClass):
    __tablename__ = "pricings"

    crossing_id = Column(String, ForeignKey("crossings.crossing_id"), primary_key=True)
    entity_id = Column(String, ForeignKey("entity.entity_id"), primary_key=True)

    price = Column(Float, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Price).offset(skip).limit(limit).all()


class Booking(BaseClass):
    __tablename__ = "bookings"

    booking_id = Column(String, primary_key=True, index=True)

    user_id = Column(String, ForeignKey("users.user_id"), index=True)
    schedule_id = Column(String, ForeignKey("schedule.schedule_id"), index=True)
    vehicle_id = Column(String, ForeignKey("entity.entity_id"), index=True)
    passengers = Column(String, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Booking).offset(skip).limit(limit).all()

    def get_row(db: Session, booking_id: str):
        return db.query(Booking).filter(Booking.booking_id == booking_id).all()

    def create_row(db: Session, booking: schemas.BookingCreate):
        new_booking = Booking(
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

    def is_code_unique(unique_code: str, db: Session) -> bool:
        user = db.query(Booking).filter_by(booking_id=unique_code).first()
        return user is None

    def create_booking(
        db: Session,
        booking_id: str,
        user_id: str,
        schedule_id: str,
        vehicle_id: str,
        passengers: str,
    ):
        new_booking = Booking(
            booking_id=booking_id,
            user_id=user_id,
            schedule_id=schedule_id,
            vehicle_id=vehicle_id,
            passengers=passengers,
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        return new_booking

    def delete_by_id(db: Session, booking_id: str):
        booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
        db.delete(booking)
        db.commit()
        return

    def get_data(db: Session, booking_Id: str, skip: int = 0, limit: int = 100):
        return (
            db.query(User, Booking, Schedule, Crossing)
            .join(Booking, User.user_id == Booking.user_id)
            .join(Schedule, Booking.schedule_id == Schedule.schedule_id)
            .join(Crossing, Schedule.crossing_id == Crossing.crossing_id)
            .filter(Booking.booking_id == booking_Id)
            .all()
        )


class Ferry(BaseClass):
    __tablename__ = "ferries"

    ferry_id = Column(String, primary_key=True, index=True)

    ferry_name = Column(String, index=True)
    passenger_capacity = Column(Integer, index=True)
    vehicle_capacity = Column(Integer, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Ferry).offset(skip).limit(limit).all()


class User(BaseClass):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, index=True)

    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(Integer, index=True)

    def get_table(db: Session, skip: int = 0, limit: int = 100):
        return db.query(User).offset(skip).limit(limit).all()

    def is_code_unique(unique_code: str, db: Session) -> bool:
        user = db.query(User).filter_by(user_id=unique_code).first()
        return user is None

    def is_email_unique(email: str, db: Session) -> bool:
        email = db.query(User).filter_by(email=email).first()
        return email is None

    def get_user_by_email(email: str, db: Session):
        email_row = db.query(User.user_id).filter_by(email=email).first()
        if email_row is not None:
            return email_row.user_id
        else:
            return email_row

    def create_row(db: Session, user_id, name, email, phone):
        try:
            new_user = User(
                user_id=user_id,
                name=name,
                email=email,
                phone=phone,
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        except Exception as e:
            raise e
