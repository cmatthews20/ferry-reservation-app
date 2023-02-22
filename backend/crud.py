from sqlalchemy.orm import Session

import models, schemas


def get_ports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()


def get_port(db: Session, port_id: str):
    return db.query(models.Port).filter(models.Port.port_id == port_id).first()


def get_crossings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Crossing).offset(skip).limit(limit).all()


def get_entities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entity).offset(skip).limit(limit).all()
