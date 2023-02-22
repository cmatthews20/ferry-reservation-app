"""
Pydantic models (schemas). These classes model the data for the API.
"""

from typing import List, Union

from pydantic import BaseModel


class PortBase(BaseModel):
    port_name: str


class PortCreate(PortBase):
    pass


class Port(PortBase):
    port_id: str

    class Config:
        orm_mode = True


class CrossingBase(BaseModel):
    depart_port: str
    arrive_port: str


class CrossingCreate(CrossingBase):
    pass


class Crossing(CrossingBase):
    crossing_id: str

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
