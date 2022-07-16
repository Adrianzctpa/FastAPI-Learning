from pydantic import BaseModel

class Post(BaseModel):
    text:str

class User(BaseModel):
    username: str
    password: str