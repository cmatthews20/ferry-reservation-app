'''
Pydantic models (schemas)
'''

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


#class CrossingBase(BaseModel):
#    email: str
#
#
#class CrossingCreate(CrossingBase):
#    password: str
#
#
#class Crossing(CrossingBase):
#    id: int
#    is_active: bool
#    items: List[Item] = []
#
#    class Config:
#        orm_mode = True
