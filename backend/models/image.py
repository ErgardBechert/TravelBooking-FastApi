from sqlalchemy import Column, Integer, String, LargeBinary
from database.connection import Base

class Image(Base):
    __tablename__ = "images"
    id = Column(Integer, primary_key=True, index=True)
    picture = Column(LargeBinary)
    name = Column(String)
    author = Column(String)
