"""
Database models/classes (ORM Models) used by SQLAlchemy and CRUD operations.
"""

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from database import Base


class Port(Base):
    __tablename__ = "ports"

    port_id = Column(String, primary_key=True, index=True)

    port_name = Column(String, index=True)


class Crossing(Base):
    __tablename__ = "crossings"

    crossing_id = Column(String, primary_key=True, index=True)

    depart_port = Column(String, index=True)
    arrive_port = Column(String, index=True)


class Entity(Base):
    __tablename__ = "entity"

    entity_id = Column(String, primary_key=True, index=True)

    entity = Column(String, index=True)
