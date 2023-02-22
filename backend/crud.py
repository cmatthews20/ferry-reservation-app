from sqlalchemy.orm import Session

import models, schemas

def get_ports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Port).offset(skip).limit(limit).all()
