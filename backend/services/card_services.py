import base64

from fastapi import File, UploadFile, Form
import database.operations as db_operation
from database.connection import SessionLocal
from models.card import Card

def create_card(title: str = Form(), 
                      description: str = Form(),
                      city: str = Form(),
                      price: float = Form(), 
                      picture: UploadFile = File(), 
                      events_count: int = Form(), 
                      location_count: int = Form(),
                      tour_time: int = Form(),
                      is_recommend: bool = Form(),
                      coordinates: list[str] = Form(),
                      ):
    picture_data = picture.file.read()
    encoded_picture_data = base64.b64encode(picture_data)
    new_card = Card(title=title,
                description=description,
                city=city,
                price=price,
                picture=encoded_picture_data,  
                events_count=events_count,
                location_count=location_count,
                tour_time=tour_time,
                is_recommend=is_recommend,
                coordinates=coordinates)
    db = SessionLocal()
    db_operation.add_in_db(new_card, db)
    return new_card

def get_all_recommend_cards():
    db = SessionLocal()
    cards = db.query(Card).filter_by(is_recommend=True)
    db.close()
    return cards

def get_all_cards():
    db = SessionLocal()
    cards = db.query(Card).all()
    db.close()
    return cards

def get_card_id(card_id: int):
    db = SessionLocal()
    card = db.query(Card).filter_by(id=card_id).first()
    db.close()
    return card


def get_cards_by_options(city: str): 
    db = SessionLocal()
    cards = db.query(Card).filter_by(city=city.capitalize().strip()).all()
    db.close()
    return cards