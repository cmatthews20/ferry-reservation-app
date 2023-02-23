"""
Pydantic models (schemas). These classes model the data for the API.
"""

from typing import List, Union

from pydantic import BaseModel


class CrossingBase(BaseModel):
    depart_port: str
    arrive_port: str


class CrossingCreate(CrossingBase):
    pass


class Crossing(CrossingBase):
    crossing_id: str

    class Config:
        orm_mode = True


class ScheduleBase(BaseModel):
    crossing_id: str
    ferry_id: str
    time: str
    seats_occupied: int
    vehicles_occupied: int


class ScheduleCreate(ScheduleBase):
    pass


class Schedule(ScheduleBase):
    schedule_id: str

    class Config:
        orm_mode = True


class PortBase(BaseModel):
    port_name: str


class PortCreate(PortBase):
    pass


class Port(PortBase):
    port_id: str

    class Config:
        orm_mode = True


class EntityBase(BaseModel):
    entity: str


class EntityCreate(EntityBase):
    pass


class Entity(EntityBase):
    entity_id: str

    class Config:
        orm_mode = True


class PriceBase(BaseModel):
    price: float


class PriceCreate(PriceBase):
    pass


class Price(PriceBase):
    crossing_id: str
    entity_id: str

    class Config:
        orm_mode = True


class BookingBase(BaseModel):
    booking_id: str
    user_id: str
    schedule_id: str
    vehicle_id: str
    passengers: str


class BookingCreate(BookingBase):
    booking_id: str
    user_id: str
    schedule_id: str
    vehicle_id: str
    passengers: str


class Booking(BookingBase):
    class Config:
        orm_mode = True

class FerryBase(BaseModel):
    ferry_name: str
    passenger_capacity: int
    vehicle_capacity: int


class FerryCreate(FerryBase):
    pass


class Ferry(FerryBase):
    ferry_id: str

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    email: str
    phone: int


class UserCreate(UserBase):
    pass


class User(UserBase):
    user_id: str

    class Config:
        orm_mode = True
