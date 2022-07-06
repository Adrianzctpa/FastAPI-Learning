from fastapi import FastAPI, Depends
import schemas
import models

from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session

Base.metadata.create_all(engine)

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

@app.get('/')
def getPosts(session: Session = Depends(get_session)): 
    posts = session.query(models.Post).all()
    return posts

@app.get("/{id}")
def getPost(id:int, session: Session = Depends(get_session)):
    post = session.query(models.Post).get(id)
    return post

@app.post('/')
def createPost(post:schemas.Post, session: Session = Depends(get_session)):
    post = models.Post(text = post.text)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@app.put('/{id}')
def updatePost(id:int, post:schemas.Post, session: Session = Depends(get_session)):
    postObject = session.query(models.Post).get(id)
    postObject.text = post.text
    session.commit()
    return postObject

@app.delete('/{id}')
def deletePost(id:int, session: Session = Depends(get_session)):
    postObject = session.query(models.Post).get(id)
    session.delete(postObject)
    session.commit()
    session.close()
    return {'status': 200, 'text': 'Item was deleted'}