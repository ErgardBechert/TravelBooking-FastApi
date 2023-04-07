from sqlalchemy import Column, Integer, String, Float, LargeBinary, Boolean, ARRAY
from database.connection import Base

class Card(Base):
    __tablename__ = "cards"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    city = Column(String)
    price = Column(Float)
    picture = Column(LargeBinary)
    events_count = Column(Integer)
    location_count = Column(Integer)
    tour_time = Column(Integer)
    is_recommend = Column(Boolean, default=False)
    coordinates = Column(ARRAY(String))

