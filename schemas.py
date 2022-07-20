from pydantic import BaseModel

class Post(BaseModel):
    title: str
    text:str

class User(BaseModel):
    username: str
    password: str