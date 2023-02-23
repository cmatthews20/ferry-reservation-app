"""
Database models/classes (ORM Models) used by SQLAlchemy and CRUD operations.
"""

from sqlalchemy import Column, String, Integer, Float, ForeignKey

from database import BaseClass


class Crossing(BaseClass):
    __tablename__ = "crossings"

    crossing_id = Column(String, primary_key=True, index=True)

    depart_port = Column(String, ForeignKey("ports.port_id"))
    arrive_port = Column(String, ForeignKey("ports.port_id"))


class Schedule(BaseClass):
    __tablename__ = "schedule"

    schedule_id = Column(String, primary_key=True, index=True)

    crossing_id = Column(String, ForeignKey("crossings.crossing_id"))
    ferry_id = Column(String, ForeignKey("ferries.ferry_id"))
    time = Column(String, index=True)
    seats_occupied = Column(Integer, index=True)
    vehicles_occupied = Column(Integer, index=True)


class Port(BaseClass):
    __tablename__ = "ports"

    port_id = Column(String, primary_key=True, index=True)

    port_name = Column(String, index=True)


class Entity(BaseClass):
    __tablename__ = "entity"

    entity_id = Column(String, primary_key=True, index=True)

    entity = Column(String, index=True)


class Price(BaseClass):
    __tablename__ = "pricings"

    crossing_id = Column(String, ForeignKey("crossings.crossing_id"), primary_key=True)
    entity_id = Column(String, ForeignKey("entity.entity_id"), primary_key=True)

    price = Column(Float, index=True)


class Booking(BaseClass):
    __tablename__ = "bookings"

    booking_id = Column(String, primary_key=True, index=True)

    user_id = Column(String, index=True)
    schedule_id = Column(String, ForeignKey("schedule.schedule_id"), index=True)
    vehicle_id = Column(String, ForeignKey("entity.entity_id"), index=True)
    passengers = Column(String, index=True)


class Ferry(BaseClass):
    __tablename__ = "ferries"

    ferry_id = Column(String, primary_key=True, index=True)

    ferry_name = Column(String, index=True)
    passenger_capacity = Column(Integer, index=True)
    vehicle_capacity = Column(Integer, index=True)


class User(BaseClass):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, index=True)

    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(Integer, index=True)
