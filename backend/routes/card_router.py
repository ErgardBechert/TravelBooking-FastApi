import base64
from fastapi import APIRouter, File, UploadFile, Form
from services.card_services import create_card, get_all_recommend_cards, get_all_cards, get_card_id, get_cards_by_options

router = APIRouter()

@router.post("/create_card")
def create_card_router(title: str = Form(),
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

    return create_card(title, description, city, price, picture, events_count, location_count, tour_time, is_recommend, coordinates)

@router.get("/get_all_recommend_cards")
def get_all_recommend_cards_router():
    return get_all_recommend_cards()

@router.get("/get_all_cards")
def get_all_cards_router():
    return get_all_cards()

@router.get("/cards/{card_id}")
def get_card_router(card_id: int):
    return get_card_id(card_id)

@router.get("/get_cards_by_options")
def get_cards_by_options_router(city: str):
    return get_cards_by_options(city)