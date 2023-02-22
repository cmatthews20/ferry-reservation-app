'''
Database models/classes (ORM Models)
'''

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Port(Base):
    __tablename__ = "ports"

    port_id = Column(String, primary_key=True, index=True)
    port_name = Column(String, index=True)

#class Crossing(Base):
#    __tablename__ = "crossings"
#
#    crossing_id = Column(String, primary_key=True, index=True)
#    depart_port = relationship("Port", back_populates="port_name")
#    arrive_port = relationship("Port", back_populates="port_name")
#


