from fastapi import FastAPI, Depends, HTTPException
import schemas
import models

from utils.auth import AuthHandler
from utils.pagination import Paginator

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
pag = Paginator()
auth = AuthHandler()       

@app.get('/api/posts')
def getPosts(session: Session = Depends(get_session), 
    page_num: int = 1, page_size: int = 10, uid=Depends(auth.auth_wrapper)): 
    
    posts = session.query(models.Post)

    if posts.count() == 0: raise HTTPException(status_code=404, detail='NO POSTS')

    return pag.paginate(posts, page_num, page_size, "/api/posts", session)

@app.get("/api/posts/{id}")
def getPost(id:int, session: Session = Depends(get_session), 
    uid=Depends(auth.auth_wrapper)):
   
    post = session.query(models.Post).get(id)
    post = pag.id_to_username(session, post)
    return post

@app.post('/api/posts')
def createPost(post:schemas.Post, session: Session = Depends(get_session), 
    uid=Depends(auth.auth_wrapper)):
    
    post = models.Post(text = post.text, owner_id = uid)
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@app.put('/api/posts/{id}')
def updatePost(id:int, post:schemas.Post, 
    session: Session = Depends(get_session), 
    uid=Depends(auth.auth_wrapper)):

    posts = session.query(models.Post).filter_by(owner_id=uid)
    postObject = posts.filter_by(id=id).first()

    if postObject is None:
        raise HTTPException(status_code=403, detail='FORBIDDEN')

    postObject.text = post.text
    session.commit()
    return postObject

@app.delete('/api/posts/{id}')
def deletePost(id:int, 
    session: Session = Depends(get_session), 
    uid=Depends(auth.auth_wrapper)):
    
    posts = session.query(models.Post).filter_by(owner_id=uid)
    postObject = posts.filter_by(id=id).first()    

    if postObject is None:
        raise HTTPException(status_code=403, detail='FORBIDDEN')

    session.delete(postObject)
    session.commit()
    session.close()
    return {'status': 200, 'text': 'Item was deleted'}

@app.post('/api/user/register')
def register(user: schemas.User, session: Session = Depends(get_session)):
   
    query = session.query(models.User.username).filter_by(username=user.username).first()
    
    if query is not None:
        raise HTTPException(status_code=400, detail='Username is taken.')
    
    hashed_password = auth.generate_hash(user.password)
    userObject = models.User(username=user.username, password=hashed_password)
    
    session.add(userObject) 
    session.commit()
    session.refresh(userObject)
    return userObject

@app.post('/api/user/login')
def login(user: schemas.User, session: Session = Depends(get_session)):
    
    exist_query = session.query(models.User.username).filter_by(username=user.username).first()

    if (exist_query is None):
        raise HTTPException(status_code=404, detail='Username and/or Password are invalid') 

    user_query = session.query(models.User).filter_by(username=user.username).first()
    
    if not auth.verify(user.password, user_query.password):
        raise HTTPException(status_code=404, detail='Username and/or password are invalid')
    
    tokens = auth.generate_tokens(user_query.id)
    return {'status':200, 'access': tokens['ac'], 'refresh': tokens['rf']}

@app.get('/api/user/posts')
def getUserPosts(session: Session = Depends(get_session), page_num: int = 1, 
                page_size: int = 10, uid=Depends(auth.auth_wrapper)):
    
    posts = session.query(models.Post).filter_by(owner_id=uid)
    return pag.paginate(posts, page_num, page_size, '/api/user/posts', session)

@app.get('/api/user')
def getUserInfo(session: Session = Depends(get_session), uid=Depends(auth.auth_wrapper)):
   
    user = session.query(models.User).get(uid)
    return {'username':user.username}

@app.post('/api/token/refresh')
def refresh(token=Depends(auth.token_wrapper)):
    
    new_tokens = auth.decode_refresh_token(token)
    return {'status': 200, 'access': new_tokens['access'], 'refresh': new_tokens['refresh']}