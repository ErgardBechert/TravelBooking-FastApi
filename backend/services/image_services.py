import base64

from fastapi import File, UploadFile, Form
import database.operations as db_operation
from database.connection import SessionLocal
from models.image import Image

def create_new_image(
    picture: UploadFile = File(), 
    name: str = Form(), 
    author: str = Form()
    ):
    
    picture_data = picture.file.read()
    encoded_picture_data = base64.b64encode(picture_data)
    
    new_image = Image(
        picture=encoded_picture_data,
        name=name,
        author=author
    )
    
    db = SessionLocal()
    db_operation.add_in_db(new_image, db)
    return new_image


def get_all_images():
    db = SessionLocal()
    images = db.query(Image).all()
    db.close()
    return images