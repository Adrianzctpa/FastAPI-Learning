from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'sqlite:///sql_app.db'

engine = create_engine(SQLALCHEMY_DATABASE_URL + '?check_same_thread=False')

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)