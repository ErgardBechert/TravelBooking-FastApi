from fastapi import APIRouter, Form, File, UploadFile
from services.image_services import create_new_image, get_all_images
get_all_images

router = APIRouter()

@router.post("/create_image")
def create_image(
    picture: UploadFile = File(), 
    name: str = Form(), 
    author: str = Form(), 
    ):
    return create_new_image(picture, name, author)

@router.get("/get_all_images")
def get_images_router():
    return get_all_images()