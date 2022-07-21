from pydantic import BaseModel

class Post(BaseModel):
    title:str
    textHtml: str
    text:str

class User(BaseModel):
    username: str
    password: str